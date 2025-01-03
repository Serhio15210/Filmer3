import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Button,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {useAuth} from '../../providers/AuthProvider';
import {useTheme} from '../../providers/ThemeProvider';
import logo from '../../assets/logo.png';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {MAIN_RED} from '../../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {signIn, signInGoogle} from '../../api/auth';
import {normalize} from '../../responsive/fontSize';
import {themeColors} from './themeColors';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Controller, useForm} from 'react-hook-form';
import AuthInput from '../../components/auth/AuthInput';

const Login = ({navigation}) => {
  const {
    register,
    setValue,
    handleSubmit: handle,
    control,
    reset,
    formState: {errors},
  } = useForm();
  const onSubmit = async data => {
    setLoading(true);
    if (data.email === '' || data.password === '') {
      setMessage('Fill in all fields');
    } else {
      const response = await signIn(data.email, data.password);
      console.log(response);
      if (response?.success) {
        setMessage('');
        setAuthToken(response?.token);
      } else {
        setMessage(response);
      }
    }
    setLoading(false);
  };
  const onError = (errors, e) => {
    return console.log(errors);
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [termsCheck, setTermsCheck] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {setAuthToken, setIsAuth} = useAuth();
  const {isDarkTheme, appTheme} = useTheme();
  const [translateY, setTranslateY] = useState(new Animated.Value(350));
  const [paddingBottom, setPaddingBottom] = useState(new Animated.Value(45));
  const {i18n} = useTheme();
  const handleSubmit = async () => {
    setLoading(true);
    if (email === '' || password === '') {
      setMessage('Fill in all fields');
    } else {
      const response = await signIn(email, password);
      console.log(response);
      if (response?.success) {
        setMessage('');
        setAuthToken(response?.token);
        // setIsAuth(true)
      } else {
        setMessage(response);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 0,
            // easing: Easing.back(),
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(paddingBottom, {
            toValue: 0,
            // easing: Easing.back(),
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start();
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 350,
            // easing: Easing.back(),
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(paddingBottom, {
            toValue: 45,
            // easing: Easing.back(),
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const style = form(themeColors[appTheme]);
  const headerStyle = header(themeColors[appTheme]);
  GoogleSignin.configure({
    webClientId:
      '215809157367-l20tdno96miq1f0kff02im2f3a3c0vmj.apps.googleusercontent.com',
  });

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();
    console.log(signInResult);
    // Try the new style of google-sign in result, from v13+ of that module
    let token = signInResult.data?.idToken;
    const response = await signInGoogle(token);
    console.log(response);
    if (response?.success) {
      setMessage('');
      setAuthToken(response?.token);
      // setIsAuth(true)
    } else {
      setMessage(response);
    }
  }

  return (
    <ScrollView
      style={{backgroundColor: themeColors[appTheme].backgroundColor}}>
      <Animated.View
        style={{
          ...headerStyle.container,
          height: translateY,
          paddingBottom: paddingBottom,
        }}>
        <View style={headerStyle.inner}>
          <Text
            style={{
              ...headerStyle.title,
            }}>
            {i18n.t('authorisation')}
          </Text>
          <View style={headerStyle.icon}>
            <AntDesign name={'login'} color={'white'} size={50} />
          </View>
        </View>
        <View style={headerStyle.logo}>
          <Image
            source={logo}
            style={{width: '100%', height: '100%'}}
            resizeMode={'contain'}
          />
        </View>
      </Animated.View>

      <View style={style.container}>
        <View style={style.field}>
          <AuthInput
            control={control}
            label={i18n.t('email')}
            name={'email'}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={style.field}>
          <AuthInput
            control={control}
            label={i18n.t('password')}
            name={'password'}
            setShowPassword={setShowPassword}
            showPassword={showPassword}
            secureTextEntry={!showPassword}
          />
        </View>

        {message && <Text style={style.message}>{message}</Text>}
        <View style={style.field}>
          <TouchableOpacity
            onPress={handle(onSubmit)}
            // disabled={!email || !password}
            style={{
              ...style.button,
              backgroundColor:
                !email || !password
                  ? 'black'
                  : themeColors[appTheme].buttonBackgroundColor,
            }}>
            {isLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size="large" color={'white'} />
              </View>
            ) : (
              <Text style={style.buttonText}>{i18n.t('enter')}</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={[style.field, style.field1]}>
          <Text style={{...style.text}}>{i18n.t('dontHaveAccount')}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={{...style.button1}}>
            <Text style={{...style.signUp}}>{i18n.t('signUp')}</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Google Sign-In"
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }
        />
      </View>
    </ScrollView>
  );
};

export const header = theme =>
  StyleSheet.create({
    container: {
      paddingBottom: 45,
      height: 350,
    },
    inner: {
      backgroundColor: theme.backgroundTitle,
      height: '100%',
      width: '100%',
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 50,
      justifyContent: 'center',
    },
    title: {
      fontSize: 32,
      marginTop: normalize(30),
      fontWeight: 'bold',
      paddingLeft: 15,
      color: theme.titleColor,
    },
    icon: {
      backgroundColor: theme.titleIconBackground,
      width: normalize(150),
      height: normalize(150),
      position: 'absolute',
      right: 0,
      top: 0,
      borderTopLeftRadius: 100,
      borderBottomLeftRadius: 100,
      borderBottomRightRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      position: 'absolute',
      bottom: 0,
      borderRadius: 100,
      // backgroundColor: 'white',
      width: normalize(100),
      height: normalize(100),
      alignSelf: 'center',
      // borderWidth: 2,
      // borderColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export const form = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: normalize(15),
      paddingTop: 0,
      backgroundColor: theme.backgroundColor,
    },
    image: {
      width: '100%',
      height: '60%',
      resizeMode: 'cover',
    },
    field: {
      padding: normalize(15),
      paddingVertical: normalize(15),
      position: 'relative',
    },
    heading: {
      fontSize: normalize(32),
      fontWeight: 'bold',
      paddingTop: 0,
    },
    label: {
      color: theme?.borderColor,
    },
    input: {
      borderBottomWidth: 2,
      borderBottomColor: theme?.borderColor,
      paddingVertical: 10,
      fontWeight: 'bold',
      letterSpacing: 1,
      fontSize: 15,
      color: theme?.textColor,
      zIndex: 1,
    },
    eye: {
      fontSize: normalize(18),
      color: theme.textColor,
      zIndex: 2,
    },

    button: {
      borderRadius: 5,
      alignContent: 'center',
      backgroundColor: MAIN_RED,
      padding: normalize(15),
    },
    disabled: {
      backgroundColor: 'black',
    },
    buttonText: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'white',
      fontSize: 15,
    },
    button1: {
      backgroundColor: 'transparent',
      padding: normalize(15),
    },
    field1: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      color: theme.textColor,
      fontSize: 15,
    },
    signUp: {
      fontWeight: 'bold',
      color: theme.signUpTextColor,
      fontSize: 15,
    },

    icon: {
      position: 'absolute',
      top: 8,
      left: 15,
      paddingLeft: 0,
    },

    message: {
      textAlign: 'center',
      fontSize: 13,
      color: 'tomato',
    },
    passwordBlock: {
      borderBottomWidth: 2,
      borderColor: theme.borderColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
export default Login;
