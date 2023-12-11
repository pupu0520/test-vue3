<template>
  <div>
    {{ myKeys ===  props.testKey}}
  </div>
</template>

<script setup>
import { myKeys  } from './key.js';

const props = defineProps({
  testKey: {
    type: Object,
    default: Object
  }
})

</script>
<style lang='scss' scoped>

</style>