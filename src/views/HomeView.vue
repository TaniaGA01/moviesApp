<script setup lang="ts">
import useService from '@/services/useService'
import Spinner from '@/components/Spinner.vue';

const { load, movies, genres, getMovies } = useService()
await getMovies()

console.log('load',load.value)
</script>
<template>
  <main>
    <h1>Hello, world!</h1>

    <Spinner v-if="load" />

    <div v-for="movie in movies" :key="movie.id">
    {{ movie.title }}
    <img :src="`https://www.themoviedb.org/t/p/w440_and_h660_face${movie.backdrop_path}`" alt="" srcset="">
    </div>

  </main>
</template>
<style lang="scss" scoped>
</style>
