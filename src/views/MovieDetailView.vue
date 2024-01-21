<script setup lang="ts">
import { useRoute } from 'vue-router';
import Rating from '@/components/RatingBlock.vue';
import useDataMovies from '@/services/composables/useMoviesData'
import Spinner from '@/components/SpinnerBlock.vue'
import useMovie from '@/services/composables/useMovie';


const route = useRoute()
const { rating } = useDataMovies()
const { load, movie, getMovie } = useMovie()
getMovie(route.params.id as string)

</script>
<template>
  <div class="mx-auto max-w-full px-4 pt-16 sm:px-6 sm:pt-12 lg:pt-8 lg:max-w-7xl  block sm:flex sm:justify-center">
    <Spinner v-if="load === true" />
    <div v-else
      class=" block lg:flex sm:items-center sm:justify-center w-full md:w-2/3 rounded-lg border border-violet-600  bg-violet-950/40 relative">
      <div class="w-full lg:w-1/2 flex justify-center">
        <img v-if="movie?.poster_path" :src="`https://image.tmdb.org/t/p/w440_and_h660_face${movie?.poster_path}`" alt=""
          srcset="" class="rounded-tl-md rounded-bl-md max-w-full sm:max-w-96 mx-auto">
      </div>
      <div class="p-12">
        <h1 class="text-white font-semibold uppercase text-2xl mb-1 text-left">{{ movie?.title }}</h1>
        <div class="sm:flex items-start">
          <Rating :rating="rating" :popularity="movie?.popularity" />
        </div>
        <div class="flex flex-col text-left justify-center  mt-4">
          <p class="text-white"><small class="text-violet-300 text-left">Date de sortie :</small> {{ movie?.release_date
          }}</p>
        </div>
        <div class="flex flex-col text-left justify-center mt-4">
          <p class="text-white ">{{ movie?.overview }}</p>
        </div>
        <div class="flex flex-wrap justify-start mt-3 relative">
          <small v-for="(genre, idx) in movie?.genres" :key="`${idx}`" class="text-violet-400 text-left mr-7">{{
            genre.name
          }}</small>
        </div>
      </div>
    </div>
  </div>
  <div class="text-center mt-12 sm:pb-12 lg:pb-8">
    <RouterLink :to="{ name: 'home' }" class="rounded-lg p-2 bg-violet-600 text-violet-300">Nouvelle recherche
    </RouterLink>
  </div>
</template>
