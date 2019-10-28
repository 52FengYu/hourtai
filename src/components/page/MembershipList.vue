<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-custom"></i> 会员列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="head">
                <el-input v-model="inputCard" placeholder="会员卡号" style="width:15rem;margin-right:2rem"></el-input>
                <el-input v-model="inputMobile" placeholder="手机号" style="width:15rem;margin-right:2rem"></el-input>
                <template>
                    <div class="block">
                        <el-date-picker
                        v-model="value2"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                        </el-date-picker>
                    </div>
                </template>
                <el-button type="primary" style="margin-left:2rem">搜索</el-button>
                <el-button type="primary" disabled>导出</el-button>   <!-- 不可用的情况下 动态添加disabled -->
            </div>
                 
            <el-table :data="data" border class="table" ref="multipleTable">
                <el-table-columnwidth="0" align="center"></el-table-column>
                <el-table-column prop="cardNum" label="会员卡号"  width="180" align="center" ></el-table-column>
                <el-table-column prop="type" label="注册类型" width="120" align="center" ></el-table-column>
                <el-table-column prop="name" label="昵称" width="180" align="center" ></el-table-column>
                <el-table-column prop="sex" label="性别"  width="150" align="center" ></el-table-column>
                <el-table-column prop="mobile" label="手机号" width="180" align="center" ></el-table-column>
                <el-table-column prop="birthday" label="生日" width="150" align="center" ></el-table-column>
                <el-table-column prop="time" label="注册时间"  width="220" align="center" ></el-table-column>
                <el-table-column prop="state" label="状态" width="120" align="center" ></el-table-column>
                <el-table-column prop="money" label="零钱包金额" :formatter="formatter" align="center" ></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="100000">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                url: './vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                inputCard: '',
                inputMobile:'',
                form: {
                    cardNum: '',    /* 会员卡号 */
                    type: '',       /* 注册类型 */
                    name: '',       /* 昵称 */
                    sex:'',     /* 性别 */
                    mobile:'',      /* 手机号 */
                    birthday:'',        /* 生日 */
                    time:'',        /* 注册时间 */
                    state:'',       /* 状态 */
                    money:''        /* 零钱包金额 */
                },
                idx: -1,
                id: -1,
                /* 带快捷方式的时间选择框 */
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
                value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                value2: ''
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    this.url = '/ms/table/list';
                };
                this.$axios.post(this.url, {
                    page: this.cur_page
                }).then((res) => {
                    this.tableData = res.data.list;
                })
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                this.id = row.id;
                this.form = {
                    id: row.id,
                    name: row.name,
                    date: row.date,
                    address: row.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.id = row.id;
                this.delVisible = true;
            },
        }
    }

</script>

<style lang="scss" scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        /* width: 300px;
        display: inline-block; */
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
    .container{
        width:100%;
       .head{
           display:flex
       }
        input{
            width:15rem
        }
        .table{
            margin-top:3rem;
            width:96%
        }
        .el-pagination{
            margin-right:1rem
        }
    }
</style>
