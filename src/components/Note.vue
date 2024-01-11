<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  note:number
}>()

</script>
<template>
    <div class="graphic-container">
        <div id="chart" :class="[props.note > 8 ? `bg-lime-500 `:`bg-yellow-600`, `rounded-full w-12 h-12 p-1 absolute border-2 border-violet-700 -m-5`]">
            <div class=" bg-violet-950 rounded-full w-full h-full flex items-center justify-center">
              <p class="text-violet-300 font-semibold">{{ props.note.toFixed(1) }}</p>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.graphic-container{

}


@media (max-width: 768px){
    .graphic-container{
        width: 100%;
    }
}
</style>
