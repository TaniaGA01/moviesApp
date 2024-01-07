<script setup lang="ts">
  import type { Movie } from '@/services/interfaces/movies.interfaces';
defineProps<{
  respData: Array<Movie>,
  totalResults:Number
  totalPages:Number
  perPage: Number,
  firstPage: Function,
  middlePages: Function,
  lastPage: Function,
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
                class="relative inline-flex items-center rounded-md border border-violet-600 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Précedente</a>
            <a href="#" @click="nextPage()"
                class="relative ml-3 inline-flex items-center rounded-md border border-violet-600 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Suivante</a>
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
                        class="relative inline-flex items-center rounded-l-md border border-violet-600  px-2 py-2 text-sm font-medium text-violet-600 hover:bg-gray-50 focus:z-20">
                        <span class="sr-only">Première</span>
                        <span class="text-violet-600"> {{ `<<` }} </span>
                    </a>
                    <a href="#" @click="backPage()"
                        class="relative inline-flex items-center border border-violet-600  px-2 py-2 text-sm font-medium text-violet-600 hover:bg-gray-50 focus:z-20">
                        <span class="sr-only">Précedente</span>
                        <span class="text-violet-600"> {{ `<` }} </span>
                    </a>
                    <div class="pagination">
                        <div class="pagination-content">

                                <a href="#" @click="goToPage(middlePages())"
                                    :class="[currentPage === middlePages() ? 'relative z-10 inline-flex items-center border border-violet-600 bg-violet-600 px-4 py-2 text-sm font-medium focus:z-20': 'relative inline-flex items-center border border-violet-600  px-4 py-2 text-sm font-medium text-violet-600 hover:bg-gray-50 focus:z-20']">
                                    {{ middlePages() }}
                                </a>
                        </div>
                    </div>

                    <a href="#" @click="nextPage()"
                        class="relative inline-flex items-center border border-violet-600 px-2 py-2 text-sm font-medium text-violet-600 hover:bg-gray-50 focus:z-20">
                        <span class="sr-only">Suivante</span>
                        <span class="text-violet-600">{{ `>` }}</span>
                    </a>
                    <a href="#" @click="goToPage(totalPages)"
                        class="relative inline-flex items-center border border-violet-600 rounded-r-md px-4 py-2 text-sm font-medium  hover:bg-gray-50 focus:z-20"
                        :class="[currentPage === totalPages ? 'relative z-10 inline-flex items-center border border-violet-600 bg-violet-600 px-4 py-2 text-sm font-medium focus:z-20': 'relative inline-flex items-center border border-violet-600 px-4 py-2 text-sm font-medium text-violet-600 hover:bg-gray-50 focus:z-20']"
                        >
                        {{ `>>` }}
                    </a>
                </nav>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.pagination {
    width: 50px;
    height: 38px;
    contain: strict;
    display: flex;

    .pagination-content {
        display: flex;
    }

    a {
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 38px;
  }
}
</style>
