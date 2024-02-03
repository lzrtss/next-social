'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
} from '@/components/client';
import { commentValidation } from '@/lib/form-validation';
import { createComment } from '@/actions';

interface CreateCommentFormProps {
  postId: string;
  userId: string;
  userImageUrl: string;
  className?: string;
}

export default function createCommentForm({
  postId,
  userId,
  userImageUrl,
  className,
}: CreateCommentFormProps) {
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(commentValidation),
    defaultValues: {
      comment: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof commentValidation>) => {
    await createComment({
      text: values.comment,
      path: pathname,
      postId,
      userId: JSON.parse(userId),
    });

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`mt-10 flex items-center gap-4 border-y border-y-neutral-700 py-5 max-sm:flex-col ${className}`}
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="w-full flex items-center gap-2">
              <FormLabel>
                <Image
                  src={userImageUrl}
                  alt="Profile image"
                  width={48}
                  height={48}
                  className="object-cover rounded-full"
                />
              </FormLabel>
              <FormControl className="bg-transparent text-neutral-50 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0">
                <Input
                  type="text"
                  placeholder="Type your comment here"
                  {...field}
                  className="outline-none border-none"
                  autoFocus
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="secondary"
          className="rounded-lg max-sm:w-full"
        >
          Add Comment
        </Button>
      </form>
    </Form>
  );
}
