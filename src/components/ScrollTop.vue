<script setup lang="ts">
import { ArrowUpIcon } from '@heroicons/vue/20/solid'
defineProps<{
  scrollTop:Function
}>()
</script>
<template>
  <div class="mx-auto sm:w-4/5 text-center">
    <button @click="scrollTop()" class="text-sm text-violet-300 bg-violet-950 rounded-t-lg px-3 py-1 mt-5 hover:bg-violet-600">
      <ArrowUpIcon class="h-6 w-6 text-white text-center" aria-hidden="true" />
    </button>
  </div>
</template>
