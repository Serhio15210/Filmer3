import React from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";

import {ADD_LIST_IMG, FAVORITE_LIST_IMG, IMG_URI} from "../api/apiKey";
import logo from "../assets/logo.png"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {MAIN_GREY_FADE} from "../constants";
import {normalize} from "../responsive/fontSize";

const ListPoster = ({list, height = 200, width = 200, favorite}) => {

  return (
    list?.length >= 4
      ?
      <View style={{height: height, width: width, flexDirection: 'row', flexWrap: 'wrap'}}>
        {list?.map((film, index) => (
          index < 4 &&
          <Image key={index} source={{uri: IMG_URI + film.poster}}
                 style={{height: height / 2, width: width / 2, borderRadius: 5}}/>

        ))}</View> :

      (list?.length < 4 && list?.length !== 0) ?

        <Image source={{uri: IMG_URI + list[0].poster}} style={{height: height, width: width, borderRadius: 5}}
               resizeMode="contain"/>
        :
        <TouchableOpacity style={{
          backgroundColor:'white',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
          padding: normalize(10),
          elevation:15
        }}>
          <MaterialIcons name={'playlist-add'} size={100} color={'black'}/>
        </TouchableOpacity>


  );
};

export default ListPoster;
