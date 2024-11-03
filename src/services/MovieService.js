// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY } from "../api/apiKey";

// Define a service using a base URL and expected endpoints
export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/movie" }),
  endpoints: (builder) => ({
    getSoonMovies: builder.query({
      query: (locale = "en", page = 1) => ({
        url: `/upcoming`,
        params: {
          "api_key": API_KEY,
          language: locale === "ukr" ? "uk" : "en",
          "append_to_response": "credits",
          page: page,
        },
      }),
    }),
    getPopularMovies: builder.query({
      query: (locale = "en", page = 1) => ({
        url: `/popular`,
        params: {
          "api_key": API_KEY,
          language: locale === "ukr" ? "uk" : "en",
          page: page,
          "append_to_response": "credits",
          "sort_by": "popularity.desc",
        },
      }),
    }),
    getPremierMovies: builder.query({
      query: (locale = "en", page = 1) => ({
        url: `/now_playing`,
        params: {
          "api_key": API_KEY,
          language: locale === "ukr" ? "uk" : "en",
          "append_to_response": "credits",
          page: page,
        },
      }),
    }),

    getMoviesById: builder.query({
      query: (id, locale = "en") => ({
        url: `/${id}`,
        params: {
          "api_key": API_KEY,
          "append_to_response": "credits",
          language: locale === "ukr" ? "uk" : "en",

        },
      }),

    }),
    getSimilarMovies: builder.query({
      query: (id, locale = "en") => ({
        url: `/${id}/similar`,
        params: {
          "api_key": API_KEY,
          "sort_by": "popularity.desc",
          language: locale === "ukr" ? "uk" : "en",

        },
      }),
    }),
    getTrailerMovies: builder.query({
      query: (id, locale = "en") => ({
        url: `/${id}/videos`,
        params: {
          "api_key": API_KEY,
          language: locale === "ukr" ? "uk" : "en",

        },
      }),
    }),


  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSoonMoviesQuery,
  useGetPopularMoviesQuery,
  useGetPremierMoviesQuery,
  useGetMoviesByIdQuery,
  useGetSimilarMoviesQuery,
  useGetTrailerMoviesQuery,

} = movieApi;
