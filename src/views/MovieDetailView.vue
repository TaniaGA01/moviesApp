<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { options } from '@/api/moviesAPI';
import { useRoute } from 'vue-router';
import type { Movie } from '@/services/interfaces/movies.interfaces';
import Rating from '@/components/RatingBlock.vue';
import useDataMovies from '@/services/composables/useDataMovies'
import Spinner from '@/components/SpinnerBlock.vue'

const { rating } = useDataMovies()

const route = useRoute()
const movie = ref<Movie>()

const getMovie = async () => {
  try {
    const urlGenre: string = `https://api.themoviedb.org/3/movie/${route.params.id}?language=fr-FR`;
    const { data } = await axios.get(urlGenre, options)
    movie.value = data
  } catch (error) {
    console.error('Data not found')
  }
}
getMovie()

</script>
<template>
  <div class="mx-auto max-w-2xl px-4 pt-16 sm:px-6 sm:pt-12 lg:pt-8 lg:max-w-7xl  flex justify-center">
    <Spinner v-if="!movie" />
    <div v-else
      class=" flex flex-col items-center justify-center sm:w-1/2 p-12 rounded-lg border border-violet-600  bg-violet-950/40 relative">
      <div class="sm:flex sm:justify-end">
        <img v-if="movie?.poster_path" :src="`https://image.tmdb.org/t/p/w440_and_h660_face${movie?.poster_path}`" alt=""
          srcset="" class="rounded-md my-5 h-80">
      </div>
      <h1 class="text-white uppercase text-4xl mb-1 text-center ">{{ movie?.title }}</h1>
      <Rating :rating="rating" :popularity="movie?.popularity" class="ml-2" />
      <div class="flex flex-col items-center justify-center w-full mt-4">
        <p class="text-white text-center">Date de sortie : {{ movie?.release_date }}</p>
      </div>
      <div class="flex flex-col items-center justify-center w-full mt-4">
        <p class="text-white text-center">{{ movie?.overview }}</p>
      </div>
    </div>
  </div>
  <div class="text-center mt-12 sm:pb-12 lg:pb-8">
    <RouterLink :to="{ name: 'home' }" class="rounded-lg p-2 bg-violet-600 text-violet-300">Nouvelle recherche
    </RouterLink>
  </div>
</template>
@/services/composables/usePagination
