import {BLACK, MAIN_GREY, MAIN_GREY_FADE, MAIN_RED, MAIN_RED_FADE, MAIN_YELLOW, WHITE} from "../../constants/colors";

export const themeColors={
  'light':{
    gradientBg:['white', '#f8bfca', '#f595a8', MAIN_RED, 'white'],
    backgroundColor:MAIN_RED,
    textColor:BLACK,
    loadColor:MAIN_RED
  },
  'dark':{
    gradientBg:[MAIN_GREY, 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgba(255, 255, 255,0.4)', MAIN_GREY],
    backgroundColor:BLACK,
    textColor:WHITE,
    loadColor:MAIN_YELLOW

  }
}
