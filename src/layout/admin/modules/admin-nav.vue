<template lang="pug">
  el-menu.admin-nav(:default-active="activePage", @open="handleOpen", @close="handleClose" :mode="mode")
    el-menu-item(:index='page._key' v-for="page in pages", @click="toPage(page._key)", :key="page._key")
      span(slot='title') {{page.name}}
</template>

<script>
  import service from '../service'

  export default {
    name: 'admin-nav',
    data () {
      var {path, query} = this.$router.currentRoute
      var page = ['/admin/editor', '/admin/audit'].includes(path) ? path.slice(path.lastIndexOf('/') + 1) : query.page
      return {
        pages: [],
        activePage: page
      }
    },
    props: {
      rdata: {
        required: true,
        type: Object
      },
      layout: {
        required: true,
        type: String,
        default: 'horizontal'
      }
    },
    computed: {
      mode () {
        return this.layout === 'vertical' ? 'horizontal' : 'vertical'
      }
    },
    methods: {
      getPageList () {
        service.getPages().then(res => {
          var pages = res.data
          pages.unshift({name: this.rdata.audit, _key: 'audit'})
          pages.unshift({name: this.rdata.workflow, _key: 'workflow'})
          pages.unshift({name: this.rdata.editor, _key: 'editor'})
          this.pages = pages
        })
      },
      toPage (page) {
        if (page === 'editor' || page === 'audit' || page === 'workflow') {
          this.$router.push({path: '/admin/' + page})
        } else {
          var pre = this.$router.currentRoute.name
          this.$router.push({path: '/admin/list?page=' + page})
          if (window._listPage && pre === 'list') {
            window._listPage.reload()
          }
        }
      },
      handleOpen () {
      },
      handleClose () {
      }
    },
    mounted () {
      this.getPageList()
    }
  }
</script>

<style lang="less" scoped>
  .admin-nav {
  }
</style>
