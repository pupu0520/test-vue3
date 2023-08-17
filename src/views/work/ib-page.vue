<template>
  <div class=''>
    111
  </div>
</template>

<script>
const fs = require('fs')
const compiler = require('vue-template-compiler')

const file = fs.readFileSync('./test.vue', 'utf8')
const output = compiler.compile(file)

console.log(output.render)
</script>

<style lang='scss' scoped>
</style>