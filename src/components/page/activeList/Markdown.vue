<template>
    <div>
        <el-card>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="CreateManID" label="创建人" align="center"></el-table-column>
                <el-table-column prop="CreateTime" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="DelFlag" label="是否废弃" align="center"></el-table-column>

                <el-table-column prop="DisplayStock" label="显示库存" align="center"></el-table-column>
                <el-table-column prop="ID" label="编号" align="center"></el-table-column>
                <el-table-column prop="IsAutoUse" label="是否加入购物车是自动使用" align="center">
                    <template slot-scope="scope">  
                        {{scope.row.IsAutoUse === 'N' ? '否' : '是'}}
                    </template>
                </el-table-column>

                <el-table-column prop="IsDayMaxQty" label="最大数量限制是否为当天" align="center">
                    <template slot-scope="scope">  
                        {{scope.row.IsDayMaxQty === 'N' ? '否' : '是'}}
                    </template>
                </el-table-column>
                <el-table-column prop="MaxQty" label="最大购买量" align="center"></el-table-column>
                <el-table-column prop="MaxStock" label="最大库存(-1为不限)" align="center"></el-table-column>

                <el-table-column prop="MinQty" label="最小购买数量" align="center"></el-table-column>
                <el-table-column prop="ProductID" label="商品编码" align="center"></el-table-column>
                <el-table-column prop="PromotionID" label="活动号" align="center"></el-table-column>

                <el-table-column prop="PromotionPrice" label="活动价" align="center"></el-table-column>
                <el-table-column prop="Stock" label="库存" align="center"></el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handle(scope.row)" type="text" size="small" v-if="PromotionState === 'N'">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>   
        </el-card>
        
            <!-- 修改促销降价活动弹出框 -->
            <el-dialog title="促销降价活动修改" :visible.sync="editVisible" width="40%" :close-on-click-modal="false">
                <el-form ref="form" :model="row" label-width="180px">
                    <!-- <el-form-item label="活动号">
                        <el-input v-model="row.PromotionID" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="降价促销活动编号">
                        <el-input v-model="row.ID" :disabled="true"></el-input>
                    </el-form-item> -->
                    <el-form-item label="显示库存">
                        <el-input v-model="row.DisplayStock"></el-input>
                    </el-form-item>
                    <el-form-item label="在加入购物车时自动参加">
                        <el-radio v-model="row.IsAutoUse" label="Y">是</el-radio>
                        <el-radio v-model="row.IsAutoUse" label="N">否</el-radio>
                    </el-form-item>
                    <el-form-item label="当天最大数量">
                        <el-radio v-model="row.IsDayMaxQty" label="Y">是</el-radio>
                        <el-radio v-model="row.IsDayMaxQty" label="N">否</el-radio>
                    </el-form-item>
                    <el-form-item label="最大购买数量">
                        <el-input v-model="row.MaxQty"></el-input>
                    </el-form-item>
                    <el-form-item label="商品编码">
                        <el-input v-model="row.ProductID"></el-input>
                    </el-form-item>
                    <el-form-item label="活动价格">
                        <el-input v-model="row.PromotionPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="库存">
                        <el-input v-model="row.Stock"></el-input>
                    </el-form-item>
                    <el-form-item label="最小购买数量">
                        <el-input v-model="row.MinQty"></el-input>
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
import { PromotionProductGetFromPromotionID,PromotionProductUpdate } from '@/api/activeList'
import qs from 'qs'
    export default{
        name:'Markdown',
        data(){
            return{
                tableData:[],               /* 列表信息存在这 */
                PromotionState:'',
                editVisible:false,          /* 修改降价促销活动 */
                ID:'',                      /* 点击修改的时候，把活动号存到这 */
                row:[]
            }
        },
        methods:{
            getData(){
                let params = {
                    PromotionID:decodeURI(location.href).split('?')[1].split('=')[1]
                }
                PromotionProductGetFromPromotionID(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.tableData = JSON.parse(res.data.Result)
                        this.PromotionState = decodeURI(location.href).split('&')[1].split('=')[1]
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
            handle(row){
                this.row = row
                this.editVisible = true
            },
            onSubmit(){
                let params = {
                    ID:this.row.ID,
                    PromotionID:this.row.PromotionID,
                    DisplayStock:this.row.DisplayStock,
                    IsAutoUse:this.row.IsAutoUse,
                    IsDayMaxQty:this.row.IsDayMaxQty,
                    MaxQty:this.row.MaxQty,
                    ProductID:this.row.ProductID,
                    PromotionPrice:this.row.PromotionPrice,
                    Stock:this.row.Stock,
                    MinQty:this.row.MinQty
                }
                PromotionProductGetFromPromotionID(qs.stringify(params)).then((res)=>{
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
                })
            }
        },
        created(){
            this.getData()
        }
    }
</script>
<style lang="scss" scoped>

</style>