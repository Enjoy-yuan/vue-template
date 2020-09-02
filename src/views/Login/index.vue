<template>
  <div id="bg">
    <div class="login">
      <div class="title">管理后台登录</div>
      <el-form ref="form" :model="form" :rules="rules" style="margin-top:10px;">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" style="width:420px;"> </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input style="width:420px;margin-top: 10px;" type="password" show-password v-model="form.password" @keyup.enter.native="login('form')" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('form')" style="width:420px;margin-top: 10px;height: 50px;font-size: 20px;letter-spacing:6px;">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="info">
        <span style="margin-right: 30px;">普通账号：user </span>
        <span style="margin-right: 30px;">管理员账号：admin </span>
        <span>密码：123456</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { setCookie } from '@/utils/cookie'
import throttle from 'lodash/throttle'
export default {
  data() {
    return {
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login: throttle(
      function(formName) {
        {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              axios
                .post('/mock/api/login', {
                  username: this.form.username,
                  password: this.form.password
                })
                .then((res) => {
                  // console.log(res)
                  if (res.data.code === 200) {
                    setCookie('username', this.form.username)
                    this.$router.push('/home')
                    this.$message({
                      type: 'success',
                      message: '登录成功',
                      showClose: true
                    })
                  } else {
                    this.$message({
                      type: 'error',
                      message: '用户名或密码错误',
                      showClose: true
                    })
                  }
                })
            }
          })
        }
      },
      2000,
      {
        leading: true,
        trailing: false
      }
    )
  }
}
</script>

<style lang="scss" scoped>
#bg {
  height: 100%;
  background-color: #2d3a4b;
  color: #fff;
  display: flex;
}
.login {
  margin: 200px auto;
  width: 800px;
  text-align: center;
  .title {
    font-size: 30px;
    line-height: 60px;
  }
}
</style>
