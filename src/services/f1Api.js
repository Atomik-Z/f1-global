import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const f1Api = createApi({
    reducerPath: 'f1Api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jolpi.ca/ergast/f1/' }), // Mise à jour de la base URL
    endpoints: (builder) => ({
        getCalendrier: builder.query({
            query: (season) => `${season}.json`
        }),
        getDriverStandings: builder.query({
            query: (season) => `${season}/driverStandings.json`
        }),
        getCircuitInfo: builder.query({
            query: (circuitId) => `circuits/${circuitId}.json` // Suppression du "/" initial
        }),
        getConstructorStandings: builder.query({
            query: (season) => `${season}/constructorStandings.json`
        }),
        getRaceResults: builder.query({
            query: ({ season, race }) => `${season}/${race}/results.json`
        }),
        getLastRaceResults: builder.query({
            query: () => `current/last/results.json`
        }),
        getDriver: builder.query({
            query: (driverId) => `drivers/${driverId}.json`
        }),
        getConstructor: builder.query({
            query: (constructorId) => `constructors/${constructorId}.json`
        }),
        getDriverCareerWins: builder.query({
            query: (driverId) => `drivers/${driverId}/results/1.json`
        }),
        getDriverCareerPodiums: builder.query({
            query: ({ driverId, position }) => `drivers/${driverId}/results/${position}.json`
        }),
        getDriverSeasonWins: builder.query({
            query: ({ season, driverId }) => `${season}/drivers/${driverId}/results/1.json`
        }),
        getDriverSeasonPodiums: builder.query({
            query: ({ season, driverId, position }) => `${season}/drivers/${driverId}/results/${position}.json`
        }),
        getConstructorCareerWins: builder.query({
            query: (constructorId) => `constructors/${constructorId}/results/1.json`
        }),
        getConstructorCareerPodiums: builder.query({
            query: ({ constructorId, position }) => `constructors/${constructorId}/results/${position}.json`
        }),
        getConstructorSeasonWins: builder.query({
            query: ({ constructorId, season }) => `${season}/constructors/${constructorId}/results/1.json`
        }),
        getConstructorSeasonPodiums: builder.query({
            query: ({ constructorId, season, position }) => `${season}/constructors/${constructorId}/results/${position}.json`
        }),
    })
});

export const { 
    useGetDriverQuery, useGetConstructorQuery, useGetCalendrierQuery, 
    useGetConstructorCareerPodiumsQuery, useGetConstructorCareerWinsQuery, 
    useGetConstructorSeasonPodiumsQuery, useGetConstructorSeasonWinsQuery, 
    useGetDriverCareerPodiumsQuery, useGetDriverCareerWinsQuery, 
    useGetDriverSeasonPodiumsQuery, useGetDriverSeasonWinsQuery, 
    useGetConstructorStandingsQuery, useGetDriverStandingsQuery, 
    useGetRaceResultsQuery, useGetLastRaceResultsQuery, useGetCircuitInfoQuery 
} = f1Api;
