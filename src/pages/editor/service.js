import { fetch, API, lang } from 'common/js/Utils'

export default {
  getRenderDataSync (params) {
    return lang[params.page]
  },
  getRenderData (params) {
    var text = JSON.parse(localStorage.getItem('text') || '{}')
    return Promise.resolve(Object.assign(lang[params.page], text[params.page]))
  },
  saveEnable (params) {
    return fetch(API.config_set, params)
  },
  getAuditInfo (page) {
    return fetch(API.config_get, {page})
  }
}
