import LoadingSpinner from '@/components/loading-spinner';
import PlanetCardDetail from '@/components/planet-card-detail';
import { Planet } from '@/models/entities/planet';
import { showNotification } from '@/redux/slices/notifications';
import { editPlanetProperty, planetsApi } from '@/redux/slices/planets';
import { store } from '@/redux/store';
import { Typography } from '@material-tailwind/react';
import { BaseContext } from 'next/dist/shared/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface PlanetProps {
  planetId: string;
}

export default function PlanetPage(props: PlanetProps) {
  const { planetId } = props;
  const [planet, setPlanet] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const savePlanetChanges = useCallback(
    async (key: String, value: any) => {
      console.log('key', key, value);
      await dispatch(editPlanetProperty({ id: planetId, key, value }));
      const editedPlanet = store
        .getState()
        .planets.data.find((planet: Planet) => planet.id === planetId);
      console.log(editedPlanet);
      setPlanet(editedPlanet);
    },
    [planetId, dispatch],
  );

  useEffect(() => {
    // Retrieves planet data by the id provided via query param
    async function getPlanetById(id: string) {
      setIsLoading(true);
      const { data, error } = await dispatch(
        planetsApi.endpoints.getPlanetById.initiate(id) as any,
      );
      if (data) {
        setPlanet(data);
      } else if (error && 'data' in error) {
        dispatch(showNotification({ message: error.data.message, type: 'error' }));
      }
      setIsLoading(false);
    }

    getPlanetById(planetId);
  }, [planetId, dispatch]);

  return (
    <div className="flex justify-center py-40 px-40 h-full w-full">
      {!isLoading ? (
        <>
          {planet ? (
            <PlanetCardDetail data={planet} onEdit={savePlanetChanges} />
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
            'Looking for information about the planet...',
            'Calculating approximate dimensions...',
            'Gossiping about people social networks...',
          ]}
        />
      )}
    </div>
  );
}

// Ensure that we retrieve a non-undefined planet id from params
export function getServerSideProps(context: BaseContext) {
  return {
    props: { planetId: context.params.id },
  };
}
