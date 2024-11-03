import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { BLACK, MAIN_GREY_SKELETON, WHITE } from "../../constants/colors";
import { useGetNotificationsQuery, useReadMessageMutation } from "../../services/NotificationService";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import React, { useEffect } from "react";
import { normalize } from "../../responsive/fontSize";
import { themeColors } from "../../components/filmModals/themeColors";
import { AirbnbRating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";

const NotificationsScreen = () => {
  const { data, isLoading, refetch } = useGetNotificationsQuery();
  const [read, {}] = useReadMessageMutation();


  return (
    <View style={{ flex: 1, backgroundColor: BLACK }}>
      {isLoading ? <NotificationSkeleton enabled={isLoading} /> :
        <FlatList data={data?.notifications} renderItem={({ item, index }) => <Notification item={item} read={read} />}
                  contentContainerStyle={{ minHeight: "100%" }} keyExtractor={(item, index) => index + ""}
                  ListEmptyComponent={<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><Text
                    style={{ color: MAIN_GREY_SKELETON }}>Notifications is empty</Text></View>} />
      }
    </View>
  );
};
const Notification = ({ item, read }) => {
  const navigation = useNavigation();
  useEffect(() => {
    if (!item.isRead) {
      read(item._id);
    }
  }, [false]);
  return <TouchableOpacity
    activeOpacity={0.7}
    enabled={item.imdb_id}
    style={{ width: "100%", padding: 20, borderBottomWidth: 1, borderColor: MAIN_GREY_SKELETON, gap: 5 }}
    onPress={() => {
      if (item.imdb_id) {
        navigation.navigate("FilmOverview", { title: item?.filmTitle, id: item.imdb_id });
      }
    }}>
    <Text>{item.title}</Text>
    {item.rate && <AirbnbRating
      count={5}
      defaultRating={parseInt(item.rate)}
      showRating={false}
      isDisabled
      size={normalize(20)}
      selectedColor={themeColors["dark"].selectedRate}
      starContainerStyle={{ width: "100%", justifyContent: "flex-start" }}
    />}
    {item.text && <View style={{ padding: 10, backgroundColor: MAIN_GREY_SKELETON, borderRadius: 10 }}>
      <Text style={{ color: WHITE, fontSize: normalize(14) }}>{item.text}</Text>
    </View>}
  </TouchableOpacity>;
};
const NotificationSkeleton = ({ enabled }) => {
  return (
    <SkeletonPlaceholder borderRadius={4} enabled={enabled} backgroundColor={MAIN_GREY_SKELETON} highlightColor={WHITE}>
      <SkeletonPlaceholder.Item padding={20} width={"100%"} gap={10}>
        <SkeletonPlaceholder.Item padding={20} width={"100%"} height={60} />
        <SkeletonPlaceholder.Item padding={20} width={"100%"} height={60} />
        <SkeletonPlaceholder.Item padding={20} width={"100%"} height={60} />
        <SkeletonPlaceholder.Item padding={20} width={"100%"} height={60} />
        <SkeletonPlaceholder.Item padding={20} width={"100%"} height={60} />
        <SkeletonPlaceholder.Item padding={20} width={"100%"} height={60} />
        <SkeletonPlaceholder.Item padding={20} width={"100%"} height={60} />
        <SkeletonPlaceholder.Item padding={20} width={"100%"} height={60} />
        <SkeletonPlaceholder.Item padding={20} width={"100%"} height={60} />
        <SkeletonPlaceholder.Item padding={20} width={"100%"} height={60} />

      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
export default NotificationsScreen;
