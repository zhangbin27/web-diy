import { fetch } from 'common/js/Utils'

export default {
  getData (page, params = {}) {
    return fetch('/api/page/list', Object.assign({page}, params))
  }
}
