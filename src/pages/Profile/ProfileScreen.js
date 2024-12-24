import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {normalize} from '../../responsive/fontSize';
import {useAuth} from '../../providers/AuthProvider';
import {BASE_URL, IMG_URI} from '../../api/apiKey';
import Loading from '../../components/UI/Loading';
import {AirbnbRating} from 'react-native-ratings';
import RatingStats from '../../components/UI/RatingStats';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {removeToken} from '../../utils/storage';
import {styles} from './styles/profileStyles';
import {useTheme} from '../../providers/ThemeProvider';
import {MAIN_YELLOW} from '../../constants';
import {
  useGetActivitiesQuery,
  useGetProfileQuery,
  useGetUserListsQuery,
  userApi,
} from '../../services/UserService';
import {useGetFilmStatsQuery} from '../../services/FilmService';
import Feather from 'react-native-vector-icons/Feather';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import {WHITE} from '../../constants/colors';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const ProfileScreen = () => {
  const {setIsAuth, setAuthToken} = useAuth();
  const {i18n} = useTheme();

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const {
    data: {userInfo: user} = {},
    isLoading: isUserLoading,
    refetch: userRefetch,
    error: userError,
  } = useGetProfileQuery();
  const {
    data: listData,
    isLoading: isListLoading,
    refetch: userListRefetch,
  } = useGetUserListsQuery();
  const {
    data: {activities: activities} = {},
    isLoading: isActivitiesLoading,
    refetch: activitiesRefetch,
  } = useGetActivitiesQuery();
  const {
    data: stats,
    isLoading: isStatsLoading,
    refetch: statsRefetch,
  } = useGetFilmStatsQuery();
  const [update, {isLoading: isUpdating, isSuccess, error}] =
    userApi.useUpdateProfileMutation();
  useEffect(() => {
    if (isFocused) {
      activitiesRefetch();
      statsRefetch();
    }
  }, [isFocused]);
  const [edit, setEdit] = useState(false);
  const [photo, setPhoto] = useState({});
  const [name, setName] = useState(user?.userName || '');
  const editProfile = useCallback(async () => {
    const formData = new FormData();
    if (photo.uri) {
      formData.append('avatar', {
        uri: photo.uri,
        name: photo.fileName,
        type: photo.type,
      });
    }
    formData.append('userName', name);
    await update(formData);
  }, [photo, name]);

  useEffect(() => {
    if (isSuccess) {
      setEdit(false);
      setPhoto({});
    }
  }, [isSuccess]);

  return isUserLoading ? (
    <Loading />
  ) : (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: normalize(20),
              right: normalize(15),
            }}
            onPress={async () => {
              if (edit) {
                await editProfile();
              } else {
                setEdit(!edit);
              }
            }}>
            {edit ? (
              <Text style={styles.text}>Save</Text>
            ) : (
              <Feather name={'edit'} color={'white'} size={18} />
            )}
          </TouchableOpacity>
          {isUpdating ? (
            <Loading color={WHITE} />
          ) : (
            <>
              <TouchableOpacity
                style={styles.avatar}
                disabled={!edit}
                onPress={async () => {
                  await ImagePicker.launchImageLibrary({}, response => {
                    if (response.didCancel) {
                      console.log('User cancelled image picker');
                    } else if (response.error) {
                      console.log('ImagePicker Error: ', response.error);
                    } else {
                      setPhoto(response.assets[0]);
                    }
                  });
                }}>
                {photo.uri ? (
                  <Image source={{uri: photo.uri}} style={styles.avatar} />
                ) : user?.avatar ? (
                  <Image
                    source={{uri: BASE_URL + '/static/avatars/' + user.avatar}}
                    style={styles.avatar}
                  />
                ) : (
                  <Text style={{fontSize: normalize(24), color: 'white'}}>
                    {user?.userName[0]?.toUpperCase()}
                  </Text>
                )}
              </TouchableOpacity>
              {edit ? (
                <TextInput
                  value={name}
                  onChangeText={setName}
                  style={{
                    ...styles.userName,
                    textDecorationLine: 'underline',
                    textAlign: 'center',
                  }}
                  placeholder={'Type your username'}
                />
              ) : (
                <Text style={styles.userName}>{user?.userName}</Text>
              )}
            </>
          )}
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.block}
          onPress={() => {
            navigation.navigate('ProfileActivities', {
              title: user?.userName,
              activities,
            });
          }}>
          <Text style={styles.title}>{i18n.t('recentActivity')}</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            scrollEnabled={activities?.length > 3}
            data={activities}
            contentContainerStyle={{marginTop: normalize(10), gap: 5}}
            renderItem={({item, index}) => {
              return (
                <View key={index}>
                  <Image
                    source={{uri: IMG_URI + item?.poster}}
                    style={styles.activityImg}
                  />
                  {item?.rate > 0 && (
                    <AirbnbRating
                      count={5}
                      defaultRating={item?.rate}
                      showRating={false}
                      isDisabled={true}
                      size={normalize(15)}
                      selectedColor={MAIN_YELLOW}
                      ratingContainerStyle={{
                        marginTop: 0,
                        width: normalize(100),
                      }}
                    />
                  )}
                </View>
              );
            }}
          />
        </TouchableOpacity>
        <View style={styles.block}>
          <Text style={styles.title}>{i18n.t('ratings')}</Text>
          <RatingStats data={stats} />
        </View>
        <View style={styles.block}>
          <Text style={styles.title}>{i18n.t('details')}</Text>
          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => navigation.navigate('AllFilmsScreen')}>
            <Text style={styles.text}>{i18n.t('films')}</Text>
            <Text style={styles.text}>{stats?.total}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.detailRow}
            onPress={() =>
              navigation.navigate('AllListsScreen', {
                title: user?.userName,
                id: user?._id,
              })
            }>
            <Text style={styles.text}>{i18n.t('lists')}</Text>
            <Text style={styles.text}>{listData?.lists?.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.detailRow}
            onPress={() => navigation.navigate('Subscribers', {id: user?._id})}>
            <Text style={styles.text}>{i18n.t('subscribers')}</Text>
            <Text style={styles.text}>{user?.subscribers?.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.detailRow}
            onPress={() =>
              navigation.navigate('Subscriptions', {id: user?._id})
            }>
            <Text style={styles.text}>{i18n.t('subscriptions')}</Text>
            <Text style={styles.text}>{user?.subscriptions?.length}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{marginLeft: normalize(15), marginTop: normalize(15)}}
          onPress={async () => {
            setIsAuth(false);
            setAuthToken('');
            removeToken();
            await GoogleSignin.revokeAccess();
          }}>
          <Text
            style={{
              color: MAIN_YELLOW,
              fontWeight: '600',
              fontSize: normalize(18),
            }}>
            {i18n.t('exit')} <Ionicons size={15} name={'exit-outline'} />
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
// const styles = StyleSheet.create({
//   scroll: {
//     flex: 1,
//     backgroundColor: 'white'
//   },
//   container: {
//     flex: 1,
//     backgroundColor: 'white'
//   },
//   userName: {
//     color: 'white',
//     fontSize: normalize(24)
//   },
//   title: {
//     color: MAIN_GREY,
//     fontSize: normalize(18),
//     textTransform: 'capitalize'
//   },
//   text: {
//     color: 'black',
//     fontSize: normalize(18),
//     textTransform: 'capitalize'
//   },
//   profileHeader: {
//     width: '100%',
//     borderBottomWidth: 1,
//     borderColor: MAIN_GREY_FADE,
//     backgroundColor:MAIN_RED,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: normalize(20),
//     paddingTop:normalize(60)
//     // backgroundColor:'white',
//     // elevation:20
//   },
//   block: {
//     width: '100%',
//     borderBottomWidth: 1,
//     borderColor: MAIN_GREY_FADE,
//     padding: normalize(15)
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: normalize(20)
//   },
//   activityImg:{
//     width: normalize(100), height: normalize(120),borderRadius:5
//   }
//
// })
export default ProfileScreen;
