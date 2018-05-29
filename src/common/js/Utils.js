import _fetch from './fetch'
import _constants from './constants'
import _validator from './validator'
import _API from './API'

var utils = {
  fetch: _fetch,
  constants: _constants,
  validator: _validator,
  debounce: function (handle, delay = 100) {
    var t = null
    clearTimeout(t)
    t = setTimeout(() => {
      handle && handle()
    }, delay)
  }
}

export const constants = _constants
export const validator = _validator
export const fetch = _fetch
export const API = _API
export default utils
