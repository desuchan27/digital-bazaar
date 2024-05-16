"use client"

import ProfileSection from '@/components/layouts/web/ProfileSection'
import ContentSection from '@/components/layouts/web/ContentSection'
import { Button } from '@/components/ui/button'
import { useSession } from '@/lib/auth/SessionContext'
import { User } from '@prisma/client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FC, useState } from 'react'
import BioEditor from './BioEditor'
import ProfileImageUpload from './ProfileImageUpload'
import { Edit } from 'lucide-react'
import ProfileEditor from './ProfileEditor'

interface ProfileProps {
    name: string | null
    userName: string | null
    bio: string | null
    date: string | null
    image: string | null
    artworks: any | null
    services: any | null
    initialData: User | null
}

const Profile: FC<ProfileProps> = ({
    name,
    userName,
    bio,
    image,
    artworks,
    services,
    initialData
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const pathName = usePathname()
    const session = useSession()
    const isCurrentUser = session?.user?.name === name

    console.log(session)

    return (
        <div className='h-full space-y-4'>

            {/* profile header */}
            <ProfileSection>
                <div className='flex flex-row h-full'>
                    <div className='w-1/3 h-full flex items-center justify-center overflow-hidden'>
                        <div className='relative w-[250px] h-[250px] rounded overflow-hidden'>
                            {isCurrentUser && session && image && image.length >= 1 ? (
                                <div className='rounded-full overflow-hidden'>
                                    <Image src={image} width={250} height={250} objectFit='cover' alt={`${name}'s image`} />
                                </div>
                            ) : (
                                isCurrentUser ? <ProfileImageUpload /> : null
                            )}
                            {isCurrentUser && (
                                <Button className='absolute bottom-0 right-0 mb-2 mr-2 bg-[#8889DA] text-white font-bold py-2 px-4 rounded  transition-opacity duration-200'>
                                    <Edit size={24} />
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className='w-2/3 flex flex-col justify-center space-y-4 px-4'>

                        <div className='flex flex-row items-end'>
                            <h2 className='text-4xl font-semibold'>{name}</h2> <span className='ml-4 text-sm text-slate-400'>{userName}</span>
                        </div>

                        {isCurrentUser && session ? (<div className='flex flex-row space-x-4 my-4 '>
                            <ProfileEditor initialData={initialData} />
                            <Button className='px-4 py-1 rounded-full bg-[#8889DA]'>Upload artwork</Button>
                            <Button className='px-4 py-1 rounded-full bg-[#8889DA]'>Add new service</Button>
                        </div>) :
                            <div>
                                <Button className='px-4 py-1 rounded-full bg-[#8889DA]'>Contact Artist</Button>
                            </div>
                        }
                        <div >
                            {isCurrentUser && session && bio && bio.length > 0 ? (<p>{bio}</p>) : (isCurrentUser ? <BioEditor /> : null)}
                        </div>

                        <div className='flex flex-col justify-between mt-auto space-y-1 text-sm'>
                            <div className='overflow-x-auto'>
                                <p>Artworks: {artworks > 0 ? <span>artworks</span> : 'None'}</p>
                            </div>

                            <div className='overflow-x-auto'>
                                <p>Services: {services.length > 0 ? <span>services </span> : 'None'}</p>
                            </div>

                            <div className='overflow-x-auto'>
                                <p>Joined: {session.user?.createdAt.toDateString()} </p>
                            </div>

                        </div>
                    </div>
                </div>
            </ProfileSection>

            {/* artworks */}
            <ContentSection>
                <h3 className='text-2xl'>All Artworks</h3>
            </ContentSection>

            {/* Services */}
            <ContentSection>
                <h3 className='text-2xl'>All services</h3>
            </ContentSection>
        </div>
    )
}

export default Profile