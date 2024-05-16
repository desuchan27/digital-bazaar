'use client'

import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FC, startTransition, useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import { avatarFormSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { uploadAvatar } from '@/actions/user.actions';
import { UploadButton } from '@/utils/uploadthing';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ProfileImageUploadProps { }

const ProfileImageUpload: FC<ProfileImageUploadProps> = () => {
    const router = useRouter();

    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

    const form = useForm<z.infer<typeof avatarFormSchema>>({
        resolver: zodResolver(avatarFormSchema),
        defaultValues: {
            imageUrl: uploadedImageUrl || '',
        },
    });

    const onSubmit = (values: z.infer<typeof avatarFormSchema>) => {
        startTransition(() => {
            uploadAvatar(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        toast.error(data.error);
                        console.log(data.error);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    };

    const close = () => {
        toast.success('Avatar updated successfully');
        router.refresh();
    };

    return (
        <Dialog>
            <DialogTrigger className="w-full h-full">Upload Avatar</DialogTrigger>
            <DialogContent className='flex flex-col overflow-auto'>
                <DialogHeader>Add your avatar</DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4 h-full'
                    >
                        <FormItem>
                            <div className="flex flex-col items-center justify-center">
                                <UploadButton
                                    appearance={{
                                        button:
                                            "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-[#8889DA] px-4 bg-none after:bg-orange-400",
                                        container: "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
                                        allowedContent:
                                            "flex h-8 flex-col items-center justify-center px-2 text-white",
                                    }}
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        if (res && res.length > 0) {
                                            const uploadedFile = res[0];
                                            const uploadedUrl = uploadedFile.url;
                                            setUploadedImageUrl(uploadedUrl);
                                            form.setValue('imageUrl', uploadedUrl);
                                            const fileName = uploadedFile.name;
                                            setUploadedFileName(fileName);
                                            onSubmit({ imageUrl: uploadedUrl });
                                            alert(`Upload Completed. File name: ${fileName}`);
                                        } else {
                                            alert("No files uploaded.");
                                        }
                                    }}
                                    onUploadError={(error: Error) => {
                                        alert(`ERROR! ${error.message}`);
                                    }}
                                />
                            </div>
                        </FormItem>
                        {uploadedFileName && (
                            <div className="mt-4 w-full flex flex-col items-center justify-center">
                                <p className='text-xs'>Uploaded file: {uploadedFileName}</p>
                                <div className="h-full w-full flex items-center justify-center">
                                    <Image src={uploadedImageUrl || 'defaultImageUrl'} alt="Uploaded Image" width={300} height={300} objectFit='cover' className='rounded-full' />
                                </div>
                            </div>
                        )}
                        <Button onClick={close}>Save</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileImageUpload;

