'use server';

import { revalidatePath } from 'next/cache';

import { connectToDb } from '@/db/mongoose';
import { Post, User } from '@/db/models';
import { IUser } from '@/types/user.interface';

interface UpdateUserParams extends IUser {
  path: string;
}

export const updateUser = async ({
  id,
  username,
  name,
  image,
  bio,
  path,
}: UpdateUserParams): Promise<void> => {
  try {
    connectToDb();

    await User.findOneAndUpdate(
      { id },
      {
        username,
        name,
        image,
        bio,
        onboarded: true,
      },
      { upsert: true },
    );

    if (path === '/profile/edit') {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create or update user: ${error.message}`);
  }
};

export const getUser = async (id: string) => {
  try {
    connectToDb();

    return await User.findOne({ id });
  } catch (error: any) {
    throw new Error(`User fetch failed: ${error.message}`);
  }
};

export const getUserPosts = async (userId: string) => {
  try {
    connectToDb();

    return await User.findOne({ id: userId }).populate({
      path: 'posts',
      model: Post,
      populate: {
        path: 'children',
        model: Post,
        populate: {
          path: 'author',
          model: User,
          select: 'name image id',
        },
      },
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch User's posts: ${error.message}`);
  }
};
