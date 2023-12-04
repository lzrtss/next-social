import * as z from 'zod';

export const postValidation = z.object({
  post: z.string().min(3, { message: 'Minimum 3 characters' }),
  userId: z.string(),
});
