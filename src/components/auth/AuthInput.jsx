import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Controller} from 'react-hook-form';
import React from 'react';

import {useTheme} from '../../providers/ThemeProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {themeColors} from '../Films/themeColors';
import {normalize} from '../../responsive/fontSize';
import {MAIN_RED} from '../../constants/colors';

const AuthInput = ({
  label,
  control,
  name,
  showPassword,
  setShowPassword,
  ...props
}) => {
  const {isDarkTheme, appTheme} = useTheme();
  const style = form(themeColors[appTheme]);
  return (
    <>
      <Text style={{...style.label}}>{label}</Text>
      {name !== 'password' ? (
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={style.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              {...props}
            />
          )}
          name={name}
          rules={{required: true}}
        />
      ) : (
        <View style={style.passwordBlock}>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={{
                  ...style.input,
                  borderBottomColor: 'transparent',
                  width: '90%',
                }}
                onChangeText={value => onChange(value)}
                value={value}
                onBlur={onBlur}
                {...props}
              />
            )}
            name="password"
            rules={{required: true}}
          />

          <FontAwesome5
            name={!showPassword ? 'eye-slash' : 'eye'}
            color={'black'}
            style={style.eye}
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          />
        </View>
      )}
    </>
  );
};
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
export default AuthInput;
