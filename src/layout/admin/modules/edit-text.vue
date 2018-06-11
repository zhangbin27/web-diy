<template lang="pug">
  b-dialog(:show='true', :title="renderData.configText", :show-close="true", :before-close="close" width="40%").edit-text
    el-form(:model="data", :rules="cRules" ref="form").clear-float
      el-col(:span="12"  v-for="(key, idx) in Object.keys(data)", :key='idx')
        el-form-item(:label="key", :prop="key")
          b-input(:model.sync="data[key]")
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
    name: 'edit-text',
    data () {
      return {
        data: {}
      }
    },
    props: {
      renderData: {
        required: true
      }
    },
    computed: {
      cRules () {
        return {}
      }
    },
    methods: {
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
//      this.getText()
    },
    components: {
      BSelect,
      BDialog,
      BButton
    }
  }
</script>

<style lang="less">
  .edit-text {
  }
</style>
