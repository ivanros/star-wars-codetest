import { Planet } from '@/models/entities/planet';
import { ErrorResponse } from '@/models/internals/error-response';
import { createSlice } from '@reduxjs/toolkit';
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const initialState = {
  data: [] as Planet[],
};

export const planetsApi = createApi({
  reducerPath: 'createApi',

  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }) as BaseQueryFn<string | FetchArgs, unknown, ErrorResponse, {}>,

  endpoints: (builder) => ({
    getPlanets: builder.query<Planet[], void>({
      query: () => '/planets',
    }),
    getPlanetById: builder.query<Planet, string | undefined>({
      query: (planetId) => `/planets/${planetId}`,
    }),
  }),
});

export const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(planetsApi.endpoints.getPlanets.matchFulfilled, (state, action) => {
      // Retrieving planets into the store
      state.data = action.payload;
    });
    builder.addMatcher(planetsApi.endpoints.getPlanetById.matchFulfilled, (state, action) => {
      // Updating retrieved planet into the planet list store
      state.data = state.data.map((planet: Planet) => {
        if (planet.id === action.payload.id) {
          return { ...planet, ...action.payload };
        }
        return planet;
      });
    });
  },
});

export const { useGetPlanetsQuery, useGetPlanetByIdQuery } = planetsApi;
