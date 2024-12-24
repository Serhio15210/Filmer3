import React, {useEffect, useRef, useState} from 'react';
import {LogBox, ScrollView, StatusBar} from 'react-native';
import MenuFilmsList from '../components/Films/MenuFilmsList/MenuFilmsList';
import GetFilms from '../api/GetFilms';
import {useAuth} from '../providers/AuthProvider';

import {useIsFocused} from '@react-navigation/native';

import ScreenWrapper from '../components/wrapper/ScreenWrapper';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '../providers/ThemeProvider';
import {
  useGetPopularMoviesQuery,
  useGetPremierMoviesQuery,
  useGetSoonMoviesQuery,
} from '../services/MovieService';
import {data} from '../constants/genres';
import MyHomeLists from '../components/MyHomeLists';

const HomeFilmsScreen = ({navigation}) => {
  const [recommendData, setRecommendData] = useState([]);
  const componentMounted = useRef(true);
  // const { getUserInfo,getUserLists,getUserNotifications}=useAuth()

  const dispatch = useDispatch();
  const {isDarkTheme, i18n, locale, appTheme} = useTheme();
  const {refresh, user} = useSelector(state => state.auth);
  const isFocused = useIsFocused();
  const {
    data: soonData,
    isLoading: isSoonLoading,
    refetch: soonRefetch,
  } = useGetSoonMoviesQuery(locale);
  const {
    data: popularData,
    isLoading: isPopularLoading,
    refetch: popularRefetch,
  } = useGetPopularMoviesQuery(locale);
  const {
    data: premierData,
    isLoading: isPremierLoading,
    refetch: premierRefetch,
  } = useGetPremierMoviesQuery(locale);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    return () => {
      // This code runs when component is unmounted
      componentMounted.current = false; // (4) set it to false when we leave the page
    };
  }, [locale]);

  return (
    <ScreenWrapper
      refreshing={() => {
        soonRefetch();
        popularRefetch();
        premierRefetch();
      }}
      isRefreshed={isSoonLoading && isPopularLoading && isPremierLoading}>
      <ScrollView style={{height: '100%'}}>
        <MenuFilmsList
          data={soonData?.results}
          name={i18n.t('soonInCinema')}
          navigation={navigation}
          isLoading={isSoonLoading}
        />
        <MenuFilmsList
          data={premierData?.results}
          name={i18n.t('premiers')}
          isLoading={isPopularLoading}
        />
        <MenuFilmsList
          data={popularData?.results}
          name={i18n.t('nowWatching')}
          isLoading={isPremierLoading}
        />
        <MyHomeLists />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default HomeFilmsScreen;
