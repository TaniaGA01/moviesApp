<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  note:number
}>()

const radio = ref(20)
const x =ref(30)
const circumference = ref(Math.floor(300))
const pourcentage = ref(Math.floor(props.note * 10))
const noteL = ref(props.note.toFixed(1))
const strokeDashoffset = ref(Math.floor((circumference.value - pourcentage.value) - 12 ))

</script>
<template>
    <div class="rounded-full w-12 h-12 p-1 absolute border-2 border-violet-700 bg-gray-950 -m-5">
      <div class="flex items-center justify-center w-fit -mt-[7px]">
        <svg class="transform -rotate-90 w-[55px] h-[55px] -ml-3">
            <circle :cx="x" :cy="x" :r="`${radio}`" stroke="currentColor" stroke-width="3" fill="transparent"
                class="" />
            <circle :cx="x" :cy="x" :r="`${radio}`" stroke="currentColor" stroke-width="3" fill="transparent"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="strokeDashoffset"
              :class="[
              !noteL ? `text-amber-400` : ``,
              parseInt(noteL) > 7.9 ? `text-lime-500`:`text-amber-400` ?
              parseInt(noteL) > 4.9 && parseInt(noteL) < 7.9 ? ` text-amber-400`:`text-rose-600` : ``,
              `rounded-full w-12 h-12 p-1 absolute border-2 border-violet-700 -m-5 transition duration-150 ease-out`]"/>
        </svg>
        <span :class="[!noteL ? `text-amber-400` : ``,
              parseInt(noteL) > 7.9 ? `text-lime-500`:`text-amber-400` ?
              parseInt(noteL) > 4.9 && parseInt(noteL) < 7.9 ? ` text-amber-400`:`text-rose-600` : ``,`absolute text-white -ml-2 -mt-1`]" >{{ noteL }}</span>
      </div>
    </div>
    <!-- <p class="text-white">circumference : {{ circumference }}</p>
    <p class="text-white"> stroke-dashoffset : {{ strokeDashoffset }}</p>
    <p class="text-white"> stroke-pourcentage : {{ pourcentage }}</p>
    <p class="text-white"> nonte : {{ noteL }}</p> -->
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
