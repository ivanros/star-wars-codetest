import { MouseEventHandler } from 'react';
import { Avatar, Button, Card, Typography } from '@material-tailwind/react';
import { SunIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
import { Planet } from '@/models/entities/planet';

interface PlanetCardProps {
  data: Planet;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export function PlanetCard(props: PlanetCardProps) {
  console.log(Math.random() * 4 + 1);
  const { data, onClick } = props;
  const { id, name, diameter, climates, terrains, residentConnection } = data;

  return (
    <Card
      className="relative flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5 hover:bg-indigo-100 hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
            <div className="relative">
              <div className="-mt-20 w-40">
                <Avatar
                  src={`/planet_${Math.floor(Math.random() * 4 + 1)}.png`}
                  alt="Planet picture"
                  variant="circular"
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
          <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
            <Button className="py-1 rounded-md text-white bg-indigo-500 shadow-gray-900 shadow-md drop-shadow-xl hover:scale-110 transition-all">
              Edit planet
            </Button>
          </div>
          <div className="w-full px-4 lg:order-1 lg:w-4/12">
            <div className="flex justify-center py-4 pt-8 lg:pt-4">
              <div className="mr-4 p-3 flex flex-col text-center align-middle min-w-0">
                <Typography variant="lead" className="font-bold text-sm truncate">
                  {id}
                </Typography>
                <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                  ID
                </Typography>
              </div>
              <div className="mr-4 p-3 text-center">
                <Typography variant="lead" className="font-bold uppercase">
                  {diameter}
                </Typography>
                <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                  Diameter
                </Typography>
              </div>
              {residentConnection ? (
                <div className="p-3 text-center lg:mr-4">
                  <Typography variant="lead" className="font-bold uppercase">
                    {residentConnection.totalCount}
                  </Typography>
                  <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                    Residents
                  </Typography>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="my-2 text-center">
          <Typography variant="h2" className="mb-4 text-space font-bold text-lg">
            {name}
          </Typography>
        </div>

        <div className="flex justify-between align-middle mb-2 border-t border-blue-gray-50 py-6 px-12">
          <div className="flex items-center justify-center gap-2">
            <SunIcon className="-mt-px h-6 w-6 text-blue-gray-700" />
            <Typography className="font-medium text-blue-gray-700">
              {climates.join(', ')}
            </Typography>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Typography className="font-medium text-blue-gray-700">
              {terrains.join(', ')}
            </Typography>
            <GlobeAltIcon className="-mt-px h-6 w-6 text-blue-gray-700" />
          </div>
        </div>
      </div>
    </Card>
  );
}

PlanetCard.defaultProps = {
  color: 'blue',
};

export default PlanetCard;
