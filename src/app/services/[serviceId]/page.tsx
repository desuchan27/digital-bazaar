
import Container from '@/components/layouts/web/Container'
import { FC } from 'react'
import ServiceSection from './components/ServiceSection'
import { db } from '@/lib/db'

interface pageProps {
    params: {
        serviceId: string
    }
}

const page: FC<pageProps> = async ({
    params
}) => {

    const getService = await db.services.findUnique({
        where: {
            id: params.serviceId
        }
    })

    const getServiceName = getService?.name || null
    const getServiceDescription = getService?.description || null
    const getServiceStartingPrice = getService?.startingPrice || null
    const getServiceThumbnail = getService?.thumbnail || null

    const getUser = await db.user.findUnique({
        where: {
            id: getService?.userId
        }
    })

    //TODO: make services grid

    const getServices = await db.services.findMany({
        where: {
            userId: getUser?.id
        }
    })

    return (
        <div className='py-[64px] text-primary-foreground'>
            <Container>
                <ServiceSection
                    name={getServiceName}
                    description={getServiceDescription}
                    startingPrice={getServiceStartingPrice}
                    thumbnail={getServiceThumbnail}
                    userData={getUser}
                    serviceData={getService}

                />
            </Container>
        </div>
    )
}

export default page