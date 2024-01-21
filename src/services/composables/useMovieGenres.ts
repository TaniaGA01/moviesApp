import { ref } from "vue"
import type { Genre } from '@/services/interfaces/movies.interfaces';
import { options } from '@/services/api/moviesAPI';
import axios from "axios";

export default function useMoviesGenre() {
  const load = ref<boolean>(false)
  const genres = ref<Genre[]>([])

  const getGenres = async () => {
    try {
      const urlGenre: string = `https://api.themoviedb.org/3/genre/movie/list?language=fr`;
      genres.value.push(...(await axios.get(urlGenre, options)).data.genres)
    } catch (error) {
      console.error('Data not found')
    }finally{
      load.value = false
    }
  }
  getGenres()

  return {
    load,
    genres
  }
 }
