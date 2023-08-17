<template>
  <Header />
  <div class="content-outer">
    <div class="left-nav">
      <menu-area />
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from './Header.vue'
import MenuArea from './MenuArea.vue'
</script>

<style lang="scss" scoped>
$leftWidth: 200px;
.content-outer {
  display: flex;
  .left-nav {
    width: $leftWidth;
  }
  
  .content {
    width: calc(100vw - $leftWidth);
    height: calc(100vh - 50px);
  }
}

</style>