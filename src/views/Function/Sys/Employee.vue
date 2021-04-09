<template>
  <div class="page-container">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<el-input v-model.trim="filters.employeeid" placeholder="人员ID"></el-input>
			</el-form-item>
      <el-form-item>
        <el-input v-model.trim="filters.employeename" placeholder="人员名"></el-input>
      </el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:emp:view" type="primary" @click="findPage(null)"/>
			</el-form-item>
			<!--<el-form-item>
				<kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:emp:add" type="primary" @click="handleAdd" />
			</el-form-item>-->
		</el-form>
	</div>
	<!--表格内容栏-->
	<kt-table permsEdit="sys:emp:edit" permsDelete="sys:emp:delete" permsLicense="sys:emp:license" :highlightCurrentRow="true" :stripe="false"
		:data="pageResult" :columns="columns" :showBatchDelete="false" @handleLicense="handleLicense" :height="maxHeight"
		@findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete" @dblClick="dblclick">
	</kt-table>
	<!-- </el-col> -->
	<!--新增编辑界面-->
	<el-dialog :title="operation?'新增':'编辑'" width="800px" :visible.sync="dialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="100px" inline="true" :rules="dataFormRules" ref="dataForm" :size="size">
			<el-form-item label="人员ID" prop="employeeid" v-if="operation===false" style="width:320px;">
				<el-input v-model="dataForm.employeeid" :disabled="true" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="人员名称" prop="employeename" style="width:320px;">
				<el-input v-model="dataForm.employeename" auto-complete="off"></el-input>
			</el-form-item>
      <el-form-item label="人员拼音" prop="employeepinyin" style="width:320px;">
        <el-input v-model="dataForm.employeepinyin" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="人员操作码" prop="employeeopcode" style="width:320px;">
        <el-input v-model="dataForm.employeeopcode" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex" style="width:320px;">
        <el-select v-model="dataForm.sex" auto-complete="off">
          <el-option value="1">男</el-option>
          <el-option value="2">女</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司ID" prop="companyid" style="width:320px;">
        <div style="width:80%">
        <el-input v-model="dataForm.companyid" disabled="disabled" auto-complete="off"></el-input>
        <el-button icon="el-icon-search" circle @click="openHov(companyHovData)"></el-button>
        </div>
      </el-form-item>
      <el-form-item label="公司名称" prop="companyname" style="width:320px;">
        <el-input v-model="dataForm.companyname" disabled="disabled" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="部门ID" prop="deptid" style="width:320px;">
        <div style="width:70%">
        <el-input v-model="dataForm.deptid" disabled="disabled" auto-complete="off"></el-input>
        <el-button icon="el-icon-search" circle @click="openHov(deptHovData)"></el-button>
        </div>
      </el-form-item>
      <el-form-item label="部门名称" prop="deptname" style="width:320px;">
        <el-input v-model="dataForm.deptname" disabled="disabled" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone" style="width:320px;">
        <el-input v-model="dataForm.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobilephone" style="width:320px;">
        <el-input v-model="dataForm.mobilephone" auto-complete="off"></el-input>
      </el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button :size="size" @click.native="dialogVisible = false">{{$t('action.cancel')}}</el-button>
			<el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
		</div>
	</el-dialog>
	<!--角色菜单，表格树内容栏-->
	<div class="menu-container" :v-if="true">
		<div class="menu-header">
			<span><B>人员角色授权菜单</B></span>
		</div>
		<el-tree :data="menuData" size="mini" show-checkbox node-key="roleid" :props="defaultProps"
			class="treeStyle" ref="menuTree" :render-content="renderContent"
			v-loading="menuLoading" element-loading-text="拼命加载中" :check-strictly="true"
			@check-change="handleMenuCheckChange">
		</el-tree>
		<div style="float:left;padding-left:24px;padding-top:12px;padding-bottom:4px;">
			<el-checkbox v-model="checkAll" @change="handleCheckAll"><b>全选</b></el-checkbox>
		</div>
		<div style="float:right;padding-right:15px;padding-top:4px;padding-bottom:4px;">
			<!--<kt-button :label="$t('action.reset')" perms="sys:role:reset" type="primary" @click="resetSelection"/>-->
			<kt-button :label="$t('action.delete')" perms="sys:role:roledelete" type="primary" @click="submitAuthForm" :loading="authLoading"/>
		</div>
	</div>
    <!--角色授权页面-->
    <el-dialog title="授权页面" :visible.sync="licenesStatus">
      <div class="menu-container" :v-if="true">
        <el-tree :data="licenesData" size="mini" show-checkbox node-key="roleid" :props="defaultProps"
                 style="width: 100%;height:400px;pading-top:20px;overflow: auto" ref="licenesTrees" :render-content="renderContent"
                 v-loading="menuLoading" element-loading-text="拼命加载中" :check-strictly="true"
                 @check-change="handleLicenesCheckChange">
        </el-tree>
        <div style="float:left;padding-left:24px;padding-top:12px;padding-bottom:4px;">
          <el-checkbox v-model="licenesCheckAll" @change="handleLicenesCheckAll"><b>全选</b></el-checkbox>
        </div>
        <span slot="footer" class="dialog-footer">
          	<el-button :size="size" @click.native="colseLicenes">{{$t('action.cancel')}}</el-button>
			      <el-button :size="size" type="primary" @click.native="submitLicenes" :loading="licenesEditLoading">{{$t('action.submit')}}</el-button>
        </span>
      </div>
    </el-dialog>
    <hov-tools ref="hov" v-if="hovVisible" :hov-data="hovData" @updatehov="updateHov"></hov-tools>
  </div>
