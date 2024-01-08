<script setup lang="ts">
defineProps<{
  resultTitle:string
  resultYear:string
}>()
</script>
<template>
<div v-if="resultTitle || resultYear" class="mb-10">
    <h2  class=" text-violet-500 uppercase">Résultats de la recherche par :
      <span class="text-white">
        {{ resultTitle }}
      </span>
      <span v-if="resultYear" class="text-white">
        /
      </span>
      <span class="text-white">
        {{ resultYear }}
      </span>
    </h2>
  </div>
  <div v-else class="mb-10 text-3xl">
    <h2  class=" text-violet-500 uppercase font-semibold">Catalogue de filmes</h2>
  </div>
</template>
