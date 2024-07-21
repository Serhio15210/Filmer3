import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import {MAIN_GREY, MAIN_GREY_FADE, MAIN_RED} from "../../constants/colors";
import {Dropdown} from "react-native-element-dropdown";
import {normalize} from "../../responsive/fontSize";
import AntDesign from "react-native-vector-icons/AntDesign";
import {useTheme} from "../../providers/ThemeProvider";

const SortRateDropdown = ({value,setValue,filters}) => {
  const {i18n}=useTheme()
  const renderItem = item => {
    return (
      <View style={styles.item}>
        {item.value===1?
          <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>:
          item.value===2?
            <View style={styles.row}>
              <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
              <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
            </View>:
            item.value===3?
              <View style={styles.row}>
                <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
              </View>:
              item.value===4?
                <View style={styles.row}>
                  <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                  <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                  <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                  <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                </View>:item.value===5?
                  <View style={styles.row}>
                    <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                    <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                    <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                    <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                    <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                  </View>:<View style={styles.row}>
                    <AntDesign name={'staro'} color={MAIN_GREY} style={styles.star}/>
                    <Text style={{fontSize:normalize(16),color:MAIN_GREY}}>{i18n.t('all')}</Text>
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
              containerStyle={{borderRadius:10}}

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
          value===1?
              <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>:
              value===2?
                <View style={styles.row}>
                  <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                  <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                </View>:
                value===3?
                  <View style={styles.row}>
                    <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                    <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                    <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                  </View>:
                  value===4?
                    <View style={styles.row}>
                      <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                      <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                      <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                      <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                    </View>: value===5?
                    <View style={styles.row}>
                      <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                      <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                      <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                      <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                      <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
                    </View>:<Text style={{fontSize:normalize(16),color:MAIN_GREY_FADE}}>Rate</Text>

        )

      }}
              renderItem={renderItem}/>
  );
};
const renderStar=({count})=>{
  return (
    <View style={styles.row}>
      {count.map(()=>{
        return <AntDesign name={'star'} color={MAIN_RED} style={styles.star}/>
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
    backgroundColor: 'white',
    padding: normalize(15),
    shadowColor: '#000',
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
    color:'black'
  },
  placeholderStyle: {
    fontSize: 16,
    color:'black',
    display:'none'
  },
  selectedTextStyle: {
    fontSize: 16,
    color:'black',
    display:'none'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 10,
    fontSize: 16,
    color:'black'
  },
});

export default SortRateDropdown;
