<template>
    <div>
        <el-card>
            <el-form :inline="true" :model="formInline" class="demo-form">
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
                <el-form-item label="是否废弃">
                    <el-select v-model="formInline.DelFlag" clearable placeholder="请选择">
                        <el-option label="是" value="Y"></el-option>
                        <el-option label="否" value="N"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="退货状态">
                    <el-select v-model="formInline.State" clearable placeholder="请选择">
                        <el-option label="新建" value="N"></el-option>
                        <el-option label="供应商审核" value="A"></el-option>
                        <el-option label="供应商审核驳回" value="B1"></el-option>
                        <el-option label="供应商已收货" value="R"></el-option>
                        <el-option label="供应商收货审核驳回" value="B2"></el-option>
                        <el-option label="呼叫中心审核" value="A3"></el-option>
                        <el-option label="呼叫中心驳回" value="B3"></el-option>
                        <el-option label="正在退款" value="P1"></el-option>
                        <el-option label="已退款" value="P2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="reset();getData()">提交</el-button>
                    <el-button type="warning" @click="editVisible3 = true">添加售后单</el-button>
                    <el-button type="primary" @click="exportExcel">导出</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData.ModelList" border style="width: 100%" highlight-current-row>
                <el-table-column prop="ID" label="退单号" align="center"></el-table-column>
                <el-table-column prop="DeliveryType" label="出库方式" align="center"></el-table-column>
                <el-table-column prop="OrderState" label="退单状态" align="center"></el-table-column>
                <el-table-column prop="DelFlag" label="是否废弃" align="center">
                    <template slot-scope="scope">
                        {{scope.row.DelFlag == 'Y' ? '是' : '否'}}
                    </template>
                </el-table-column>
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
                <el-table-column prop="CreateTime" label="退货时间" align="center">
                    <template slot-scope="scope">
                        {{scope.row.CreateTime.substring(0,scope.row.CreateTime.length-4)}}
                    </template>
                </el-table-column>
                <el-table-column prop="OrderAmount" label="订单金额" align="center"></el-table-column>
                <el-table-column prop="BackAmount" label="退单金额" align="center"></el-table-column>
                <el-table-column prop="GiftTokenMoeny" label="退优惠券金额" align="center"></el-table-column>
                <el-table-column prop="BackGiftCardMoney" label="退礼品卡金额" align="center"></el-table-column>
                <el-table-column prop="BackPointMoney" label="退积分金额" align="center"></el-table-column>
                <el-table-column prop="BackMoney" label="退钱金额" align="center"></el-table-column>
                <el-table-column prop="DiscountMoney" label="优惠金额" align="center"></el-table-column>

                <el-table-column prop="BackOutStockAddMoeny" label="抵扣多出库增加订单金额" align="center"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" plain @click="checked(scope.row)" v-if="scope.row.OrderState == '新建' && scope.row.DelFlag == 'N'">审核</el-button>
                        <el-button type="primary" icon="el-icon-s-tools" @click="affirm(scope.row)" v-if="scope.row.OrderState == '同意退货'">确认收货</el-button>
                        <el-button type="primary" @click="goPage(scope.row)">详情</el-button>
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
        
        
        <!-- 添加售后单 -->
        <el-dialog :visible.sync="editVisible3" width="65%" :close-on-click-modal="false" class="add">
            <el-form :model="OrderTracking" class="demo-form-inline">
                <el-form-item label="订单查询" class="first" style="width:38vh;font-weight:900" >
                    <div style="display:flex">
                        <el-input v-model="OrderTracking.input" clearable>
                        </el-input><el-button type="primary" @click="search">查询</el-button>
                    </div>
                </el-form-item>
                <el-form-item label="订单详情" class="order">
                    <el-table :data="orderData" border style="width:100%">
                        <el-table-column prop="SupplierName" label="所属门店" align="center"></el-table-column>
                        <el-table-column prop="ID" label="订单号" align="center"></el-table-column>
                        <el-table-column prop="OrderState" label="订单状态" align="center"></el-table-column>
                        <el-table-column prop="ReceiveMan" label="收货人" align="center"></el-table-column>
                        <el-table-column prop="ReceiveMobile" label="收货手机号" align="center"></el-table-column>
                        <el-table-column prop="PlanReceiveTime" label="预计收货时间" align="center"></el-table-column>
                        <el-table-column prop="ReceiverType" label="配送方式" align="center"></el-table-column>
                        <el-table-column prop="PayType" label="支付方式" align="center"></el-table-column>
                        <el-table-column prop="SendFee" label="运费" align="center"></el-table-column>
                        <el-table-column prop="GiftCardAmount" label="礼品卡" align="center"></el-table-column>
                        <el-table-column prop="GiftTokenAmount" label="优惠券" align="center"></el-table-column>
                        <el-table-column prop="PointMoney" label="积分" align="center"></el-table-column>
                        <el-table-column prop="PayMoney" label="支付金额" align="center"></el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item label="商品详情" class="order">
                    <el-table :data="productData" border style="width:100%" highlight-current-row max-height="250">
                        <el-table-column prop="ProductName" label="商品名称" align="center"></el-table-column>
                        <el-table-column prop="ProductID" label="商品编码" align="center"></el-table-column>
                        <el-table-column prop="Qty" label="购买数量" align="center"></el-table-column>
                        <el-table-column prop="UnitName" label="单位" align="center"></el-table-column>
                        <el-table-column prop="MemberPrice" label="单价" align="center"></el-table-column>
                        <el-table-column prop="Amount" label="总价" align="center"></el-table-column>
                        <template v-if="this.OrderTracking.isComplete == 'N'">
                            <el-table-column label="退回数量" width="180" align="center">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.backNum" clearable placeholder="请填写退回数量"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template slot-scope="scope">
                                    <el-button plain type="warning" @click="produced(scope.row)">生成售后单</el-button>
                                </template>
                            </el-table-column>
                        </template>
                    </el-table>
                </el-form-item>
                <el-form-item label="整单售后" v-show="Flag">
                    <el-radio v-model="OrderTracking.isComplete" label="Y">是</el-radio>
                    <el-radio v-model="OrderTracking.isComplete" label="N">否</el-radio>
                </el-form-item>
                <el-form-item label="退货方式" v-show="Flag">
                    <el-radio v-model="OrderTracking.BackProductType" label="S">送回门店</el-radio>
                    <el-radio v-model="OrderTracking.BackProductType" label="R">上门取货</el-radio>
                </el-form-item>
                <el-form-item label="退货原因类型" v-show="Flag">
                    <el-radio v-model="OrderTracking.BackCauseType" label="0">七天无理由退货</el-radio>
                    <el-radio v-model="OrderTracking.BackCauseType" label="1">质量问题</el-radio>
                    <el-radio v-model="OrderTracking.BackCauseType" label="2">别的地方更便宜</el-radio>
                    <el-radio v-model="OrderTracking.BackCauseType" label="3">其他</el-radio>
                </el-form-item>
                <el-form-item label="备注" v-show="Flag" style="width:38vh;displa">
                    <el-input v-model="OrderTracking.MemberRemark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="ensure" v-if="this.OrderTracking.isComplete == 'Y'">确 定</el-button>
                <el-button type="primary" disabled v-if="this.OrderTracking.isComplete == 'N'">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { SupplierListGetByLevel } from '@/api/goodsList';
