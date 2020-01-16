<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-unfold"></i> 组合分享</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="分享ID">
                    <el-input v-model="formInline.ID" placeholder="分享ID" clearable></el-input>
                </el-form-item>
                <el-form-item label="是否废弃">
                    <el-select v-model="formInline.DelFlag" placeholder="是否废弃" clearable>
                        <el-option label="是" value="Y"></el-option>
                        <el-option label="否" value="N"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="添加分享开始时间">
                    <el-date-picker
                        v-model="formInline.CreateBeginTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="开始时间"
                        clearable>
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="添加分享结束时间">
                    <el-date-picker
                        v-model="formInline.CreateEndTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="结束时间"
                        clearable>
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getData">查询</el-button>
                    <el-button type="primary" @click="editVisible = true">添加活动</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData.ModelList" border style="width: 100%" highlight-current-row>
                <el-table-column prop="ID" label="分享ID" align="center"></el-table-column>
                <el-table-column prop="Key" label="分享Key" align="center"></el-table-column>
                <el-table-column prop="DelFlag" label="是否废弃" align="center">
                    <template slot-scope="scope">
                        {{scope.row.DelFlag == 'N' ? '否':'是'}}
                    </template>
                </el-table-column>
                <el-table-column prop="CreateTime" label="添加分享时间" align="center"></el-table-column>
                <el-table-column prop="BeginTime" label="开始分享时间" align="center"></el-table-column>
                <el-table-column prop="EndTime" label="结束分享时间" align="center"></el-table-column>
                <el-table-column prop="Remark" label="备注" align="center"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="goPage(scope.row)">详情</el-button>
                        <el-button type="primary" plain @click="change(scope.row)">修改</el-button>
                        <el-button type="danger" v-if="scope.row.DelFlag == 'N'" @click="open(scope.row)">废弃</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="this.PageIndex"
                :page-size="this.PageSize"
                align="right"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.tableData.TotalCount">
            </el-pagination>
        </el-card>
        
        <!-- 组合分享活动添加 -->
        <el-dialog title="活动添加" :visible.sync="editVisible" width="50%" :close-on-click-modal="false">
            <el-form :model="AddAction" class="demo-form-inline">
                <el-form-item label="开始时间">
                    <el-date-picker
                        v-model="AddAction.BeginTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="开始时间"
                        clearable>
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                        v-model="AddAction.EndTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="结束时间"
                        clearable>
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input placeholder="请输入内容" v-model="AddAction.Remark" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="AddDoubleActive">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 组合分享活动修改 -->
        <el-dialog title="活动修改" :visible.sync="editVisible2" width="50%" :close-on-click-modal="false">
            <el-form :model="row" class="demo-form-inline">
                <el-form-item label="开始时间">
                    <el-date-picker
                        v-model="row.BeginTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="开始时间"
                        clearable>
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                        v-model="row.EndTime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="结束时间"
                        clearable>
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input placeholder="请输入内容" v-model="row.Remark" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="ChangeDoubleActive">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>    
<script>
    import { ProductGrpShareListGet,ProductGrpShareAdd,ProductGrpShareUpdate,ProductGrpShareDelete } from  '@/api/goodsList'
    import qs from 'qs'
    name:'Promotion'
    export default{
        data(){
            return{
                formInline:{
                    CreateBeginTime:'',
                    CreateEndTime:'',
                    ID:'',
                    DelFlag:'',
                },
                tableData:[],
                PageIndex:1,
                PageSize:10,
                AddAction:{     /* 添加分享活动 */
                    BeginTime:'',
                    EndTime:'',
                    Remark:'',
                },
                editVisible:false,      /* 添加 */
                editVisible2:false,     /* 修改 */
                ChangeAction:{
                    BeginTime:'',
                    EndTime:'',
                    Remark:'',
                    ID:''
                },
                row:[]
            }
        },
        methods:{
            getData(){
                let params = {
                    CreateBeginTime:this.formInline.CreateBeginTime ?  this.formInline.CreateBeginTime: this.GetDateStr(-7),
                    CreateEndTime:this.formInline.CreateEndTime?this.formInline.CreateEndTime:this.GetDateStr(1),
                    ID:this.formInline.ID,
                    DelFlag:this.formInline.DelFlag,
                    PageIndex:this.PageIndex,
                    PageSize:this.PageSize
                }
                ProductGrpShareListGet(qs.stringify(params)).then((res)=>{
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
            AddDoubleActive(){                  /* 添加分享活动 */
                let params = {
                    BeginTime:this.AddAction.BeginTime,
                    EndTime:this.AddAction.EndTime,
                    Remark:this.AddAction.Remark
                }
                ProductGrpShareAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.editVisible = false
                        this.getData()
                        this.$message.success('添加成功')
                        this.AddAction.BeginTime = ''
                        this.AddAction.EndTime = ''
                        this.AddAction.Remark = ''
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
            change(row){
                this.row = row
                this.editVisible2 = true
            },
            ChangeDoubleActive(row){            /* 修改 */
                let params = {
                    ID:this.row.ID,
                    BeginTime:this.row.BeginTime,
                    EndTime:this.row.EndTime,
                    Remark:this.row.Remark
                }
                ProductGrpShareUpdate(qs.stringify(params)).then((res)=>{
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
            },
            DeleteDoubleActive(){
                let params = {
                    ID:this.row.ID,
                }
                ProductGrpShareDelete(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.getData()
                        this.$message.success('已废弃')
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
            open(row) {
                this.row = row
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.DeleteDoubleActive()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            goPage(row){
                this.$router.push({
                    path:'/PortfolioDetails',
                    query:{
                        ID:row.ID
                    }
                })
            },
            GetDateStr(AddDayCount) { 
                var dd = new Date();
                dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
                var y = dd.getFullYear(); 
                var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
                var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
                return y+"-"+m+"-"+d+' '+'00:00:00'; 
            },
        },
        created(){
            this.getData()
            this.formInline.CreateBeginTime = this.GetDateStr(-7)
            this.formInline.CreateEndTime = this.GetDateStr(1)
        }
    }
</script> 
<style lang="scss">

</style> 