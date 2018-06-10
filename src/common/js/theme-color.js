/* eslint-disable */
import colorParse from 'common/js/colorParse.js'
import styleMixinLess from '!raw-loader!../styleSheet/styleMixin.less'

var color = [
  {'key': '@A', 'value': '#8000ff'},
  {'key': '@B', 'value': '#ff8080'},
  {
    'key': '@C',
    'value': '#000040'
  },
  {'key': '@D', 'value': '#e2e2e2'},
  {'key': '@E', 'value': '#00ff40'},
  {
    'key': '@F',
    'value': '#ffff00'
  },
  {'key': '@G', 'value': '#ff0000'},
  {'key': '@H', 'value': '#f8fff0'},
  {
    'key': '@I',
    'value': '#e6ffe6'
  },
  {'key': '@J', 'value': '#f0f0f0'}
]

window.changeColor = function (color) {
  let styleEle = document.createElement('style')
  document.querySelector('head').appendChild(styleEle)
  styleEle.innerHTML = colorParse(color)

// 加载默认样式
  styleEle = document.createElement('style')
  document.querySelector('head').appendChild(styleEle)
  styleEle.innerHTML = colorParse(color, styleMixinLess)
}

window.changeColor(color)
