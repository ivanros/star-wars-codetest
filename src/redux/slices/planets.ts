import { Planet } from '@/models/entities/planet';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const planetsApi = createApi({
  reducerPath: 'createApi',

  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),

  endpoints: (builder) => ({
    getPlanets: builder.query<Planet[], void>({
      query: () => '/planets',
    }),
    getPlanetById: builder.query<Planet, string | undefined>({
      query: (planetId) => `/planets/${planetId}`,
    }),
  }),
});

export const { useGetPlanetsQuery, useGetPlanetByIdQuery } = planetsApi;
