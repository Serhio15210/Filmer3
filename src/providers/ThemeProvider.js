import React, { useContext, useEffect, useState } from "react";
import * as NavigationDarkTheme from "../pages/styles";
import * as PaperDarkTheme from "../pages/styles";
import { DarkThemeStyles } from "../styles/darkstyles";
import { DefaultStyles } from "../styles/defaultstyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeModules } from "react-native";
import { I18n } from "i18n-js";
import { eng, ukr } from "../constants/localizations";

const ThemeContext = React.createContext(null);

const ThemeProvider=({children})=>{
    const[isDarkTheme,setIsDarkTheme]=useState(true)
    const[appTheme,setAppTheme]=useState('dark')
    const deviceLanguage = NativeModules.I18nManager.localeIdentifier;
    const nativeLocale=deviceLanguage==="uk_UA"?"ukr":"eng"
    const [locale, setLocale] = useState(nativeLocale)
    const translations = {
        eng: eng,
        ukr: ukr
    };
    const i18n = new I18n(translations);
    i18n.enableFallback = true;
    i18n.translations = {eng, ukr}
    i18n.locale = locale
    useEffect(()=>{
        // AsyncStorage.getItem('theme').then(res=>{
        //     if (res===null){
        //         setAppTheme('light')
        //         // setIsDarkTheme(false)
        //     }else if (res==='true') {
        //         setAppTheme('dark')
        //         // console.log(res)
        //         // setIsDarkTheme(true)
        //     }else {
        //         setAppTheme('light')
        //         // setIsDarkTheme(false)
        //     }
        // })
        AsyncStorage.getItem('locale').then(res => {
            if (res) {
                if (res === 'ukr') {
                    setLocale('ukr')
                } else {
                    setLocale('eng')
                }
            } else {
                setLocale('eng')
            }
        })
    },[])
    const changeLocale=(lang)=>{
        AsyncStorage.setItem('locale',lang)
        setLocale(lang)
    }
    const CustomDefaultTheme = {

        colors: {

            background: 'white',
            text: 'black'

        }
    }
    const CustomDarkTheme = {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        colors: {
            ...NavigationDarkTheme.colors,
            ...PaperDarkTheme.colors,
            background: '#333333',
            text: '#DAA520'
        }
    }

    // const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
    const theme = CustomDarkTheme
    // const screenTheme = isDarkTheme ? DarkThemeStyles : DefaultStyles;
    const screenTheme = DarkThemeStyles;

    return (
        <ThemeContext.Provider
            value={{
                isDarkTheme,setIsDarkTheme,theme,screenTheme,i18n,locale,setLocale,changeLocale,appTheme,setAppTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}
const useTheme = () => {
    const auth = useContext(ThemeContext);
    if (auth == null) {
        throw new Error("useTheme() called outside of a ThemeProvider?");
    }
    return auth;
};

export {ThemeProvider, useTheme};
