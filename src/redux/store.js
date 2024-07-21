import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import { movieApi } from "../services/MovieService";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "../services/UserService";
import { filmApi } from "../services/FilmService";
import listReducer from "./listReducer";
import { searchMovieApi } from "../services/SearchMovieService";
import { listApi } from "../services/ListService";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    list: listReducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [filmApi.reducerPath]: filmApi.reducer,
    [listApi.reducerPath]: listApi.reducer,
    [searchMovieApi.reducerPath]: searchMovieApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(movieApi.middleware)
      .concat(userApi.middleware)
      .concat(filmApi.middleware)
      .concat(searchMovieApi.middleware)
      .concat(listApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
