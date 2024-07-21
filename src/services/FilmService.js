// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../api/apiKey";
import { loadToken } from "../utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const filmApi = createApi({
  reducerPath: 'filmApi',
  tagTypes: ["filmById","filmRating","filmStats","filmReviews","activities"],
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/films`,
    prepareHeaders: async (headers, query) => {
      const authResult = await loadToken();
      const locale = await AsyncStorage.getItem('locale')
      if (authResult) {
        headers.set("Authorization", authResult);
        headers.set("language", locale);
      }
      return headers;
    },}),
  endpoints: (builder) => ({
    getFilmReviews: builder.query({
      query: (id) => ({
        url:`/reviews`,
        method:'POST',
        body:{
          imdb_id:id
        }

      }),
      providesTags: result => ["filmReviews"],
    }),
    getFilmById: builder.query({
      query: (id) => ({
        url:`/getFilm`,
        method:'POST',
        body:{
          imdb_id:id
        }

      }),
      providesTags: result => ["filmById"],
    }),
    getFilmRating: builder.query({
      query: (id) => ({
        url:`/getFilmRating`,
        method:'POST',
        body:{
          imdb_id:id
        }

      }),
      providesTags: result => ["filmRating"],
    }),
    updateFilm:builder.mutation({
      query: ({ film, rate, comment, isFavorite }) => ({
        url: `/update`,
        method:'PATCH',
        body: {
          imdb_id:film?.imdb_id,
          title:film?.title,
          poster:film?.poster,
          isFavorite:isFavorite,
          rate:rate,
          comment:comment
        }
      }),
      invalidatesTags: result => ["filmById","activities"],
    }),
    getFilmStats: builder.query({
      query: (id) => ({
        url:`/stats`,
        method:'POST',
        body:{
          imdb_id:id
        }

      }),
      providesTags: result => ["filmStats"],
    }),
  }),
})

export const {useGetFilmReviewsQuery,useGetFilmByIdQuery,useUpdateFilmMutation,useGetFilmRatingQuery,useGetFilmStatsQuery } = filmApi
