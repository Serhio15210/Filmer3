import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {normalize} from '../../responsive/fontSize';
import AntDesign from 'react-native-vector-icons/AntDesign';

import FindFilmModal from '../../components/filmModals/FindFilmModal';
import {MAIN_GREY_FADE, MAIN_RED} from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FilmItem from '../../components/Films/FilmItem';
import {FAVORITE_LIST_IMG} from '../../api/apiKey';
import Loading from '../../components/UI/Loading';
import RateInfoModal from '../../components/filmModals/RateInfoModal';
import {
  useGetUserFavoriteListsQuery,
  userApi,
} from '../../services/UserService';
import {useTheme} from '../../providers/ThemeProvider';

const FavoriteListOverview = ({route}) => {
  const [isAddFilm, setIsAddFilm] = useState(false);
  const [openEditFilm, setOpenEditFilm] = useState(false);
  const [selectFilm, setSelectFilm] = useState({});
  // const [listData, setListData] = useState([])
  const navigation = useNavigation();
  const {isDarkTheme, i18n} = useTheme();
  let row = [];
  let swipe;
  const {data: listData, isLoading, refetch} = useGetUserFavoriteListsQuery();
  const [
    removeFromFavorite,
    {isLoading: isDeleting, error: errorDeleting, isSuccess: isDeleted},
  ] = userApi.useDislikeFilmMutation();
  const [addToFavorite, {isLoading: isLiking, isSuccess}] =
    userApi.useLikeFilmMutation();

  const leftAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.delete}>
        <Animated.Text
          style={{color: 'white', marginLeft: 30, transform: [{scale}]}}>
          {' '}
          <AntDesign name="delete" size={30} color={'white'} />
        </Animated.Text>
      </View>
    );
  };
  const closeRow = index => {
    if (swipe && swipe !== row[index]) {
      swipe.close();
    }
    swipe = row[index];
  };
  const deleteItem = item => {
    console.log(item?._id);
    removeFromFavorite(item?.imdb_id);
    if (isDeleted) {
    }
    // deleteFavoriteFilm(item?.imdb_id).then(res => {
    //   console.log(res,listData.filter(film => film?.imdb_id !== item?.imdb_id))
    //
    //   setListData((prev)=>prev.filter(film => film?.imdb_id !== item?.imdb_id))
    //   // dispatch(setUser( {...user, favoriteFilms: listData.filter(film => film?.imdb_id !== item?.imdb_id)}))
    // })
  };

  const addNewFilm = film => {
    addToFavorite(film);
  };

  useEffect(() => {
    !openEditFilm && refetch();
  }, [openEditFilm]);

  return (
    <View style={styles.container}>
      <Image
        source={{uri: FAVORITE_LIST_IMG}}
        style={{
          width: '100%',
          height: 300,
        }}
      />

      {isAddFilm && (
        <FindFilmModal
          setOpen={setIsAddFilm}
          open={isAddFilm}
          isFavorite={true}
          listData={listData?.favoriteFilms}
          isListCreated={true}
          onPressSuccess={addNewFilm}
        />
      )}
      {openEditFilm && (
        <RateInfoModal
          open={openEditFilm}
          setOpen={setOpenEditFilm}
          selectFilm={selectFilm}
        />
      )}
      <View>
        <View style={styles.betweenRow} />
      </View>

      <View style={{paddingHorizontal: 15, flex: 1}}>
        <Text
          style={{
            ...styles.imgTitle,
            color: 'black',
            fontWeight: '600',
            marginBottom: 20,
          }}>{`${i18n.t('films')}/${i18n.t('serials')}`}</Text>
        {listData?.favoriteFilms?.length === 0 ? (
          <TouchableOpacity
            style={styles.addBlock}
            onPress={() => setIsAddFilm(true)}>
            <Ionicons
              name={'add-circle-outline'}
              size={50}
              color={MAIN_GREY_FADE}
            />
          </TouchableOpacity>
        ) : isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={listData?.favoriteFilms}
            contentContainerStyle={{alignItems: 'center', paddingBottom: 100}}
            renderItem={({item, index}) => {
              return (
                <FilmItem
                  item={item}
                  key={item?._id}
                  index={index}
                  row={row}
                  closeRow={closeRow}
                  leftAction={leftAction}
                  swipeAction={deleteItem}
                  onRatePress={() => {
                    setSelectFilm(item);
                    setOpenEditFilm(true);
                  }}
                  onPress={() => {
                    if (item?.isSerial) {
                      navigation.navigate('SerialOverview', {
                        title: item?.title,
                        id: item?.imdb_id,
                      });
                    } else {
                      navigation.navigate('FilmOverview', {
                        title: item?.title,
                        id: item?.imdb_id,
                      });
                    }
                  }}
                />
              );
            }}
          />
        )}
      </View>

      <TouchableOpacity style={styles.add} onPress={() => setIsAddFilm(true)}>
        <Ionicons name={'add'} color={'white'} size={30} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  imageBg: {
    height: 300,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imgTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    padding: 15,
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
  },
  imgTitle: {
    color: 'white',
    fontSize: 24,
    marginRight: 10,
  },
  white16: {
    color: 'white',
    fontSize: 16,
  },
  edit: {
    backgroundColor: 'white',
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,

    borderRadius: 10,
    alignSelf: 'flex-end',
    margin: 15,
  },
  add: {
    backgroundColor: MAIN_RED,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
  addBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  betweenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  delete: {
    backgroundColor: '#DC143C',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
    borderRadius: 10,
  },
});
export default FavoriteListOverview;
