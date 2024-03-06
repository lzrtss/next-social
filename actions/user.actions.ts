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

    return await User.findOne({ id })
      .populate({
        path: 'posts',
        model: Post,
        populate: {
          path: 'author',
          model: User,
          select: 'id image name text',
        },
      })
      .populate({
        path: 'comments',
        model: Post,
        populate: {
          path: 'author',
          model: User,
          select: 'id image name parentId text',
        },
      })
      .populate({
        path: 'likes',
        model: Post,
        populate: {
          path: 'author',
          model: User,
          select: 'name image id text',
        },
      });
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

export const getAllUserLikes = async (userId: string) => {
  try {
    connectToDb();

    const user = await User.findOne({ id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    return user.likes;
  } catch (error: any) {
    throw new Error(`Failed to fetch User's likes: ${error.message}`);
  }
};

export const getUserActivity = async (userId: string) => {
  try {
    connectToDb();

    // Find all posts created by the user
    const userPosts = await Post.find({ author: userId });

    // Collect all the child post ids (comments) from the 'children' field of each user post
    const childPostIds = userPosts.reduce((acc, userPost) => {
      return acc.concat(userPost.children);
    }, []);

    // Find and return the child posts (comments) excluding the ones created by the same user
    const comments = await Post.find({
      _id: { $in: childPostIds },
      author: { $ne: userId }, // Exclude posts authored by the same user
    }).populate({
      path: 'author',
      model: User,
      select: 'id createdAt name username image _id',
    });

    return comments;
  } catch (error: any) {
    throw new Error(`Failed to fetch User's activity: ${error.message}`);
  }
};
