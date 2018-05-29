import {fetch} from 'common/js/Utils'

export default {
  getPages () {
    return fetch('/api/config/list', {})
  }
}
