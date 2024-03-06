import * as z from 'zod';

export const commentValidation = z.object({
  comment: z
    .string()
    .min(1, { message: '1 char min' })
    .max(280, { message: '280 chars max' }),
});
