<template>
  <div class="hovTools" data-v-f3f3eg9>
  <el-dialog :title="hovTitle" :visible.sync="HovVisible" center width="800px" top="10vh" @close="closeHov" data-v-f3f3eg9>
    <el-form size="mini" :model="formData" :label-position="labelPosition" :label-width="labelWidths" :inline="inlines" class="hovform">
      <el-form-item :label="fm.label" v-for="fm in formColumns" :key="fm.id" style="margin:5px 0;width:220px;" v-show="fm.display!==1">
        <el-input v-model="formData[fm.id]" :disabled="fm.disabled" v-if="fm.queryStatus===true" :clearable="true" :style="{width:(220-labelWidth)+'px'}" @input="force" @keyup.enter.native="query"></el-input>
        </el-form-item>
      </el-form>
    <div style="background:#eee;border-bottom:1px solid #ccc;clear:both;padding:5px;">
        <el-button @click="query()" size="small" style="margin-left:10px;" type="primary">查询</el-button>
      </div>
    <div>
      <el-table
      size="mini"
      border
      stripe
      :loading="loading"
      highlight-current-row
      highlight-hover-row
      :height="tableHeight"
      show-overflow="ellipsis"
       ref="Xtable"
      @row-dblclick="cellDBLClickEvent"
       :data="tableData">
      <el-table-column v-for="(col, index) in tableColumns"
       v-if="col.tableDisplay!==1"
       :prop="col.prop"
       :key="index"
       :label="col.label"
       :width="col.width">
        <template slot-scope="scope">
          <div  v-if="col.type==='date'">
            {{dateFormat('YYYY-mm-dd HH:MM:SS',scope.row[col.prop])}}
          </div>
          <div v-else>
            {{scope.row[col.prop]}}
          </div>
        </template>
      </el-table-column>
      </el-table>
      </div>
    <div slot="footer">
      <el-pagination
        background
        :small="true"
        align="center"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="totalResult"
        layout="prev, pager, next"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
        @prev-click="handlePageChange"
        @next-click="handlePageChange">
      </el-pagination>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import {dateFormat} from "@/utils/functions"
