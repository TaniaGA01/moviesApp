<script setup lang="ts">
import axios from 'axios';
import { options } from '@/api/moviesAPI';
import type { Genre, Movie } from '@/services/interfaces/movies.interfaces';
import { ref } from 'vue';

  let genres = ref<Genre[]>([])

  const getGenres = async () => {

    try {
      const urlGenre:string = `https://api.themoviedb.org/3/genre/movie/list?language=fr`;
      genres.value.push(...(await axios.get(urlGenre, options)).data.genres)
    } catch (error) {
      console.error('Not data found')
    }
  }
  getGenres()

  defineProps<{
    respData: Array<Movie>
  }>()
</script>
<template>
  <div class="grid grid-flow-row-dense grid-cols-2 grid-rows-1 md:grid-cols-5 gap-5 ">
    <div
      v-for="movie in respData"
      :key="movie.id"
      class="rounded-lg border border-violet-600 p-2 bg-violet-950/40"
    >
      <img
        :src="`https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`"
        alt=""
        srcset=""
        class="rounded-md mb-2"
      >
      <h2 class="text-white text-center uppercase text-lg mt-2">{{ movie.title }}</h2>
      <p class="text-center text-white text-sm">{{ movie.release_date }}</p>
      {{ movie.popularity }}
        <div class="flex flex-wrap">
          <div v-for="(genre, idx) in genres" :key="`${idx}`">
            <div v-for="movieGenre in movie.genre_ids">
              <span v-if="genre.id === movieGenre"><small class="text-violet-500 pr-4">{{ genre.name }}</small></span>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
