<script lang="ts" setup>
import { reactive, ref } from 'vue';

  const movieTitle = reactive({
    title:''
  })

  const emit = defineEmits([
    "movie-title", "movieTitle.title"
  ])

  const save = () => {
    emit('movie-title', movieTitle.title)
  }

</script>
<template>
  <form @submit.prevent="save">
    <div class="lg:flex sm:w-4/5 mx-auto gap-5 mt-5 mb-16 lg:px-24 rounded-md items-end">
          <div class="lg:w-4/5 mt-5">
            <label for="movie-title" class="block text-sm font-medium leading-6 text-white">Titre du film</label>
            <div class="mt-2">
              <input
                type="text"
                name="movie-title"
                id="movie-title"
                v-model="movieTitle.title"
                autocomplete="given-title"
                placeholder="Titre du film"
                class="block w-full rounded-md  bg-gray-950/40 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6 px-2 border border-violet-700" />
            </div>
          </div>

          <div class="lg:w-1/3 mt-5">
            <label for="movie-year" class="block text-sm font-medium leading-6 text-white">Année du film</label>
            <div class="mt-2">
              <input
                type="number"
                name="movie-year"
                id="movie-year"
                autocomplete="family-year"
                placeholder="Année du film"
                class="block w-full rounded-md bg-gray-950/40 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6 px-2 border border-violet-700" />
            </div>
          </div>
          <div class="lg:w-1/3 mt-5">
            <button
              type="submit"
              class="rounded-md border border-violet-700 bg-violet-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 w-full">Rechercher</button>
          </div>
      </div>
  </form>
</template>

