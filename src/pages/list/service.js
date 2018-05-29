/* eslint-disable */
import { fetch, API } from 'common/js/Utils'

export default {
  delete (row, page) {
    return fetch(API.page_delete, {row, page})
  },
  getDetail (row, page) {
    return fetch(API.page_detail, {row, page})
  },
  edit ({page: page, data: params}) {
    return fetch(API.page_edit, {params, page})
  },
  getTableConfig (page = '') {
    return fetch(API.config_get, {page}).then(({data: {formItemList}}) => {
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
