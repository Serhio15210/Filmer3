import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {BASE_URL} from "./apiKey";

import {loadToken} from "../utils/storage";

export const deleteAloneFilms = async () => {

  const locale = await AsyncStorage.getItem('locale')
  const token=await loadToken()
  return axios.post(`${BASE_URL}/films/deleteAloneFilm`,{}, {
    headers:{
      'Authorization': token,
      "language":locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('register',error?.response?.data)
    return error?.response?.data?.message
  });

}
export const editFilm = async (film,rate,comment,isFavorite) => {

  const locale = await AsyncStorage.getItem('locale')
  const token=await loadToken()
  return axios.patch(`${BASE_URL}/films/update`,{
    imdb_id:film?.imdb_id,
    title:film?.title,
    poster:film?.poster,
    isFavorite:isFavorite,
    rate:rate,
    comment:comment
  }, {
    headers:{
      'Authorization': token,
      "language":locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('register',error?.response?.data)
    return error?.response?.data?.message
  });

}
export const getFilm = async (id) => {

  const locale = await AsyncStorage.getItem('locale')
  const token=await loadToken()
  return axios.post(`${BASE_URL}/films/getFilm`,{
    imdb_id:id
  } ,{
    headers:{
      'Authorization': token,
      "language":locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('getFilm',error?.response?.data)
    return error?.response?.data?.message
  });

}
export const getUserFilms = async (sort='all',rate=0,page) => {
  console.log(sort,rate,page)
  const locale = await AsyncStorage.getItem('locale')
  const token=await loadToken()
  return axios.get(`${BASE_URL}/films/${sort}/${rate}/${page}` ,{
    headers:{
      'Authorization': token,
      "language":locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('register',error?.response?.data)
    return error?.response?.data?.message
  });

}
export const getForeignUserFilms = async (id,sort='all',rate=0,watched,page) => {
  console.log(sort,rate,page)
  const locale = await AsyncStorage.getItem('locale')
  const token=await loadToken()
  return axios.get(`${BASE_URL}/films/${id}/${sort}/${rate}/${watched}/${page}` ,{
    headers:{
      'Authorization': token,
      "language":locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('register',error?.response?.data)
    return error?.response?.data?.message
  });

}
export const getRateStats = async (id) => {

  const locale = await AsyncStorage.getItem('locale')
  const token=await loadToken()
  return axios.post(`${BASE_URL}/films/stats` ,{
    _id:id
  },{
    headers:{
      'Authorization': token,
      "language":locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('register',error?.response?.data)
    return error?.response?.data?.message
  });

}
export const getReviews = async (id) => {

  const locale = await AsyncStorage.getItem('locale')
  const token=await loadToken()
  return axios.post(`${BASE_URL}/films/reviews` ,{
    imdb_id:id
  },{
    headers:{
      'Authorization': token,
      "language":locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('register',error?.response?.data)
    return error?.response?.data?.message
  });

}
