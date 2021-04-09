<template>
<div class="eTable">
  <el-input v-model="search" :placeholder="placeHolder" style="width:200px;float:left;margin:0 0 5px 5px" v-if="searchStatus"></el-input>
  <el-table
    ref="eltable"
    id="eltable"
  v-loading="loading"
  :data="tables"
  :stripe="stripe"
  :border="border"
  :height="tableHeight"
  :default-sort="defaultSort"
  :show-summary="showSummary"
  :summary-method="getSummaries"
  :header-cell-style="headerStyle"
  @selection-change="selectionChange"
  >
    <slot></slot>
  </el-table>
  <!--分页-->
  <el-pagination
    v-if="pageStatus"
    small
    background
    :current-page="pageNum"
    :page-size="pageSize"
    :page-sizes='[50,100,300,500,1000]'
    :total="total"
    :layout="layout"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    @prev-click="handleCurrentChange"
    @next-click="handleCurrentChange"
  ></el-pagination>

</div>
</template>

<script>
import KtButton from "@/views/Core/KtButton"
import {dateFormat,formListFormat,formDataFormat} from "@/utils/functions"
export default {
  name: 'ETable',
  components:{KtButton},
  props:{
    tableData:{type:Array},//表格数据
    stripe:{type:Boolean,default:true},//斑马纹
    border:{type:Boolean,default:true},//表格边框
    tableHeight:{type:Number,default:100},//表格高度
    defaultSort:{type:Object,default:function(){}},//默认排序
    pageStatus:{type:Boolean,default:true},//是否有分页
    showSummary: {type:Boolean,default:false},//合计行
    summary:{type:Array,default:function(){}},//合计行特殊初始化
    summaryFixed:{type:Number,default:2},//合计行数字小数初始化
    loading:{type:Boolean,default:false},
    checkboxT:{type:Function,default:function(){return true}},
    searchStatus:{type:Boolean,default:false},
    tableWidthStatus:{type:Boolean,default:true},
    placeHolder:{type:String,default:''},
    pageSize:{type:Number,default:50},//分页每页条数
    pageNum:{type:Number,default:1},//分页当前页
    total:{type:Number,default:0}
  },
  data(){
    return{
      height:0,//表格高度初始化
      layout:'prev,pager,next,sizes,total',//分页初始化
      totalArray:null,//合计行
      search:null,
      scrollTop:0
    }
  },
  computed:{
    tables(){
      const search=this.search;
      if(search){
        return this.tableData.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).toLowerCase().indexOf(search.toLowerCase()) > -1;
          })
        })
      }
      return this.tableData;
    }
  },
  methods:{
    //分页当前页跳转方法
    handleCurrentChange(val){
      this.$emit('currentChange',{pageNum:val,pageSize:this.pageSize});
    },
    //分页条数跳转方法
    handleSizeChange(val){
      this.$emit('sizeChange',{pageSize:val,pageNum:this.pageNum});
    },
    //复选框
    selectionChange(val){
      console.log(val)
      this.$emit('selectionChange',val);
    },
    //合计列初始化
    getSummaries:function(param){
      const { columns, data } = param;
      const sums = [];
      let values=[];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
        if(this.summary.length!==0){
          this.summary.forEach(e => {
            if(column.property===e){
              values = data.map(item => Number(item[e]));
            }
            if (column.property===e) {
              if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
                sums[index]=sums[index].toFixed(this.summaryFixed);
                //sums[index] += ' 元';
              } else {
                sums[index] = '';
              }
            }
          })
        }else{
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index]=sums[index].toFixed(this.summaryFixed);
            //sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        }
      });
      let arraylist={}
      sums.map((e,index)=>{
        if(e!==undefined&&e.length!==0){
          arraylist[columns[index].property]=e;
        }
      })
      this.totalArray=arraylist;
      return sums;
    },
    headerStyle({row,rowIndex}){
      return "background:linear-gradient(#CDDEF9, #ECF3F9  60%)";
    }
  }
}
</script>

<style scoped>
  .eTable >>> a{text-decoration: none;display: block;text-align: center;}
  .eTable >>> .el-table--mini td{padding:1px 0}
  .eTable >>> .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #E3E3E3;
  }
</style>
