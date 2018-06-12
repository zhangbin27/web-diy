<template lang="pug">
  .layout(:class="[layout]")
    .container.clear-float
      admin-nav.left(:renderData="renderData", :layout="layout")
      .content.theme-bg-H
        admin-header(:renderData="renderData" @refresh="refresh")
        router-view
</template>

<script>
  import adminNav from './modules/admin-nav'
  import adminHeader from './modules/admin-header'
  import service from './service'

  export default {
    name: 'admin-layout',
    data () {
      return {
        layout: 'horizontal',
        renderData: service.getRenderDataSync({page: 'admin'})
      }
    },
    created () {
      var params = {page: 'admin'}
      service.getRenderData(params).then(res => {
        Object.assign(this.renderData, res)
      })
    },
    methods: {
      refresh () {
        this.$emit('refresh')
        this.layout = window.localStorage.getItem('layout')
      },
      getLayout () {
        service.getLayout().then(res => {
          this.layout = res
        })
      }
    },
    mounted () {
      this.getLayout()
    },
    components: {
      adminNav,
      adminHeader
    }
  }
</script>

<style lang="less">
  html {
    height: 100%;
    body {
      height: 100%;
      min-width: 850px;
    }
  }

  .layout.vertical {
    height: 100%;
    > .container {
      height: 100%;
      display: flex;
      flex-direction: column;
      > .top {
      }
      > .content {
        padding: 20px;
        position: relative;
        flex-grow: 1;
        overflow-y: auto;
        background-size: 0 0;
      }
    }
  }

  .layout.horizontal {
    height: 100%;
    display: flex;
    flex-direction: column;
    > .container {
      flex-grow: 1;
      display: flex;
      height: 100%;
      > .left {
        width: 200px;
        padding: 50px 0;
      }
      > .content {
        padding: 20px;
        position: relative;
        flex-grow: 1;
        overflow-y: auto;
        background-size: 0 0;
      }
    }
  }

</style>
