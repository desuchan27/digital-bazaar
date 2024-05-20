import { FC } from 'react'
import Container from '@/components/layouts/web/Container'
import { Artwork } from '@prisma/client'
import ArtworksClient from './components/ArtworksClient'


interface pageProps {
    artworks: Artwork[]
}

const page: FC<pageProps> = ({
    artworks
}) => {
    return (
        <div className='py-[64px]'>
            <Container>
                <ArtworksClient artworks={artworks} />
            </Container>
        </div>
    )
}

export default page