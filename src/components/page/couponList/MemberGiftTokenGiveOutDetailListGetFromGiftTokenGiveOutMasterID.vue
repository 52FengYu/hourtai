<template>
    <div>
        <template v-if="this.add === false">
            <el-button type="primary" @click="add = true" icon="el-icon-circle-plus" v-if="this.Audit === 'N'">添加明细</el-button>
            <h2 align="center">领券活动明细</h2>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="Amount" label="优惠券金额" align="center"></el-table-column>
                <el-table-column prop="Cost" label="优惠券成本"  align="center"></el-table-column>
                <el-table-column prop="CreateManID" label="优惠券明细创建人" align="center"></el-table-column>
                <el-table-column prop="CreateTime" label="优惠券明细创建时间"  align="center"></el-table-column>
                <el-table-column prop="DisplayRemark" label="优惠券使用范围描述"  align="center"></el-table-column>
                <el-table-column prop="GiftTokenGiveOutMasterID" label="优惠券领券主表ID" align="center"></el-table-column>
                <el-table-column prop="GiftTokenName" label="优惠券明细" align="center" ></el-table-column>
                <el-table-column prop="GiftTokenType" label="优惠券类型" align="center" ></el-table-column>
                <el-table-column prop="ID" label="优惠券领券明细ID" align="center"></el-table-column>
                <el-table-column prop="LastUpdateManID" label="追后修改人" align="center" ></el-table-column>
                <el-table-column prop="LastUpdateTime" label="最后修改时间" align="center" ></el-table-column>
                <el-table-column prop="MainSupplierID" label="主供应商号" align="center"></el-table-column>
                <el-table-column prop="Remark" label="备注" align="center" ></el-table-column>
                <el-table-column prop="SupplierID" label="供应商号" align="center" ></el-table-column>
                <el-table-column prop="UseAddTime" label="优惠券结束时间按领取时间增加天数" align="center"></el-table-column>
                <el-table-column prop="UseAmount" label="优惠券使用金额"  align="center"></el-table-column>
                <el-table-column prop="UseBeginTime" label="开始使用时间"  align="center"></el-table-column>
                <el-table-column prop="UseBlackRange" label="使用黑名单" align="center"></el-table-column>
                <el-table-column prop="UseBlackType" label="使用黑名单类型"  align="center"></el-table-column>
                <el-table-column prop="UseEndTime" label="使用结束时间"  align="center"></el-table-column>
                <el-table-column prop="UseRange" label="使用范围" align="center"></el-table-column>
                <el-table-column prop="UseType" label="使用范围类型" align="center" ></el-table-column>
                <el-table-column label="操作" align="center" width="150px" fixed="right" v-if="this.Audit == 'N'">
                    <template  slot-scope="scope">
                        <el-button size="mini" type="primary" @click="edit(scope.row)">修改</el-button>
                        <el-button size="mini" type="primary" @click="deleteItem(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template v-if="this.add === true">
            <el-button type="primary" icon="el-icon-back" @click="add = false">返回</el-button>
            <el-form ref="form" :model="form" label-width="20vw">
                <el-form-item label="优惠券名称">
                    <el-input v-model="form.GiftTokenName"></el-input>
                </el-form-item>
                <el-form-item label="优惠券金额">
                    <el-input v-model="form.Amount"></el-input>
                </el-form-item>
                <el-form-item label="优惠券使用范围描述">
                    <el-input v-model="form.DisPlayRemark"></el-input>
                </el-form-item>
                <el-form-item label="优惠券成本">
                    <el-input v-model="form.Cost"></el-input>
                </el-form-item>
                <el-form-item label="使用范围类型">
                    <el-radio v-model="form.GiftTokenType" label="C">不限制</el-radio>
                    <el-radio v-model="form.GiftTokenType" label="N">利群内部供应商</el-radio>
                </el-form-item>
                <el-form-item label="主供应商号">
                    <el-select v-model="form.MainSupplierID" placeholder="主供应商">
                        <el-option
                        v-for="item in form.option1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.Remark"></el-input>
                </el-form-item>
                <el-form-item label="供应商号">
                    <el-select v-model="form.SupplierID" placeholder="供应商">
                        <el-option
                        v-for="item in form.option2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优惠券使用时间按领券时间增加指定的天数">
                    <el-input v-model="form.UseAddTime"></el-input>
                    <i>固定时长传-1</i>
                </el-form-item>
                <el-form-item label="优惠券使用金额">
                    <el-input v-model="form.UseAmount"></el-input>
                </el-form-item>
                <el-form-item label="开始使用时间">
                    <el-date-picker
                        v-model="form.timeStart"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="开始时间"
                        @change="updateDateStart">
                    </el-date-picker>
                    <i>UseAddTime 为-1时必传</i>
                </el-form-item>
                <el-form-item label="使用黑名单">
                    <el-input v-model="form.UseBlakRange"></el-input>
                    <i>不同ID之间用 竖线 分割</i>
                </el-form-item>
                <el-form-item label="使用黑名单">
                    <el-radio v-model="form.UseBlackType" label="B">品牌</el-radio>
                    <el-radio v-model="form.UseBlackType" label="C1">一级分类</el-radio>
                    <el-radio v-model="form.UseBlackType" label="C2">二级分类</el-radio>
                    <el-radio v-model="form.UseBlackType" label="C3">三级分类</el-radio>
                    <el-radio v-model="form.UseBlackType" label="P">单品</el-radio>
                    <el-radio v-model="form.UseBlackType" label="">不限制</el-radio>
                    <!-- <i>B 品牌 C1一级分了 C2 二级分类 C3三级分类 P 单品 空则表示不限制</i> -->
                </el-form-item>
                <el-form-item label="结束使用时间">
                    <el-date-picker
                        v-model="form.timeEnd"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="结束时间"
                        @change="updateDateEnd">
                    </el-date-picker>
                    <i>UseAddTime 为-1时必传</i>
                </el-form-item>
                <el-form-item label="使用范围">
                    <el-input v-model="form.UseRange"></el-input>
                    <i>不同ID之间用 竖线 分割</i>
                </el-form-item>
                <el-form-item label="使用范围类型">
                    <el-radio v-model="form.UseType" label="A">全场通用</el-radio>
                    <el-radio v-model="form.UseType" label="B">品牌</el-radio>
                    <el-radio v-model="form.UseType" label="C1">一级分类</el-radio>
                    <el-radio v-model="form.UseType" label="C2">二级分类</el-radio>
                    <el-radio v-model="form.UseType" label="C3">三级分类</el-radio>
                    <el-radio v-model="form.UseType" label="P">单品</el-radio>
                    <!-- <i>A 全场通用 B 品牌 C1一级分了 C2 二级分类 C3三级分类 P 单品</i> -->
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" v-if="this.flag == true">提交</el-button>
                    <el-button type="primary" @click="saveEdit" v-if="this.flag == false">确认修改</el-button>
                    <el-button type="primary" @click="clear">重置</el-button>
                </el-form-item>
            </el-form>
        </template>
    </div>
