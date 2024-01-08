<script setup lang="ts">
import { useRoute } from 'vue-router';
import usePagination from '@/services/usePagination'

const route = useRoute();
const {
  respData,
  totalResults,
  totalPages,
  perPage,
  page,
  getAllPages,
  searchRequestValues,
  nextPage,
  backPage,
  goToPage,
  firstPage,
  middlePages,
  lastPage
} = usePagination()
</script>
<template>
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
    </div>
  </div>
</template>
