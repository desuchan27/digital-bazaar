import Homepage from "@/components/clientPages/Homepage";
import Container from "@/components/layouts/web/Container";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (

    <div >
      <div className="relative">
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

      <div className="w-full h-screen bg-gradient-to-r ">
        test
      </div>
    </div>

  );
}
