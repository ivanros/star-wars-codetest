import { Species } from './species';

export type Resident = {
  name: String;
  gender?: String;
  species?: Species[];
  height?: Number;
  mass?: Number;
  hairColor?: String;
  skinColor?: String;
};
