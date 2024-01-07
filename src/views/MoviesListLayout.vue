<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from 'vue';
import type { Movie, Genre } from '@/services/interfaces/movies.interfaces';
import usePagination from '@/services/usePagination'
import Spinner from '@/components/Spinner.vue';
import MoviesList from '@/components/MoviesList.vue';
import NoData from '@/components/NoData.vue'
import Pagination from '@/components/Pagination.vue';

const {
  load,
  movies,
  respData,
  totalResults,
  totalPages,
  perPage,
  page,
  paginatedData,
  getAllPages,
  getPagesBySearch,
  nextPage,
  backPage,
  goToPage,
  firstPage,
  middlePages,
  lastPage
} = usePagination()

let data = ref<Movie[]>([])

watchEffect(() => {
    data.value = respData.value
})

const movieTitle = reactive({ title:'' })

const movieYear = reactive({ year:'' })

const regexExp = {
    inputNumber: /^[0-9]{0,4}$/,
}

const searchByTitle = (title:string) => {

  console.log(title + movieYear.year)

  if(title && !movieYear.year){
     movies.value.filter((movie) => {
      if(movie.title.toLowerCase().includes(movieTitle.title.toLowerCase())){
        data.value.find(item => item.id === movie.id) ? null : data.value.push(movie)
      }
    })

  }
}

const serchByYear = (year:string) => {

  if(!movieTitle.title && year){

    movies.value.filter((movie) => {

      const dateString = movie.release_date.toString()
      const date = new Date(dateString)
      const yearMovie = date.getFullYear()

      if(yearMovie.toString() === year){
        data.value.find(item => item.id === movie.id) ? null : data.value.push(movie)
      }

    })
  }
}

const reset = () => {
  respData.value = []
  movieTitle.title = ''
  movieYear.year = ''
  getAllPages(page.value)
}

const save = async () => {

  await getPagesBySearch()
  searchByTitle(movieTitle.title)
  serchByYear(movieYear.year)
  totalPages.value = Math.ceil(data.value.length/perPage)
  totalResults.value = data.value.length
  data.value = paginatedData.value

  movieTitle.title = ''
  movieYear.year = ''
}

</script>
<template>
  <form @submit.prevent="save">
    <div class="mt-5 mb-16 lg:px-24 rounded-md ">
      <div class="lg:flex gap-5 items-end mx-auto sm:w-4/5">
          <div class="lg:w-4/5 mt-5">
            <label for="movie-title" class="block text-sm font-medium leading-6 text-white">Titre du film</label>
            <div class="mt-2">
              <input
                type="text"
                name="movie-title"
                id="movie-title"
                v-model="movieTitle.title"
                placeholder="Titre du film"
                class="block w-full rounded-md  bg-gray-950/40 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6 px-2 border border-violet-700"
                />
            </div>
          </div>
          <div class="lg:w-1/3 mt-5">
            <label for="movie-year" class="block text-sm font-medium leading-6 text-white">Année du film</label>
            <div class="mt-2">
              <input
                type="text"
                name="movie-year"
                id="movie-year"
                v-model="movieYear.year"
                placeholder="Année du film"
                class="block w-full rounded-md bg-gray-950/40 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6 px-2 border border-violet-700" />
            </div>
          </div>
          <div class="lg:w-1/3 mt-5">
            <button
              type="submit"
              class="rounded-md border border-violet-700 bg-violet-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-900 hover:border-violet-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 w-full">Rechercher
            </button>
          </div>
      </div>
      <div class="mx-auto sm:w-4/5 text-center">
        <button @click="reset()" class="text-sm text-violet-300 bg-violet-950 rounded px-3 py-1 mt-5 hover:bg-violet-600">Réinitialiser la recherche</button>
      </div>
    </div>
  </form>
  <Spinner v-if="load" />
  <MoviesList :respData="data" />
  <NoData v-if="data.length === 0 && !load" />
  <Pagination v-if="data.length !== 0 && !load"
    :respData="data"
    :totalResults="totalResults"
    :totalPages="totalPages"
    :perPage="perPage"
    :firstPage="firstPage"
    :middlePages="middlePages"
    :lastPage="lastPage"
    :currentPage="page"
    :goToPage="goToPage"
    :nextPage="nextPage"
    :backPage="backPage"
  />
</template>
