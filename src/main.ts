import { createApp } from 'vue'
import { createPinia } from 'pinia'


// import App from './App.vue'
import App from './NewApp.vue'
import router from './router'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')

// 开发分支 dev
// 个人分支 anxp

// 代码仓库:远程分支
// 克隆代码到本地电脑:本地分支

// 远程与本地分支的交互(针对同一个分支的交互，比如远程个人分支与本地个人分支，远程dev分支与本地dev分支)：
// 1. 远程代码同步到本地（pull)
// 2. 本地代码推送到远程（push)

// dev与个人分支交互：
// 1. 本地：dev同步代码到个人分支（看项目要求，一般使用merge即可）
// (merge或rebase，merge就是把本次代码直接追加到主分支后面，rebase是看大家的提交时间，大家的代码按时间顺序成一条线加到主分支里面)；
// 2. 远程：个人分支合并到dev(在网页端操作，提交merge request)

// 个人分支提交代码并推到远程：
// 0. 个人分支开发完，可能经过了很久的时间，期间dev可能有其他人提交，如果想自己在提交前先更新最新的dev分支，可以先把自己的代码暂存一下，
// 更新完dev的代码，再把暂存的放出来，暂存命令：git stash 放出命令：git stash pop
// 1. git add .
// 2. git commit -m '提交信息'
// 2.1 如果没有执行第0步,可在此处执行更新dev代码、合并dev代码到个人分支的操作
// 3. git push
// 3.1 即使在此时发现忘了更新dev代码也无所谓，重新执行更新dev、合并dev到个人分支

// 如果在dev分支往个人分支同步代码时，出现冲突，需要先解决冲突，再提交。
// 冲突会有类型提示，如执行了merge导致的冲突，会提示merge冲突；
// 1. 解冲突；
// 2. 解完冲突执行git merge --continue (如果是rebase冲突，执行git rebase --continue)
// 3. 重复上面的add、commit 、push等草错