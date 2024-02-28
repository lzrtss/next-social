import * as z from 'zod';

export const postValidation = z.object({
  post: z
    .string()
    .min(3, { message: '3 chars min' })
    .max(280, { message: '280 chars max' }),
  userId: z.string(),
});
