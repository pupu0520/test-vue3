<template>
  <div class="header">
    <div v-for="item in list" :key="item.label">
      {{ item.label }}
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
const list = ref([
  { label: '具名插槽' },
  { label: '插槽作用域' },
])
</script>

<style lang="scss" scoped>

</style>