<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import usePagination from '@/services/usePagination'
import Spinner from '@/components/Spinner.vue';
import MoviesList from '@/components/MoviesList.vue';

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
  <MoviesList :respData="respData" />
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
