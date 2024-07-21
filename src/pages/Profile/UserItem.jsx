import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {normalize} from "../../responsive/fontSize";
import {MAIN_GREY_FADE, MAIN_RED} from "../../constants/colors";
import {generateRandomColor} from "../../styles/randomColors";

const UserItem = ({item, onPress}) => {

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.userItem} onPress={onPress}>
      <View style={styles.row}>
        {/*<Image source={{uri:NONAME_IMG}} style={{width:normalize(50),height:normalize(50),borderRadius:normalize(50)}}/>*/}
        <View style={styles.avatarBlock}><Text style={{
          ...styles.title,
          color: 'white',
          fontSize: normalize(24)
        }}>{item?.userName[0]?.toUpperCase()}</Text></View>
        <Text style={styles.title}>{item?.userName}</Text>

      </View>

    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({

  title: {
    fontSize: normalize(18),
    color: 'black',
    fontWeight: '500',

  },


  userItem: {
    marginRight: normalize(30),
    width: '100%',
    borderBottomWidth: 1,
    paddingBottom: normalize(10),
    borderColor: MAIN_GREY_FADE,

    marginBottom: normalize(20)
  },
  avatarBlock:{
    backgroundColor: generateRandomColor(),
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:normalize(10)
  },
  row: {
    flexDirection: 'row', alignItems: 'center', width: '100%'
  }

})

export default UserItem;