import { OrderBackProductListGet,OrderBackProductCallCenterAudit,OrderBackProductSupplierReceiveAudit,orderDetail,OrderBackProductAddByOrder,OrderBackProductAdd,OrderBackProductExport } from '@/api/orderList'
import qs from 'qs'
    export default{
        name:'ReturnGoods',
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
                    DelFlag:'',         /* 是否废弃 */
                    State:''
                },
                tableData:[],           /* 列表数据 */
                PageIndex:1,
                PageSize:10,
                editVisible:false,      /* 审核弹出框 */
                editVisible2:false,     /* 确认收货 */
                editVisible3:false,     /* 添加售后单 */
                checkedBox:{
                    AuditRemark:'',      /* 审核备注 */
                    Audit:'',           /* 审核标记 */
                },
                row:[],                 /* 临时数据存放在这 */
                confirm:{
                    Audit:[],           /* R 确认收货 B2 收货失败 */
                    AuditRemark:[]      /* 备注 */
                },
                OrderTracking:{
                    input:'',           /* 订单查询 */
                    BackProductType:'S',     /* 退回的方式 */
                    MemberRemark:'',        /* 备注 */
                    BackCauseType:"3",       /* 退货原因类型 */
                    backNum:'',             /* 退货数量 */
                    isComplete:'N'
                },
                orderData:[],           /* 创建售后单 中 订单详情 */
                productData:[],         /* 商品详情 */
                Flag:false
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
                    ID:this.formInline.ID.replace(/ /g,''),
                    OrderID:this.formInline.OrderID.replace(/ /g,''),
                    MainSupplierID:this.formInline.MainSupplierID,
                    SupplierID:this.formInline.SupplierID,
                    MemberID:this.formInline.MemberID.replace(/ /g,''),
                    IsLinkPay:this.formInline.IsLinkPay,
                    BeginTime:this.formInline.BeginTime,
                    EndTime:this.formInline.EndTime,
                    PageIndex:this.PageIndex,
                    PageSize:this.PageSize,
                    DelFlag:this.formInline.DelFlag,
                    State:this.formInline.State,
                }
                OrderBackProductListGet(qs.stringify(params)).then((res)=>{
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
            },
            goPage(row){
                this.$router.push({
                    path:"/ReturnOrderDetail",
                    query:{
                        ID:row.ID
                    }
                })
            },
            search(){
                this.orderData = []
                let params = {
                    ID:this.OrderTracking.input
                }
                orderDetail(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.orderData.push(JSON.parse(res.data.Result))
                        console.log(res.data.Result)
                        this.productData = JSON.parse(res.data.Result).Detail
                        this.Flag = true
                    }
                    if(res.data.Success == 0){
                        this.OrderTracking.input = ''
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        this.$message(res.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            ensure(){               /* 整单退 的确定按钮 */
                let params = {
                    OrderID:this.OrderTracking.input,
                    BackCauseType:this.OrderTracking.BackCauseType,
                    BackProductType:this.OrderTracking.BackProductType,
                    MemberRemark:this.OrderTracking.MemberRemark
                }  
                OrderBackProductAddByOrder(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('提交成功')
                        this.editVisible3 = false
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
            produced(row){          /* 单条退 */
                let params = {
                    OrderDetailID:row.ID,
                    OrderID:this.OrderTracking.input,
                    Qty:row.backNum,
                    BackCauseType:this.OrderTracking.BackCauseType,
                    BackProductType:this.OrderTracking.BackProductType,
                    MemberRemark:this.OrderTracking.MemberRemark
                }/*  */
                OrderBackProductAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                            this.$message.success('提交成功')
                            this.search()
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
            exportExcel(){
                let params = {
                    ID:this.formInline.ID.replace(/ /g,''),
                    OrderID:this.formInline.OrderID.replace(/ /g,''),
                    MainSupplierID:this.formInline.MainSupplierID,
                    SupplierID:this.formInline.SupplierID,
                    MemberID:this.formInline.MemberID.replace(/ /g,''),
                    IsLinkPay:this.formInline.IsLinkPay,
                    BeginTime:this.formInline.BeginTime,
                    EndTime:this.formInline.EndTime,
                    DelFlag:this.formInline.DelFlag,
                    State:this.formInline.State,
                }
                OrderBackProductExport(qs.stringify(params)).then((res)=>{
                    var blob = new Blob([res.data]); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
                    var contentDisposition = res.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
                    var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
                    var result = patt.exec(contentDisposition);
                    console.log(result)
                    var filename = result[1];
                    if (window.navigator.msSaveOrOpenBlob) {
                        //兼容ie
                        navigator.msSaveBlob(blob, filename);
                    } else {
                        var downloadElement = document.createElement("a");
                        var href = window.URL.createObjectURL(blob); //创建下载的链接
                        var reg = /^["](.*)["]$/g;
                        downloadElement.style.display = "none";
                        downloadElement.href = href;
                        downloadElement.download = decodeURI(filename.replace(reg, "$1")); //下载后文件名
                        document.body.appendChild(downloadElement);
                        downloadElement.click(); //点击下载
                        document.body.removeChild(downloadElement); //下载完成移除元素
                        window.URL.revokeObjectURL(href); //释放掉blob对象
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
<style lang="scss" scoped>
    .demo-form-inline{
        .order{
            width: 100%!important;
            overflow: auto!important;
        }
    }
    .add{
        .el-dialog{
            margin-top:1vh!important;
            margin-bottom: 0!important;
            .el-dialog__body{
                .el-form{
                    .el-form-item{
                        .el-form-item__label{
                            font-weight: 900!important
                        }
                        .el-form-item__content{
                            div{
                                .el-table__body-wrapper{
                                    height:auto!important
                                }
                            }
                        }
                    }
                }
            }
            .el-dialog__footer{
                text-align: center!important;
                font-size:16px!important
            }
        }
    }
</style>