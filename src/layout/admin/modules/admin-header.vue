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
    edit-color(:renderData="renderData" v-if="showColorModal", @close="closeModal")
</template>

<script>
  import service from '../service'
  import editColor from './edit-color'
  import cookie from 'js-cookie'

  export default {
    name: 'admin-header',
    data () {
      return {
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
      editColor
    },
    methods: {
      closeModal () {
        this.showColorModal = false
      },
      chooseColor () {
        this.showColorModal = true
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
