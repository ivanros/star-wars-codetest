import PlanetCardDetail from '@/components/planet-card-detail';
import { Planet } from '@/models/entities/planet';
import { editPlanetProperty } from '@/redux/slices/planets';
import { store } from '@/redux/store';
import { Typography } from '@material-tailwind/react';
import { useRouter } from 'next/dist/client/router';
import { GetStaticProps } from 'next/types';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface PlanetProps {
  planetId: string;
}

export default function PlanetPage(props: PlanetProps) {
  const { planetId } = props;
  const planet: Planet = useSelector((state: ReturnType<typeof store.getState>) =>
    state.planets.data.find((planet: Planet) => planet.id === planetId),
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const savePlanetChanges = useCallback(
    (key: String, value: any) => {
      dispatch(editPlanetProperty({ id: planetId, key, value }));
    },
    [planetId, dispatch],
  );

  // Redirects user to planets list if he tries to access directly from handwrited URL
  useEffect(() => {
    if (!planetId) {
      router.push('/planets');
    }
  }, [planetId, router]);

  return (
    <div className="flex justify-center h-full w-full pt-60 pb-10 lg:pt-40 lg:pb-40 lg:px-40">
      {planet ? (
        <PlanetCardDetail data={planet} onEdit={savePlanetChanges} />
      ) : (
        <Typography variant="lead" color="white" className="opacity-80 text-center lg:px-[20%]">
          We could not find the requested planet, maybe we just need to change some galaxy
          parameters... Try again later.
        </Typography>
      )}
    </div>
  );
}

export type GetStaticPropsContext = Parameters<GetStaticProps>[0];

// Ensure that we retrieve a non-undefined planet id from params
export function getServerSideProps(context: GetStaticPropsContext) {
  return {
    props: { planetId: context.params?.id },
  };
}
