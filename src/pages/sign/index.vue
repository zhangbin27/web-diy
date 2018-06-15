<template>
  <div class="sign sign-layout" :class="['theme-'+theme]">
    <el-tabs v-model="currTab" class="form-container">
      <el-tab-pane name="signIn" :label="rdata.login">
        <el-form :model="info" :rules="rules" ref="form">
          <el-form-item :label="rdata.name" prop="username">
            <b-input :model.sync="info.username" :placeholder="rdata.userName"></b-input>
          </el-form-item>
          <el-form-item :label="rdata.password" prop="password">
            <b-input :model.sync="info.password" type="password" @keyup.enter.native="login"
                     :placeholder="rdata.password"></b-input>
          </el-form-item>
          <div class="footer" style="margin-top: 112px;">
            <b-button type="primary" @click="login">{{rdata.login}}</b-button>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="signUp" :label="rdata.signUp">
        <el-form :model="signUpInfo" :rules="signUpRules" ref="signUpForm">
          <el-form-item :label="rdata.name" prop="username">
            <b-input :model.sync="signUpInfo.username" :placeholder="rdata.userName"></b-input>
          </el-form-item>
          <el-form-item :label="rdata.pwdAndConfirm" prop="password">
            <b-input :model.sync="signUpInfo.password" type="password" :placeholder="rdata.password"></b-input>
          </el-form-item>
          <el-form-item label="" prop="confirmPwd">
            <b-input :model.sync="signUpInfo.confirmPwd" type="password" @keyup.enter.native="signUp"
                     :placeholder="rdata.confirmPwd"></b-input>
          </el-form-item>
          <div class="footer">
            <b-button type="primary" @click="signUp">{{rdata.signUp}}</b-button>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import service from './service'
  import BButton from 'components/BButton'
  import Cookie from 'js-cookie/src/js.cookie'
  import BInput from 'components/BInput'

  export default {
    name: 'sign',
    data () {
      var _this = this
      var rdata = service.getRenderDataSync({page: 'sign'})
      return {
        rdata: rdata,
        theme: 'default',
        info: {
          username: '',
          password: ''
        },
        signUpInfo: {
          username: '',
          confirmPwd: '',
          password: ''
        },
        currTab: 'signIn',
        rules: {
          username: [
            {
              require: true,
              trigger: 'blur',
              message: rdata.notEmpty
            }
          ],
          password: [
            {
              require: true,
              trigger: 'blur',
              message: rdata.notEmpty
            }
          ]
        },
        signUpRules: {
          username: [
            {
              require: true,
              trigger: 'blur',
              message: rdata.notEmpty
            }
          ],
          password: [
            {
              require: true,
              trigger: 'blur',
              message: rdata.notEmpty
            }
          ],
          confirmPwd: [
            {
              require: true,
              trigger: 'blur',
              message: rdata.notEmpty
            },
            {
              trigger: 'blur',
              validator (rule, val, cb) {
                cb(val === _this.signUpInfo.password ? undefined : rdata.pwdNoMatch)
              }
            }
          ]
        }
      }
    },
    methods: {
      login () {
        this.$refs['form'].validate(valid => {
          if (valid) {
            var params = this.info
            service.login(params).then(res => {
              if (res.re === 200) {
                Cookie.set('token', res.token)
                this.$router.push({path: '/admin/editor'})
              } else {
                this.$message({type: 'error', message: this.rdata.accountNameNotMatch})
              }
            })
          }
        })
      },
      signUp () {
        this.$refs['signUpForm'].validate(valid => {
          if (valid) {
            var params = this.signUpInfo
            service.signUp(params).then(res => {
              if (res.data.status === '1') {
                this.$router.push({path: '/admin/editor'})
              } else {
                this.$message({type: 'error', message: this.rdata.networkError})
              }
            })
          }
        })
      },
      getConfig () {
        service.getConfig().then(res => {
          this.theme = res.theme
        })
      }
    },
    mounted () {
      this.getConfig()
    },
    components: {
      BInput,
      BButton
    }
  }
</script>

<style lang="less">
  .sign.sign-layout {
    width: 100%;
    height: 100%;
    display: flex;
    background-image: url('../../assets/img/bg.jpeg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .el-tabs__item {
      padding-left: 70px !important;
      padding-right: 70px !important;
    }
    .form-container {
      margin: auto;
      width: 400px;
      min-height: 432px;
      background-color: white;
      padding: 30px;
      border-radius: 4px;
      /*margin-top: 50%;*/
      /*transform: translateY(-50%);*/
    }

    .footer {
      margin-top: 40px;
    }

    .footer .el-button {
      width: 100%;
    }
  }
</style>
