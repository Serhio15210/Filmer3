import { BASE_URL } from "../api/apiKey";
import { loadToken } from "../utils/storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["user", "userLists", "userFavorites","listById","activities"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,

    prepareHeaders: async (headers, query) => {
      const authResult = await loadToken();
      if (authResult) {
        headers.set("Authorization", authResult);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `/auth/getProfile`,
        // headers: ({
        //   Authorization: `${token}`,
        // }),
      }),
      providesTags: result => ["user"],
    }),
    updateProfile: builder.mutation({
      query: (data, token) => ({
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        url: `/auth/update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: result => ["user"],
    }),
    getUserLists: builder.query({
      query: () => ({
        url: `/lists`,
      }),
      providesTags: result => ["userLists"],
    }),
    getUserFavoriteLists: builder.query({
      query: () => ({
        url: `/auth/getFavorites`,
      }),
      providesTags: result => ["userFavorites"],
    }),
    likeFilm: builder.mutation({
      query: (film, token) => ({
        url: `/auth/likeFilm`,
        method: "POST",
        body: film,
      }),
      invalidatesTags: result => ["user", "userFavorites"],
    }),
    dislikeFilm: builder.mutation({
      query: (id) => ({
        url: `/auth/deleteFilm`,
        method: "POST",
        body: {
          imdb_id: id,
        },
      }),
      invalidatesTags: result => ["user", "userFavorites"],
    }),
    getListById: builder.query({
      query: (id) => ({
        url: `/lists/${id}`,
      }),
      providesTags: result => ["listById"],
    }),
    addToList: builder.mutation({
      query: ({ listId, film }) => ({
        url: `/lists/addFilm`,
        method: "POST",
        body: {
          listId: listId,
          film: film,
        },
      }),
      invalidatesTags: result => ["userLists", "listById"],
    }),
    createList: builder.mutation({
      query: ({ name, description,mode }) => ({
        url: `/lists/create`,
        method: "POST",
        body: {
          name,
          description,
          mode
        },
      }),
      invalidatesTags: result => ["userLists"],
    }),
    deleteList: builder.mutation({
      query: (id) => ({
        url: `/lists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: result => ["userLists"],
    }),
    updateList: builder.mutation({
      query: ({ id, name,description,films,mode }) => ({
        url: `/lists/${id}`,
        method: "PATCH",
        body: {
          name,
          description,
          films,
          mode
        },
      }),
      invalidatesTags: result => ["userLists","listById"],
    }),
    getActivities: builder.query({
      query: () => ({
        url: `/auth/getActivities`,
      }),
      providesTags: result => ["activities"],
    }),

  }),

});


export const {
  useGetProfileQuery,
  useGetUserListsQuery,
  useLikeFilmMutation,
  useDislikeFilmMutation,
  useGetUserFavoriteListsQuery,
  useGetListByIdQuery,
  useAddToListMutation,
  useCreateListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
  useGetActivitiesQuery,
  useUpdateProfileMutation
} = userApi;
