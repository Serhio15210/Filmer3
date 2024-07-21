import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {IMG_URI} from "../../api/apiKey";
import {normalize} from "../../responsive/fontSize";
import {MAIN_GREY, MAIN_GREY_FADE} from "../../constants/colors";
import {useTheme} from "../../providers/ThemeProvider";
import {themeColors} from "./themeColors";

const Genres = ({data}) => {
  const {i18n,appTheme} = useTheme();
  const styles = style(themeColors[appTheme])
  return (
    <View >

      <View style={styles.detailBlock}>

        <Text style={styles.detailTitle}>{i18n.t('genres')}</Text>
        {data?.map((item,index)=>{
          return <View style={styles.company} key={index}>

            <Text style={styles.companyName}>{item.name}</Text>
          </View>
        })}
      </View>

    </View>
  );
};
const style = (theme)=> StyleSheet.create({
  detailBlock:{
    borderBottomWidth:1,
    borderColor:MAIN_GREY_FADE,
    paddingVertical:normalize(15)
  },
  detailTitle:{
    color:MAIN_GREY_FADE,
    fontSize:normalize(16),
    textTransform:'uppercase',
    marginBottom:normalize(10)
  },
  companyName:{
    color:theme.textColor,
    fontSize:normalize(18),
    textTransform:"uppercase"
  },
  company:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:normalize(5)
  }
})
export default Genres;
