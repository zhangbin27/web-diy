<template lang="pug">
  .list
    .oper-container.clear-float
      i.el-icon-plus(@click="add", :title="renderData.add")
      i.el-icon-setting(@click="editConfig", :title="renderData.editConfig")
    b-search-table(:optHandler='optHandler', :render-data="table", :url="pageInfo.listUrl", ref="table" v-if="pageInfo.listUrl")

    component(:is="visible.dialog", :currRow="currRow", :renderData="renderData", :visible="visible", :pageInfo="pageInfo", :formItemList="formItemList", @refresh="refresh")
</template>

<script>
  import service from './service'
  import BSearchTable from 'components/BSearchTable'
  import BButton from 'components/BButton'
  import renderData from './lang'
  import edit from './modules/edit'

  export default {
    name: 'list',
    data () {
      // z todo 可以增加两个默认字段，创建时间，编辑时间
      // z todo 可以做报表
      // z todo 可以兼容手机端
      return {
        pageInfo: {},
        renderData: renderData,
        formItemList: [],
        currRow: {},
        page: this.$router.currentRoute.query.page,
        visible: {
          dialog: null,
          page: null
        },
        table: renderData,
        optHandler: {
          edit: this.edit,
          detail: this.detail,
          delete: this.delete
        }
      }
    },
    computed: {
    },
    methods: {
      editConfig () {
        this.$router.push({path: `/admin/editor?page=${this.page}`})
      },
      refresh () {
        this.$refs['table'].search()
      },
      add () {
        this.visible.dialog = 'add'
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
          this.$message({type: 'success', message: this.renderData.operateSuccess})
          this.refresh()
        })
      }
    },
    components: {
      BButton,
      'add': edit,
      'detail': edit,
      'edit': edit,
      BSearchTable
    },
    async mounted () {
      console.log('log', this.$router.page)
      await service.getTableConfig(this.page).then(res => {
        this.table.searchObj.searchFields = res.searchFields
        this.table.listObj.headerCols = res.headerCols
        this.formItemList = res.formItemList
        this.pageInfo = res.info
      })
    },
    watch: {
      'page' () {
        console.log('currentRoute.dialog change')
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
