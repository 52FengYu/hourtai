<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="Login-shadows">
                <div class="ms-title" style='display: -webkit-inline-box;align-items: center;display:flex'>
                    <img src="../../assets/img/logo.png" alt="">
                    <h2 style="color:black">利群网商</h2>
                </div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" placeholder="请输入用户名">
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password">
                            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <div style="display:flex;align-items:center;">
                            <el-input class="picture" v-model="ruleForm.picture" @keyup.enter.native="submitForm"></el-input>
                            <el-image :src="ruleForm.pictures" @click="getdata"></el-image>
                        </div>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button type="primary" @click="submitForm">登录</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { GetValidateCode,UserLogin,getTokenID } from "@/api/login"
import qs from 'qs';    
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    picture:'',
                    pictures:'',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    picture: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            getdata(){              /* 获取验证码 */
                let params = {}
                GetValidateCode(qs.stringify(params)).then((res)=>{
                    let imgUrl = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
                    this.ruleForm.pictures = imgUrl
                }).catch(function(e){
                    console.log(e)
                })
            },
            submitForm() {          //登录
                let params = {
                    UserID:this.ruleForm.username,
                    UserPwd:this.ruleForm.password,
                    VerifyCode:this.ruleForm.picture
                }
                UserLogin(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('欢迎回来,' + res.data.Result)
                        window.localStorage.setItem('role',res.data.Result)
                        this.$router.push('/');
                    }
                    if(res.data.Success == 0){
                       this.$message(res.data.Result)
                       this.getdata()
                       this.ruleForm.password = ''
                       this.ruleForm.picture = ''
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                }) 
             },
            getTokenID(){
                let params = {}
                getTokenID(qs.stringify(params)).then((res)=>{
                     if(res.data.Success == 1){
                       console.log( 'TokenID:'  + res.data.Result)
                       sessionStorage.setItem('TokenID', res.data.Result)
                       this.getdata()
                    }
                    if(res.data.Success == 0){
                       this.$message(res.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            }
        },
        created(){
            this.getTokenID()
        }
    }
</script>

<style lang="scss" scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/background.png);
        min-width: 1024px;
        min-height: 576px;
        background-size: cover;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        padding-left: 30%;
        display: flex;
        align-items: center;
        // border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:28%;
        top:30%;
        width:60%;
        height:80%;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        // background: rgba(255,255,255, 0.3);
        overflow: hidden;
        background: rgba(255, 255, 255, 0);
        border-radius: 21px;
        -webkit-box-shadow: 0px 0px 21px rgba(0, 0, 0, 0.2);
        box-shadow: 0px 0px 21px rgba(0, 0, 0, 0.2);        

    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
    /* .el-form-item__content{
        display: flex!important;
        flex-direction: unset!important;
    }
    .el-input__inner{
        width:20vw!important
    } */
    .Login-shadows{
        width:40%;
        width:40%;
        padding-top: 18%;
        padding-left: 5%;
    }
    h2{
        padding-left:20px
    }
    .el-form{
        .el-form-item{
            .el-form-item__content{
                display:flex!important;
                flex-direction:unset!important;
                align-items:center!important;
                .picture{
                    width:60%!important;
                    margin-right:10px
                }
            }
        }
    }
</style>
