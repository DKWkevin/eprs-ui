<template>
  <div class="eTable">
    <el-table
      ref="eltable"
      v-loading="loading"
      :data="tableData"
      stripe
      border
      :height="height"
    >
      <el-table-column prop="settlemodename" label="结算方式">
        <template slot-scope="scope">
          <div v-if="(scope.row['settlemode']===2||scope.row['settlemode']===6)&&scope.row['total_line']!==0">
            <a href="javascript:void(0)" @click="handle(scope.$index,scope.row,'settlemodename')">{{scope.row['settlemodename']}}</a>
          </div>
          <div v-else>
            {{scope.row['settlemodename']}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="customid" label="客商ID"></el-table-column>
      <el-table-column prop="customname" label="客商名称" width="150"></el-table-column>
      <el-table-column prop="total_line" label="金额" width="120">
        <template slot-scope="scope">
          <el-input :disabled="true"  v-model="scope.row['total_line']"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="bankname" label="收款行" width="240">
        <template slot-scope="scope">
          <div v-if="scope.row['settlemode']===2||scope.row['settlemode']===4||scope.row['settlemode']===5||scope.row['settlemode']===6">
            <el-select v-model="scope.row['recbankname']" style="width:100%;">
              <el-option v-for="op in options" :key="op.value" :value="op.value" :label="op.label"></el-option>
            </el-select>
          </div>
          <div v-else></div>
        </template>
      </el-table-column>
      <el-table-column prop="accno" label="客商帐号" width="150"></el-table-column>
      <el-table-column prop="bankname" label="开户行" width="150"></el-table-column>
      <el-table-column prop="state" label="省份"></el-table-column>
      <el-table-column prop="city" label="城市"></el-table-column>
      <el-table-column prop="accname" label="名称" width="150"></el-table-column>
      <el-table-column prop="rprecid" label="出纳收款单ID" width="100"></el-table-column>
      <el-table-column prop="rprecdtlid" label="出纳收款细单ID" width="110"></el-table-column>
      <el-table-column prop="usestatus" label="状态"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import KtButton from "@/views/Core/KtButton"
  import {dateFormat,formListFormat,formDataFormat} from "@/utils/functions"
  export default {
    name: 'Cnskcxdtl',
    components:{KtButton},
    props:{
      tableData:{type:Array},
      options:{type:Array},
      loading:{type:Boolean,default:false}
    },
    data(){
      return{
        height:480,//表格高度初始化
        currentPage:1,//分页当前页
        pageSize:10,//分页每页条数
        layout:'prev,pager,next,sizes,total',//分页初始化
        total:0,//分页总条数
        totalArray:null,//合计行
      }
    },
    methods:{
      //功能按钮方法
      handle(index,row,id){
        this.$emit('handle',{row:row,index:index,id:id});
      },
      //日期初始化方法
      dateFormat(format,date){
        return dateFormat(format,date);
      }
    }
  }
</script>
