/* eslint-disable */
import { fetch, API, parserUrl } from 'common/js/Utils'

var lang = {
  'numberMessage': '请输入数字',
  'longTextMessage': '请输入小于10000个字符',
  'requiredMessage': '请输入',
  'save': '保存',
  'cancel': '取消',
  'add': '新增',
  'editConfig': '编辑配置',
  'detail': '详情',
  'delete': '删除',
  'edit': '编辑',
  'operateSuccess': '操作成功',
  'operation': '操作',
  'more': '更多',
  'headerCols': [],
  'operateOpts': [
    {
      'label': '${edit}',
      'auth': 'edit'
    },
    {
      'label': '${detail}',
      'auth': 'detail'
    },
    {
      'label': '${delete}',
      'auth': 'delete'
    }
  ],
  'search': '搜索',
  'reset': '重置',
  'searchFields': []
}
export default {
  getRenderDataSync (params) {
    return lang
  },
  getRenderData (params) {
    var data = {
      '${edit}': '编辑',
      '${delete}': '删除',
      '${detail}': '详情'
    }
    var str = JSON.stringify(lang)
    Object.keys(data).forEach(key => {
      str = str.replace(key, data[key])
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
