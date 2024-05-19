import { FC } from 'react'
import Services from './components/Services'
import Container from '@/components/layouts/web/Container'
import { Services as ServicesDb } from '@prisma/client'

interface pageProps {
    services: ServicesDb
}

const page: FC<pageProps> = ({
    services
}) => {
    return (
        <div className='py-[64px]'>
            <Container>
                <Services services={services} />
            </Container>
        </div>
    )
}

export default page