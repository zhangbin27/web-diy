<template lang="pug">
  b-dialog(:show='true', :title="rdata.color", :show-close="true", :before-close="close" width="40%").edit-color
    el-form(:model="tmpModel", :rules="cRules" ref="form").clear-float
      el-row.clear-float
        b-button(@click="chooseColor(0)") default1
        b-button(@click="chooseColor(1)") default2
        b-button(@click="chooseColor(2)") default3
      el-col(:span="8"  v-for="(color, idx) in currColors", :key='idx')
        el-form-item(:label="color.key", :prop="color.key")
          input(type="color", v-model="color.value")
    template(slot="footer")
      b-button(@click="close") {{rdata.cancel}}
      b-button(@click="save", type="primary") {{rdata.save}}
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
        colorList: service.getColorListSync(),
        currColors: this.colors,
        cRules: {
          ...Object.keys(model).reduce((res, key) => {
            res[key] = [{
              required: true,
              trigger: ['blur', 'change'],
              message: this.rdata.pleaseSelect
            }]
            return res
          }, {})
        },
        tmpModel: model
      }
    },
    props: {
      rdata: {
        required: true
      },
      colors: {
        required: true
      }
    },
    watch: {
      currColors () {
        this.currColors.forEach(color => {
          this.tmpModel[color.key] = color.value
        })
      }
    },
    methods: {
      chooseColor (idx) {
        this.currColors = this.colorList[idx]
      },
      close () {
        this.$emit('close')
      },
      save () {
        this.$refs['form'].validate(res => {
          if (res) {
            this.currColors.forEach(color => {
              color.value = this.tmpModel[color.key]
            })
            service.setColors(this.currColors).then(res => {
              window.changeColor.forEach(fn => fn(this.currColors))
              this.close()
            })
          }
        })
      }
    },
    mounted () {
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
