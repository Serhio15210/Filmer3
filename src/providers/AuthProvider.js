import React, {useContext, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {saveFcmToken} from '../api/auth';
import {setNotifications, setUser, setUserList} from '../redux/authReducer';
import {getNotifications} from '../api/notifications';
import {
  useGetProfileQuery,
  useGetUserListsQuery,
} from '../services/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {pushConfig} from '../constants/pushConfig';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const AuthContext = React.createContext(null);

const AuthProvider = ({children}) => {
  const [authToken, setAuthToken] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const dispatch = useDispatch();

  // const {
  //   user, refresh, userList, notifications
  // } = useSelector((state) => state.auth);
  const {
    data: userData,
    isLoading: isUserLoading,
    refetch: userRefetch,
    error: userError,
  } = useGetProfileQuery();
  const {
    data: listData,
    isLoading: isListLoading,
    refetch: userListRefetch,
  } = useGetUserListsQuery();
  useEffect(() => {
    if (!userData) {
      setIsAuth(false);
    } else {
      dispatch(
        setUser({
          _id: userData?.userInfo?._id,
          userName: userData?.userInfo?.userName || '',
          avatar: userData?.userInfo?.avatar || '',
          email: userData?.userInfo?.email || '',
          subscribers: userData?.userInfo?.subscribers || [],
          subscriptions: userData?.userInfo?.subscriptions || [],
          favoriteFilms: userData?.userInfo?.favoriteFilms || [],
          favGenres: userData?.userInfo?.favGenres || [],
          favActors: userData?.userInfo?.favActors || [],
        }),
      );
    }
  }, [dispatch, userData]);
  useEffect(() => {
    dispatch(setUserList(listData?.lists));
  }, [dispatch, listData]);
  useEffect(() => {
    AsyncStorage.getItem('auth').then(res => {
      if (res) {
        setAuthToken(res);
        userRefetch();
        userListRefetch();
        setIsAuth(true);
      }
      setIsLoaded(true);
    });
  }, [userListRefetch, userRefetch]);
  // const getUserLists = () => {
  //   getUserList().then(res => {
  //     if (res.success) {
  //       dispatch(setUserList(res?.lists))
  //     }
  //   })
  // }

  const getUserNotifications = () => {
    getNotifications().then(res => {
      dispatch(setNotifications(res?.notifications || []));
    });
  };
  useEffect(() => {
    if (authToken) {
      AsyncStorage.setItem('auth', authToken);

      userRefetch();
      userListRefetch();
      // getUserNotifications()
      // deleteAloneFilms(authToken)
      setIsAuth(true);
    }
  }, [authToken, userListRefetch, userRefetch]);
  useEffect(() => {
    const requestUserPermission = async () => {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        // console.log('Authorization status:', authStatus);
        const token = await messaging().getToken();
        await saveFcmToken(token, authToken);
        console.log('FCM token:', token);
      }
    };

    requestUserPermission();
  }, [authToken]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      Toast.show({
        type: 'success',
        // And I can pass any custom props I want
        text1: remoteMessage?.notification?.title,
        text2: remoteMessage?.notification?.body,
      });
    });

    return unsubscribe;
  }, []);
  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken,
        isAuth,
        setIsAuth,

        // getUserLists,
        getUserNotifications,
        isNewUser,
        setIsNewUser,
        isLoaded,
      }}>
      {children}
      <Toast
        autoHide={true}
        config={pushConfig}
        onPress={() => {
          Toast.hide();
        }}
        visibilityTime={3000}
      />
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error('useAuth() called outside of a AuthProvider?');
  }
  return auth;
};

export {AuthProvider, useAuth};
