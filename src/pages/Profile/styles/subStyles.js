import {StyleSheet} from "react-native";
import {normalize} from "../../../responsive/fontSize";
import {MAIN_RED} from "../../../constants/colors";

export const styles = StyleSheet.create({

  scroll: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 1, backgroundColor: 'white',
    padding:normalize(15),
  },
  containerCenter: {
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  title: {
    fontSize: normalize(18),
    color: 'black',
    fontWeight: '500',
    marginBottom: 5
  },
  filmsRow: {
    flexDirection: 'row', alignItems: 'center', width: normalize(300), height: normalize(140)
  },
  up: {
    backgroundColor: MAIN_RED,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: normalize(60),
    height: normalize(60),
    position: 'absolute',
    right: normalize(15),
    bottom: normalize(15)
  },


})
