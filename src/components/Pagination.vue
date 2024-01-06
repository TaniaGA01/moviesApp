<script setup lang="ts">
  import type { Movie } from '@/services/interfaces/movies.interfaces';
defineProps<{
  respData: Array<Movie>,
  totalResults:Number
  totalPages:Number
  perPage: Number,
  firstPage: Function,
  firstOnes: Function,
  middleOnes: Function,
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
                class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Précedente</a>
            <a href="#" @click="nextPage()"
                class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Suivante</a>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p class="text-md text-gray-400">
                    Page {{ ' ' }}
                    <span class="text-blue-500">{{ currentPage }}</span>
                    {{ ' ' }} de {{ ' ' }}
                    <span class="text-blue-500">{{ totalPages }}</span>
                    {{ ' ' }} - {{ ' ' }}
                    <span class="text-blue-500">{{ totalResults }}</span>
                    {{ ' ' }} films
                </p>
            </div>
            <div>
                <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <a href="#" @click="firstPage()"
                        class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                        <span class="sr-only">Première</span>
                        <span class="text-gray-400"> {{ `<<` }} </span>
                    </a>
                    <a href="#" @click="backPage()"
                        class="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                        <span class="sr-only">Précedente</span>
                        <span class="text-gray-400"> {{ `<` }} </span>
                    </a>
                    <div class="pagination">
                        <div class="pagination-content">
                            <div v-for="(item, idx) in firstOnes" :key="item">
                                <a v-if="idx as unknown as number < 3" href="#" @click="goToPage(item)"
                                    :class="[currentPage === item ? 'relative z-10 inline-flex items-center border border-blue-500 bg-blue-50 px-4 py-2 text-sm font-medium text-white-600 focus:z-20': 'relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20']">{{
                                    item}}
                                </a>
                            </div>
                            <div v-for="(item, idx) in middleOnes" :key="item">
                                <a href="#" v-if="idx as unknown as number > 2" @click="goToPage(item)"
                                    :class="[currentPage === item ? 'relative z-10 inline-flex items-center border border-blue-500 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 focus:z-20': 'relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20']">
                                    {{ item }}
                                </a>
                            </div>
                        </div>
                    </div>
                    <a href="#" @click="nextPage()"
                        class="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                        <span class="sr-only">Suivante</span>
                        <span class="text-gray-400">></span>
                    </a>
                    <a href="#" @click="goToPage(500)"
                        class="relative inline-flex items-center border border-gray-300 rounded-r-md bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                        :class="[currentPage === 500 ? 'relative z-10 inline-flex items-center border border-blue-500 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 focus:z-20': 'relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20']"
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
    width: 151px;
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
