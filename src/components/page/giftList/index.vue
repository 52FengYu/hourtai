<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-bank-card"></i> 礼品卡列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>         
        <div class="container">
            <div class="head">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="formInline.phone" placeholder="请输入用户手机号或名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="formInline.giftCardID" placeholder="礼品卡编号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="formInline.giftCardTypeNum" placeholder="礼品卡类型编号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker
                            v-model="formInline.time"
                            type="datetimerange"
                            :picker-options="pickerOptions"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">搜索</el-button>
                        <el-button type="success" @click="onSubmit">导入</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <el-table :data="tableData" border style="width: 100%"> 
                    <el-table-column prop="giftCardNum" label="礼品卡编号" width="150" align="center"> </el-table-column> 
                    <el-table-column prop="giftCardTypeNum" label="礼品卡类型编号" width="120" align="center"> </el-table-column> 
                    <el-table-column prop="giftCardTypeName" label="礼品卡类型名称" width="120" align="center"> </el-table-column> 
                    <el-table-column prop="Denomination" label="面额" width="120" align="center"> </el-table-column> 
                    <el-table-column prop="amount" label="剩余金额" width="300" align="center"> </el-table-column> 
                    <el-table-column prop="name" label="用户姓名" width="120" align="center"> </el-table-column> 
                    <el-table-column prop="phone" label="手机号" width="120" align="center"> </el-table-column> 
                    <el-table-column prop="createTime" label="创建时间" width="120" align="center"> </el-table-column> 
                    <el-table-column prop="expirationDate" label="过期时间" width="300" align="center"> </el-table-column> 
                    <el-table-column prop="state" label="状态" width="120" align="center"> </el-table-column> 
                    <el-table-column fixed="right" label="操作" width="150" align="center"> 
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="success">查看使用记录</el-button>
                            <el-button type="danger" size="small">禁用</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    style=" text-align:right"
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
                currentPage4: 4,                /* 分页器 */
                formInline:{
                    giftCardTypeNum:'',         /* 礼品卡类型编号 */
                    giftCardID:'',              /* 礼品卡编号 */
                    phone:"",                   /* 请输入用户手机号或名称 */
                    time:'',                    /* 时间选择器 */
                },
                pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            value2: '',
            tableData:[{
                    giftCardNum:'3213',             /* 礼品卡编号 */
                    giftCardTypeNum:'5346',         /* 礼品卡类型编号 */
                    giftCardTypeName:'685476',        /* 礼品卡类型名称 */
                    Denomination:'3534',            /* 面额 */
                    amount:"35463",                  /* 剩余金额 */
                    name:'86576',                    /* 用户姓名 */
                    phone:'65456',                   /* 手机号 */
                    createTime:'635463',              /* 创建时间 */
                    expirationDate:'77777',          /* 过期时间 */
                    state:'6',                   /* 状态 */
                }]
            }
        },
        methods:{
            handleClick(row) {
                console.log(row);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>  