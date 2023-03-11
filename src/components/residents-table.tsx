import { Resident } from '@/models/entities/resident';
import { Species } from '@/models/entities/species';
import { Key } from 'react';

interface ResidentsTableProps {
  data: Resident[];
}

export function ResidentsTable(props: ResidentsTableProps) {
  const { data } = props;

  return (
    <div className="inline-block min-w-full py-2 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-center text-sm font-light">
          <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-200 dark:text-neutral-800">
            <tr>
              {['Name', 'Gender', 'Species', 'Height', 'Mass', 'Hair color', 'Skin color'].map(
                (header: string) => (
                  <th key={header} scope="col" className="px-4 py-2 lg:px-6 lg:py-4">
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((resident: Resident, index: Key) => (
              <tr key={index} className="border-b dark:border-neutral-100">
                <td className="whitespace-nowrap px-6 py-4">{resident.name}</td>
                <td className="whitespace-nowrap px-6 py-4">{resident.gender || '-'}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {resident.species && resident.species.length > 0
                    ? resident.species.map((s: Species) => s.name).join(', ')
                    : '-'}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {resident.height ? resident.height.toString() : '-'} cm
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {resident.mass ? resident.mass.toString() : '-'} kg
                </td>
                <td className="whitespace-nowrap px-6 py-4">{resident.hairColor || '-'}</td>
                <td className="whitespace-nowrap px-6 py-4">{resident.skinColor || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResidentsTable;
