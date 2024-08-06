
// 定义类
class Single {
  // 声明静态属性
  static #instance
  // 声明静态方法
  static getInstance () {
    if(this.#instance === undefined) {
      this.#instance = new Single()
    }
  }
}

const a = Single.getInstance();
const b = Single.getInstance();

console.log(a === b);

