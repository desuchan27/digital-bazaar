"use client"
import { FC } from 'react'

interface ProfileSectionProps {
    children: React.ReactNode
}

const ProfileSection: FC<ProfileSectionProps> = ({
    children
}) => {
    return (
        <div className='w-full h-[300px] rounded-sm bg-[#1E1F57] overflow-auto px-6 py-6'>{children}</div>
    )
}

export default ProfileSection