<template>
    <div>
        <el-card>
            <el-button type="primary" @click="editVisible = true">导出Excel</el-button>
            <h2 style="text-align:center">退款单明细</h2>
            <br>
            <el-table :data="tableData" border style="width: 100%" highlight-current-row height="700">
                <el-table-column prop="OrderBackPayID" label="退款单号" align="center" fixed></el-table-column>
                <el-table-column prop="OrderBackID" label="退单号" align="center"></el-table-column>
                <el-table-column prop="PayName" label="支付方式" align="center"></el-table-column>
                <el-table-column prop="OrderPayID" label="支付单号" align="center"></el-table-column>
                <el-table-column prop="BackMoney" label="退款金额" align="center"></el-table-column>
            </el-table>
        </el-card>

        <!-- 导出Excel -->
        <el-dialog title="导出" :visible.sync="editVisible" width="50%" :close-on-click-modal="false">
            <el-form :inline="true" :model="confirm" class="demo-form-inline">
                <el-form-item label="导出类型">
                    <el-select v-model="confirm.Type" clearable>
                        <el-option label="合并后信息" value="GROUP"></el-option>
                        <el-option label="全部信息" value="ALL"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="exportExcel">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>    
<script>
import { OrderBackPayDetailListGetFromOrderBackPayID,OrderBackProductPayDetailExport } from '@/api/orderList'
import qs from 'qs'
    export default{
        data(){
            return{
                tableData:[],
                confirm:{
                    Type:''
                },
                editVisible:false
            }
        },
        methods:{
            getData(){
                let params = {
                    OrderBackPayID:decodeURI(location.href).split('?')[1].split('=')[1]
                }
                OrderBackPayDetailListGetFromOrderBackPayID(qs.stringify(params)).then((res)=>{
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
            exportExcel(){
                let params = {
                    OrderBackPayID:decodeURI(location.href).split('?')[1].split('=')[1],
                    Type:this.confirm.Type
                }
                OrderBackProductPayDetailExport(qs.stringify(params)).then((res)=>{
                    var blob = new Blob([res.data]); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
                    var contentDisposition = res.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
                    var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
                    var result = patt.exec(contentDisposition);
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
            this.getData()
        }
    }
</script>
<style lang="scss" scoped>

</style>