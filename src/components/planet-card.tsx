import { Planet } from '@/models/entities/planet';
import { TrashIcon } from '@heroicons/react/24/outline';
import { GlobeAltIcon, MagnifyingGlassIcon, SunIcon } from '@heroicons/react/24/solid';
import { Avatar, Button, Card, Typography } from '@material-tailwind/react';
import { createElement, MouseEvent, useCallback, useState } from 'react';

interface PlanetCardProps {
  data: Planet;
  onClick: Function;
  onDelete?: Function;
}

export function PlanetCard(props: PlanetCardProps) {
  const { data, onClick, onDelete } = props;
  const { id, name, diameter, climates, terrains, residentConnection, image } = data;

  const [isCardHover, setIsCardHover] = useState<Boolean>(false);

  const handlePlanetDelete = useCallback(
    (e: MouseEvent, id: String) => {
      if (typeof onDelete !== 'undefined') {
        onDelete(id);
      }
      e.stopPropagation();
    },
    [onDelete],
  );

  return (
    <Card
      className="relative flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5 hover:bg-indigo-100 hover:cursor-pointer"
      onClick={() => onClick(id)}
      onMouseEnter={() => setIsCardHover(true)}
      onMouseLeave={() => setIsCardHover(false)}
    >
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
            <div className="relative">
              {image ? (
                <div className="relative -mt-20 w-40">
                  <Avatar
                    src={image}
                    alt="Planet picture"
                    variant="circular"
                    className={`h-full w-full ${isCardHover ? 'grayscale' : ''}`}
                  />
                  {isCardHover ? (
                    <div className="absolute top-0 rounded-full h-full w-full flex justify-center items-center">
                      <MagnifyingGlassIcon className="text-white -mt-3 w-12 h-12" />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center gap-3">
            {typeof onDelete !== 'undefined' ? (
              <Button
                variant="outlined"
                className="flex items-center rounded-md bg-galaxy shadow-gray-900 shadow-md drop-shadow-xl hover:scale-110 hover:bg-red-700 hover:opacity-1 transition-all"
                onClick={(e) => handlePlanetDelete(e, id)}
              >
                {createElement(TrashIcon, {
                  className: 'm-auto w-6 h-6 text-white',
                })}
              </Button>
            ) : null}
          </div>
          <div className="w-full px-4 lg:order-1 lg:w-4/12">
            <div className="flex justify-center py-4 pt-8 lg:pt-4 gap-4">
              <div className="p-3 flex flex-col text-center align-middle min-w-0 w-60">
                <Typography variant="lead" className="font-bold text-md truncate">
                  {id}
                </Typography>
                <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                  ID
                </Typography>
              </div>
              <div className="p-3 flex flex-col text-center align-middle min-w-0 w-60">
                <Typography variant="lead" className="font-bold text-md truncate">
                  {diameter || 'unknown'}
                </Typography>
                <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                  Diameter
                </Typography>
              </div>
              {residentConnection ? (
                <div className="p-3 flex flex-col text-center align-middle min-w-0 w-60">
                  <Typography variant="lead" className="font-bold text-md truncate">
                    {residentConnection.totalCount || 0}
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
          <Typography variant="h2" className="mb-4 text-space font-bold text-xl">
            {name}
          </Typography>
        </div>

        <div className="flex justify-between align-middle mb-2 border-t border-blue-gray-50 py-6 px-12">
          <div className="flex items-center justify-center gap-3">
            <SunIcon className="-mt-px h-6 w-6 text-blue-gray-700" />
            <Typography className="font-medium text-blue-gray-700 truncate">
              {climates.join(', ')}
            </Typography>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Typography className="font-medium text-blue-gray-700 truncate">
              {terrains.join(', ')}
            </Typography>
            <GlobeAltIcon className="-mt-px h-6 w-6 text-blue-gray-700" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default PlanetCard;
