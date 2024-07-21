import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BASE_URL} from "./apiKey";
import {loadToken} from "../utils/storage";

export const saveFcmToken = async (token, authToken) => {
  const locale = await AsyncStorage.getItem('locale')
  return axios.post(`${BASE_URL}/auth/saveFcmToken`, {
    fcmToken: token
  }, {
    headers: {
      'Authorization': authToken,
      "language": locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('login', error?.response?.data)
    return error?.response?.data?.message
  });

}
export const saveFavGenres = async (genres) => {
  const locale = await AsyncStorage.getItem('locale')
  const token = await loadToken()
  return axios.post(`${BASE_URL}/auth/saveFavGenres`, {
    genres: genres
  }, {
    headers: {
      'Authorization':token,
      "language": locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('login', error?.response?.data)
    return error?.response?.data?.message
  });

}
export const saveFavActors = async (actors) => {
  const locale = await AsyncStorage.getItem('locale')
  const token = await loadToken()
  return axios.post(`${BASE_URL}/auth/saveFavActors`, {
    actors: actors
  }, {
    headers: {
      'Authorization':token,
      "language": locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('login', error?.response?.data)
    return error?.response?.data?.message
  });

}
export const signIn = async (email, password) => {
  const locale = await AsyncStorage.getItem('locale')
  return axios.post(`${BASE_URL}/auth/login`, {
    email: email,
    password: password
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('login', error?.response?.data)
    return error?.response?.data?.message
  });

}
export const signUp = async (userName, email, password) => {

  const locale = await AsyncStorage.getItem('locale')
  return axios.post(`${BASE_URL}/auth/register`, {
    userName: userName,
    email: email,
    password: password
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('register', error?.response?.data)
    return error?.response?.data?.message
  });

}
export const getProfile = async () => {
  const locale = await AsyncStorage.getItem('locale')
  const token = await loadToken()
  return axios.get(`${BASE_URL}/auth/getProfile`, {
    headers: {
      'Authorization': token,
      "language": locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('getProfile', error?.response?.data)
    return error?.response?.data?.message
  });

}
export const getFavoriteFilms = async () => {
  const locale = await AsyncStorage.getItem('locale')
  const token = await loadToken()
  return axios.get(`${BASE_URL}/auth/getFavorites`, {
    headers: {
      'Authorization': token,
      "language": locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('getFavoriteFilms', error?.response?.data)
    return error?.response?.data?.message
  });

}
export const getActivities = async (id = '') => {
  const locale = await AsyncStorage.getItem('locale')
  const token = await loadToken()
  return axios.post(`${BASE_URL}/auth/getActivities`, {
    _id: id
  }, {
    headers: {
      'Authorization': token,
      "language": locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('getActivities', error?.response?.data)
    return error?.response?.data?.message
  });

}
export const addFavoriteFilm = async (film) => {
  const token = await loadToken()
  const locale = await AsyncStorage.getItem('locale')
  return axios.post(`${BASE_URL}/auth/likeFilm`, film, {
    headers: {
      'Authorization': token,
      "language": locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('addFavoriteFilm', error?.response?.data)
    return error?.response?.data?.message
  });

}
export const deleteFavoriteFilm = async (imdb_id) => {
  const token = await loadToken()
  console.log(typeof imdb_id)
  const locale = await AsyncStorage.getItem('locale')
  return axios.post(`${BASE_URL}/auth/deleteFilm`, {

    imdb_id: imdb_id + ''
  }, {
    headers: {
      'Authorization': token,
      "language": locale
    }
  }).then((response) => {

    return response.data
  }).catch((error) => {
    console.log('deleteFavoriteFilm', error?.response?.data)
    return error?.response?.data?.message
  });

}
export const addFilmsToFavorite = async (films) => {
  const token = await loadToken()
  const locale = await AsyncStorage.getItem('locale')
  return axios.post(`${BASE_URL}/auth/likeFilms`, {
    films: films
  }, {
    headers: {
      'Authorization': token,
      "language": locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    // console.log('register',error?.response?.data)
    return error?.response?.data?.message
  });

}
export const subscribeUser = async (id) => {
  const token = await loadToken()
  console.log(token, id)
  const locale = await AsyncStorage.getItem('locale')
  return axios.post(`${BASE_URL}/auth/subscribe`, {
    _id: id
  }, {
    headers: {
      'Authorization': token,
      "language": locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    // console.log('register',error?.response?.data)
    return error?.response?.data?.message
  });

}
export const unsubscribeUser = async (id) => {
  const token = await loadToken()
  const locale = await AsyncStorage.getItem('locale')
  return axios.post(`${BASE_URL}/auth/unsubscribe`, {
    _id: id
  }, {
    headers: {
      'Authorization': token,
      "language": locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    // console.log('register',error?.response?.data)
    return error?.response?.data?.message
  });

}
