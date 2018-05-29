/* eslint-disable */
import { fetch } from 'common/js/Utils'

export default {
  delete (row, page) {
    return fetch('/api/page/delete', {row, page})
  },
  getDetail (row, page) {
    return fetch('/api/page/detail', {row, page})
  },
  edit ({page: page, data: params}) {
    return fetch('/api/page/edit', {params, page})
  },
  getTableConfig (page = '') {
    return fetch('/api/config/get', {page}).then(({data: {formItemList}}) => {
      return {
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
