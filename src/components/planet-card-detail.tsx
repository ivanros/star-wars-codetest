import { Planet } from '@/models/entities/planet';
import { Avatar, Button, Card, Typography } from '@material-tailwind/react';
import ResidentsTable from './residents-table';

interface PlanetCardDetailProps {
  data: Planet;
}

export function PlanetCardDetail(props: PlanetCardDetailProps) {
  const { data } = props;
  const {
    id,
    name,
    diameter,
    climates,
    terrains,
    residentConnection: { residents },
    image,
    created,
    population,
    orbitalPeriod,
    rotationPeriod,
  } = data;

  return (
    <Card className="relative flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
            {image ? (
              <div className="relative -mt-28 w-48">
                <Avatar
                  src={image}
                  alt="Planet picture"
                  variant="circular"
                  className="h-full w-full"
                />
              </div>
            ) : null}
          </div>
          <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
            <Button className="py-1 rounded-md text-white bg-indigo-500 shadow-gray-900 shadow-md drop-shadow-xl hover:scale-110 transition-all">
              Edit planet
            </Button>
          </div>
          <div className="w-full px-4 lg:w-4/12 flex items-center">
            <Typography variant="small" className="font-light text-blue-gray-500 text-md mr-10">
              Name
            </Typography>
            <Typography variant="h2" className="text-space font-bold text-2xl">
              {name}
            </Typography>
          </div>
        </div>

        <div className="flex justify-between align-middle mb-2 border-t border-blue-gray-50 py-6 px-12">
          <div className="flex justify-center py-4 pt-8 lg:pt-4 gap-4 flex-wrap">
            <div className="p-3 flex flex-col text-center align-middle min-w-0 w-60">
              <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                ID
              </Typography>
              <Typography variant="lead" className="font-bold text-md truncate">
                {id}
              </Typography>
            </div>
            <div className="p-3 flex flex-col text-center align-middle min-w-0 w-60">
              <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                Diameter
              </Typography>
              <Typography variant="lead" className="font-bold text-md truncate">
                {diameter || 'unknown'}
              </Typography>
            </div>
            {residents ? (
              <div className="p-3 flex flex-col text-center align-middle min-w-0 w-60">
                <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                  Residents
                </Typography>
                <Typography variant="lead" className="font-bold text-md truncate">
                  {residents.length || 0}
                </Typography>
              </div>
            ) : null}
            <div className="p-3 flex flex-col text-center align-middle min-w-0 w-60">
              <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                Climates
              </Typography>
              <Typography variant="lead" className="font-bold text-md truncate">
                {climates.join(', ')}
              </Typography>
            </div>
            <div className="p-3 flex flex-col text-center align-middle min-w-0 w-60">
              <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                Terrains
              </Typography>
              <Typography variant="lead" className="font-bold text-md truncate">
                {terrains.join(', ')}
              </Typography>
            </div>
            <div className="p-3 flex flex-col text-center align-middle min-w-0 w-60">
              <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                Created date
              </Typography>
              <Typography variant="lead" className="font-bold text-md truncate">
                {created ? new Date(created).toLocaleDateString() : '-'}
              </Typography>
            </div>
            <div className="p-3 flex flex-col text-center align-middle min-w-0 w-60">
              <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                Population
              </Typography>
              <Typography variant="lead" className="font-bold text-md truncate">
                {population}
              </Typography>
            </div>
            <div className="p-3 flex flex-col text-center align-middle min-w-0 w-60">
              <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                Orbital period
              </Typography>
              <Typography variant="lead" className="font-bold text-md truncate">
                {orbitalPeriod}
              </Typography>
            </div>
            <div className="p-3 flex flex-col text-center align-middle min-w-0 w-60">
              <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                Rotation period
              </Typography>
              <Typography variant="lead" className="font-bold text-md truncate">
                {rotationPeriod}
              </Typography>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 mb-10">
          {residents && residents.length ? (
            <>
              <Typography variant="small" className="font-light text-blue-gray-500 text-sm mb-6">
                This planet has {residents.length} residents
              </Typography>
              <ResidentsTable data={residents} />
            </>
          ) : (
            <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
              This planet currently has no residents
            </Typography>
          )}
        </div>
      </div>
    </Card>
  );
}

export default PlanetCardDetail;
