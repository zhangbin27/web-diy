<template lang="pug">
  .layout(:class="[layout, 'theme-'+theme]")
    .container.clear-float
      .nav-container.theme-bg-B
        admin-nav(:rdata="rdata", :layout="layout")
      .content.theme-bg-H
        admin-header(:rdata="rdata" @refresh="refresh" :config="{layout, theme}")
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
        theme: 'default',
        rdata: service.getRenderDataSync({page: 'admin'})
      }
    },
    created () {
      var params = {page: 'admin'}
      service.getRenderData(params).then(res => {
        Object.assign(this.rdata, res)
      })
    },
    methods: {
      refresh () {
        this.getConfig()
      },
      getConfig () {
        service.getConfig().then(res => {
          this.layout = res.layout
          this.theme = res.theme
        })
      }
    },
    mounted () {
      this.getConfig()
    },
    components: {
      adminNav,
      adminHeader
    }
  }
</script>

<style lang="less">
  .layout.vertical {
    height: 100%;
    > .container {
      height: 100%;
      display: flex;
      flex-direction: column;
      .nav-container {
        padding: 0 20px;
        .admin-nav {
          margin: auto;
          width: 1200px;
        }
      }
      > .content {
        padding: 20px;
        margin: auto;
        width: 1200px;
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
      > .nav-container {
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
