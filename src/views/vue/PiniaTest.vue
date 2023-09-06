<template>
  <p>测试pinia</p>
  <p>{{ mainStore.count }}</p>
  <p>{{ mainStore.foo }}</p>
  <p>{{ mainStore.arr }}</p>


  <el-divider />

  <p>{{ count }}</p>
  <p>{{ foo }}</p>
  <p>{{ arr }}</p>

  <el-button type="primary" @click="changeMain">change</el-button>

</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/stores/main'

const mainStore = useMainStore()
// const {count } = mainStore // 不能直接解析会破环数据结构
const { count, foo, arr } = storeToRefs(mainStore)

const changeMain = () => {
  // 方式一：
  // mainStore.count++;
  // mainStore.foo = 'hello';

  // 2  // 方式二 视图只更新一次
  // mainStore.$patch({
  //   count: mainStore.count + 1,
  //   foo: mainStore.foo = 'hello',
  //   arr: [...mainStore.arr, 4] // 更新对象比较麻烦
  // })


  // 3 
  // mainStore.$patch(state => {
  //   state.count++;
  //   state.foo = 'jjjj';
  //   state.arr.push(333)
  // })

  // 4
  mainStore.changeState(10)
}
</script>