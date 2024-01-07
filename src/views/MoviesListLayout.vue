<script setup lang="ts">
import type { Movie, Genre } from '@/services/interfaces/movies.interfaces';
import Pagination from '@/components/Pagination.vue';
import usePagination from '@/services/usePagination'
import Spinner from '@/components/Spinner.vue';
import MoviesList from '@/components/MoviesList.vue';
import { computed, reactive, ref, watchEffect } from 'vue';

const {
  load,
  movies,
  respData,
  totalResults,
  totalPages,
  perPage,
  page,
  title,
  getPagesBySearch,
  nextPage,
  backPage,
  goToPage,
  firstPage,
  middlePages,
  lastPage
} = usePagination()

const data = ref<Movie[]>([])

watchEffect(() => {
    data.value = respData.value
})

  const movieTitle = reactive({
    title:''
  })

  const movieYear = reactive({
    year:ref()
  })

  const save = async () => {
    await getPagesBySearch(movieTitle.title, movieYear.year)
    data.value = movies.value
  }

</script>
<template>
  <form @submit.prevent="save">
    <div class="lg:flex sm:w-4/5 mx-auto gap-5 mt-5 mb-16 lg:px-24 rounded-md items-end">
          <div class="lg:w-4/5 mt-5">
            <label for="movie-title" class="block text-sm font-medium leading-6 text-white">Titre du film</label>
            <div class="mt-2">
              <input
                type="text"
                name="movie-title"
                id="movie-title"
                v-model="movieTitle.title"
                placeholder="Titre du film"
                class="block w-full rounded-md  bg-gray-950/40 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6 px-2 border border-violet-700" />
            </div>
          </div>

          <div class="lg:w-1/3 mt-5">
            <label for="movie-year" class="block text-sm font-medium leading-6 text-white">Année du film</label>
            <div class="mt-2">
              <input
                type="number"
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
              class="rounded-md border border-violet-700 bg-violet-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 w-full">Rechercher</button>
          </div>
      </div>
  </form>
  <Spinner v-if="load" />
  <MoviesList :respData="data" />
  <Pagination v-if="!load"
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
