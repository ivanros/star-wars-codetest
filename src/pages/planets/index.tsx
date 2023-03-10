import LoadingSpinner from '@/components/loading-spinner';
import PlanetCard from '@/components/planet-card';
import { Planet } from '@/models/entities/planet';
import { showNotification } from '@/redux/slices/notifications';
import { useGetPlanetsQuery } from '@/redux/slices/planets';
import { Input, Option, Select, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { Key, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Planets() {
  const [orderBy, setOrderBy] = useState('name');
  const { data, isLoading, error } = useGetPlanetsQuery();
  const router = useRouter();
  const dispatch = useDispatch();

  // Shows API error if exists
  useEffect(() => {
    if (error && 'data' in error) {
      dispatch(showNotification({ message: error.data.message, type: 'error' }));
    }
  }, [error, dispatch]);

  const handleSearchFilter = useCallback((option: any) => {
    console.log('handleSearchFilter', option);
  }, []);

  const handleOrderFilter = useCallback((option: any) => {
    console.log('handleOrderFilter', option);
  }, []);

  return (
    <div className="flex flex-col justify-center py-30 px-40 h-full w-full">
      {!isLoading ? (
        <>
          <div className="pb-36 inline-flex justify-center gap-20">
            <div className="w-52">
              <Input
                label="Search..."
                onChange={handleSearchFilter}
                disabled={!data || !data.length}
                className="px-4 text-gray-200"
              />
            </div>
            <div className="w-52">
              <Select
                label="Order by"
                disabled={!data || !data.length}
                value={orderBy}
                onChange={handleOrderFilter}
                className="px-4 text-gray-200"
              >
                <Option value="name">Name</Option>
                <Option value="diameter">Diameter</Option>
                <Option value="climates">Climate</Option>
                <Option value="terrains">Terrain</Option>
                <Option value="population">Population</Option>
              </Select>
            </div>
          </div>
          {data && data.length > 0 ? (
            <div className="flex flex-col gap-28">
              {data.map((planet: Planet, index: Key) => (
                <PlanetCard
                  key={index}
                  data={planet}
                  onClick={(id: string) => router.push(`/planets/${id}`)}
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
