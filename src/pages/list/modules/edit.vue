<template lang="pug">
  b-dialog(:show='true', :title="rdata.edit", :show-close="true", :before-close="close" width="40%").edit
    c-form(:model="tmpData", ref="tmpForm", :formItems="formItems", :rdata="rdata", label-width="140px", label-position="left", :visible="visible")
    template(slot="footer")
      b-button(@click="close") {{rdata.cancel}}
      b-button(@click="save", type="primary" v-if="!disabled") {{rdata.save}}
</template>

<script>
  import cForm from './cForm'
  import BIcon from 'components/BIcon'
  import BFormItem from 'components/BFormItem'
  import BButton from 'components/BButton'
  import BDialog from 'components/BDialog'
  import service from '../service'

  export default {
    name: 'edit',
    data () {
      return {
        tmpData: {}
      }
    },
    props: {
      rdata: {
        required: true
      },
      pageInfo: {
        required: true
      },
      formItems: {
        required: true
      },
      visible: {
        required: true
      },
      currRow: {
        required: true
      }
    },
    computed: {
      disabled () {
        return this.visible.dialog === 'detail'
      }
    },
    methods: {
      getDetail () {
        service.getDetail(this.currRow, this.pageInfo.detailUrl).then(({data}) => {
          Object.keys(data).forEach(key => {
            this.$set(this.tmpData, key, data[key])
          })
        })
      },
      close () {
        this.visible.dialog = null
      },
      save () {
        this.$refs['tmpForm'].validate(valid => {
          if (valid) {
            var params = {
              pid: this.pageInfo.pid,
              ...this.tmpData,
              ...this.visible.dialog === 'add' ? {rid: 'rid_' + new Date().getTime()} : {rid: this.currRow.rid}
            }
            service.edit(params, this.pageInfo.editUrl).then(() => {
              this.$message({type: 'success', message: this.rdata.operateSuccess})
              this.close()
              this.$emit('refresh')
            })
          }
        })
      }
    },
    mounted () {
      this.formItems.forEach(item => {
        this.$set(item, 'value', '')
      })
      this.getDetail()
    },
    components: {
      BIcon,
      BFormItem,
      cForm,
      BDialog,
      BButton
    }
  }
</script>

<style lang="less">
  .custom-form {
    .item {
      position: relative;
      .el-form-item {
        margin-top: 20px !important;
      }
    }
  }
</style>
