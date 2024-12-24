import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useIsFocused, useNavigation} from '@react-navigation/native';

import {useTheme} from '../providers/ThemeProvider';
import {useSelector} from 'react-redux';
import {normalize} from '../responsive/fontSize';
import ListsRow from './UserLists/ListsRow';
import {themeColors} from './Films/themeColors';

const MyHomeLists = () => {
  const {isDarkTheme, screenTheme, i18n, appTheme} = useTheme();

  const navigation = useNavigation();
  const {user} = useSelector(state => state.auth);

  const isFocused = useIsFocused();
  const style = styles(themeColors[appTheme]);

  return (
    <View style={style.carouselContentContainer}>
      <View
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: themeColors[appTheme].backgroundColor,
        }}>
        {/*<LinearGradient colors={themeColors[appTheme].gradientBg.slice(0,4)}*/}
        {/*                style={DefaultStyles.ImageBg}>*/}

        <View style={style.listTitle}>
          <View style={{width: '50%'}}>
            <Text style={style.listTitleText}>{i18n.t('myLists')}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AllListsScreen', {
                title: user?.userName,
                id: user?._id,
              })
            }>
            <Text style={style.viewAll}>{i18n.t('seeAll')}</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: 'center',
            padding: 10,
          }}>
          <ListsRow />
        </View>

        {/*</LinearGradient>*/}
      </View>
    </View>
  );
};
export const styles = theme =>
  StyleSheet.create({
    carouselContentContainer: {
      flex: 1,
      backgroundColor: '#000',
      height: 480,
      paddingHorizontal: 15,
    },
    listTitle: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingBottom: 0,
      width: '100%',
    },
    listTitleText: {
      color: theme.textColor,
      fontSize: 24,
      fontWeight: 'bold',
      marginLeft: 0,
      marginVertical: 10,
      fontFamily: 'Kanit-Black',
    },
    viewAll: {
      color: theme.textColor,
      fontSize: 14,
      fontWeight: 'normal',
    },
    carouselContainerView: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 5,
      paddingBottom: 30,
    },
    loadColor: theme.loadColor,
  });
export default MyHomeLists;
