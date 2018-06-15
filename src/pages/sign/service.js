import {lang} from 'common/js/Utils'

export default {
  getRenderDataSync (params) {
    return lang[params.page]
  },
  login (params, url = '/watch/login') {
    // return fetch(url, {params})
    return Promise.resolve({
      re: 200,
      token: 'zhai'
    })
  },
  signUp (params, url = '/watch/login') {
    // return axios.get(url, {params})
    return Promise.resolve({re: 200})
  },
  getConfig () {
    return Promise.resolve({
      layout: localStorage.getItem('layout') || 'horizontal',
      theme: localStorage.getItem('theme') || 'default'
    })
  }
}
