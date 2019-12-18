<template>
    <div>
        <el-card>
            <template v-if="this.add === false">
                <el-button type="primary" @click="add = true" icon="el-icon-circle-plus" v-if="this.Audit === 'N'">添加明细</el-button>
                <h2 align="center">领券活动明细</h2>
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="Amount" label="优惠券金额" align="center"></el-table-column>
                    <el-table-column prop="Cost" label="优惠券成本"  align="center"></el-table-column>
                    <el-table-column prop="CreateManID" label="优惠券明细创建人" align="center"></el-table-column>
                    <el-table-column prop="CreateTime" label="优惠券明细创建时间"  align="center"></el-table-column>
                    <el-table-column prop="DisplayRemark" label="优惠券使用范围描述"  align="center"></el-table-column>
                    <el-table-column prop="GiftTokenGiveOutMasterID" label="优惠券领券主表ID" align="center"></el-table-column>
                    <el-table-column prop="GiftTokenName" label="优惠券明细" align="center" ></el-table-column>
                    <el-table-column prop="GiftTokenType" label="优惠券类型" align="center" ></el-table-column>
                    <el-table-column prop="ID" label="优惠券领券明细ID" align="center"></el-table-column>
                    <el-table-column prop="LastUpdateManID" label="追后修改人" align="center" ></el-table-column>
                    <el-table-column prop="LastUpdateTime" label="最后修改时间" align="center" ></el-table-column>
                    <el-table-column prop="MainSupplierID" label="主供应商号" align="center"></el-table-column>
                    <el-table-column prop="Remark" label="备注" align="center" ></el-table-column>
                    <el-table-column prop="SupplierID" label="供应商号" align="center" ></el-table-column>
                    <el-table-column prop="UseAddTime" label="优惠券结束时间按领取时间增加天数" align="center"></el-table-column>
                    <el-table-column prop="UseAmount" label="优惠券使用金额"  align="center"></el-table-column>
                    <el-table-column prop="UseBeginTime" label="开始使用时间"  align="center"></el-table-column>
                    <el-table-column prop="UseBlackRange" label="使用黑名单" align="center"></el-table-column>
                    <el-table-column prop="UseBlackType" label="使用黑名单类型"  align="center"></el-table-column>
                    <el-table-column prop="UseEndTime" label="使用结束时间"  align="center"></el-table-column>
                    <el-table-column prop="UseRange" label="使用范围" align="center"></el-table-column>
                    <el-table-column prop="UseType" label="使用范围类型" align="center" ></el-table-column>
                    <el-table-column label="操作" align="center" width="150px" fixed="right" v-if="this.Audit == 'N'">
                        <template  slot-scope="scope">
                            <el-button size="mini" type="primary" @click="edit(scope.row)">修改</el-button>
                            <el-button size="mini" type="primary" @click="deleteItem(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <template v-if="this.add === true">
                <el-button type="primary" icon="el-icon-back" @click="add = false">返回</el-button>
                <el-form ref="form" :model="form" label-width="20vw">
                    <el-form-item label="优惠券名称">
                        <el-input v-model="form.GiftTokenName"></el-input>
                    </el-form-item>
                    <el-form-item label="优惠券金额">
                        <el-input v-model="form.Amount"></el-input>
                    </el-form-item>
                    <el-form-item label="优惠券使用范围描述">
                        <el-input v-model="form.DisPlayRemark"></el-input>
                    </el-form-item>
                    <el-form-item label="优惠券成本">
                        <el-input v-model="form.Cost"></el-input>
                    </el-form-item>
                    <el-form-item label="使用范围类型">
                        <el-radio v-model="form.GiftTokenType" label="C">不限制</el-radio>
                        <el-radio v-model="form.GiftTokenType" label="N">利群内部供应商</el-radio>
                    </el-form-item>
                    <el-form-item label="主供应商号">
                        <el-select v-model="form.MainSupplierID" placeholder="主供应商"  clearable filterable @change="getSupplier">
                            <el-option
                            v-for="item in option1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="供应商号">
                        <el-select v-model="form.SupplierID" placeholder="供应商"  clearable filterable>
                            <el-option
                            v-for="item in option2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="form.Remark"></el-input>
                    </el-form-item>
                    <el-form-item label="优惠券使用时间按领券时间增加指定的天数">
                        <el-input v-model="form.UseAddTime"></el-input>
                        <i>固定时长传-1</i>
                    </el-form-item>
                    <el-form-item label="优惠券使用金额">
                        <el-input v-model="form.UseAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="开始使用时间">
                        <el-date-picker
                            v-model="form.timeStart"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="开始时间"
                            @change="updateDateStart">
                        </el-date-picker>
                        <i>优惠券使用时间按领券时间增加指定的天数 为-1时必传</i>
                    </el-form-item>
                    <el-form-item label="使用黑名单">
                        <!-- <i>B 品牌 C1一级分了 C2 二级分类 C3三级分类 P 单品 空则表示不限制</i> -->
                        <el-select v-model="form.UseBlackType" clearable @change="blacklist">
                            <el-option label="品牌" value="B"></el-option>
                            <el-option label="一级品类" value="C1"></el-option>
                            <el-option label="二级品类" value="C2"></el-option>
                            <el-option label="三级品类" value="C3"></el-option>
                            <el-option label="单品" value="P"></el-option>
                        </el-select>
                        <template v-if="this.form.UseBlackType == 'C1'">        <!-- 一级黑名单 -->
                            <el-select v-model="form.UseBlakRange1" clearable placeholder="请选择" multiple filterable @change="show">           <!-- 后期要删掉@change -->
                            <el-option
                                v-for="item in option3"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        </template>
                        <template v-if="this.form.UseBlackType == 'C2'">        <!-- 二级黑名单 -->
                            <el-cascader :options="option3" :props="props" :show-all-levels="false" @change="cascaderChange" v-model="form.UseBlakRange"></el-cascader>
                         </template>
                         <template v-if="this.form.UseBlackType == 'C3'">       <!-- 三级黑名单 -->
                            <el-cascader :options="option3" :props="props" :show-all-levels="false" @change="cascaderChange" v-model="form.UseBlakRange"></el-cascader>
                         </template>
                        <template v-if="this.form.UseBlackType === 'B'">        <!-- 品牌 -->
                            <el-input v-model="formData.bandName" clearable placeholder="请输入品牌..."></el-input>
                            <el-button type="primary" @click="search">搜索</el-button>
                            <el-button type="primary" @click="remove">清空</el-button>
                        </template>
                        <template v-if="this.form.UseBlackType === 'P'">        <!-- 单品 -->
                            <el-input v-model="P.ProductName" clearable placeholder="请输入单品"></el-input>
                            <el-button type="primary" @click="blacklist">搜索</el-button>
                            <el-select v-model="form.UseBlakRange1" clearable placeholder="请选择" multiple filterable @change="show" v-el-select-loadmore="loadmore">           <!-- 后期要删掉@change -->
                                <el-option
                                    v-for="item in option3"
                                    :key="item.ID"
                                    :label="item.ProductName"
                                    :value="item.ID">
                                </el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                    <el-form-item label="使用黑名单"  v-if="this.form.UseBlackType === 'B'">
                        <el-input type="textarea" v-model="form.BlackBrandName" size="60%"></el-input>
                    </el-form-item>
                    <el-form-item label="结束使用时间">
                        <el-date-picker
                            v-model="form.timeEnd"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="结束时间"
                            @change="updateDateEnd">
                        </el-date-picker>
                        <i>优惠券使用时间按领券时间增加指定的天数 为-1时必传</i>
                    </el-form-item>
                    <el-form-item label="使用范围类型">
                        <!-- <i>A 全场通用 B 品牌 C1一级分了 C2 二级分类 C3三级分类 P 单品</i> -->
                        <el-select v-model="form.UseType" clearable @change="UseRangeList">
                            <el-option label="全场通用" value="A"></el-option>
                            <el-option label="品牌" value="B"></el-option>
                            <el-option label="一级品类" value="C1"></el-option>
                            <el-option label="二级品类" value="C2"></el-option>
                            <el-option label="三级品类" value="C3"></el-option>
                            <el-option label="单品" value="P"></el-option>
                        </el-select>
                        <template v-if="this.form.UseType == 'C1'">        <!-- 一级类目 -->
                            <el-select v-model="form.UseRange1" clearable placeholder="请选择" multiple filterable @change="show">           <!-- 后期要删掉@change -->
                            <el-option
                                v-for="item in option4"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        </template>
                        <template v-if="this.form.UseType == 'C2'">        <!-- 二级类目 -->
                            <el-cascader :options="option4" :props="props" :show-all-levels="false" @change="cascaderChange1" v-model="form.UseRange"></el-cascader>
                         </template>
                         <template v-if="this.form.UseType == 'C3'">       <!-- 三级类目 -->
                            <el-cascader :options="option4" :props="props" :show-all-levels="false" @change="cascaderChange1" v-model="form.UseRange"></el-cascader>
                         </template>
                        <template v-if="this.form.UseType === 'B'">        <!-- 品牌 -->
                            <el-input v-model="formRangeData.bandName" clearable placeholder="请输入品牌..."></el-input>
                            <el-button type="primary" @click="foundBand">搜索</el-button>
                            <el-button type="primary" @click="removeBlack">清空</el-button>
                        </template>
                        <template v-if="this.form.UseType === 'P'">        <!-- 单品 -->
                            <el-input v-model="P.ProductName" clearable placeholder="请输入单品"></el-input>
                            <el-button type="primary" @click="UseRangeList">搜索</el-button>
                            <el-select v-model="form.UseRange1" clearable placeholder="请选择" multiple filterable @change="show" v-el-select-loadmore="loading">           <!-- 后期要删掉@change -->
                                <el-option
                                    v-for="item in option4"
                                    :key="item.ID"
                                    :label="item.ProductName"
                                    :value="item.ID">
                                </el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                    <el-form-item label="品牌名" v-if="this.form.UseType === 'B'">
                        <el-input type="textarea" v-model="form.BrandName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" v-if="this.flag == true">提交</el-button>
                        <el-button type="primary" @click="saveEdit" v-if="this.flag == false">确认修改</el-button>
                        <el-button type="primary" @click="clear">重置</el-button>
                    </el-form-item>
                </el-form>
            </template>
        </el-card>
    </div>
