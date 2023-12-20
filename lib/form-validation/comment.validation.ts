import * as z from 'zod';

export const commentValidation = z.object({
  comment: z.string().min(3, { message: 'Minimum 3 characters' }),
});