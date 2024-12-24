import React, {useEffect, useState} from 'react';
import {useAuth} from '../../providers/AuthProvider';
import {addFavoriteFilm, deleteFavoriteFilm} from '../../api/auth';
import ModalContainer from '../ModalContainer';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {normalize} from '../../responsive/fontSize';
import {
  MAIN_GREY,
  MAIN_GREY_FADE,
  MAIN_RED,
  MAIN_SUCCESS,
} from '../../constants/colors';
import {addFilmsToList} from '../../api/lists';

import AwesomeButton from 'react-native-really-awesome-button';
import {editFilm, getFilm} from '../../api/films';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../redux/authReducer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddFilmToListModal from './AddFilmToListModal';
import {useTheme} from '../../providers/ThemeProvider';
import {themeColors} from './themeColors';
import {userApi} from '../../services/UserService';
import {useGetFilmByIdQuery, filmApi} from '../../services/FilmService';

const RateInfoModal = ({open, setOpen, selectFilm, isUser = true}) => {
  const {authToken, getUserInfo} = useAuth();
  const {user, refresh} = useSelector(state => state.auth);
  const {i18n, appTheme} = useTheme();
  const styles = style(themeColors[appTheme]);
  const [chosenFilm, setChosenFilm] = useState({});
  const [rate, setRate] = useState(selectFilm?.rate || 0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [comment, setComment] = useState(selectFilm?.comment || '');
  const dispatch = useDispatch();
  const [isAddList, setIsAddList] = useState(false);
  const [addToFavorite, {isLoading: isLiking, isSuccess, error: errorFilm}] =
    userApi.useLikeFilmMutation();
  const {
    data: filmData,
    isLoading: isGettingFilm,
    isSuccess: successFilm,
    refetch,
  } = useGetFilmByIdQuery(selectFilm?.imdb_id);
  const [removeFromFavorite, {isLoading: isDeleting, isSuccess: isDeleted}] =
    userApi.useDislikeFilmMutation();
  const [updateFilm, {isLoading: isUpdating, error, isSuccess: isUpdated}] =
    filmApi.useUpdateFilmMutation();

  // useEffect(() => {
  //   if (open){
  //     refetch(selectFilm?.imdb_id)
  //   }
  // }, [open]);
  useEffect(() => {
    try {
      console.log(selectFilm?.imdb_id, filmData);
      if (successFilm) {
        setIsFavorite(filmData.film.isFavorites);
        setRate(filmData.film?.rates);
        setComment(filmData.film?.comments);
        setChosenFilm({
          imdb_id: filmData.film?.imdb_id + '',
          poster: filmData.film?.poster,
          title: filmData.film?.title,
          rate: filmData.film?.rates,
          comment: filmData.film?.comments,
          isSerial: filmData.film?.isSerial,
          isFavorite: filmData.film.isFavorites,
        });
      } else {
        setChosenFilm(selectFilm);
      }
    } catch (e) {
      setChosenFilm(selectFilm);
    }
  }, [filmData]);
  const changeFilm = async () => {
    const response = await editFilm(chosenFilm, rate, comment, isFavorite);
    return response.success;
  };
  const likeFilm = () => {
    if (isFavorite) {
      // removeFromFavorite(chosenFilm?.imdb_id)
      setIsFavorite(false);
    } else {
      // addToFavorite({...chosenFilm,rate:rate,comment:comment,isFavorite:true})
      setIsFavorite(true);
    }
  };
  return (
    <ModalContainer
      open={open}
      setOpen={setOpen}
      position={'flex-end'}
      padding={0}
      type={'fade'}>
      {isAddList && (
        <AddFilmToListModal
          open={isAddList}
          setOpen={setIsAddList}
          film={chosenFilm}
        />
      )}
      <View style={styles.container}>
        <View
          style={{
            ...styles.block,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{...styles.title, flex: 1}} numberOfLines={1}>
            {chosenFilm?.title}
          </Text>
          <Pressable onPress={() => setOpen(false)}>
            <MaterialIcons
              name="close"
              size={30}
              color={themeColors[appTheme].titleColor}
            />
          </Pressable>
        </View>
        <View
          style={{
            ...styles.block,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              likeFilm();
            }}
            style={styles.like}>
            <AntDesign
              name="heart"
              size={normalize(40)}
              color={isFavorite ? MAIN_SUCCESS : MAIN_GREY_FADE}
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              setIsAddList(true);
            }}
            style={styles.like}>
            <MaterialIcons
              name="library-add"
              size={30}
              color={MAIN_GREY_FADE}
            />
          </TouchableOpacity>
        </View>
        <View style={{...styles.block}}>
          <AirbnbRating
            count={5}
            // reviews={["Ужасно!", "Плохо(", "Нормально", "Хорошо", "Потрясающе!"]}
            defaultRating={rate || 0}
            showRating={false}
            onFinishRating={e => setRate(e)}
            size={normalize(40)}
            selectedColor={themeColors[appTheme].selectedRate}
            starContainerStyle={{width: '80%', justifyContent: 'space-around'}}
            // ratingContainerStyle={{backgroundColor:'red',marginTop:0}}
          />
        </View>

        <View style={{...styles.block, borderBottomWidth: 0}}>
          <TextInput
            style={styles.input}
            multiline
            textAlignVertical={'top'}
            placeholder={i18n.t('writeComment')}
            placeholderTextColor={'rgb(210, 210, 210)'}
            value={comment}
            onChangeText={e => setComment(e)}
          />
        </View>
        {isUser && (
          <AwesomeButton
            progress
            onPress={async next => {
              // const load =await changeFilm()
              await updateFilm({film: chosenFilm, rate, comment, isFavorite});
              if (!isUpdating) {
                next();
                setOpen(false);
              }
            }}
            width={Dimensions.get('window').width - normalize(30)}
            backgroundColor={themeColors[appTheme].buttonBg}
            borderRadius={10}
            backgroundDarker={'white'}>
            {i18n.t('save')}
          </AwesomeButton>
        )}
      </View>
    </ModalContainer>
  );
};
const style = theme =>
  StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.backgroundColor,
      padding: normalize(15),
      borderRadius: 10,
    },
    block: {
      width: '100%',
      borderBottomWidth: 1,
      borderColor: 'rgb(210, 210, 210)',
      marginBottom: normalize(20),
      paddingBottom: normalize(20),
    },
    title: {
      color: theme.titleColor,
      fontWeight: '700',
      fontSize: 20,
    },
    input: {
      color: theme.titleColor,
      minHeight: normalize(100),
    },
    button: {
      width: '100%',
      backgroundColor: MAIN_RED,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      padding: normalize(20),
    },
    buttonText: {
      color: 'white',
      fontSize: normalize(18),
    },
  });

export default RateInfoModal;
