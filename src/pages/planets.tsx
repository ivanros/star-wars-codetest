import LoadingSpinner from '@/components/loading-spinner';
import PlanetCard from '@/components/planet-card';
import { Planet } from '@/models/entities/planet';
import { showNotificacion } from '@/redux/slices/notifications';
import { useGetPlanetsQuery } from '@/redux/slices/planets';
import { Typography } from '@material-tailwind/react';
import { Key, useCallback } from 'react';

export default function Planets() {
  const { data, isLoading, error } = useGetPlanetsQuery();

  if (error) {
    showNotificacion({ message: 'Planets list not found', type: 'error' });
  }

  const planetClicked = useCallback(() => {}, []);

  return (
    <div className="flex justify-center py-32 h-full w-full">
      {!isLoading ? (
        <>
          {data && data.length > 0 ? (
            <div className="flex flex-col px-60 gap-28">
              {data.map((planet: Planet, index: Key) => (
                <PlanetCard key={index} data={planet} onClick={planetClicked} />
              ))}
            </div>
          ) : (
            <Typography variant="lead" color="white" className="opacity-80 px-[20%]">
              We could not find our planets, maybe we just need to change some galaxy parameters...
              Try again later.
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
