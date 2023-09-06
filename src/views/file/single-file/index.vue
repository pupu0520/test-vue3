
<template>
  <div>
    111
    <a href="https://juejin.cn/post/6980142557066067982" target="_blank">参考</a>
  </div>
  <div class="content">
    <el-upload
      ref="upload"
      :on-change="success"
      :auto-upload="false"
    >
      <template #trigger>
        选择文件
      </template>
    </el-upload>
    <el-button type="primary" @click="uploadFile">上传文件</el-button>
  </div>
</template>

<script setup>
import {ref} from 'vue';
const upload = ref();
function success (uploadFile) {
  console.log(uploadFile, '123')
}
function uploadFile(){
  console.log(upload)
}
</script>
<style lang='scss' scoped>

</style>