"use client"

import ContentSection from '@/components/layouts/web/ContentSection'
import { Services, User } from '@prisma/client'
import Image from 'next/image'
import { FC } from 'react'

interface ServiceSectionProps {
    name: string | null
    description: string | null
    startingPrice: number | null
    thumbnail: string | null
    serviceData: Services | null
    userData: User | null
}

const ServiceSection: FC<ServiceSectionProps> = ({
    name,
    description,
    startingPrice,
    thumbnail,
    serviceData,
    userData
}) => {
    return (
        <div className='py-4 w-full h-full'>
            <ContentSection>
                <div className='px-2 py-2 h-full w-full'>
                    <div className='flex flex-row items-center justify-center'>
                        <div className='w-2/3 relative overflow-hidden'>
                            <Image
                                src={thumbnail || ''}
                                alt={name || ''}
                                fill
                                objectFit='cover'
                            />
                        </div>
                    </div>
                </div>
            </ContentSection>
        </div>
    )
}

export default ServiceSection