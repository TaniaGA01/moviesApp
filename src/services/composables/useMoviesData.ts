import { ref } from "vue"
import type { Movie, MoviesData } from '@/services/interfaces/movies.interfaces';
import { options } from '@/services/api/moviesAPI';
import axios from "axios";

export default function useDataMovies() {
  const url = ref<string>()
  const data = ref<MoviesData>()
  const load = ref<boolean>(false)
  const movies = ref<Movie[]>([])
  const respData = ref<Movie[]>([])
  const title = ref<string>()
  const year = ref<string>()
  const rating = ref<number>()
  const page = ref<number>(1)
  const totalPages = ref<number>(0)
  const totalResults = ref<number>(0)
  const perPage = ref<number>(20)


  const getAllPages = async (pageNumber:number = page.value, titleValue = title.value, yearValue = year.value) => {
    load.value = true

    titleValue === undefined || yearValue === undefined
    ? url.value = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&region=FR&sort_by=popularity.desc&page=${pageNumber}`
    : url.value = `https://api.themoviedb.org/3/search/movie?query=${titleValue}&include_adult=false&language=fr-FR&page=${pageNumber}&year=${yearValue}`

    try {
      data.value = (await axios.get(url.value as string, options)).data
    } catch (error) {
      console.log('Data not found', error)
    } finally{
      load.value = false
    }

    if (data.value) {
      totalPages.value = data.value.total_pages
      totalResults.value = data.value.total_results
      page.value = data.value.page
      respData.value = data.value.results

      if(yearValue === undefined && pageNumber === 1){
        rating.value = respData.value[0].popularity
      }
    }
  }
  getAllPages(page.value, title.value, year.value)

  const searchRequestValues = (titleValue:string = '', yearValue:string = '') => {
    title.value = titleValue
    year.value = yearValue
  }

  return {
      load,
      movies,
      respData,
      totalPages,
      totalResults,
      perPage,
      page,
      title,
      year,
      rating,
      getAllPages,
      searchRequestValues
  };

}



