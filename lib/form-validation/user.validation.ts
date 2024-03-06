import * as z from 'zod';

export const userValidation = z.object({
  image: z.string().url().min(1),
  name: z.string().min(3).max(30),
  username: z.string().min(3).max(30),
  bio: z.string().min(3).max(100),
});
