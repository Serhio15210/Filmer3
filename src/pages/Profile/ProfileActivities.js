import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {normalize} from '../../responsive/fontSize';
import {
  BLACK,
  MAIN_GREY,
  MAIN_GREY_SKELETON,
  MAIN_SUCCESS,
} from '../../constants/colors';
import {IMG_URI} from '../../api/apiKey';
import {AirbnbRating} from 'react-native-ratings';
import {MAIN_YELLOW} from '../../constants';
import React, {useEffect} from 'react';
import {useGetActivitiesQuery} from '../../services/UserService';
import RowSkeleton from '../../components/skeletons/RowSkeleton';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProfileActivities = () => {
  const {
    data: {activities: activities} = {},
    isLoading: isActivitiesLoading,
    isRefetching,
    refetch: activitiesRefetch,
    error,
  } = useGetActivitiesQuery();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  useEffect(() => {
    if (isFocused) {
      activitiesRefetch();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {isActivitiesLoading || isRefetching ? (
        <RowSkeleton enabled={isActivitiesLoading || isRefetching} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={activities}
          contentContainerStyle={{marginTop: normalize(10), gap: 5}}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.block}
                onPress={() => {
                  navigation.navigate('FilmOverview', {
                    title: item?.title,
                    id: item?.imdb_id,
                  });
                }}>
                <View key={index} style={styles.activity}>
                  <Image
                    source={{uri: IMG_URI + item?.poster}}
                    style={styles.activity__img}
                    resizeMode={'contain'}
                  />
                  <View style={{flex: 1}}>
                    <View style={styles.row}>
                      <Text style={styles.title}>You</Text>
                      <Text style={styles.text}>
                        {item?.rates[0]?.rate > 0 && item?.comments[0]?.comment
                          ? 'rated and commented'
                          : item?.rates[0]?.rate > 0
                          ? 'rated'
                          : item?.comments[0]?.comment
                          ? 'commented'
                          : ''}{' '}
                      </Text>
                      <Text style={styles.title}>{item?.title}</Text>
                      {item?.isFavorites[0].isFavorite && (
                        <AntDesign
                          name="heart"
                          size={normalize(20)}
                          color={MAIN_SUCCESS}
                        />
                      )}
                    </View>

                    {item?.rates[0]?.rate > 0 && (
                      <AirbnbRating
                        count={5}
                        defaultRating={item?.rates[0]?.rate}
                        showRating={false}
                        isDisabled={true}
                        unSelectedColor={'transparent'}
                        size={normalize(15)}
                        selectedColor={MAIN_YELLOW}
                        ratingContainerStyle={{
                          marginTop: 0,
                          width: normalize(100),
                        }}
                      />
                    )}
                  </View>
                </View>
                {item?.comments[0]?.comment && (
                  <View style={styles.comment}>
                    <Text style={{fontSize: normalize(14)}}>
                      {item?.comments[0]?.comment}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
    gap: 10,
    padding: normalize(15),
  },
  block: {
    gap: normalize(10),
    borderBottomWidth: 1,
    borderColor: MAIN_GREY,
    paddingBottom: normalize(10),
  },
  activity: {
    flexDirection: 'row',
    gap: normalize(10),
    width: '100%',
  },
  activity__img: {
    width: normalize(70),
    height: normalize(105),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: normalize(5),
  },
  title: {
    fontWeight: '700',
    color: 'white',
    fontSize: normalize(18),
  },
  text: {
    color: MAIN_GREY_SKELETON,
    fontSize: normalize(15),
  },
  comment: {
    backgroundColor: MAIN_GREY,
    padding: normalize(10),
    width: '100%',
    borderRadius: 5,
  },
});
export default ProfileActivities;
