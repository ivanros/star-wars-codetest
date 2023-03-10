import LoadingSpinner from '@/components/loading-spinner';
import PlanetCardDetail from '@/components/planet-card-detail';
import { showNotification } from '@/redux/slices/notifications';
import { useGetPlanetByIdQuery } from '@/redux/slices/planets';
import { Typography } from '@material-tailwind/react';
import { BaseContext } from 'next/dist/shared/lib/utils';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface PlanetProps {
  planetId: string;
}

export default function Planet(props: PlanetProps) {
  const { planetId } = props;
  const { data, isLoading, error } = useGetPlanetByIdQuery(planetId);
  const dispatch = useDispatch();

  // Shows API error if exists
  useEffect(() => {
    if (error && 'data' in error) {
      dispatch(showNotification({ message: error.data.message, type: 'error' }));
    }
  }, [error, dispatch]);

  return (
    <div className="flex justify-center py-40 px-40 h-full w-full">
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
