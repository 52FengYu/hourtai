<template>
    <div>
        <el-card>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="活动号">
                    <el-input v-model="formInline.ID" placeholder="活动号" clearable></el-input>
                </el-form-item>
                <el-form-item label="主供应商号">
                    <el-select v-model="formInline.MainSupplierID" placeholder="主供应商" clearable filterable @change="getSupplier">
                        <el-option
                        v-for="item in formInline.option1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="供应商号">
                    <el-select v-model="formInline.SupplierID" placeholder="供应商" clearable filterable>
                        <el-option
                        v-for="item in formInline.option2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动类型">
                    <el-select v-model="formInline.PromotinoType" clearable placeholder="请选择">
                        <el-option
                        v-for="item in formInline.activeType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="促销活动状态">
                    <el-select v-model="formInline.State" clearable placeholder="请选择">
                        <el-option
                        v-for="item in formInline.activeState"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="起止时间">
                    <el-date-picker
                        v-model="formInline.BeginTime"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="开始时间"
                        @change="updateDateStart">
                    </el-date-picker>至
                    <el-date-picker
                        v-model="formInline.EndTime"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="结束时间"
                        @change="updateDateEnd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getData">查询</el-button>
                    <el-button type="primary" @click="editVisible = true">添加活动</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData.ModelList" border style="width: 100%">
                <el-table-column prop="ID" label="活动编号" align="center"></el-table-column>
                <el-table-column prop="PromotionName" label="活动名称" align="center"></el-table-column>
                <el-table-column prop="PromotionShortName" label="活动简称" align="center"></el-table-column>
                <el-table-column prop="PromotionState" label="活动状态" align="center">
                   <template slot-scope="scope">  
                        {{scope.row.PromotionState === 'N' ? '新建' : (scope.row.PromotionState === 'O' ? '审核通过' : (scope.row.PromotionState === 'B' ? '驳回' : '停止'))}}
                    </template>
                </el-table-column>
                <el-table-column prop="PromotionType" label="活动类型" align="center">
                    <template slot-scope="scope">  
                        {{scope.row.PromotionType === 'CP' ? '降价类活动' : (scope.row.PromotionType === 'MZ' ? '满折活动' : '满赠活动')}}
                    </template>
                </el-table-column>
                <el-table-column prop="MainSupplierID" label="主供应商号" align="center"></el-table-column>
                <el-table-column prop="MainSupplierName" label="主供应商名称" align="center"></el-table-column>
                <el-table-column prop="SupplierID" label="供应号" align="center"></el-table-column>
                <el-table-column prop="SupplierName" label="供应商名称" align="center"></el-table-column>
                <el-table-column prop="AuditMan" label="审核人" align="center"></el-table-column>
                <el-table-column prop="AuditTime" label="审核时间" align="center"></el-table-column>
                <el-table-column prop="BeginTime" label="活动开始时间" align="center"></el-table-column>
                <el-table-column prop="CreateManID" label="创建人" align="center"></el-table-column>
                <el-table-column prop="CreateTime" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="DelFlag" label="是否废弃" align="center">
                    <template slot-scope="scope">  
                        {{scope.row.DelFlag === 'N' ? '否' : '是'}}
                    </template>
                </el-table-column>
                <el-table-column prop="EndTime" label="活动结束时间" align="center"></el-table-column>
                <el-table-column prop="IsMastNewMember" label="是否只能新会员参与" align="center">
                    <template slot-scope="scope">  
                        {{scope.row.IsMastNewMember == 'N' ? '否' : '是'}}
                    </template>
                </el-table-column>
                <el-table-column prop="LastUpdateManID" label="最后修改人" align="center"></el-table-column>
                <el-table-column prop="LastUpdateTime" label="最后修改时间" align="center"></el-table-column>
                <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button @click="reductionDetail(scope.row)" type="text" size="small" v-if="scope.row.PromotionType === 'CP'">详情</el-button>        <!-- 降价-详情 -->
                    <el-button @click="foldDetail(scope.row)" type="text" size="small" v-if="scope.row.PromotionType === 'MZ'">详情</el-button>         <!-- 满折-详情 -->
                    <el-button @click="giftDetail(scope.row)" type="text" size="small" v-if="scope.row.PromotionType === 'MG'">详情</el-button>         <!-- 满赠-详情 -->
                    <el-button @click="check(scope.row)" type="text" size="small" v-if="scope.row.PromotionState === 'N'">审核</el-button>      <!-- 审核 -->
                    <el-button @click="stop(scope.row)" type="text" size="small" v-if="scope.row.PromotionState === 'O'">停止</el-button>      <!-- 停止 -->
                    <el-button @click="handle(scope.row);editVisible2 = true" type="text" size="small" v-if="scope.row.PromotionType === 'CP' && scope.row.PromotionState === 'N'">添加</el-button>      <!-- 降价-添加 -->
                    <el-button @click="handle(scope.row);editVisible3 = true" type="text" size="small" v-if="scope.row.PromotionType === 'MZ' && scope.row.PromotionState === 'N'">添加</el-button>         <!-- 满折-添加 -->
                    <el-button @click="handle(scope.row);editVisible4 = true" type="text" size="small" v-if="scope.row.PromotionType === 'MG' && scope.row.PromotionState === 'N'">添加</el-button>         <!-- 满赠-添加 -->
                </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page= "currentPage4"
                :page-size= this.PageSize
                layout="total, sizes, prev, pager, next, jumper"
                align="right"
                :total= this.tableData.TotalCount>
            </el-pagination>
        </el-card>
        
            <!-- 添加活动弹出框 -->
            <el-dialog title="添加活动" :visible.sync="editVisible" width="40%"  :close-on-click-modal="false">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="活动名称">
                        <el-input v-model="form.PromotionName"></el-input>
                    </el-form-item>
                    <el-form-item label="活动简称">
                        <el-input v-model="form.PromotionShortName"></el-input>
                    </el-form-item>
                    <el-form-item label="必须为新会员">
                        <el-radio v-model="form.IsMasterNewMember" label="Y">是</el-radio>
                        <el-radio v-model="form.IsMasterNewMember" label="N">否</el-radio>
                    </el-form-item>
                    <el-form-item label="主供应商号">
                        <el-select v-model="form.MainSupplierID" placeholder="主供应商" clearable filterable @change="getSupplierList">
                            <el-option
                            v-for="item in formInline.option1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="供应商号">
                        <el-select v-model="form.SupplierID" placeholder="供应商" clearable filterable >
                            <el-option
                            v-for="item in formInline.option2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动类型">
                        <el-select v-model="form.PromotinoType" clearable placeholder="请选择">
                            <el-option
                            v-for="item in formInline.activeType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动起止时间">
                        <el-date-picker
                        v-model="form.PromotionBeginTime"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="开始时间"
                        @change="updateDateStart">
                    </el-date-picker>至
                    <el-date-picker
                        v-model="form.PromotionEndTime"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="结束时间"
                        @change="updateDateEnd">
                    </el-date-picker>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onSubmit">确 定</el-button>
                </span>
            </el-dialog>
            
            <!-- 添加促销降价活动弹出框 -->
            <el-dialog title="促销降价活动添加" :visible.sync="editVisible2" width="40%" :close-on-click-modal="false">
                <el-form ref="form" :model="Markdown" label-width="180px">
                    <el-form-item label="活动号">
                        <el-input v-model="this.ID" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="显示库存">
                        <el-input v-model="Markdown.DisplayStock"></el-input>
                    </el-form-item>
                    <el-form-item label="在加入购物车时自动参加">
                        <el-radio v-model="Markdown.IsAutoUse" label="Y">是</el-radio>
                        <el-radio v-model="Markdown.IsAutoUse" label="N">否</el-radio>
                    </el-form-item>
                    <el-form-item label="当天最大数量">
                        <el-radio v-model="Markdown.IsDayMaxQty" label="Y">是</el-radio>
                        <el-radio v-model="Markdown.IsDayMaxQty" label="N">否</el-radio>
                    </el-form-item>
                    <el-form-item label="最大购买数量">
                        <el-input v-model="Markdown.MaxQty"></el-input>
                    </el-form-item>
                    <el-form-item label="商品编码">
                        <el-input v-model="Markdown.ProductID"></el-input>
                    </el-form-item>
                    <el-form-item label="活动价格">
                        <el-input v-model="Markdown.PromotionPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="库存">
                        <el-input v-model="Markdown.Stock"></el-input>
                    </el-form-item>
                    <el-form-item label="最小购买数量">
                        <el-input v-model="Markdown.MinQty"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="save">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 添加满折活动弹出框 -->
            <el-dialog title="满折活动添加" :visible.sync="editVisible3" width="40%" :close-on-click-modal="false">
                <el-form ref="form" :model="fullFold" label-width="180px">
                    <el-form-item label="活动号">
                        <el-input v-model="this.ID" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="活动名称">
                        <el-input v-model="fullFold.PromotionName"></el-input>
                    </el-form-item>
                    <el-form-item label="折扣">
                        <el-input v-model="fullFold.PromotionDiscount"></el-input>
                    </el-form-item>
                    <el-form-item label="最大库存">
                        <el-input v-model="fullFold.MaxStock"></el-input>
                        <i>-1 为不限制</i>
                    </el-form-item>
                    <el-form-item label="满足金额">
                        <el-input v-model="fullFold.UseAmount"></el-input>
                    </el-form-item>

                    <el-form-item label="活动参与范围">
                        <el-select v-model="fullFold.UseType" clearable placeholder="请选择">
                            <el-option value="A" label="全场"></el-option>
                            <el-option value="C1" label="一级品类"></el-option>
                            <el-option value="C2" label="二级品类"></el-option>
                            <el-option value="C3" label="三级品类"></el-option>
                            <el-option value="B" label="品类"></el-option>
                            <el-option value="P" label="单品"></el-option>
                        </el-select>
                        <i>满足后可给赠品</i>
                    </el-form-item>
                    <el-form-item label="使用范围">
                        <el-input v-model="fullFold.UseRange"></el-input>
                        <i> 不同ID之间用竖线隔开</i>
                    </el-form-item>
                    <el-form-item label="参与范围黑名单类型">
                        <el-select v-model="fullFold.UseBlackType" clearable placeholder="请选择">
                            <el-option value="C1" label="一级品类"></el-option>
                            <el-option value="C2" label="二级品类"></el-option>
                            <el-option value="C3" label="三级品类"></el-option>
                            <el-option value="B" label="品类"></el-option>
                            <el-option value="P" label="单品"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用黑名单">
                        <el-input v-model="fullFold.UseBlackRange"></el-input>
                        <i> 不同ID之间用竖线隔开</i>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible3 = false">取 消</el-button>
                    <el-button type="primary" @click="addFullFold">确 定</el-button>
                </span>
            </el-dialog>
            
            <!-- 添加满赠活动弹出框 -->
            <el-dialog title="满赠活动添加" :visible.sync="editVisible4" width="37%" :close-on-click-modal="false">
                <el-form ref="form" :model="addgift" label-width="180px">
                    <el-form-item label="活动号">
                        <el-input v-model="this.ID" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="活动名称">
                        <el-input v-model="addgift.PromotionName"></el-input>
                    </el-form-item>
                    <el-form-item label="整个活动只能参加一次">
                        <el-radio v-model="addgift.IsAllOne" label="Y">是</el-radio>
                        <el-radio v-model="addgift.IsAllOne" label="N">否</el-radio>
                    </el-form-item>
                    <el-form-item label="全天只能参加一次">
                        <el-radio v-model="addgift.IsDayOne" label="Y">是</el-radio>
                        <el-radio v-model="addgift.IsDayOne" label="N">否</el-radio>
                    </el-form-item>
                    <el-form-item label="最大活动数量">
                        <el-input v-model="addgift.MaxStock"></el-input>
                        <i>-1 为不限制</i>
                    </el-form-item>
                    <el-form-item label="满足金额">
                        <el-input v-model="addgift.UseAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="活动参与范围">
                        <el-select v-model="addgift.UseType" clearable placeholder="请选择">
                            <el-option value="A" label="全场"></el-option>
                            <el-option value="C1" label="一级品类"></el-option>
                            <el-option value="C2" label="二级品类"></el-option>
                            <el-option value="C3" label="三级品类"></el-option>
                            <el-option value="B" label="品类"></el-option>
                            <el-option value="P" label="单品"></el-option>
                        </el-select>
                        <i>满足后可给赠品</i>
                    </el-form-item>
                    <el-form-item label="使用范围">
                        <el-input v-model="addgift.UseRange"></el-input>
                        <i> 不同ID之间用竖线隔开</i>
                    </el-form-item>
                    <el-form-item label="参与范围黑名单类型">
                        <el-select v-model="addgift.UseBlackType" clearable placeholder="请选择">
                            <el-option value="C1" label="一级品类"></el-option>
                            <el-option value="C2" label="二级品类"></el-option>
                            <el-option value="C3" label="三级品类"></el-option>
                            <el-option value="B" label="品类"></el-option>
                            <el-option value="P" label="单品"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="黑名单 ">
                        <el-input v-model="addgift.UseBlackRange"></el-input>
                        <i> 不同ID之间用竖线分割</i>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible4 = false">取 消</el-button>
                    <el-button type="primary" @click="fullGift">确 定</el-button>
                </span>
            </el-dialog>
            
            <!-- 审核弹出框 -->
            <el-dialog title="活动审核" :visible.sync="editVisible5" width="40%" :close-on-click-modal="false">
                <el-form ref="form" :model="AuditState" label-width="80px">
                    <el-form-item label="审核结果">
                        <el-radio v-model="AuditState.Audit" label="O">通过</el-radio>
                        <el-radio v-model="AuditState.Audit" label="B">驳回</el-radio>
                    </el-form-item>
                    <el-form-item label="审核备注">
                        <el-input v-model="AuditState.AuditRemark"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible5 = false">取 消</el-button>
                    <el-button type="primary" @click="AuditChecked">确 定</el-button>
                </span>
            </el-dialog>
            
            <!-- 删除弹出框 -->
            <el-dialog title="活动审核" :visible.sync="editVisible6" width="20%" :close-on-click-modal="false">
                <span>是否确认停止该活动</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible6 = false">否</el-button>
                    <el-button type="primary" @click="delChecked">是</el-button>
                </span>
            </el-dialog>
    </div>
