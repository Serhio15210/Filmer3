import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../../providers/AuthProvider";
import ModalContainer from "../ModalContainer";
import { normalize } from "../../responsive/fontSize";
import { AirbnbRating } from "react-native-ratings";
import { useTheme } from "../../providers/ThemeProvider";
import AwesomeButton from "react-native-really-awesome-button";

import { themeColors } from "./themeColors";
import { useGetFilmByIdQuery, userApi } from "../../services/UserService";

import Loading from "../UI/Loading";
import { filmApi } from "../../services/FilmService";

const AddFilmModal = ({open, setOpen, changeUser, selectFilm}) => {
  const {i18n,appTheme} = useTheme()
  const [rate, setRate] = useState(0)
  const [comment, setComment] = useState('')
  const [chosenFilm, setChosenFilm] = useState({})
  const styles=style(themeColors[appTheme])
  const [addToFavorite,{isLoading:isLiking}]=userApi.useLikeFilmMutation()

  const {data:filmData,isLoading:isGettingFilm,error:errorFilm,isSuccess:successFilm}=useGetFilmByIdQuery(selectFilm?.imdb_id)
  useEffect(()=>{
    try{
        if (successFilm){
          setRate(filmData.film?.rate)
          setComment(filmData.film?.comment)
          setChosenFilm({
            imdb_id: filmData.film?.imdb_id + '',
            poster: filmData.film?.poster,
            title: filmData.film?.title,
            rate:filmData.film?.rate,
            comment:filmData.film?.comment,
            isSerial:filmData.film?.isSerial,
            isFavorite:filmData.film.isFavorite
          })
        }else {
          setChosenFilm(selectFilm)
        }
    }catch (e) {
      setChosenFilm(selectFilm)
    }
  },[filmData])

  return (
    <ModalContainer open={open} setOpen={setOpen} position={'flex-end'} padding={0} type={"fade"}>

      <View style={styles.container}>
        {isGettingFilm?<Loading/>:
          <>
        <View style={styles.block}>
          <Text style={styles.title}>{chosenFilm?.title}</Text>
        </View>
        <View style={{...styles.block}}>
          <AirbnbRating
            count={5}
            defaultRating={rate}
            showRating={false}
            onFinishRating={(e) => setRate(e)}
            size={normalize(40)}
            selectedColor={themeColors[appTheme].selectedRate}
            starContainerStyle={{width: '80%', justifyContent: 'space-around'}}
          />
        </View>
        <View style={{...styles.block, borderBottomWidth: 0}}>
          <TextInput style={styles.input} multiline textAlignVertical={'top'} placeholder={`${i18n.t('writeComment')}...`}
                     placeholderTextColor={'rgb(210, 210, 210)'} value={comment} onChangeText={(e)=>setComment(e)}/>
        </View>
        <AwesomeButton
          progress
          onPress={async (next) => {

              await addToFavorite({...chosenFilm, rate: rate, comment: comment})
              if (!isLiking) {
                setOpen(false)
                next()
              }

          }}
          style={{alignSelf: 'center', marginBottom: normalize(10)}}
          width={Dimensions.get('window').width - 30}
          backgroundColor={themeColors[appTheme].buttonBg}
          borderRadius={10}
          backgroundDarker={'white'}
        >
          {i18n.t('add')}
        </AwesomeButton>
          </>}
      </View>

    </ModalContainer>


  );
};
const style = (theme)=> StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.backgroundColor,
    padding: normalize(15),
    borderRadius: 10

  },
  block: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'rgb(210, 210, 210)',
    marginBottom: normalize(20),
    paddingBottom: normalize(20)
  },
  title: {
    color: theme.titleColor, fontWeight: '700', fontSize: normalize(20)
  },
  input: {
    color: theme.titleColor, minHeight: normalize(100)
  },
  button: {
    width: '100%',
    backgroundColor: theme.buttonBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: normalize(20)
  },
  buttonText:{
    color: 'white', fontSize: normalize(18)
  }
})
export default AddFilmModal;
