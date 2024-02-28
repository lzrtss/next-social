import * as z from 'zod';

export const commentValidation = z.object({
  comment: z
    .string()
    .min(3, { message: '3 chars min' })
    .max(280, { message: '280 chars max' }),
});
