<template>
    <div>
        <el-card>
            <el-button type="primary" @click="editVisible = true" v-if="this.addGift.PromotionState === 'N'">添加赠品</el-button>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="ID" label="赠品ID" align="center"></el-table-column>
                <el-table-column prop="ProductID" label="商品编码" align="center"></el-table-column>
                <el-table-column prop="PromotionGiftID" label="满赠活动ID" align="center"></el-table-column>
                <el-table-column prop="PromotionGiftType" label="赠品类型" align="center"></el-table-column>
                <el-table-column prop="Qty" label="赠品数量" align="center"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right" min-width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" plain @click="changeGift(scope.row)">修改赠品</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        
        <!-- 新建赠品弹出框 -->
        <el-dialog title="新建赠品" :visible.sync="editVisible" width="50%" :close-on-click-modal="false">
            <el-form ref="form" :model="addGift" label-width="100px">
                <el-form-item label="活动号">
                    <el-input :disabled="true" v-model="addGift.PromotionID"></el-input>
                </el-form-item>
                <el-form-item label="满赠活动编号">
                    <el-input v-model="addGift.PromotionGiftID"></el-input>
                </el-form-item>
                <el-form-item label="赠品类别">
                    <el-select v-model="addGift.PromotionGiftType" clearable placeholder="请选择">
                        <el-option label="赠送商品" value="P"></el-option>
                        <el-option label="赠送代金券" value="G"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品编码">
                    <el-input v-model="addGift.ProductID"></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input v-model="addGift.Qty"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- 修改赠品弹出框 -->
        <el-dialog title="修改赠品" :visible.sync="editVisible2" width="50%" :close-on-click-modal="false">
            <el-form ref="form" :model="row" label-width="100px">
                <el-form-item label="活动号">
                    <el-input :disabled="true" v-model="row.PromotionID"></el-input>
                </el-form-item>
                <el-form-item label="满赠活动编号">
                    <el-input v-model="row.PromotionGiftID"></el-input>
                </el-form-item>
                <el-form-item label="赠品类别">
                    <el-select v-model="row.PromotionGiftType" clearable placeholder="请选择">
                        <el-option label="赠送商品" value="P"></el-option>
                        <el-option label="赠送代金券" value="G"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品编码">
                    <el-input v-model="row.ProductID"></el-input>
                </el-form-item>
                <el-form-item label="数量">
                    <el-input v-model="row.Qty"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="change">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { PromotionGiftDetailListGetFromPromotionGiftID,PromotionGiftDetailUpdate,PromotionGiftDetailAdd } from '@/api/activeList'
import qs from 'qs'
export default{
    name:'littleGiftList',
    data(){
        return{
            tableData:[],
            editVisible:false,              /* 新建赠品 */
            editVisible2:false,             /* 修改赠品 */
            addGift:{
                PromotionID:'',
                PromotionGiftID:'',
                PromotionGiftType:'',
                ProductID:'',
                Qty:'',
                PromotionState:''
            },
            row:[],             
        }
    },
    methods:{
        getData(){
            this.addGift.PromotionID = decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0]
            this.addGift.PromotionGiftID = decodeURI(location.href).split('&')[1].split('=')[1]
            this.addGift.PromotionState = decodeURI(location.href).split('&')[2].split('=')[1]
            let params = {
                    PromotionGiftID:decodeURI(location.href).split('&')[1].split('=')[1]
                }
                PromotionGiftDetailListGetFromPromotionGiftID(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        this.tableData = JSON.parse(res.data.Result)
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
        onSubmit(){             /* 添加满赠商品 */
            let params = {
                PromotionID:this.addGift.PromotionID,
                PromotionGiftID:this.addGift.PromotionGiftID,
                PromotionGiftType:this.addGift.PromotionGiftType,
                ProductID:this.addGift.ProductID,
                Qty:this.addGift.Qty
            }
            PromotionGiftDetailAdd(qs.stringify(params)).then((res)=>{
                if(res.data.Success == 1){
                    this.editVisible = false
                    this.getData()
                    this.$message.success('添加成功')
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
        changeGift(row){
            this.row = row
            this.row.PromotionID = decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0]
            this.editVisible2 = true 
        },
        change(){
            let params = {
                PromotionID:decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0],               /* 活动号 */
                PromotionGiftID:this.row.PromotionGiftID,             /* 满赠活动编号 */
                ID:this.row.ID,                          /* 赠品ID */
                PromotionGiftType:this.row.PromotionGiftType,              /* 赠品类别 */
                ProductID:this.row.ProductID,                      /* 商品编码 */
                Qty:this.row.Qty                    /* 数量 */
            }
            PromotionGiftDetailUpdate(qs.stringify(params)).then((res)=>{
                if(res.data.Success == 1){
                    this.editVisible2 = false
                    this.getData()
                    this.$message.success('添加成功')
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