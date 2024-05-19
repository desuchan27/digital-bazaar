"use client"

import { getArtworks, getAuthor } from "@/actions/artwork.actions";
import Homepage from "@/components/clientPages/Homepage";
import Container from "@/components/layouts/web/Container";
import ContentSection from "@/components/layouts/web/ContentSection";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth/SessionContext";
import { Artwork, User, UserType } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ArtworkWithUser extends Artwork {
  user: User;
}

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const [artworks, setArtworks] = useState<ArtworkWithUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const session = useSession();

  const totalPages = Math.ceil(artworks.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    const fetchArtworks = async () => {
      const result = await getArtworks();
      setArtworks(result.artworks);
    };
    fetchArtworks();
  }, []);

  // console.log(session)
  return (
    <div >
      {!session.user && <div className="relative h-screen">
        <AspectRatio ratio={16 / 10} className='h-screen flex flex-col justify-center items-center space-y-4 overflow-hidden'>
          <div className="landing-bg h-full w-full absolute z-0  scale-125 " />
          <div className="relative z-50 w-full h-screen">
            <Container>
              <div className="h-screen flex flex-col items-center justify-center text-primary-foreground space-y-8">
                <h1 className='font-bold text-4xl md:text-7xl text-center'>Your Gateway <br />to the Digital <br />Art Realm.</h1>
                <Button className='w-[30%] md:py-10 rounded-full md:text-2xl'>Explore</Button>
              </div>
            </Container>
          </div>
        </AspectRatio>
      </div>}

      <div className="w-full h-screen bg-gradient-to-r relative overflow-hidden">
        <div className='h-[400px] w-[400px] md:h-[350px] md:w-[350px] xl:h-[700px] xl:w-[700px] absolute top-[9rem] left-[-15rem] bg-[#8889DA] opacity-50 flex items-center justify-center flex-col rounded-full blur-[100px] z-0' />
        <Container>
          <div className="h-screen flex flex-col items-center justify-center text-primary-foreground space-y-8">
            <h2 className="text-xl font-bold">What&apos;s trending</h2>
          </div>
        </Container>
      </div>

      <div className="w-full h-fit bg-gradient-to-r relative overflow-hidden py-[80px]">
        <div className='h-[400px] w-[400px] md:h-[350px] md:w-[350px] xl:h-[700px] xl:w-[700px] absolute top-[9rem] left-[-15rem] bg-[#8889DA] opacity-50 flex items-center justify-center flex-col rounded-full blur-[100px] z-0' />
        <Container>
          <ContentSection>
            <div className="h-full flex flex-col items-center justify-center text-primary-foreground space-y-8 z-10 relative opacity">
              <h2 className="text-xl font-bold">Recent Artworks from various artists</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {artworks
                  .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                  .map((artwork) => (
                    <div key={artwork.id} className='bg-primary background rounded-lg p-4'>
                      <div className="relative w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] aspect-square ">
                        <Image src={artwork.imageUrl} fill alt="test" objectFit='cover' className="rounded-sm" />
                      </div>
                      <h3 className='text-lg font-bold'>{artwork.title}</h3>
                      <p>{artwork.user.name}</p>
                      {/* <p>{artwork.description}</p> */}
                      <p>₱ {artwork.startingPrice}</p>
                    </div>
                  ))}

              </div>
              <div className="flex flex-row w-full justify-between items-center px-2 py-4">
                <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                  Previous
                </Button>
                <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                  Next
                </Button>
              </div>
            </div>
          </ContentSection>
        </Container>
      </div>

      <div className="w-full h-screen bg-gradient-to-r relative overflow-hidden ">
        <div className='h-[400px] w-[400px] md:h-[350px] md:w-[350px] xl:h-[700px] xl:w-[700px] absolute top-[10rem] right-[-15rem] bg-[#AAD9D9] opacity-50 flex items-center justify-center flex-col rounded-full blur-[100px] z-0' />
        <Container>
          <div className="h-screen flex flex-col items-center justify-center text-primary-foreground space-y-8">
            TODO: featured artist section
          </div>
        </Container>
      </div>
    </div>

  );
}
