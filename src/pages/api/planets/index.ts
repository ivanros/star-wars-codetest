import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@/apollo-client';
import { gql } from '@apollo/client';
import { Planet } from '@/models/entities/planet';
import { ErrorResponse } from '@/models/internals/error-response';
import { API_ERRORS } from '@/constants/errors.constants';
import { getRandomPlanetImage } from '@/utils/image-utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Planet[] | ErrorResponse>,
) {
  let planets!: Planet[];

  // GraphQL request with try/catch in case of HTTP error
  try {
    const response = await client.query({
      query: gql`
        query GetAllPlanets {
          allPlanets {
            planets {
              id
              name
              diameter
              climates
              terrains
              residentConnection {
                totalCount
              }
            }
          }
        }
      `,
    });
    // Before returning the data we ensure to push a random image per each planet
    planets = response.data.allPlanets.planets.map((planet: Planet) => {
      const image = getRandomPlanetImage(planet.name);
      return { ...planet, image };
    });
  } catch (e) {
    // TODO: Capture error as Sentry trace when available
    console.error(e);
    // Avoid exposing server error message into the client side
    res.status(500).json({ message: API_ERRORS.PLANETS_NOT_FOUND });
  }

  res.status(200).json(planets);
}
