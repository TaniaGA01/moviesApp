import { ref } from "vue"
import type { Movie, Genre } from '@/services/interfaces/movies.interfaces';
import { options } from '@/api/moviesAPI';
import axios from "axios";

export default function usePagination() {

  const load = ref<boolean>(false)
  const movies = ref<Movie[]>([])
  const genres = ref<Genre[]>([])
  const respData = ref<Movie[]>([])
  const title = ref<string>()
  const year = ref<string>()
  const rating = ref<number>()
  const page = ref<number>(1)
  const totalPages = ref<number>(0)
  const totalResults = ref<number>(0)
  const perPage = 20


  const getAllPages = async (pageNumber:number = page.value, titleValue = title.value, yearValue = year.value) => {
    load.value = true

    let url:string = ''

    const getData = () => {
      if(titleValue === undefined || yearValue === undefined){
        url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&region=FR&sort_by=popularity.desc&page=${pageNumber}`
      }
      else{
        url = `https://api.themoviedb.org/3/search/movie?query=${titleValue}&include_adult=false&language=fr-FR&page=${pageNumber}&year=${yearValue}`
      }
    }
    getData()

    try {

      const urlMovies = url

      const data = (await axios.get(urlMovies, options)).data
      totalPages.value = data.total_pages
      totalResults.value = data.total_results
      page.value = data.page
      respData.value = data.results

      if(yearValue === undefined && pageNumber === 1){
        rating.value = respData.value[0].popularity
      }
    } catch (error) {
      console.log('error', error)
    } finally{
      load.value = false
    }
  }
  getAllPages(page.value, title.value, year.value)

  const searchRequestValues = (titleValue:string = '', yearValue:string = '') => {
    title.value = titleValue
    year.value = yearValue
  }

  const nextPage = (): void => {
    if (page.value !== 1) {
      page.value + 1
      getAllPages(page.value + 1, title.value, year.value)
    }else{
      page.value = 1
      getAllPages(2, title.value, year.value)
    }

  };

  const backPage = (): void => {
      if (page.value !== 1) {
          page.value - 1;
          getAllPages(page.value - 1, title.value, year.value)
      }
  };

  const goToPage = (numPage: number) => {
      page.value = numPage;
      getAllPages(numPage, title.value, year.value)
  };

  const firstPage = (): number => {
    getAllPages(1, title.value, year.value)
    return Math.ceil(page.value = 1)
  }

  const middlePages =() => {
    return Math.ceil(page.value)
  }

  const lastPage = (): number => {
    return totalPages.value
  }

  return {
      load,
      movies,
      genres,
      respData,
      totalPages,
      totalResults,
      perPage,
      page,
      title,
      year,
      rating,
      getAllPages,
      searchRequestValues,
      nextPage,
      backPage,
      goToPage,
      firstPage,
      middlePages,
      lastPage
  };

}



