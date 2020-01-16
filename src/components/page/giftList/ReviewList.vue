<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-ticket"></i> 礼品卡审核列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="活动ID">
                    <el-input v-model="formInline.ID" placeholder="活动ID" clearable></el-input>
                </el-form-item>
                <el-form-item label="礼品卡活动名称">
                    <el-input v-model="formInline.GiftCardGiveOutName" placeholder="礼品卡活动名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="审核状态">
                    <el-select v-model="formInline.Audit" placeholder="审核状态" clearable>
                        <el-option label="新建" value="N"></el-option>
                        <el-option label="审核完成" value="O"></el-option>
                        <el-option label="驳回审核" value="B"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" clearable>
                    <el-date-picker
                        v-model="formInline.BeginTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="开始时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" clearable>
                    <el-date-picker
                        v-model="formInline.EndTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="reset();getData()">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData.ModelList" border style="width: 100%">
                <el-table-column prop="ID" label="礼品卡审核活动ID" align="center"></el-table-column>
                <el-table-column prop="GiftCardName" label="礼品卡名称" align="center"></el-table-column>
                <el-table-column prop="Amount" label=" 礼品卡金额" align="center"></el-table-column>
                <el-table-column prop="Audit" label=" 审核状态" align="center">
                    <template slot-scope="scope">
                        {{scope.row.Audit == 'N'?'新建':(scope.row.Audit == 'O'?'审核完成':(scope.row.Audit == 'B'?'驳回审核':(scope.row.Audit == 'T'?'停止':'')))}}
                    </template>
                </el-table-column>
                <el-table-column prop="DelFlag" label=" 是否已废弃" align="center">
                    <template slot-scope="scope">
                        {{scope.row.DelFlag == 'N'?"否":'是'}}
                    </template>
                </el-table-column>
                <el-table-column prop="CreateTime" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="BeginTime" label="开始使用时间" align="center"></el-table-column>
                <el-table-column prop="EndTime" label=" 结束使用时间" align="center"></el-table-column>
                <el-table-column prop="AuditMan" label=" 审核人" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" v-if="scope.row.Audit == 'N'" @click="showCheck(scope.row)">审核</el-button>
                        <el-button type="danger" v-if="scope.row.DelFlag == 'N'" @click="showDelFlag(scope.row)">废弃</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-if="tableData.length != 0"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="PageNo"
                :page-size="PageSize"
                align="right"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData._totalcount">
            </el-pagination>
        </el-card>

        <!-- 审核 -->
        <el-dialog title="审核" :visible.sync="editVisible" width="50%" :close-on-click-modal="false">
            <el-form :inline="true" :model="checked" class="demo-form-inline">
                <el-form-item label="审核状态">
                    <el-select v-model="checked.Audit" clearable>
                        <el-option label="审核完成" value="O"></el-option>
                        <el-option label="驳回审核" value="B"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="checkGift">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <span>确认废弃该礼品卡？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="checkDelFlag">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { GiftCardGiveOutListGetFromCondition,MemberGiftCardGiveOutMasterUpdate,GiftCardGiveOutMasterDelete } from '@/api/giftList'
import qs from 'qs'
    name:'ReviewList'
    export default{
        data(){
            return{
                formInline:{
                    ID:'',
                    GiftCardGiveOutName:'',
                    Audit:'',
                    BeginTime:'',
                    EndTime:''
                },
                PageNo:1,
                PageSize:10,
                tableData:[],
                editVisible:false,          /* 审核 */
                checked:{                   /* 审核弹出框value */
                    ID:'',
                    Audit:'',                   /* 审核状态 */
                },                 
                DelFlag:{                   /* 废弃弹出框value */
                    ID:''
                },
                dialogVisible:false,        /* 确认废弃 */
            }
        },
        methods:{
            getData(){
                let params = {
                    ID:this.formInline.ID,
                    GiftCardGiveOutName:this.formInline.GiftCardGiveOutName,
                    Audit:this.formInline.Audit,
                    BeginTime:this.formInline.BeginTime,
                    EndTime:this.formInline.EndTime,
                    PageNo:this.PageNo,
                    PageSize:this.PageSize
                }
                GiftCardGiveOutListGetFromCondition(qs.stringify(params)).then((res)=>{
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
            reset(){
                this.PageSize = 10,
                this.PageNo = 1
            },
            showCheck(row){
                console.log(row)
                this.checked.id = row.ID
                this.editVisible = true
            },
            showDelFlag(row){
                console(row)
                this.DelFlag.ID = row.ID
                this.dialogVisible = true
            },
            checkGift(){                /* 审核 */
                let params = {
                    ID:this.checked.ID,
                    Audit:this.checked.Audit
                }
                MemberGiftCardGiveOutMasterUpdate(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.editVisible = false
                        this.getData()
                        this.checked.id = ''
                        this.checked.Audit = ''
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
            checkDelFlag(){                     /* 废弃 */
                let params = {
                    ID:this.DelFlag.ID,
                }
                GiftCardGiveOutMasterDelete(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.dialogVisible = false
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
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.PageSize = val
                this.getData()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.PageNo = val
                this.getData()
            }
        },
        created(){
            this.getData()
        }
    }
</script>  