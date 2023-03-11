import { Planet } from '@/models/entities/planet';
import { Resident } from '@/models/entities/resident';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PlanetCardDetail from '../src/components/planet-card-detail';

const today = Date.now();

const mockResidents: Resident[] = [
  {
    name: 'Luke Skywalker',
  },
  {
    name: 'C3P0',
  },
];

const mockPlanet: Planet = {
  id: '123456789',
  name: 'Test planet',
  diameter: 20000,
  climates: ['rainy', 'sunny'],
  terrains: ['arid', 'desert'],
  population: 150000,
  orbitalPeriod: 500,
  rotationPeriod: 1000,
  created: today,
  image: '/planet_1.png',
  residentConnection: {
    totalCount: 2,
    residents: mockResidents,
  },
};

describe('PlanetCardDetail', () => {
  it('checks all default planet data is displayed', async () => {
    const planetMinimalData: Planet = {
      id: mockPlanet.id,
      name: mockPlanet.name,
      diameter: 0,
      climates: [],
      terrains: [],
      residentConnection: { totalCount: 0 },
    };

    render(<PlanetCardDetail mode="view" data={planetMinimalData} onEdit={jest.fn()} />);

    expect(screen.queryByLabelText('Planet picture')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Planet name')).toHaveTextContent(mockPlanet.name.toString());
    expect(screen.getByLabelText('Planet diameter')).toHaveTextContent('unknown');
    expect(screen.getByLabelText('Planet residents')).toHaveTextContent('0');
    expect(screen.getByLabelText('Planet climates')).toHaveTextContent('unknown');
    expect(screen.getByLabelText('Planet terrains')).toHaveTextContent('unknown');
    expect(screen.getByLabelText('Planet created date')).toHaveTextContent('-');
    expect(screen.getByLabelText('Planet population')).toHaveTextContent('0');
    expect(screen.getByLabelText('Planet orbital period')).toHaveTextContent('-');
    expect(screen.getByLabelText('Planet rotation period')).toHaveTextContent('-');
  });

  it('checks all planet data is displayed in view mode', async () => {
    render(<PlanetCardDetail mode="view" data={mockPlanet} onEdit={jest.fn()} />);

    const planetImage = screen.getByLabelText('Planet picture') as HTMLImageElement;
    expect(planetImage.src).toContain(mockPlanet.image);
    expect(screen.getByLabelText('Planet name')).toHaveTextContent(mockPlanet.name.toString());
    expect(screen.getByLabelText('Planet diameter')).toHaveTextContent(
      mockPlanet.diameter.toString(),
    );
    expect(screen.getByLabelText('Planet residents')).toHaveTextContent(
      mockResidents.length.toString(),
    );
    expect(screen.getByLabelText('Planet climates')).toHaveTextContent(
      mockPlanet.climates.join(', '),
    );
    expect(screen.getByLabelText('Planet terrains')).toHaveTextContent(
      mockPlanet.terrains.join(', '),
    );
    expect(screen.getByLabelText('Planet created date')).toHaveTextContent(
      new Date(today).toLocaleDateString(),
    );
    expect(screen.getByLabelText('Planet population')).toHaveTextContent(
      mockPlanet.population!.toString(),
    );
    expect(screen.getByLabelText('Planet orbital period')).toHaveTextContent(
      mockPlanet.orbitalPeriod!.toString(),
    );
    expect(screen.getByLabelText('Planet rotation period')).toHaveTextContent(
      mockPlanet.rotationPeriod!.toString(),
    );
  });

  it('checks card transition between view mode and edition mode', async () => {
    render(<PlanetCardDetail mode="view" data={mockPlanet} onEdit={jest.fn()} />);

    const editPlanetBtnName = 'Edit Planet';
    const viewModeBtnName = 'View Mode';
    expect(screen.queryByLabelText(editPlanetBtnName)).toBeInTheDocument();
    expect(screen.queryByLabelText(viewModeBtnName)).not.toBeInTheDocument();

    const editBtn = screen.getByLabelText(editPlanetBtnName);
    editBtn.click();

    await waitFor(() => {
      expect(screen.queryByLabelText(editPlanetBtnName)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(viewModeBtnName)).toBeInTheDocument();

      // Checks that modificable fields have been changed to input elements
      expect(screen.queryByLabelText('Planet name')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Planet input name')).toBeInTheDocument();
      expect(screen.queryByLabelText('Planet diameter')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Planet input diameter')).toBeInTheDocument();
      expect(screen.queryByLabelText('Planet population')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Planet input population')).toBeInTheDocument();
      expect(screen.queryByLabelText('Planet orbital period')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Planet input orbital period')).toBeInTheDocument();
      expect(screen.queryByLabelText('Planet rotation period')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Planet input rotation period')).toBeInTheDocument();
    });

    const viewBtn = screen.getByLabelText(viewModeBtnName);
    viewBtn.click();

    await waitFor(() => {
      expect(screen.queryByLabelText(editPlanetBtnName)).toBeInTheDocument();
      expect(screen.queryByLabelText(viewModeBtnName)).not.toBeInTheDocument();
    });
  });

  it('triggers onEdit event when there are input changes on blur', async () => {
    const onEdit = jest.fn();
    render(<PlanetCardDetail mode="edit" data={mockPlanet} onEdit={onEdit} />);

    const inputName = screen.queryByLabelText('Planet input name') as HTMLInputElement;
    const newName = 'testname';
    fireEvent.blur(inputName, { target: { value: newName } });
    expect(onEdit).toHaveBeenCalledWith('name', newName);

    const inputDiameter = screen.queryByLabelText('Planet input diameter') as HTMLInputElement;
    const newDiameter = 321;
    fireEvent.blur(inputDiameter, { target: { value: newDiameter } });
    expect(onEdit).toHaveBeenCalledWith('diameter', +newDiameter);

    const inputPopulation = screen.queryByLabelText('Planet input population') as HTMLInputElement;
    const newPopulation = 100;
    fireEvent.blur(inputPopulation, { target: { value: newPopulation } });
    expect(onEdit).toHaveBeenCalledWith('population', +newPopulation);

    const inputOrbitalPeriod = screen.queryByLabelText(
      'Planet input orbital period',
    ) as HTMLInputElement;
    const newOrbitalPeriod = 100;
    fireEvent.blur(inputOrbitalPeriod, { target: { value: newOrbitalPeriod } });
    expect(onEdit).toHaveBeenCalledWith('orbitalPeriod', +newOrbitalPeriod);

    const inputRotationPeriod = screen.queryByLabelText(
      'Planet input rotation period',
    ) as HTMLInputElement;
    const newRotationPeriod = 200;
    fireEvent.blur(inputRotationPeriod, { target: { value: newRotationPeriod } });
    expect(onEdit).toHaveBeenCalledWith('rotationPeriod', +newRotationPeriod);
  });
});
