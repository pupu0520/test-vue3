
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  // 相当于vue2中data
  state: () => {
    return {
      count: 100,
      foo: 'bar',
      arr: [1,2,3]
    }
  },
  // 相当于vue2中computed
  getters: {
    count10():number {
      // 用this 
      return this.count + 10
    }
  },
  // 相当于vue2中methods
  actions: {
    changeState(num: number) {
      // 对应pinia页面的方式一
      // pinia页面中的三种方式都可以使用
      this.count += num;
      this.foo = 'hello';
      this.arr.push(111)
    }
  }
})