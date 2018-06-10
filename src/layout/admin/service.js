import { fetch, API } from 'common/js/Utils'
import cookie from 'js-cookie'

export default {
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
