import {StyleSheet} from "react-native";
import {normalize} from "../../../responsive/fontSize";
import { MAIN_GREY, MAIN_GREY_FADE, MAIN_GREY_SKELETON, MAIN_RED } from "../../../constants/colors";
import {generateRandomColor} from "../../../styles/randomColors";
import { MAIN_YELLOW } from "../../../constants";

export const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: 'black'
  },
  container: {
    flex: 1,

  },
  userName: {
    color: 'white',
    fontSize: normalize(24)
  },
  title: {
    color: MAIN_GREY_SKELETON,
    fontSize: normalize(18),
    textTransform: 'capitalize'
  },
  text: {
    color: 'white',
    fontSize: normalize(18),
    textTransform: 'capitalize'
  },
  avatar: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: generateRandomColor(),
    width: normalize(100),
    height: normalize(100),
  },
  profileHeader: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: MAIN_GREY_SKELETON,
    backgroundColor:MAIN_YELLOW,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(20),
    paddingTop:normalize(60)
    // backgroundColor:'white',
    // elevation:20
  },
  block: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: MAIN_GREY_SKELETON,
    padding: normalize(15)
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: normalize(20)
  },
  activityImg:{
    width: normalize(100), height: normalize(120),borderRadius:5
  }

})
