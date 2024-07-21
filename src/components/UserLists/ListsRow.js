import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ListPreview from "./ListPreview";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { normalize } from "../../responsive/fontSize";

const ListsRow = () => {
  const {
    user, refresh, userList
  } = useSelector((state) => state.auth);
  const navigation = useNavigation()

  return (
    <>
      <FlatList horizontal={true} data={userList} keyExtractor={(item, index) => `key-${index}`}
                contentContainerStyle={{alignItems: 'center',gap:30}}
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews={true}
                maxToRenderPerBatch={1}
                // snapToInterval={normalize(200)}
                renderItem={({item}) => {
                  return (
                    <ListPreview data={item} onPress={() => navigation.navigate('ListOverview', {
                      id: item?._id,
                      title: item?.name,
                    })}/>

                  );
                }}
                ListFooterComponent={<TouchableOpacity onPress={() => navigation.navigate('AddList')}
                                                       style={{marginLeft: normalize(50)}}>
                  <Ionicons name={'add-circle-outline'} size={100} color={'white'}/>
                </TouchableOpacity>}
                // ListHeaderComponent={<ListPreview data={user?.favoriteFilms} isFavorite={true}
                //                                   onPress={() => navigation.navigate('FavoriteListOverview')}
                //
                // />}
      />
    </>
  );
};

export default React.memo(ListsRow);
