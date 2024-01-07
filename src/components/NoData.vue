<script setup lang="ts">
import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid'
</script>
<template>
  <div class="px-6 py-24 sm:px-6 sm:py-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center bg-gray-950/80 p-5 border rounded-md border-violet-700">
        <p class="mx-auto mt-6 max-w-xl text-5xl text-violet-600 mb-5">Nous sommes désolés</p>
        <div class="flex items-center w-full justify-center pb-5">
          <ExclamationTriangleIcon class="h-12 w-12 text-white text-center me-3" aria-hidden="true" />
          <h2 class="text-4xl text-white w-auto">Aucun film a été retrouvé</h2>
        </div>

      </div>
    </div>
</template>
