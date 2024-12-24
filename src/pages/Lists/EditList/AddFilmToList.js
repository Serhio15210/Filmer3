import {
  Dimensions,
  Image,
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
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {IMG_URI} from '../../../api/apiKey';
import unknown from '../../../styles/unknown.png';
import {dataEng} from '../../../constants/genres';
import {useGetMoviesByIdQuery} from '../../../services/MovieService';
import {useDispatch, useSelector} from 'react-redux';
import FilmerButton from '../../../components/UI/FilmerButton';
import {setTempFilms} from '../../../redux/listReducer';
import {useGetFilmByIdQuery} from '../../../services/FilmService';
import {userApi} from '../../../services/UserService';
import {listApi} from '../../../services/ListService';
import {themeColors} from '../../../components/filmModals/themeColors';
import AwesomeButton from 'react-native-really-awesome-button';
import {useTheme} from '../../../providers/ThemeProvider';
import Loading from '../../../components/UI/Loading';

const AddFilmToList = ({route}) => {
  const navigation = useNavigation();
  const {id} = route.params;
  const {i18n, appTheme} = useTheme();
  const {data: item, isLoading} = useGetMoviesByIdQuery(id);
  const {
    data: filmData,
    isLoading: isGettingFilm,
    isSuccess: successFilm,
    refetch,
  } = useGetFilmByIdQuery(id);
  const [create, {isSuccess, data: createData, error, isLoading: isCreating}] =
    listApi.useCreateFilmMutation();
  const {tempFilms} = useSelector(state => state.list);
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [position, setPosition] = useState(tempFilms?.length + 1 + '');
  const inputWidth = tempFilms?.length + 41;
  const director = item?.credits?.cast?.filter(
    c => c?.known_for_department === 'Directing',
  )[0];
  useEffect(() => {
    if (isSuccess) {
      const pos =
        parseInt(position) > tempFilms?.length + 1
          ? tempFilms?.length + 1
          : parseInt(position) - 1;
      const newArray = [...tempFilms];
      newArray.splice(pos, 0, createData.film);
      dispatch(setTempFilms(newArray));
      navigation.goBack();
    }
  }, [isSuccess]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AntDesign name={'arrowleft'} size={20} color={'white'} />
        </TouchableOpacity>
      </View>
      {isGettingFilm ? (
        <Loading />
      ) : (
        <>
          <View style={styles.content}>
            <View style={styles.info}>
              <Image
                source={
                  item?.poster_path?.length !== 0 && item?.poster_path !== null
                    ? {uri: IMG_URI + item?.poster_path}
                    : unknown
                }
                style={styles.img}
                resizeMode="contain"
              />
              <View>
                <View
                  style={{
                    ...styles.row,
                    alignItems: 'flex-end',
                    flexWrap: 'wrap',
                    width: '100%',
                  }}>
                  <Text
                    numberOfLines={4}
                    style={{color: 'white', fontSize: 18}}>
                    {item?.title}
                  </Text>
                  <Text style={styles.text}>
                    {item?.release_date?.split('-')[0]}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>directed by</Text>
                  <Text style={styles.director}>{director?.name}</Text>
                </View>

                <View style={styles.row}>
                  <AntDesign name="star" size={20} color={'#FFD700'} />
                  <Text style={styles.text}>
                    {Math.round(item?.vote_average * 10) / 10}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.positionRow}>
              <Text>List position</Text>
              <TextInput
                style={{...styles.input, width: inputWidth}}
                value={position}
                onChangeText={setPosition}
              />
            </View>
            <AwesomeButton
              progress
              onPress={next => {
                const pos =
                  parseInt(position) > tempFilms?.length + 1
                    ? tempFilms?.length + 1
                    : parseInt(position) - 1;

                const newArray = [...tempFilms];
                if (!filmData?.film?._id) {
                  create({
                    film: {
                      imdb_id: item.id,
                      poster: item?.poster_path,
                      title: item?.title,
                    },
                  });
                } else {
                  newArray.splice(pos, 0, filmData.film);
                  dispatch(setTempFilms(newArray));
                  navigation.goBack();
                }
                if (!isCreating) {
                  next();
                }
              }}
              width={Dimensions.get('window').width - normalize(30)}
              backgroundColor={themeColors[appTheme].buttonBg}
              borderRadius={10}
              backgroundDarker={'white'}>
              Add
            </AwesomeButton>
          </View>
        </>
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
  content: {
    flex: 1,
    padding: 10,
    gap: 20,
  },
  row: {flexDirection: 'row', alignItems: 'center', gap: 5},
  info: {
    flexDirection: 'row',
    gap: 10,
    borderBottomWidth: 1,
    borderColor: MAIN_GREY_SKELETON,
    paddingBottom: 10,
  },
  img: {
    width: 70,
    height: 100,
  },
  text: {
    fontSize: normalize(14),
    color: MAIN_GREY_SKELETON,
  },
  director: {
    fontWeight: '800',
    fontSize: normalize(14),
    color: MAIN_GREY_SKELETON,
  },
  positionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'space-between',
  },
  input: {
    padding: 0,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: MAIN_GREY_SKELETON,
  },
});
export default AddFilmToList;
