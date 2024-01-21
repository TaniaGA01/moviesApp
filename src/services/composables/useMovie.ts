import { ref } from "vue"
import type { OneMovie } from '@/services/interfaces/oneMovie.interfaces';
import { options } from '@/services/api/moviesAPI';
import axios from "axios";

export default function useMovie() {
  const movie = ref<OneMovie>()
  const load = ref<boolean>(false)

  const getMovie = async (movieId: string) => {
    load.value = true
    try {
      const urlMovie: string = `https://api.themoviedb.org/3/movie/${movieId}?language=fr-FR`;
      const { data } = await axios.get(urlMovie, options)
      return movie.value = data
    } catch (error) {
      console.error('Data not found')
    }finally{
      load.value = false
    }
  }

  return {
    load,
    movie,
    getMovie
  }
 }
