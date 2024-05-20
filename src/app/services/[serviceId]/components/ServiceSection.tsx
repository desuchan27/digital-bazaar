"use client"

import { getArtworks } from '@/actions/artwork.actions'
import { getServices } from '@/actions/services.actions'
import ContentSection from '@/components/layouts/web/ContentSection'
import ServiceHeaderSection from '@/components/layouts/web/ServiceHeaderSection'
import SideSection from '@/components/layouts/web/SideSection'
import ArtworkCard from '@/components/ui/ArtworkCard'
import ServiceCard from '@/components/ui/ServicesCard'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { ArtworkWithUser, ServiceWithUser } from '@/types'
import { Artwork, Services, User } from '@prisma/client'
import { ArrowUpRight, ChevronRight, MoreHorizontal, SparkleIcon, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FC } from 'react'

interface ServiceSectionProps {
    // name: string | null
    // description: string | null
    // startingPrice: number | null
    // thumbnail: string | null
    serviceData: Services | null
    servicesData: Services[] | null
    artworksData: Artwork[] | null
    userData: User | null
}

const ServiceSection: FC<ServiceSectionProps> = ({
    // name,
    // description,
    // startingPrice,
    // thumbnail,
    serviceData,
    artworksData,
    userData
}) => {

    const [services, setServices] = useState<ServiceWithUser[]>([]);
    const [artworks, setArtworks] = useState<ArtworkWithUser[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            const result = await getServices()
            setServices(result.services)
        }
        fetchServices()
    }, [])

    useEffect(() => {
        const fetchArtworks = async () => {
            const result = await getArtworks()
            setArtworks(result.artworks)
        }
        fetchArtworks()
    }, [])
    console.log("service data: ", serviceData)

    const toUserProfile = () => {
        window.location.href = `/profile/${userData?.id}`
    }

    return (
        <div className='px-4 py-4 flex flex-col w-full space-y-4 md:space-y-0 md:space-x-4 md:flex-row md:px-0'>
            <div className="w-full space-y-4 md:w-3/4">
                <ServiceHeaderSection>
                    <div className='flex flex-col md:flex-row'>
                        <div className="relative w-full md:w-3/5 md:hidden ">
                            <AspectRatio ratio={4 / 3}>
                                <Image src={serviceData?.thumbnail || ''} fill alt="test" objectFit='cover' />
                            </AspectRatio>
                        </div>
                        <div className="relative w-full md:w-3/5 hidden md:block md:min-h-[500px]">
                            {/* <AspectRatio ratio={16 / 9}> */}
                            <Image src={serviceData?.thumbnail || ''} fill alt="test" objectFit='cover' />
                            {/* </AspectRatio> */}
                        </div>
                        <div className='w-full px-4 my-4 space-y-4 md:w-2/5 md:py-0'>
                            <div className='w-full space-y-0'>
                                <h1 className="text-2xl font-semibold md:text-4xl">
                                    {serviceData?.name}
                                </h1>
                                {/* <p className='text-2xl font-extralight'>
                                    Starting at:<br />
                                    <span className='text-orange-200 font-semibold'>
                                        ₱{' '}{serviceData?.startingPrice}
                                    </span>
                                </p> */}

                            </div>

                            <p className='text-sm md:text-base'>
                                {serviceData?.description.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </p>
                            <Separator />

                            {/* mobile */}
                            <div className="space-y-2 hidden md:block">
                                <p className='mx-auto text-md font-extralight md:text-xl'>Starts at: <span className='font-semibold text-orange-300'>₱ {serviceData?.startingPrice}</span></p>
                                <Button className='bg-[#8889DA] rounded-full'><Sparkles size={20} className='mr-2' /> Interested!</Button>
                            </div>

                            {/* desktop */}
                            <div className="space-y-2 w-full flex flex-col md:hidden">
                                <p className='mx-auto text-md font-extralight md:text-xl'>Starts at: <span className='font-semibold text-orange-300'>₱ {serviceData?.startingPrice}</span></p>
                                <Button className='bg-[#8889DA] rounded-full'><Sparkles size={20} className='mr-2' /> Interested!</Button>
                            </div>
                        </div>
                    </div>
                </ServiceHeaderSection>

                {/* mobile */}
                {artworks
                    .filter(artwork => artwork.userId === userData?.id && artwork.serviceId === serviceData?.id)
                    .length > 0 && (
                        <div className='hidden md:block'>
                            <ContentSection>
                                <div className="min-h-full h-fit space-y-4">
                                    <div className="flex flex-row w-full items-center justify-between">
                                        <h2 className='text-xl'>Available artworks under {serviceData?.name}</h2>
                                        {artworks
                                            .filter(artwork => artwork.userId === userData?.id && artwork.serviceId === serviceData?.id)
                                            .length > 4 && (
                                                <Link
                                                    href={`/services/${userData?.id}`}
                                                    className='text-sm flex flex-row items-center justify-end hover:text-[#8889DA] md:text-base'
                                                >See More <ChevronRight className='ml-2' size={25} /></Link>
                                            )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {artworks
                                            .filter(artwork => artwork.userId === userData?.id && artwork.serviceId === serviceData?.id)
                                            .slice(0, 4)
                                            .map((artwork, i) => (
                                                <ArtworkCard key={artwork.id} data={artwork} />
                                            ))}
                                    </div>


                                </div>
                            </ContentSection>
                        </div>
                    )}
            </div>
            <div className='w-full space-y-4 md:w-1/4'>
                <ServiceHeaderSection>
                    <div
                        onClick={toUserProfile}
                        className="space-y-4 cursor-pointer"
                    >
                        <div className="w-full flex flex-row justify-start items-center">
                            <div className='aspect-square relative h-[80px] md:h-[100px]'>
                                <Image src={userData?.image || ''} fill alt="test" objectFit='cover' />
                            </div>


                            <div className='ml-4'>
                                <p className="text-xs">Artist</p>
                                <p className='text-2xl font-semibold md:text-lg'>{userData?.username}</p>
                                <p className='text-xs'>view profile</p>
                            </div>

                        </div>
                    </div>
                </ServiceHeaderSection>
                <SideSection>
                    <div className="w-full flex flex-row justify-between items-center py-2">
                        <h4 className='text-sm md:text-base'>Recent from {userData?.username}</h4>
                        {artworks
                            .filter(artwork => artwork.userId === userData?.id && artwork.serviceId === serviceData?.id)
                            .length > 4 && (
                                <Link
                                    href={`/services/${userData?.id}`}
                                    className='text-xs flex flex-row items-center justify-end hover:text-[#8889DA] md:text-base'
                                >See More <ChevronRight className='ml-2' /></Link>
                            )}
                    </div>
                    <Carousel
                        className='md:hidden'
                    >
                        <CarouselContent>
                            {services.filter(service => service.userId === userData?.id && service.id !== serviceData?.id).slice(0, 4).map((service, i) => (
                                <CarouselItem key={service.id} className='basis-1/2'>
                                    <ServiceCard data={service} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    <div className='hidden md:grid mt-4 md:space-y-4'>
                        {services.filter(service => service.userId === userData?.id && service.id !== serviceData?.id).slice(0, 4).map((service, i) => (
                            <ServiceCard key={service.id} data={service} />
                        ))}
                    </div>
                    {/* <div>
                        <Link
                            href={`/services/${userData?.id}`}
                            className='text-sm flex flex-row items-center justify-end md:pt-4 hover:text-[#8889DA]'
                        >See More <ChevronRight className='ml-2' size={25} /></Link>
                    </div> */}
                </SideSection>
                {artworks
                    .filter(artwork => artwork.userId === userData?.id && artwork.serviceId === serviceData?.id)
                    .length > 0 && (
                        <div className='block md:hidden'>
                            <ContentSection>
                                <div className="min-h-full h-fit space-y-4">

                                    <h2 className='text-sm md:text-xl'>Available artworks under {serviceData?.name}</h2>

                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {artworks
                                            .filter(artwork => artwork.userId === userData?.id && artwork.serviceId === serviceData?.id)
                                            .slice(0, 4)
                                            .map((artwork, i) => (
                                                <ArtworkCard key={artwork.id} data={artwork} />
                                            ))}
                                    </div>

                                    {artworks
                                        .filter(artwork => artwork.userId === userData?.id && artwork.serviceId === serviceData?.id)
                                        .length > 4 && (
                                            <Link
                                                href={`/services/${userData?.id}`}
                                                className='text-xs flex flex-row items-center justify-end hover:text-[#8889DA] md:text-base'
                                            >See More <ChevronRight className='ml-2' size={25} /></Link>
                                        )}


                                </div>
                            </ContentSection>
                        </div>
                    )}
            </div>
        </div>


    )
}

export default ServiceSection