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
        var cols = this.renderData.headerCols
        var table = JSON.parse(JSON.stringify(this.table))
        table.forEach((row, rowIdx) => {
          for (var col of cols) {
            if (col.type === 'datetime') {
              var d = new Date(row[col.field])
              row[col.field] = d.getFullYear() + d.getMonth() + d.getDay() + ''
            }
          }
        })
        var map = new Map()
        var {xAxis, yAxis} = this.detail
        var [xset, yset] = [new Set(table.map(row => row[xAxis])), new Set(table.map(row => row[yAxis]))]
        var [xArr, yArr] = [Array.from(xset), Array.from(yset)]
        table.forEach((row, rowIdx) => {
          var [xVal, yVal] = [row[xAxis], row[yAxis]]
          var [xValIdx, yValIdx] = [xArr.indexOf(xVal), yArr.indexOf(yVal)]
          var key = xValIdx + ',' + yValIdx
          var count = map.get(key) || 0
          map.set(key, ++count)
        })
        var data = []
        for (var [key, count] of map.entries()) {
          var [x, y] = key.split(',')
          data.push([parseInt(x), parseInt(y), count])
        }
        console.log('xArr,yArr,data', xArr, yArr, data, table)
        var option = {
          title: {
            text: `${xAxis} / ${yAxis}`
          },
          tooltip: {},
          legend: {
            data: [yAxis]
          },
          grid: {
            left: 2,
            bottom: 10,
            right: 10,
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: xArr,
            boundaryGap: false,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#999',
                type: 'dashed'
              }
            },
            axisLine: {
              show: false
            }
          },
          yAxis: {
            type: 'category',
            data: yArr,
            axisLine: {
              show: false
            }
          },
          series: [{
            name: yAxis,
            type: 'scatter',
            symbolSize: function (val) {
              return val[2] * 5
            },
            data: data,
            animationDelay: function (idx) {
              return idx * 5
            }
          }]
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
