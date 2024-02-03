'use server';

import { revalidatePath } from 'next/cache';

import { connectToDb } from '@/db/mongoose';
import { Post, User } from '@/db/models';

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

    // Update User's post array
    await User.findByIdAndUpdate(author, {
      $push: { posts: createdPost._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create post: ${error.message}`);
  }
};

export const fetchPosts = async (pageNumber = 1, pageSize = 20) => {
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

export const fetchPostById = async (id: string) => {
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

export const addComment = async ({
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

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to add comment to post: ${error.message}`);
  }
};
