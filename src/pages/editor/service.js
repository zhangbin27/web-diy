import { fetch } from 'common/js/Utils'

export default {
  saveEnable (params) {
    return fetch('/api/config/set', params)
  },
  getAuditInfo (page) {
    return fetch('/api/config/get', {page})
  }
}
