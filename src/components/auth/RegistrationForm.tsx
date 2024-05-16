"use client"

import { Controller } from 'react-hook-form';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, startTransition } from 'react'
import {
    Form,
    FormField,
    FormLabel,
    FormItem,
    FormControl
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { registerUserSchema } from '@/schema'
import { Input } from '../ui/input'
import {
    ToggleGroup,
    ToggleGroupItem
} from '../ui/toggle-group'
import { Button } from '../ui/button'
import Link from 'next/link'
import { register } from '@/actions/auth.actions';
import toast from 'react-hot-toast';

interface RegistrationFormProps {

}

const RegistrationForm: FC<RegistrationFormProps> = ({ }) => {

    const form = useForm<z.infer<typeof registerUserSchema>>({
        resolver: zodResolver(registerUserSchema),
        defaultValues: {
            email: '',
            username: '',
            name: '',
            password: '',
            confirmPassword: '',
            userType: ''
        }
    })

    const onSubmit = (values: z.infer<typeof registerUserSchema>) => {
        console.log(values)

        startTransition(() => {
            register(values).then((data) => {
                if (data?.error) {
                    form.reset()
                    toast.error(data.error)
                } else {
                    toast.success('Registration successful')
                }
            })
        })
    }

    return (
        <div className='w-screen h-3/4 rounded-lg overflow-hidden flex flex-row shadow-2xl bg-primary bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-indigo-500 via-indigo-300 to-indigo-100'>

            <div className='h-full w-2/5 bg-primary-foreground flex items-center justify-center flex-col'>
                <h1 className='text-xl font-semibold text-left'>Sign-up</h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='w-3/5'
                    >
                        <div className='space-y-2'>

                            {/* email */}
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='agreatartist@gmail.com'
                                                type='email'
                                            />
                                        </FormControl>
                                    )} />
                            </FormItem>

                            {/* name */}
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='Great Artist'
                                                type='string'
                                            />
                                        </FormControl>
                                    )} />
                            </FormItem>

                            {/* username */}
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='username'
                                    render={({ field }) => (
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='_greatartist'
                                                type='string'
                                            />
                                        </FormControl>
                                    )} />
                            </FormItem>

                            {/* password */}
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='*******'
                                                type='password'
                                            />
                                        </FormControl>
                                    )} />
                            </FormItem>

                            {/* confirm password */}
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormField
                                    control={form.control}
                                    name='confirmPassword'
                                    render={({ field }) => (
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder='*******'
                                                type='password'
                                            />
                                        </FormControl>
                                    )} />
                            </FormItem>

                            {/* user type */}
                            <FormItem className='flex items-center w-full justify-between'>
                                <FormLabel>Register as</FormLabel>
                                <Controller
                                    control={form.control}
                                    name='userType'
                                    render={({ field: { onChange, value } }) => (
                                        <FormControl>
                                            <ToggleGroup
                                                value={value}
                                                onValueChange={(newValue) => onChange(newValue)}
                                                variant="outline"
                                                type='single'
                                                className='mt-4'
                                            >
                                                <ToggleGroupItem value='customer'>Customer</ToggleGroupItem>
                                                <ToggleGroupItem value='artist'>Artist</ToggleGroupItem>
                                            </ToggleGroup>
                                        </FormControl>
                                    )}
                                />
                            </FormItem>
                        </div>

                        <Button type='submit' className='w-full mt-4'>Register</Button>
                        <p className='text-xs mt-4'>have an account? <span className='font-semibold text-indigo-700'><Link href='/login'>sign in</Link></span></p>
                    </form>

                </Form>
            </div>
            <div className='h-full w-3/5 flex justify-start text-primary'>
                <div className='flex flex-col items-start justify-center ml-4'>
                    <h1 className='text-9xl font-semibold '>
                        Digital <br /> Bazaaar
                    </h1>
                    <h1 className='font-semibold text-2xl ml-2 text-balance'>
                        Dive into Artistry: Your Online Hub <br />for Art Commissions
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default RegistrationForm