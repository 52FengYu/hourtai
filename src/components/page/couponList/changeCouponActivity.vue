<template>
    <div>
        <el-form ref="form" :model="form" label-width="30vw">
            <el-form-item label="会员最后注册时间(传空为不限制)">
                <el-date-picker
                    v-model="form.IsLastRegTime"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="会员最后注册时间"
                    @change="IsLastRegTime">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="单日最大领取数量(-1 为不限制)">
                <el-input v-model="form.DayMaxNum"></el-input>
            </el-form-item>
            <el-form-item label="发券活动名称">
                <el-input v-model="form.GiftTokenGiveOutName"></el-input>
            </el-form-item>
            <el-form-item label="领券开始时间">
                <el-date-picker
                    v-model="form.GiveBeginTime"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="开始时间"
                    @change="updateDateStart">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="领券结束时间">
                <el-date-picker
                    v-model="form.GiveEndTime"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="结束时间"
                    @change="updateDateEnd">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="领券类型">
                <el-radio v-model="form.GiveOutType" label="C">直接发券</el-radio>
                <el-radio v-model="form.GiveOutType" label="M">密码发券</el-radio>
            </el-form-item>
            <el-form-item label="是否必须为新会员">
                <el-radio v-model="form.IsMasterNewMember" label="Y">是</el-radio>
                <el-radio v-model="form.IsMasterNewMember" label="N">否</el-radio>
            </el-form-item>
            <el-form-item label="是否为会员登陆自动发券">
                <el-radio v-model="form.IsMemberLoginAutoSend" label="Y">是</el-radio>
                <el-radio v-model="form.IsMemberLoginAutoSend" label="N">否</el-radio>
            </el-form-item>
            <el-form-item label="主供应商号(为空表示不限制)">
                <el-select v-model="form.MainSupplierID" placeholder="主供应商" clearable filterable @change="getSupplier">
                    <el-option
                    v-for="item in option1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供应商号(为空表示不限制)">
                <el-select v-model="form.SupplierID" placeholder="供应商" clearable filterable >
                    <el-option
                    v-for="item in option2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="最大发放数量 (-1 表示不限制)">
                <el-input v-model="form.MaxNum"></el-input>
            </el-form-item>
            <el-form-item label="会员黑名单(不同会员之间用 竖线 分割)">
                <el-input v-model="form.MemberIDBlackRange"></el-input>
            </el-form-item>
            <el-form-item label="指定发放会员名单(不同会员之间用 竖线 分割)">
                <el-input v-model="form.MemberIDRange"></el-input>
            </el-form-item>
            <el-form-item label="会员最大领券数量">
                <el-input v-model="form.MemberMaxNum"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.Remark"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button type="primary" @click="clear">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { MemberGiftTokenGiveOutMasterUpdate,MemberGiftTokenGiveOutMasterListGet } from '@/api/coupon';
