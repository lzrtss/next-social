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
