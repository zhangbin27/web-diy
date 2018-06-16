<template lang="pug">
  .list
    .oper-container.clear-float
      i.el-icon-plus(@click="add" :title="rdata.add")
      i.icon.iconfont.icon-user_profile_icon_1(@click="viewGraph" :title="rdata.viewGraph")
      i.el-icon-setting(@click="editConfig" :title="rdata.editConfig")
    b-search-table(:optHandler='optHandler' :rdata="rdata" :url="pageInfo.listUrl" ref="table" v-if="!switching&&pageInfo.listUrl" :params="{pid:pageInfo.pid}")

    component(:is="visible.dialog" :currRow="currRow" :rdata="rdata" :visible="visible"
      :pageInfo="pageInfo" :formItems="formItems" @refresh="refresh" :table='table' @get-table-data='getTableData')
</template>

<script>
  import service from './service'
  import BSearchTable from 'components/BSearchTable'
  import BButton from 'components/BButton'
  import edit from './modules/edit'
  import viewGraph from './modules/view-graph'

  export default {
    name: 'list',
    data () {
      // z todo 可以增加两个默认字段，创建时间，编辑时间
      // z todo 可以做报表
      // z todo 可以兼容手机端
      return {
        pageInfo: {},
        rdata: service.getRenderDataSync({page: 'list'}),
        formItems: [],
        table: [],
        switching: false,
        currRow: {},
        page: this.$router.currentRoute.query.page,
        visible: {
          dialog: null,
          page: null
        },
        optHandler: {
          edit: this.edit,
          detail: this.detail,
          delete: this.delete
        }
      }
    },
    computed: {
    },
    created () {
      var params = {page: 'list'}
      service.getRenderData(params).then(res => {
        Object.assign(this.rdata, res)
      })
    },
    methods: {
      editConfig () {
        this.$router.push({path: `/admin/editor?page=${this.page}`})
      },
      refresh () {
        this.$refs['table'].search()
      },
      getTableConfig (cb) {
        service.getTableConfig(this.page).then(res => {
          this.rdata.searchFields = res.searchFields
          this.rdata.headerCols = res.headerCols
          this.formItems = res.formItems
          this.pageInfo = res.info
          cb && cb()
        })
      },
      reload () {
        this.page = this.$router.currentRoute.query.page
        this.getTableConfig(() => {
          this.switching = true
          setTimeout(() => {
            this.switching = false
          })
        })
      },
      getTableData () {
        this.table = this.$refs['table'].getTableData()
      },
      add () {
        this.visible.dialog = 'add'
      },
      viewGraph () {
        this.visible.dialog = 'view-graph'
      },
      edit (row) {
        this.currRow = row
        this.visible.dialog = 'edit'
      },
      detail (row) {
        this.currRow = row
        this.visible.dialog = 'detail'
      },
      delete (row) {
        this.currRow = row
        service.delete(row, this.pageInfo.deleteUrl).then(res => {
          this.$message({type: 'success', message: this.rdata.operateSuccess})
          this.refresh()
        })
      }
    },
    components: {
      BButton,
      'view-graph': viewGraph,
      'add': edit,
      'detail': edit,
      'edit': edit,
      BSearchTable
    },
    mounted () {
      this.getTableConfig()
      window._listPage = this
    },
    watch: {
      'page' () {
      }
    }
  }
</script>

<style lang="less">
  .oper-container {
    i {
      cursor: pointer;
      padding: 0 15px;
      font-size: 15px;
      font-weight: bold;
    }
    .el-icon-plus {
      float: left;
    }
    .el-icon-setting {
      float: right;
    }
    margin-bottom: 12px;
  }
</style>
