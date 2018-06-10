// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import './common/js/commonComp'
import './common/js'
import './common/styleSheet/common.less'
import './common/styleSheet/font/iconfont.js'
import cookie from 'js-cookie'
import locale from 'element-ui/lib/locale'
import en from 'element-ui/lib/locale/lang/en'
import cn from 'element-ui/lib/locale/lang/zh-CN'

Vue.config.productionTip = false
Vue.use(ElementUI)
locale.use(cookie.get('lang') === 'en' ? en : cn)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
