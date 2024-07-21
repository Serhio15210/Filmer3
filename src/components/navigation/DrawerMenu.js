import React, { useEffect, useState } from "react";
import { ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Drawer, Text, Title } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../../providers/ThemeProvider";
import { generateRandomColor } from "../../styles/randomColors";
import { MAIN_GREY_FADE, MAIN_RED } from "../../constants/colors";
import { normalize } from "../../responsive/fontSize";
import avatarBg from "../../assets/radiantAvatarBg.png";
import avatarBlackBg from "../../assets/radiantAvatarBlackBg.jpg";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import { useSelector } from "react-redux";
import { themeColors } from "../../navigation/themeColors";

export function DrawerContent(props) {
  const {
    setIsDarkTheme,
    isDarkTheme,
    setIsAuth,
    i18n,
    locale,
    setLocale,
    changeLocale,
    setAppTheme,
    appTheme
  } = useTheme();
  const [openTop, setOpenTop] = useState(false)
  const [openListsTop, setOpenListsTop] = useState(false)
  const heightTop = openTop ? "auto" : 0
  const heightListsTop = openListsTop ? "auto" : 0
  const {
    user
  } = useSelector((state) => state.auth);
  const navigation = useNavigation()
  const styles = style(themeColors[appTheme]);

  // const favoriteList=userData.lists.shift()
  // const subscribers = userData.subscribers ? userData.subscribers.length : "0"
  // const subscriptions = userData.subscriptions ? userData.subscriptions.length : "0"


  useEffect(() => {
    // LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    setOpenTop(false)
  }, [])
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: themeColors[appTheme].backgroundColor}}>
      <DrawerContentScrollView {...props}  >
        <View style={styles.drawerContent}>
          <ImageBackground source={appTheme==='light'?avatarBg:avatarBlackBg} style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <View style={styles.avatarBlock}>
                <View style={styles.avatar}>
                  <Text style={{fontSize: 20, color: 'white'}}>{user?.userName[0]?.toUpperCase()}</Text>
                </View>
              </View>
              <Title style={[styles.title, {color: "white"}]}>{user?.userName}</Title>
            </View>

            <View style={{...styles.row, justifyContent: 'space-around'}}>
              <TouchableOpacity>
                <Text style={styles.sub}>{i18n.t('subscriptions')}: {user?.subscriptions?.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.sub}>{i18n.t('subscribers')}: {user?.subscribers?.length}</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>

          <Drawer.Section
            style={[styles.bottomDrawerSection]}>
            <DrawerItem
              icon={({color, size}) => (

                <Icon
                  name="home-outline"
                  color={themeColors[appTheme].drawerTitleColor}
                  size={size}
                />
              )}
              label={i18n.t('main')}
              labelStyle={{color:themeColors[appTheme].drawerTitleColor}}
              onPress={() => {
                props.navigation.navigate('Home')
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon
                  name="account-outline"
                  color={themeColors[appTheme].drawerTitleColor}
                  size={size}
                />
              )}
              label={i18n.t('profile')}
              labelStyle={{color:themeColors[appTheme].drawerTitleColor}}
              onPress={() => navigation.navigate('Profile')}
            />
            {/*<DrawerItem*/}
            {/*  icon={({color, size}) => (*/}
            {/*    <Feather*/}
            {/*      name="settings"*/}
            {/*      color={color}*/}
            {/*      size={size}*/}
            {/*    />*/}
            {/*  )}*/}
            {/*  label="Налаштування"*/}
            {/*  onPress={() => {*/}

            {/*  }}*/}
            {/*/>*/}

          </Drawer.Section>
          <Drawer.Section
            style={[styles.bottomDrawerSection ]}>
            <DrawerItem
              icon={({color, size}) => (
                <Fontisto
                  name="film"
                  color={themeColors[appTheme].drawerTitleColor}
                  size={size}
                />
              )}
              labelStyle={{color:themeColors[appTheme].drawerTitleColor}}
              label={i18n.t('bestFilms')}
              onPress={() => {
                navigation.navigate('BestFilms')
                // navigation.reset({
                //   index: 0,
                //   routes: [{name: "HomeScreen"}, {name: "BestFilms"}]
                // })
              }}
            />

            <DrawerItem
              icon={({color, size}) => (
                <Entypo
                  name="list"
                  color={themeColors[appTheme].drawerTitleColor}
                  size={size}
                />
              )}
              label={i18n.t('myLists')}
              labelStyle={{color:themeColors[appTheme].drawerTitleColor}}
              onPress={() => {
                navigation.navigate("AllListsScreen", {title: user?.userName})
              }}
            />

          </Drawer.Section>
          {/*<Drawer.Section style={{*/}
          {/*  ...styles.themeBlock,*/}
          {/*  backgroundColor: appTheme==='light' ? "#d3d3d3" : "#666"*/}
          {/*}}>*/}

          {/*  <TouchableOpacity onPress={async () => {*/}
          {/*    setAppTheme('light')*/}
          {/*    await AsyncStorage.setItem('theme', `${false}`)*/}

          {/*  }} style={{*/}
          {/*    backgroundColor: appTheme==='dark' ? 'transparent' : 'white',*/}
          {/*    elevation: appTheme==='dark' ? 0 : 5,*/}
          {/*    ...styles.themeButton*/}
          {/*  }}>*/}
          {/*    <Ionicons name={'sunny'} color={appTheme==='dark' ? "white" : "#F6D42A"}/>*/}
          {/*    <Text style={{...styles.themeText, color: appTheme==='dark' ? "white" : "black"}}>{i18n.t('lightTheme')}</Text>*/}
          {/*  </TouchableOpacity>*/}

          {/*  <TouchableOpacity onPress={async () => {*/}
          {/*    setAppTheme('dark')*/}
          {/*    await AsyncStorage.setItem('theme', `${true}`)*/}

          {/*  }} style={{*/}
          {/*    backgroundColor: appTheme==='light' ? 'transparent' : 'black',*/}
          {/*    elevation: appTheme==='light' ? 0 : 5,*/}
          {/*    ...styles.themeButton*/}
          {/*  }}>*/}

          {/*    <Ionicons name={'moon'} color={appTheme==='light' ? "black" : "#F6D42A"}/>*/}
          {/*    <Text style={{...styles.themeText,color:appTheme==='light'?'black':'white'}}>{i18n.t('darkTheme')}</Text>*/}

          {/*  </TouchableOpacity>*/}


          {/*</Drawer.Section>*/}

        </View>

      </DrawerContentScrollView>
      <View style={styles.localeBlock}>
        <TouchableOpacity style={{
          borderColor: locale === 'eng' ? themeColors[appTheme].localeTitleColor : 'transparent',
          ...styles.localeButton
        }} onPress={() => changeLocale('eng')}>
          <Text style={{
            color: locale === 'eng' ? themeColors[appTheme].localeTitleColor : MAIN_GREY_FADE,
            ...styles.localeText
          }}>ENG</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          borderColor: locale === 'ukr' ? themeColors[appTheme].localeTitleColor : 'transparent',
          ...styles.localeButton
        }} onPress={() => changeLocale('ukr')}>
          <Text style={{color: locale === 'ukr' ? themeColors[appTheme].localeTitleColor : MAIN_GREY_FADE, ...styles.localeText}}>УКР</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const style = (theme) => StyleSheet.create({
  drawerContent: {
    flex: 1,
    marginTop: -4

  },
  userInfoSection: {
    backgroundColor: MAIN_RED,
    paddingBottom: normalize(10)
  },
  avatarBlock: {
    backgroundColor: theme.drawerAvatarBlock,
    borderRadius: 50,
    borderTopLeftRadius: 0,
    width: normalize(80),
    height: normalize(80),
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(10),
    marginRight: normalize(10)
  },
  avatar: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: generateRandomColor(),
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: normalize(24),
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  sub: {
    color: 'white'
  },

  drawerSection: {
    marginTop: 15,

  },
  bottomDrawerSection: {
    marginBottom: 15,
    // borderTopWidth: 1
  },
  themeBlock: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: normalize(15),
    marginRight: normalize(15),
    borderRadius: 10,
    padding: 2
  },
  themeButton: {
    padding: normalize(5),
    paddingLeft: normalize(10),
    paddingRight: normalize(10),
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  themeText: {
    marginLeft: normalize(10)
  },
  localeBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: normalize(30),
    left: normalize(15)
  },
  localeText: {
    fontSize: normalize(18),
    fontWeight: '600'
  },
  localeButton: {
    borderBottomWidth: 1,
    marginRight: normalize(15)
  }
});
