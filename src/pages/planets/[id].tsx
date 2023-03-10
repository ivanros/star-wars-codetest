import LoadingSpinner from '@/components/loading-spinner';
import PlanetCardDetail from '@/components/planet-card-detail';
import { showNotificacion } from '@/redux/slices/notifications';
import { useGetPlanetByIdQuery } from '@/redux/slices/planets';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function Planet() {
  const router = useRouter();
  const planetId = router.query.id?.toString();
  const { data, isLoading, error } = useGetPlanetByIdQuery(planetId);

  if (error) {
    showNotificacion({ message: 'Planets list not found', type: 'error' });
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full px-24">
      <div className="absolute top-10">
        <ArrowLeftIcon className=" text-indigo-500 hover:text-indigo-200 cursor-pointer" />
      </div>
      {!isLoading ? (
        <>
          {data ? (
            <PlanetCardDetail data={data} />
          ) : (
            <Typography variant="lead" color="white" className="opacity-80 px-[20%]">
              We could not find the requested planet, maybe we just need to change some galaxy
              parameters... Try again later.
            </Typography>
          )}
        </>
      ) : (
        <LoadingSpinner
          texts={[
            'Buscando planetas en galaxias cercanas...',
            'Preparando telescopios ultrasónicos...',
            'Ajustando condensador de fluzo...',
          ]}
        />
      )}
    </div>
  );
}
