import { fetch, API } from 'common/js/Utils'

export default {
  saveEnable (params) {
    return fetch(API.config_set, params)
  },
  getAuditInfo (page) {
    return fetch(API.config_get, {page})
  }
}
