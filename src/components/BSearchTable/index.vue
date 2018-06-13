<template lang="pug">
  .b-search-table
    .search-container
      b-search-form(:search-fields="rdata.searchFields", :search-data="searchData", :params="params", @search='search', @reset='reset', :rdata="rdata")
    .table.form-area
      b-table.theme-bg-H(:search-data="searchData", :rdata="rdata", ref="table", :url="url", :params="params", :opt-handler="optHandler", :initSearch="initSearch",
      :opts-filter="optsFilter", :tableType="tableType", :selectedRows="selectedRows", @selection-change="selectionChange", :valueKey="valueKey", :getRowClass="getRowClass", :uid="uid")
        template(slot="batchOperate", slot-scope="props")
          slot(name="batchOperate", :total="props.total")
        template(slot="expand", slot-scope="props")
          slot(name="expand", :row="props.row", :otherCols="props.otherCols", :computedOpts="props.computedOpts", :computedHeaderCols="props.computedHeaderCols", :operateOpts="props.operateOpts")
    .clear
</template>

<script>
  import BSearchForm from 'components/BSearchForm'
  import BTable from 'components/BTable'

  export default {
    name: 'b-search-table',
    data () {
      return {
        currRow: {},
        searchData: {}
      }
    },
    props: {
      uid: {
        type: String
      },
      params: {
        type: Object,
        default: function () {
          return {}
        }
      },
      getRowClass: {
        type: Function
      },
      selectedRows: {
        type: Array
      },
      url: {
        type: String,
        required: true
      },
      valueKey: {
        type: String
      },
      optsFilter: {
        type: Function
      },
      optHandler: {
        type: Object
      },
      rdata: {
        type: Object,
        required: true
      },
      tableType: {
        type: Object
      },
      initSearch: {
        type: Object
      }
    },
    methods: {
      getTableData () {
        return this.$refs['table'].getTableData()
      },
      selectionChange () {
        this.$emit('selection-change', ...arguments)
      },
      search () {
        this.$refs.table.search()
      },
      reset () {
        for (var key in this.searchData) {
          this.searchData[key] = ''
        }
        for (var o in this.initSearch) {
          this.initSearch[o] = ''
        }
      }
    },
    components: {
      BTable,
      BSearchForm
    }
  }
</script>

<style lang="less">
  .pagination {
    margin-top: 20px;
    margin-bottom: 50px;
  }
</style>

<style lang="less">
  .theme-simple {
    .pagination {
      margin-top: 20px;
      margin-bottom: 50px;
    }
  }
</style>
