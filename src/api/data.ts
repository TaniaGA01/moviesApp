import type { Movie, Genre } from '@/services/interfaces/movies.interfaces';
import { options } from '@/api/moviesAPI';
import axios from "axios";
import { ref } from 'vue';

export default function useData() {
  const load = ref<boolean>(false)
  const respData = ref<Movie[]>([])
  const title = ref<string>()
  const year = ref<string>()
  const rating = ref<number>()
  const page = ref<number>(1)
  const totalPages = ref<number>(0)
  const totalResults = ref<number>(0)

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
}