</template>

<script>
import KtTable from "@/views/Core/KtTable"
import KtButton from "@/views/Core/KtButton"
import TableTreeColumn from '@/views/Core/TableTreeColumn'
import { format } from "@/utils/datetime"
import HovTools from "@/views/Core/HovTools";
export default {
	components:{
		KtTable,
		KtButton,
		TableTreeColumn,
    HovTools
	},
	data() {
		return {
			size: 'small',
			filters: {
        employeeid: null,
        employeename: null
			},
			columns: [
				{prop:"employeeid", label:"人员ID", minWidth:50},
				{prop:"employeename", label:"人员名称", minWidth:120},
		/*		{prop:"sex", label:"性别", minWidth:120},
				{prop:"mobilephone", label:"电话", minWidth:120},
				{prop:"createTime", label:"创建时间", minWidth:120, formatter:this.dateFormat}*/
				// {prop:"lastUpdateBy", label:"更新人", minWidth:100},
				// {prop:"lastUpdateTime", label:"更新时间", minWidth:120, formatter:this.dateFormat}
			],
			pageRequest: { pageNum: 1, pageSize: 10 },
			pageResult: {},
			operation: false, // true:新增, false:编辑
			dialogVisible: false, // 新增编辑界面是否显示
			editLoading: false,
			dataFormRules: {
        rolename: [
					{ required: true, message: '请输入角色名', trigger: 'blur' }
				]
			},
			// 新增编辑界面数据
			dataForm: {
        employeeid: 0,
        employeename: '',
        employeeopcode: '',
        employeepinyin: '',
        sex: '',
        companyid: '',
        companyname: '',
        deptid: '',
        deptname: '',
        phone: '',
        mobilephone: ''
			},
      hovVisible:false,
      companyHovData:{
        hovTitle:'公司查询',
        hovUrl:'customidhov/select',
        backStatus:1,
        hovColumns:
          [
            {id: 'customid', name: '背书单位ID',value:null,queryStatus:true,dataStatus:2,fillstatus:1,fillid:'companyid'},
            {id: 'customname', name: '背书单位名称',value:null,queryStatus:true,dataStatus:1,fillstatus:1,fillid:'companyname'},
          ]
      },
      deptHovData:{
        hovTitle:'部门查询',
        hovUrl:'deptidhov/select',
        backStatus:1,
        hovColumns:
          [
            {id: 'deptid', name: '背书单位ID',value:null,queryStatus:true,dataStatus:2,fillstatus:1,fillid:'deptid'},
            {id: 'deptname', name: '背书单位名称',value:null,queryStatus:true,dataStatus:1,fillstatus:1,fillid:'deptname'},
          ]
      },
      hovData:{},
			selectRole: '',
			menuData: [],
			menuSelections: [],
			menuLoading: false,
			authLoading: false,
			checkAll: false,
			currentRoleMenus: [],
			defaultProps: {
				children: 'children',
				label: 'name'
			},
      licenesStatus: false,
      licenesCheckAll:false,
      licenesLoading:false,
      licenesEditLoading:false,
      licenesData:[],
      licenesMenu:[],
      licenesRole:'',
      maxHeight:300,
      treeStyle:{
			  width:'100%',
        height:'calc(100% - 30px)',
        paddingTop:'20px',
        overflow:'auto'
      }
		}
	},
  created (){
	  this.treeStyle.height=document.documentElement.clientHeight-350;
  },
	methods: {
    colseLicenes(){
      this.licenesStatus=false;
      this.licenesData=[];
    },
		// 获取分页数据
		findPage: function (data) {
			if(data !== null) {
				this.pageRequest = data.pageRequest;
			}else{
        this.pageRequest = { pageNum: 1, pageSize: 10 }
      }
      this.pageRequest.params = {"employeeid":this.filters.employeeid,"employeename":this.filters.employeename};
			this.$api.sys.findPageEmployee(this.pageRequest).then((res) => {
				this.pageResult = res.data
			}).then(data!=null?data.callback:'')
		},
		// 角色选择改变监听
    dblclick(data){
      var that=this;
      this.menuLoading = true;
      this.$api.sys.fingEmp({userid: data.row.employeeid}).then((res) => {
        that.menuData = res.data;
        that.menuLoading = false;
        that.selectRole=data.row.employeeid;
      }).catch(res => {
        alert(res.message)
      })
    },
    handleAdd(){
      this.dialogVisible = true
      this.operation = true
      this.dataForm = {
        roleid: 0,
        rolename: '',
        remark: ''
      }
    },
    //权限删除全选
    handleCheckAll(){
      if(this.licenesCheckAll === true){
        let allMenus=[];
        this.checkAllMenu(this.menuData,allMenus);
        this.$refs.menuTree.setCheckedNodes(allMenus);
      }else{
        this.$refs.menuTree.setCheckedNodes([]);
      }
    },
    //权限删除单选
    handleMenuCheckChange(data, check, subCheck){
      if(check) {
        // 节点选中时同步选中父节点
        //let parentId = data.parentid
        //this.$refs.menuTree.setChecked(parentId, true, false)
      } else {
        // 节点取消选中时同步取消选中子节点
        if(data.children != null) {
          data.children.forEach(element => {
            this.$refs.menuTree.setChecked(element.menuid, false, false)
          });
        }
      }
    },
    //删除角色
    handleDelete(data){
      this.$api.role.batchDelete({roleid:data.row.roleid}).then((res) => {
        if(res.code === 200) {
          alert('删除成功');
          this.findPage();
        } else {
          alert('删除失败');
          return false;
        }
      }).catch(res => {
        alert(res.message)
      })
    },
    //角色修改加载
    handleEdit(data){
      return false;
      /*this.operation = false;
      this.dataForm.roleid=data.row.roleid;
      this.dataForm.rolename=data.row.rolename;
      this.dataForm.remark=data.row.remark;
      this.dialogVisible = true;*/
    },
    // 角色菜单授权表打开
    handleLicense(data){
		  this.licenesStatus = true;
      this.licenesLoading = true;
      this.licenesData=[];
      this.licenesRole=data.row.employeeid;
      this.$api.sys.fingEmpAll().then((res) => {
        this.$api.sys.fingEmp({userid: data.row.employeeid}).then((res1) => {
          let menus=[];
          let menuArray=[];
          this.checkAllMenu(res1.data,menus);
          this.checkMenu(res.data,menus,menuArray)
          this.licenesData = menuArray;
          this.$refs.licenesTrees.setCheckedKeys(menus);
          this.licenesLoading = false;
          this.licenesMenu=menus;
        }).catch(res => {
          alert(res.message)
        })
      }).catch(res => {
        alert(res.message)
      })
    },
    checkMenu (menuList,menus,routes) {
       for(var i1=0;i1<menuList.length;i1++){
         var menu={}
         menu.roleid=menuList[i1].roleid;
         menu.rolename=menuList[i1].rolename;
         menu.children = [];
         for(var j1=0;j1<menus.length;j1++){
           if(menus[j1]===menuList[i1].roleid){
             menu.disabled=true;
             break;
           }
         }
         routes.push(menu);
       }
      return routes;
     },
    // 角色菜单授权全选
    handleLicenesCheckAll(){
		  if(this.licenesCheckAll===true){
		    let allMenus=[];
        this.checkAllMenu(this.licenesData,allMenus);
        this.$refs.licenesTrees.setCheckedNodes(allMenus);
      }else{
        this.$refs.licenesTrees.setCheckedNodes([]);
      }
    },
    // 角色菜单授权单选
    handleLicenesCheckChange(data, check, subCheck){
      if(check) {
        // 节点选中时同步选中父节点
        let parentId = data.parentid
        this.$refs.licenesTrees.setChecked(parentId, true, false)
      } else {
        // 节点取消选中时同步取消选中子节点
        if(data.children != null) {
          data.children.forEach(element => {
            this.$refs.licenesTrees.setChecked(element.menuid, false, false)
          });
        }
      }
    },
    // 角色菜单授权提交
    submitLicenes() {
      let roleId = this.licenesRole
      this.licenesEditLoading = true
      let checkedNodes = this.$refs.licenesTrees.getCheckedNodes(false, true)
      let roleMenus = []
      for(let i=0, len=checkedNodes.length; i<len; i++) {
          let roleMenu = { userid:roleId, roleid:checkedNodes[i].roleid,create_by:sessionStorage.getItem("userid"),last_update_by: sessionStorage.getItem("userid")}
          roleMenus.push(roleMenu)
      }
      let list = roleMenus.filter(items => {
        if (!this.licenesMenu.includes(items.roleid)) return items;
      })
      this.$api.sys.saveEmp(list).then((res) => {
        if(res.code === 200) {
          alert("授权成功");
          this.licenesMenu=[];
          this.licenesStatus=false;
        } else {
          alert('授权失败');
          return;
        }
        this.licenesEditLoading = false
      }).catch(res => {
        alert(res.message)
      })
    },
		// 递归全选
		checkAllMenu(menuData, allMenus) {
      menuData.forEach(menu => {
        allMenus.push(menu.roleid)
        if(menu.children) {
          this.checkAllMenu(menu.children, allMenus)
        }
      });
		},
    //授权加载
		renderContent(h, { node, data, store }) {
      console.log(data)
			return (
			  <div class="column-container">
				<span style="text-algin:center;margin-right:80px;font-size:12px;width:100px;float:left;line-height:35px;">{data.rolename}</span>
			</div>
      );
    },
    resetSelection(){},
    //权限删除
    submitAuthForm(){
      let roleId = this.selectRole
      this.authLoading = true
      let checkedNodes = this.$refs.menuTree.getCheckedNodes(false, false)
      let roleMenus = []
      for(let i=0, len=checkedNodes.length; i<len; i++) {
        let roleMenu = { userid:roleId, roleid:checkedNodes[i].roleid }
        roleMenus.push(roleMenu)
      }
      this.$api.sys.deleteEmp(roleMenus).then((res) => {
        if(res.code === 200) {
          alert("删除成功");
          roleMenus.forEach(e => {
            this.$refs.menuTree.remove(e.roleid);
          })
        }
        this.authLoading = false
      }).catch(res => {
        alert(res.message)
      })
    },
    //添加或者修改提交
    submitForm(){
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            //this.editLoading = true
            if(this.operation===true){
              let params = Object.assign({}, this.dataForm)
              this.$api.role.save(params).then((res) => {
                this.editLoading = false
                if(res.code === 200) {
                  alert('保存成功');
                  this.dialogVisible = false
                  this.$refs['dataForm'].resetFields()
                } else {
                  alert('保存失败');
                  return;
                }
                this.findPage(null)
              }).catch(res => {
                alert(res.message)
              })
            }else if(this.operation === false){
              let params = Object.assign({}, this.dataForm)
              this.$api.role.update(params).then((res) => {
                this.editLoading = false
                if(res.code === 200) {
                  alert('修改成功');
                  this.dialogVisible = false
                  this.$refs['dataForm'].resetFields()
                } else {
                  alert('修改失败');
                  return;
                }
                this.findPage(null)
              }).catch(res => {
                alert(res.message)
              })
            }
          })
        }
      })
    },
		// 时间格式化
    dateFormat(row, column, cellValue, index){
      return format(row[column.property])
    },
    openHov(data){
      this.hovData = data;
      this.$refs.hov.dialogVisible=true;
    },
    updateHov(data){
      for(var i=0;i<data.length;i++){
        this.dataForm[data[i].id]=data[i].value;
      }
    }
	},
	mounted() {
	}
}
</script>
<style scoped>
.menu-container {
	margin-top: 10px;
}
.menu-header {
	padding-left: 8px;
	padding-bottom: 5px;
	text-align: left;
	font-size: 16px;
	color: rgb(20, 89, 121);

}
  .treeStyle{width:100%;padding-top:20px;}
</style>