</template>
<script>
import { MemberGiftTokenGiveOutDetailListGetFromGiftTokenGiveOutMasterID,MemberGiftTokenGiveOutDetailUpdate,MemberGiftTokenGiveOutDetailDelete,MemberGiftTokenGiveOutDetailAdd } from '@/api/coupon';
import { SupplierListGetByLevel,getIDclass,getProductList } from '@/api/goodsList';
import { BaseBrandListGet } from '@/api/common'
import qs from 'qs'
    export default{
        directives: {
        'el-select-loadmore': {
            bind(el, binding) {
                // 获取element-ui定义好的scroll盒子
                const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
                SELECTWRAP_DOM.addEventListener('scroll', function () {
                    /**
                    * scrollHeight 获取元素内容高度(只读)
                    * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
                    * clientHeight 读取元素的可见高度(只读)
                    * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
                    * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
                    */
                    const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
                    if (condition) {
                        binding.value();
                    }
                });
            }
        }
    },
        data(){
            return{
                props: { multiple: true },              /* 级联选择器 */
                tableData:[],   /* 明细信息存放在此 */
                Audit:decodeURI(location.href).split('&')[1].split('=')[1],
                add:false,
                form:{
                    GiftTokenName:'',   /* 优惠券名称 */
                    Amount:'',          /* 优惠券金额 */
                    DisPlayRemark:'',       /* 优惠券使用范围描述 */
                    Cost:'',                /* 优惠券成本 */
                    GiftTokenType:'',           /* 使用范围类型 */
                    MainSupplierID:'',          /* 主供应商号 */
                    Remark:'',              /* 备注 */
                    SupplierID:'',          /* 供应商号 */
                    UseAddTime:'',          /* 优惠券使用时间按领券时间增加指定的天数 */
                    UseAmount:'',           /* 优惠券使用金额 */
                    timeStart:'',           /* 开始时间 */
                    UseBlakRange:[],       /* 使用黑名单 */
                    UseBlakRange1:[],
                    UseBlackType:'',       /* 使用黑名单 */
                    UseBlackType1:'',
                    timeEnd:'',             /* 结束时间 */
                    UseRange:[],                /* 使用范围 */
                    UseRange1:[],
                    UseType:'',                 /* 使用范围类型 */
                    bandName:'',            /* 品牌名称  搜索用 */
                    BrandName:[],           /* 给用户显示已经选中的品牌名称 */
                    BlackBrandName:[]
                },
                flag:true,
                ID:'',
                option1:[],
                option2:[],
                option3:[],     /* 黑名单备选 */
                option4:[],     /* 使用范围 */
                formData:{      /* 黑名单/品牌 */
                    bandName:'',
                },
                formRangeData:{      /* 适用范围/品牌 */
                    bandName:'',
                },
                LevelA:{
                    Level:1
                },
                LevelB:{
                    Level:2
                },
                LevelC:{
                    Level:3
                },
                P:{                     /* 商品 */
                    ProductName:'',
                    PageIndex:1,
                    PageSize:20,
                }
            }
        },
        methods:{
            loadmore() {
                this.P.PageIndex ++;
                this.blacklist();
            },
            loading(){
                this.P.PageIndex ++;
                this.UseRangeList();
            },
            getData(){
                let params = {
                    GiftTokenGiveOutMasterID : decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0]
                }
                MemberGiftTokenGiveOutDetailListGetFromGiftTokenGiveOutMasterID(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.tableData  =  JSON.parse(res.data.Result)
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
            deleteItem(row){
                let params = {
                    GiftTokenGiveOutMasterID : decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0],
                    ID:row.ID
                }
                MemberGiftTokenGiveOutDetailDelete(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('删除成功')
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
            updateDateStart(val) {
                this.form.timeStart = val + " 00:00:00"
            },
            updateDateEnd(val) {
                this.form.timeEnd = val + " 00:00:00"
            },
            onSubmit(){
                this.form.UseBlakRange = JSON.stringify(this.form.UseBlakRange1).replace(/\[/g,'').replace(/\]/g,'').replace(/\"/g,'').replace(/\,/g,'|')
                this.form.UseRange = JSON.stringify(this.form.UseRange1).replace(/\[/g,'').replace(/\]/g,'').replace(/\"/g,'').replace(/\,/g,'|')
                let params = {
                    GiftTokenGiveOutMasterID : decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0],
                    Amount:this.form.Amount,
                    Cost:this.form.Cost,
                    DisPlayRemark:this.form.DisPlayRemark,
                    GiftTokenName:this.form.GiftTokenName,
                    GiftTokenType:this.form.GiftTokenType,
                    MainSupplierID:this.form.MainSupplierID,
                    Remark:this.form.Remark,
                    SupplierID:this.form.SupplierID,
                    UseAddTime:this.form.UseAddTime,
                    UseAmount:this.form.UseAmount,
                    UseBeginTime:this.form.timeStart,
                    UseBlakRange:this.form.UseBlakRange,
                    UseBlackType:this.form.UseBlackType,
                    UseEndTime:this.form.timeEnd,
                    UseRange:this.form.UseRange,
                    UseType:this.form.UseType
                }
                MemberGiftTokenGiveOutDetailAdd(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.$message.success('添加成功')
                        this.getData()
                        this.add = false
                        this.form.Amount = '',
                        this.form.Cost = '',
                        this.form.DisPlayRemark = '',
                        this.form.GiftTokenName = "",
                        this.form.GiftTokenType = '',
                        this.form.MainSupplierID = '',
                        this.form.Remark = '',
                        this.form.SupplierID = '',
                        this.form.UseAddTime = '',
                        this.form.UseAmount = '',
                        this.form.timeStart = '',
                        this.form.UseBlakRange = '',
                        this.form.UseBlackType = '',
                        this.form.timeEnd = '',
                        this.form.UseRange = '',
                        this.form.UseType = ''
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
            clear(){
                this.form.Amount = '',
                this.form.Cost = '',
                this.form.DisPlayRemark = '',
                this.form.GiftTokenName = "",
                this.form.GiftTokenType = '',
                this.form.MainSupplierID = '',
                this.form.Remark = '',
                this.form.SupplierID = '',
                this.form.UseAddTime = '',
                this.form.UseAmount = '',
                this.form.timeStart = '',
                this.form.UseBlakRange = '',
                this.form.UseBlakRange1 = '',
                this.form.UseBlackType = '',
                this.form.timeEnd = '',
                this.form.UseRange = '',
                this.form.UseRange1 = '',
                this.form.UseType = ''
            },
/*             show(){
                console.log(this.form.UseBlakRange)
                console.log(this.form.UseRange)
            },*/
             getMainSupplier(){
                let params = {
                    Level:1
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.option1 = JSON.parse(res.data.Result)
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
                this.option2 = ''
                this.form.SupplierID = ''
                let params = {
                    Level:2,
                    MainSupplierID:this.form.MainSupplierID
                }
                SupplierListGetByLevel(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.option2 = JSON.parse(res.data.Result)
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
            edit(row){
                this.add = true;
                this.flag = false;
                this.ID = row.ID
                this.form = row
            },
            saveEdit(){                 /* 确认修改 */
                let params = {
                    ID:this.ID,
                    GiftTokenGiveOutMasterID:decodeURI(location.href).split('?')[1].split('=')[1].split('&')[0],
                    Amount:this.form.Amount,
                    Cost:this.form.Cost,
                    DisPlayRemark:this.form.DisPlayRemark,              /* ... */
                    GiftTokenName:this.form.GiftTokenName,
                    GiftTokenType:this.form.GiftTokenType,
                    MainSupplierID:this.form.MainSupplierID,
                    Remark:this.form.Remark,
                    SupplierID:this.form.SupplierID,
                    UseAddTime:this.form.UseAddTime,
                    UseAmount:this.form.UseAmount,
                    UseBeginTime:this.form.timeStart,                   /* ... */
                    UseBlakRange:this.form.UseBlakRange,                /* ... */
                    UseBlackType:this.form.UseBlackType,
                    UseEndTime:this.form.timeEnd,                       /* ... */
                    UseRange:this.form.UseRange,
                    UseType:this.form.UseType
                }
                MemberGiftTokenGiveOutDetailUpdate(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                       this.add = false;
                       this.$message.success('修改成功')
                       this.getData()
                       this.clear()
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
            blacklist(){                                    /* 添加黑名单 */
            this.form.UseBlakRange1.splice(0)                     
                if(this.form.UseBlackType === 'C1'){                /* 一级类目 */
                    getIDclass(qs.stringify(this.LevelA)).then((res)=>{
                        if(res.data.Success == 1){
                            this.option3 = JSON.parse(res.data.Result)
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
                if(this.form.UseBlackType === 'C2'){                /* 二级类目 */
                    getIDclass(qs.stringify(this.LevelB)).then((res)=>{
                        if(res.data.Success == 1){
                            this.option3 = JSON.parse(res.data.Result)
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
                if(this.form.UseBlackType === 'C3'){                /* 三级类目 */
                    getIDclass(qs.stringify(this.LevelC)).then((res)=>{
                        if(res.data.Success == 1){
                            this.option3 = JSON.parse(res.data.Result)
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
                if(this.form.UseBlackType === 'P'){   
                    getProductList(qs.stringify(this.P)).then((res)=>{
                        if(res.data.Success == 1){
                            this.option3 = JSON.parse(res.data.Result).List
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
            /* 使用范围 */
            UseRangeList(){     
                this.form.UseRange1.splice(0)                          
                if(this.form.UseType === 'C1'){                /* 一级类目 */
                    getIDclass(qs.stringify(this.LevelA)).then((res)=>{
                        if(res.data.Success == 1){
                            this.option4 = JSON.parse(res.data.Result)
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
                if(this.form.UseType === 'C2'){                /* 二级类目 */
                    getIDclass(qs.stringify(this.LevelB)).then((res)=>{
                        if(res.data.Success == 1){
                            this.option4 = JSON.parse(res.data.Result)
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
                if(this.form.UseType === 'C3'){                /* 三级类目 */
                    getIDclass(qs.stringify(this.LevelC)).then((res)=>{
                        if(res.data.Success == 1){
                            this.option4 = JSON.parse(res.data.Result)
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
                if(this.form.UseType === 'P'){   
                    getProductList(qs.stringify(this.P)).then((res)=>{
                        if(res.data.Success == 1){
                            this.option4 = JSON.parse(res.data.Result).List
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
            search(){
                let params={
                    BrandName:this.formData.bandName,
                    PageIndex:1,
                    PageSize:10
                }
                BaseBrandListGet(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.form.BlackBrandName.push(JSON.parse(res.data.Result).ModelList[0].BrandName)
                        this.form.UseBlakRange1.push(JSON.parse(res.data.Result).ModelList[0].ID)
                        this.formData.bandName = ''
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
            foundBand(){
                let params={
                    BrandName:this.formRangeData.bandName,
                    PageIndex:1,
                    PageSize:10
                }
                BaseBrandListGet(qs.stringify(params)).then((res)=>{
                    if(res.data.Success == 1){
                        this.form.BrandName.push(JSON.parse(res.data.Result).ModelList[0].BrandName)
                        this.form.UseRange1.push(JSON.parse(res.data.Result).ModelList[0].ID)
                        this.formRangeData.bandName = ''
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
            cascaderChange(value) {                 /* 黑名单下拉菜单中的二级菜单 */
                this.form.UseBlakRange1 = []
                let rang = []
                for(let i = 0 ; i < value.length; i++){
                    rang.push(value[i][1])
                }
                this.form.UseBlakRange1.push(rang)
            },
            cascaderChange1(value) {                 /* 使用范围下拉菜单中的二级菜单 */
                this.form.UseRange1 = []
                let rang = []
                for(let i = 0 ; i < value.length; i++){
                    rang.push(value[i][1])
                    console.log(value[i][1])
                }
                this.form.UseRange1.push(rang)
            },
            remove(){
                this.form.UseBlakRange1 = []
                this.form.BlackBrandName = []
            },
            removeBlack(){
                this.form.UseRange1 = []
                this.form.BrandName = []
            }
        },
        created(){
            this.getData()
            this.getMainSupplier()
        },
    }
</script>
<style lang="scss" scoped>
    .el-form{
        .el-form-item{
            .el-form-item__content{
                width:30vw!important;
                .el-input{
                    width:30vw
                }
            }
        }
    }
</style>