<template>
<div>
  <div class="titleDiv">
    <div class="title">{{functionName}}</div>
    <div class="titleButtonDiv"><el-button type="primary" @click="addOpen">新增</el-button></div>
  </div>
  <div class="formDiv">
    <el-form :model="queryForm" class="formQuery" label-width="60px" :inline="true" style="width: 300px;">
      <el-form-item label="功能ID">
        <el-input v-model="queryForm.functionid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleFunction">查询</el-button>
        <el-button type="info" @click="reloadFunction">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div>
    <el-table :height="docHeight" border>
      <el-table-column prop="functionid" label="功能ID"></el-table-column>
      <el-table-column prop="functionname" label="功能名称"></el-table-column>
      <el-table-column prop="projectname" label="项目名称"></el-table-column>
      <el-table-column prop="functioncode" label="功能编号"></el-table-column>
      <el-table-column prop="usestatus" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.usestatus === 0">作废</span>
          <span v-else-if="scope.row.usestatus === 1">正常</span>
          <span v-else>状态无</span>
        </template>
      </el-table-column>
      <el-table-column prop="functionid" label="操作">
        <template slot-scope="scope">
          <el-link v-if="scope.row.usestatus === 1" @click = "updateOpen(scope.row, scope.index)">修改</el-link>
          <el-link v-if="scope.row.usestatus === 1" @click = "delForm(scope.row, scope.index)">作废</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes='[50,100,300,500,1000]'
      :total="total"
      layout="prev, pager, next, sizes, total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      @prev-click="handleCurrentChange"
      @next-click="handleCurrentChange"
    ></el-pagination>
  </div>
  <fixed :status="dialogStatus" :dialog-title="dialogTitle" @dialogClose="dialogClose">
    <el-form :model="dtlForm" label-width="100px" style="width:300px;margin:5px auto;">
      <el-form-item v-if="dtlStatus === true" label="功能ID">
        <el-input v-model="dtlForm.functionid"></el-input>
      </el-form-item>
      <el-form-item label="功能名称">
        <el-input v-model="dtlForm.functionname"></el-input>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="dtlForm.projectname"></el-input>
      </el-form-item>
      <el-form-item label="功能编号">
        <el-input v-model="dtlForm.functioncode"></el-input>
      </el-form-item>
      <el-form-item label="URL">
        <el-input v-model="dtlForm.url"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dtlStatus === false?insertForm:updateForm">提交</el-button>
        <el-button type="info" @click="dialogClose">取消</el-button>
      </el-form-item>
    </el-form>
  </fixed>
</div>
</template>

<script>
import EQuery from "./Core/EQuery";
export default {
  name: 'Test',
  components: {EQuery},
  // components:{'fixed':EDialog},
  data(){
    return {
      formList:[],
      btnOptions:[
        {id:'upload',label:'a1',perms:'region:cxfacx:select'}
      ],
      functionName:'功能定义',
      queryForm:{
        functionid:null
      },
      currentPage:1,
      pageSize:10,
      total:0,
      dialogStatus:true,
      dtlStatus:false,
      dtlIndex:0,
      dialogTitle:'',
      dtlForm:{
        functionid:null,
        functionname:null,
        projectname:null,
        functioncode:null,
        url:null
      }
    }
  },
  computed:{
    docHeight: () => { return window.innerHeight - 300}
  },
  methods:{
    sss(e){
      console.log(e)
    },
    handleFunction(){
      this.selectDoc(this.currentPage, this.pageSize);
    },
    //分页
    handleCurrentChange(value){
      this.selectDoc(value, this.pageSize);
    },
    handleSizeChange(value){
      this.selectDoc(this.currentPage, value);
    },
    //查询表单
    selectDoc(pageNum, pageSize){

    },
    reloadFunction(){
      this.formIsNull(this.queryForm);
    },
    // 新增表单加载
    addOpen(){
      this.dialogTitle = '新增功能';
      this.dtlStatus = false;
      this.dialogStatus = true;
    },
    // 提交新增表单
    insertForm(){

    },
    //修改表单加载
    updateOpen(row, index){
      this.dialogTitle = '修改功能';
      this.dtlStatus = true;
      this.dtlIndex = index;
      Object.keys(this.dtlForm).forEach(item => {
        this.dtlForm[item] = row[item];
      });
      this.dialogStatus = true;
    },
    // 提交修改表单
    updateForm(){

    },
    // 作废表单
    delForm(row, index){},
    // 关闭表单
    dialogClose(){
      this.formIsNull(this.dtlForm);
      this.dialogTitle = '';
      this.dtlStatus = false;
      this.dtlIndex = 0;
      this.dialogStatus = false;
    },
    formIsNull(data){
      Object.keys(data).forEach(item => {
        data[item] = null;
      });
    }
  }
}
</script>

<style>
.titleDiv{width:100%;height:30px;background: #fafafa;padding: 5px 0;border-bottom: 1px solid #ccc;}
.title{float:left;font-size:14px;font-weight: bold;line-height:30px;margin-left:5px;}
.titleButtonDiv{float:right}
.formDiv{
  margin-top:10px;
  width:100%;
  min-height:30px;
}
.formDiv .formQuery{
  margin:0 auto;
}
.formQuery .el-form-item{
  margin: 0 0 5px 0;
}
</style>
