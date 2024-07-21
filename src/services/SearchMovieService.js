// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY } from "../api/apiKey";

// Define a service using a base URL and expected endpoints
export const searchMovieApi = createApi({
  reducerPath: "searchMovieApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/search/movie" }),
  endpoints: (builder) => ({
    getMovieByQuery: builder.mutation({
      query: ({ query, locale = "en", page }  ) => ({
        url: ``,
        method:'GET',
        params: {
          "api_key": API_KEY,
          language: locale === "ukr" ? "uk" : "en",
          "sort_by": "popularity.desc",
          "append_to_response": "credits",
          query:query,
          page:page

        },
      }),
    }),
  }),
});


export const {

  useGetMovieByQueryMutation
} = searchMovieApi;
