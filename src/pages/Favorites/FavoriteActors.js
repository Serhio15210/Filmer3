import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Animated, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {normalize} from "../../responsive/fontSize";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {data} from "../../constants/genres";
import {MAIN_GREY, MAIN_GREY_FADE, MAIN_RED} from "../../constants/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
// import GetActorsInfo from "../../api/GetActorsInfo";
// import SearchActorItem from "../../components/SearchActorItem";
import {IMG_URI} from "../../api/apiKey";
import {saveFavActors} from "../../api/auth";
import {useTheme} from "../../providers/ThemeProvider";
import {useAuth} from "../../providers/AuthProvider";

const FavoriteActors = () => {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const {i18n} = useTheme()
  const {setIsNewUser} = useAuth()
  const slideUpAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [animate, setAnimate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  const [actors, setActors] = useState([])
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectActors, setSelectActors] = useState([])
  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(slideUpAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const stopAnimation = () => {
    Animated.parallel([
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const getActorsInfo = async () => {
    // setPageLoading(true)
    // const res = await GetActorsInfo.getPopularActors(page)
    //
    // setActors((prev)=>prev.concat(res.results))
    // setTotalPages(res.total_pages > 500 ? 500 : res.total_pages)
    // setPageLoading(false)
  }
  const handleEndReached = () => {
    page<totalPages&&setPage((prev)=>prev+1)
  };
  const saveActors=()=>{

    setLoading(true)
    saveFavActors(selectActors).then(res=>{
      if (res.success){
        setIsNewUser(false)
        navigation.reset({
          index:0,
          routes:[{name:'HomeRoot'}]
        })
      }
      setLoading(false)
    })
  }
  useEffect(() => {
    isFocused ? startAnimation() : stopAnimation()
  }, [isFocused])
  useEffect(()=>{
    getActorsInfo()
  },[page])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('chooseFavoriteActors')}:</Text>

      <Animated.View
        style={[
          styles.block,
          {
            opacity: opacityAnim,
            transform: [
              {
                translateY: slideUpAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [normalize(550), 0],
                }),
              },
            ],
          },
        ]}
      >
        <FlatList showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.flat}
                  style={{width: '100%'}} data={actors} numColumns={2}
                  initialNumToRender={10}
                  renderItem={({item, index}) => {
                    return(

                      <FavoriteActorItem  key={item?.id} item={item} index={index} selected={selectActors.includes(item?.id)} onPress={()=>{
                        selectActors.includes(item.id) ?
                          setSelectActors((prev) => prev.filter(actor => actor !== item?.id)) :
                          setSelectActors((prev) => prev.concat([item?.id]))
                      }}/>

                   )
                  }} keyExtractor={(item, index) => index.toString()}
                  onEndReached={handleEndReached}
                  onEndReachedThreshold={0.5} // Определяет, насколько близко к концу списка нужно прокрутить, чтобы сработало событие onEndReached
                  ListFooterComponent={
                    pageLoading ? <ActivityIndicator color={MAIN_RED} size={30}/> : null
                  }
        />

      </Animated.View>
      <TouchableOpacity disabled={loading} style={styles.nextButton} onPress={saveActors}>
        {loading?<ActivityIndicator color={'white'} size={20}/>:<AntDesign name={'right'} color={'white'} size={20}/>}
      </TouchableOpacity>
    </View>
  );
};
const FavoriteActorItem = ({item,index,onPress,selected}) => {
  return (
    <TouchableOpacity style={{
      backgroundColor: selected?MAIN_GREY:'white',
      elevation: 3,
      maxWidth: '50%',

      flex:1,

      borderRadius: 10,
      marginBottom: normalize(20),
      marginRight:index%2===0?normalize(10):0,
      alignItems:'center'

    }} onPress={onPress}>
      <Image source={{uri:IMG_URI+item?.profile_path}} style={{width:'100%',height:normalize(200),borderTopRightRadius:10,borderTopLeftRadius:10}} resizeMode={'cover'}/>
      <Text style={{color:'black',fontSize:normalize(18),fontWeight:'600',paddingHorizontal:normalize(5)}} numberOfLines={2} adjustsFontSizeToFit>{item?.name}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: normalize(15)
  },
  block: {
    flex: 1,
    width: '100%',
    marginTop: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  flat:{
    paddingHorizontal: normalize(3),
    paddingBottom: normalize(80),
    paddingTop: normalize(30)
  },
  title: {
    color: 'black', fontSize: normalize(24), fontWeight: '600'
  },
  genre: {
    elevation: 3,
    flex: 1,
    maxWidth: '49%',

    marginBottom: normalize(10),
    borderRadius: 5,
    height: normalize(130),
  },
  picture: {
    width: '100%',
    height: normalize(100),
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  genreText: {
    color: 'black',
    paddingHorizontal: normalize(5),
    textAlign: 'center',
    fontSize: normalize(16),
    flex: 1,
    flexWrap: 'wrap'
  },
  nextButton: {
    backgroundColor: MAIN_RED,
    width: normalize(60),
    height: normalize(60),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: normalize(30),
    right: normalize(30)
  }
});


export default FavoriteActors;
