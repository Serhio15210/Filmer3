import React from 'react';
import {Dropdown} from "react-native-element-dropdown";
import {Text, View,StyleSheet} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import {MAIN_RED, MAIN_SUCCESS} from "../../constants/colors";
import {normalize} from "../../responsive/fontSize";
import {useTheme} from "../../providers/ThemeProvider";

const SortDropdown = ({value,setValue,filters}) => {
  const {i18n}=useTheme()
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <Entypo
            style={styles.icon}
            color={MAIN_RED}
            name="check"
            size={20}
          />
        )}
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
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={i18n.t('sortBy')}
              searchPlaceholder={i18n.t('searchPlh')}
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
              // renderLeftIcon={(item) => {
              //   return (
              //     item?.icon?<AntDesign style={styles.icon} color="black" name="Safety" size={20}/>:<></>
              //   )
              //
              // }}
              renderItem={renderItem}/>
  );
};
const styles = StyleSheet.create({
  dropdown: {
    flex:1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: normalize(15),
    paddingVertical:normalize(25),
    shadowColor: '#000',
    elevation: 5,
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
    color:'black'
  },
  selectedTextStyle: {
    fontSize: 16,
    color:'black'
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
export default SortDropdown;
