import {Dimensions, StyleSheet} from "react-native";

export const DarkThemeStyles =  StyleSheet.create({

    carouselImage: {
        width: 200,
        height: 320,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,2)'
    },
    carouselText: {
        paddingLeft: 14,
        color: "white",
        width:200,
        textAlign:'center',

        fontWeight: "bold",
        alignSelf:'center'

    },
    carouselIcon: {
        position: 'absolute',
        top: 15,
        right: 15
    },
    carouselContentContainer: {
        flex: 1,
        backgroundColor: '#000',
        height: 500,
        paddingHorizontal: 14,
    },
    SearchboxContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        width: '95%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        elevation: 10,
        borderRadius: 4,
    },
    Searchbox: {
        padding: 12,
        paddingLeft: 20,
        fontSize: 16,
    },
    SearchboxIcon: {
        position: 'absolute',
        right: 20,
        top: 14
    },
    ImageBg: {
        flex: 1,
        height: null,
        width: null,
        opacity: 1,
        justifyContent: 'flex-start',
    },
    carouselContainerView: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop:20,
        paddingBottom:30
    },
    carousel: {
        flex: 1,
        overflow: 'visible',
    },
    movieInfoContainer: {
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'space-between',
        width: Dimensions.get('window').width
    },
    movieName: {
        paddingLeft: 14,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 6
    },
    movieStat: {
        paddingLeft: 14,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        opacity: 0.8
    },
    playIconContainer: {
        backgroundColor: '#212121',
        padding: 18,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 25,
        borderWidth: 4,
        borderColor: 'rgba(2, 173, 148, 0.2)',
        marginBottom: 14
    },

    listTitle:{
        backgroundColor:'black',
        flexDirection: "row",
        justifyContent:'space-between',
        padding:10

    },
    viewAll:{
        color: '#DAA520', fontSize: 14,
        fontWeight: 'normal'
    },
    listTitleText:{
        color: '#DAA520', fontSize: 24, fontWeight: 'bold', marginLeft: 10, marginVertical:10
    },

    filmItemView:{
        flex: 1,
        marginBottom: 20,
        width: "100%",
        borderWidth: 1,
        borderColor: "black",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 10,
        backgroundColor:"#333333"
    },
    filmItemVoteView: {
        backgroundColor:"#DAA520",height:"100%",width:48,borderRadius:8,borderTopLeftRadius:0,borderBottomLeftRadius:0,alignItems:'center',justifyContent:'center'
    },
    filmItemVoteViewText:{
        color:"white"
    },
    filmItemText:{
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        padding: 20,
        textAlign: "center",
        alignSelf:'center'
    },
    findScreenFilter:{
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:"row",
        fontSize: 100,
        color: 'white',
        fontFamily: 'Times New Roman',
        paddingLeft: 30,
        paddingRight: 30,
        textShadowColor: '#585858',
        textShadowOffset: {width: 5, height: 5},
        textShadowRadius: 10,
        width: "100%",
        borderWidth:2,
        borderBottomWidth:2,
        borderRadius:10,
        height:50,
        borderColor:"black"
    },
    findScreenTitle:{
        color: '#DAA520', fontSize: 30,textAlign:"center"
    },
    findScreenFilterText:{

        paddingRight: 30,paddingTop:10,color:"#DAA520"
    },
    findScreenFilterTextBorders:{
        borderRightWidth:1,borderColor:"#DAA520"
    },
    findScreenInput:{
        fontSize: 20,
        fontWeight: '300',
        padding: 20,
        alignSelf:"center",
        width: 300,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 40,
        borderWidth:2,
        borderColor:"black",

    },
    genreListText:{
        color: 'white',
        fontSize: 10,
        fontWeight: '700',
        padding: 14,
        borderWidth: 1,
        borderColor: "#DAA520",
        borderRadius:5,
        textAlign: 'center',
        width: 150,
    },

    yearListText:{
        color: 'white',
        fontSize: 10,
        fontWeight: '700',
        padding: 15,
        borderWidth:1,
        borderColor:"#DAA520",
        borderRadius:5,
        textAlign:'center',
        width: 100,
    },
    name:{
        fontSize:24,fontWeight:"700",marginBottom:5,color:"white",alignSelf:'center'
    },
    actorsName:{
        fontSize:24,fontWeight:"700",marginBottom:5,color:"#DAA520",alignSelf:'center'
    },
    text:{
        color:"white"
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
    textUnder:{

        color:"#DC143C"
    },
    textActors:{
        color:"white",
        fontSize:15
    },
    titles:{
        marginBottom:20,
        color:"#DAA520",
        fontSize:25
    },
    actorTitles:{
        marginBottom:20,
        color:"#DAA520",
        fontSize:25
    },
    textInfoActors: {
        color:'white',
        fontSize: 15,
    },
    similarFilms:{
        marginRight: 20, width: 200
    },
    images:{
        position: "absolute", height: 5, width: 200, backgroundColor: "#DAA520", opacity: 0.8
    },
    moreText:{
        color:"#DAA520"
    },
    actorsFilms:{
        marginRight: 20, width: 200
    },
    detailCast:{
        width: 132, marginRight: 10,  borderRadius: 5
    },
    detailReviews: {
        borderWidth: 1, backgroundColor: "transparent",borderColor:'white'
    },
    detailListName:{
        fontWeight: "700", marginBottom: 5, color: "white", fontSize: 25
    },
    detailListEditButton:{
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 10,
        width: 50,
        borderColor: "#DAA520",
        marginLeft:10
    },
    detailListFindButton:{
        borderBottomWidth:2,borderColor:"#DAA520",width:200,color:"#333333"
    },
    detailListSortButton:{
        padding: 3,
        borderWidth: 2,
        borderRadius: 10,
        width: 100,
        alignItems: 'center',
        margin: 10,
        borderColor: "#DAA520",
        color:'white'
    },
    detailListAddButton:{
        width: 50,
        marginLeft: "20%",
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "#DAA520",
        right:10,
        color:"white"
    },
    detailListDelButton:{
        borderWidth: 2,
        borderRadius: 10,
        padding:5,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#DAA520",


    },
    detailListButtonsText:{
        color:'white'

    },
    detailListAddFilmButton:{
        alignItems: 'center',
        top: -20,
        borderWidth: 2,
        borderColor: '#DAA520',
        width: 200,
        borderRadius: 10,
        height: 50,
        justifyContent: 'center', alignSelf: 'center'
    },
    addListCancelButton:{
        alignItems: 'center', width: 50,justifyContent:'center',backgroundColor:'#DAA520',height:50,alignSelf:'center',borderColor: "#DAA520",borderWidth:2,borderBottomRightRadius:10,borderTopRightRadius:10
    },
    addListSearchInput:{
        width:250,height:50,padding:5,borderWidth:2, borderColor: "#DAA520",borderBottomLeftRadius:10,borderTopLeftRadius:10,color:'white'
    },
    editProfileContainer:{
        flex:1, backgroundColor:'#333333'
    },
    findUsersInfoTitle:{
        color:'#DAA520',
        fontSize:30
    },
    userItem:{
        alignSelf:'flex-start',padding:10,backgroundColor:'black',elevation:5,borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between' ,marginBottom:15,marginLeft:5
    }
})
