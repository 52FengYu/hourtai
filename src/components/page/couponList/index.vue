<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-ticket"></i> 优惠券列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="head">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="优惠券">
                        <el-input v-model="formInline.title" placeholder="优惠券ID/优惠券标题"></el-input>
                    </el-form-item>
                     <el-form-item label="优惠券">
                        <el-select v-model="formInline.type" placeholder="全部优惠券类型">
                            <el-option label="全部优惠券类型" value="全部优惠券类型"></el-option>
                            <el-option label="满减券" value="满减券"></el-option>
                            <el-option label="现金券" value="现金券"></el-option>
                        </el-select>
                     </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-zoom-in">搜索</el-button>   
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" icon="el-icon-plus">新建优惠券</el-button>   
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" icon="el-icon-s-fold">兑换码列表</el-button>   
                    </el-form-item>
                </el-form>
            </div>
            <el-table :data="tableData" border class="tableData" ref="multipleTable">
                <el-table-column prop="startTime" label="创建时间"  width="150" align="center" ></el-table-column>
                <el-table-column prop="ID" label="优惠券ID" width="100" align="center" ></el-table-column>
                <el-table-column prop="title" label="优惠券标题" width="150" align="center" ></el-table-column>
                <el-table-column prop="type" label="类型"  width="70" align="center" ></el-table-column>
                <el-table-column prop="Reasons" label="发放原因" width="120" align="center" ></el-table-column>
                <el-table-column prop="timeType" label="时间类型" width="150" align="center" ></el-table-column>
                <el-table-column prop="money" label="金额"  width="60" align="center" ></el-table-column>
                <el-table-column prop="validity" label="有效期" width="80" align="center" ></el-table-column>
                <el-table-column prop="Issuance" label="发放统计" width="120" align="center" ></el-table-column>
                <el-table-column prop="use" label="使用统计"  width="120" align="center" ></el-table-column>
                <el-table-column prop="state1" label="状态" width="170" align="center" ></el-table-column>
                <el-table-column prop="state2" label="状态" width="150" align="center" ></el-table-column>
                    <el-table-column label="操作" width="350">
                        <template slot-scope="scope">
                            <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">下线</el-button>
                            <el-button size="mini" type="success" @click="handleDelete(scope.$index, scope.row)">发放</el-button>
                            <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
                            <el-button size="mini" type="primary" round @click="handleDelete(scope.$index, scope.row)">生成兑换码</el-button>
                        </template>
                    </el-table-column>
            </el-table>
            <div class="pagination">
                 <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<style lang="scss">

</style>
<script>
    export default{
        data(){
            return{
                currentPage4: 4,           /* 分页 */
                formInline:{
                    title:"",           /* 优惠券ID/优惠券标题 */
                },
                tableData:[{
                    startTime:'3564163',       /* 创建时间 */
                    ID:'35465',              /* 优惠券ID */
                    title:'8974685',           /* 优惠券标题 */
                    type:'6874654',            /* 类型 */
                    Reasons:'',         /* 发放原因 */
                    timeType:'',        /* 时间类型 */
                    money:"",           /* 金额 */
                    validity:"",        /* 有效期 */
                    Issuance:"",        /* 发放统计 */
                    use:"",             /* 使用统计 */
                    state1:"",          /* 状态1 */
                    state2:"",          /* 状态2 */
                }]
            }
        },
        methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>  