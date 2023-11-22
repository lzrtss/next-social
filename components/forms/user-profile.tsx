'use client';

import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Textarea,
} from '@/components/client';
import { userSchema } from '@/lib/schemas';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing';
import { IUser } from '@/types/user.interface';

interface UserProfileProps {
  user: IUser;
  btnLabel: string;
}

export default function UserProfile({ user, btnLabel }: UserProfileProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing('media');

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      image: user?.image || '',
      name: user?.name || '',
      username: user?.username || '',
      bio: user?.bio || '',
    },
  });

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files?.length) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes('image')) {
        return;
      }

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || '';

        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    const blob = values.image;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes?.[0]?.url) {
        values.image = imgRes[0].url;
      }
    }

    console.log(values);
    // TODO: Update user profile
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-8"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel className="flex h-24 w-24 items-center justify-center rounded-full bg-neutral-800">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="Profile photo"
                    width={96}
                    height={96}
                    priority
                    className="object-contain rounded-full"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="Profile photo"
                    width={24}
                    height={24}
                    className="object-contain rounded-full"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 font-medium text-neutral-100">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload your photo"
                  className="cursor-pointer border-none bg-transparent outline-none file:text-sky-500"
                  onChange={(e) => handleImageUpload(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-2">
              <FormLabel className="font-medium text-neutral-100">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="px-4 py-2 border-none bg-neutral-800 text-neutral-50 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-2">
              <FormLabel className="font-medium text-neutral-100">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="px-4 py-2 border-none bg-neutral-800 text-neutral-50 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-2">
              <FormLabel className="font-medium text-neutral-100">
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className="px-4 py-2 border-none bg-neutral-800 text-neutral-50 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
          {btnLabel}
        </Button>
      </form>
    </Form>
  );
}
