import {StyleSheet} from "react-native";
import {normalize} from "../../responsive/fontSize";
import {MAIN_RED} from "../../constants/colors";

export const style = (theme)=> StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,

  },
  block: {
    flex: 1,
    padding: 15,
    paddingBottom:normalize(100)
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10,

  },
  poster: {
    width: normalize(130),
    height: normalize(190),
    // marginLeft:normalize(20),
    shadowColor: "white",
    shadowOpacity: 1.0,
    borderColor: "black", borderRadius: 10,

  },
  titleBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%'

  },
  title: {
    color: theme.titleColor,
    fontSize: normalize(32),
    fontWeight: '600'
  },
  text: {
    color: theme.textColor,
    fontSize: normalize(16),

  },
  tagline: {
    color: theme.taglineColor,
    fontSize: normalize(16),
    textTransform: 'uppercase',
    fontWeight: '500'

  },
  whiteButton: {
    backgroundColor: 'white',
    elevation: 5,
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(8),
    alignSelf: 'flex-start',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(20)
  },
  rateItem: {
    flexDirection: 'row', alignItems: 'center', marginTop: normalize(10)
  },
  rateText: {
    color: theme.dotColor, fontWeight: '600'
  },
  castTitle: {
    color: 'white',
    fontSize: normalize(18),
    textTransform: 'uppercase',
    fontWeight: '500'
  },
  switchButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: MAIN_RED,
    width: '33.3%',
    paddingBottom: normalize(10)
  },
  rowBetween: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  add: {
    backgroundColor: theme.addButtonBg,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: normalize(60),
    height: normalize(60),
    position: 'absolute',
    right: normalize(15),
    bottom: normalize(15),
    zIndex:5
  },

});
