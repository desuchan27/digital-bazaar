"use client"

import { HandCoins, LogIn, User } from 'lucide-react'
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

interface MainNavProps {

}

const MainNav: FC<MainNavProps> = ({ }) => {

    const pathName = usePathname()

    const session = useSession()

    console.log(session.user)


    return (
        <nav>
            <ul className='flex flex-row gap-x-4'>

                {/* services */}
                <li
                    className={
                        cn('w-[35px] h-[35px] flex items-center justify-center rounded-sm relative',
                            pathName === '/services' ? 'bg-primary-foreground' : 'bg-none')
                    }
                >
                    <Link href='/'>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <HandCoins className={cn(pathName === '/' ? 'text-primary' : '')} />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className='mt-3'>
                                    <p>Services</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>
                </li>

                {/* login */}
                {!session.user ? (<Link href='/login'>
                    <li
                        className={
                            cn('w-[35px] h-[35px] flex items-center justify-center rounded-sm relative',
                                pathName === '/login' ? 'bg-primary-foreground' : 'bg-none')
                        }
                    >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <LogIn className={cn(pathName === '/login' ? 'text-primary' : '')} />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className='mt-3'>
                                    <p>Login</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </li>
                </Link>) : (
                    <li
                        className='w-[35px] h-[35px] flex items-center justify-center rounded-sm relative'
                    >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <User />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className='mt-3'>
                                    <p>{session.user.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                    </li>
                )
                }
            </ul>
        </nav>
    )
}

export default MainNav