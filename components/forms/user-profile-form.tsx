'use client';

import { ChangeEvent, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
  FormMessage,
  Textarea,
} from '@/components/client';
import { userValidation } from '@/lib/form-validation';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing';
import { IUser } from '@/types/user.interface';
import { updateUser } from '@/actions';

interface UserProfileFormProps {
  user: IUser;
  btnLabel: string;
  className?: string;
}

export default function UserProfileForm({
  user,
  btnLabel,
  className,
}: UserProfileFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing('media');
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(userValidation),
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

  const onSubmit = async (values: z.infer<typeof userValidation>) => {
    const blob = values.image;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes?.[0]?.url) {
        values.image = imgRes[0].url;
      }
    }

    await updateUser({
      id: user.id,
      username: values.username.toLowerCase(),
      name: values.name,
      image: values.image,
      bio: values.bio,
      path: pathname,
    });

    if (pathname === '/profile/edit') {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex flex-col justify-start gap-8 ${className}`}
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel className="flex h-24 w-24 items-center justify-center rounded-full bg-neutral-700">
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
              <FormControl className="flex-1 font-medium text-neutral-50">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload your photo"
                  className="cursor-pointer border-none bg-transparent outline-none file:text-orange-400"
                  onChange={(e) => handleImageUpload(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-2">
              <FormLabel className="font-medium text-neutral-50">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="px-4 py-2 border-none bg-neutral-700 text-neutral-50 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-2">
              <FormLabel className="font-medium text-neutral-50">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="px-4 py-2 border-none bg-neutral-700 text-neutral-50 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-2">
              <FormLabel className="font-medium text-neutral-50">Bio</FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className="px-4 py-2 border-none bg-neutral-700 text-neutral-50 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="secondary">
          {btnLabel}
        </Button>
      </form>
    </Form>
  );
}
