<template>
    <div class="member">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-s-unfold"></i> 栏目管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-card class="box-card">
                <!-- <div> -->
                    <div class="display-flex">
                        <div class="preview large">
                            <div class="head">
                                <template>
                                    <el-tabs v-model="activeName">
                                        <el-tab-pane label="功能首页" name="first"></el-tab-pane>
                                    </el-tabs>
                                </template>
                            </div>
                            <div class="content">
                                <el-scrollbar style="height:100%">
                                    <div class="block active">
                                        Banner轮播
                                        <div class="block-hover">
                                            <div class="layout"></div> 
                                            <div class="displayFlex">
                                                <span>下移</span> 
                                                <span>编辑</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block">
                                        一行三个图（中间大）
                                        <div class="block-hover">
                                            <div class="layout"></div> 
                                            <div class="displayFlex">
                                                <span>上移</span><span>下移</span> <span>编辑</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block">
                                        一行四个图
                                        <div class="block-hover">
                                            <div class="layout"></div> 
                                            <div class="displayFlex">
                                                <span>上移</span><span>下移</span> <span>编辑</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block">
                                        门店推荐
                                        <div class="block-hover">
                                            <div class="layout"></div> 
                                            <div class="displayFlex">
                                                <span>上移</span><span>下移</span> <span>编辑</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block">
                                        一行一个专题
                                        <div class="block-hover">
                                            <div class="layout"></div> 
                                            <div class="displayFlex">
                                                <span>上移</span><span>下移</span> <span>编辑</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block">
                                        一行一个专题
                                        <div class="block-hover">
                                            <div class="layout"></div> 
                                            <div class="displayFlex">
                                                <span>上移</span><span>下移</span> <span>编辑</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block">
                                        一行一个专题
                                        <div class="block-hover">
                                            <div class="layout"></div> 
                                            <div class="displayFlex">
                                                <span>上移</span> <span>编辑</span>
                                            </div>
                                        </div>
                                    </div>
                                </el-scrollbar>
                                <el-row>
                                    <el-button>+</el-button>
                                </el-row>
                            </div>
                        </div>
                        <div class="style-sdit large">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>已选栏目：Banner轮播 &nbsp;&nbsp;  尺寸：750*448</span>
                                    <el-button style="float: right; padding: 3px 0" type="text">删除栏目</el-button>
                                </div>
                            </el-card>
                        </div>
                    </div>
                <!-- </div> -->
            </el-card>

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
<style lang="scss" scoped>
    .el-scrollbar {
        height: 550px!important;
        padding-bottom:100px;
        .el-scrollbar__wrap{
            overflow-y: scroll;
            height: 100%;
            overflow-x: hidden!important;
        }
    }
    .el-tabs__header {
        position: relative;
        margin: 0 0 15px;
        padding: 0 10px;
        width: 86%;
    }
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }
    .container {
        padding:16px 20px 8px 20px;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .el-card__body {
        padding: 16px 20px 8px 20px;
    }
    .el-row{
        margin-top: -24%;
        button{
            width:100%
        }
    }
    .container{
        .el-card__body{
            padding:0!important
        }
        .box-card{
            .display-flex{
                display:flex;
                justify-content: space-between;
                .preview{
                    width: 22rem;
                    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                    .head{

                    }
                    .content{
                        overflow:hidden;
                        .active{
                            background: rgb(217,217,217)
                        }
                        .block{
                            position:relative;
                            margin-bottom:10px;
                            padding:10px;
                            border:1px solid #ccc;
                            width:302px;
                            height:78px;
                            font-size: 18px;
                            line-height: 72px;
                            .block-hover{
                                display:none;
                            }
                        }
                        .block:hover {
                            .block-hover{
                                position: absolute;
                                top: 0%;
                                left: 0%;
                                padding:0;
                                margin-left:0;
                                // display: block;
                                display:flex;
                                justify-content: center;
                                line-height:500%;
                                width: 100%;
                                height: 100%;
                                background-color: rgba(0, 0, 0, 0.5);
                                color: #fff;
                                .displayFlex{
                                    padding:0;
                                    span{
                                        // display:block;
                                    }
                                } 
                            }
                        }
                    }
                }
                .style-sdit{
                    width:85rem;
                }
                .large{
                    
                }
            }
        }
    }
</style>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                url: './vuetable.json',
                activeName: 'first',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1,
                id: -1
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
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
                if(this.tableData[this.idx].id === this.id){
                    this.$set(this.tableData, this.idx, this.form);
                }else{
                    for(let i = 0; i < this.tableData.length; i++){
                        if(this.tableData[i].id === this.id){
                            this.$set(this.tableData, i, this.form);
                            return ;
                        }
                    }
                }
            },
            // 确定删除
            deleteRow(){
                this.$message.success('删除成功');
                this.delVisible = false;
                if(this.tableData[this.idx].id === this.id){
                    this.tableData.splice(this.idx, 1);
                }else{
                    for(let i = 0; i < this.tableData.length; i++){
                        if(this.tableData[i].id === this.id){
                            this.tableData.splice(i, 1);
                            return ;
                        }
                    }
                }
            }
        }
    }
</script>  