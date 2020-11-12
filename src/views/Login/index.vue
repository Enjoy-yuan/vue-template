<template>
    <div class="content">
        <div class="bg">
            <img style="width: 100%;" src="@/assets/img/bg.png" alt="bg" />
        </div>
        <div class="login">
            <div class="logo">
                <img src="@/assets/img/logo.png" alt="logo" />
            </div>
            <div class="title">WELCOME</div>

            <el-form ref="relForm" :model="formData" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="formData.username" suffix-icon="el-icon-user" placeholder="用户名"> </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        suffix-icon="el-icon-lock"
                        type="password"
                        v-model="formData.password"
                        @keyup.enter.native="login('relForm')"
                        placeholder="密码"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="btn" @click="login('relForm')">登录</el-button>
                </el-form-item>
            </el-form>
            <div class="info">
                <span>用户名：user </span>
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
            formData: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        // 登陆，防抖
        login: throttle(
            function(formName) {
                {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            if (this.formData.username === 'user' && this.formData.password === '123456') {
                                setCookie('username', this.formData.username)
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
.content {
    display: flex;
    justify-content: center;
    .login {
        .logo {
            text-align: center;
            img {
                width: 50px;
                border-radius: 50%;
            }
        }
        .title {
            text-align: center;
            color: #555;
            font-size: 25px;
            line-height: 50px;
            opacity: 0.2;
            margin-bottom: 20px;
        }
        .btn {
            margin-top: 30px;
            width: 250px;
            font-size: 16px;
            letter-spacing: 6px;
        }
        .info {
            color: #ccc;
            span {
                margin-right: 20px;
            }
        }
        box-shadow: 0 1px 38px 0 rgba(13, 158, 221, 0.07);
        background-color: #fff;
        position: absolute;
        border-radius: 10px;
        top: 100px;
        width: 350px;
        padding: 50px;
        padding-top: 30px;
    }
    ::v-deep {
        .el-input {
            width: 250px;
        }
        .el-input__inner {
            width: 100%;
            border-top-width: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 1px;
            border-radius: 0;
        }
    }
}
</style>
