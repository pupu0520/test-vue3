export interface IProdcut {
  id: number
  title: string
  price: number
  stock: number
}


const list :IProdcut[] = [
  {id: 1,title: '锅', price: 10, stock: 100},
  {id: 2,title: '碗', price: 5, stock: 1008},
  {id: 3,title: '筷子', price: 3, stock: 1040}
]

export const getList = async () => {
  await sleep(100)
  return list;
}


async function sleep(num: number) {
  return new Promise(res => { setTimeout(res, num)})
}