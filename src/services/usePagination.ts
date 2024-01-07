import { computed, ref } from "vue"
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



  const getAllPages = async (pageNumber:number) => {
    load.value = true

    try {
      const urlMovies = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&region=FR&sort_by=popularity.desc&page=${pageNumber}&primary_release_year=`;

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
  getAllPages(page.value)

  const searchRequestValues = (titleValue:string = '', yearValue:number = 0) => {
    title.value = titleValue
    year.value = yearValue
  }

  const getPagesBySearch = async(titleValue:string = '', yearValue:number = 0) =>{
    load.value = true

    try {
      respData.value = []
      for (let pageNumber = 1; pageNumber < 50; pageNumber++) {
        const urlMovies = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&region=FR&sort_by=popularity.desc&page=${pageNumber}&primary_release_year=`;
        const pageOfMovies = [...(await axios.get(urlMovies, options)).data.results]
        movies.value.push(...pageOfMovies)
      }

    } catch (error) {
      console.error('Not data found')
    } finally{
      load.value = false
    }
  }

  const nextPage = (): void => {
    if (page.value !== Math.ceil(respData.value.length / perPage)) {
        page.value + 1
        getAllPages(page.value + 1)
    }else{
      page.value = 1
      getAllPages(2)
    }
  };

  const backPage = (): void => {
      if (page.value !== 1) {
          page.value - 1;
          getAllPages(page.value - 1)
      }
  };

  const goToPage = (numPage: number) => {
      page.value = numPage;
      getAllPages(numPage)
  };

  const firstPage = (): number => {
    getAllPages(1)
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
      getPagesBySearch,
      searchRequestValues,
      nextPage,
      backPage,
      goToPage,
      firstPage,
      middlePages,
      lastPage
  };

}



