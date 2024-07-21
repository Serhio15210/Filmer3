// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../api/apiKey";
import { loadToken } from "../utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define a service using a base URL and expected endpoints
export const listApi = createApi({
  reducerPath: 'listApi',
  tagTypes: ["listById"],
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/lists`,
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
    createFilm:builder.mutation({
      query: ({ film  }) => ({
        url: `/createFilm`,
        method:'POST',
        body: {
          imdb_id:film?.imdb_id,
          title:film?.title,
          poster:film?.poster,
          isSerial:film?.isSerial
        }
      })
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useCreateFilmMutation } = listApi
