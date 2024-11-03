import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { MAIN_GREY, MAIN_GREY_FADE, MAIN_GREY_SKELETON, MAIN_RED, MAIN_SUCCESS } from "../../constants/colors";
import {normalize} from "../../responsive/fontSize";
import {generateRandomColor} from "../../styles/randomColors";
import AntDesign from "react-native-vector-icons/AntDesign";
import {useNavigation} from "@react-navigation/native";
import { MAIN_YELLOW } from "../../constants";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

const Review = ({item,key}) => {
  const navigation=useNavigation()
  const {
    user
  } = useSelector((state) => state.auth);
  return (
    <View style={styles.container} key={key}>
      <TouchableOpacity  onPress={()=>{
        if (item?.user._id===user._id) {
          navigation.navigate('Profile')
        }else {
          Toast.show({
            text1: "Coming Soon!"
          });
          // navigation.navigate('UserOverview', { title: item?.user?.userName, id: item?.user?._id })
        }
      }}>
      <Text style={[styles.avatarBlock ]}>{item?.user?.userName[0]}</Text>
      </TouchableOpacity>
      <View style={styles.review}>
        <View style={styles.reviewHeader}>
          <Text style={styles.userName}>{item?.user?.userName} {item?.user._id===user._id?'(You)':''}</Text>
          <Rating rate={item?.rate} />
        </View>
        {item?.comment&&<Text style={styles.comment}>{item?.comment}</Text>}
      </View>
    </View>
  );
};
const Rating=({rate=0,isFavorite=false})=>{
  const array=Array.from({length:rate},()=>1)
  return (
    <View style={{flexDirection:'row',alignItems:'center'}}>
      {array?.map((item,index)=>{
        return <AntDesign name={'star'} color={MAIN_YELLOW} style={{marginRight:normalize(10)}}/>
      })}
      {/*{isFavorite&&<AntDesign name={'heart'} color={MAIN_SUCCESS}/>}*/}
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    // flex:1,
    marginVertical:normalize(15)
  },
  avatarBlock:{
    width: normalize(40),
    height: normalize(40),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center',
    color:'white',
    padding:normalize(10),
    backgroundColor:generateRandomColor(),
    marginRight:normalize(20)
  },
  avatarSymbol:{
    color:'white',fontSize:normalize(18), textAlign:'center',alignSelf:'center',
    alignItems:'center',justifyContent:'center',
  },
  review:{
    borderBottomWidth: 1,
    borderColor: MAIN_GREY_SKELETON,
    paddingBottom:normalize(15),flex:1
  },
  reviewHeader:{
    flexDirection:'row',alignItems:'center',justifyContent:'space-between'
  },
  userName:{
    color:MAIN_GREY_SKELETON,fontSize:normalize(20),fontWeight:'600'
  },
  comment:{
    color:'white',fontSize:normalize(16),fontWeight:'500'
  }
})
export default Review;
