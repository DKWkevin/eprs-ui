<template>
<div>
  <div style="float:left;">
    <el-form :inline="true" :model="toolbar" :size="size">
      <el-form-item prop="menuid">
        <el-input v-model="toolbar.menuid" placeholder="菜单ID"></el-input>
      </el-form-item>
      <el-form-item prop="menuname">
        <el-input v-model="toolbar.menuname" placeholder="菜单名称"></el-input>
      </el-form-item>
      <el-form-item>
        <kt-button icon="fa fa-search" :label="$t('action.search')" type="primary" perms="sys:menu:view" @click="findPage(null)"></kt-button>
      </el-form-item>
      <el-form-item>
        <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:menu:add" type="primary" @click="handleAdd"></kt-button>
      </el-form-item>
    </el-form>
  </div>
  <el-table :data="tableData" id="eltables">
    <el-table-column  label="菜单ID" prop="menuid" width="80"></el-table-column>
    <el-table-column  label="菜单名称" prop="menuname"></el-table-column>
    <el-table-column  label="类型" prop="menutype" width="100">
      <template slot-scope="scope">
        <el-tag v-if="scope.row.menutype ===0">目录</el-tag>
        <el-tag v-if="scope.row.menutype ===1" type="success">菜单</el-tag>
        <el-tag v-if="scope.row.menutype ===2" type="info">按钮</el-tag>
      </template>
    </el-table-column>
    <el-table-column  label="上级菜单ID" prop="parentid" width="150"></el-table-column>
    <el-table-column  label="访问URL" prop="url"></el-table-column>
    <el-table-column  label="授权字符" prop="perms"></el-table-column>
    <el-table-column  label="删除标志" prop="delflag" width="150"></el-table-column>
    <el-table-column label="操作">
      <template  slot-scope="scope">
        <kt-button :label="$t('action.edit')" type="primary" perms="sys:menu:edit" @click="updateDocQuery(scope.row)"></kt-button>
        <kt-button :label="$t('action.delete')" type="primary" perms="sys:menu:delete" @click="deleteDoc(scope.$index,scope.row)"></kt-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    samll
    align="center"
    :current-page="currentPage"
    :page-size="pagesize"
    :total="totalResult"
    layout="prev, pager, next"
    @current-change="handlePageChange"
    @size-change="handleSizeChange"
    @prev-click="handlePageChange"
    @next-click="handlePageChange"
  >
  </el-pagination>
  <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" :close-on-click-modal="false" width="500px" :modal="false" :show-close="false">
    <el-form :model="addDialogData" :label-position="position" label-width="100px">
      <el-form-item label="菜单类型" prop="menutype">
        <el-radio-group  v-model="addDialogData.menutype">
          <el-radio v-for="(type, index) in typeList" :label="index" :key="index">{{type}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="typeList[addDialogData.menutype]+ '名称'" prop="menuname">
        <el-input  v-model="addDialogData.menuname"></el-input>
      </el-form-item>
      <el-form-item v-if="addDialogData.menutype !== 0" label="上级菜单ID" prop="parentid">
        <el-input v-model="addDialogData.parentid" style="width:90%;"></el-input>
        <el-button icon="el-icon-search" circle @click="openHov(hovData)"></el-button>
      </el-form-item>
      <el-form-item v-if="addDialogData.menutype === 1" label="访问URL" prop="url">
        <el-input v-model="addDialogData.url"></el-input>
      </el-form-item>
      <el-form-item v-if="addDialogData.menutype !== 0" label="授权字符" prop="perms">
        <el-input v-model="addDialogData.perms"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标路径" prop="icon">
        <el-input v-model="addDialogData.icon"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addDoc" v-if="dialogStatus==='add'">{{$t('action.submit')}}</el-button>
        <el-button type="primary" @click="updateDoc" v-if="dialogStatus==='update'">{{$t('action.submit')}}</el-button>
        <el-button type="info" @click="closeDialog">{{$t('action.cancel')}}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <hov-tools ref="hov" v-if="hovVisible" :hov-data="hovData"></hov-tools>
</div>
</template>
<script>
import KtButton from "@/views/Core/KtButton"
import KtTable from "@/views/Core/KtTable"
import HovTools from "@/views/Core/HovTools";
export default {
  components:{KtButton, KtTable,HovTools},
  data () {
    return {
      toolbar: {"menuid":"","menuname":""},
      size: 'small',
      tablePage: {pageNum:1, pageSize: 10},
      tableData: [],
      dialogVisible: false,
      dialogTitle: '',
      position: 'right',
      typeList: ['目录','菜单','按钮'],
      dialogStatus: '',
      addDialogData: {
        'menuid': null,
        'menutype': 0,
        'menuname': null,
        'parentid': 0,
        'url': null,
        'perms': null,
        'icon': null
      },
      hovVisible:false,
      hovData:{
        hovTitle:'上级查询',
        hovUrl:'/menu/select',
        afterStatus: false,
        fillDataName: "addDialogData",
        parentVisible:'hovVisible',
        hovColumns:
          [
            {id: 'menuid', name: '上级菜单ID',value:null,queryStatus:true,dataStatus:2,fillstatus:1,fillid:'parentid'},
            {id: 'menuname', name: '上级菜单名称',value:null,queryStatus:true,dataStatus:1,fillstatus:2},
            {id: 'menutype', name: '菜单类型',value:null,queryStatus:false,dataStatus:1,fillstatus:2,disabled:true}
          ]
      },
      currentPage:1,
      pagesize:10,
      totalResult:null
    }
  },
  methods: {
    addDoc () {
      this.addDialogData.createBy=sessionStorage.getItem('userid');
      this.addDialogData.lastUpdateBy=sessionStorage.getItem('userid');
      this.addDialogData.delflag=1;
      this.$api.menu.save(this.addDialogData).then(res => {
        if(res.code===200){
          alert("保存成功");
          this.dialogVisible=false;
          this.findPage(null);
        }else{
          alert(res.msg);
          return false;
        }
      }).then(err => {
        console.log(err);
      })
    },
    closeDialog(){
      var keys=Object.keys(this.addDialogData);
      for(var i=0;i<keys.length;i++){
        this.addDialogData[keys[i]]=null;
      }
      this.addDialogData.menutype=0;
      this.dialogVisible=false;
    },
    deleteDoc(index,row){
      this.$api.menu.deleteDoc({menuid:row.menuid}).then(res => {
        if(res.code===200){
          alert("删除成功");
          this.tableData.splice(index, 1);
        }else {
          alert("删除失败");
          return false;
        }
      })
    },
    findPage (data) {
      this.tableData =[];
      this.currentPage=1;
      this.$api.menu.query({pageNum:this.currentPage,pageSize:this.pagesize,params:this.toolbar}).then(res => {
        this.tableData = res.data.content;
        this.currentPage=res.data.pageNum;
        this.pageSize=res.data.pageSize;
        this.totalResult=res.data.totalSize;
      })
    },
    handlePageChange (data){
      this.tableData =[];
      this.$api.menu.query({pageNum:data,pageSize:this.pagesize,params:this.toolbar}).then(res => {
        this.tableData = res.data.content;
        this.currentPage=res.data.pageNum;
        this.pageSize=res.data.pageSize;
        this.totalResult=res.data.totalSize;
      })
    },
    handleSizeChange(data){
      this.tableData =[];
      this.$api.menu.query({pageNum:this.currentPage,pageSize:data,params:this.toolbar}).then(res => {
        this.tableData = res.data.content;
        this.currentPage=res.data.pageNum;
        this.pageSize=res.data.pageSize;
        this.totalResult=res.data.totalSize;
      })
    },
    handleAdd(){
      this.dialogStatus='add';
      this.dialogTitle = '新增表单';
      this.addDialogData={
        'menuid': null,
          'menutype': 0,
          'menuname': null,
          'parentid': 0,
          'url': null,
          'perms': null,
          'icon': null
      }
      this.dialogVisible = true;
    },
    updateDocQuery(row){
      var keys=Object.keys(this.addDialogData);
      for(var i=0;i<keys.length;i++){
        this.addDialogData[keys[i]]=row[keys[i]];
      }
      this.dialogTitle = '修改表单';
      this.dialogStatus='update';
      this.dialogVisible = true;
    },
    updateDoc(){
      this.addDialogData.lastUpdateBy=sessionStorage.getItem('userid');
      this.$api.menu.update(this.addDialogData).then(res => {
        if(res.code==200){
          alert("修改成功");
          this.dialogVisible=false;
          this.findPage(null);
        }else{
          alert(res.msg);
          return;
        }
      })
    },
    openHov(data){
      if(this.addDialogData.menutype==1){
        data.hovColumns[2].value=0;
      }else if(this.addDialogData.menutype==2){
        data.hovColumns[2].value=1;
      }
      this.hovData = data;
      this.hovVisible=true;
    }
  }
}
</script>
<style>
  .el-table .el-table__body .el-table__expanded-cell{padding:0}
</style>
