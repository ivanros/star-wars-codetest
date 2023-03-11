import { Planet } from '@/models/entities/planet';

export function sortPlanetsByProperty(array: Planet[], property: string) {
  if (array.length === 0) return [];
  const key = property as keyof Planet;
  return [...array].sort((a: Planet, b: Planet) => {
    if (
      typeof a[key] === 'undefined' ||
      typeof b[key] === 'undefined' ||
      a[key] === null ||
      b[key] === null
    ) {
      return 0;
    }
    if (Array.isArray(a[key])) {
      if ((a[key] as Array<any>).length < (b[key] as Array<any>).length) return 1;
      else if ((a[key] as Array<any>).length > (b[key] as Array<any>).length) return -1;
    } else {
      if (a[key]! < b[key]!) return 1;
      else if (a[key]! > b[key]!) return -1;
    }
    return 0;
  }) as Planet[];
}