export default {
  name: 'HovTools',
  props: {
    hovData: {
      type:Object,
      default() {
        return {};
      }
    },
    labelWidth:{type:Number,default:110}
  },
  data(){
    return{
      HovVisible: true,
      labelPosition: "right",
      inlines: true,
      loading: false,
      pagesize: 10,
      currentPage: 1,
      totalResult: 0,
      tableHeight: 350,
      formColumns:[],
      hovTitle:null,
      formData:{},
      tableColumns:[],
      backfill:[],
      tableData:[],
      fillDataName:null,
      labelWidths:this.labelWidth+'px'
    }
  },
  created(){
    this.openDialog();
  },
  methods:{
    //日期初始化方法
    dateFormat(format,date){
      return dateFormat(format,date);
    },
    cellDBLClickEvent(data,event){
      let backfill=this.backfill;
      for(var i=0;i<backfill.length;i++){
        if(data[backfill[i].prop] === null){
          this.$parent[this.fillDataName][backfill[i].fillid]=null;
        }else{
          this.$parent[this.fillDataName][backfill[i].fillid]=data[backfill[i].prop].toString();
        }
      }
      if(this.afterStatus===false){
        this.$parent[this.parentVisible]=false;
      }else{
        this.$emit('updatehov');
        this.$parent[this.parentVisible]=false;
      }
    },
    query(){
      this.loading = true;
      this.tableData=[];
      this.currentPage=1;
      var formColumns=this.formColumns;
      var that=this;
      var formData={};
      for(var i=0;i<formColumns.length;i++){
        if(this.formData[formColumns[i].id]===''){
          delete this.formData[formColumns[i].id];
        }else{
          formData[formColumns[i].id]=this.formData[formColumns[i].id];
        }
        if(formColumns[i].dataStatus===2&&this.formData[formColumns[i].id]!=null){
          var regZ = /^[+]{0,1}(\d+)$/;
          var res = new RegExp(regZ);
          if (!res.test(this.formData[formColumns[i].id])) {
            alert(formColumns[i].label+"只能为数字");
            this.loading = false;
            return;
          }else{
            formData[formColumns[i].id]=Number(this.formData[formColumns[i].id]);
          }
        }
      }
      if(Object.keys(this.formData).length<=0){
        formData=null;
      }
      this.$api.hov.query(this.hovUrl,{pageNum:this.currentPage,pageSize:this.pagesize,params:formData}).then(function(res){
        if(res.code===200){
          that.tableData=res.data.content;
          that.totalResult=res.data.totalSize;
          that.currentPage=res.data.pageNum;
          that.pagesize=res.data.pageSize;
          that.loading = false;
        }else{
          console.log(res.msg);
          that.loading = false;
          return false;
        }
      });
    },
    handlePageChange(page){
      this.loading = true;
      this.tableData=[];
      var that=this;
      var formData={};
      if(Object.keys(this.formData).length<=0){
        formData=null;
      }else{
        Object.keys(this.formData).forEach(e=>{
          if(this.formData[e]!==''){
            formData[e]=this.formData[e];
          }
        })
      }
      this.$api.hov.query(this.hovUrl,{pageNum:page,pageSize:this.pagesize,params:formData}).then(function(res){
        if(res.code===200){
          that.tableData=res.data.content;
          that.totalResult=res.data.totalSize;
          that.currentPage=res.data.pageNum;
          that.pagesize=res.data.pageSize;
          that.loading = false;
        }else{
          console.log(res.msg);
          that.loading = false;
          return false;
        }
      });
    },
    handleSizeChange(page){
      this.loading = true;
      this.tableData=[];
      var that=this;
      var formData={};
      if(Object.keys(this.formData).length<=0){
        formData=null;
      }else{
        Object.keys(this.formData).forEach(e=>{
          if(this.formData[e]!==''){
            formData[e]=this.formData[e];
          }
        })
      }
      this.$api.hov.query(this.hovUrl,{pageNum:this.currentPage,pageSize:page,params:formData}).then(function(res){
        if(res.code===200){
          that.tableData=res.data.content;
          that.totalResult=res.data.totalSize;
          that.currentPage=res.data.pageNum;
          that.pagesize=res.data.pageSize;
          that.loading = false;
        }else{
          console.log(res.msg);
          that.loading = false;
          return false;
        }
      });
    },
    closeHov(){
      this.$parent[this.parentVisible]=false;
    },
    openDialog(){
      this.formColumns=[];
      this.tableColumns=[];
      this.backfill=[];
      this.formData={};
      var columns=this.hovData.hovColumns;
      for(var i=0;i<columns.length;i++){
        if(columns[i].queryStatus===true){
          this.formColumns.push({label:columns[i].name,id:columns[i].id,dataStatus:columns[i].dataStatus,queryStatus:columns[i].queryStatus,disabled:columns[i].disabled,display:columns[i].display});
        }
        if(columns[i].value!=null){
          this.formData[columns[i].id]=columns[i].value;
        }
        if(columns[i].hasOwnProperty('tableStatus')===false){
          this.tableColumns.push({prop: columns[i].id, label: columns[i].name,type:columns[i].type,tableDisplay:columns[i].tableDisplay});
        }
        if(columns[i].hasOwnProperty("fillid")===true){
          this.backfill.push({fillid:columns[i].fillid,prop:columns[i].id});
        }
      }
      this.hovTitle=this.hovData.hovTitle;
      this.hovUrl=this.hovData.hovUrl;
      this.fillDataName=this.hovData.fillDataName;
      this.afterStatus=this.hovData.afterStatus;
      this.parentVisible=this.hovData.parentVisible;
      this.tableData=[];
      this.pagesize=10;
      this.currentPage=1;
      this.totalResult=0;
    },
    force(){
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
  .hovTools >>> .el-dialog__body {
    padding: 10px 10px 30px 10px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
    height:calc(100% - 145px)
  }
</style>
