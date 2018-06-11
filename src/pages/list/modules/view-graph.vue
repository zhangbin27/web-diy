<template lang="pug">
  b-dialog(:show='true', :title="renderData.viewGraph", :show-close="true", :before-close="close" width="60%").view-graph
    el-row.clear-float
      el-col(:span="6")
        el-form(:model="detail", :rules="rules", ref="form")
          el-form-item(prop="xAxis", label="xAxis")
            b-select(:model.sync="detail.xAxis", :placeholder="renderData.pleaseSelect", @change='fieldChange')
              el-option(v-for="item in renderData.searchFields" ,:key="item.field", :value="item.field", :label="item.label", v-show="item.field!=detail.yAxis")
          el-form-item(prop="yAxis", label="yAxis")
            b-select(:model.sync="detail.yAxis", :placeholder="renderData.pleaseSelect", @change='fieldChange')
              el-option(v-for="item in renderData.searchFields" ,:key="item.field", :value="item.field", :label="item.label", v-show="item.field!=detail.xAxis")
      el-col(:span="18")
        #graph
</template>

<script>
  import BButton from 'components/BButton'
  import BSelect from 'components/BSelect'
  import BDialog from 'components/BDialog'
  import echarts from 'echarts'

  export default {
    name: 'view-graph',
    data () {
      return {
        chart: {},
        fieldList: [],
        rules: {
          xAxis: [
            {
              required: true,
              trigger: ['change', 'blur'],
              message: this.renderData.pleaseSelect
            }
          ],
          yAxis: [
            {
              required: true,
              trigger: ['change', 'blur'],
              message: this.renderData.pleaseSelect
            }
          ]
        },
        detail: {
          xAxis: '',
          yAxis: ''
        }
      }
    },
    props: {
      table: {
        type: Array,
        required: true
      },
      renderData: {
        required: true
      },
      visible: {
        required: true
      }
    },
    methods: {
      generateGraph () {
        this.chart = echarts.init(window.graph)
        console.log('xAxis, yAxis', this.table.map(row => row[this.detail.xAxis]), this.table.map(row => row[this.detail.yAxis]))
        var option = {
          title: {
            text: `${this.detail.xAxis} / ${this.detail.yAxis}`
          },
          tooltip: {},
          legend: {
            data: [this.detail.yAxis]
          },
          xAxis: {
            data: this.table.map(row => row[this.detail.xAxis])
          },
          yAxis: {},
          series: [
            {
              name: this.detail.yAxis,
              type: 'bar',
              data: this.table.map(row => row[this.detail.yAxis])
            }
          ]
        }
        this.chart.setOption(option)
      },
      fieldChange () {
        this.$refs['form'].validate(re => {
          if (re) {
            this.generateGraph()
          }
        })
      },
      close () {
        this.visible.dialog = null
      }
    },
    mounted () {
      this.$emit('get-table-data')
    },
    components: {
      BDialog,
      BSelect,
      BButton
    }
  }
</script>

<style lang="less">
  .view-graph {
    #graph {
      width: 100%;
      height: 400px;
    }
  }
</style>
