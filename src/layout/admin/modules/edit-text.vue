<template lang="pug">
  b-dialog(:show='true', :title="rdata.configText", :show-close="true", :before-close="close" width="40%").edit-text
    el-form(ref="form").clear-float
      el-form-item(:label="rdata.module")
        b-select(:model.sync="key")
          el-option(v-for="keyOp in Object.keys(config.text)" :key="keyOp" :label="keyOp" :value="keyOp")
      el-form-item(v-for="subKey in Object.keys(module)", :label="subKey" :key="key+subKey" v-if="typeof module[subKey] === 'string'")
        b-input(:model.sync="module[subKey]")
    template(slot="footer")
      b-button(@click="close") {{rdata.cancel}}
      b-button(@click="save", type="primary") {{rdata.save}}
</template>

<script>
  import BButton from 'components/BButton'
  import BDialog from 'components/BDialog'
  import BSelect from 'components/BSelect'
  import BInput from 'components/BInput'

  export default {
    name: 'edit-text',
    data () {
      return {
        key: ''
      }
    },
    props: {
      rdata: {
        required: true
      },
      config: {
        required: true
      }
    },
    computed: {
      module () {
        return this.config.text[this.key] || {}
      }
    },
    methods: {
      close () {
        this.$emit('close')
      },
      save () {
        this.$emit('refresh', 'text')
      }
    },
    mounted () {
    },
    components: {
      BInput,
      BSelect,
      BDialog,
      BButton
    }
  }
</script>

<style lang="less">
  .edit-text {
    .el-form-item .el-form-item__label {
      width: 30%;
    }
    .el-form-item__content {
      width: 70%;
      display: inline-block;
    }
  }
</style>
