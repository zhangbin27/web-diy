import cookie from 'js-cookie'
var all = {
  en: {
    editor: 'editor',
    optionColor: 'optionColor',
    save: 'save',
    cancel: 'cancel',
    lang: 'lang',
    color: 'color',
    theme: 'theme'
  },
  cn: {
    editor: '编辑器',
    save: '保存',
    optionColor: '可选配色',
    cancel: '取消',
    color: '选择配色',
    lang: '语言',
    theme: '主题切换'
  }
}
export default all[cookie.get('lang') || 'cn']
