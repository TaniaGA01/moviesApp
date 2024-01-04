import axios from 'axios';
import { ref } from 'vue';
import type { Movie, Genre } from '@/services/interfaces/movies.interfaces';
import { options } from '@/api/moviesAPI';

export default function useService(){

  let load = ref<any>(false)
  let movies = <Movie[]>[]
  let genres = <Genre[]>[]

  const getMovies = async() => {

    load.value = true

    try {

      const apiBaseUrl:string = 'https://api.themoviedb.org/3';

      for (let i = 1; i < 6; i++) {
        const urlMovies = `${apiBaseUrl}/discover/movie?include_adult=false&include_video=false&language=fr-FR&region=FR&sort_by=popularity.desc&page=${i}`;
        const pageOfMovies = [...(await axios.get(urlMovies, options)).data.results]
        movies.push(...pageOfMovies)
      }

      const urlGenre:string = `${apiBaseUrl}/genre/movie/list?language=fr`;
      genres.push(...(await axios.get(urlGenre, options)).data.genres)

    } catch (error) {
      console.error('Not data found')
    } finally{
      load.value = false
    }

  }

  return{
    load, movies, genres, getMovies
  }
}



