import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {BLACK, MAIN_GREY_SKELETON} from '../../../constants/colors';
import {MAIN_YELLOW} from '../../../constants';
import {normalize} from '../../../responsive/fontSize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {setTempFilms} from '../../../redux/listReducer';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FilmCard from '../../../components/Films/FilmCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import {userApi} from '../../../services/UserService';
import {movieApi} from '../../../services/MovieService';
import {searchMovieApi} from '../../../services/SearchMovieService';
import FindFilmCard from '../../../components/Films/FindFilmCard';
import Loading from '../../../components/UI/Loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const FindFilmToList = () => {
  const navigation = useNavigation();
  const [recentSearches, setRecentSearches] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [search, {isLoading, isSuccess, data, error}] =
    searchMovieApi.useGetMovieByQueryMutation();
  const {tempFilms} = useSelector(state => state.list);
  const dublicateFilms = useMemo(() => {
    return tempFilms?.map(item => item?.imdb_id);
  }, [tempFilms]);
  console.log(dublicateFilms);
  useEffect(() => {
    async function fetchData() {
      const data = await AsyncStorage.getItem('recent');
      // console.log(data);
      if (data) {
        setRecentSearches(data?.split(','));
      }
    }

    fetchData();
  }, []);
  useEffect(() => {
    // console.log(data?.page);
    if (query) {
      search({query, locale: '', page});
    }
  }, [query, page]);
  useEffect(() => {
    setSearchData(prev => prev?.concat(data?.results));
  }, [data]);
  useEffect(() => {
    // console.log(recentSearches);
    if (recentSearches?.length > 0) {
      async function fetchData() {
        await AsyncStorage.setItem('recent', recentSearches?.join(','));
      }

      fetchData();
    }
  }, [recentSearches]);
  let scrollRef = useRef();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name={'arrowleft'} size={20} color={'white'} />
        </TouchableOpacity>

        <TextInput
          style={{flex: 1, paddingVertical: 0}}
          placeholder={'Add a film...'}
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity
          onPress={() => {
            setQuery('');
          }}>
          <AntDesign name={'close'} size={20} color={'white'} />
        </TouchableOpacity>
      </View>
      {!query ? (
        <>
          <Text
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: MAIN_GREY_SKELETON,
            }}>
            Recent searches
          </Text>
          <FlatList
            data={recentSearches}
            maxToRenderPerBatch={3}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => 'key' + index}
            contentContainerStyle={{padding: 20}}
            renderItem={({item, index}) => {
              return (
                <Pressable
                  style={{width: '100%'}}
                  onPress={() => setQuery(item)}>
                  <Text>{item}</Text>
                </Pressable>
              );
            }}
          />
        </>
      ) : (
        <FlatList
          ref={scrollRef}
          data={searchData?.filter(
            item => item?.id && !dublicateFilms?.includes(item.id + ''),
          )}
          onScroll={e => {
            setScrollPosition(e.nativeEvent.contentOffset.y);
          }}
          maxToRenderPerBatch={3}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => 'key' + index}
          contentContainerStyle={{gap: 20, paddingVertical: 10}}
          onEndReachedThreshold={0.8}
          onEndReached={() => {
            !isLoading && setPage(prev => prev + 1);
          }}
          ListFooterComponent={<Loading />}
          renderItem={({item, index}) => {
            return (
              <FindFilmCard
                item={item}
                index={index}
                onPress={() => {
                  const array = new Set(recentSearches.concat([query]));
                  setRecentSearches([...array]);
                  navigation.navigate('AddFilmToList', {
                    item: item,
                    id: item.id,
                    title: item.title,
                  });
                }}
              />
            );
          }}
        />
      )}
      {scrollPosition > 100 && (
        <Pressable
          style={styles.up}
          onPress={() => {
            scrollRef?.current?.scrollToOffset({animated: true, offset: 0});
          }}>
          <Ionicons name={'arrow-up'} color={'white'} size={30} />
        </Pressable>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
    // padding: normalize(20),
  },
  header: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: MAIN_YELLOW,
    padding: 20,
    gap: 20,
  },
  up: {
    backgroundColor: MAIN_YELLOW,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
});
export default FindFilmToList;
