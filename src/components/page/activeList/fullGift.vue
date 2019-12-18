<template>
    <div>
        <el-card>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="PromotionName" label="活动名称" align="center"></el-table-column>
                <el-table-column prop="PromotionID" label="活动号" align="center"></el-table-column>
                <el-table-column prop="CreateManID" label="创建人" align="center"></el-table-column>
                <el-table-column prop="CreateTime" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="DelFlag" label="是否废弃" align="center"></el-table-column>
                <el-table-column prop="ID" label="满赠活动ID" align="center"></el-table-column>
                <el-table-column prop="IsAllOne" label="是否整个活动只能参加一次" align="center">
                    <template slot-scope="scope">
                        {{scope.row.IsAllOne == 'Y' ? '是' : '否'}}
                    </template>
                </el-table-column>
                <el-table-column prop="IsDayOne" label="是否每天只能参加一次" align="center">
                    <template slot-scope="scope">
                        {{scope.row.IsDayOne == 'Y' ? '是' : '否'}}
                    </template>
                </el-table-column>
                <el-table-column prop="LastUpdateManID" label="最后修改人" align="center"></el-table-column>
                <el-table-column prop="LastUpdateTime" label="最后修改时间" align="center"></el-table-column>
                <el-table-column prop="MaxStock" label="活动库存" align="center"></el-table-column>
                <el-table-column prop="Stock" label="剩余库存" align="center"></el-table-column>
                <el-table-column prop="UseAmount" label="满赠满足金额" align="center"></el-table-column>
                <el-table-column prop="UseBlackRange" label="黑名单" align="center"></el-table-column>
                <el-table-column prop="UseBlackType" label="黑名单类型" align="center">
                    <template slot-scope="scope">
                        {{scope.row.UseBlackType == 'B'?'品牌':(scope.row.UseBlackType == 'P'?'单品':(scope.row.UseBlackType == 'C1'?'一级品类':(scope.row.UseBlackType == 'C2'?'二级品类':(scope.row.UseBlackType == 'C3' ? '三级品类':''))))}}
                    </template>
                </el-table-column>
                <el-table-column prop="UseRange" label="使用范围" align="center"></el-table-column>
                <el-table-column prop="UseType" label="使用范围类型" align="center">
                    <template slot-scope="scope">
                        {{scope.row.UseType == 'A' ? '全场' : (scope.row.UseType == 'B' ? '品牌' : (scope.row.UseType == 'P' ? '单品' : (scope.row.UseType == 'C1'? '一级品类' : ( scope.row.UseType == 'C2'? '二级品类' : (scope.row.UseType == 'C3' ? '三级品类' :'')))))}}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="handle(scope.row)" type="text" size="small" v-if="PromotionState === 'N'">修改活动</el-button>
                        <el-button @click="littleGiftList(scope.row)" type="text" size="small">赠品列表</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        
            <!-- 修改满赠活动弹出框 -->
            <el-dialog title="满赠活动修改" :visible.sync="editVisible" width="40%">
                <el-form ref="form" :model="row" label-width="180px">
                    <el-form-item label="活动号">
                        <el-input v-model="row.PromotionID" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="满折活动ID">
                        <el-input v-model="row.ID" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="活动名称">
                        <el-input v-model="row.PromotionName" ></el-input>
                    </el-form-item>

                    <el-form-item label="是否整个活动只能参加一次">
                        <el-radio v-model="row.IsAllOne" label="Y">是</el-radio>
                        <el-radio v-model="row.IsAllOne" label="N">否</el-radio>
                    </el-form-item>

                    <el-form-item label="是否全天只能参加一次">
                        <el-radio v-model="row.IsDayOne" label="Y">是</el-radio>
                        <el-radio v-model="row.IsDayOne" label="N">否</el-radio>
                    </el-form-item>
                    <el-form-item label="最大活动数量">
                        <el-input v-model="row.MaxStock" ></el-input>
                        <i>-1 为不限制</i>
                    </el-form-item>
                    <el-form-item label="满足金额">
                        <el-input v-model="row.UseAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="活动参与范围">
                        <el-select v-model="row.UseType" clearable placeholder="请选择">
                            <el-option value="A" label="全场"></el-option>
                            <el-option value="C1" label="一级品类"></el-option>
                            <el-option value="C2" label="二级品类"></el-option>
                            <el-option value="C3" label="三级品类"></el-option>
                            <el-option value="B" label="品类"></el-option>
                            <el-option value="P" label="单品"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用范围">
                        <el-input v-model="row.UseRange"></el-input>
                        <i>不同ID之间用竖线隔开</i>
                    </el-form-item>
                    <el-form-item label="参与范围黑名单类型">
                        <el-select v-model="row.UseBlackType" clearable placeholder="请选择">
                            <el-option value="C1" label="一级品类"></el-option>
                            <el-option value="C2" label="二级品类"></el-option>
                            <el-option value="C3" label="三级品类"></el-option>
                            <el-option value="B" label="品类"></el-option>
                            <el-option value="P" label="单品"></el-option>
                        </el-select>
                    <el-form-item label="使用黑名单">
                        <el-input v-model="row.UseBlackRange"></el-input>
                        <i>不同ID之间用竖线隔开</i>
                    </el-form-item>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onSubmit">确 定</el-button>
                </span>
            </el-dialog>
    </div>
</template>
<script>
import { PromotionGiftListGetFromPromotionID,PromotionGiftUpdate } from '@/api/activeList'
import qs from 'qs'
    export default{
        data(){
            return{
                tableData:[],
                PromotionState:'',
                editVisible:false,
                row:[],
            }
        },
        methods:{
            getData(){
                let params = {
                    PromotionID:decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0]
                }
                PromotionGiftListGetFromPromotionID(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        // console.log(JSON.parse(res.data.Result))
                        this.tableData = JSON.parse(res.data.Result)
                        this.PromotionState = decodeURI(location.href).split('&')[1].split('=')[1]
                    }
                    if(res.data.Success == 0){
                        // console.log(res.data.Result)
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                        this.$message(res.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
            handle(row){
                this.row = row
                this.editVisible = true
            },
            onSubmit(){
                let params = {
                    PromotionID:this.row.PromotionID,
                    ID:this.row.ID,
                    PromotionName:this.row.PromotionName,
                    IsAllOne:this.row.IsAllOne,
                    IsDayOne:this.row.IsDayOne,
                    MaxStock:this.row.MaxStock,
                    UseAmount:this.row.UseAmount,
                    UseBlackRange:this.row.UseBlackRange,
                    UseBlackType:this.row.UseBlackType,
                    UseRange:this.row.UseRange,
                    UseType:this.row.UseType
                }
                PromotionGiftUpdate(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        this.$message.success('修改成功')
                        this.editVisible = false
                        this.getData()
                        this.row = ''
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        this.$message(res.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
            littleGiftList(row){
                this.$router.push({
                    path:'/littleGiftList',
                    query:{
                        PromotionID:row.PromotionID,            /* 活动号 */
                        ID:row.ID,                               /* 满赠活动ID */
                        PromotionState:decodeURI(location.href).split('&')[1].split('=')[1]
                    }
                })
            }
        },
        created(){
            this.getData()
        }
    }
</script>   
<style lang="scss">

</style> 