import { ref } from "vue"
import type { Movie, Genre } from '@/services/interfaces/movies.interfaces';
import { options } from '@/api/moviesAPI';
import axios from "axios";

export default function usePagination() {

  let load = ref<boolean>(false)
  let movies = ref<Movie[]>([])
  let genres = ref<Genre[]>([])
  let respData = ref<Movie[]>([])
  let totalPages = ref(0)
  let totalResults = ref(0)
  let page = ref(1)
  let perPage = 20
  let title = ref()
  let year = ref()

  const getAllPages = async (pageNumber:number = page.value, titleValue:string = title.value, yearValue:string = year.value) => {
    load.value = true

    let url:string = ''

    const getData = () => {
      if(titleValue === undefined || yearValue === undefined){
        url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&region=FR&sort_by=popularity.desc&page=${pageNumber}`
      }
      else{
        url = `https://api.themoviedb.org/3/search/multi?query=${titleValue},${yearValue}&include_adult=false&language=fr-FR&page=${pageNumber}`
      }
    }
    getData()

    try {

      const urlMovies = url

      const data = (await axios.get(urlMovies, options)).data
      totalPages.value = data.total_pages
      totalResults.value = data.total_results
      respData.value = data.results
      page.value = data.page

    } catch (error) {
      console.error('Not data found')
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



