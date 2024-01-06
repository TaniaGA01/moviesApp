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


  const getPages = async (pageNumber:number) => {
    load.value = true

    try {
      const urlMovies = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&region=FR&sort_by=popularity.desc&page=${pageNumber}&primary_release_year=`;

      const data = (await axios.get(urlMovies, options)).data
      console.log('po', data)
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
  getPages(page.value)

  const translatePagination = (): void => {
      const getPaginationDivContent = document.querySelector('.pagination-content') as HTMLElement
      getPaginationDivContent.style.transition = 'all 0.25s ease 0s'
      const pagesValue = []

      if (page.value >= 3) {
          pagesValue.push(page.value)
          pagesValue.forEach(element => {
              if (element) {
                  getPaginationDivContent.style.position = `absolute`
                  getPaginationDivContent.style.right = `1px`
              }
          })
      }
  }

  const nextPage = (): void => {
    if (page.value !== 1) {
        page.value + 1
        getPages(page.value + 1)
    }else{
      getPages(2)
    }
    translatePagination()
  };

  const backPage = (): void => {
      if (page.value !== 1) {
          page.value - 1;
          getPages(page.value - 1)
      }
      translatePagination()
  };

  const goToPage = (numPage: number) => {
      page.value = numPage;
      getPages(numPage)
      translatePagination()
  };

  const firstPage = (): number => {
    getPages(1)
    return Math.ceil(page.value = 1)
  }

  const firstOnes = (): any => {
    if (page.value) {
      return 3
    }
    translatePagination()
  }

  const middleOnes = (): any => {
      if (page.value) {
          return Math.ceil(page.value)
      }
      translatePagination()

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
      nextPage,
      backPage,
      goToPage,
      firstPage,
      firstOnes,
      middleOnes,
      lastPage
  };

}

