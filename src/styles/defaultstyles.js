import { Dimensions, StyleSheet } from "react-native";
import {normalize} from "../responsive/fontSize";


export const DefaultStyles = StyleSheet.create({

  carouselImage: {
    width: 200,
    height: 320,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,2)",
  },
  carouselText: {
    paddingLeft: 14,
    color: "white",
    width:200,
    textAlign:'center',
    paddingRight:normalize(15),
    fontWeight: "bold",
    alignSelf:'center',
    fontFamily:'Kanit-Black'

  },
  carouselIcon: {
    position: "absolute",
    top: 15,
    right: 15,

  },
  carouselContentContainer: {
    flex: 1,
    backgroundColor: "#000",
    height: normalize(480),
    paddingHorizontal: 14,
  },
  SearchboxContainer: {
    flexDirection: "row",
    marginVertical: 20,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#fff",
    elevation: 10,
    borderRadius: 4,
  },
  Searchbox: {
    padding: 12,
    paddingLeft: 20,
    fontSize: 16,
  },
  SearchboxIcon: {
    position: "absolute",
    right: 20,
    top: 14,
  },
  ImageBg: {
    flex: 1,
    height: null,
    width: null,
    opacity: 1,
    justifyContent: "flex-start",
  },
  carouselContainerView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: normalize(5),
    paddingBottom:30
  },
  carousel: {
    flex: 1,
    overflow: "hidden",
  },
  movieInfoContainer: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-between",
    width: Dimensions.get("window").width,
  },
  movieName: {
    paddingLeft: 14,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 6,
  },
  movieStat: {
    paddingLeft: 14,
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    opacity: 0.8,
  },
  playIconContainer: {
    backgroundColor: "#212121",
    padding: 18,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 25,
    borderWidth: 4,
    borderColor: "rgba(2, 173, 148, 0.2)",
    marginBottom: 14,
  },

  listTitle: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:normalize(10),
    paddingBottom:0,
    width:'100%'
  },
  viewAll: {
    color: "black", fontSize: 14,
    fontWeight: "normal",
  },
  listTitleText: {
    color: "black", fontSize: 24, fontWeight: "bold", marginLeft: normalize(0), marginVertical: 10,
    fontFamily:'Kanit-Black'

  },

  filmItemView: {
    flex: 1,
    marginBottom: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "#DC143C",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor:"white"

  },
  filmItemText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",

  },
  filmItemVoteView: {
    backgroundColor:"#DC143C",height:"100%",width:48,borderRadius:7,borderTopLeftRadius:0,borderBottomLeftRadius:0,alignItems:'center',justifyContent:'center'
  },
  filmItemVoteViewText:{
    color:"black"
  },
  findScreenFilter: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    fontSize: 100,
    color: "white",
    fontFamily: "Times New Roman",
    paddingLeft: 30,
    paddingRight: 30,
    textShadowColor: "#585858",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    width: "100%",
    borderWidth: 2,
    borderColor: "#DC143C",
    borderBottomWidth: 2,
    borderRadius: 10,
    height: 50,
  },
  findScreenTitle: {
    color: "black", fontSize: 30, textAlign: "center",
  },
  findScreenFilterText: {

    paddingRight: 30, paddingTop: 10, color: "black",
  },
  findScreenFilterTextBorders: {
    borderRightWidth: 1, borderColor: "#DC143C",
  },
  findScreenInput: {
    fontSize: 20,
    fontWeight: "300",
    padding: 20,
    top: 30,
    width: 300,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 40,
    borderWidth: 2,
    borderColor: "#DC143C",
    alignSelf: "center",
  },
  genreListText: {
    color: "black",
    fontSize: 10,
    fontWeight: "700",
    padding: 14,
    borderWidth: 1,
    borderColor: "#DC143C",
    borderRadius: 5,
    textAlign: "center",
    width: 150,
  },

  yearListText: {
    color: "black",
    fontSize: 10,
    fontWeight: "700",
    padding: 15,
    borderWidth: 1,
    borderColor: "#DC143C",
    borderRadius: 5,
    textAlign: "center",
    width: 100,
  },
  name: {
    fontSize: 24, fontWeight: "700", marginBottom: 5, color: "white", alignSelf: "center",textAlign:'center'
  },
  actorsName: {
    fontSize: 24, fontWeight: "700", marginBottom: 5, color: "black", alignSelf: "center",
  },
  text: {
    color: "white",

  },
  textReviews: {
    borderWidth: 2,
    padding: 10,
    margin: 10,
    borderColor:'white',
    borderRadius: 10,
    backgroundColor: "white",
    width: "auto",

  },
  textUnder: {

    color: "#DC143C",
  },
  textActors: {
     color:'white',
    fontSize: 15,
  },
  textInfoActors: {
    color:'black',
    fontSize: 15,
  },
  titles: {
    marginBottom: 20,
    color: "white",
    fontSize: 25,
  },
  actorTitles: {
    marginBottom: 20,
    color: "black",
    fontSize: 25,
  },
  similarFilms: {
    marginRight: 20, width: 200
  },
  actorsFilms: {
    marginRight: 20, width: 200
  },
  images: {
    position: "absolute", height: 5, width: 200, backgroundColor: "#DC143C", opacity: 0.8,
  },
  moreText: {
    color: "#DC143C",
  },
  mainDetailView: {

  },
  detailCast: {
    width: 132, marginRight: 10,  borderRadius: 5
  },
  detailReviews: {
    borderWidth: 1, backgroundColor: "transparent",borderColor:'white'
  },
  filterContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 40,
    width: 300,
  },
  filterDropdown: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#DC143C",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterPlaceholderStyle: {
    fontSize: 16,
  },
  filterSelectedTextStyle: {
    fontSize: 14,

  },
  filterIconStyle: {
    width: 20,
    height: 20,
  },
  filterInputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  filterIcon: {
    marginRight: 5,
  },
  filterItem: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterSelectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "white",
    shadowColor: "#DC143C",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  filterTextSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
    shadowColor: "#DC143C",
  },
  filterTextItem: {
    flex: 1,
    fontSize: 16,
  },
