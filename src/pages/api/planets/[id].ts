import { API_ERRORS } from '@/constants/errors.constants';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@/apollo-client';
import { gql } from '@apollo/client';
import { Planet } from '@/models/entities/planet';
import { ErrorResponse } from '@/models/internals/error-response';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Planet | ErrorResponse | null>,
) {
  const { id } = req.query;

  let planet!: Planet;

  // GraphQL request with try/catch in case of HTTP error
  try {
    const response = await client.query({
      query: gql`
        query GetPlanetById($id: ID!) {
          planet(id: $id) {
            id
            name
            diameter
            climates
            terrains
            created
            population
            orbitalPeriod
            rotationPeriod
            residentConnection {
              residents {
                name
                gender
                species {
                  name
                }
                height
                mass
                hairColor
                skinColor
              }
            }
          }
        }
      `,
      variables: { id },
    });
    planet = response.data;
  } catch (e) {
    // TODO: Capture error as Sentry trace when available
    console.error(e);
    // Avoid exposing server error message into the client side
    res.status(500).json({ message: API_ERRORS.PLANET_NOT_FOUND });
  }

  res.status(200).json(planet);
}
