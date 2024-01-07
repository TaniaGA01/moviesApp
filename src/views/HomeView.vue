<script setup lang="ts">
import { reactive } from 'vue';
import Header from '@/components/Header.vue';
import MoviesSearchVue from '@/components/MoviesSearch.vue';
import MoviesListeLayout from './MoviesListLayout.vue'
import usePagination from '@/services/usePagination';

const {
  searchRequestValues
} = usePagination()

interface title{
  name:string
}

const title = reactive<title>({
  name:''
})

const movieTitle = (title: { name: any; })=>{
  title = {
    name:title
  }
  searchRequestValues(title.name)
}

</script>
<template>
  <main class="px-7 pb-12">
    <Header/>
    <MoviesSearchVue @movie-title="movieTitle" />
    <MoviesListeLayout :movieTitle="title" />
  </main>
</template>
<style lang="scss" scoped>
</style>
