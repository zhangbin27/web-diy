<template lang="pug">
  .admin-header.clear-float
    span.text.theme-color-A(@click="logout")  {{rdata.logout}}
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
  import Cookie from 'js-cookie/src/js.cookie'

  export default {
    name: 'admin-header',
    data () {
      return {
        colors: [],
        visible: {dialog: null}
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
          'theme-color-A': this.config.theme === 'simple',
          'theme-color-D': this.config.theme !== 'simple'
        }
      },
      defaultCls () {
        return {
          'theme-color-A': this.config.theme === 'default',
          'theme-color-D': this.config.theme !== 'default'
        }
      },
      horizontalCls () {
        return {
          'theme-color-A': this.config.layout === 'horizontal',
          'theme-color-D': this.config.layout !== 'horizontal'
        }
      },
      verticalCls () {
        return {
          'theme-color-A': this.config.layout === 'vertical',
          'theme-color-D': this.config.layout !== 'vertical'
        }
      }
    },
    methods: {
      logout () {
        service.logout().then(() => {
          Cookie.remove('token')
          this.$router.push('/sign')
        })
      },
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
        if (this.config.theme === theme) {
          return
        }
        this.config.theme = theme
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
