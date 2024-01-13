<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { options } from '@/api/moviesAPI'
import type { Genre, Movie } from '@/services/interfaces/movies.interfaces'
import Rating from './Rating.vue'
import Note from './Note.vue'

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
    rating:Number
  }>()

</script>
<template>
  <div class="grid grid-flow-row-dense grid-cols-1 grid-rows-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-7 ">
    <div
      v-for="movie in respData"
      :key="movie.id"
      class="rounded-lg border border-violet-600 p-2 bg-violet-950/40 hover:bg-violet-700/40 hover:scale-[105%] transition-all ease-in-out duration-200 "
    >
      <RouterLink :to="{ name: 'film', params: { id: movie.id } }">
        <Note :note="movie.vote_average"/>
        <img
          :src="`https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`"
          alt=""
          srcset=""
          class="rounded-md mb-2"
        >
        <div class="inline-flex items-center h-20">
          <h2 class="text-white text-left uppercase font-medium mt-2 mb-5 ">{{ movie.title }}</h2>
        </div>
        <p class="text-left text-violet-300 text-sm">Date de sortie : <span>{{ movie.release_date }}</span>
        </p>
        <div class="sm:flex sm:items-center">
          <p class="text-left text-violet-300 text-sm">Popularité :
          </p>
          <Rating :rating="rating" :popularity="movie.popularity" class="sm:ml-2"/>
        </div>
        <div class="flex flex-wrap mt-3 relative">
          <div v-for="(genre, idx) in genres" :key="`${idx}`">
            <div v-for="movieGenre in movie.genre_ids">
              <span v-if="genre.id === movieGenre"><small class="text-violet-400 pr-4 ">{{ genre.name }}</small></span>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