</template>
<script>
import { MemberGiftTokenGiveOutDetailListGetFromGiftTokenGiveOutMasterID,MemberGiftTokenGiveOutDetailUpdate,MemberGiftTokenGiveOutDetailDelete,MemberGiftTokenGiveOutDetailAdd } from '@/api/coupon';
import { SupplierListGetByLevel } from '@/api/goodsList';
import qs from 'qs'
    export default{
        data(){
            return{
                tableData:[],   /* 明细信息存放在此 */
                Audit:decodeURI(location.href).split('&')[1].split('=')[1],
                add:false,
                form:{
                    GiftTokenName:'',   /* 优惠券名称 */
                    Amount:'',          /* 优惠券金额 */
                    DisPlayRemark:'',       /* 优惠券使用范围描述 */
                    Cost:'',                /* 优惠券成本 */
                    GiftTokenType:'',           /* 使用范围类型 */
                    MainSupplierID:'',          /* 主供应商号 */
                    Remark:'',              /* 备注 */
                    SupplierID:'',          /* 供应商号 */
                    UseAddTime:'',          /* 优惠券使用时间按领券时间增加指定的天数 */
                    UseAmount:'',           /* 优惠券使用金额 */
                    timeStart:'',           /* 开始时间 */
                    UseBlakRange:'',       /* 使用黑名单 */
                    UseBlackType:'',       /* 使用黑名单 */
                    timeEnd:'',             /* 结束时间 */
                    UseRange:'',                /* 使用范围 */
                    UseType:'',                 /* 使用范围类型 */
                    option1:[],
                    option2:[]
                },
                flag:true,
                ID:''
            }
        },
        methods:{
            getData(){
                let params = {
                    GiftTokenGiveOutMasterID : decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0]
                }
                MemberGiftTokenGiveOutDetailListGetFromGiftTokenGiveOutMasterID(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.tableData  =  JSON.parse(res.data.Result)
                        console.log(this.tableData)
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -999){
                        console.log("用户未登录")
                        console.log(res.data)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
            deleteItem(row){
                let params = {
                    GiftTokenGiveOutMasterID : decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0],
                    ID:row.ID
                }
                MemberGiftTokenGiveOutDetailDelete(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.$message.success('删除成功')
                        this.getData()
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -999){
                        console.log("用户未登录")
                        console.log(res.data)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
            updateDateStart(val) {
                console.log("val:" + val)
                this.form.timeStart = val + " 00:00:00"
                console.log("this.value1:" + this.value1)
            },
            updateDateEnd(val) {
                console.log("val:" + val)
                this.form.timeEnd = val + " 00:00:00"
                console.log("this.value1:" + this.value1)
            },
            onSubmit(){
                let params = {
                    GiftTokenGiveOutMasterID : decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0],
                    Amount:this.form.Amount,
                    Cost:this.form.Cost,
                    DisPlayRemark:this.form.DisPlayRemark,
                    GiftTokenName:this.form.GiftTokenName,
                    GiftTokenType:this.form.GiftTokenType,
                    MainSupplierID:this.form.MainSupplierID,
                    Remark:this.form.Remark,
                    SupplierID:this.form.SupplierID,
                    UseAddTime:this.form.UseAddTime,
                    UseAmount:this.form.UseAmount,
                    UseBeginTime:this.form.timeStart,
                    UseBlakRange:this.form.UseBlakRange,
                    UseBlackType:this.form.UseBlackType,
                    UseEndTime:this.form.timeEnd,
                    UseRange:this.form.UseRange,
                    UseType:this.form.UseType
                }
                MemberGiftTokenGiveOutDetailAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.$message.success('添加成功')
                        this.getData()
                        this.add = false
                        this.form.Amount = '',
                        this.form.Cost = '',
                        this.form.DisPlayRemark = '',
                        this.form.GiftTokenName = "",
                        this.form.GiftTokenType = '',
                        this.form.MainSupplierID = '',
                        this.form.Remark = '',
                        this.form.SupplierID = '',
                        this.form.UseAddTime = '',
                        this.form.UseAmount = '',
                        this.form.timeStart = '',
                        this.form.UseBlakRange = '',
                        this.form.UseBlackType = '',
                        this.form.timeEnd = '',
                        this.form.UseRange = '',
                        this.form.UseType = ''
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -999){
                        console.log("用户未登录")
                        console.log(res.data)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
            clear(){
                this.form.Amount = '',
                this.form.Cost = '',
                this.form.DisPlayRemark = '',
                this.form.GiftTokenName = "",
                this.form.GiftTokenType = '',
                this.form.MainSupplierID = '',
                this.form.Remark = '',
                this.form.SupplierID = '',
                this.form.UseAddTime = '',
                this.form.UseAmount = '',
                this.form.timeStart = '',
                this.form.UseBlakRange = '',
                this.form.UseBlackType = '',
                this.form.timeEnd = '',
                this.form.UseRange = '',
                this.form.UseType = ''
            },
            getMainSupplier(){
                let params = {
                    Level:1
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.form.option1 = JSON.parse(res.data.Result)
                        console.log(this.option1)
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -999){
                        console.log("用户未登录")
                        console.log(res.data)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
            getSupplier(){
                let params = {
                    Level:2
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        this.form.option2 = JSON.parse(res.data.Result)
                        console.log(this.option2)
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -999){
                        console.log("用户未登录")
                        console.log(res.data)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
            edit(row){
                this.add = true;
                this.flag = false;
                this.ID = row.ID
                console.log(this.ID)
            },
            saveEdit(){                 /* 确认修改 */
                let params = {
                    ID:this.ID,
                    GiftTokenGiveOutMasterID:decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0],
                    Amount:this.form.Amount,
                    Cost:this.form.Cost,
                    DisPlayRemark:this.form.DisPlayRemark,
                    GiftTokenName:this.form.GiftTokenName,
                    GiftTokenType:this.form.GiftTokenType,
                    MainSupplierID:this.form.MainSupplierID,
                    Remark:this.form.Remark,
                    SupplierID:this.form.SupplierID,
                    UseAddTime:this.form.UseAddTime,
                    UseAmount:this.form.UseAmount,
                    UseBeginTime:this.form.timeStart,
                    UseBlakRange:this.form.UseBlakRange,
                    UseBlackType:this.form.UseBlackType,
                    UseEndTime:this.form.timeEnd,
                    UseRange:this.form.UseRange,
                    UseType:this.form.UseType
                }
                MemberGiftTokenGiveOutDetailUpdate(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                       this.add = false;
                       this.$message.success('修改成功')
                       this.getData()
                       this.clear()
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -999){
                        console.log("用户未登录")
                        console.log(res.data)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            }
        },
        created(){
            this.getData()
            this.getMainSupplier()
            this.getSupplier()
        }
    }
</script>
<style lang="scss" scoped>
    .el-form{
        .el-form-item{
            .el-form-item__content{
                width:30vw!important;
                .el-input{
                    width:30vw
                }
            }
        }
    }
</style>