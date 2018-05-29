/* eslint-disable */
import { fetch, API, parserUrl } from 'common/js/Utils'

export default {
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
