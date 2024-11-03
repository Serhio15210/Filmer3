// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../api/apiKey";
import { loadToken } from "../utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  tagTypes: ["getNotifications","saveFcmToken"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
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
    getNotifications: builder.query({
      query: () => ({
        url: `/getNotifications`,
      }),
      providesTags: result => ["getNotifications"],
    }),

    saveFcmToken: builder.mutation({
      query: (data) => ({
        url: `/saveFcmToken`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: result => ["saveFcmToken"],
    }),
    readMessage: builder.mutation({
      query: (id) => ({
        url: `/markAsRead/${id}`,
        method: "PATCH"
      }),
      invalidatesTags: result => ["getNotifications"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useReadMessageMutation
} = notificationApi;
