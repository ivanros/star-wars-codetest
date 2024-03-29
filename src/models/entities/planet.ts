import { ResidentConnection } from './resident-connection';

export type Planet = {
  id: String;
  name: String;
  diameter: Number;
  climates: String[];
  terrains: String[];
  residentConnection: ResidentConnection;
  image?: string;
  created?: Date | number;
  population?: Number;
  orbitalPeriod?: Number;
  rotationPeriod?: Number;
};
