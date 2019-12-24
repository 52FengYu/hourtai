<template>
    <div>
        <el-card>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="退货单号">
                    <el-input v-model="formInline.ID" placeholder="退货单号" clearable></el-input>
                </el-form-item>
                <el-form-item label="订单号">
                    <el-input v-model="formInline.OrderID" placeholder="订单号" clearable></el-input>
                </el-form-item>
                <el-form-item label="主供应商">
                    <el-select v-model="formInline.MainSupplierID" placeholder="主供应商" clearable filterable  @change="getSupplier">
                        <el-option
                            v-for="item in formInline.MainSupplierOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="供应商">
                    <el-select v-model="formInline.SupplierID" placeholder="供应商" clearable filterable>
                        <el-option
                            v-for="item in formInline.SupplierOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="会员号">
                    <el-input v-model="formInline.MemberID" placeholder="会员号" clearable></el-input>
                </el-form-item>
                <el-form-item label="是否在线支付">
                    <el-select v-model="formInline.IsLinkPay" clearable placeholder="请选择">
                        <el-option label="是" value="Y"></el-option>
                        <el-option label="否" value="N"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="退单创建开始时间">
                    <el-date-picker
                        v-model="formInline.BeginTime"
                        type="datetime"
                        
                        value-format="yyyy-MM-dd hh:mm:ss"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="退单创建结束时间">
                    <el-date-picker
                        v-model="formInline.EndTime"
                        value-format="yyyy-MM-dd hh:mm:ss"
                        type="datetime"
                        
                        placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="reset();getData()">提交</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData.ModelList" border style="width: 100%">
                <el-table-column prop="ID" label="退单号" align="center"></el-table-column>
                <el-table-column prop="DeliveryType" label="出库方式" align="center"></el-table-column>
                <el-table-column prop="OrderState" label="退单状态" align="center"></el-table-column>
                <el-table-column prop="MainSupplier" label="主供应商" align="center"></el-table-column>
                <el-table-column prop="Supplier" label="供应商" align="center"></el-table-column>
                <el-table-column prop="ReceiveMan" label="收货人" align="center"></el-table-column>
                <el-table-column prop="ReceiveMobile" label="收货人手机" align="center"></el-table-column>
                <el-table-column prop="IsLinkPay" label="是否在线支付" align="center"></el-table-column>
                <el-table-column prop="BackProductType" label="退货送回方式" align="center">
                    <template slot-scope="scope">
                        {{scope.row.BackProductType == 'S'?'送回门店':(scope.row.BackProductType == 'R'?'上门取货':'')}}
                    </template>
                </el-table-column>
                <el-table-column prop="CreateTime" label="退货时间" align="center"></el-table-column>
                <el-table-column prop="OrderAmount" label="订单金额" align="center"></el-table-column>
                <el-table-column prop="BackAmount" label="退单金额" align="center"></el-table-column>
                <el-table-column prop="GiftTokenMoeny" label="退优惠券金额" align="center"></el-table-column>
                <el-table-column prop="BackGiftCardMoney" label="退礼品卡金额" align="center"></el-table-column>
                <el-table-column prop="BackPointMoney" label="退积分金额" align="center"></el-table-column>
                <el-table-column prop="BackMoney" label="退钱金额" align="center"></el-table-column>
                <el-table-column prop="DiscountMoney" label="优惠金额" align="center"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" plain @click="checked(scope.row)" v-if="scope.row.OrderState == '新建'">审核</el-button>
                        <el-button type="primary" icon="el-icon-s-tools" @click="affirm(scope.row)" v-if="scope.row.OrderState == '同意退货'">确认收货</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="PageIndex"
                align="right"
                :page-size= this.PageSize
                layout="total, sizes, prev, pager, next, jumper"
                :total= this.tableData.TotalCount>
            </el-pagination>
        </el-card>

        <!-- 审核弹出框 -->
        <el-dialog title="审核" :visible.sync="editVisible" width="50%" :close-on-click-modal="false">
            <el-form :inline="true" :model="checkedBox" class="demo-form-inline">
                <el-form-item label="审核标记">
                    <el-select v-model="checkedBox.Audit" clearable placeholder="审核标记">
                        <el-option label="审核通过" value="A3"></el-option>
                        <el-option label="驳回" value="B3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核备注">
                    <el-input v-model="checkedBox.AuditRemark" placeholder="审核备注"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- 确认收货弹出框 -->
        <el-dialog title="确认收货" :visible.sync="editVisible2" width="50%" :close-on-click-modal="false">
            <el-form :inline="true" :model="confirm" class="demo-form-inline">
                <el-form-item label="收货选项">
                    <el-select v-model="confirm.Audit" clearable>
                        <el-option label="确认收货" value="R"></el-option>
                        <el-option label="收货失败" value="B2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="confirm.AuditRemark" placeholder="备注"></el-input>
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
import { SupplierListGetByLevel } from '@/api/goodsList';
import { OrderBackProductListGet,OrderBackProductCallCenterAudit,OrderBackProductSupplierReceiveAudit } from '@/api/orderList'
import qs from 'qs'
    export default{
        data(){
            return{
                formInline:{
                    ID:'',              /* 退货单号 */
                    OrderID:'',         /* 订单号 */
                    MainSupplierID:'',  /* 主供应商号 */
                    MainSupplierOption:[],              /* 主供应商候选 */
                    SupplierID:'',      /* 供应商号 */
                    SupplierOption:[],                  /* 供应商候选 */
                    MemberID:'',        /* 会员号 */
                    IsLinkPay:'',       /* 是否在线支付 */
                    BeginTime:'',       /* 退单创建开始时间 */
                    EndTime:'',         /* 退单创建结束时间 */
                },
                tableData:[],           /* 列表数据 */
                PageIndex:1,
                PageSize:10,
                editVisible:false,      /* 审核弹出框 */
                editVisible2:false,     /* 确认收货 */
                checkedBox:{
                    AuditRemark:'',      /* 审核备注 */
                    Audit:'',           /* 审核标记 */
                },
                row:[],                 /* 临时数据存放在这 */
                confirm:{
                    Audit:[],           /* R 确认收货 B2 收货失败 */
                    AuditRemark:[]      /* 备注 */
                }
            }
        },
        methods:{
            getMainSupplier(){                  /* 获取所有的主供应商 */                   
                let params = {
                    Level:1,
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.formInline.MainSupplierOption = JSON.parse(res.data.Result)
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
                this.formInline.SupplierID = ''
                let params = {
                    Level:2,
                    MainSupplierID:this.formInline.MainSupplierID
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.formInline.SupplierOption = JSON.parse(res.data.Result)
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
                    ID:this.formInline.ID,
                    OrderID:this.formInline.OrderID,
                    MainSupplierID:this.formInline.MainSupplierID,
                    SupplierID:this.formInline.SupplierID,
                    MemberID:this.formInline.MemberID,
                    IsLinkPay:this.formInline.IsLinkPay,
                    BeginTime:this.formInline.BeginTime,
                    EndTime:this.formInline.EndTime,
                    PageIndex:this.PageIndex,
                    PageSize:this.PageSize
                }
                OrderBackProductListGet(qs.stringify(params)).then((res)=>{
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
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.PageSize = val
                this.getData()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.PageIndex = val
                this.getData()
            },
            reset(){
                this.PageIndex = 1,
                this.PageSize = 10
            },
            checked(row){
                this.row = row
                this.editVisible = true
            },
            affirm(row){
                this.row = row
                this.editVisible2 = true
            },
            onSubmit(){
                let params = {
                    ID:this.row.ID,
                    Audit:this.checkedBox.Audit,
                    AuditRemark:this.checkedBox.AuditRemark
                }
                OrderBackProductCallCenterAudit(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('审核成功')
                        this.editVisible = false
                        this.getData()
                        this.checkedBox.AuditRemark = ''
                        this.checkedBox.Audit = ''
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
            Submit(){
                let params = {
                    ID:this.row.ID,
                    Audit:this.confirm.Audit,
                    AuditRemark:this.confirm.AuditRemark
                }
                OrderBackProductSupplierReceiveAudit(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('已确认收货')
                        this.editVisible2 = false
                        this.getData()
                        this.confirm.AuditRemark = ''
                        this.confirm.Audit = ''
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
            this.getMainSupplier()
            this.getData()
        }
    }
</script>  