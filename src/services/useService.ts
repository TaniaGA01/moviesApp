import axios from 'axios';
import { onMounted, ref } from 'vue';
import type { Movie, Genre } from '@/services/interfaces/movies.interfaces';
import { options } from '@/api/moviesAPI';

export default function useService(){

  let load = ref<any>(false)
  let movies = ref<Movie[]>([])
  let genres = ref<Genre[]>([])

  const apiBaseUrl:string = 'https://api.themoviedb.org/3';

  const getPages = async() => {
    load.value = true

    try {

      const urlMovies = `${apiBaseUrl}/discover/movie?include_adult=false&include_video=false&language=fr-FR&region=FR&sort_by=popularity.desc&page=1`;

      const pageOfMovies = (await axios.get(urlMovies, options)).data.results
      movies.value.push(...pageOfMovies)

    } catch (error) {
      console.error('Not data found')
    } finally{
      load.value = false
    }
  }

  const getMovies = async() => {

    load.value = true

    try {

      for (let i = 1; i < 50; i++) {
        const urlMovies = `${apiBaseUrl}/discover/movie?include_adult=false&include_video=false&language=fr-FR&region=FR&sort_by=popularity.desc&page=${i}`;
        const pageOfMovies = [...(await axios.get(urlMovies, options)).data.results]
        movies.value.push(...pageOfMovies)
      }

      const urlGenre:string = `${apiBaseUrl}/genre/movie/list?language=fr`;
      genres.value.push(...(await axios.get(urlGenre, options)).data.genres)

    } catch (error) {
      console.error('Not data found')
    } finally{
      load.value = false
    }

  }

  return{
    load, movies, genres, getPages, getMovies
  }
}



