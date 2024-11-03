import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { BLACK, MAIN_GREY, MAIN_GREY_FADE, MAIN_RED, MAIN_YELLOW, WHITE } from "../../constants/colors";
import {Dropdown} from "react-native-element-dropdown";
import {normalize} from "../../responsive/fontSize";
import AntDesign from "react-native-vector-icons/AntDesign";
import {useTheme} from "../../providers/ThemeProvider";

const SortRateDropdown = ({value,setValue,filters}) => {
  const {i18n}=useTheme()
  const renderItem = item => {
    return (
      <View style={styles.item}>
        {item.value>0?renderStar(item.value):
          <View style={styles.row}>
            <AntDesign name={'staro'} color={MAIN_GREY_FADE} style={styles.star}/>
            <Text style={{fontSize:normalize(16),color:MAIN_GREY_FADE}}>{i18n.t('all')}</Text>
          </View>
        }


      </View>
    );
  };
  return (
    <Dropdown style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              containerStyle={{borderRadius:10,backgroundColor:BLACK}}

              data={filters}
              search={false}
              maxHeight={normalize(300)}
              labelField="label"
              // valueField="value"
              // placeholder="Select item"
              // searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
      renderLeftIcon={(item) => {
        return (
          value>0?renderStar(value) :<Text style={{fontSize:normalize(16),color:MAIN_GREY_FADE}}>Rate</Text>

        )

      }}
              renderItem={renderItem}/>
  );
};
const renderStar=(count)=>{
  const array=Array(count).fill(count)
  return (
    <View style={styles.row}>
      {array.map((_,index)=>{
        return <AntDesign key={index} name={'star'} color={MAIN_YELLOW} style={styles.star}/>
      })}
    </View>
  )
}
const styles = StyleSheet.create({
  star:{
    marginRight:normalize(10)
  },
  row:{
    flexDirection:'row',alignItems:'center'
  },
  dropdown: {
    flex:1,
    height: normalize(45),
    backgroundColor: BLACK,
    padding: normalize(15),
    shadowColor: MAIN_YELLOW,
    borderBottomWidth:1,
    borderColor:MAIN_GREY_FADE
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: normalize(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius:10
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color:WHITE
  },
  placeholderStyle: {
    fontSize: 16,
    color:'black',
    display:'none'
  },
  selectedTextStyle: {
    fontSize: 16,
    color:WHITE,
    display:'none'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 10,
    fontSize: 16,
    color:WHITE
  },
});

export default SortRateDropdown;
