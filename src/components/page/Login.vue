<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
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
                    <el-input class="picture" v-model="ruleForm.picture" @keyup.enter.native="submitForm"></el-input>
                    <el-image :src="ruleForm.pictures" @click="getdata"></el-image>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm">登录</el-button>
                </div>
            </el-form>
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
                        this.$message.success('欢迎' + res.data.Result + '，回来!')
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
                console.log(321)
                getTokenID(qs.stringify(params)).then((res)=>{
                     if(res.data.Success == 1){
                       console.log( 'TokenID:'  + res.data.Result)
                       sessionStorage.setItem('TokenID', res.data.Result)
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
            this.getdata()
            this.getTokenID()
        }
    }
</script>

<style lang="scss" scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
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
    .el-form{
        .el-form-item{
            .el-form-item__content{
                display: flex!important;
                flex-direction: unset!important;
                .picture{
                    width:60%!important
                }
            }
        }
    }
</style>
