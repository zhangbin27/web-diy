import { fetch, parserUrl } from 'common/js/Utils'

export default {
  getData (url, params = {}) {
    var query = parserUrl(url)
    return fetch(url, Object.assign(params, query))
  }
}
