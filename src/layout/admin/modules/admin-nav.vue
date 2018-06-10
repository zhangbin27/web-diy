<template lang="pug">
  el-menu.admin-nav(:default-active="activePage", @open="handleOpen", @close="handleClose")
    el-menu-item(:index='page._key' v-for="page in pages", @click="toPage(page._key)", :key="page._key")
      span(slot='title') {{page.name}}
</template>

<script>
  import service from '../service'

  export default {
    name: 'admin-nav',
    data () {
      return {
        pages: [],
        activePage: ''
      }
    },
    props: {
      renderData: {
        required: true,
        type: Object
      }
    },
    methods: {
      getPageList () {
        service.getPages().then(res => {
          var pages = res.data
          pages.unshift({name: this.renderData.editor, _key: 'editor'})
          this.pages = pages
          this.activePage = pages[0]._key
        })
      },
      toPage (page) {
        if (page === 'editor') {
          this.$router.push({path: '/admin/editor'})
        } else {
          this.$router.push({path: '/admin/list?page=' + page})
          console.log('this.$router', this.$router.currentRoute)
          if (this.$router.currentRoute.name !== 'editor') {
//            location.reload()
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
