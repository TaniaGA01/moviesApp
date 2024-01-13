<script setup lang="ts">
import { ref } from 'vue';
import { StarIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
    rating:any
    popularity:any
}>()

let MAX_RATING = ref(props.rating)
let moviePopularity = ref()

const pourcentage=() => {
  moviePopularity.value = Math.floor(props.popularity * 100 / MAX_RATING.value)
}
pourcentage()

const excellent = ref(80)
const veryGood = ref(60)
const good = ref(40)
const fair = ref(20)
const poor = ref(0)

</script>
<template>
  <!-- {{ popularity }} -->
<div class="flex flex-row-reverse">
  <StarIcon :class="[moviePopularity > excellent ? `text-amber-400` : `text-slate-400`, `h-3 w-3`]"/>
  <StarIcon :class="[moviePopularity > veryGood ? `text-amber-400` : `text-slate-400`,`h-3 w-3`]"/>
  <StarIcon :class="[moviePopularity > good ? `text-amber-400` : `text-slate-400`,`h-3 w-3`]"/>
  <StarIcon :class="[moviePopularity > fair ? `text-amber-400` : `text-slate-400`,`h-3 w-3`]"/>
  <StarIcon :class="[moviePopularity > poor ? `text-amber-400` : `text-slate-400`,`h-3 w-3`]"/>
</div>
</template>

