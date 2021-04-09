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
    <!--列渲染-->
    <template  v-for="(col,index) in tableColumns">
      <el-table-column
        v-if="col.indexType"
        :type="col.indexType"
        :width="col.width"
        :selectable="checkboxT"
        :fixed="col.fixed"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <!--正常列-->
      <el-table-column
        v-else-if="col.tableStatus===0&&col.type===0"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :fixed="col.fixed"
        :index="index"
        :sortable="col.sortable"
        :width="col.width"
        :sort-method="col.sortMethod"
        :formatter="col.formatter"
        :filters="col.filters"
        :filter-method="col.filterMethod"
        :min-width="col.minWidth"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <!--日期列-->
      <el-table-column
        v-else-if="col.tableStatus===0&&col.type===2"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :fixed="col.fixed"
        :index="index"
        :sortable="col.sortable"
        :width="col.width"
        :sort-method="col.sortMethod"
        :formatter="col.formatter"
        :filters="col.filters"
        :filter-method="col.filterMethod"
        :min-width="col.minWidth"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          {{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row[col.prop])}}
        </template>
      </el-table-column>
      <!--Input列-->
      <el-table-column
        v-else-if="col.tableStatus===0&&col.type===3"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :fixed="col.fixed"
        :index="index"
        :sortable="col.sortable"
        :width="col.width"
        :sort-method="col.sortMethod"
        :formatter="col.formatter"
        :filters="col.filters"
        :filter-method="col.filterMethod"
        :min-width="col.minWidth"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row[col.prop]" clearable @input="elInput"></el-input>
        </template>
      </el-table-column>
      <!--Select列-->
      <el-table-column
        v-else-if="col.tableStatus===0&&col.type===4"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :fixed="col.fixed"
        :index="index"
        :sortable="col.sortable"
        :width="col.width"
        :sort-method="col.sortMethod"
        :formatter="col.formatter"
        :filters="col.filters"
        :filter-method="col.filterMethod"
        :min-width="col.minWidth"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row[col.prop]">
            <el-option v-for="item in col.options" :key="item.value" :value="item.value" :label="item.label">{{item.label}}</el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="col.tableStatus===0&&col.type===5"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :fixed="col.fixed"
        :index="index"
        :sortable="col.sortable"
        :width="col.width"
        :sort-method="col.sortMethod"
        :formatter="col.formatter"
        :filters="col.filters"
        :filter-method="col.filterMethod"
        :min-width="col.minWidth"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
            <a href="javascript:void(0)" @click="openA(col.prop,scope.row)">{{scope.row[col.prop]}}</a>
        </template>
      </el-table-column>
      <!--功能按钮列-->
      <el-table-column
        v-else-if="col.tableStatus===0&&col.type===1"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :fixed="col.fixed"
        :index="index"
        :sortable="col.sortable"
        :width="col.width"
        :sort-method="col.sortMethod"
        :formatter="col.formatter"
        :filters="col.filters"
        :filter-method="col.filterMethod"
        :min-width="col.minWidth"
      >
        <template slot-scope="scope">
          <kt-button
            v-for="item in col.options"
            :key="item.id"
            :icon="item.icon"
            :label="$t(item.label)"
            :perms="item.perms"
            :loading="item.loading"
            type="primary"
            @click="handle(scope.$index, scope.row,item.id)"
            style="margin-top:5px;"
          ></kt-button>
    <!--      <kt-link
            v-for="item in col.options"
            :key="item.id"
            :icon="item.icon"
            :label="$t(item.label)"
            :perms="item.perms"
            :loading="item.loading"
            type="primary"
            @click="handle(scope.$index, scope.row,item.id)"
          ></kt-link>-->
        </template>
      </el-table-column>
    </template>
  </el-table>
  <!--分页-->
  <el-pagination
    v-if="pageStatus"
    small
    background
    :current-page="currentPage"
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
import KtLink from "./KtLink";
export default {
  name: 'ETable',
  components:{KtLink, KtButton},
  props:{
    tableColumns:{type:Array},//列加载数据
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
    tablePageSize:{type:Number,default:50},//分页每页条数
    tableCurrentPage:{type:Number,default:1},//分页当前页
    tableTotal:{type:Number,default:0}
  },
  data(){
    return{
      height:0,//表格高度初始化
      currentPage:this.tableCurrentPage,//分页当前页
      pageSize:this.tablePageSize,
      layout:'prev,pager,next,sizes,total',//分页初始化
      total:this.tableTotal,//分页总条数
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
      if(this.tableWidthStatus===true){
        this.tableColumns.map(value => {
          if(value.widthStatus!==true){
            const arr=this.tableData.map(x => x[value.prop]);
            arr.push(value.label);
            value.width=this.getMaxLength(arr);
          }
        });
      }
      return this.tableData;
    }
  },
  mounted ()
  {
    let self = this;
    this.dom = this.$refs.eltable.bodyWrapper;
    this.dom.addEventListener('scroll', function () {
      let srollTop = this.scrollTop;
      self.scrollTop = srollTop;
      /*let windowHeight = this.clientHeight;
      let scrollHeight = this.scrollHeight;
      if (srollTop + windowHeight === scrollHeight) {
        if (!this.allData) {
          this.scrollTop = this.scrollTop + 100;
        }
      }*/
    })
  },
  methods:{
    //功能按钮方法
    handle(index,row,id){
      let params=formListFormat(this.tableColumns);
      let paramsData=formDataFormat(this.tableColumns)
      this.$emit('handle',{row:row,index:index,id:id,list:params,listData:paramsData});
    },
    //分页当前页跳转方法
    handleCurrentChange(val){
      this.$emit('currentChange',{pageNum:val,pageSize:this.pageSize});
    },
    //分页条数跳转方法
    handleSizeChange(val){
      this.$emit('sizeChange',{pageSize:val,pageNum:this.currentPage});
    },
    //日期初始化方法
    dateFormat(format,date){
      return dateFormat(format,date);
    },
    //下拉框特殊方法
    selectionChange(val){
      this.$emit('selectionChange',val);
    },
    elInput(){
      this.$emit('elInput');
    },
    openA(id,row){
      this.$emit('openA',{id:id,row:row});
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
    getMaxLength(arr,type){
      let acc=0;
      arr.forEach(item => {
       if(item){
         let len=0;
         if(typeof item==="number"){
           len=item.toString().length*10+20;
         }else{
           len=item.length*14+20;
         }
         if(acc<len){
           acc=len;
         }
       }
      });
      return acc;
    },
    headerStyle({row,rowIndex}){
      return "background:linear-gradient(#CDDEF9, #ECF3F9  60%)";
    }
  }
  /*created() {
    this.height=document.documentElement.clientHeight-this.tableHeight;
  }*/
}
</script>

<style scoped>
  .eTable >>> a{text-decoration: none;display: block;text-align: center;}
  .eTable >>> .el-table--mini td{padding:1px 0}
  .eTable >>> .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #E3E3E3;
  }
</style>
