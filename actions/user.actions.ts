'use server';

import { revalidatePath } from 'next/cache';
import { FilterQuery, SortOrder } from 'mongoose';

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

export const getUserById = async (id: string) => {
  try {
    connectToDb();

    return await User.findOne({ id });
  } catch (error: any) {
    throw new Error(`User fetch failed: ${error.message}`);
  }
};

export const getAllUsers = async ({
  userId,
  searchQuery = '',
  pageNumber = 1,
  pageSize = 20,
  sortBy = 'desc',
}: {
  userId: string;
  searchQuery?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) => {
  try {
    connectToDb();

    const skipAmount = (pageNumber - 1) * pageSize;

    const regex = new RegExp(searchQuery, 'i');

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (searchQuery.trim() !== '') {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsersNumber = await User.countDocuments(query);

    const users = await usersQuery.exec();

    const isNext = totalUsersNumber > skipAmount + users.length;

    return { users, isNext };
  } catch (error: any) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
};

export const getAllUserPosts = async (userId: string) => {
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

export const getAllUserComments = async (userId: string) => {
  try {
    connectToDb();

    const user = await User.findOne({ id: userId }).populate({
      path: 'comments',
      model: Post,
      populate: {
        path: 'author',
        model: User,
        select: 'name image id',
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user.comments;
  } catch (error: any) {
    throw new Error(`Failed to fetch User's comments: ${error.message}`);
  }
};
