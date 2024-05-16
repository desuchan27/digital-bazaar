"use client"

import { HandCoins, LinkIcon, LogIn, LogOutIcon, SquareArrowUp, SquareArrowUpRight, User, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '../ui/tooltip'
import { cn } from '@/lib/utils'
import { useSession } from '@/lib/auth/SessionContext'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { LogoutButton } from '../auth/LogoutButton'


interface MainNavProps {

}

const MainNav: FC<MainNavProps> = ({ }) => {

    const pathName = usePathname()
    const session = useSession()




    return (
        <nav>
            <ul className='flex flex-row gap-x-4'>

                {/* services */}

                <li
                    className={
                        cn('w-[35px] h-[35px] flex items-center justify-center rounded-sm relative ',
                            pathName === '/services' ? 'bg-primary-foreground' : 'bg-none')
                    }
                >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <HandCoins className={cn(pathName === '/' ? 'text-primary-foreground' : '')} />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className='mt-3'>
                                Services
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </li>

                {/* login */}
                {!session.user ? (

                    <li
                        className={
                            cn('w-[35px] h-[35px] flex items-center justify-center rounded-sm relative',
                                pathName === '/login' ? 'bg-primary-foreground' : 'bg-none')
                        }
                    >
                        <Link href='/login'>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className='absolute inset-0 flex items-center justify-center'>
                                            <LogIn className={cn(pathName === '/login' ? 'text-primary' : '')} />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className='mt-3'>
                                        Login
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Link>
                    </li>

                ) : (
                    <li
                        className={
                            cn('w-[35px] h-[35px] flex items-center justify-center rounded-sm relative mr-4',
                                pathName === '/profile' ? 'bg-primary-foreground' : 'bg-none')
                        }>

                        <Popover>
                            <PopoverTrigger>
                                <UserIcon className={
                                    cn(pathName === '/profile' ? 'text-primary' : 'bg-none')
                                } />
                            </PopoverTrigger>
                            <PopoverContent className='w-fit mt-2'>
                                <ul className='flex flex-col items-start space-y-2'>
                                    <li >
                                        <Link href={`/profile/${session.user.id}`} className='flex flex-row'>
                                            <SquareArrowUpRight className='text-primary mr-2' />{session.user.name}
                                        </Link>
                                    </li>
                                    <li >
                                        <LogoutButton >
                                            <span className='flex flex-row'>
                                                <LogOutIcon className='text-primary mr-2' /> Logout
                                            </span>
                                        </LogoutButton>
                                    </li>
                                </ul>
                            </PopoverContent>
                        </Popover>


                        {/* <Popover>
                            <PopoverTrigger className='flex flex-row'>
                                <UserIcon />
                                <p style={{ whiteSpace: 'nowrap' }}>{session.user.name}</p>
                            </PopoverTrigger>
                            <PopoverContent>
                                <ul className='w-[150px] mt-2 space-y-4'>
                                    <li >
                                        <Link href='/profile' className='flex flex-row'>
                                            <User className='mr-4' />Profile
                                        </Link>
                                    </li>
                                    <li >
                                        <LogoutButton >
                                            <div className='flex flex-row'>
                                                <LogOutIcon className='mr-4' />Log out
                                            </div>
                                        </LogoutButton>
                                    </li>
                                </ul>


                            </PopoverContent>
                        </Popover> */}



                    </li>
                )
                }
            </ul>
        </nav>
    )
}

export default MainNav