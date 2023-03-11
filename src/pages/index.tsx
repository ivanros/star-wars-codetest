import FeatureCard from '@/components/feature-card';
import { featuresData } from '@/data';
import { Button, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="relative py-24 flex flex-col content-center items-center justify-center gap-12 lg:gap-20 lg:h-screen lg:py-0">
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="flex flex-col justify-center items-center w-full text-center gap-10">
              <Image
                src="/logo.png"
                alt="Star Wars logo"
                width="300"
                height="250"
                className="w-200 h-150 lg:w-auto lg:h-auto"
              />
              <Typography
                variant="lead"
                color="white"
                className="opacity-80 text-sm lg:px-[20%] lg:text-md"
              >
                Welcome to the world of Star Wars, where you will find an infinite number of
                galaxies, planets and the most colorful beings. Enter an endless amount of valuable
                information about the habitat that awaits you in your next home or just gossip about
                the different visitors staying there.
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex justify-center lg:mb-12">
          <Link role="link" href="/planets" aria-label="View all planets now">
            <Button
              size="lg"
              color="white"
              className="w-full py-6 px-6 lg:px-12 lg:py-8 rounded-md text-md lg:text-lg text-white bg-indigo-500 shadow-gray-900 shadow-md drop-shadow-xl hover:scale-110 transition-all"
            >
              View all planets now!
            </Button>
          </Link>
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-1 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ title, icon, color, description }) => (
              <FeatureCard
                key={title}
                title={title}
                color={color}
                icon={icon}
                description={description}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
