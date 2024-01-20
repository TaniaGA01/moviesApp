<script setup lang="ts">
import type { Movie } from '@/services/interfaces/movies.interfaces';
defineProps<{
  respData: Array<Movie>,
  totalResults: Number
  totalPages: Number
  perPage: Number,
  firstPage: Function,
  middlePages: Function,
  currentPage: Number,
  goToPage: Function,
  nextPage: Function,
  backPage: Function
}>()
</script>
<template>
  <!-- <Pagination /> -->
  <div class="flex items-center justify-between mt-12">
    <div class="flex flex-1 justify-between sm:hidden">
      <a href="#" @click="backPage()"
        class="relative inline-flex items-center rounded-md border border-violet-600 bg-white px-4 py-2 text-sm font-medium text-violet-700 hover:bg-violet-50">Précedente</a>
      <a href="#" @click="nextPage()"
        class="relative ml-3 inline-flex items-center rounded-md border border-violet-600 bg-white px-4 py-2 text-sm font-medium text-violet-700 hover:bg-violet-50">Suivante</a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-md text-violet-600">
          Page {{ ' ' }}
          <span class="text-white">{{ currentPage }}</span>
          {{ ' ' }} de {{ ' ' }}
          <span class="text-white">{{ totalPages }}</span>
          {{ ' ' }} - {{ ' ' }}
          <span class="text-white">{{ totalResults }}</span>
          {{ ' ' }} films
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <a href="#" @click="firstPage()"
            :class="[currentPage !== 1 ? `border-violet-600 text-violet-600 hover:bg-violet-50 focus:z-20` : `border-violet-300  text-violet-500 bg-violet-400 pointer-events-none`, `relative inline-flex items-center border rounded-l-md px-2 py-2 text-sm font-medium`]">
            <span class="sr-only">Première</span>
            <span> {{ `<<` }} </span>
          </a>
          <a href="#" @click="backPage()"
            :class="[currentPage !== 1 ? `border-violet-600 text-violet-600 hover:bg-violet-50 focus:z-20` : `border-violet-300  text-violet-500 bg-violet-400 pointer-events-none`, `relative inline-flex items-center border px-2 py-2 text-sm font-medium`]">
            <span class="sr-only">Précedente</span>
            <span> {{ `<` }} </span>
          </a>
          <a href="#" @click="goToPage(middlePages())"
            :class="[currentPage === middlePages() ? 'relative z-10 inline-flex items-center border border-violet-600 bg-violet-600 px-4 py-2 text-sm font-medium focus:z-20 text-white ' : 'relative inline-flex items-center border border-violet-600  px-4 py-2 text-sm font-medium text-violet-600 hover:bg-violet-50 focus:z-20']">
            {{ middlePages() }}
          </a>
          <a href="#" @click="nextPage()"
            :class="[currentPage !== totalPages ? `border-violet-600 text-violet-600 hover:bg-violet-50 focus:z-20` : `border-violet-300  text-violet-500 bg-violet-400 pointer-events-none`, `relative inline-flex items-center border px-2 py-2 text-sm font-medium`]">
            <span class="sr-only">Suivante</span>
            <span>{{ `>` }}</span>
          </a>
          <a href="#" @click="goToPage(totalPages)"
            :class="[currentPage !== totalPages ? `border-violet-600 text-violet-600 hover:bg-violet-50 focus:z-20` : `border-violet-300  text-violet-500 bg-violet-400 pointer-events-none`, `relative inline-flex items-center border rounded-r-md px-2 py-2 text-sm font-medium`]">
            {{ `>>` }}
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>