</template>
<script>
import { PromotionListGet,PromotionAdd,PromotionProductAdd,PromotionProductUpdate,PromotionProductDiscountAdd,PromotionProductDiscountUpdate,PromotionGiftAdd,MemberGiftTokenGiveOutMasterAudit,PromotiomStop,PromotionAudit } from '@/api/activeList'
import { SupplierListGetByLevel } from "@/api/goodsList"
import qs from 'qs'
export default{
        data(){
            return{
                formInline: {                   /* form输入框的value */
                    ID:'',                              /* 活动号 */
                    MainSupplierID:'',                  /* 一级供应商号 */   
                    SupplierID:"",                         /* 供应商号 */
                    PromotinoType:'',                      /* 活动类型 */     
                    State:'',                              /* 促销活动状态 */   
                    BeginTime:'',                           /* 添加开始时间 */ 
                    EndTime:'',                             /* 添加结束时间 */
                    option1:[],
                    option2:[],
                    activeType:[                        /* 活动类型 */
                        {
                            value: 'CP',
                            label: '降价类活动'
                        }, 
                        {
                            value: 'MZ',
                            label: '满折活动'
                        },
                        {
                            value:'MG',
                            label:'满赠活动'
                        }
                    ],
                    activeState:[                        /* 活动类型 */
                        {
                            value: 'N',
                            label: '新建'
                        }, 
                        {
                            value: 'O',
                            label: '通过审核'
                        },
                        {
                            value:'B',
                            label:'审核驳回'
                        },
                        {
                            value:'S',
                            label:'停止'
                        }
                    ]
                },
                tableData:[],                   /* 列表的数据都放在这里 */
                PageSize:10,
                currentPage4:1,
                editVisible:false,              /* 添加活动 */
                editVisible2:false,             /* 降价促销活动添加 */
                editVisible3:false,             /* 满折活动修改 */
                editVisible4:false,             /* 满赠活动添加 */
                editVisible5:false,             /* 审核 */
                editVisible6:false,             /* 删除 */
                form:{                          /* 添加活动 */
                    PromotionName:'',
                    PromotionShortName:'',
                    IsMasterNewMember:'',
                    MainSupplierID:'',
                    SupplierID:'',
                    PromotinoType:'',
                    PromotionBeginTime:'',
                    PromotionEndTime:'',
                    option1:[],
                    option2:[]
                },
                Markdown:{                          /* 降价促销活动添加 */
                    PromotionID:'',
                    DisplayStock:'',
                    IsAutoUse:'',
                    IsDayMaxQty:'',
                    MaxQty:'',
                    ProductID:'',
                    PromotionPrice:'',
                    Stock:'',
                    MinQty:''
                },
                ID:'',
                fullFold:{
                    MaxStock:'',
                    UseAmount:'',
                    UseBlackRange:'',
                    UseBlackType:'',
                    UseRange:'',
                    UseType:'',
                    PromotionName:'',
                    PromotionDiscount:'',
                    PromotionID:''
                },
                addgift:{
                    PromotionID:'',
                    PromotionName:'',
                    IsAllOne:'',
                    IsDayOne:'',
                    MaxStock:'',
                    UseAmountv:'',
                    UseBlackRange:'',
                    UseBlackType:'',
                    UseRange:'',
                    UseType:''
                },
                AuditState:{
                    ID:'',                      /* 活动编号 */
                    Audit:'',                   /* 审核状态 */
                    AuditRemark:''              /* 审核备注 */
                }
            }
        },
        methods:{
            getData(){
                let params = {
                    ID:this.formInline.ID,
                    MainSupplierID:this.formInline.MainSupplierID,
                    SupplierID:this.formInline.SupplierID,
                    PromotinoType:this.formInline.PromotinoType,
                    State:this.formInline.State,
                    BeginTime:this.formInline.BeginTime,
                    EndTime:this.formInline.EndTime,
                    PageIndex:this.currentPage4,
                    PageSize:this.PageSize
                }
                PromotionListGet(qs.stringify(params)).then((res)=>{
                    console.log(res.data)
                    if(res.data.Success == 1){
                        console.log("数据请求成功")
                        console.log(JSON.parse(res.data.Result))
                        this.tableData = JSON.parse(res.data.Result)
                    }
                    if(res.data.Success == 0){
                        console.log("数据请求失败，请重试")
                        console.log(res.data.Result)
                        this.$message(res.data.Result)
                    }
                    if(res.data.Success == -998){
                        console.log("请求错误")
                    }
                }).catch(function(e){
                    console.log(e)
                    console.log('出错了')
                })
            },
            onSubmit() {                                                        /* 添加活动 */
                let params = {
                    MainSupplierID:this.form.MainSupplierID,
                    SupplierID:this.form.SupplierID,
                    PromotinoType:this.form.PromotinoType,
                    PromotionBeginTime:this.form.PromotionBeginTime,
                    PromotionEndTime:this.form.PromotionEndTime,
                    PromotionName:this.form.PromotionName,
                    PromotionShortName:this.form.PromotionShortName,
                    IsMasterNewMember:this.form.IsMasterNewMember,
                }
                PromotionAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('活动新建成功')
                        this.editVisible = false
                        this.form.MainSupplierID = '',
                        this.form.SupplierID = '',
                        this.form.PromotinoType = '',
                        this.form.PromotionBeginTime = '',
                        this.form.PromotionEndTime = '',
                        this.form.PromotionName = '',
                        this.form.PromotionShortName = '',
                        this.form.IsMasterNewMember = '',
                        this.getData()
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                        this.form.MainSupplierID = '',
                        this.form.SupplierID = '',
                        this.form.PromotinoType = '',
                        this.form.PromotionBeginTime = '',
                        this.form.PromotionEndTime = '',
                        this.form.PromotionName = '',
                        this.form.PromotionShortName = '',
                        this.form.IsMasterNewMember = ''
                    }
                    if(res.data.Success == -998){
                        this.$message(res.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            save(){                                                         /* 新建降价促销活动 */
                let params = {
                    PromotionID:this.ID,
                    DisplayStock:this.Markdown.DisplayStock,
                    IsAutoUse:this.Markdown.IsAutoUse,
                    IsDayMaxQty:this.Markdown.IsDayMaxQty,
                    MaxQty:this.Markdown.MaxQty,
                    ProductID:this.Markdown.ProductID,
                    PromotionPrice:this.Markdown.PromotionPrice,
                    Stock:this.Markdown.Stock,
                    MinQty:this.Markdown.MinQty
                }
                PromotionProductAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('降价促销活动新建成功')
                        this.editVisible2 = false
                        this.Markdown.PromotionID = '',
                        this.Markdown.DisplayStock = '',
                        this.Markdown.IsAutoUse = '',
                        this.Markdown.IsDayMaxQty = '',
                        this.Markdown.MaxQty = '',
                        this.Markdown.ProductID = '',
                        this.Markdown.PromotionPrice = '',
                        this.Markdown.Stock = '',
                        this.Markdown.MinQty = ''
                    }
                    if(res.data.Success == 0){
                        this.$message(res.data.Result)
                        this.Markdown.PromotionID = '',
                        this.Markdown.DisplayStock = '',
                        this.Markdown.IsAutoUse = '',
                        this.Markdown.IsDayMaxQty = '',
                        this.Markdown.MaxQty = '',
                        this.Markdown.ProductID = '',
                        this.Markdown.PromotionPrice = '',
                        this.Markdown.Stock = '',
                        this.Markdown.MinQty = ''
                    }
                    if(res.data.Success == -998){
                        this.$message(res.data.Result)
                    }
                }).catch(function(e){
                    console.log(e)
                })
            },
            getMainSupplier(){
                let params = {
                    Level:1
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.formInline.option1 = JSON.parse(res.data.Result)
                        this.form.option1 = JSON.parse(res.data.Result)
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
                this.formInline.SupplierID = ""
                let params = {
                    Level:2,
                    MainSupplierID:this.formInline.MainSupplierID
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.formInline.option2 = JSON.parse(res.data.Result)
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
            getSupplierList(){
                this.formInline.option2 = ''
                this.form.SupplierID = ""
                let params = {
                    Level:2,
                    MainSupplierID:this.form.MainSupplierID
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.formInline.option2 = JSON.parse(res.data.Result)
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
            updateDateStart(val) {
                console.log("val:" + val)
                this.formInline.timeStart = val + " 00:00:00"
                this.form.PromotionBeginTime = val + " 00:00:00"
            },
            updateDateEnd(val) {
                console.log("val:" + val)
                this.formInline.timeEnd = val + " 00:00:00"
                this.form.PromotionEndTime = val + " 00:00:00"
            },
            handleSizeChange(val) {             /* 分页用 */
                this.PageSize = val
                // console.log(`每页 ${val} 条`);
                this.getData()
            },
            handleCurrentChange(val) {              /* 分页用 */
                // console.log(`当前页: ${val}`);
                this.currentPage4 = val;
                this.getData()
            },
            addFullFold(){                          /* 满折活动添加 */
                let params = {
                    MaxStock:this.fullFold.MaxStock,
                    UseAmount:this.fullFold.UseAmount,
                    UseBlackRange:this.fullFold.UseBlackRange,
                    UseBlackType:this.fullFold.UseBlackType,
                    UseRange:this.fullFold.UseRange,
                    UseType:this.fullFold.UseType,
                    PromotionName:this.fullFold.PromotionName,
                    PromotionDiscount:this.fullFold.PromotionDiscount,
                    PromotionID:this.fullFold.PromotionID,
                    PromotionID:this.ID
                }
                PromotionProductDiscountAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('满折活动添加成功')
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
            fullGift(){                         /* 满赠活动添加 */
                let params = {
                    PromotionID:this.ID,
                    PromotionName:this.addgift.PromotionName,
                    IsAllOne:this.addgift.IsAllOne,
                    IsDayOne:this.addgift.IsDayOne,
                    MaxStock:this.addgift.MaxStock,
                    UseAmount:this.addgift.UseAmount,
                    UseBlackRange:this.addgift.UseBlackRange,
                    UseBlackType:this.addgift.UseBlackType,
                    UseRange:this.addgift.UseRange,
                    UseType:this.addgift.UseType
                }
                PromotionGiftAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('满折活动添加成功')
                        this.editVisible4 = false
                        this.getData()
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
                this.ID = row.ID
                console.log(this.ID)
            },
            reductionDetail(row){                      /* 降价活动详情 */
                this.$router.push({
                    path:'/Markdown',
                    query:{
                        ID:row.ID,
                        PromotionState:row.PromotionState
                    }
                })
            },
            foldDetail(row){                           /* 满折活动详情 */
                this.$router.push({
                    path:'/fullFold',
                    query:{
                        ID:row.ID,
                        PromotionState:row.PromotionState
                    }
                })
            },
            giftDetail(row){                           /* 满赠活动详情 */
                this.$router.push({
                    path:'/fullGift',
                    query:{
                        ID:row.ID,
                        PromotionState:row.PromotionState,
                    }
                })
            },
            check(row){
                this.AuditState.ID = row.ID
                this.editVisible5 = true
                this.AuditState.Audit = '',
                this.AuditState.AuditRemark = ''
            },
            AuditChecked(){
                let params = {
                    ID:this.AuditState.ID,
                    Audit:this.AuditState.Audit,
                    AuditRemark:this.AuditState.AuditRemark
                }
                PromotionAudit(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.editVisible5 = false
                        this.$message.success('审核成功')
                        this.AuditState.ID = ''
                        this.AuditState.Audit = ''
                        this.AuditState.AuditRemark = ''
                        this.getData()
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
            stop(row){
                console.log(row)
                this.AuditState.ID = row.ID
                this.editVisible6 = true
            },
            delChecked(){
                let params = {
                    ID:this.AuditState.ID,
                }
                PromotiomStop(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.editVisible6 = false
                        this.$message.success('已停止活动')
                        this.getData()
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
            this.getMainSupplier()
        }
    }
</script>
<style lang="scss">

</style>