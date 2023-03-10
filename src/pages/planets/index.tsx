import LoadingSpinner from '@/components/loading-spinner';
import PlanetCard from '@/components/planet-card';
import { Planet } from '@/models/entities/planet';
import { showNotification } from '@/redux/slices/notifications';
import { useGetPlanetsQuery } from '@/redux/slices/planets';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Button, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { createElement, Key, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Planets() {
  const { data, isLoading, error } = useGetPlanetsQuery();
  const [planets, setPlanets] = useState<Planet[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const removePlanetFromList = useCallback(
    (id: string) => {
      const filteredPlanets = planets.filter((planet: Planet) => planet.id !== id);
      setPlanets(filteredPlanets);
      dispatch(showNotification({ message: `Planet "${id}" deleted from space`, type: 'success' }));
    },
    [planets, dispatch],
  );

  const addPlanetToList = useCallback(() => {}, []);

  // Shows API error if exists
  useEffect(() => {
    if (error && 'data' in error) {
      dispatch(showNotification({ message: error.data.message, type: 'error' }));
    }
  }, [error, dispatch]);

  // Copy of API planets so we can handle our own array operations
  useEffect(() => {
    if (data && data.length > 0) {
      setPlanets(data);
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-center py-40 px-40 h-full w-full">
      <div className="flex justify-end mb-10">
        <Button
          variant="outlined"
          className="flex items-center gap-3 rounded-md shadow-gray-900 shadow-md drop-shadow-xl hover:scale-110 hover:bg-green-600 hover:opacity-1 transition-all"
          onClick={addPlanetToList}
        >
          {createElement(PlusIcon, {
            className: 'm-auto w-6 h-6 text-white',
          })}
          <Typography className="text-white font-bold text-sm">New Planet</Typography>
        </Button>
      </div>
      {!isLoading ? (
        <>
          {planets.length > 0 ? (
            <div className="flex flex-col gap-28">
              {planets.map((planet: Planet, index: Key) => (
                <PlanetCard
                  key={index}
                  data={planet}
                  onClick={(id: string) => router.push(`/planets/${id}`)}
                  onDelete={removePlanetFromList}
                />
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
            'Searching for planets in nearby galaxies...',
            'Preparing ultrasonic telescopes...',
            'Adjusting fluzo capacitor...',
          ]}
        />
      )}
    </div>
  );
}
