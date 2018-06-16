import { fetch, API, lang, colorsList } from 'common/js/Utils'

export default {
  getColorListSync () {
    return colorsList
  },
  getRenderDataSync (params) {
    return lang[params.page]
  },
  logout (params = {}, url = '/api/user/logout') {
    // return Promise.resolve({re: 200})
    return fetch(url, params)
  },
  getPages () {
    return fetch(API.page_list, {})
  },
  // api
  getRenderData (page, text) {
    return Object.assign(lang[page], text[page])
  },
  getText () {
    return Promise.resolve(JSON.parse(localStorage.getItem('text')))
  },
  setText (data) {
    localStorage.setItem('text', JSON.stringify(data))
    return Promise.resolve({re: 200})
  },
  setConfig (params = {}, url = '/api/config/edit') {
    return fetch(url, params)
  },
  getConfig (params = {}, url = '/api/config/detail') {
    return fetch(url + '?key=' + new Date().getTime(), params).then(res => {
      console.log('getConfig res', res)
      res.data = res.data || {
        layout: 'horizontal',
        theme: 'default',
        colors: colorsList[2],
        text: lang
      }
      return res
    })
  }
}
