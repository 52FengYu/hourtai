<template>
    <div>
        <el-card>
            <el-input v-model="inputBox" class="searchInput" placeholder="请输入父级FID" clearable></el-input>
            <el-button type="primary" @click="getData">搜索</el-button>
            <el-button type="primary" @click="editVisible = true">添加分类</el-button>
            <el-table :data="tableData" border style="width: 100%;margin-top:2%">
                <el-table-column prop="OrderID" label="排序" align="center"></el-table-column>
                <el-table-column label="分类图片" align="center">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.ClassImageURL" alt="图片不存在" v-show="scope.row.ClassImageURL.substr(0,4) == 'http'"></el-image>
                        <el-image :src="'http://images.liqunshop.com/' + scope.row.ClassImageURL" alt="图片不存在" v-show="scope.row.ClassImageURL.substr(0,4) != 'http'"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="ID" label="分类编号" align="center"></el-table-column>
                <el-table-column prop="ClassName" label="分类名称" align="center"></el-table-column>
                <el-table-column prop="FID" label="父ID" align="center"></el-table-column>
                <el-table-column prop="ClassLevel" label="分类等级" align="center"></el-table-column>
                <el-table-column prop="SearchCoefficient" label="搜索加权系数" align="center"></el-table-column>
                <el-table-column prop="Remark" label="备注" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="change(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="PageIndex"
                :page-size="this.PageSize"
                layout="sizes, prev, pager, next"
                align="right"
                :total="tableData.length">
            </el-pagination>
        </el-card>  
        
        <!-- 新建分类弹出框 -->
        <el-dialog title="新建分类" :visible.sync="editVisible" width="50%" :close-on-click-modal="false">
            <el-form :model="addClass" class="demo-form-inline">
                <el-form-item label="分类图片"><!--  -->
                    <el-upload
                        action= '/adminwebapi/api/Image/UploadImage'
                        list-type="picture-card"
                        :on-success="handleAvatarSuccess"
                        :on-error="imgUploadError"
                        :on-remove ='addRemovePicture'
                        accept="image/png, image/jpeg, image/gif, image/jpg, image/bmp"
                        :limit='1'
                        :file-list="fileLists2"
                        :headers="TokenID"
                        :data="upLoadData"
                        >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="分类等级" required>
                    <el-select v-model="addClass.ClassLevel" clearable placeholder="请选择">
                        <el-option label="一级分类" value="1"></el-option>
                        <el-option label="二级分类" value="2"></el-option>
                        <el-option label="三级分类" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类名称" required>
                    <el-input v-model="addClass.ClassName"></el-input>
                </el-form-item>
                <el-form-item label="父ID">
                    <el-input v-model="addClass.FID"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="addClass.OrderID"></el-input>
                </el-form-item>
                <el-form-item label="搜索加权系数">
                    <el-input v-model="addClass.SearchCoefficient" placeholder="三级分类必传"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="addClass.Remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCategory">确 定</el-button>
            </span> 
        </el-dialog>

        <!-- 修改分类 -->
        <el-dialog title="修改分类" :visible.sync="editVisible2" width="50%" :close-on-click-modal="false">
            <el-form :model="changeClass" class="demo-form-inline">
                <el-form-item label="分类图片"><!--  -->
                    <el-upload
                        action= '/adminwebapi/api/Image/UploadImage'
                        list-type="picture-card"
                        :on-success="handleAvatarSuccessChange"
                        :on-error="imgUploadError"
                        :on-remove ='changeRemovePicture'
                        accept="image/png, image/jpeg, image/gif, image/jpg, image/bmp"
                        :limit='1'
                        :file-list="fileLists1"
                        :headers="TokenID"
                        :data="upLoadData"
                        >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="分类等级" required>
                    <el-select v-model="changeClass.ClassLevel" clearable placeholder="请选择">
                        <el-option label="一级分类" value="1"></el-option>
                        <el-option label="二级分类" value="2"></el-option>
                        <el-option label="三级分类" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类名称" required>
                    <el-input v-model="changeClass.ClassName"></el-input>
                </el-form-item>
                <el-form-item label="父ID">
                    <el-input v-model="changeClass.FID"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="changeClass.OrderID"></el-input>
                </el-form-item>
                <el-form-item label="搜索加权系数">
                    <el-input v-model="changeClass.SearchCoefficient" placeholder="三级分类必传"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="changeClass.Remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="changeCategory">确 定</el-button>
            </span> 
        </el-dialog>
    </div>
