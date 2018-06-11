import { fetch, API } from 'common/js/Utils'
import cookie from 'Cookies'

var lang = {
  editor: '编辑器',
  save: '保存',
  optionColor: '可选配色',
  cancel: '取消',
  color: '选择配色',
  lang: '语言',
  theme: '主题切换'
}

export default {
  getRenderDataSync (params) {
    return lang
  },
  getRenderData (params) {
    return Promise.resolve(lang)
  },
  getColors () {
    return Promise.resolve(JSON.parse(cookie.get('colors') || '[]'))
  },
  setColors (colors) {
    cookie.set('colors', colors)
    return Promise.resolve({re: 200})
  },
  getPages () {
    return fetch(API.config_list, {})
  },
  getConfig () {
    return Promise.resolve({
      colors: {},
      lang: cookie.get('lang') || 'cn',
      theme: 'default'
    })
  }
}
