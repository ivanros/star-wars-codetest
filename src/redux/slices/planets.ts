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
  reducers: {
    addPlanet(state, action) {
      state.data.push({ ...action.payload });
      return state;
    },
    deletePlanet(state, action) {
      state.data = state.data.filter((planet: Planet) => planet.id !== action.payload);
      return state;
    },
    editPlanetProperty(state, action) {
      const { id, key, value } = action.payload;
      state.data = state.data.map((planet: Planet) => {
        if (planet.id === id) {
          return { ...planet, [key]: value };
        }
        return planet;
      });
      console.log('s', id, key, value);
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(planetsApi.endpoints.getPlanets.matchFulfilled, (state, action) => {
      // Retrieving planets into the store. If we already had planet info then it will not be overrided
      // (This is for ensuring data is added/edited/deleted locally, change when using API POST/PUT/PATCH)
      state.data = action.payload.map((newPlanet: Planet) => ({
        ...newPlanet,
        ...state.data.find((oldPlanet: Planet) => oldPlanet.id === newPlanet.id),
      }));
    });
    builder.addMatcher(planetsApi.endpoints.getPlanetById.matchFulfilled, (state, action) => {
      // Updating retrieved planet into the planet list store
      const planet = state.data.find((planet: Planet) => planet.id === action.payload.id);
      if (planet) {
        state.data = state.data.map((planet: Planet) => {
          if (planet.id === action.payload.id) {
            return { ...planet, ...action.payload };
          }
          return planet;
        });
      } else {
        state.data.push(action.payload);
      }
    });
  },
});

export const { useGetPlanetsQuery, useGetPlanetByIdQuery } = planetsApi;
export const { addPlanet, deletePlanet, editPlanetProperty } = planetsSlice.actions;
