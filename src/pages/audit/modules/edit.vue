<template lang="pug">
  .add-page
    el-form(:model="basicInfo" ref="basicForm", :rules="rules" label-position="left")
      el-form-item(prop="workflow", :label="rdata.workflow")
        b-select(:model.sync="basicInfo.workflow" @change="getApplyForm")
          el-option(v-for="op in workflowList" :label="op.label" :value="op.key" :key="op.key")
    c-form(:model="tmpData", ref="tmpForm", :formItemList="formItemList", :rdata="rdata", :visible="{dialog:'add'}")
    .footer
      b-button(@click="reset") {{rdata.reset}}
      b-button(@click="save", type="primary") {{rdata.save}}
</template>

<script>
  import cForm from '../../list/modules/cForm'
  import BIcon from 'components/BIcon'
  import BFormItem from 'components/BFormItem'
  import BButton from 'components/BButton'
  import BSelect from 'components/BSelect'
  import BDialog from 'components/BDialog'
  import service from '../service'

  export default {
    name: 'edit',
    data () {
      return {
        rules: {
          'workflow': [
            {
              required: true,
              message: this.rdata.requiredMessage,
              trigger: ['blur', 'change']
            }
          ]
        },
        tmpData: {},
        basicInfo: {
          workflow: ''
        },
        workflowList: [],
        formItemList: []
      }
    },
    props: {
      rdata: {
        required: true
      }
    },
    computed: {},
    methods: {
      reset () {
        Object.keys(this.tmpData).forEach(key => {
          this.tmpData[key] = ''
        })
      },
      getApplyForm () {
        var params = this.basicInfo
        service.getApplyForm(params).then(res => {
          this.formItemList = res
          this.formItemList.forEach(item => {
            this.$set(item, 'value', '')
            // this.$set(this.tmpData, item.key, '')
          })
        })
      },
      getWorkflowList () {
        service.getWorkflowList().then(res => {
          this.workflowList = res
        })
      },
      save () {
        this.$refs['basicForm'].validate(valid => {
          if (!valid) return
          this.$refs['tmpForm'].validate(valid => {
            if (valid) {
              var params = {
                cTime: new Date(),
                ...this.basicInfo,
                ...this.tmpData
              }
              service.apply(params).then(res => {
                this.$message({type: 'success', message: this.rdata.operateSuccess})
              })
            }
          })
        })
      }
    },
    mounted () {
      this.getWorkflowList()
    },
    components: {
      BIcon,
      BFormItem,
      cForm,
      BDialog,
      BSelect,
      BButton
    }
  }
</script>

<style lang="less">
  .add-page {
    width: 70%;
    .el-form-item__label {
      width: 20%;
      display: inline-block;
    }
    .el-form-item__content {
      width: 80%;
      display: inline-block;
    }
    .footer {
      padding-left: 20%;
    }
  }
</style>
