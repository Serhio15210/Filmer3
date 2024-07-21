import AsyncStorage from "@react-native-async-storage/async-storage";
import {loadToken} from "../utils/storage";
import axios from "axios";
import {BASE_URL} from "./apiKey";

export const getUsers = async (query='',page) => {
  const locale = await AsyncStorage.getItem('locale')
  const token=await loadToken()
  return axios.get(`${BASE_URL}/auth/getUsers/${page}/${query}`, {
    headers:{
      'Authorization': token,
      "language":locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('getUsers',error?.response?.data)
    return error?.response?.data?.message
  });

}
export const getUserProfile = async (id) => {
  const locale = await AsyncStorage.getItem('locale')
  const token=await loadToken()
  return axios.post(`${BASE_URL}/auth/getProfile`,{
    _id:id
  }, {
    headers:{
      'Authorization': token,
      "language":locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('getUserProfile',error?.response?.data)
    return error?.response?.data?.message
  });

}
export const getSubscribers = async (id) => {
  const locale = await AsyncStorage.getItem('locale')
  const token=await loadToken()
  return axios.get(`${BASE_URL}/subscribers/${id}`,  {
    headers:{
      'Authorization': token,
      "language":locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('getSubscribers',error?.response?.data)
    return error?.response?.data?.message
  });

}
export const getSubscriptions = async (id) => {
  const locale = await AsyncStorage.getItem('locale')
  const token=await loadToken()
  return axios.get(`${BASE_URL}/subscriptions/${id}`,  {
    headers:{
      'Authorization': token,
      "language":locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('getSubscriptions',error?.response?.data)
    return error?.response?.data?.message
  });

}
// export const getForeignUserList = async (id) => {
//   const token=await loadToken()
//   const locale = await AsyncStorage.getItem('locale')
//   return axios.get(`${BASE_URL}/users/lists/${id}`, {
//     headers:{
//       'Authorization': token,
//       "language":locale
//     }
//   }).then((response) => {
//     return response.data
//   }).catch((error) => {
//     console.log('getUserList',error?.response?.data)
//     return error?.response?.data?.message
//   });
//
// }
