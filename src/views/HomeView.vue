<script setup lang="ts">
import { reactive } from 'vue';
import Header from '@/components/Header.vue';
import MoviesListeLayout from './MoviesListLayout.vue'

</script>
<template>
  <main class="px-7">
    <Header/>
    <MoviesListeLayout />
  </main>
</template>
<style lang="scss" scoped>
</style>
