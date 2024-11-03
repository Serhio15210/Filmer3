// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../api/apiKey";
import { loadToken } from "../utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { notificationApi } from "./NotificationService";

export const filmApi = createApi({
  reducerPath: "filmApi",
  tagTypes: ["filmById", "filmRating", "filmStats", "filmReviews", "activities", "userAllFilms"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/films`,
    prepareHeaders: async (headers, query) => {
      const authResult = await loadToken();
      const locale = await AsyncStorage.getItem("locale");
      if (authResult) {
        headers.set("Authorization", authResult);
        headers.set("language", locale);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFilmReviews: builder.query({
      query: (id) => ({
        url: `/reviews`,
        method: "POST",
        body: {
          imdb_id: id,
        },

      }),
      providesTags: result => ["filmReviews"],
    }),
    getFilmById: builder.query({
      query: (id) => ({
        url: `/getFilm`,
        method: "POST",
        body: {
          imdb_id: id,
        },

      }),
      providesTags: result => ["filmById"],
    }),
    getFilmRating: builder.query({
      query: (id) => ({
        url: `/getFilmRating`,
        method: "POST",
        body: {
          imdb_id: id,
        },

      }),
      providesTags: result => ["filmRating"],
    }),
    updateFilm: builder.mutation({
      query: ({ film, rate, comment, isFavorite }) => ({
        url: `/update`,
        method: "PATCH",
        body: {
          imdb_id: film?.imdb_id,
          title: film?.title,
          poster: film?.poster,
          isFavorite: isFavorite,
          rate: rate,
          comment: comment,
        },
      }),
      invalidatesTags: result => ["filmById", "activities", "filmReviews"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(notificationApi.util.invalidateTags(['getNotifications']));
        } catch (error) {
          console.error('Failed to update film:', error);
        }
      }
    }),
    getFilmStats: builder.query({
      query: (id) => ({
        url: `/stats`,
        method: "POST",
        body: {
          imdb_id: id,
        },

      }),
      providesTags: result => ["filmStats"],
    }),
    getUserFilms: builder.query({
      query: ({ sort, rate, page }) => ({
        url: `/${sort}/${rate}/${page}`,
      }),
      providesTags: result => ["userAllFilms"],
    }),
  }),
});

export const {
  useGetFilmReviewsQuery,
  useGetFilmByIdQuery,
  useUpdateFilmMutation,
  useGetFilmRatingQuery,
  useGetFilmStatsQuery,
  useGetUserFilmsQuery
} = filmApi;
