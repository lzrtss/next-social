'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Textarea,
} from '@/components/client';
import { postValidation } from '@/lib/form-validation';
import { createPost } from '@/actions';

interface CreatePostFormProps {
  userId: string;
  btnLabel: string;
  className?: string;
}

export default function CreatePostForm({
  userId,
  btnLabel,
  className,
}: CreatePostFormProps) {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(postValidation),
    defaultValues: {
      post: '',
      userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof postValidation>) => {
    await createPost({
      author: userId,
      text: values.post,
      communityId: null,
      path: pathname,
    });

    router.push('/');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex flex-col gap-6 ${className}`}
      >
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-2">
              <FormControl className="border bg-neutral-700 border-neutral-800 text-neutral-50 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0">
                <Textarea
                  placeholder="Type your post here"
                  rows={5}
                  {...field}
                  className="text-md rounded-lg"
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
          className="w-[240px] text-md rounded-lg"
        >
          {btnLabel}
        </Button>
      </form>
    </Form>
  );
}
