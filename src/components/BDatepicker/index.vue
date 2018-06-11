<template lang="pug">
  el-date-picker.b-date-picker(:type="type", v-model="value", :start-placeholder='placeholder', :end-placeholder='placeholder', @change="changeHandle")

</template>

<script>
  import BInput from 'components/BInput'

  export default {
    name: 'b-date-picker',
    data () {
      return {
        value: ''
      }
    },
    props: {
      model: {
        type: [String, Array, Date],
        required: true
      },
      placeholder: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'datetimerange'
      }
    },

    methods: {
      changeHandle (value) {
        this.$emit('update:model', value)
        this.$emit('change')
      }
    },
    watch: {
      model () {
        this.value = this.model
      }
    },
    mounted () {
      this.value = this.model
    },
    components: {
      BInput
    }
  }
</script>

<style lang="less" scoped>
  .b-date-picker {
    .el-date-editor--datetimerange.el-input, .el-date-editor--date {
      width: 100%;
    }
  }
</style>

<style lang="less" scoped>
  .theme-simple {
    .b-date-picker {
      .el-date-editor--datetimerange.el-input, .el-date-editor--date {
        width: 100%;
      }
    }
  }
</style>
