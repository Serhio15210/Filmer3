import React, { useEffect, useState } from "react";
import {
  Animated as RNAnimated,
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  Pressable, SafeAreaView, StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "../../../providers/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { IMG_URI } from "../../../api/apiKey";
import { MAIN_GREY_FADE } from "../../../constants/colors";
import { normalize } from "../../../responsive/fontSize";
import AnimatedHeader from "../../../components/UI/AnimatedHeader";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Tmdb from "../../../assets/tmdb.svg";
import Crew from "../Crew";
import SimilarFilms from "../similar-films/SimilarFilms";
import Details from "../Details";
import Genres from "../Genres";
import RateInfoModal from "../../../components/filmModals/RateInfoModal";
import Review from "../Review";
import { style } from "../style";
import { themeColors } from "../themeColors";
import { useGetFilmRatingQuery, useGetFilmReviewsQuery } from "../../../services/FilmService";
import {
  useGetMoviesByIdQuery,
  useGetSimilarMoviesQuery,
  useGetTrailerMoviesQuery,
} from "../../../services/MovieService";
import Animated, { FadeInDown } from "react-native-reanimated";
import HeaderFilmSkeleton from "./HeaderFilmSkeleton";

const FilmOverview = ({route}) => {
  const [reviews, setReviews] = useState({all:[],subs:[]});
  const [chosenFilm, setChosenFilm] = useState({})
  const {screenTheme, isDarkTheme,i18n,appTheme,locale} = useTheme();
  const styles = style(themeColors[appTheme])
  const [addFilm, setAddFilm] = useState(false);
  const {id, title,item,fromTitle} = route.params;
  const navigation = useNavigation()
  const [openReview, setOpenReview] = useState(false)
  const [switchButton, setSwitchButton] = useState('cast')
  const [scrollY] = useState(new RNAnimated.Value(0));
  const scrolling = React.useRef(new RNAnimated.Value(0)).current;
  const boxInterpolation = scrolling.interpolate({
    inputRange: [0, 100],
    outputRange: themeColors[appTheme].boxInterpolation,
  })
  const animatedStyle = {
    backgroundColor: boxInterpolation
  }
  const headerBgColor = scrollY.interpolate({
    inputRange: [0, normalize(100), normalize(200)],
    outputRange: themeColors[appTheme].headerBgColor,
    extrapolate: 'clamp',
  });
  const arrowColor = scrollY.interpolate({
    inputRange: [0, normalize(100), normalize(200)],
    outputRange: themeColors[appTheme].arrowColor,
    extrapolate: 'clamp',
  });
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, normalize(100), normalize(200)],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });
  const { data:state, isLoading, error } = useGetMoviesByIdQuery(id,locale);
  const { data:ratingData } = useGetFilmRatingQuery(id);
  const { data:reviewsData, isLoading:isReviewsLoading } = useGetFilmReviewsQuery(id,locale);
  const { data: similarData, isLoading:isSimilarLoading } = useGetSimilarMoviesQuery(id,locale);
  const { data: trailerData } = useGetTrailerMoviesQuery(id,locale);

  const similarFilms=similarData?.results||[]
  const trailer=trailerData?.results?.filter(item=>item?.type==='Teaser')||[]
  useEffect(() => {

    setChosenFilm({
      imdb_id: state?.id + '',
      poster: state?.poster_path,
      title: state?.title,
      rate: 0,
      comment: '',
      isFavorite: false
    })
    // setCast(state.credits?.cast || []);
    // setCrew(state.credits?.crew || []);
  }, [state]);




  return (

      <SafeAreaView style={styles.container} >

        {addFilm && <RateInfoModal selectFilm={chosenFilm} open={addFilm} setOpen={setAddFilm}/>}
        {/*{openTrailer && <TrailerModal isOpen={openTrailer} setIsOpen={setOpenTrailer} trailers={trailer}/>}*/}
        <TouchableOpacity style={styles.add} onPress={() => setAddFilm(true)}>
          <Ionicons name={'add'} color={'white'} size={30}/>
        </TouchableOpacity>

        <AnimatedHeader scrollY={scrollY} title={title} headerOpacity={headerOpacity} headerBgColor={headerBgColor}
                        arrowColor={arrowColor}/>
        <Animated.ScrollView onScroll={RNAnimated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false, throttle: 16}
        )}
                             scrollEventThrottle={16}  >
          {/*<SharedElement id={`${item.id}`}>*/}
          <ImageBackground source={{uri: IMG_URI + state?.backdrop_path}} blurRadius={1}
                           style={{width: '100%', height: normalize(230)}} resizeMode={'cover'}>
            {/*<LinearGradient*/}
            {/*  colors={themeColors[appTheme].posterGradient.reverse()}*/}
            {/*  style={styles.gradient}>*/}
            {/*</LinearGradient>*/}
          </ImageBackground>
          {/*</SharedElement>*/}
          <Animated.View
            entering={FadeInDown.duration(1000)}>
            {isLoading?<HeaderFilmSkeleton enabled={isLoading}/>:
          <View style={styles.block}>
            <View style={styles.titleBlock}>

              <View>
                <Text style={{...styles.title, maxWidth: Dimensions.get('window').width - normalize(150)}}
                      adjustsFontSizeToFit numberOfLines={3}>{state?.title}</Text>
                <Text style={{
                  ...styles.title,
                  maxWidth: Dimensions.get('window').width - normalize(150),
                  fontSize: normalize(12)
                }} adjustsFontSizeToFit numberOfLines={3}>{state?.original_title}</Text>
                <Text style={{
                  ...styles.text,
                  fontWeight: '500',
                  marginTop: normalize(20)
                }}>{state?.release_date?.split('-')[0]} <Text
                  style={{color: themeColors[appTheme].dotColor}}>●</Text> {state?.runtime} m
                </Text>
                <TouchableOpacity style={styles.whiteButton} onPress={()=>{
                  Linking.openURL(`https://www.youtube.com/embed/${trailer[0]?.key}`);
                  // setOpenTrailer(true)
                }}>
                  <Text style={{...styles.text,color:'black'}}>{i18n.t('trailer')}</Text>
                  <FontAwesome5 name={'play'} color={themeColors[appTheme].dotColor} style={{marginLeft: normalize(10)}}/>
                </TouchableOpacity>

              </View>


              <Image source={{uri: IMG_URI + state?.poster_path}} style={styles.poster} resizeMode="contain"/>

              </View>

            {state?.overview&&<View style={{flex: 1, paddingTop: normalize(20)}}>
              <Text style={styles.tagline}>{state?.tagline}</Text>
              <View style={{marginTop: normalize(10)}}>
                <Text style={styles.text} numberOfLines={openReview ? 0 : 3}>{state?.overview}</Text>
                <Pressable style={{alignSelf: 'center'}} onPress={() => setOpenReview(!openReview)}>
                  {openReview ? <Text style={{...styles.text, color: themeColors[appTheme].dotColor}}>{i18n.t('hide')}</Text> :
                    <MaterialIcons name={'more-horiz'} color={themeColors[appTheme].dotColor} size={normalize(40)}/>}
                </Pressable>
              </View>

            </View>}
            <View style={{flex: 1, paddingTop: normalize(20)}}>
              <Text style={{...styles.tagline, fontSize: normalize(18)}}>{i18n.t('ratings')}:</Text>
              <View style={{width: '100%', marginTop: normalize(15)}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/*<Image source={tmdb} style={{width:normalize(25),height:normalize(25)}}/>*/}
                  <Tmdb width={normalize(25)} height={normalize(25)}/>
                  <Text style={styles.text}> TMDB: <Text
                    style={styles.rateText}>{state?.vote_average}</Text></Text>
                </View>
                {ratingData?.rating&&<View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/*<Image source={tmdb} style={{width:normalize(25),height:normalize(25)}}/>*/}
                  <Tmdb width={normalize(25)} height={normalize(25)}/>
                  <Text style={styles.text}> User rating: <Text
                    style={styles.rateText}>{ratingData?.rating}</Text></Text>
                </View>}
              </View>

            </View>

            <View style={{marginTop: normalize(50)}}>
              <View style={styles.rowBetween}>
                <TouchableOpacity
                  style={{...styles.switchButton, borderColor: switchButton === 'cast' ? themeColors[appTheme].dotColor : MAIN_GREY_FADE}}
                  onPress={() => setSwitchButton('cast')}>
                  <Text style={styles.text}>{i18n.t('team')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{...styles.switchButton, borderColor: switchButton === 'details' ? themeColors[appTheme].dotColor : MAIN_GREY_FADE}}
                  onPress={() => setSwitchButton('details')}>
                  <Text style={styles.text}>{i18n.t('details')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{...styles.switchButton, borderColor: switchButton === 'genre' ? themeColors[appTheme].dotColor : MAIN_GREY_FADE}}
                  onPress={() => setSwitchButton('genre')}>
                  <Text style={styles.text}>{i18n.t('genres')}</Text>
                </TouchableOpacity>

              </View>
              {switchButton === 'cast' && <Crew cast={state?.credits?.cast} crew={state?.credits?.crew||[]} navigation={navigation}/>}
              {switchButton === 'details' && <Details data={state}/>}
              {switchButton === 'genre' && <Genres data={state?.genres}/>}

            </View>

            {reviewsData?.reviewsAll?.length>0&&<View style={{marginTop: normalize(50),marginBottom:normalize(20)}}>
              <Text style={styles.castTitle}>{i18n.t('reviews')}:</Text>
              {reviewsData?.reviewsAll?.slice(0,4)?.map((item,index)=>{
                return (
                  <Review item={item} key={index}/>
                )
              })}
              {reviewsData?.reviewsAll?.length<4&&<TouchableOpacity onPress={()=>navigation.navigate('FilmReviews',{id:id,title:state.title})}>
                <Text style={{...styles.text,textAlign:'center',fontWeight:'600',fontSize:normalize(18)}}>{i18n.t('allReviews')}</Text>
              </TouchableOpacity>}

            </View>}
            <SimilarFilms similarFilms={similarFilms} navigation={navigation}/>
          </View>
            }
          </Animated.View>
        </Animated.ScrollView>
      </SafeAreaView>
  )
    ;
};
// FilmOverview.sharedElements = (route,otherRoute, showing) => {
//   const {item,fromTitle}=route.params
//   console.log(otherRoute);
//   if ((otherRoute.route.name === 'FilmOverview') && showing) {
//     if (showing) {
//       // Возвращаем элементы только при входе на экран
//       return [
//         {
//           id: `${item.id}`,
//           animation: 'move',
//           resize: 'stretch',
//           align: 'auto'
//         }
//       ];
//     } else {
//       // Ничего не возвращаем при выходе из экрана
//       return [];
//     }
//   }
//
// };


export default FilmOverview;
