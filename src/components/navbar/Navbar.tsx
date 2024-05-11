"use client"

import { usePathname } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import Container from '../layouts/web/Container'

interface NavbarProps {

}

const Navbar: FC<NavbarProps> = ({ }) => {

    const pathName = usePathname()

    return (
        <div className='w-full fixed top-0 left-0 z-50 backdrop-blur border-b' >
            <Container>
                <div className='text-primary-foreground flex flex-row w-full items-center justify-between h-[64px] '>
                    <h2 className='font-semibold'>Digital Bazaaar</h2>
                    <div>test</div>
                </div>
            </Container>
        </div>
    )
}

export default Navbar