import { SupplierListGetByLevel } from "@/api/goodsList"
import qs from 'qs'
    export default{
        data(){
            return{
                tableData:[],
                form:{
                    IsLastRegTime:'',       /* 会员最后注册时间 */
                    DayMaxNum:'',           /* 单日最大领取数量 */
                    GiftTokenGiveOutName:'',    /* 发券活动名称 */
                    GiveBeginTime:'',               /* 开始领券时间 */
                    GiveEndTime:'',                 /* 结束领券时间 */
                    GiveOutType:'',                /* 领券类型 */
                    IsMasterNewMember:'',               /* 是否必须为新会员 */
                    IsMemberLoginAutoSend:'',              /* 是否为会员登陆自动发券 */
                    MainSupplierID:'',                  /* 主供应商号 */
                    MaxNum:'',                          /* 最大发放数量 -1 表示不限制 */
                    MemberIDBlackRange:'',              /* 会员黑名单 */
                    MemberIDRange:'',                   /* 指定发放会员名单(不同会员之间用 竖线 分割) */
                    MemberMaxNum:'',                    /* 会员最大领券数量 */
                    Remark:'',                          /* 备注 */
                    SupplierID:'',                      /* 供应商号 */
                },
                option1:[],
                option2:[]
            }
        },
        methods:{
            clear(){
                this.form.IsLastRegTime = '',
                this.form.DayMaxNum = "",
                this.form.GiftTokenGiveOutName = "",
                this.form.GiveBeginTime = "",
                this.form.GiveEndTime = "",
                this.form.GiveOutType = "",
                this.form.IsMasterNewMember = "",
                this.form.IsMemberLoginAutoSend = "",
                this.form.MainSupplierID = "",
                this.form.MaxNum = "",
                this.form.MemberIDBlackRange = "",
                this.form.MemberIDRange = "",
                this.form.MemberMaxNum = "",
                this.form.Remark = "",
                this.form.SupplierID = ""
            },
            submit(){
                let params = {
                    ID:decodeURI(location.href).split('?')[1].split('=')[1],
                    IsLastRegTime : this.form.IsLastRegTime,
                    DayMaxNum : this.form.DayMaxNum,
                    GiftTokenGiveOutName : this.form.GiftTokenGiveOutName,
                    GiveBeginTime : this.form.GiveBeginTime,
                    GiveEndTime : this.form.GiveEndTime,
                    GiveOutType : this.form.GiveOutType,
                    IsMasterNewMember : this.form.IsMasterNewMember,
                    IsMemberLoginAutoSend : this.form.IsMemberLoginAutoSend,
                    MainSupplierID : this.form.MainSupplierID,
                    MaxNum : this.form.MaxNum,
                    MemberIDBlackRange : this.form.MemberIDBlackRange,
                    MemberIDRange : this.form.MemberIDRange,
                    MemberMaxNum : this.form.MemberMaxNum,
                    Remark : this.form.Remark,
                    SupplierID : this.form.SupplierID
                }
                MemberGiftTokenGiveOutMasterUpdate(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('提交成功')
                        this.$router.push({
                            path:'/couponList',
                        })
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        this.$message(res.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            getData(){
                let params = {
                    ID:decodeURI(location.href).split('?')[1].split('=')[1],
                }
                MemberGiftTokenGiveOutMasterListGet(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.tableData = JSON.parse(res.data.Result).ModelList[0]
                        this.form.IsLastRegTime = this.tableData.IsLastRegTime       
                        this.form.DayMaxNum = this.tableData.DayMaxNum ,           
                        this.form.GiftTokenGiveOutName = this.tableData.GiftTokenGiveOutName ,    
                        this.form.GiveBeginTime = this.tableData.GiveBeginTime ,               
                        this.form.GiveEndTime = this.tableData.GiveEndTime ,                 
                        this.form.GiveOutType = this.tableData.GiveOutType ,                
                        this.form.IsMasterNewMember = this.tableData.IsMastNewMember ,               
                        this.form.IsMemberLoginAutoSend = this.tableData.IsMemberLoginAutoSend ,            
                        this.form.MainSupplierID = this.tableData.MainSupplierID ,                  
                        this.form.MaxNum = this.tableData.MaxNum ,                         
                        this.form.MemberIDBlackRange = this.tableData.MemberIDBlackRange ,      
                        this.form.MemberIDRange = this.tableData.MemberIDRange ,                  
                        this.form.MemberMaxNum = this.tableData.MemberMaxNum ,                   
                        this.form.Remark = this.tableData.Remark ,                         
                        this.form.SupplierID = this.tableData.SupplierID
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        this.$message(res.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            IsLastRegTime(val) {
                this.form.IsLastRegTime = val + " 00:00:00"
            },
            updateDateStart(val) {
                this.form.GiveBeginTime = val + " 00:00:00"
            },
            updateDateEnd(val) {
                this.form.GiveEndTime = val + " 00:00:00"
            },
            getMainSupplier(){
                let params = {
                    Level:1
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.option1 = JSON.parse(res.data.Result)
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        this.$message(res.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            getSupplier(){
                this.form.SupplierID = ''
                let params = {
                    Level:2,
                    MainSupplierID:this.form.MainSupplierID
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.option2 = JSON.parse(res.data.Result)
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        this.$message(res.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
        },
        created(){
            this.getData()
            this.getMainSupplier()
        }
    }
</script>  
<style lang="scss" scoped>
    .content{
        .el-form{
            .el-form-item{
                .el-form-item__content{
                    width:30vw!important;
                    .el-input{
                        width:30vw!important
                    }
                }
            }
        }
    }
</style>