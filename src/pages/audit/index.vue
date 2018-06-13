<template lang="pug">
  .apply-audit
    el-tabs(v-model="currTab")
      el-tab-pane(name="apply", :label="rdata.applyLabel")
        b-search-table(:optHandler='optHandler', :rdata="rdata.apply", :url="url.apply" v-if="currTab=='apply'" ref="apply")
      el-tab-pane(name="audit", :label="rdata.auditLabel")
        b-search-table(:optHandler='optHandler', :rdata="rdata.audit", :url="url.audit" v-if="currTab=='audit'" ref="audit")
      el-tab-pane(name="history", :label="rdata.historyLabel")
        b-search-table(:optHandler='optHandler', :rdata="rdata.history", :url="url.history" v-if="currTab=='history'" ref="history")
      el-tab-pane(name="add", :label="rdata.applyNow")
        add(:rdata="rdata", :visible="visible", @refresh="refresh")
    component(:is="visible.dialog", :currRow="currRow", :rdata="rdata", :visible="visible", @refresh="refresh")
</template>

<script>
  import service from './service'
  import BSearchTable from 'components/BSearchTable'
  import BButton from 'components/BButton'
  import edit from './modules/edit'
  import process from './modules/process'

  export default {
    name: 'audit',
    data () {
      return {
        currTab: 'apply',
        url: {
          history: '/api/auditHistoryList',
          audit: '/api/auditList',
          apply: '/api/applyList'
        },
        rdata: service.getRenderDataSync({page: 'audit'}),
        currRow: {},
        visible: {
          dialog: null,
          page: null
        },
        optHandler: {
          cancel: this.cancel,
          process: this.process,
          checkHistory: this.checkHistory
        }
      }
    },
    created () {
      var params = {page: 'audit'}
      service.getRenderData(params).then(res => {
        Object.assign(this.rdata, res)
      })
    },
    methods: {
      refresh () {
        this.$refs[this.currTab].search()
      },
      checkHistory (row) {
        this.currRow = row
        this.visible.dialog = 'checkHistory'
      },
      process (row) {
        this.currRow = row
        this.visible.dialog = 'process'
      },
      cancel (row) {
        this.currRow = row
        service.cancel(row).then(res => {
          this.$message({type: 'success', message: this.rdata.operateSuccess})
          this.refresh()
        })
      }
    },
    components: {
      BButton,
      'add': edit,
      'process': process,
      'checkHistory': process,
      BSearchTable
    },
    mounted () {
    }
  }
</script>

<style lang="less">
  .el-tabs__content {
    margin-top: 25px;
  }
</style>
