/* eslint-disable */
import { fetch, API, parserUrl, lang } from 'common/js/Utils'

export default {
  getRenderDataSync (params) {
    return lang[params.page]
  },
  getRenderData (params) {
    var text = JSON.parse(localStorage.getItem('text') || '{}')
    var pageLang = Object.assign(lang[params.page], text[params.page])
    var str = JSON.stringify(pageLang)
    var keys = ['__edit__', '__delete__', '__detail__']
    keys.forEach(key => {
      str = str.replace(new RegExp(key, 'g'), pageLang[key])
    })
    return Promise.resolve(JSON.parse(str))
  },
  delete (row, url) {
    var query = parserUrl(url)
    return fetch(url, Object.assign(query, {row}))
  },
  getDetail (row, url) {
    var query = parserUrl(url)
    return fetch(url, Object.assign(query, {row}))
  },
  edit ({page: page, data: params}, url) {
    var query = parserUrl(url)
    return fetch(url, Object.assign(query, {params}))
  },
  getTableConfig (page = '') {
    return fetch(API.config_get, {page}).then(({data}) => {
      var {formItemList} = data
      return {
        info: data,
        formItemList: formItemList,
        headerCols: formItemList.map(item => ({field: item.key, label: item.label, list: item.list})),
        searchFields: formItemList.map(item => ({
          search: item.search,
          field: item.key,
          dataSource: item.dataSource,
          type: item.type,
          label: item.label,
          width: 3,
          placeholder: item.placeholder
        }))
      }
    })
  }
}
