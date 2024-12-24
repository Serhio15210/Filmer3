import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {normalize} from '../../responsive/fontSize';
import {
  FAVORITE_LIST_IMG,
  IMG_URI,
  NONAME_IMG,
  UNKNOWN_IMG,
} from '../../api/apiKey';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BLACK, MAIN_SUCCESS} from '../../constants/colors';
import unknown from '../../styles/unknown.png';
import {useTheme} from '../../providers/ThemeProvider';
import {themeColors} from './themeColors';
import LinearGradient from 'react-native-linear-gradient';
import {MAIN_GREY, MAIN_YELLOW} from '../../constants/colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ListPreview = ({data, isFavorite = false, onPress}) => {
  const films = isFavorite ? data : data?.films;
  const {i18n, appTheme} = useTheme();
  const style = styles(themeColors[appTheme]);
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      {films?.length >= 3 ? (
        <View style={style.filmsRow}>
          <Image
            source={{uri: IMG_URI + films[0]?.poster}}
            style={style.poster1}
          />
          <Image
            source={{uri: IMG_URI + films[1]?.poster}}
            style={style.poster2}
          />
          <Image
            source={{uri: IMG_URI + films[2]?.poster}}
            style={style.poster3}
          />
        </View>
      ) : films?.length === 0 ? (
        <LinearGradient
          colors={[MAIN_GREY, MAIN_YELLOW]}
          style={[style.filmsRow, {justifyContent: 'center'}]}>
          <FontAwesome5 name={'film'} size={80} color={BLACK} />
        </LinearGradient>
      ) : (
        <Image
          source={{
            uri: isFavorite ? FAVORITE_LIST_IMG : IMG_URI + films[0]?.poster,
          }}
          style={{
            width: 180,
            height: 200,
            borderRadius: 10,
          }}
        />
      )}
      {isFavorite ? (
        <Text style={style.title}>{i18n.t('favorite')} </Text>
      ) : (
        <Text style={style.title}>{data?.name}</Text>
      )}
    </TouchableOpacity>
  );
};
export const styles = theme =>
  StyleSheet.create({
    title: {
      fontSize: 18,
      color: theme.titleColor,
      fontWeight: '500',
      marginBottom: 5,
    },
    filmsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 170,
      height: 200,
      borderRadius: 10,
    },
    poster1: {
      width: 130,
      height: 180,
      position: 'absolute',
      left: 0,
      bottom: 0,
      zIndex: 3,
      borderRadius: 10,
    },
    poster2: {
      width: 130,
      height: 180,
      position: 'absolute',
      left: 20,
      zIndex: 2,
      borderRadius: 10,
    },
    poster3: {
      width: 130,
      height: 180,
      position: 'absolute',
      left: 40,
      top: 0,
      zIndex: 1,
      borderRadius: 10,
    },
  });
export default ListPreview;
