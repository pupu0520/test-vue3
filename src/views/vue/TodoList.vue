<template>
  <div>
    {{ a }}
    -----
    {{ newA }}
    <input v-model="inputVal"/>
    <button @click="changeVal"> 需改a的值 </button>
  </div>
</template>

<script>
export default({
  name: 'TEST',
  data: () => {
    return {
      a: 1,
      inputVal: ''
    }  
  },
  computed: {
    newA: {
      get() {
        console.log('取值')
        return this.a;
      },
      set(val) {
        console.log('修改newA的值');
        this.a = val;
      }
    }

  },
  methods: {
    changeVal() {
      console.log(1);
      this.newA = this.inputVal;
    }
  }
})

</script>

<style lang='scss' scoped>
</style>