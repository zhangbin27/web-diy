import { fetch, API, lang } from 'common/js/Utils'

export default {
  getRenderDataSync (params) {
    return lang[params.page]
  },
  getRenderData (params) {
    var text = JSON.parse(localStorage.getItem('text') || '{}')
    return Promise.resolve(Object.assign(lang[params.page], text[params.page]))
  },
  getColors () {
    return Promise.resolve(JSON.parse(localStorage.getItem('colors') || '[]'))
  },
  setColors (colors) {
    localStorage.setItem('colors', JSON.stringify(colors))
    return Promise.resolve({re: 200})
  },
  getPages () {
    return fetch(API.config_list, {})
  },
  getText () {
    return Promise.resolve(JSON.parse(localStorage.getItem('text')))
  },
  setText (data) {
    localStorage.setItem('text', JSON.stringify(data))
    return Promise.resolve({re: 200})
  },
  getConfig () {
    return Promise.resolve({
      theme: localStorage.getItem('theme')
    })
  }
}
