<template lang="pug">
  b-dialog(:show='true', :title="rdata.edit", :show-close="true", :before-close="close" width="40%").edit
    c-form(:model="tmpData", ref="tmpForm", :formItemList="formItemList", :rdata="rdata", label-width="140px", label-position="left", :visible="visible")
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
        page: this.$router.currentRoute.query.page,
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
      formItemList: {
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
              page: this.page,
              data: {
                ...this.tmpData,
                ...this.visible.dialog === 'add' ? {_key: '_key' + new Date().getTime()} : {_key: this.currRow._key}
              }
            }
            service.edit(params, this.pageInfo.editUrl).then(res => {
              this.$message({type: 'success', message: this.rdata.operateSuccess})
              this.close()
              this.$emit('refresh')
            })
          }
        })
      }
    },
    mounted () {
      // 给每个formItem 加上value: '' (type == file 的时候 value: {})
      this.formItemList.forEach(item => {
        this.$set(item, 'value', item.type === 'upload' ? {} : '')
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
