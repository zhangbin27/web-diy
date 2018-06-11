<template lang="pug">
  .admin-header.clear-float
    el-dropdown.theme(@command="themeChange")
      span.el-dropdown-link
        | {{renderData.theme}}
      el-dropdown-menu(slot="dropdown")
        el-dropdown-item(command='default')  default
        el-dropdown-item(command="simple")  simple
    el-dropdown.lang(@command="langChange")
      span.el-dropdown-link
        |  {{renderData.lang}}
      el-dropdown-menu(slot="dropdown")
        el-dropdown-item(command="cn") 中文简体
        el-dropdown-item(command='en') English
    span.colors.theme-color-A(@click="chooseColor")  {{renderData.color}}
    component(:is="visible.dialog", :renderData="renderData" v-if="showColorModal", @close="closeModal")
</template>

<script>
  import service from '../service'
  import editColor from './edit-color'
  import editText from './edit-text'
  import cookie from 'Cookies'

  export default {
    name: 'admin-header',
    data () {
      return {
        visible: {dialog: null},
        lang: 'en',
        showColorModal: false,
        theme: 'default'
      }
    },
    props: {
      renderData: {
        required: true,
        type: Object
      }
    },
    components: {
      editColor,
      editText
    },
    methods: {
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
        this.theme = theme
      },
      langChange (lang) {
        this.lang = lang
        cookie.set('lang', lang)
        window.location.reload()
      },
      getConfig () {
        service.getConfig().then(res => {
          this.lang = res.lang
          this.theme = res.theme
        })
      }
    },
    mounted () {
      this.getConfig()
    }
  }
</script>

<style lang="less" scoped>
  .admin-header {
    height: 40px;
    line-height: 40px;
    .colors, .lang, .theme {
      cursor: pointer;
      float: right;
      margin-left: 20px;
    }
  }
</style>
