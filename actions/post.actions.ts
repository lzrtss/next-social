'use server';

import { revalidatePath } from 'next/cache';

import { connectToDb } from '@/db/mongoose';
import { Post, User } from '@/db/models';
import { IPost } from '@/types/post.interface';

interface CreatePostParams extends IPost {
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

export const fetchPosts = async (pageNumber = 1, postsPerPage = 20) => {
  try {
    connectToDb();

    const skipAmount = (pageNumber - 1) * postsPerPage;

    const postsQuery = Post.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(postsPerPage)
      .populate({ path: 'author', model: User })
      .populate({
        path: 'children',
        populate: {
          path: 'author',
          model: User,
          select: '_id name parentId, image',
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
