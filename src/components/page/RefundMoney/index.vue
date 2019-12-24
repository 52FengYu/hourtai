<template>
    <div>
        <el-card>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="供应商">
                    
                </el-form-item>
                <el-form-item label="退款单号">
                    <el-input v-model="formInline.user" placeholder="退款单号" @change="reset"></el-input>
                </el-form-item>
                <el-form-item label="售后单号">
                    <el-input v-model="formInline.user" placeholder="售后单号" @change="reset"></el-input>
                </el-form-item>
                <el-form-item label="关联订单号">
                    <el-input v-model="formInline.user" placeholder="关联订单号" @change="reset"></el-input>
                </el-form-item>
                <el-form-item label="全部付款方式">
                    <el-select v-model="formInline.region" placeholder="全部付款方式" @change="reset">
                        <el-option label="在线支付" value="1"></el-option>
                        <el-option label="货到付款" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="购买人姓名">
                    <el-input v-model="formInline.user" placeholder="购买人姓名" @change="reset"></el-input>
                </el-form-item>
                <el-form-item label="购买人手机号">
                    <el-input v-model="formInline.user" placeholder="购买人手机号" @change="reset"></el-input>
                </el-form-item>
                <el-form-item label="申请时间">
                    <el-date-picker
                        v-model="formInline.value1"
                        type="date"
                        placeholder="选择日期"
                         @change="reset">
                    </el-date-picker>
                    至
                    <el-date-picker
                        v-model="formInline.value1"
                        type="date"
                        placeholder="选择日期"
                         @change="reset">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="退款时间">
                    <el-date-picker
                        v-model="formInline.value1"
                        type="date"
                        placeholder="选择日期"
                         @change="reset">
                    </el-date-picker>
                    至
                    <el-date-picker
                        v-model="formInline.value1"
                        type="date"
                        placeholder="选择日期"
                         @change="reset">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">搜索</el-button>
                    <el-button type="primary">重置</el-button>
                </el-form-item>
                <el-form-item>
                    <el-checkbox-group v-model="checked" @change="test">
                        <el-checkbox v-for="item in checkList" :key="item.id" :label="item.id">{{item.label}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <!-- <el-table :data="tableData" border style="width: 100%" highlight-current-row>
                <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
                <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                <el-table-column prop="province" label="省份" width="120"></el-table-column>
                <el-table-column prop="city" label="市区" width="120"></el-table-column>
                <el-table-column prop="address" label="地址" width="300"></el-table-column>
                <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table> -->
        </el-card>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                formInline:{            /* 顶部输入框 */
                    user:'',
                    region:'',
                    value1:''
                },
                PageIndex:1,
                PageSize:10,
                checked: [1,2,3,4],
                checkList: [{id:1, label: '待退款'},{id:2, label: '退款中'},{id:3,label:'退款成功'},{id:4,label:'退款失败'}],
                tableData:{}
            }
        },
        methods:{
            test(){
                console.log(this.checked)
            },
            reset(){
                this.PageIndex = 1,
                this.PageSize = 10
            }
        },
        created(){

        }
    }
</script>
<style lang="scss" scoped>

</style>