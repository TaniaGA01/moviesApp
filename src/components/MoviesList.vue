<script setup lang="ts">
import Pagination from './Pagination.vue';
import usePagination from '@/services/usePagination'
import Spinner from '@/components/Spinner.vue';

const {
  load,
  respData,
  totalResults,
  totalPages,
  perPage,
  page,
  nextPage,
  backPage,
  goToPage,
  firstPage,
  firstOnes,
  middleOnes,
  lastPage
} = usePagination()


</script>
<template>
  <Spinner v-if="load" />
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
        class="rounded-md"
      >
      <h3 class="text-white">{{ movie.title }}</h3>
      {{ movie.release_date }}
      {{ movie.popularity }}
    </div>
  </div>
  <Pagination
    :respData="respData"
    :totalResults="totalResults"
    :totalPages="totalPages"
    :perPage="perPage"
    :firstPage="firstPage"
    :firstOnes="firstOnes()"
    :middleOnes="middleOnes()"
    :lastPage="lastPage"
    :currentPage="page"
    :goToPage="goToPage"
    :nextPage="nextPage"
    :backPage="backPage"
  />
</template>
