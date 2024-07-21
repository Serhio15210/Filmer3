import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { MAIN_GREY, MAIN_RED } from "../../constants/colors";
import { normalize } from "../../responsive/fontSize";
import { MAIN_YELLOW } from "../../constants";

const RatingStats = ({ data }) => {
  const stats = [data?.film1, data?.film2, data?.film3, data?.film4, data?.film5];
  const [selectColumn, setSelectColumn] = useState("");
  return (
    <View style={styles.container}>
      <AntDesign name={"star"} color={MAIN_YELLOW} style={{ marginRight: normalize(5) }} />

      {/*<View style={{backgroundColor:MAIN_GREY,flex:1,marginRight:normalize(5),height:data?.film0>0?`${(data?.film0*100)/data?.all}%`:0.5}}/>*/}
      {stats.map((item, index) => {
        return <TouchableOpacity key={index} style={{
          backgroundColor: MAIN_GREY,
          flex: 1,
          height: item > 0 ? `${Math.round((item * 100) / data?.total)}%` : 0.5,
        }} activeOpacity={0.7} onPressIn={() => setSelectColumn(`${Math.round((item * 100) / data?.total)}%`)}
                                 onPressOut={() => setSelectColumn("")} />;
      })}


      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "white" }}>{selectColumn}</Text>
        <View style={styles.stars}>
          <AntDesign name={"star"} color={MAIN_YELLOW} />
          <AntDesign name={"star"} color={MAIN_YELLOW} />
          <AntDesign name={"star"} color={MAIN_YELLOW} />
          <AntDesign name={"star"} color={MAIN_YELLOW} />
          <AntDesign name={"star"} color={MAIN_YELLOW} />
        </View>
      </View>

      {/*<Text style={{color:'black'}}>{data?.film}</Text>*/}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: normalize(100),
    marginTop: normalize(20),
    gap: normalize(5),
  },
  stars:{
    flexDirection: "row", marginLeft: normalize(5)
  }
});
export default RatingStats;
