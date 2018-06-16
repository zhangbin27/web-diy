import _fetch from './fetch'
import _constants from './constants'
import _validator from './validator'
import _API from './API'
import _lang from './lang'
import _colorsList from './colors'
import Cookie from 'js-cookie/src/js.cookie'

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

function _getLoginStatus () {
  return !!Cookie.get('token')
}

export const lang = _lang
export const getLoginStatus = _getLoginStatus
export const constants = _constants
export const validator = _validator
export const fetch = _fetch
export const API = _API
export const colorsList = _colorsList
export const parserUrl = function (url) {
  var query = url.split('?')[1] || ''
  return query.split('&').reduce((res, item) => {
    var [key, val] = item.split('=')
    res[key] = val
    return res
  }, {})
}
export default utils
