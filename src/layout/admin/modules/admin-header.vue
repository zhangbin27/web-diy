<template lang="pug">
  .admin-header.clear-float
    .theme
      span(@click="themeChange('default')" :class="defaultCls")  default
      span &nbsp;/&nbsp;
      span(@click="themeChange('simple')" :class="simpleCls")   simple
    .layout
      span(@click="layoutChange('vertical')" :class="verticalCls")  vertical
      span &nbsp;/&nbsp;
      span(@click="layoutChange('horizontal')" :class="horizontalCls")   horizontal
    span.colors.theme-color-A(@click="chooseColor")  {{rdata.color}}
    span.text.theme-color-A(@click="configText")  {{rdata.configText}}
    component(:is="visible.dialog", :rdata="rdata", @close="closeModal", :colors="colors")
</template>

<script>
  import service from '../service'
  import editColor from './edit-color'
  import editText from './edit-text'

  export default {
    name: 'admin-header',
    data () {
      return {
        colors: [],
        visible: {dialog: null},
        theme: this.config.theme,
        layout: this.config.layout
      }
    },
    props: {
      rdata: {
        required: true,
        type: Object
      },
      config: {
        required: true,
        type: Object
      }
    },
    components: {
      'edit-color': editColor,
      'edit-text': editText
    },
    computed: {
      simpleCls () {
        return {
          'theme-color-A': this.theme === 'simple',
          'theme-color-D': this.theme !== 'simple'
        }
      },
      defaultCls () {
        return {
          'theme-color-A': this.theme === 'default',
          'theme-color-D': this.theme !== 'default'
        }
      },
      horizontalCls () {
        return {
          'theme-color-A': this.layout === 'horizontal',
          'theme-color-D': this.layout !== 'horizontal'
        }
      },
      verticalCls () {
        return {
          'theme-color-A': this.layout === 'vertical',
          'theme-color-D': this.layout !== 'vertical'
        }
      }
    },
    methods: {
      getColors () {
        service.getColors().then(colors => {
          this.colors = colors
          window.changeColor.forEach(fn => fn(this.colors))
        })
      },
      closeModal () {
        this.visible.dialog = null
      },
      configText () {
        this.visible.dialog = 'edit-text'
      },
      chooseColor () {
        this.visible.dialog = 'edit-color'
      },
      themeChange (theme) {
        if (this.theme === theme) {
          return
        }
        this.theme = theme
        service.setTheme({theme}).then(() => {
          this.$emit('refresh')
        })
      },
      layoutChange (layout) {
        if (this.layout === layout) {
          return
        }
        this.layout = layout
        service.setLayout({layout}).then(() => {
          this.$emit('refresh')
        })
      }
    },
    mounted () {
      this.getColors()
    }
  }
</script>

<style lang="less" scoped>
  .admin-header {
    height: 40px;
    line-height: 40px;
    .colors, .text, .theme, .layout {
      cursor: pointer;
      float: right;
      margin-left: 20px;
    }
  }
</style>
