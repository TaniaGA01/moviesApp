<script setup lang="ts">
  import type { Movie } from '@/services/interfaces/movies.interfaces';
  defineProps<{
    respData: Array<Movie>
  }>()

</script>
<template>
  <div class="grid grid-flow-row-dense grid-cols-2 grid-rows-1 md:grid-cols-5 gap-5">
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
      <h2 class="text-white text-center uppercase">{{ movie.title }}</h2>
      {{ movie.release_date }}
      {{ movie.popularity }}
    </div>
  </div>
</template>
