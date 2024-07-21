import React, {useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import {normalize} from "../../responsive/fontSize";
import {FlatList, Image, Pressable, Text, TouchableOpacity, View} from "react-native";
import {IMG_URI, UNKNOWN_IMG} from "../../api/apiKey";
import {MAIN_RED} from "../../constants/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import {styles} from "./style";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Episodes = ({data}) => {
  const navigation = useNavigation()
  const [overview, setOverview] = useState(null)
  const [openAll, setOpenAll] = useState(false)
  return (
    <FlatList contentContainerStyle={{marginTop: normalize(15), paddingBottom: normalize(15)}}
              showsVerticalScrollIndicator={false}
              data={openAll?data:data.slice(0, 3)} renderItem={({item, index}) => {
      return <View style={{
        marginBottom: normalize(10),
        backgroundColor: 'white',
        elevation: 3,
        width: '99%',
        alignSelf: 'center',
        borderRadius: 5,
        paddingRight: normalize(5),
        minHeight:normalize(150)
      }}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Image source={item?.still_path ? {uri: IMG_URI + item?.still_path} : UNKNOWN_IMG}
                 style={{
                   width: normalize(170),
                   height: normalize(100),
                   borderTopLeftRadius: 5,
                   marginRight: normalize(10)
                 }}
                 resizeMode={'contain'}/>
          <Text style={{color: 'black', fontSize: normalize(18), fontWeight: '500', flex: 1, textAlign: 'center'}}
                numberOfLines={3}>{item?.name}</Text>

          <View style={{alignSelf: 'flex-start'}}><Text
            style={{color: 'black', fontSize: normalize(14)}}><AntDesign name={'star'} color={MAIN_RED}
                                                                         style={{marginRight: normalize(10)}}/>{item?.vote_average}
          </Text></View>

        </View>

        {item?.overview&&<View style={{marginTop: normalize(10), paddingHorizontal: normalize(5)}}>
          <Text style={styles.text} numberOfLines={overview === index ? 0 : 3}>{item?.overview}</Text>
          <Pressable style={{alignSelf: 'center'}} onPress={() => setOverview(overview === index ? null : index)}>
            {overview === index ? <Text style={{...styles.text, color: MAIN_RED}}>Приховати</Text> :
              <MaterialIcons name={'more-horiz'} color={MAIN_RED} size={normalize(40)}/>}
          </Pressable>
        </View>}
      </View>
    }} ListFooterComponent={<TouchableOpacity
      onPress={()=>setOpenAll(!openAll)}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: normalize(10)
      }}><Text
      style={{fontSize: normalize(18), color: MAIN_RED, fontWeight: '600'}}>{!openAll?'Усі':'Приховати'}</Text></TouchableOpacity>}/>
  );
};

export default Episodes;
