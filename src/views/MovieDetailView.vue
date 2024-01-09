<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { options } from '@/api/moviesAPI';
import { useRoute } from 'vue-router';
import type { Movie } from '@/services/interfaces/movies.interfaces';

const route = useRoute()
const movie = ref<Movie>()

const getMovie = async () => {
  try {
    const urlGenre:string = `https://api.themoviedb.org/3/movie/${route.params.id}?language=fr-FR`;
    const { data } = await axios.get(urlGenre, options)
    movie.value = data
  } catch (error) {
    console.error('Not data found')
  }
}
getMovie()

console.log(movie)

</script>
<template>
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
      <div>
        <h1 class="text-white uppercase text-4xl">{{ movie?.title }}</h1>
        <img
          :src="`https://image.tmdb.org/t/p/w440_and_h660_face${movie?.poster_path}`"
          alt=""
          srcset=""
          class="rounded-md mb-2"
        >
      </div>
    </div>
  </div>
</template>
