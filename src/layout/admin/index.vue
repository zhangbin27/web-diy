<template lang="pug">
  .admin-layout
    .container.clear-float
      admin-nav.left(:renderData="renderData")
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
      }
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

  .admin-layout {
    height: 100%;
    display: flex;
    flex-direction: column;
    .container {
      flex-grow: 1;
      display: flex;
      height: 100%;
      .left {
        width: 200px;
        padding: 50px 0;
      }
      .content {
        padding: 20px;
        position: relative;
        flex-grow: 1;
        overflow-y: auto;
        background-size: 0 0;
      }
    }
  }

  @media screen and  (min-width: 1250px) {
    .admin-layout {
      .container {
      }
    }
  }

  @media screen and (max-width: 1250px) {
    .admin-layout {
      .container {
        .content {
        }
      }
    }
  }

</style>
