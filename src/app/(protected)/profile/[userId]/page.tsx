import { FC } from 'react'
import Profile from './components/Profile'
import Container from '@/components/layouts/web/Container'
import { db } from '@/lib/db'
import { validateRequest } from '@/auth'


const page = async ({ params }: {
    params: {
        userId: string
    }
}) => {

    const session = await validateRequest()
    const sessionId = session.user?.id

    const getUser = await db.user.findUnique({
        where: {
            id: params.userId
        }
    })

    const getUserName = getUser?.name || null
    const getUserUsername = getUser?.username || null
    const getUserBio = getUser?.bio || null
    const getUserImage = getUser?.image || null
    const getUserDate = getUser?.createdAt.toDateString() || null

    const getArtworks = await db.artwork.findMany({
        where: {
            userId: params.userId
        }
    })

    const getServices = await db.services.findMany({
        where: {
            userId: params.userId
        }
    })

    console.log("get user: ", getUser)

    return (
        <div className='text-primary-foreground pt-[60px] h-fit'>
            <div className="mx-4 my-4">
                <Container>
                    <Profile
                        name={getUserName}
                        userName={getUserUsername}
                        bio={getUserBio}
                        date={getUserDate}
                        image={getUserImage}
                        artworks={getArtworks}
                        services={getServices}
                        initialData={getUser}
                    />
                </Container>
            </div>
        </div>
    )
}

export default page