/* eslint-disable */
import colorParse from 'common/js/colorParse.js'
import styleMixinLess from '!raw-loader!../styleSheet/styleMixin.less'

var handler = function (color) {
  let styleEle = document.createElement('style')
  document.querySelector('head').appendChild(styleEle)
  styleEle.innerHTML = colorParse(color)
  styleEle.name = 'common'
// 加载默认样式
  styleEle = document.createElement('style')
  styleEle.name = 'styleMixin'
  document.querySelector('head').appendChild(styleEle)
  styleEle.innerHTML = colorParse(color, styleMixinLess)
}

if (window.changeColor) {
  window.changeColor.push(handler)
} else {
  window.changeColor = [handler]
}
var colors = JSON.parse(localStorage.getItem('colors')) || []
handler(colors)
