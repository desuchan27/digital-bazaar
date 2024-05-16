"use client"
import { FC } from 'react'

interface ContentSectionProps {
    children: React.ReactNode
}

const ContentSection: FC<ContentSectionProps> = ({
    children
}) => {
    return (
        <div className='w-full h-[700px] rounded-sm bg-[#1E1F57] overflow-auto px-6 py-6'>{children}</div>
    )
}

export default ContentSection