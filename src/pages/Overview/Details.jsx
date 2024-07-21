import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {MAIN_GREY, MAIN_GREY_FADE} from "../../constants/colors";
import {normalize} from "../../responsive/fontSize";
import {IMG_URI} from "../../api/apiKey";
import {useTheme} from "../../providers/ThemeProvider";
import {themeColors} from "./themeColors";

const Details = ({data}) => {
  const {i18n,appTheme} = useTheme();
  const styles = style(themeColors[appTheme])
  return (
    <View >
      {data?.budget>0&&<View style={styles.detailBlock}>
        <Text style={styles.detailTitle}>{i18n.t('budget')}</Text>
        <Text style={{...styles.companyName}}>{data.budget} $</Text>
      </View>}
      {data?.production_companies?.length>0&&<View style={styles.detailBlock}>

        <Text style={styles.detailTitle}>{i18n.t('studios')}</Text>
        {data?.production_companies?.map((item,index)=>{
          return <View style={styles.company} key={index}>
            {item?.logo_path&&<Image source={{uri:IMG_URI+item?.logo_path}} style={styles.logo} resizeMode={'contain'}/>}
            <Text style={styles.companyName}>{item.name}</Text>
          </View>
        })}
      </View>}
      {data?.production_countries?.length>0&&<View style={styles.detailBlock}>
        <Text style={styles.detailTitle}>{i18n.t('countries')}</Text>
        {data?.production_countries?.map((item,index)=>{
          return <Text key={index} style={{...styles.companyName,marginTop:normalize(10)}}>{item.name}</Text>

        })}
      </View>}
      {data?.original_language&&<View style={styles.detailBlock}>
        <Text style={styles.detailTitle}>{i18n.t('originalLanguage')}</Text>
        <Text style={{...styles.companyName,textTransform:'uppercase'}}>{data?.original_language}</Text>
      </View>}
      {data?.spoken_languages?.length>0&&<View style={styles.detailBlock}>
        <Text style={styles.detailTitle}>{i18n.t('speakLanguage')}</Text>
        {data?.spoken_languages?.map((item,index)=>{
          return <Text key={index} style={{...styles.companyName,marginTop:normalize(10)}}>{item.name}</Text>

        })}
      </View>}
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
    fontSize:normalize(18)
  },
  company:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:normalize(5)
  },
  logo:{
    width:normalize(50),height:normalize(50),
    marginRight:normalize(10)
  }
})
export default Details;
