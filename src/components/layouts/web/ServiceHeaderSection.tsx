"use client"
import { FC } from 'react'

interface ServiceSectionProps {
    children: React.ReactNode
}

const ServiceSection: FC<ServiceSectionProps> = ({
    children
}) => {
    return (
        <div className='w-full h-fit rounded-sm bg-[#1E1F57] overflow-hidden'>{children}</div>
    )
}

export default ServiceSection