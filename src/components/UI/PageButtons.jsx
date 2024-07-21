import React from 'react';
import {normalize} from "../../responsive/fontSize";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {MAIN_RED} from "../../constants/colors";

const PageButtons = ({page, setPage,extend=false,totalPages=1}) => {
  return (
    <View style={{...styles.buttonRow,paddingLeft:normalize(10),paddingRight:normalize(10)}}>
      {extend&&
        <TouchableOpacity style={{...styles.pageButton,opacity:page ===1?0.6:1}} onPress={()=>{
          page>1&&setPage(1)}
        }>
          <AntDesign name={'doubleleft'} size={25} color={'black'}/>
        </TouchableOpacity>}
      <TouchableOpacity style={{...styles.pageButton,opacity:page ===1?0.6:1}} onPress={()=>{
        page>1&&setPage(page-1)}
      }>
        <AntDesign name={'arrowleft'} size={25} color={'black'}/>
      </TouchableOpacity>
      <TouchableOpacity style={{...styles.pageButton,opacity:page ===totalPages?0.6:1}} onPress={()=>{
        setPage(page+1)}
      }>
        <AntDesign name={'arrowright'} size={25} color={'black'}/>
      </TouchableOpacity>
      {extend&&
        <TouchableOpacity style={{...styles.pageButton,opacity:page ===totalPages?0.6:1}} onPress={()=>{
          page<totalPages&&setPage(totalPages)}
        }>
          <AntDesign name={'doubleright'} size={25} color={'black'}/>
        </TouchableOpacity>}
    </View>
  );
};
const styles = StyleSheet.create({

  buttonRow:{
    width: '100%',flexDirection:'row', alignItems: 'center', justifyContent: 'space-between'
  },
  pageButton:{
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    width: normalize(80),
    height: normalize(40),
    alignItems: 'center',
    justifyContent: 'center'
  },


})
export default PageButtons;
