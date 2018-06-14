<template lang="pug">
  .config-workflow
    el-form(:model="newWorkflow" :rules="rules" ref="workflow").add.clear-float
      el-col(:span="6")
        el-form-item(prop="name")
          b-input(:model.sync="newWorkflow.name" :placeholder="rdata.workflow")
      el-col(:span="3" :offset="15")
        b-button(type="primary" @click="add") {{rdata.save}}
    el-collapse(v-model="currWorkflow" :accordion='true')
      el-collapse-item(:title="w.name" :name="idx" v-for="(w,idx) in workflowList" :key="idx")
        bpmn(:workflow="w" v-if="currWorkflow==idx" @close="closeBpmn")
</template>

<script>
  import service from './service'
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import BUpload from 'components/BUpload'
  import BFormItem from 'components/BFormItem'
  import bpmn from './modules/bpmn'
  import './modules/diagram-js.css'
  import './modules/bpmn-font/css/bpmn-embedded.css'

  export default {
    name: 'form-set',
    data () {
      var rdata = service.getRenderDataSync({page: 'workflow'})
      return {
        newWorkflow: {
          name: ''
        },
        rdata: rdata,
        workflowList: [],
        currWorkflow: -1,
        rules: {
          name: [
            {
              required: true,
              trigger: ['blur', 'change'],
              message: rdata.required
            }
          ]
        }
      }
    },
    created () {
      var params = {page: 'editor'}
      service.getRenderData(params).then(res => {
        Object.assign(this.rdata, res)
      })
    },
    computed: {},
    methods: {
      closeBpmn () {
        console.log('closeBpmn')
        this.currWorkflow = -1
      },
      getWorkflowList () {
        service.getWorkflowList().then(res => {
          this.workflowList = res
        })
      },
      add () {
        this.$refs['workflow'].validate(re => {
          if (re) {
            service.add().then(() => {
              this.getWorkflowList()
            })
          }
        })
      }
    },
    mounted () {
      this.getWorkflowList()
    },
    components: {
      bpmn,
      BButton,
      BFormItem,
      BUpload,
      BInput
    },
    watch: {
    }
  }
</script>

<style lang="less">
  .config-workflow {
    .add {
      .el-button {
        width: 100%;
      }
      .el-upload-dragger {
        height: 40px !important;
        padding: 0 20px !important;
      }
      .el-upload-dragger .el-upload__text {
        text-align: center;
        display: inline-block;
        line-height: 40px;
        height: 40px;
        vertical-align: 10px;
        margin-left: 20px;
      }
      .el-upload-dragger .el-icon-upload {
        margin: 0;
        line-height: 40px;
        position: relative;
        font-size: 40px;
        top: -2px;
      }
    }
    .w-container {
      height: 300px;
    }
  }
</style>
