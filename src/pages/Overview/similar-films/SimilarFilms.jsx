import React from 'react';
import {useTheme} from "../../../providers/ThemeProvider";
import {FlatList, StyleSheet, Text, View} from "react-native";
import RenderSimilarItem from "./RenderSimilarItem";
import {normalize} from "../../../responsive/fontSize";
import {themeColors} from "../themeColors";


const SimilarFilms = ({similarFilms, navigation,isSerial}) => {
  const {i18n,appTheme} = useTheme();
  const styles = style(themeColors[appTheme])
  return (
    <View style={{paddingTop: normalize(20)}}>


      <Text style={styles.title}>{isSerial?i18n.t('similarSerials'):i18n.t('similarFilms')}:</Text>
      <FlatList

        horizontal={true}
        initialNumToRender={2}
        data={similarFilms}
        keyExtractor={(item, index) => `key-${index}`}
        removeClippedSubviews={true}
        maxToRenderPerBatch={1}
        snapToInterval={normalize(200)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap:15}}
        renderItem={({item}) => {
          return (
            <RenderSimilarItem item={item} navigation={navigation} isSerial={isSerial}/>
          );
        }}
      />
    </View>
  );
};
const style = (theme)=> StyleSheet.create({
  title:{
    color: theme.titleColor,
    fontSize: normalize(18),
    textTransform: 'uppercase',
    fontWeight: '500',
    marginBottom:normalize(20)

  }
})
export default SimilarFilms;
