<script setup lang="ts">
import Header from '@/components/Header.vue';
import MoviesSearchVue from '@/components/MoviesSearch.vue';
import MoviesListeLayout from './MoviesListLayout.vue'
import { ref } from 'vue';

const movieTitle = ref('')
console.log('movieTitle', movieTitle.value)

</script>
<template>
  <main class="px-7 pb-12">
    <Header/>
    <MoviesSearchVue
      v-model:movieTitle="movieTitle"
    />
    <MoviesListeLayout />
  </main>
</template>
<style lang="scss" scoped>
</style>
