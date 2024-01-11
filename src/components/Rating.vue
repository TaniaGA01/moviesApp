<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const props = defineProps<{
    rating:any
    popularity:any
}>()

let MAX_RATING = ref(props.rating)
let moviePopularity = ref()
let pourcentage = ref()

const fill = () => {
  moviePopularity.value = Math.ceil(props.popularity * 100 / MAX_RATING.value).toString()
  pourcentage.value = Math.ceil(100 - moviePopularity.value).toString()
}
fill()

</script>
<template>
<div class="w-fit stars">
  <p :class="`bg-gradient-to-r
    from-yellow-500 from-${moviePopularity}%
    via-yellow-500 via-${pourcentage}%
    to-violet-400 to-${pourcentage}%  text-transparent bg-clip-text`">
        &#9733;&#9733;&#9733;&#9733;&#9733;
    </p>
</div>
</template>
<style lang="scss">
</style>

