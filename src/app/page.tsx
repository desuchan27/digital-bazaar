"use client"

import Homepage from "@/components/clientPages/Homepage";
import Container from "@/components/layouts/web/Container";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth/SessionContext";
import Image from "next/image";

export default function Home() {
  const session = useSession()

  // console.log(session)
  return (



    <div >
      <div className="relative h-screen">
        <AspectRatio ratio={16 / 10} className='h-screen flex flex-col justify-center items-center space-y-4 overflow-hidden'>
          <div className="landing-bg h-full w-full absolute z-0  scale-125 " />
          <div className="relative z-10 w-full h-screen">
            <Container>
              <div className="h-screen flex flex-col items-center justify-center text-primary-foreground space-y-8">
                <h1 className='font-bold text-4xl md:text-7xl text-center'>Your Gateway <br />to the Digital <br />Art Realm.</h1>
                <Button className='w-[30%] md:py-10 rounded-full md:text-2xl'>Explore</Button>
              </div>
            </Container>
          </div>
        </AspectRatio>
      </div>

      <div className="w-full h-screen bg-gradient-to-r relative overflow-hidden">
        <div className='h-[700px] w-[700px] absolute top-[9rem] left-[-15rem] bg-[#8889DA] opacity-50 flex items-center justify-center flex-col rounded-full blur-[100px] z-0' />
        <Container>
          <div className="h-screen flex flex-col items-center justify-center text-primary-foreground space-y-8">
            TODO: trending section
          </div>
        </Container>
      </div>

      <div className="w-full h-screen bg-gradient-to-r relative overflow-hidden ">
        <div className='h-[700px] w-[700px] absolute top-[10rem] right-[-15rem] bg-[#AAD9D9] opacity-50 flex items-center justify-center flex-col rounded-full blur-[100px] z-0' />
        <Container>
          <div className="h-screen flex flex-col items-center justify-center text-primary-foreground space-y-8">
            TODO: featured artist section
          </div>
        </Container>
      </div>
    </div>

  );
}
