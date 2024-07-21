import React from 'react';
import {normalize} from "../../responsive/fontSize";
import {TextInput, View} from "react-native";
import {MAIN_GREY_FADE} from "../../constants/colors";
import Feather from "react-native-vector-icons/Feather";
import {useTheme} from "../../providers/ThemeProvider";

const Input = ({query,setQuery}) => {
  const {i18n}=useTheme()
  return (
    <View style={{
      backgroundColor: 'white',
      flex:1,
      maxHeight: normalize(50),
      elevation: 5,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: normalize(10)
    }}>
      <TextInput style={{width: '100%',color:'black'}} value={query} onChangeText={setQuery} placeholder={i18n.t('searchPlh')}
                 placeholderTextColor={MAIN_GREY_FADE}/>
      <Feather name={'search'} color={'black'} size={20} style={{position: 'absolute', right: normalize(10)}}/>
    </View>
  );
};

export default Input;
