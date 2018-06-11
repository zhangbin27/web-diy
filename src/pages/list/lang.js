import cookie from 'Cookies'

var all = {
  en: {
    'numberMessage': 'number only',
    'longTextMessage': 'less than 1w',
    'requiredMessage': 'please input',
    'save': 'save',
    'cancel': 'cancel',
    'add': 'add',
    'editConfig': 'edit config',
    'detail': 'detail',
    'delete': 'delete',
    'edit': 'edit',
    'operateSuccess': 'success!',
    'listObj': {
      'operation': 'operation',
      'more': 'more',
      'headerCols': [],
      'operateOpts': [
        {
          'label': 'edit',
          'auth': 'edit'
        },
        {
          'label': 'detail',
          'auth': 'detail'
        },
        {
          'label': 'delete',
          'auth': 'delete'
        }
      ]
    },
    'searchObj': {
      'search': 'search',
      'reset': 'reset',
      'searchFields': []
    }
  },
  cn: {
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
    'listObj': {
      'operation': '操作',
      'more': '更多',
      'headerCols': [],
      'operateOpts': [
        {
          'label': '编辑',
          'auth': 'edit'
        },
        {
          'label': '详情',
          'auth': 'detail'
        },
        {
          'label': '删除',
          'auth': 'delete'
        }
      ]
    },
    'searchObj': {
      'search': '搜索',
      'reset': '重置',
      'searchFields': []
    }
  }
}
export default all[cookie.get('lang') || 'cn']
