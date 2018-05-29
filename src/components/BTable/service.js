import { fetch, API } from 'common/js/Utils'

export default {
  getData (page, params = {}) {
    return fetch(API.page_list, Object.assign({page}, params))
  }
}
