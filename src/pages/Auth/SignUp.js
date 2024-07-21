import React, {useEffect, useState} from "react";

// UI elements
import {
  ActivityIndicator,
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";


// Custom styles

import {useAuth} from "../../providers/AuthProvider";

import {useTheme} from "../../providers/ThemeProvider";
import AntDesign from "react-native-vector-icons/AntDesign";
import logo from "../../assets/logo.png";
import {form, header} from "./Login";
import {normalize} from "../../responsive/fontSize";
import {signUp} from "../../api/auth";
import Toast from "react-native-toast-message";
import {themeColors} from "./themeColors";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const Signup = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [translateY, setTranslateY] = useState(new Animated.Value(normalize(300)))
  const [paddingBottom, setPaddingBottom] = useState(new Animated.Value(normalize(45)))

  const {isDarkTheme, i18n, appTheme} = useTheme()
  const {isNewUser, setIsNewUser} = useAuth()
  const style = form(themeColors[appTheme]);
  const headerStyle = header(themeColors[appTheme]);
  const handleSubmit = async () => {

    if (
      email === "" ||
      username === "" ||
      rePassword === "" ||
      password === ""
    ) {
      setMessage("Fill in all fields");
    } else if (password !== rePassword) {
      setMessage("Passwords do not match!");
    } else {
      setLoading(true)
      try {
        const response = await signUp(username, email, password)
        if (response?.success) {
          // SweetAlert.showAlertWithOptions({
          //   title: `User ${username} was successfully created`,
          //   subTitle: '',
          //   confirmButtonTitle: 'OK',
          //   confirmButtonColor: '#dedede',
          //   style:'success',
          //
          //   otherButtonColor: '#dedede',
          //   cancellable: true
          // })
          Toast.show({
            type: 'success',
            // And I can pass any custom props I want
            text1: i18n.t('successReg'),
          });

          setIsNewUser(true)
          navigation.goBack()
        } else {
          setMessage(response.toString())
        }

      } catch (err) {
        setMessage(err.message)

      } finally {
        setLoading(false)
      }
    }

  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        navigation.setOptions({
          headerTransparent: false,
          headerTintColor: "black"
        });
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 0,
            // easing: Easing.back(),
            duration: 200,
            useNativeDriver: false
          }),
          Animated.timing(paddingBottom, {
            toValue: 0,
            // easing: Easing.back(),
            duration: 200,
            useNativeDriver: false
          })
        ]).start()
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        navigation.setOptions({
          headerTransparent: true,
          headerTintColor: "white"
        });
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: normalize(300),
            // easing: Easing.back(),
            duration: 200,
            useNativeDriver: false
          }),
          Animated.timing(paddingBottom, {
            toValue: normalize(45),
            // easing: Easing.back(),
            duration: 200,
            useNativeDriver: false
          })
        ]).start()

      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (

    <View style={{flex: 1,backgroundColor:themeColors[appTheme].backgroundColor}}  >
      <Animated.View style={{...headerStyle.container, height: translateY, paddingBottom: paddingBottom}}>
        <View style={headerStyle.inner}>
          <Text style={{
            ...headerStyle.title,
            color: !isDarkTheme ? 'white' : 'black',
          }}>{i18n.t('registration')}</Text>
          <View style={headerStyle.icon}>
            <AntDesign name={'adduser'} color={'white'} size={50}/>
          </View>

        </View>
        <View style={headerStyle.logo}>
          <Image source={logo} style={{width: '100%', height: '100%'}} resizeMode={'contain'}/>
        </View>
      </Animated.View>
      <ScrollView>

        <KeyboardAvoidingView
          style={{backgroundColor: isDarkTheme ? '#333333' : '#333333', flex: 1}}
          behavior="padding"
          enabled
        >

          <View style={style.field}>
            <Text style={{...style.label}}>{i18n.t('nickName')}</Text>
            <TextInput
              onChangeText={value => setUsername(value)}
              name="username"
              style={{
                ...style.input
              }}
              value={username}
              autoCapitalize="none"
            />
          </View>

          <View style={style.field}>
            <Text style={{...style.label}}>{i18n.t('email')}</Text>
            <TextInput
              onChangeText={value => setEmail(value)}
              name="email"
              style={{
                ...style.input,
              }}
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={style.field}>
            <Text style={{...style.label}}>{i18n.t('password')}</Text>
            <View style={style.passwordBlock}>
              <TextInput
                onChangeText={value => setPassword(value)}
                name="password"
                style={{
                  ...style.input,
                  borderBottomColor: 'transparent',
                  width: '90%',
                }}
                secureTextEntry={!showPassword}
                value={password}
                autoCapitalize="none"
              />
              <FontAwesome5 name={!showPassword ? 'eye-slash' : 'eye'} color={'black'} style={style.eye} onPress={() => {
                setShowPassword(!showPassword)
              }}/>

            </View>
          </View>

          <View style={style.field}>
            <Text style={{...style.label}}>{i18n.t('passConfirm')}</Text>
            <View style={style.passwordBlock}>
              <TextInput
                onChangeText={value => setRePassword(value)}
                name="password"
                style={{
                  ...style.input,
                  borderBottomColor: 'transparent',
                  width: '90%',
                }}
                secureTextEntry={!showRePassword}
                value={rePassword}
                autoCapitalize="none"
              />
            <FontAwesome5 name={!showRePassword ? 'eye-slash' : 'eye'} color={'black'} style={style.eye} onPress={() => {
              setShowRePassword(!showRePassword)
            }}/>
            </View>
          </View>
          {message && <Text style={style.message}>{message}</Text>}

          <View style={style.field}>
            <TouchableOpacity onPress={handleSubmit}
                              disabled={!email ||
                                !username ||
                                !rePassword ||
                                !password}
                              style={{
                                ...style.button,
                                backgroundColor: (!email ||
                                  !username ||
                                  !rePassword ||
                                  !password) ? "black" : isDarkTheme ? '#DAA520' : '#DC143C'
                              }}>
              {isLoading ?
                <View style={{
                  flex: 1,
                  justifyContent: "center",
                }}>
                  <ActivityIndicator size="large"
                                     color="white"/></View> :
                <Text style={style.buttonText}>{i18n.t('registration')}</Text>}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>

  );
};

export default Signup;
