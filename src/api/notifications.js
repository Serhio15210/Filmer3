import AsyncStorage from "@react-native-async-storage/async-storage";
import {loadToken} from "../utils/storage";
import axios from "axios";
import {BASE_URL} from "./apiKey";

export const getNotifications = async () => {
  const locale = await AsyncStorage.getItem('locale')
  const token = await loadToken()
  return axios.get(`${BASE_URL}/auth/getNotifications`, {
    headers: {
      'Authorization': token,
      "language": locale
    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('getNotifications', error?.response?.data)
    return error?.response?.data?.message
  });

}
export const readNotification = async (id) => {

  const token = await loadToken()

  return axios.patch(`${BASE_URL}/auth/markAsRead/${id}`,{}, {
    headers: {
      'Authorization': token,

    }
  }).then((response) => {
    return response.data
  }).catch((error) => {
    console.log('readNotification', error?.response?.data)
    return error?.response?.data?.message
  });

}
