<template lang="pug">
  b-dialog(:show='true', :title="renderData.color", :show-close="true", :before-close="close" width="40%").edit-color
    el-form(:model="tmpModel", :rules="cRules" ref="form").clear-float
      el-row.clear-float
        b-button(@click="chooseColor(0)") default1
        b-button(@click="chooseColor(1)") default2
        b-button(@click="chooseColor(2)") default3
      el-col(:span="8"  v-for="(color, idx) in colors", :key='idx')
        el-form-item(:label="color.key", :prop="color.key")
          input(type="color", v-model="color.value")
    template(slot="footer")
      b-button(@click="close") {{renderData.cancel}}
      b-button(@click="save", type="primary") {{renderData.save}}
</template>

<script>
  import service from '../service'
  import BButton from 'components/BButton'
  import BDialog from 'components/BDialog'
  import BSelect from 'components/BSelect'

  export default {
    name: 'edit-color',
    data () {
      var model = {
        '@A': '',
        '@B': '',
        '@C': '',
        '@D': '',
        '@E': '',
        '@F': '',
        '@G': '',
        '@H': '',
        '@J': ''
      }
      return {
        colorList: [
          [{'key': '@A', 'label': 'main_color', 'value': '#8000ff'}, {
            'key': '@B',
            'label': 'auxiliary_color',
            'value': '#ff8080'
          }, {'key': '@C', 'label': 'text_color', 'value': '#000040'}, {
            'key': '@D',
            'label': 'line_color',
            'value': '#e2e2e2'
          }, {'key': '@E', 'label': 'positive_color', 'value': '#00ff40'}, {
            'key': '@F',
            'label': 'alert_color',
            'value': '#ffff00'
          }, {'key': '@G', 'label': 'negative_color', 'value': '#ff0000'}, {
            'key': '@H',
            'label': 'bright_color',
            'value': '#f8fff0'
          }, {'key': '@I', 'label': 'form_color', 'value': '#e6ffe6'}, {
            'key': '@J',
            'label': 'header_color',
            'value': '#f0f0f0'
          }], [{'key': '@A', 'label': 'main_color', 'value': '#0080ff'}, {
            'key': '@B',
            'label': 'auxiliary_color',
            'value': '#f78c95'
          }, {'key': '@C', 'label': 'text_color', 'value': '#000000'}, {
            'key': '@D',
            'label': 'line_color',
            'value': '#d3dad8'
          }, {'key': '@E', 'label': 'positive_color', 'value': '#ff80c0'}, {
            'key': '@F',
            'label': 'alert_color',
            'value': '#ffde7b'
          }, {'key': '@G', 'label': 'negative_color', 'value': '#e1bf1e'}, {
            'key': '@H',
            'label': 'bright_color',
            'value': '#FFFEFA'
          }, {'key': '@I', 'label': 'form_color', 'value': '#dedede'}, {
            'key': '@J',
            'label': 'header_color',
            'value': '#000000'
          }], [{'key': '@A', 'label': 'main_color', 'value': '#71DAF9'}, {
            'key': '@B',
            'label': 'auxiliary_color',
            'value': '#FFA476'
          }, {'key': '@C', 'label': 'text_color', 'value': '#367F9F'}, {
            'key': '@D',
            'label': 'line_color',
            'value': '#004080'
          }, {'key': '@E', 'label': 'positive_color', 'value': '#C4E6B1'}, {
            'key': '@F',
            'label': 'alert_color',
            'value': '#FFEFBD'
          }, {'key': '@G', 'label': 'negative_color', 'value': '#FFA8C6'}, {
            'key': '@H',
            'label': 'bright_color',
            'value': '#FFFEFA'
          }, {'key': '@I', 'label': 'form_color', 'value': '#F9FDFE'}, {
            'key': '@J',
            'label': 'header_color',
            'value': '#6ACAE7'
          }]
        ],
        colors: [],
        cRules: {
          ...Object.keys(model).reduce((res, key) => {
            res[key] = [{
              required: true,
              trigger: ['blur', 'change'],
              message: this.renderData.pleaseSelect
            }]
            return res
          }, {})
        },
        tmpModel: model
      }
    },
    props: {
      renderData: {
        required: true
      }
    },
    watch: {
      colors () {
        this.colors.forEach(color => {
          this.tmpModel[color.key] = color.value
        })
      }
    },
    methods: {
      getColors () {
        service.getColors().then(colors => {
          this.colors = colors
          window.changeColor(colors)
        })
      },
      chooseColor (idx) {
        this.colors = this.colorList[idx]
      },
      close () {
        this.$emit('close')
      },
      save () {
        this.$refs['form'].validate(res => {
          if (res) {
            this.colors.forEach(color => {
              color.value = this.tmpModel[color.key]
            })
            console.log('colors', this.colors)
            service.setColors(this.colors).then(res => {
              window.changeColor(this.colors)
              this.close()
            })
          }
        })
      }
    },
    mounted () {
      this.getColors()
    },
    components: {
      BSelect,
      BDialog,
      BButton
    }
  }
</script>

<style lang="less">
  .edit-color {
    .b-select {
      width: 70% !important;
    }
    .el-row {
      margin-bottom: 20px;
    }
  }
</style>
