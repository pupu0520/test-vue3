<template>
  <el-menu default-active="0" @select="changMenu">
    <template v-for="(oneItem, oneIndex) in menuShow" :key="oneItem.id" >
      <el-sub-menu v-if="oneItem.children" :index="oneIndex">
        <template #title>{{ oneItem.displayName }}</template>
        <el-menu-item v-for="(twoItem, twoIndex ) in oneItem.children" :key="twoItem.id" :index="oneIndex + '-' + twoIndex">
          {{ twoItem.displayName }}
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="oneIndex" >
        {{ oneItem.displayName }}
      </el-menu-item>
    </template>
    
  </el-menu>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
let router = useRouter();
const routes = router?.options?.routes ?? [];

let menuArr = [];
getMenu(routes, menuArr)
function getMenu(routes, menuArr) {
  routes.forEach(item => {
    if(item.meta && item.meta.menu) {
      const {displayName} = item.meta;
      if(item.children && item.children.length) {
        const arr = [];
        menuArr.push({displayName, name: item.name, children: arr});
        getMenu(item.children, arr)
      } else {
        menuArr.push({displayName, name: item.name});
      }
    }
  })
}
const menuShow = ref(menuArr)


function changMenu(index) {
  const indexArr = index.split('-');
  let curName = menuArr;
  for(let i = 0; i < indexArr.length; i++) {
    if(i === indexArr.length - 1) {
      curName = curName[indexArr[i]];
    } else {
      curName = curName[indexArr[i]].children;
    }
  }
  
  router.push({
    name: curName.name
  })
}
</script>

<style lang="scss" scoped>

</style>