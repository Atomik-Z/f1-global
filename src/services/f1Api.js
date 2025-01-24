import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const f1Api = createApi({
    reducerPath: 'f1Api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ergast.com/api/f1/'}),
    endpoints: (builder) => ({
        getCalendrier: builder.query({
            query: (season) => `${season}.json`
        }),
        getDriverStandings: builder.query({
            query: (season) => `${season}/driverStandings.json`
        }),
        getCircuitInfo: builder.query({
            query: (circuitId) => `/circuits/${circuitId}.json`
        }),
        getConstructorStandings: builder.query({
            query: (season) => `${season}/constructorStandings.json`
        }),
        getRaceResults: builder.query({
            query: (args) => {
                const { season, race } = args;
                return { url: `${season}/${race}/results.json`}
            }
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
            query: (args) => {
                const { driverId, position } = args;
                return { url: `drivers/${driverId}/results/${position}.json`}
            }
        }),
        getDriverSeasonWins: builder.query({
            query: (args) => {
                const { season, driverId } = args;
                return { url: `${season}/drivers/${driverId}/results/1.json`}
            } 
        }),
        getDriverSeasonPodiums: builder.query({
            query: (args) => {
                const { season, driverId, position } = args;
                return { url: `${season}/drivers/${driverId}/results/${position}.json`}
            }
        }),
        getConstructorCareerWins: builder.query({
            query: (constructorId) => `constructors/${constructorId}/results/1.json`
        }),
        getConstructorCareerPodiums: builder.query({
            query: (args) => {
                const { constructorId, position } = args;
                return { url: `constructors/${constructorId}/results/${position}.json`}
            }
        }),
        getConstructorSeasonWins: builder.query({
            query: (args) => {
                const { constructorId, season } = args;
                return { url: `${season}/constructors/${constructorId}/results/1.json`}
            }
        }),
        getConstructorSeasonPodiums: builder.query({
            query: (args) => {
                const { constructorId, season, position } = args;
                return { url: `${season}/constructors/${constructorId}/results/${position}.json`}
            }
        }),
    })
})

export const { useGetDriverQuery, useGetConstructorQuery, useGetCalendrierQuery, useGetConstructorCareerPodiumsQuery, useGetConstructorCareerWinsQuery, useGetConstructorSeasonPodiumsQuery
, useGetConstructorSeasonWinsQuery, useGetDriverCareerPodiumsQuery, useGetDriverCareerWinsQuery, useGetDriverSeasonPodiumsQuery, useGetDriverSeasonWinsQuery, useGetConstructorStandingsQuery
, useGetDriverStandingsQuery, useGetRaceResultsQuery, useGetLastRaceResultsQuery, useGetCircuitInfoQuery } = f1Api;