</template>    
<script>
import { getIDclass } from '@/api/goodsList';
import { BaseClassAllListGet,BaseClassAdd,BaseClassUpdate,BaseClassListGetFromFID } from '@/api/common'
import qs from 'qs'
    export default{
        name:'classification',
        data(){
            return{
                inputBox:'',                       /* 搜索分类时，input的value */
                BaseClass:[],                   /* 完整的三级类目 */
                editVisible:false,              /* 新建分类 */
                editVisible2:false,             /* 修改分类 */
                addClass:{                      /* 添加分类所需输入内容存放在这 */
                    ClassImageURL:'',           /* 分类图片 */
                    ClassLevel:'',              /* 分类等级 */
                    ClassName:'',               /* 分类名称 */
                    FID:'',                     /* 父ID */
                    OrderID:'',                 /* 排序 */
                    SearchCoefficient:'',       /* 搜索加权系数 */
                    Remark:'',                  /* 备注 */
                    Picture:''
                },
                changeClass:{},                 /* 修改分类 */
                tableData:[],
                PageSize:10,
                PageIndex:1,
                fileLists1:[],                  /* 修改分类的图片列表 */
                fileLists2:[],                  /* 添加分类的图片列表 */
                TokenID:{
                    TokenID:sessionStorage.getItem('TokenID'),
                },
                upLoadData:{
                    ImageUseType:'Page'           /*  Page，ProductContent，ProductHead */
                },
            }
        },
        methods:{
            getData(){
                let params = {
                    FID:this.inputBox,
                }
                BaseClassListGetFromFID(qs.stringify(params)).then((res)=>{
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
            addCategory(){                  /* 添加分类 确认按钮*/
                let params = {
                    ClassImageURL:this.addClass.Picture,
                    ClassLevel:this.addClass.ClassLevel,
                    ClassName:this.addClass.ClassName,
                    FID:this.addClass.FID,
                    OrderID:this.addClass.OrderID,
                    Remark:this.addClass.Remark,
                    SearchCoefficient:this.addClass.SearchCoefficient
                }/*  */
                BaseClassAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('添加成功')
                        this.editVisible = false
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
            change(row){
                this.fileLists1 = []
                this.changeClass = {}
                this.editVisible2 = true;
                var data = this.tableData.find(function(e){return e.ID == row.ID})
                this.changeClass = data
                if(data.ClassImageURL){
                    this.fileLists1.push({url:data.ClassImageURL})
                }
            },
            changeCategory(){               /* 修改分类 确认按钮*/
                let params = {
                    ID:this.changeClass.ID,
                    ClassImageURL:this.changeClass.Picture?this.changeClass.Picture:'',
                    ClassLevel:this.changeClass.ClassLevel,
                    ClassName:this.changeClass.ClassName,
                    FID:this.changeClass.FID,
                    OrderID:this.changeClass.OrderID,
                    Remark:this.changeClass.Remark,
                    SearchCoefficient:this.changeClass.SearchCoefficient
                }/*  */
                BaseClassUpdate(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('添加成功')
                        this.editVisible2 = false
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
                this.PageIndex = val
                this.getData()
            },
            handleAvatarSuccess(res,file){                  /* 添加分类 */
                this.addClass.ClassImageURL = '',
                this.addClass.ClassImageURL = 'http://images.liqunshop.com/' + JSON.parse(res.Result)[0]  
                this.addClass.Picture = JSON.parse(res.Result)[0]  
            },
            handleAvatarSuccessChange(res,file){                  /* 修改分类 */
                this.changeClass.ClassImageURL = '',
                this.changeClass.ClassImageURL = 'http://images.liqunshop.com/' + JSON.parse(res.Result)[0]  
                this.changeClass.Picture = JSON.parse(res.Result)[0]  
            },
            imgUploadError(){
                this.$message('图片上传失败')
            },
            addRemovePicture(file, fileList){
                console.log(file)
                console.log(fileList)
            },
            changeRemovePicture(file,fileList){
                console.log(file)
                console.log(fileList)
            }
        },
        created(){
             
        }
    }
</script>      
<style lang="scss" scoped>
    .searchInput{
        width:20%;
        margin-right:1% 
    }
    .el-form{
        .el-form-item{
            .el-form-item__content{
                width:30vh!important
            }
        }
    }
</style>