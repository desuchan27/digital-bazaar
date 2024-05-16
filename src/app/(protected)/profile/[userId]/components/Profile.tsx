"use client"

import ProfileSection from '@/components/layouts/web/ProfileSection'
import ContentSection from '@/components/layouts/web/ContentSection'
import { Button } from '@/components/ui/button'
import { useSession } from '@/lib/auth/SessionContext'
import { Services, User } from '@prisma/client'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FC, useState } from 'react'
import BioEditor from './BioEditor'
import ProfileImageUpload from './ProfileImageUpload'
import { Edit, User as UserIcon } from 'lucide-react'
import ProfileEditor from './ProfileEditor'
import ServiceForm from './ServiceForm'

interface ProfileProps {
    name: string | null
    userName: string | null
    bio: string | null
    date: string | null
    image: string | null
    artworks: any | null
    services: any | null
    userData: User | null
    userType: string | null
    servicesData: Services | null
}

const Profile: FC<ProfileProps> = ({
    name,
    userName,
    bio,
    image,
    artworks,
    services,
    userData,
    userType,
    servicesData
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
                        <div className='relative  w-[250px] h-[250px] rounded overflow-hidden'>
                            {image && image.length >= 1 ? (
                                <>
                                    <div className='overflow-hidden'>
                                        <Image src={image} fill objectFit='cover' className='rounded-full' alt={`${name}'s image`} />
                                    </div>
                                    {isCurrentUser && session && (
                                        <Button className='absolute bottom-0 right-0 mb-2 mr-2 bg-[#8889DA] text-white font-bold py-2 px-4 rounded  transition-opacity duration-200'>
                                            <Edit size={24} />
                                        </Button>
                                    )}
                                </>
                            ) : (
                                isCurrentUser && session ? (
                                    <div className='w-[250px] h-[250px] flex items-center justify-center bg-[#8889DA] rounded-full overflow-hidden'>
                                        <ProfileImageUpload />
                                    </div>
                                ) : (
                                    <div className='w-[250px] h-[250px] flex items-center justify-center bg-[#8889DA] rounded-full overflow-hidden'>
                                        <UserIcon size={200} color='white' />
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div className='w-2/3 flex flex-col justify-center space-y-4 px-4'>

                        <div className='flex flex-row items-end'>
                            <h2 className='text-4xl font-semibold'>{name}</h2> <span className='ml-4 text-sm text-slate-400'>{userName}</span>
                        </div>

                        <div>
                            {bio && bio.length > 0 ? (
                                <p>{bio}</p>
                            ) : (
                                isCurrentUser && session ? <BioEditor /> : null
                            )}
                        </div>

                        {isCurrentUser && session && session.user ? (
                            session.user.type && userType === "ARTIST" ? (
                                <div className='flex flex-row space-x-4 my-4 '>
                                    <ProfileEditor userData={userData} />
                                    <Button className='rounded-full bg-[#8889DA]'>Post new artwork</Button>
                                    <ServiceForm />
                                </div>
                            ) : (
                                <div className='flex flex-row space-x-4 my-4'>
                                    <ProfileEditor userData={userData} />
                                </div>
                            )
                        ) : (
                            <div>
                                <Button className='px-4 py-1 rounded-full bg-[#8889DA]'>Contact</Button>
                            </div>
                        )}


                        {userType === "ARTIST" ? (
                            <div className='flex flex-col justify-between mt-auto space-y-1 text-sm'>
                                <div className='overflow-x-auto'>
                                    <p>Artworks: {artworks.length > 0 ? <span>{artworks.length}</span> : 'None'}</p>
                                </div>

                                <div className='overflow-x-auto'>
                                    <p>Services: {services.length > 0 ? <span>{services.length}</span> : 'None'}</p>
                                </div>

                                <div className='overflow-x-auto'>
                                    <p>Joined: {session.user?.createdAt.toDateString()} </p>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col justify-between mt-auto space-y-1 text-sm'>
                                <div className='overflow-x-auto'>
                                    <p>Joined: {session.user?.createdAt.toDateString()} </p>
                                </div>
                            </div>
                        )

                        }


                    </div>
                </div>
            </ProfileSection>

            {/* Services */}
            <ContentSection>
                <h3 className='text-2xl'>All services</h3>
                <div className="mt-5 grid grid-cols-1 gap-4">
                    {services.map((service: Services) => (
                        <div key={service.id} className='space-y-2 overflow-x-auto'>
                            <div className='relative w-[200px] h-[200px] overflow-hidden rounded-sm'>
                                <Image src={service.thumbnail} fill objectFit='cover' alt={service.name} />
                            </div>
                            <h4 className="mt-2 font-semibold">{service.name}</h4>
                            <p className='font-extralight text-slate-400'>₱ {service.startingPrice}</p>
                        </div>
                    ))}
                </div>
            </ContentSection>

            {/* artworks */}
            <ContentSection>
                <h3 className='text-2xl'>All Artworks</h3>
            </ContentSection>


        </div>
    )
}

export default Profile