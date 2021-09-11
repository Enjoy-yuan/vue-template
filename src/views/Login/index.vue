<template>
  <div class="login">
    <div class="content">
      <div class="content-right">
        <div style="display: flex; width: 100%">
          <div class="login-box">
            <div class="title">欢迎登录</div>
            <div class="title-en">WELCOME</div>
            <div class="form">
              <el-form :model="formData" :rules="rules" ref="form" size="medium" style="width: 100%">
                <el-form-item prop="username">
                  <el-input placeholder="用户名" v-model="formData.username">
                    <i slot="prefix" class="el-input__icon el-icon-user"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    @keyup.enter.native="login('formData')"
                    placeholder="密码"
                    type="password"
                    v-model="formData.password"
                    show-password
                  >
                    <i slot="prefix" class="el-input__icon el-icon-lock"></i
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="login('form')" class="button" type="primary">登 录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">Copyright © 2021 . All rights reserved. xxxx 版权所有</div>
  </div>
</template>

<script>
import { setCookie, removeCookie } from '@/utils/cookie'
import { routes } from '@/router'
import throttle from 'lodash/throttle'
export default {
  data() {
    return {
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      formData: {
        username: 'admin',
        password: '123456'
      }
    }
  },
  mounted() {
    removeCookie('token')
    removeCookie('tags')
    removeCookie('username')
  },
  methods: {
    // 登陆，防抖
    login: throttle(
      function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (
              this.formData.username === 'admin' ||
              (this.formData.username === 'user' && this.formData.password === '123456')
            ) {
              setCookie('username', this.formData.username)
              // 根据用户获取的后端动态路由数据
              const menuData = [
                { name: 'DynamicMenu', icon: 'el-icon-menu', rowId: 1, path: '/DynamicMenu' },
                { name: 'UserMenu', parentId: 1, rowId: 2, path: '/DynamicMenu/UserMenu' }
              ]
              if (this.formData.username === 'admin') {
                menuData.push({ name: 'AdminMenu', parentId: 1, rowId: 3, path: '/DynamicMenu/AdminMenu' })
              }
              setCookie('menuData', menuData)
              menuData.map((item) => {
                routes[routes.length - 1].children.push({
                  path: item.path,
                  name: item.name,
                  component: () => import('@/views' + item.path)
                })
              })
              this.$router.addRoutes(routes)
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
          }
        })
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
.login {
  background: url('../../assets/img/login-bg.gif') no-repeat;
  width: 100%;
  height: 100%;
  background-size: cover;
  display: flex;
  align-items: center;
  .content {
    display: flex;
    width: 380px;
    height: 420px;
    position: absolute;
    right: 100px;
    background-color: #29303d;
    box-shadow: 0px 1px 32px 0px rgba(237, 44, 30, 0.3);
    border-radius: 10px;
    .content-right {
      width: 100%;
      .login-box {
        margin: 0 auto;
        margin-top: 16%;
        width: 260px;
        .title-en {
          font-size: 28px;
          font-family: PingFang SC;
          color: #ed2c1e;
          opacity: 0.15;
          border-bottom: 2px solid #ed2c1e;
          width: 100%;
          padding-bottom: 5px;
          padding-left: 80px;
          padding-top: 10px;
          margin-bottom: 40px;
        }
        .title {
          position: absolute;
          color: #ed2c1e;
          font-size: 30px;
          min-width: 130px;
        }
        .form {
          display: flex;
          justify-content: center;
          width: 100%;
          ::v-deep {
            .el-input__inner {
              width: 100%;
              border-top-width: 0px;
              border-left-width: 0px;
              border-right-width: 0px;
              border-bottom-width: 0px;
              border-radius: 0;
            }
          }
          .password {
            width: 100%;
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            span {
              color: #069ad5;
              cursor: pointer;
            }
            ::v-deep {
              .el-checkbox__label {
                font-size: 12px;
                // color: #212121;
              }
            }
          }
          .button {
            width: 100%;
            height: 36px;
            border-radius: 2px;
            color: #fff;
            border: none;
            font-size: 16x;
            margin-bottom: 10px;
            margin-top: 30px;
            background-color: #ed2c1e;
          }
          .login-text {
            color: #212121;
            height: 20px;
            p {
              position: absolute;
              background-color: #fff;
              height: 20px;
              line-height: 20px;
              margin-top: -10px;
              width: 100px;
              text-align: center;
              margin-left: 70px;
              font-size: 12px;
            }
            hr {
              color: #dde2eb;
            }
          }
          .other-login {
            display: flex;
            justify-content: space-evenly;
            img {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}

// 覆盖全局样式
::v-deep {
  .el-input {
    // max-width: 500px;
    width: 260px;
  }
  .el-input__inner {
    background-color: #353d4b !important;
    border: none !important;
    color: #fff !important;
  }
  .el-input__inner:focus {
    background-color: #353d4b !important;
    border: none !important;
    color: #fff !important;
  }
}
.bottom {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 20px;
  font-size: 14px;
  color: #8f8f8f;
}
</style>
