import fs from 'fs';
import path from 'path';

export function getRandomPlanetImage(planetName: String) {
  const publicPath = path.join(process.cwd(), 'public');
  const publicImages = fs.readdirSync(publicPath);
  const totalPlanetImages = publicImages.filter((file) => file.startsWith('planet_')).length;
  const index = (planetName.length % totalPlanetImages) + 1;
  return `/planet_${index}.png`;
}
