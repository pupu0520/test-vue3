<template>
  <div class="box">
    <p>
      当前日期 {{ time }}
    </p>
    <div>
      <h4>格式化</h4>
      <p>24小时{{ dayjs().format('YYYY-MM-DD HH:mm:ss') }}</p>
      <p>12小时{{ dayjs().format('YYYY-MM-DD hh:mm:ss') }}</p> 
    </div>
    <hr/>
    <div>
      <h4>不严格验证日日期：</h4>
      <p>2000-02-1 {{ dayjs('2000-02-1').isValid() }} </p>
      <p>2000=02-31 {{ dayjs('2000=02-31').isValid() }} </p>
      <p>20000231 {{ dayjs('20000231').isValid() }} </p>
      <p>200a0231 {{ dayjs('200a0231').isValid() }} </p>
      <p>aaa {{ dayjs('aaa').isValid() }} </p>
      <h4>严格验证</h4>
      <p>强制校验 20000231 {{ dayjs('20000231', 'YYYY-MM-DD').isValid() }} </p>
      <p>强制校验 2000-02-1 {{ dayjs('2000-02-1', 'YYYY-MM-DD').isValid() }} </p>
      <p>强制校验 2000-02-31 {{ dayjs('2000-02-31', 'YYYY-MM-DD').isValid() }} </p>
      <p>强制校验 2000-02-31 {{ dayjs('2000-02-31', 'YYYY-MM-DD', true).isValid() }} </p>
      <p>强制校验 2000-02-01 {{ dayjs('2000-02-01', 'YYYY-MM-DD', true).isValid() }} </p>
    </div>
    <hr />
    <div>
      <h4>日期</h4>
      <p>{{ dayjs().date() }}</p>
      <p>{{ dayjs().date(32).format('YYYY-MM-DD HH:mm:ss') }}</p>
    </div>
    <div>
      <h4>操作</h4>
      <p>当前日期加20天{{ dayjs().add(20, 'day').format('YYYY-MM-DD HH:mm:ss') }}</p>
      <p>当前日期减去20天{{ dayjs().subtract(20, 'day').format('YYYY-MM-DD HH:mm:ss') }}</p>
      <p>当前日期减去1个年{{ dayjs().subtract(1, 'year').format('YYYY-MM-DD HH:mm:ss') }}</p>
    </div>
  </div>
</template>

<script setup>
import  customParseFormat from 'dayjs/plugin/customParseFormat'

import dayjs from 'dayjs'
dayjs.extend(customParseFormat)

import {ref} from 'vue';

const time = ref(dayjs().format('YYYY-MM-DD HH-mm-ss'));
console.log(dayjs('some invalid string').isValid())


</script>
<style lang='scss' scoped>
.box {
  padding: 0 10px;
}
</style>