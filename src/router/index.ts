import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 修改为history 模式
  routes: [
    {
      path:'/',
      redirect:'/vue/pinia',
    },
    {
      path: '/vue',
      name: 'vue',
      component: Layout,
      meta: {
        menu: true, displayName: 'vue'
      },
      children: [
        {
          path: 'pinia',
          name: 'pinia',
          meta: {
            menu: true, displayName: 'pinia'
          },
          component: () => import('views/vue/PiniaTest.vue')
        }, {
          path: 'todo-list',
          name: 'todo-list',
          meta: {
            menu: true, displayName: 'todo-list'
          },
          component: () => import('views/vue/TodoList.vue')
        }, {
          path: 'props',
          name: 'props',
          meta: {
            menu: true, displayName: 'props'
          },
          component: () => import('views/vue/Props/index.vue')
        }
      ]
    },
    {
      path: '/work',
      name: 'work',
      meta: {
        menu: true, displayName: '工作'
      },
      component: Layout,
      children:  [
        {
          path: 'ib',
          name: 'ib',
          meta: {
            menu: true, displayName: 'IB'
          },
          component: () => import('@/views/work/ib-page.vue')
        }
      ]
    },
    {
      path: '/leafer',
      name: 'leafer',
      meta: {
        menu:true, displayName: 'LeaferJS'
      },
      component: Layout,
      children:  [
        {
          path: 'test',
          name: 'test',
          meta: {
            menu: true, displayName: 'test'
          },
          component: () => import('@/views/leafer/index.vue')
        }
      ]
    },
    {
      path: '/file-upload',
      name: 'fileUpload',
      meta: {
        menu:true, displayName: '文件上传'
      },
      component: Layout,
      children:  [
        {
          path: 'single-file',
          name: 'singleFile',
          meta: {
            menu: true, displayName: '单文件'
          },
          component: () => import('@/views/file/single-file/index.vue')
        },
        {
          path: 'multiple-file',
          name: 'multipleFile',
          meta: {
            menu: true, displayName: '多文件'
          },
          component: () => import('@/views/file/multiple-file/index.vue')
        }
      ]
    },
    {
      path: '/three',
      name: 'three',
      meta: {
        menu: true, displayName: 'three',
      },
      component: Layout,
      children: [{
        path: 'jump',
        name: 'jump',
        meta: {
          menu: 'true', displayName: '跳一跳',
        },
        component: () => import('@/views/three/jump/index.vue')
      },{
        path: 'cake',
        name: 'cake',
        meta: {
          menu: 'true', displayName: '蛋糕',
        },
        component: () => import('@/views/three/cake/index.vue')
      },{
        path: 'home',
        name: 'home',
        meta: {
          menu: 'true', displayName: '房子',
        },
        component: () => import('@/views/three/home/index.vue')
      },{
        path:'test',
        name: 'test',
        meta: {
          menu: 'true', displayName: '基础',
        },
        component: () => import('@/views/three/base/index.vue')
      }]
    }
  ]
})

export default router
