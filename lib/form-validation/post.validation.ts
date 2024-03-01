import * as z from 'zod';

export const postValidation = z.object({
  post: z
    .string()
    .min(1, { message: '1 char min' })
    .max(280, { message: '280 chars max' }),
  userId: z.string(),
});
