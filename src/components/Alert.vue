<script setup lang="ts">
import type { AlertI } from '@/services/interfaces/autres.interfaces'
defineProps<{
    alert:AlertI
}>()
</script>
<template>
    <div class="text-red-500 font-medium">
        <span>{{ alert.message }}</span>
        <!-- <slot></slot> -->
    </div>
</template>
