import React, { useRef, useState } from "react";
import { Animated, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { normalize } from "../../responsive/fontSize";
import { BLACK, MAIN_GREY_FADE, MAIN_GREY_SKELETON, MAIN_YELLOW, WHITE } from "../../constants/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { IMG_URI } from "../../api/apiKey";
import { useSelector } from "react-redux";
import { useTheme } from "../../providers/ThemeProvider";

const AllListsScreen = ({navigation,route}) => {
  const [lists, setLists] = useState([])
  const {userList, user} = useSelector(state => state.auth)
  let scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollY] = useState(new Animated.Value(0));
  const {i18n}=useTheme()
  const [loading, setLoading] = useState(true)
  // const [totalPages, setTotalPages] = useState(1)
  // const [page, setPage] = useState(1)
  const scrolling = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  // useEffect(() => {
  //   try {
  //     scrollRef?.current?.scrollToOffset({ animated: true, offset: 0 });
  //     getUserList(route.params.id).then(res=>{
  //       if (res.success){
  //         setLists(res?.lists)
  //       }
  //       setLoading(false)
  //     })
  //   }catch (e) {
  //     setLoading(false)
  //   }finally {
  //     setLoading(false)
  //   }
  //
  //
  //
  // }, [])

  return (
    // loading ? <Loading/> :
      <View style={styles.container}>

        {userList?.length === 0 ?
          <View style={styles.containerCenter}>
            <Text style={{color: MAIN_GREY_FADE}}>{i18n.t('listsNotFound')}</Text>
          </View>
          :
          <Animated.FlatList ref={scrollRef} data={userList} showsVerticalScrollIndicator={false}
                             onScroll={Animated.event(
                               [{nativeEvent: {contentOffset: {y: scrollY}}}],
                               {useNativeDriver: false, throttle: 16}
                             )}
                             scrollEventThrottle={16}
                             renderItem={({item}) => {
                               return (
                                 <List item={item} onPress={() => {
                                   route.params.id===user?._id?navigation.navigate( 'ListOverview', {
                                     id: item?._id,
                                     title: item?.name
                                   }):
                                   navigation.navigate( 'UserListOverview', {
                                     id: item?._id,
                                     title: item?.name
                                   })
                                 }}/>

                               );
                             }}
          />}

        <Animated.View style={{...styles.up, opacity: scrolling}}>
          <TouchableOpacity onPress={() => {
            scrollRef?.current?.scrollToOffset({ animated: true, offset: 0 });
          }}>
            <Ionicons name={'arrow-up'} color={'white'} size={30}/>
          </TouchableOpacity>
        </Animated.View>
      </View>
  );
};
const List = ({item, onPress}) => {

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.listItem} onPress={onPress}>
      <View style={styles.rowBetween}>
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={{color:MAIN_GREY_SKELETON}}>{item?.films?.length} films</Text>
      </View>
      {item?.films?.length > 0 ?
        <FlatList horizontal scrollEnabled={false} showsHorizontalScrollIndicator={false} data={item?.films?.slice(0,10)} renderItem={({item,index})=>{
        return (

          <Image source={{uri: IMG_URI + item?.poster}} style={{
            width: normalize(90),
            height: normalize(140),
            // borderTopLeftRadius:index===0?5:0,
            // borderBottomLeftRadius:index===0?5:0,
            // borderTopRightRadius:index===item?.films?.slice(0,10)?.length+1?5:0,
            // borderBottomRightRadius:index===item?.films?.length?5:0
          }}/>
        )}
        }/>:
        // <Image source={item?.films?.length !== 0 ? unknown : {uri: IMG_URI + item?.films[0]?.poster}} style={{
        //   width: '100%',
        //   height: normalize(140),
        //   borderRadius: 10,
        //
        // }}/>
        <View style={{alignItems:'center',justifyContent:'center',height:'50%'}}>
          <Text style={{color:MAIN_GREY_SKELETON}}>Empty</Text>
        </View>

      }
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({

  scroll: {
    flex: 1,
    backgroundColor: BLACK
  },
  container: {
    flex: 1, backgroundColor: BLACK,
    padding:normalize(15),
  },
  containerCenter: {
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  title: {
    fontSize: normalize(18),
    color: WHITE,
    fontWeight: '500',
    marginBottom: 5
  },
  filmsRow: {
    flexDirection: 'row', alignItems: 'center', width: normalize(300), height: normalize(140)
  },
  up: {
    backgroundColor: MAIN_YELLOW,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: normalize(60),
    height: normalize(60),
    position: 'absolute',
    right: normalize(15),
    bottom: normalize(15)
  },
listItem:{
  marginRight: normalize(30),
  width: '100%',
  borderBottomWidth:1,
  paddingBottom:normalize(5),
  borderColor:MAIN_GREY_FADE,
  height: normalize(140),
  marginBottom:normalize(10)
},
  rowBetween:{
    flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%'
  }

})

export default AllListsScreen;