detailListName:{
  fontWeight: "700", marginBottom: 5, color: "black", fontSize: 30
},
  detailListEditButton:{
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
    width: 50,
    borderColor: "#DC143C",
    marginLeft:10,
    color:'white'
  },
  detailListFindButton:{
    borderBottomWidth:2,borderColor:"#DC143C",width:200
  },
  detailListSortButton:{
    padding: 3,
    borderWidth: 1,
    elevation:10,
    borderRadius: 10,
    backgroundColor:'white',
    width: 100,
    alignItems: 'center',
    margin: 10,
    height:30,
    borderColor: "#DC143C"
  },
  detailListAddButton:{
     height:35,
    backgroundColor:'white',
    elevation:5,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius:10,
    // borderWidth: 2,
    // borderRadius: 60,


  },
  detailListDelButton:{
    borderWidth: 2,
    borderRadius: 10,
    padding:5,
    alignItems: 'center',
    justifyContent: 'center',



    borderColor: "#DC143C",

  },
  detailListAddFilmButton:{
    alignItems: 'center',
    top: -20,
    borderWidth: 2,
    borderColor: '#DC143C',
    width: 200,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center', alignSelf: 'center'
  },
  detailListButtonsText:{
    color:'black'

  },
  addListCancelButton:{
    alignItems: 'center', width: 50,justifyContent:'center',backgroundColor:'#DC143C',height:50,alignSelf:'center',borderColor: "#DC143C",borderWidth:2,borderBottomRightRadius:10,borderTopRightRadius:10
  },
  addListSearchInput:{
    width:250,height:50,padding:5,borderWidth:2, borderColor: "#DC143C",borderBottomLeftRadius:10,borderTopLeftRadius:10,color:'black'
  },
  editProfileContainer:{
    flex:1,  backgroundColor:'#DC143C'
  },
  findUsersInfoTitle:{
    color:'black',
    fontSize:30
  },
  userItem:{
    alignSelf:'flex-start',padding:10,backgroundColor:'white',elevation:5,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between' ,marginBottom:15,marginLeft:5
  }
});
