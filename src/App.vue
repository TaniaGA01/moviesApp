<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<style lang="scss">
body{
  background-color: black;
}
</style>
