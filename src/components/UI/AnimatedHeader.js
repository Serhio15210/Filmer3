import React from 'react';
import {normalize} from "../../responsive/fontSize";
import {Animated, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {useNavigation} from "@react-navigation/native";
import {useTheme} from "../../providers/ThemeProvider";

const AnimatedHeader = ({scrollY,title,headerBgColor,arrowColor,headerOpacity}) => {
  const navigation=useNavigation()
  const {appTheme}=useTheme()
  // const headerBgColor = scrollY.interpolate({
  //   inputRange: [0, normalize(100), normalize(200)],
  //   outputRange: ['transparent', 'rgba(255, 255, 255, 0.4)','rgba(255, 255, 255, 1)'],
  //   extrapolate: 'clamp',
  // });
  // const arrowColor = scrollY.interpolate({
  //   inputRange: [0, normalize(100), normalize(200)],
  //   outputRange: ['rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 1)'],
  //   extrapolate: 'clamp',
  // });
  // const headerOpacity = scrollY.interpolate({
  //   inputRange: [0,normalize(100), normalize(200)],
  //   outputRange: [0,0.5, 1],
  //   extrapolate: 'clamp',
  // });
  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: normalize(70),
      zIndex: 1000,
      flexDirection:'row',
      alignItems:'center'

    }}>
      <Animated.View style={{
        backgroundColor: headerBgColor,
        opacity: headerOpacity,
        height: '100%',
        width:'100%',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        paddingRight:normalize(15),
        paddingLeft:normalize(60),
        justifyContent:'center'
      }}>
        <Text style={{...styles.headerText,color:appTheme==='light'?'black':'white'}}>{title}</Text>
      </Animated.View>
      <TouchableOpacity style={{marginHorizontal:normalize(15),position:'absolute'}} onPress={()=>navigation.goBack()}>
        <Animated.Text style={{color:arrowColor}}><AntDesign name={'arrowleft'}   size={24}  /></Animated.Text>
      </TouchableOpacity>

    </View>
  );
};
const styles = StyleSheet.create({
  headerText:{
    color:'black',
    fontSize:normalize(18),
    fontWeight:'600'
  }
})
export default AnimatedHeader;
