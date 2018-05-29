import {fetch, API} from 'common/js/Utils'

export default {
  getPages () {
    return fetch(API.config_list, {})
  }
}
