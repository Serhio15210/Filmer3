import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async(token) => {
  try {
    await AsyncStorage.setItem('auth', token)
  } catch(err) {
    console.log(err)
  }
}

export const loadToken = async() => {
  try {
    const serializedState = await AsyncStorage.getItem('auth')

    if (serializedState === null) {
      return undefined
    }
    return serializedState
  } catch (err) {
    console.log(err)
    return undefined
  }
}

export const removeToken = async(token) => {
  try {
    await AsyncStorage.removeItem('auth');
    return true;
  }
  catch(exception) {
    return false;
  }
}
