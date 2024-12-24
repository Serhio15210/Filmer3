import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {colors} from './styles';
import Login from './auth/login';
import Signup from './auth/SignUp';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '../providers/ThemeProvider';
import {useAuth} from '../providers/AuthProvider';
import {Root} from '../navigation/Root';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {themeColors} from '../navigation/themeColors';
import Splash from '../components/Splash';

const Stack = createStackNavigator();
const Welcome = () => {
  const {theme, appTheme} = useTheme();
  const {isAuth, isNewUser, isLoaded} = useAuth();
  const style = styles(themeColors[appTheme]);
  return !isLoaded ? (
    <Splash isAppReady={!isLoaded} />
  ) : (
    <NavigationContainer>
      {!isAuth ? (
        <Stack.Navigator
          initialRouteName={'Login'}
          screenOptions={{
            headerStyle: style.headerStyle,
            headerTransparent: true,
            headerMode: 'float',
            headerTintColor: 'white',
            backgroundColor: colors.primary,
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerTitle: ''}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName={'Home'}
          screenOptions={{
            headerStyle: styles.headerStyle,
            headerTransparent: true,
            headerMode: 'float',
            headerTintColor: 'white',
          }}>
          <Stack.Screen
            name="Home"
            component={Root}
            options={{headerShown: false, headerStatusBarHeight: 0}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
const styles = theme =>
  StyleSheet.create({
    loadView: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerStyle: {
      backgroundColor: theme.backgroundColor,
      shadowColor: 'transparent',
      shadowRadius: 0,
      borderBottomWidth: 0,
    },
  });
export default Welcome;
