import Vue from 'vue'
import Router from 'vue-router'
import list from '@/pages/list'
import editor from '@/pages/editor'
import audit from '@/pages/audit'
import sign from '@/pages/sign'
import workflow from '@/pages/workflow'
import adminLayout from '@/layout/admin'
import { getLoginStatus, lang } from 'common/js/Utils'
import { MessageBox } from 'element-ui'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: adminLayout,
      beforeEnter (to, from, next) {
        var rdata = lang['sign']
        if (getLoginStatus()) {
          next()
        } else {
          MessageBox.alert(rdata.pleaseLogin, rdata.tooltip, {
            confirmButtonText: rdata.config,
            callback: action => {
              if (action === 'confirm') {
                next('/sign')
              }
            }
          })
        }
      },
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
      name: 'default',
      component: sign
    },
    {
      path: '/sign',
      name: 'sign',
      component: sign
    }
  ]
})
