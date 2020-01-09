<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-coin"></i> 支付方式</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="支付方式编号">
                    <el-input v-model="formInline.ID" placeholder="支付方式编号" clearable></el-input>
                </el-form-item>
                <el-form-item label="支付方式名称">
                    <el-input v-model="formInline.PayName" placeholder="支付方式名称" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="reset();getData()">查询</el-button>
                    <el-button type="primary" @click="editVisible = true">添加</el-button>
                </el-form-item>
            </el-form>
            <template>
                <el-table :data="tableData.ModelList" border style="width: 100%" highlight-current-row>
                    <el-table-column prop="ID" label="支付方式编号" align="center"></el-table-column>
                    <el-table-column prop="PayName" label="支付方式名称" align="center"></el-table-column>
                    <el-table-column prop="PayLink" label="支付链接" align="center"></el-table-column>
                    <el-table-column prop="IsLinkPay" label="是否在线支付" align="center">
                        <template slot-scope="scope">
                            {{scope.row.IsLinkPay == 'N' ? '否':'是'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="PayImageURL" label="支付方式图标地址" align="center"></el-table-column>
                    <el-table-column prop="PayNote" label="支付方式标记" align="center"></el-table-column>
                    <el-table-column prop="PromotionName" label="活动描述" align="center"></el-table-column>
                    <el-table-column label="操作" fixed="right" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="changePayMathods(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page= "PageIndex"
                    :page-size= this.formInline.PageSize
                    layout="total, sizes, prev, pager, next, jumper"
                    align="right"
                    :total='this.tableData.TotalCount'>
                </el-pagination>
            </template>
        </el-card>

        <!-- 添加支付方式 -->
        <el-dialog title="添加支付方式" :visible.sync="editVisible" width="30%" :close-on-click-modal="false">
            <el-form :model="checkedBox" class="demo-form-inline" label-width="100px">
                <el-form-item label="支付方式名称">
                    <el-input v-model="checkedBox.PayName"></el-input>
                </el-form-item>
                <el-form-item label="支付方式链接">
                    <el-input v-model="checkedBox.PayLink" placeholder="支付方式链接"></el-input>
                </el-form-item>
                <el-form-item label="支付方式图标">
                    <el-input v-model="checkedBox.PayImageURL" placeholder="支付方式图标"></el-input>
                </el-form-item>
                <el-form-item label="活动描述">
                    <el-input v-model="checkedBox.PromotionName" placeholder="活动描述"></el-input>
                </el-form-item>
                <el-form-item label="是否在线支付">
                    <el-radio v-model="checkedBox.IsLinkPay" label="Y">是</el-radio>
                    <el-radio v-model="checkedBox.IsLinkPay" label="N">否</el-radio>
                </el-form-item>
                <el-form-item label="支付方式标记">
                    <el-input v-model="checkedBox.PayNote"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="checkedBox.Remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- 修改支付方式 -->
        <el-dialog title="修改支付方式" :visible.sync="editVisible2" width="30%" :close-on-click-modal="false">
            <el-form :model="row" class="demo-form-inline" label-width="100px">
                <el-form-item label="支付方式名称">
                    <el-input v-model="row.PayName"></el-input>
                </el-form-item>
                <el-form-item label="支付方式链接">
                    <el-input v-model="row.PayLink" placeholder="支付方式链接"></el-input>
                </el-form-item>
                <el-form-item label="支付方式图标">
                    <el-input v-model="row.PayImageURL" placeholder="支付方式图标"></el-input>
                </el-form-item>
                <el-form-item label="活动描述">
                    <el-input v-model="row.PromotionName" placeholder="活动描述"></el-input>
                </el-form-item>
                <el-form-item label="是否在线支付">
                    <el-radio v-model="row.IsLinkPay" label="Y">是</el-radio>
                    <el-radio v-model="row.IsLinkPay" label="N">否</el-radio>
                </el-form-item>
                <el-form-item label="支付方式标记">
                    <el-input v-model="row.PayNote"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="row.Remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="Submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { BasePayListGet,BasePayAdd,BasePayUpdate } from  '@/api/common'
import qs from 'qs'
    export default{
        name:'PayMethods',
        data(){
            return{
                formInline:{
                    ID:'',
                    PayName:'',
                    PageIndex:1,
                    PageSize:10,
                },
                tableData:[],        /* 列表信息 */
                editVisible:false,          /* 添加支付方式的弹框 */
                editVisible2:false,         /* 修改支付方式的弹框 */
                checkedBox:{            /* 添加支付方式 */
                    PayName:'',
                    Remark:'',
                    IsLinkPay:'',
                    PayImageURL:'',
                    PayLink:'',
                    PayNote:'',
                    PromotionName:''
                },
                row:[],             /* 点击修改时，数据都放在这 */
            }
        },
        methods:{
            getData(){
                let params = {
                    ID:this.formInline.ID,
                    PayName:this.formInline.PayName,
                    PageIndex:this.formInline.PageIndex,
                    PageSize:this.formInline.PageSize
                }
                BasePayListGet(qs.stringify(params)).then((res)=>{
                    this.loading = false
                    if(res.data.Success == 1){
                        this.tableData = JSON.parse(res.data.Result)
                        console.log(this.tableData)
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
            reset(){
                this.formInline.PageIndex = 1,
                this.formInline.PageSize = 10
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.formInline.PageSize = val;
                this.getData()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.formInline.PageIndex = val;
                this.getData()
            },
            onSubmit(){                     /* 添加支付方式的确认按钮 */
                let params = {
                    PayName:this.checkedBox.PayName,
                    Remark:this.checkedBox.Remark,
                    IsLinkPay:this.checkedBox.IsLinkPay,
                    PayImageURL:this.checkedBox.PayImageURL,
                    PayLink:this.checkedBox.PayLink,
                    PayNote:this.checkedBox.PayNote,
                    PromotionName:this.checkedBox.PromotionName,
                }
                BasePayAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('添加成功')
                        this.editVisible = false
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
            changePayMathods(row){             /* 修改支付方式的数据获取以及弹框的显示 */
                console.log(row)
                this.row = row
                this.editVisible2 = true
            },
            Submit(){                           /* 修改支付方式的提交 */
                let params = {
                    ID:this.row.ID,
                    PayName:this.row.PayName,
                    Remark:this.row.Remark,
                    IsLinkPay:this.row.IsLinkPay,
                    PayImageURL:this.row.PayImageURL,
                    PayLink:this.row.PayLink,
                    PayNote:this.row.PayNote,
                    PromotionName:this.row.PromotionName,
                }/*  */
                BasePayUpdate(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('修改成功')
                        this.editVisible2 = false
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