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
  FormMessage,
  Input,
} from '@/components/client';
import { commentValidation } from '@/lib/form-validation';
import { createComment } from '@/actions';

interface CreateCommentFormProps {
  btnLabel: string;
  currentUserId: string;
  currentUserImageUrl: string;
  className?: string;
  postId: string;
}

export default function createCommentForm({
  btnLabel,
  currentUserId,
  currentUserImageUrl,
  className,
  postId,
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
      userId: JSON.parse(currentUserId),
    });

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-4 border-y border-y-neutral-750 py-5 max-sm:flex-col ${className}`}
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="w-full flex items-center gap-2">
              <FormLabel>
                <Image
                  src={currentUserImageUrl}
                  alt="Profile image"
                  width={48}
                  height={48}
                  className="object-cover rounded-full"
                />
              </FormLabel>
              <FormControl className="bg-transparent text-neutral-50 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0">
                <Input
                  type="text"
                  placeholder="Comment (280 chars max)"
                  {...field}
                  className="outline-none border-none"
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="secondary"
          className="rounded-lg max-sm:w-full"
        >
          {btnLabel}
        </Button>
      </form>
    </Form>
  );
}
