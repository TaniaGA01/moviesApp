<script setup lang="ts">
import { movies, getMovies } from '@/api/moviesAPI'
await getMovies()


</script>
<template>
  <main>
    <h1>Hello, world!</h1>

    <div v-for="movie in movies" :key="movie.id">
    {{ movie.title }}
    <img :src="`https://www.themoviedb.org/t/p/w440_and_h660_face${movie.backdrop_path}`" alt="" srcset="">
    </div>


  </main>
</template>
<style lang="scss" scoped>
</style>
