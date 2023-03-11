import LoadingSpinner from '@/components/loading-spinner';
import PlanetCard from '@/components/planet-card';
import { Planet } from '@/models/entities/planet';
import { showNotification } from '@/redux/slices/notifications';
import { createPlanet, deletePlanet, useGetPlanetsQuery } from '@/redux/slices/planets';
import { store } from '@/redux/store';
import { sortPlanetsByProperty } from '@/utils/array-utils';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Button, Input, Option, Select, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { createElement, Key, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function PlanetsPage() {
  const [filteredPlanets, setFilteredPlanets] = useState<Planet[]>([]);
  const [searchBy, setSearchBy] = useState<string>('');
  const [orderBy, setOrderBy] = useState<string>('name');
  const { isLoading, error } = useGetPlanetsQuery();
  const planets: Planet[] = useSelector(
    (state: ReturnType<typeof store.getState>) => state.planets.data,
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const removePlanetFromList = useCallback(
    (id: string) => {
      dispatch(deletePlanet(id));
      dispatch(showNotification({ message: `Planet "${id}" deleted from space`, type: 'success' }));
    },
    [dispatch],
  );

  // Filters planets searching by name, climates or terrains
  const searchByText = useCallback((arrPlanets: Planet[], text: string) => {
    return arrPlanets.filter(
      (planet: Planet) =>
        planet.name.toLowerCase().includes(text.toLowerCase()) ||
        planet.climates.some((climate) => climate.includes(text.toLowerCase())) ||
        planet.terrains.some((terrain) => terrain.includes(text.toLowerCase())),
    );
  }, []);

  // Filters planets ordering by any property
  const orderByProperty = useCallback((arrPlanets: Planet[], property: string) => {
    return sortPlanetsByProperty(arrPlanets, property);
  }, []);

  const addPlanetToList = useCallback(async () => {
    await dispatch(createPlanet());
    setSearchBy('<New planet>');
    dispatch(showNotification({ message: `New planet in the universe!`, type: 'success' }));
  }, [dispatch]);

  // Shows API error if exists
  useEffect(() => {
    if (error && 'data' in error) {
      dispatch(showNotification({ message: error.data.message, type: 'error' }));
    }
  }, [error, dispatch]);

  useEffect(() => {
    // Ensures that array sorts and filters at the same moment so filters can be mixed
    let filteredList = orderByProperty(planets, orderBy);
    filteredList = searchByText(filteredList, searchBy);
    setFilteredPlanets(filteredList);
  }, [planets, orderBy, searchBy, orderByProperty, searchByText]);

  return (
    <div className="flex flex-col justify-center py-20 lg:px-40 h-full w-full">
      <div className="flex flex-col items-center justify-center gap-6 mb-6 lg:gap-14 lg:flex-row lg:mb-12">
        <div className="lg:w-44">
          <Input
            label="Search..."
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            className="text-white"
          />
        </div>
        <div className="lg:w-44">
          <Select
            label="Order by"
            value={orderBy}
            onChange={(option) => setOrderBy(option || '')}
            className="text-white"
          >
            <Option value="name">Name</Option>
            <Option value="diameter">Diameter</Option>
            <Option value="climates">Climate</Option>
            <Option value="terrains">Terrain</Option>
            <Option value="population">Population</Option>
          </Select>
        </div>
      </div>
      <div className="flex justify-center mb-28 lg:mb-10 lg:justify-end">
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
          {filteredPlanets.length > 0 ? (
            <div className="flex flex-col gap-28">
              {filteredPlanets.map((planet: Planet, index: Key) => (
                <PlanetCard
                  key={index}
                  data={planet}
                  onClick={(id: string) => router.push(`/planets/${id}`)}
                  onDelete={removePlanetFromList}
                />
              ))}
            </div>
          ) : (
            <Typography variant="lead" color="white" className="opacity-80 text-center lg:px-[20%]">
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
