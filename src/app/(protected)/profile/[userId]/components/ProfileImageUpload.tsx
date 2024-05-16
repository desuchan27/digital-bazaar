
import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { FormField } from '@/components/ui/form'

import { FC, startTransition } from 'react'
import { Form, useForm } from 'react-hook-form'
import { avatarFormSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import ImageUpload from '@/components/ImageUpload'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { uploadAvatar } from '@/actions/user.actions'
import { UploadButton } from '@/utils/uploadthing'
import { Button } from '@/components/ui/button'

interface ProfileImageUploadProps {

}

const ProfileImageUpload: FC<ProfileImageUploadProps> = ({ }) => {

    const router = useRouter()

    const form = useForm<z.infer<typeof avatarFormSchema>>({
        resolver: zodResolver(avatarFormSchema),
        defaultValues: {
            imageUrl: ''
        }
    })

    // const handleUploadSuccess = (imageUrl: string) => {
    //     // Update the form value with the uploaded image URL
    //     form.setValue('imageUrl', imageUrl);
    // };

    // const handleUploadError = (error: Error) => {
    //     toast.error(error.message);
    // };

    const onSubmit = (values: z.infer<typeof avatarFormSchema>) => {
        console.log(values)

        startTransition(() => {
            uploadAvatar(values).then((data) => {
                if (data?.error) {
                    form.reset()
                    toast.error(data.error)
                    console.log(data.error)
                } else {

                    toast.success('Avatar updated successfully')
                    router.refresh()
                }
            }).catch((error) => {
                console.log(error)
            })
        })
    }



    return (
        <Dialog>
            <DialogTrigger>
                Upload Avatar
            </DialogTrigger>
            <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
                <DialogHeader>
                    Add your avatar
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='imageUrl'
                            render={({ field }) => (
                                <div className="flex-col items-center justify-between p-24">
                                    <UploadButton
                                        {...field}
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            // Do something with the response
                                            // form.setValue('imageUrl', res[0].url)
                                            console.log("Files: ", res);
                                            alert("Upload Completed");
                                        }}
                                        onUploadError={(error: Error) => {
                                            // Do something with the error.
                                            alert(`ERROR! ${error.message}`);
                                        }}
                                    />
                                </div>
                            )}
                        />
                        <Button type='submit'>Upload</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );

}

export default ProfileImageUpload


