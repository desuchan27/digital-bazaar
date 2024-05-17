'use client'

import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { serviceFormSchema } from '@/schema'
import { addService } from '@/actions/user.actions'
import toast from 'react-hot-toast'
import { Services } from '@prisma/client'
import { Input } from '@/components/ui/input'
import { UploadButton, UploadDropzone } from '@/utils/uploadthing'
import { HandCoins } from 'lucide-react'

interface ServiceFormProps {
}

const ServiceForm: FC<ServiceFormProps> = ({

}) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

    // const title = serviceData ? 'Edit Service' : 'Add Service'
    // const toastMessage = serviceData ? 'Service edited successfully' : 'Service added successfully'
    // const action = serviceData ? 'Save Changes' : 'Submit'

    const form = useForm<z.infer<typeof serviceFormSchema>>({
        resolver: zodResolver(serviceFormSchema),
        defaultValues: {
            name: '',
            description: '',
            imageUrl: uploadedImageUrl || '', // Default value is an empty string
            startingPrice: 0
        }
    })

    const onSubmit = (values: z.infer<typeof serviceFormSchema>) => {
        addService(values).then((data) => {
            if (data?.error) {
                form.reset()
                toast.error(data.error)
            } else {
                toast.success('Service added successfully!')
                setIsOpen(false)
                router.refresh()
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className='px-4 py-1 rounded-full bg-[#8889DA]'>
                <p className="flex flex-row justify-center items-center">
                    <HandCoins className='mr-2' size={20} />Add Service
                </p>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>New Service</DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                            placeholder='3D Art'
                                            type='text'
                                            autoComplete={Math.random().toString()}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder='A brief description of your service' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormItem>
                            <FormLabel>Upload Image</FormLabel>
                            <div className="w-full flex flex-col space-y-1 items-center justify-center">
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
                                            // Set the file name
                                            const fileName = uploadedFile.name;
                                            setUploadedFileName(fileName);
                                            alert(`Upload Completed. File name: ${fileName}`);
                                        } else {
                                            alert("No files uploaded.");
                                        }
                                    }}
                                    onUploadError={(error: Error) => {
                                        alert(`ERROR! ${error.message}`);
                                    }}
                                />
                                {uploadedFileName && <p className='text-xs'>Uploaded file: {uploadedFileName}</p>}
                            </div>

                            <FormMessage />
                        </FormItem>

                        <FormField
                            control={form.control}
                            name='startingPrice'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Starting Price</FormLabel>
                                    <FormControl>
                                        <Input {...field} type='number' placeholder='100' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type='submit'>Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ServiceForm
