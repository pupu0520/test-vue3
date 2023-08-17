<template>
  <div class='aa'>
    {{test}}
  </div>
</template>

<script setup>
import {ref} from 'vue';
let test = ref(1)
</script>

<style lang='scss' scoped>
.aa{
  width: 100px;
  height: 40px;
  background: red;
  color: #fff;
}
</style>