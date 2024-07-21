import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useGetFilmReviewsQuery } from "../../services/FilmService";
import { useTheme } from "../../providers/ThemeProvider";
import { normalize } from "../../responsive/fontSize";
import Review from "./Review";
import React, { useState } from "react";
import { BLACK, MAIN_GREY_SKELETON } from "../../constants/colors";
import { useSelector } from "react-redux";

const FilmReviews = ({route}) => {
  const {locale} = useTheme();
  const {id} = route.params;
  const {
    user
  } = useSelector((state) => state.auth);
  const { data:reviewsData, isLoading:isReviewsLoading } = useGetFilmReviewsQuery(id,locale);
  const headers={ALL:'all',FRIENDS:'friends',YOU:'you'}
  const [selectHeader,setSelectHeader]=useState(headers.ALL)
  const selfArray=reviewsData?.reviewsAll.filter(item=>item.user._id===user._id)
  const array={
    'all':reviewsData?.reviewsAll,
    'friends':reviewsData?.reviewsSub,
    'you':selfArray
  }
  const headerColors={
    true:[styles.headerButton,styles.headerButton__active],
    false:[styles.headerButton]
  }
 return (
  <SafeAreaView style={styles.container}>
      <View style={styles.row}>
            <TouchableOpacity activeOpacity={0.7} style={headerColors[selectHeader===headers.ALL]} onPress={()=>setSelectHeader(headers.ALL)}>
              <Text style={[styles.headerButton__text,selectHeader===headers.ALL?styles.headerButton__active__text:{}]}>All</Text>
            </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={headerColors[selectHeader===headers.FRIENDS]} onPress={()=>setSelectHeader(headers.FRIENDS)}>
          <Text style={[styles.headerButton__text,selectHeader===headers.FRIENDS?styles.headerButton__active__text:{}]}>FRIENDS</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={headerColors[selectHeader===headers.YOU]} onPress={()=>setSelectHeader(headers.YOU)}>
          <Text style={[styles.headerButton__text,selectHeader===headers.YOU?styles.headerButton__active__text:{}]}>YOU</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex:1,padding:normalize(15)}}>
      {array[selectHeader]?.length>0?array[selectHeader]?.map((item,index)=>{
        return (
          <Review item={item} key={index}/>
        )
      }): <View style={styles.noReviewsContainer}>
        <Text style={styles.headerButton__text}>No reviews</Text>
      </View>}
      </View>


  </SafeAreaView>
 );
};
const styles = StyleSheet.create({
  container:{

    flex:1,
    backgroundColor:BLACK,
    paddingTop:normalize(15)
  },
  noReviewsContainer:{
    flex:1,alignItems:'center',justifyContent:'center'
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    gap:2
  },
  headerButton:{
    flex:1,
    borderBottomWidth:1,
    borderColor:MAIN_GREY_SKELETON,
    alignItems:'center',
    justifyContent:'center'
  },
  headerButton__active:{
    borderColor:'white',
  },
  headerButton__text:{
    color:MAIN_GREY_SKELETON,
    fontSize:normalize(16)
  },
  headerButton__active__text:{
    color:'white',
  }
})
export default FilmReviews;
