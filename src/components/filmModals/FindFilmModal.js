import React, {useEffect, useRef, useState} from 'react';
import GetFindInfo from "../../api/GetFindInfo";
import {ActivityIndicator, FlatList, Modal, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {MAIN_GREY_FADE, MAIN_RED} from "../../constants/colors";
import {normalize} from "../../responsive/fontSize";
import SwitchButtons from "../UI/SwitchButtons";

import LinearGradient from "react-native-linear-gradient";
import Feather from "react-native-vector-icons/Feather";
import {useTheme} from "../../providers/ThemeProvider";

const FindFilmModal = ({open, setOpen, isFavorite, listData, setListData, isListCreated, onPressSuccess}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const {screenTheme, isDarkTheme,i18n} = useTheme();
  const [isLoading, setIsLoading] = useState(false)
  const [isFilm, setIsFilm] = useState(true)
  const [page, setPage] = useState(1);
  const [state, setState] = useState([]);
  const [newFilms, setNewFilms] = useState([]);

  const details = screenTheme;
  let scrollPageRef=useRef()
  const getFindInfo = () => {
    scrollPageRef?.current?.scrollToTop?.({animated: true})
    isFilm ? GetFindInfo.getFilmsByQuery(page, searchQuery).then((response) => {

      setState(response.results);
      setIsLoading(false)
    }) : GetFindInfo.getSerialsByQuery(page, searchQuery).then((response) => {

      setState(response.results);
      setIsLoading(false)
    })

  }
  const isFilmWasAdded = (id) => {
    return listData?.filter(film => film.imdb_id === id).length !== 0

  }
  const isOldFilm = (id) => {

    return listData?.filter(film => film.imdb_id === id).length !== 0

  }
  useEffect(() => {

    setIsLoading(true)
    getFindInfo()

  }, [searchQuery, page, isFilm]);

  const addFilmsToList = (item) => {
    if (isFilmWasAdded(item?.id + '')) {
      setNewFilms((prev) => {
        return prev.filter(film => film?.imdb_id !== item?.id + '')
      })
    } else {
      setNewFilms((prev) => {
        return prev.concat([{
          imdb_id: item?.id + '',
          poster: item?.poster_path,
          title: item?.title,
          rate: 0,
          comment: '',
          isSerial:!isFilm,
          isFavorite:isFavorite
        }])
      })
    }
  }
const addFilms=(newFilm)=>{
    if (!isListCreated){

      setListData((prev)=>{
        return prev.concat([{
          imdb_id: newFilm.id+'',
          poster: newFilm.poster_path,
          title: isFilm?newFilm.title : newFilm.name,
          rate:0,
          comment:'',
          isSerial:!isFilm,
          isFavorite:isFavorite
        }])
      })
    }else {
      onPressSuccess({
        imdb_id: newFilm.id+'',
        poster: newFilm.poster_path,
        title: isFilm?newFilm.title : newFilm.name,
        rate:0,
        comment:'',
        isSerial:!isFilm,
        isFavorite:isFavorite
      })
    }
    setOpen(false)
}
  return (
    <Modal
      animationType="slide"
      visible={open}
    >
      <LinearGradient colors={[MAIN_RED,'white','white', 'white']}
                        style={styles.container}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
                            onPress={() => {
                              setOpen(false)
                            }}
          >
            <AntDesign name="close" color={"white"} size={30}/>
          </TouchableOpacity>
          {/*<TouchableOpacity*/}
          {/*                  onPress={() => {*/}
          {/*                   addFilms()*/}
          {/*                  }}*/}
          {/*>*/}
          {/*  <AntDesign name="check" color={"white"} size={30}/>*/}
          {/*</TouchableOpacity>*/}
        </View>

        <View style={styles.inputBlock}>
          <View style={{ marginBottom: normalize(20)}}>
            <TextInput style={styles.input} placeholder={i18n.t('enterName')} placeholderTextColor={MAIN_GREY_FADE}
                       value={searchQuery}
                       onChangeText={text => setSearchQuery(text)} />
            <View style={styles.search}>
              <Feather name={'search'} size={20} color={'white'}/>
            </View>
          </View>


          <SwitchButtons right={i18n.t('serial')} left={i18n.t('film')} onSwitch={setIsFilm} switchValue={isFilm}/>
        </View>
        <View style={{flex: 1}}>
          {/*{isLoading ?*/}
          {/*  <View style={styles.loadBlock}>*/}
          {/*    <ActivityIndicator size="large" color={isDarkTheme ? "#DAA520" : "#DC143C"}/></View> :*/}
          {/*  !searchQuery? <View style={styles.loadBlock}><Feather name={'search'} size={50} color={MAIN_GREY_FADE}/></View>:*/}
          {/*  <FlatList ref={scrollPageRef} data={state} contentContainerStyle={{paddingTop: normalize(40),paddingBottom:normalize(40)}} renderItem={({item, index}) => {*/}
          {/*    return (*/}
          {/*      <SelectFilmItem key={index} item={item} isSelected={isFilmWasAdded(item?.id + '')}*/}
          {/*                      onPress={() => {*/}
          {/*                        // addFilmsToList(item)*/}
          {/*                        addFilms(item)*/}
          {/*                      }} isOld={isOldFilm(item?.id + '')}/>*/}
          {/*    )*/}
          {/*  }*/}
          {/*  }*/}
          {/*    //           onEndReached={()=>{*/}
          {/*    // setPage(page+1)}*/}
          {/*    // }*/}
          {/*    ListFooterComponent={*/}
          {/*      <>{state?.length>0&&<View style={{...styles.buttonRow,paddingLeft:normalize(10),paddingRight:normalize(10)}}>*/}
          {/*      <TouchableOpacity style={{...styles.pageButton,opacity:page ===0?0.6:1}} onPress={()=>{*/}
          {/*      setPage(page-1)}*/}
          {/*      }>*/}
          {/*        <AntDesign name={'arrowleft'} size={30} color={'black'}/>*/}
          {/*      </TouchableOpacity>*/}
          {/*      <TouchableOpacity style={styles.pageButton} onPress={()=>{*/}
          {/*        setPage(page+1)}*/}
          {/*      }>*/}
          {/*        <AntDesign name={'arrowright'} size={30} color={'black'}/>*/}
          {/*      </TouchableOpacity>*/}
          {/*      </View>}</>}*/}
          {/*  />*/}


          {/*  // <ScrollView style={{paddingTop:normalize(40)}}>*/}
          {/*  //   {state?.map((item, index) => {*/}
          {/*  //     return (*/}
          {/*  //        <SelectFilmItem key={index} item={item}/>*/}
          {/*  //     )*/}
          {/*  //   })}</ScrollView>*/}
          {/*}*/}
        </View>

      </LinearGradient>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, padding: normalize(15), paddingTop: normalize(20)
  },
inputBlock:{
  padding: normalize(10),paddingTop:normalize(30)
},
  loadBlock:{
    flex: 1,
    justifyContent: "center",
    alignItems:'center',
    paddingTop: normalize(20)
  },
  input: {
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 10,
    width: '95%',
    color: 'black',
    alignSelf: 'center',
    paddingLeft: normalize(15),
    fontSize: normalize(18),
    paddingRight:normalize(50)

  },
  buttonRow:{
    width: '100%',flexDirection:'row', alignItems: 'center', justifyContent: 'center'
  },
  pageButton:{
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    width: normalize(100),
    height: normalize(50),
    alignItems: 'center',
    justifyContent: 'center'
  },
  search:{
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    backgroundColor:MAIN_RED,
    alignItems:'center',
    justifyContent:'center',
    width:normalize(50),
    height:'100%',
    position:'absolute',
    right:0
  }

})
export default FindFilmModal;
