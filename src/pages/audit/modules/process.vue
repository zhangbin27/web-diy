<template lang="pug">
  b-dialog(:show='true', :title="rdata.process", :show-close="true", :before-close="close" width="40%").process-dialog
    el-form(:model="applyData" label-position="left")
      el-form-item(prop="workflow", :label="rdata.workflow")
        b-select(:model.sync="applyData.workflow" :disabled="true")
          el-option(v-for="op in workflowList" :label="op.label" :value="op.key" :key="op.key")
      el-form-item(prop="cTime", :label="rdata.cTime")
        b-datepicker(:model.sync="applyData.cTime" :disabled="true" type="datetime")
      el-form-item(prop="applicant", :label="rdata.applicant")
        b-input(:model.sync="applyData.applicant" :disabled="true")
    c-form(:model="applyData", :formItems="applyForm", :rdata="rdata", :visible="{dialog:'detail'}" :disabled="true").apply-history
    c-form(v-for="(his, idx) in auditHistory" :key="idx" :model="his.data", :formItems="his.form", :rdata="rdata", :visible="{dialog:'detail'}" :disabled="true").audit-history
    c-form(:model="tmpData", ref="tmpForm", :formItems="formItems", :rdata="rdata", :visible="{dialog:'detail'}" v-if="visible.dialog=='process'")
    .footer(slot="footer" v-if="visible.dialog=='process'")
      b-button(@click="reset") {{rdata.reset}}
      b-button(@click="save", type="primary") {{rdata.save}}
</template>

<script>
  import cForm from '../../list/modules/cForm'
  import BIcon from 'components/BIcon'
  import BFormItem from 'components/BFormItem'
  import BDatepicker from 'components/BDatepicker'
  import BButton from 'components/BButton'
  import BSelect from 'components/BSelect'
  import BInput from 'components/BInput'
  import BDialog from 'components/BDialog'
  import service from '../service'

  export default {
    name: 'process',
    data () {
      return {
        rules: {},
        applyData: {
          applicant: '',
          workflow: '',
          cTime: ''
        },
        tmpData: {},
        workflowList: [],
        formItems: [],
        auditHistory: [],
        applyForm: []
      }
    },
    props: {
      rdata: {
        required: true
      },
      visible: {
        required: true
      }
    },
    computed: {},
    methods: {
      close () {
        this.visible.dialog = null
      },
      reset () {
        Object.keys(this.tmpData).forEach(key => {
          this.tmpData[key] = ''
        })
      },
      getApplyForm () {
        var params = this.applyData
        return service.getApplyForm(params).then(res => {
          this.applyForm = res
          this.applyForm.forEach(item => {
            this.$set(item, 'value', '')
          })
        })
      },
      getApplyData () {
        var params = this.applyData
        return service.getApplyData(params).then(res => {
          Object.keys(res).forEach(key => {
            this.$set(this.applyData, key, res[key])
          })
        })
      },
      getAuditForm () {
        var params = this.applyData
        return service.getAuditForm(params).then(res => {
          this.formItems = res
          this.formItems.forEach(item => {
            this.$set(item, 'value', '')
          })
        })
      },
      getWorkflowList () {
        return service.getWorkflowList().then(res => {
          this.workflowList = res
        })
      },
      getAuditHistory () {
        return service.getAuditHistory().then(res => {
          this.auditHistory = res
        })
      },
      save () {
        this.$refs['tmpForm'].validate(valid => {
          if (valid) {
            var params = {
              auditTime: new Date(),
              ...this.applyData,
              ...this.tmpData
            }
            service.audit(params).then(res => {
              this.$message({type: 'success', message: this.rdata.operateSuccess})
              this.close()
              this.$emit('refresh')
            })
          }
        })
      }
    },
    async mounted () {
      await this.getWorkflowList()
      await this.getApplyForm()
      await this.getApplyData()
      await this.getAuditForm()
      if (this.visible.dialog === 'checkHistory') {
        await this.getAuditHistory()
      }
    },
    components: {
      BIcon,
      BFormItem,
      cForm,
      BDialog,
      BSelect,
      BInput,
      BDatepicker,
      BButton
    }
  }
</script>

<style lang="less">
  .process-dialog {
    .el-form-item__label {
      width: 20%;
      display: inline-block;
    }
    .el-form-item__content {
      width: 80%;
      display: inline-block;
      .b-date-picker {
        width: 100%;
      }
    }
    .c-form.apply-history, .c-form.audit-history {
      margin-bottom: 35px;
    }
    .footer {
      padding-left: 20%;
    }
  }
</style>
