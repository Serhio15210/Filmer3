import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {normalize} from '../../responsive/fontSize';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '../../providers/ThemeProvider';
import {
  MAIN_GREY,
  MAIN_GREY_FADE,
  MAIN_RED,
  MAIN_RED_FADE,
  MAIN_YELLOW,
} from '../../constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {themeColors} from '../../navigation/themeColors';
import Toast from 'react-native-toast-message';

const CustomTabBar = props => {
  const {selectedTab, setSelectedTab} = props;
  const {i18n, appTheme} = useTheme();
  const styles = style(themeColors[appTheme]);
  const [showTab, setShowTab] = useState(false);
  const [homeLine, setHomeLine] = useState(new Animated.Value(0));
  const headerBgColor = homeLine.interpolate({
    inputRange: [
      5,
      50,
      Dimensions.get('window').width - 200,
      Dimensions.get('window').width - 20,
    ],
    outputRange: themeColors[appTheme].tabContent,
    extrapolate: 'clamp',
  });
  const handleTabPress = tabName => {
    // props.navigation.navigate(tabName)
    // console.log(selectedTab,tabName)
    setShowTab(false);
    if (tabName === 'Home') {
      selectedTab !== tabName &&
        props.navigation.reset({
          index: 0,
          routes: [{name: tabName}],
        });

      setSelectedTab(tabName);
    } else {
      Toast.show({
        text1: 'Coming Soon!',
      });
    }
  };
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  useEffect(() => {
    showTab
      ? Animated.timing(homeLine, {
          toValue: Dimensions.get('window').width - 60,
          duration: 200,
          useNativeDriver: false,
        }).start()
      : Animated.timing(homeLine, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
  }, [showTab]);
  const colors = {
    white: 'white',
    red: MAIN_RED,
    grey: MAIN_GREY_FADE,
    greyFade: 'rgba(210, 210, 210,0.7)',
    yellow: MAIN_YELLOW,
  };
  return (
    // (!props.state.routes[0]?.state || props.state.routes[0]?.state?.index === 0)
    !isKeyboardVisible && (
      <View style={styles.container}>
        <Pressable style={styles.menu} onPress={() => setShowTab(!showTab)}>
          {!showTab ? (
            selectedTab === 'Home' ? (
              <FontAwesome5 name="film" size={30} color={colors.white} />
            ) : selectedTab === 'Serial' ? (
              <MaterialIcons name="live-tv" size={30} color={colors.white} />
            ) : selectedTab === 'Find' ? (
              <FontAwesome5 name="search" size={30} color={colors.white} />
            ) : selectedTab === 'Users' ? (
              <FontAwesome5
                name="user-friends"
                size={30}
                color={colors.white}
              />
            ) : (
              <MaterialIcons name="menu" size={30} color={colors.white} />
            )
          ) : (
            <FontAwesome name="close" size={35} color={colors.white} />
          )}
        </Pressable>
        <Animated.View
          style={{
            ...styles.content,
            width: homeLine,
            backgroundColor: headerBgColor,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <TouchableOpacity onPress={() => handleTabPress('Home')}>
              <FontAwesome5
                name="film"
                size={30}
                color={selectedTab === 'Home' ? colors.white : colors.greyFade}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginTop: -1}}
              onPress={() => handleTabPress('Serial')}>
              <MaterialIcons
                name="live-tv"
                size={30}
                color={
                  selectedTab === 'Serial' ? colors.white : colors.greyFade
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTabPress('Find')}>
              <FontAwesome5
                name="search"
                size={25}
                color={selectedTab === 'Find' ? colors.white : colors.greyFade}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => handleTabPress('Users')}>
              <FontAwesome5
                name="user-friends"
                size={30}
                color={selectedTab === 'Users' ? colors.white : colors.greyFade}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/*<TouchableOpacity style={{alignItems: 'center'}} onPress={() => handleTabPress('Home')}>*/}
        {/*  <FontAwesome5 name="film" size={normalize(30)}*/}
        {/*                color={!isDarkTheme ? selectedTab === 'Home' ? MAIN_RED : MAIN_GREY : selectedTab === 'Home' ? MAIN_YELLOW : MAIN_GREY}/>*/}
        {/*  <View style={{*/}

        {/*    width: normalize(30),*/}
        {/*    height: normalize(5),*/}
        {/*    marginTop: normalize(3),*/}

        {/*  }}>*/}
        {/*    <Animated.View style={{*/}
        {/*      backgroundColor: selectedTab === 'Home' ? !isDarkTheme ? MAIN_RED : MAIN_YELLOW : "transparent",*/}
        {/*      width: homeLine,*/}
        {/*      height: normalize(5),*/}
        {/*      borderRadius: 10,*/}

        {/*    }}></Animated.View>*/}
        {/*  </View>*/}

        {/*</TouchableOpacity>*/}
        {/*<TouchableOpacity style={{alignItems: 'center', marginTop: -1}} onPress={() => handleTabPress('Serial')}>*/}
        {/*  <MaterialIcons name="live-tv" size={normalize(30)}*/}
        {/*                 color={!isDarkTheme ? selectedTab === 'Serial' ? MAIN_RED : MAIN_GREY : selectedTab === 'Serial' ? MAIN_YELLOW : MAIN_GREY}/>*/}
        {/*  <View style={{*/}

        {/*    width: normalize(30),*/}
        {/*    height: normalize(5),*/}
        {/*    marginTop: normalize(5),*/}

        {/*  }}>*/}
        {/*    <Animated.View style={{*/}
        {/*      backgroundColor: selectedTab === 'Serial' ? !isDarkTheme ? MAIN_RED : MAIN_YELLOW : "transparent",*/}
        {/*      width: homeLine,*/}
        {/*      height: normalize(5),*/}
        {/*      borderRadius: 10*/}
        {/*    }}></Animated.View>*/}
        {/*  </View>*/}
        {/*</TouchableOpacity>*/}
        {/*<TouchableOpacity style={styles.search} onPress={() => handleTabPress("Find")}>*/}
        {/*  <FontAwesome5 name="search" size={normalize(25)} color={"white"}/>*/}

        {/*</TouchableOpacity>*/}
        {/*<TouchableOpacity style={{alignItems: 'center'}} onPress={() => handleTabPress("Users")}>*/}
        {/*  <FontAwesome5 name="user-friends" size={normalize(30)}*/}
        {/*                color={!isDarkTheme ? selectedTab === 'Users' ? "#DC143C" : "#748c94" : selectedTab === 'Users' ? "#DAA520" : "#748c94"}/>*/}
        {/*  <View style={{*/}

        {/*    width: normalize(30),*/}
        {/*    height: normalize(5),*/}
        {/*    marginTop: normalize(5),*/}

        {/*  }}>*/}
        {/*    <Animated.View style={{*/}
        {/*      backgroundColor: selectedTab === 'Users' ? !isDarkTheme ? MAIN_RED : MAIN_YELLOW : "transparent",*/}
        {/*      width: homeLine,*/}
        {/*      height: normalize(5),*/}
        {/*      borderRadius: 10,*/}
        {/*    }}></Animated.View>*/}
        {/*  </View>*/}
        {/*</TouchableOpacity>*/}
        {/*<TouchableOpacity style={{alignItems: 'center'}} onPress={() => handleTabPress("Profile")}>*/}
        {/*  <FontAwesome5 name="user" size={normalize(30)}*/}
        {/*                color={!isDarkTheme ? selectedTab === 'Profile' ? "#DC143C" : "#748c94" : selectedTab === 'Profile' ? "#DAA520" : "#748c94"}/>*/}
        {/*  <View style={{*/}

        {/*    width: normalize(30),*/}
        {/*    height: normalize(5),*/}
        {/*    marginTop: normalize(5),*/}

        {/*  }}>*/}
        {/*    <Animated.View style={{*/}
        {/*      backgroundColor: selectedTab === 'Profile' ? !isDarkTheme ? MAIN_RED : MAIN_YELLOW : "transparent",*/}
        {/*      width: homeLine,*/}
        {/*      height: normalize(5),*/}
        {/*      borderRadius: 10,*/}

        {/*    }}></Animated.View>*/}
        {/*  </View>*/}
        {/*</TouchableOpacity>*/}
      </View>
    )
  );
};
const style = theme =>
  StyleSheet.create({
    container: {
      width: '95%',
      height: 65,
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      zIndex: 0,

      bottom: 20,

      justifyContent: 'flex-end',
    },
    content: {
      backgroundColor: theme.tabBackground,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',

      paddingHorizontal: 20,
      paddingRight: 70,
      borderRadius: 100,
      position: 'absolute',
      right: 10,
      height: 65,
    },
    menu: {
      alignItems: 'center',
      backgroundColor: theme.tabBackground,
      width: 65,
      height: 65,
      justifyContent: 'center',
      borderRadius: 100,
      zIndex: 10,
    },
  });
export default CustomTabBar;
