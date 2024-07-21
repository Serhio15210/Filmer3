import { API_KEY } from "./apiKey";
import {Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class GetFilms {
  static async getRecommendation(genres,actors) {
    try {
      const locale=await AsyncStorage.getItem('locale')
      const responseGenres =  await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${locale==='ukr'?'uk':'en'}&with_genres=${genres.join(',')}`);
      const responseActors =  await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${locale==='ukr'?'uk':'en'}&with_cast=${actors.join(',')}`);
      const responseMix =  await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${locale==='ukr'?'uk':'en'}&with_genres=${genres.join(',')}&with_cast=${actors.join(',')}`);
      const genreData = await responseGenres.json() ;
      const actorsData = await responseActors.json();
      const mixData = await responseMix.json();
     const data=genreData.results.concat(actorsData.results).concat(mixData.results).filter((item, index, self) =>
       index === self.findIndex((i) => i.id === item.id)
     ).slice(0,10);
      console.log('d',data.length)
      return data

    } catch (error) {
      console.error(error);
    }
  }
  static async getSoonMovies() {

    try {
      const locale=await AsyncStorage.getItem('locale')
      const response =  await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=${locale==='ukr'?'uk':'en'}`);
      const soonData = await response.json();

      return soonData;

    } catch (error) {
      console.error(error);
    }
  }

  static async getPremiereMovies(page) {
    try {
      const locale=await AsyncStorage.getItem('locale')
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=${locale==='ukr'?'uk':'en'}&page=${page}`)
      const premiereData = await response.json();

      return premiereData;

    } catch (error) {
      console.error(error);
    }
  }

  static async getPopularMovies() {
    try {
      const locale=await AsyncStorage.getItem('locale')
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${locale==='ukr'?'uk':'en'}&page=1`)
      const popularData = await response.json();

      return popularData;

    } catch (error) {
      console.error(error);
    }
  }

  static async getDetailFilm(id){
    try {
      const locale=await AsyncStorage.getItem('locale')
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits&language=${locale==='ukr'?'uk':'en'}`)
      const detailData = await response.json();

      return detailData;

    } catch (error) {
      console.error(error);
    }
  }
  static async getSimilarFilm(id){
    try {
      const locale=await AsyncStorage.getItem('locale')
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&sort_by=popularity.desc&language=${locale==='ukr'?'uk':'en'}`)
      const similarFilmsData = await response.json();

      return similarFilmsData;

    } catch (error) {
      console.error(error);
    }
  }
  static async getBestFilms(page=1){
    try {
      const locale=await AsyncStorage.getItem('locale')
      const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=${locale==='ukr'?'uk':'en'}&page=${page}`)
      const bestData = await response.json();

      return bestData;

    } catch (error) {
      console.error(error);
    }
  }
  static async getReviews(id){
    try {
      const locale=await AsyncStorage.getItem('locale')
      const response =   await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=${locale==='ukr'?'uk':'en'}`)
      const reviewsData = await response.json();

      return reviewsData;

    } catch (error) {
      console.error(error);
    }
  }
  static async getRatings(imdb_id){
    try{
      const response =  await fetch(`http://www.omdbapi.com/?i=${imdb_id}&apikey=466b64ca`)
        const ratingsData = await response.json();
      Alert.alert(JSON.stringify(ratingsData))
        return JSON.stringify(ratingsData);



    }catch (error){
      console.log(error)
    }
  }
  static async getTrailer(movie_id){
    try {
      const locale=await AsyncStorage.getItem('locale')
      const response=await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}&language=${locale==='ukr'?'uk':'en'}`)
      const trailer=await response.json()
      return trailer.results
    }catch (error){
      console.log(error)
    }
  }
  static async getFilmVideo(id){
    // console.log(id)
    try {
      const response=await fetch(`https://5117.svetacdn.in/api/short?api_token=z2a7BcGi16NLGFJpS35fyuIuapgEWet1&imdb_id=${id}`)
      const trailer=await response.json()
      console.log(response)
      return trailer.data[0]
    }catch (error){
      console.log(error)
    }
  }

}

