import { API_KEY } from "./apiKey";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default class GetFindInfo {

  static async getFilmsByQuery(page,movieQuery) {
    try {
      const locale=await AsyncStorage.getItem('locale')
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=${locale==='ukr'?'uk':'en'}&query=${movieQuery}&page=${page}`)
      const premiereData = await response.json();

      return premiereData;

    } catch (error) {
      console.error(error);
    }
  }
  static async getSerialsByQuery(page,serialQuery) {
    try {
      const locale=await AsyncStorage.getItem('locale')
      const response = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=${locale==='ukr'?'uk':'en'}&query=${serialQuery}&page=${page}`)
      const premiereData = await response.json();

      return premiereData;

    } catch (error) {
      console.error(error);
    }
  }
  static async getFilterMovies(page,years,id,query) {
    try {
      const locale=await AsyncStorage.getItem('locale')
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${locale==='ukr'?'uk':'en'}&sort_by=popularity.desc&include_adult=false&include_video=false&query=${query}&page=${page}&primary_release_year=${years}&with_genres=${id}&with_watch_monetization_types=flatrate`)
      const filterData = await response.json();

      return filterData;

    } catch (error) {
      console.error(error);
    }
  }
}
