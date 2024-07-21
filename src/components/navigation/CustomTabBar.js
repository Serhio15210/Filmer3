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
  View
} from "react-native";
import {normalize} from "../../responsive/fontSize";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useTheme} from "../../providers/ThemeProvider";
import {MAIN_GREY, MAIN_GREY_FADE, MAIN_RED, MAIN_RED_FADE, MAIN_YELLOW} from "../../constants/colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {themeColors} from "../../navigation/themeColors";


const CustomTabBar = (props) => {
  const {selectedTab, setSelectedTab} = props;
  const {i18n,appTheme}=useTheme()
  const styles = style(themeColors[appTheme]);
  const [showTab, setShowTab] = useState(false);
  const [homeLine, setHomeLine] = useState(new Animated.Value(0))
  const headerBgColor = homeLine.interpolate({
    inputRange: [normalize(5), normalize(50), Dimensions.get('window').width - normalize(200), Dimensions.get('window').width - normalize(20)],
    outputRange: themeColors[appTheme].tabContent,
    extrapolate: 'clamp',
  });
  const handleTabPress = (tabName) => {
    // props.navigation.navigate(tabName)
    // console.log(selectedTab,tabName)
    setShowTab(false)
    selectedTab !== tabName && props.navigation.reset({
      index: 0,
      routes: [{name: tabName}],
    });

    setSelectedTab(tabName);

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
    showTab ? Animated.timing(homeLine, {
        toValue: Dimensions.get('window').width - normalize(30),
        duration: 200,
        useNativeDriver: false
      }).start() :
      Animated.timing(homeLine, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }).start()
  }, [showTab])
  const colors={
    white:'white',
    red:MAIN_RED,
    grey:MAIN_GREY_FADE,
    greyFade:'rgba(210, 210, 210,0.7)',
    yellow:MAIN_YELLOW
  }
  return (
    // (!props.state.routes[0]?.state || props.state.routes[0]?.state?.index === 0)
    !isKeyboardVisible && <View style={styles.container}>
      <TouchableOpacity activeOpacity={showTab ? 1 : 0.6} style={styles.menu} onPress={() => setShowTab(!showTab)}>
        {!showTab?selectedTab === 'Home'?<FontAwesome5 name="film" size={normalize(30)} color={colors.white}/>:
          selectedTab === 'Serial'?<MaterialIcons name="live-tv" size={normalize(30)} color={colors.white}/>:
            selectedTab ==='Find'?<FontAwesome5 name="search" size={normalize(30)} color={colors.white}/>:
              selectedTab === 'Users'?<FontAwesome5 name="user-friends" size={normalize(30)} color={colors.white}/>:
                <MaterialIcons name="menu" size={normalize(30)} color={colors.white}/>:
          <FontAwesome name="close" size={normalize(35)} color={colors.white}/>}

      </TouchableOpacity>
      <Animated.View style={{...styles.content, width: homeLine, backgroundColor: headerBgColor}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
          <TouchableOpacity onPress={() => handleTabPress('Home')}>
            <FontAwesome5 name="film" size={normalize(30)}
                          color={ selectedTab === 'Home' ? colors.white : colors.greyFade }/>

          </TouchableOpacity>
          <TouchableOpacity style={{marginTop: -1}} onPress={() => handleTabPress('Serial')}>
            <MaterialIcons name="live-tv" size={normalize(30)}
                           color={selectedTab === 'Serial' ? colors.white : colors.greyFade}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabPress("Find")}>
            <FontAwesome5 name="search" size={normalize(25)}
                          color={selectedTab === 'Find' ? colors.white : colors.greyFade}/>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}} onPress={() => handleTabPress("Users")}>
            <FontAwesome5 name="user-friends" size={normalize(30)}
                          color={selectedTab === 'Users' ? colors.white : colors.greyFade}/>
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
  );
};
const style = (theme)=> StyleSheet.create({
  container: {
    width: '95%',
    height: normalize(65),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 0,

    bottom: normalize(20),

    justifyContent: 'flex-end'
  },
  content: {
    backgroundColor: theme.tabBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: normalize(20),
    paddingRight: normalize(70),
    borderRadius: 100,
    position: 'absolute',
    right: normalize(10),
    height: normalize(65),

  },
  menu: {
    alignItems: 'center',
    backgroundColor: theme.tabBackground,
    width: normalize(65),
    height: normalize(65),
    justifyContent: 'center',
    borderRadius: 100,
    zIndex: 10
  }

})
export default CustomTabBar;
