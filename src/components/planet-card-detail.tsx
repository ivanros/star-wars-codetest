import { Planet } from '@/models/entities/planet';
import { EyeIcon } from '@heroicons/react/24/outline';
import { PencilIcon } from '@heroicons/react/24/solid';
import { Avatar, Button, Card, Input, Typography } from '@material-tailwind/react';
import { createElement, useEffect, useState } from 'react';
import ResidentsTable from './residents-table';

interface PlanetCardDetailProps {
  mode: String;
  data: Planet;
  onEdit: Function;
}

export function PlanetCardDetail(props: PlanetCardDetailProps) {
  const { mode, data, onEdit } = props;
  const {
    id,
    name,
    diameter,
    climates,
    terrains,
    residentConnection,
    image,
    created,
    population,
    orbitalPeriod,
    rotationPeriod,
  } = data;
  const residents = (residentConnection && residentConnection.residents) || [];
  const [currentMode, setCurrentMode] = useState<String>();

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

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
            <Button
              variant="outlined"
              className="flex items-center gap-3 rounded-md bg-galaxy shadow-gray-900 shadow-md drop-shadow-xl hover:scale-110 hover:bg-teal-600 hover:opacity-1 transition-all"
              onClick={() => setCurrentMode(currentMode === 'view' ? 'edit' : 'view')}
            >
              {createElement(currentMode === 'view' ? PencilIcon : EyeIcon, {
                className: 'm-auto w-6 h-6 text-white',
              })}
              <Typography className="text-white font-bold text-sm">
                {currentMode === 'view' ? 'Edit Planet' : 'View Mode'}
              </Typography>
            </Button>
          </div>
          <div className="w-full px-4 lg:w-4/12 flex items-center">
            <Typography variant="small" className="font-light text-blue-gray-500 text-md mr-10">
              Name
            </Typography>
            {currentMode === 'view' ? (
              <Typography variant="lead" className="font-bold text-md truncate">
                {name || ''}
              </Typography>
            ) : (
              <div className="w-40">
                <Input
                  variant="standard"
                  defaultValue={name.toString()}
                  onBlur={(e) => onEdit('name', e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between align-middle mb-2 border-t border-blue-gray-50 py-6 px-12">
          <div className="flex justify-center py-4 pt-8 lg:pt-4 gap-4 flex-wrap">
            <div className="p-3 flex flex-col text-center align-middle min-w-0 w-60">
              <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                ID
              </Typography>
              <Typography variant="lead" className="font-bold text-md truncate">
                {id || ''}
              </Typography>
            </div>
            <div className="p-3 flex flex-col text-center align-middle min-w-0 w-60">
              <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                Diameter
              </Typography>
              {currentMode === 'view' ? (
                <Typography variant="lead" className="font-bold text-md truncate">
                  {diameter || 'unknown'}
                </Typography>
              ) : (
                <div className="w-40">
                  <Input
                    type="number"
                    variant="standard"
                    defaultValue={diameter?.toString()}
                    onBlur={(e) => onEdit('diameter', +e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="p-3 flex flex-col text-center align-middle min-w-0 w-60">
              <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                Residents
              </Typography>
              <Typography variant="lead" className="font-bold text-md truncate">
                {residents.length || 0}
              </Typography>
            </div>
            <div className="p-3 flex flex-col text-center align-middle min-w-0 w-60">
              <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                Climates
              </Typography>
              <Typography variant="lead" className="font-bold text-md truncate">
                {climates.length > 0 ? climates.join(', ') : 'unknown'}
              </Typography>
            </div>
            <div className="p-3 flex flex-col text-center align-middle min-w-0 w-60">
              <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                Terrains
              </Typography>
              <Typography variant="lead" className="font-bold text-md truncate">
                {terrains.length > 0 ? terrains.join(', ') : 'unknown'}
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
              {currentMode === 'view' ? (
                <Typography variant="lead" className="font-bold text-md truncate">
                  {population || 0}
                </Typography>
              ) : (
                <div className="w-40">
                  <Input
                    type="number"
                    variant="standard"
                    defaultValue={(population || 0).toString()}
                    onBlur={(e) => onEdit('population', +e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="p-3 flex flex-col text-center align-middle min-w-0 w-60">
              <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                Orbital period
              </Typography>
              {currentMode === 'view' ? (
                <Typography variant="lead" className="font-bold text-md truncate">
                  {orbitalPeriod || 0}
                </Typography>
              ) : (
                <div className="w-40">
                  <Input
                    type="number"
                    variant="standard"
                    defaultValue={(orbitalPeriod || 0).toString()}
                    onBlur={(e) => onEdit('orbitalPeriod', +e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className="p-3 flex flex-col text-center align-middle min-w-0 w-60">
              <Typography variant="small" className="font-light text-blue-gray-500 text-sm">
                Rotation period
              </Typography>
              {currentMode === 'view' ? (
                <Typography variant="lead" className="font-bold text-md truncate">
                  {rotationPeriod || 0}
                </Typography>
              ) : (
                <div className="w-40">
                  <Input
                    type="number"
                    variant="standard"
                    defaultValue={(rotationPeriod || 0).toString()}
                    onBlur={(e) => onEdit('rotationPeriod', +e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 mb-10 px-12">
          {residents && residents.length ? <ResidentsTable data={residents} /> : null}
        </div>
      </div>
    </Card>
  );
}

PlanetCardDetail.defaultProps = {
  mode: 'view',
};

export default PlanetCardDetail;
