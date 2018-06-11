import colorParse from './colorParse.js'

var styleMixin = {
  mounted: function () {
    this.insertStyleMixin()
  },
  methods: {
    insertStyleMixin: function () {
      var _handler = () => {
        var colors = JSON.parse(localStorage.getItem('colors') || '[]')
        const styleString = colorParse(colors, this.styleMixinLess)
        let styleEle = document.createElement('style')
        document.querySelector('head').appendChild(styleEle)
        styleEle.innerHTML = styleString
      }
      if (window.changeColor) {
        window.changeColor.push(_handler)
      } else {
        window.changeColor = [_handler]
      }
      _handler()
    }
  }
}
export default styleMixin
