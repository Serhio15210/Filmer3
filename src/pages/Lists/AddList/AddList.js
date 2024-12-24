import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../../providers/ThemeProvider';
import {normalize} from '../../../responsive/fontSize';
import {
  BLACK,
  MAIN_GREY_FADE,
  MAIN_GREY_SKELETON,
  MAIN_RED,
  MAIN_SUCCESS,
} from '../../../constants/colors';
import AwesomeButton from 'react-native-really-awesome-button';
import Toast from 'react-native-toast-message';

import {MAIN_YELLOW} from '../../../constants';
import addListBg from '../../../assets/addListBg.jpg';
import {Formik} from 'formik';
import {userApi} from '../../../services/UserService';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const AddList = props => {
  const {screenTheme, isDarkTheme, i18n} = useTheme();
  const theme = screenTheme;
  const navigation = useNavigation();
  const [isAlert, setIsAlert] = useState(false);
  const [mode, setMode] = useState('public');
  const modes = {
    public: 'public',
    friends: 'friends',
    private: 'private',
  };
  const modeColors = {
    true: MAIN_YELLOW,
    false: MAIN_GREY_SKELETON,
  };
  const halfHeight = Dimensions.get('window').height / 2;
  const marginTop = useSharedValue(halfHeight);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginTop: marginTop.value, // Установка marginTop как анимированного значения
    };
  });
  const [saveList, {isLoading, error, isSuccess, data}] =
    userApi.useCreateListMutation();
  const [name, setName] = useState('');
  useEffect(() => {
    if (isSuccess) {
      navigation.reset({
        index: 0,
        routes: [
          {name: 'HomeRoot'},
          {name: 'ListOverview', params: {title: name, id: data?._id}},
        ],
      });
    }
    if (error) {
      Toast.show({
        type: 'error',
        text1: error.data[0]?.msg || error.data.message,
      });
    }
  }, [isSuccess, error]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        marginTop.value = withTiming(50, {duration: 300});
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        marginTop.value = withTiming(halfHeight, {duration: 300});
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <ImageBackground
      source={addListBg}
      style={styles.container}
      resizeMode={'cover'}>
      <Animated.View
        style={[
          {
            backgroundColor: BLACK,
            flex: 1,
            borderTopLeftRadius: 100,
          },
          animatedStyle,
        ]}>
        <Formik
          initialValues={{name: '', description: ''}}
          onSubmit={async values => {
            await saveList({
              name: values.name,
              description: values.description,
              mode,
            });
            setName(values.name);
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder={i18n.t('enterName')}
                  placeholderTextColor={
                    isDarkTheme ? MAIN_GREY_SKELETON : 'black'
                  }
                  value={values.name}
                  onBlur={handleBlur('name')}
                  onChangeText={handleChange('name')}
                />
                <TextInput
                  style={styles.input}
                  placeholder={'Description'}
                  placeholderTextColor={
                    isDarkTheme ? MAIN_GREY_SKELETON : 'black'
                  }
                  value={values.description}
                  onBlur={handleBlur('description')}
                  onChangeText={handleChange('description')}
                />

                <AwesomeButton
                  progress={isSuccess}
                  onPress={async next => {
                    if (values.name?.length >= 5) {
                      handleSubmit();

                      if (error) {
                        next();
                      }
                    } else {
                      Toast.show({
                        type: 'error',

                        text1: i18n.t('nameMustHave5Sym'),
                      });
                      next();
                    }
                  }}
                  width={windowWidth - 60}
                  backgroundColor={isDarkTheme ? MAIN_YELLOW : MAIN_RED}
                  borderRadius={10}
                  backgroundDarker={'white'}>
                  {isLoading ? (
                    <ActivityIndicator size="large" color={'white'} />
                  ) : (
                    <Text style={styles.text}>{i18n.t('save')}</Text>
                  )}
                </AwesomeButton>
                <View style={styles.modeRow}>
                  <Pressable
                    onPress={() => setMode(modes.public)}
                    style={styles.modeButton}>
                    <MaterialIcons
                      name={'public'}
                      color={modeColors[mode === modes.public]}
                      size={30}
                    />
                    <Text
                      style={{
                        ...styles.text,
                        color: modeColors[mode === modes.public],
                      }}>
                      Public
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setMode(modes.friends)}
                    style={styles.modeButton}>
                    <FontAwesome5
                      name={'user-friends'}
                      color={modeColors[mode === modes.friends]}
                      size={30}
                    />
                    <Text
                      style={{
                        ...styles.text,
                        color: modeColors[mode === modes.friends],
                      }}>
                      Friends only
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setMode(modes.private)}
                    style={styles.modeButton}>
                    <FontAwesome5
                      name={'lock'}
                      color={modeColors[mode === modes.private]}
                      size={30}
                    />
                    <Text
                      style={{
                        ...styles.text,
                        color: modeColors[mode === modes.private],
                      }}>
                      Private
                    </Text>
                  </Pressable>
                </View>
              </View>
            </>
          )}
        </Formik>
      </Animated.View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    // backgroundColor:MAIN_GREY,
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
  addButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  form: {
    alignItems: 'center',
    width: '100%',
    padding: 30,
    gap: 20,
    flex: 1,
    borderTopLeftRadius: 100,
  },
  input: {
    borderBottomWidth: 1,
    width: '100%',
    color: 'white',
    borderColor: MAIN_GREY_FADE,
    fontSize: 18,
  },
  saveButton: {
    position: 'absolute',
    backgroundColor: MAIN_SUCCESS,
    width: 45,
    height: 45,
    padding: 0,
    borderRadius: 100,
    right: 15,
    top: 10,
    zIndex: 100,
  },
  add: {
    backgroundColor: MAIN_RED,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
  modeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  modeButton: {
    alignItems: 'center',
  },
});
export default AddList;
