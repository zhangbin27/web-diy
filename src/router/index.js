import Vue from 'vue'
import Router from 'vue-router'
import list from '@/pages/list'
import editor from '@/pages/editor'
import audit from '@/pages/audit'
import workflow from '@/pages/workflow'
import adminLayout from '@/layout/admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: adminLayout,
      children: [
        {
          path: 'editor',
          name: 'editor',
          component: editor
        },
        {
          path: 'list',
          component: list,
          name: 'list'
        },
        {
          path: 'audit',
          component: audit,
          name: 'audit'
        },
        {
          path: 'workflow',
          component: workflow,
          name: 'workflow'
        }
      ]
    },
    {
      path: '/',
      name: '',
      component: adminLayout,
      children: [
        {
          path: '/',
          name: 'default',
          component: editor
        }
      ]
    }
  ]
})
