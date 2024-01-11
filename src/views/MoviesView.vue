<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import type { Movie } from '@/services/interfaces/movies.interfaces'
import type { AlertI } from '@/services/interfaces/autres.interfaces'
import usePagination from '@/services/usePagination'
import Spinner from '@/components/Spinner.vue'
import SearchBy from '@/components/SearchBy.vue'
import MoviesList from '@/components/MoviesList.vue'
import NoData from '@/components/NoData.vue'
import Pagination from '@/components/Pagination.vue'
import ScrollTop from '@/components/ScrollTop.vue'

const {
  load,
  respData,
  totalResults,
  totalPages,
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
} = usePagination()

let data = ref<Movie[]>([])

watchEffect(() => {
    data.value = respData.value
})

const movieTitle = reactive({ title:ref() })
const movieYear = reactive({ year:ref() })
const resultTitle = ref()
const resultYear = ref()

const alertTitle = reactive<AlertI>({ message:'', show:false })
const alertYear = reactive<AlertI>({ message:'', show:false })

const valideYearValue = ref(false)
const regexExp = /^\d{4}$/

const inputYearValidation = () => {
  if(movieYear.year !== ''){
    valideYearValue.value = regexExp.test(movieYear.year)
  }
}

const save = async () => {

  inputYearValidation()

  if(!movieTitle.title){
    alertTitle.message = 'Merci de renseigner le titre du film'
    alertTitle.show = true
    return
  }else{
    alertTitle.show = false
  }

  if(valideYearValue.value === false && movieYear.year ){

    alertYear.message = 'Merci de renseigner une année valide'
    alertYear.show = true
    return
  }else{
    alertYear.show = false
  }

  searchRequestValues(movieTitle.title, movieYear.year)

  resultTitle.value = movieTitle.title
  resultYear.value = movieYear.year

  movieTitle.title = ref()
  movieYear.year = ref()
  totalPages.value = Math.ceil(data.value.length/perPage)
  totalResults.value = data.value.length

  getAllPages(1, movieTitle.title, movieYear.year)
}

const reset = () => {
  movieTitle.title = ''
  movieYear.year = ''
  alertTitle.show = false
  alertYear.show = false
  resultTitle.value = ''
  resultYear.value = ''
  getAllPages(1, title.value = undefined, year.value = undefined)
}

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

</script>
<template>
  <form @submit.prevent="save">
    <div class="mt-5 mb-2 lg:px-24 rounded-md ">
      <div class="lg:grid lg:grid-cols-2 gap-3 items-start mx-auto sm:w-4/5">
          <div class="lg:w-full mt-5">
            <label for="movie-title"
              :class="[alertTitle.show === false ? 'text-white' : 'text-red-500', 'block text-sm font-medium leading-6']">
              Titre du film
            </label>
            <div class="mt-2">
              <input
                type="text"
                name="movie-title"
                id="movieTitle"
                ref="titleInput"
                v-model="movieTitle.title"
                placeholder="Titre du film"
                @click="alertTitle.show = false"
                :class="[alertTitle.show === false ? 'focus:ring-violet-500 border-violet-700  ring-white/10' : 'border-red-500', 'block w-full rounded-md  bg-gray-950/40 py-1.5 text-white shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 px-2 border ']" />

            </div>
            <div v-if="alertTitle.show === true" class="text-red-500 font-medium">
                <span>{{ alertTitle.message }}</span>
            </div>
          </div>

          <div class="lg:full mt-5">
            <label for="movie-year" :class="[alertYear.show === false ? 'text-white' : 'text-red-500', 'block text-sm font-medium leading-6']">Année du film</label>
            <div class="mt-2">
              <input
                type="text"
                name="movie-year"
                id="movie-year"
                v-model="movieYear.year"
                placeholder="Année du film"
                @click="alertYear.show = false"
                :class="[alertYear.show === false ? 'focus:ring-violet-500 border-violet-700  ring-white/10' : 'border-red-500', 'block w-full rounded-md  bg-gray-950/40 py-1.5 text-white shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 px-2 border ']" />
            </div>
            <div v-if="alertYear.show === true" class="text-red-500 font-medium">
                <span>{{ alertYear.message }}</span>
            </div>
          </div>
      </div>
      <div class="lg:w-full mt-5 text-center">
        <button
          type="submit"
          class="sm:w-1/5 rounded-md border border-violet-700 bg-violet-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-900 hover:border-violet-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 w-full">Rechercher
        </button>
      </div>

    </div>
  </form>
  <div class="mx-auto sm:w-4/5 text-center mb-8">
        <button @click="reset()" class="text-sm text-violet-300 rounded px-3 py-1 mt-1 hover:text-violet-600">Réinitialiser la recherche</button>
      </div>
  <Spinner v-if="load" />
  <SearchBy :resultTitle="resultTitle" :resultYear="resultYear"/>
  <MoviesList :respData="data" :rating="rating"/>
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
  <ScrollTop v-if="data.length !== 0 && !load" :scrollTop="scrollTop"/>
</template>
