'use server';

import { revalidatePath } from 'next/cache';

import { connectToDb } from '@/db/mongoose';
import { Post, User } from '@/db/models';
import { IPost } from '@/types/post.interface';

interface CreatePostParams {
  author: string;
  text: string;
  communityId: string | null;
  path: string;
}

export const createPost = async ({
  author,
  text,
  communityId,
  path,
}: CreatePostParams) => {
  try {
    connectToDb();

    const createdPost = await Post.create({
      author,
      text,
      type: 'post',
      community: null,
    });

    await User.findByIdAndUpdate(author, {
      $push: { posts: createdPost._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create post: ${error.message}`);
  }
};

export const createComment = async ({
  text,
  path,
  postId,
  userId,
}: {
  text: string;
  path: string;
  postId: string;
  userId: string;
}) => {
  try {
    connectToDb();

    const originalPost = await Post.findById(postId);

    if (!originalPost) {
      throw new Error('Original post not found');
    }

    const comment = new Post({
      text,
      author: userId,
      parentId: postId,
      type: 'comment',
    });

    const savedComment = await comment.save();

    originalPost.children.push(savedComment._id);

    await originalPost.save();

    await User.findByIdAndUpdate(userId, {
      $push: { comments: savedComment._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to add comment to post: ${error.message}`);
  }
};

export const getAllPosts = async (
  pageNumber: number = 1,
  pageSize: number = 20,
) => {
  try {
    connectToDb();

    const skipAmount = (pageNumber - 1) * pageSize;

    const postsQuery = Post.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: 'author', model: User })
      .populate({
        path: 'children',
        populate: {
          path: 'author',
          model: User,
          select: '_id name parentId image',
        },
      });

    const totalPostsNumber = await Post.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const posts = await postsQuery.exec();

    const isNext = totalPostsNumber > skipAmount + posts.length;

    return { posts, isNext };
  } catch (error: any) {
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
};

export const getPostById = async (id: string) => {
  try {
    connectToDb();

    const post = await Post.findById(id)
      .populate({
        path: 'author',
        model: User,
        select: '_id id name image',
      })
      .populate({
        path: 'children',
        populate: [
          {
            path: 'author',
            model: User,
            select: '_id id name parentId image',
          },
          {
            path: 'children',
            model: Post,
            populate: {
              path: 'author',
              model: User,
              select: '_id id name parentId, image',
            },
          },
        ],
      })
      .exec();

    return post;
  } catch (error: any) {
    throw new Error(`Failed to fetch post: ${error.message}`);
  }
};

export const getAllPostCommentsById = async (id: string) => {
  try {
    connectToDb();

    const postComments = await Post.find({ parentId: id });

    const allPostComments = [];

    for (const comment of postComments) {
      const nestedComments: IPost[] = await getAllPostCommentsById(comment._id);
      allPostComments.push(comment, ...nestedComments);
    }

    return allPostComments;
  } catch (error: any) {
    throw new Error(`Failed to fetch all post's comments: ${error.message}`);
  }
};

export const deletePostById = async (id: string, path: string) => {
  try {
    connectToDb();

    const postToBeDeleted = await Post.findById(id).populate('author');

    if (!postToBeDeleted) {
      throw new Error('Failed to find requested post');
    }

    const postComments = await getAllPostCommentsById(id);

    const postCommentsIds = [
      id,
      ...postComments.map((post: IPost) => post._id),
    ];

    const uniqueAuthorsIds = new Set(
      [
        ...postComments.map((post: IPost) => post.author?._id?.toString()),
      ].filter((id) => id !== undefined),
    );

    await Post.deleteMany({ _id: { $in: postCommentsIds } });

    await User.updateMany(
      { _id: { $in: Array.from(uniqueAuthorsIds) } },
      { $pull: { posts: { $in: postCommentsIds } } },
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete post: ${error.message}`);
  }
};

export const deleteCommentById = async (id: string, path: string) => {
  try {
    connectToDb();

    const commentToBeDeleted = await Post.findById(id).populate('author');

    if (!commentToBeDeleted) {
      throw new Error('Failed to find requested comment');
    }

    const commentAuthorId = commentToBeDeleted.author?._id?.toString();

    await Post.deleteOne({ _id: id });

    if (commentAuthorId) {
      await User.updateOne(
        { _id: commentAuthorId },
        { $pull: { comments: id } },
      );
    }

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete comment: ${error.message}`);
  }
};
