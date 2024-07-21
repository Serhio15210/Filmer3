import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {BASE_URL} from "./apiKey";
import {loadToken} from "../utils/storage";

export const getUserList = async (id='') => {
  const token=await loadToken()
  const locale = await AsyncStorage.getItem('locale')
  return axios.post(`${BASE_URL}/lists`, {
    _id:id
  },{
    headers:{
      'Authorization': token,
      "language":locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('getUserList',error?.response?.data)
    return error?.response?.data?.message
  });

}
export const getListById = async (id) => {
  const token=await loadToken()
  const locale = await AsyncStorage.getItem('locale')
  return axios.get(`${BASE_URL}/lists/${id}`, {
    headers:{
      'Authorization': token,
      "language":locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('getListById',error?.response?.data)
    return error?.response?.data?.message
  });

}
export const deleteListById = async (id) => {
  const token=await loadToken()
  const locale = await AsyncStorage.getItem('locale')
  return axios.delete(`${BASE_URL}/lists/${id}`, {
    headers:{
      'Authorization': token,
      "language":locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('deleteListById',error?.response?.data)
    return error?.response?.data?.message
  });

}
export const createNewList = async (list) => {
  console.log('create list',list)
  const token=await loadToken()
  const locale = await AsyncStorage.getItem('locale')
  return axios.post(`${BASE_URL}/lists/create`,list, {
    headers:{
      'Authorization': token,
      "language":locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('createNewList',error?.response?.data)
    return error?.response?.data?.message
  });

}
export const addFilmsToList = async (id,films) => {
  const token=await loadToken()
  const locale = await AsyncStorage.getItem('locale')
  return axios.post(`${BASE_URL}/lists/addFilms`, {
    _id:id,
    films:films
  }, {
    headers:{
      'Authorization': token,
      "language":locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    // console.log('register',error?.response?.data)
    return error?.response?.data?.message
  });

}

export const addFilmToList = async (id,film) => {
  const token=await loadToken()
  console.log('addFilmToList',id, film)
  const locale = await AsyncStorage.getItem('locale')
  return axios.post(`${BASE_URL}/lists/addFilm`, {
    listId:id,
    ...film,

  }, {
    headers:{
      'Authorization': token,
      "language":locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('addFilmToList',error?.response?.data)
    return error?.response?.data?.message
  });

}

export const deleteFromList = async (id,filmId) => {
  const token=await loadToken()
  const locale = await AsyncStorage.getItem('locale')
  return axios.post(`${BASE_URL}/lists/deleteFilm`, {
    _id:id,
    filmId:filmId
  }, {
    headers:{
      'Authorization': token,
      "language":locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('deleteFromList',error?.response?.data)
    return error?.response?.data?.message
  });

}
export const renameList = async (id,name) => {
  const token=await loadToken()
  const locale = await AsyncStorage.getItem('locale')
  return axios.patch(`${BASE_URL}/lists/${id}`, {
    name:name
  },{
    headers:{
      'Authorization': token,
      "language":locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('renameList',error?.response?.data)
    return error?.response?.data?.message
  });

}
