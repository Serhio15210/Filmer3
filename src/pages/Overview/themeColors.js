import {BLACK, MAIN_GREY, MAIN_GREY_FADE, MAIN_RED, MAIN_RED_FADE, MAIN_YELLOW, WHITE} from "../../constants/colors";


export const themeColors={
  'light':{
    backgroundColor:WHITE,
    titleColor:BLACK,
    textColor:BLACK,
    taglineColor:BLACK,
    selectedRate:MAIN_RED,
    buttonBg:MAIN_RED,
    dotColor:MAIN_RED,
    headerBgColor:['transparent', 'rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 1)'],
    boxInterpolation:["rgb(255,255,255)", "rgba(255,255,255,0)"],
    arrowColor:['rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 1)'],
    posterGradient:['transparent', 'transparent', 'rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 1)'],
    addButtonBg:MAIN_RED
  },
  'dark':{
    // backgroundColor:MAIN_GREY,
    backgroundColor:BLACK,
    titleColor:WHITE,
    taglineColor:MAIN_YELLOW,
    textColor:WHITE,
    selectedRate:MAIN_YELLOW,
    buttonBg:MAIN_YELLOW,
    dotColor:MAIN_YELLOW,
    headerBgColor:['transparent', BLACK, BLACK],
    boxInterpolation:["rgba(255,255,255,0.5)", "rgba(255,255,255,0)"],
    arrowColor:['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)'],
    posterGradient:['transparent', 'transparent', 'rgba(255, 255, 255, 0.2)', MAIN_GREY],
    addButtonBg:MAIN_YELLOW
  }
}
