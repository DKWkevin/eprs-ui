<template>
  <div class="page-container" style="width:100%;height:100%;overflow: auto">
	<!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<el-input v-model="filters.name" placeholder="角色名"></el-input>
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:role:view" type="primary" @click="findPage(null)"/>
			</el-form-item>
			<el-form-item>
				<kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:role:add" type="primary" @click="handleAdd" />
			</el-form-item>
		</el-form>
	</div>
	<!--表格内容栏-->
	<kt-table permsEdit="sys:role:edit" permsDelete="sys:role:delete" permsLicense="sys:role:license" :highlightCurrentRow="true" :stripe="false"
		:data="pageResult" :columns="columns" :showBatchDelete="false" @handleLicense="handleLicense"
		@findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete" @dblClick="dblclick">
	</kt-table>
	<!-- </el-col> -->
	<!--新增编辑界面-->
	<el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
			<el-form-item label="ID" prop="roleid" v-if="operation===false">
				<el-input v-model="dataForm.roleid" :disabled="true" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="角色名" prop="rolename">
				<el-input v-model="dataForm.rolename" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="备注 " prop="remark">
				<el-input v-model="dataForm.remark" auto-complete="off" type="textarea"></el-input>
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
			<span><B>角色授权菜单</B></span>
		</div>
		<el-tree :data="menuData" size="mini" show-checkbox node-key="menuid" :props="defaultProps"
			style="width: 100%;height:400px;pading-top:20px;overflow: auto" ref="menuTree" :render-content="renderContent"
			v-loading="menuLoading" element-loading-text="拼命加载中" :check-strictly="true"
			@check-change="handleMenuCheckChange">
		</el-tree>
		<div style="float:left;padding-left:24px;padding-top:12px;padding-bottom:4px;">
			<el-checkbox v-model="checkAll" @change="handleCheckAll" :disabled="this.selectRole.id == null"><b>全选</b></el-checkbox>
		</div>
		<div style="float:right;padding-right:15px;padding-top:4px;padding-bottom:4px;">
			<kt-button :label="$t('action.reset')" perms="sys:role:reset" type="primary" @click="resetSelection"/>
			<kt-button :label="$t('action.delete')" perms="sys:role:roledelete" type="primary" @click="submitAuthForm" :loading="authLoading"/>
		</div>
	</div>
    <!--角色授权页面-->
    <el-dialog title="授权页面" :visible.sync="licenesStatus">
      <div class="menu-container" :v-if="true">
        <el-tree :data="licenesData" size="mini" show-checkbox node-key="menuid" :props="defaultProps"
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
  </div>
</template>

<script>
import KtTable from "@/views/Core/KtTable"
import KtButton from "@/views/Core/KtButton"
import TableTreeColumn from '@/views/Core/TableTreeColumn'
import { format } from "@/utils/datetime"
export default {
	components:{
		KtTable,
		KtButton,
		TableTreeColumn
	},
	data() {
		return {
			size: 'small',
			filters: {
				name: ''
			},
			columns: [
				{prop:"roleid", label:"ID", minWidth:50},
				{prop:"rolename", label:"角色名", minWidth:120},
				{prop:"remark", label:"备注", minWidth:120},
				{prop:"createBy", label:"创建人", minWidth:120},
				{prop:"createTime", label:"创建时间", minWidth:120, formatter:this.dateFormat}
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
				roleid: 0,
				rolename: '',
				remark: ''
			},
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
      listTitle:'111',
      list:[
        {type:'1-2',id:'id',label:'角色ID',clearable: true},
        {type:'1-1',id:'name',label:'角色名',clearable: true},
        {type:'1-1',id:'memo',label:'备注',clearable: true}
      ]
		}
	},
	methods: {
    colseLicenes(){
      this.licenesStatus=false;
      this.licenesData=[];
    },
		// 获取分页数据
		findPage: function (data) {
      console.log(data)
			if(data !== null) {
				this.pageRequest = data.pageRequest
			}else{
        this.pageRequest={ pageNum: 1, pageSize: 10 };
      }
			this.pageRequest.params = {"rolename":this.filters.name}
			this.$api.role.findPage(this.pageRequest).then((res) => {
				this.pageResult = res.data
				//this.findTreeData()
			}).then(data!=null?data.callback:'')
		},
		// 角色选择改变监听
    dblclick(data){
      var that=this;
      this.menuLoading = true;
      this.$api.role.findRoleMenus({roleid: data.row.roleid}).then((res) => {
        that.menuData = res.data;
        that.menuLoading = false;
        that.selectRole=data.row.roleid;
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
      if(this.licenesCheckAll==true){
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
      this.$api.role.batchDelete({roleid:data.row.roleid,userid:Number(sessionStorage.getItem("userid"))}).then((res) => {
        if(res.code == 200) {
          alert('删除成功');
          this.findPage(null);
        } else {
          alert('删除失败');
          return;
        }
      })
    },
    //角色修改加载
    handleEdit(data){
      this.dialogVisible = true;
      this.operation = false;
      this.dataForm.roleid=data.row.roleid;
      this.dataForm.rolename=data.row.rolename;
      this.dataForm.remark=data.row.remark;
    },
    // 角色菜单授权表打开
    handleLicense(data){
		  this.licenesStatus = true;
      this.licenesLoading = true;
      this.licenesData=[];
      this.licenesRole=data.row.roleid;
      this.$api.role.findMenuTree({'userid':null}).then((res) => {
        this.$api.role.findRoleMenus({roleid: data.row.roleid}).then((res1) => {
          let menus=[];
          let menuArray=[];
          this.checkAllMenu(res1.data,menus);
          this.checkMenu(res.data,menus,menuArray)
          this.licenesData = menuArray;
          this.$refs.licenesTrees.setCheckedKeys(menus);
          this.licenesLoading = false;
          this.licenesMenu=menus;
        })
      })
    },
    checkMenu (menuList,menus,routes) {
       for(var i1=0;i1<menuList.length;i1++){
         var menu={}
         menu.menuid=menuList[i1].menuid;
         menu.menuname=menuList[i1].menuname;
         menu.menutype=menuList[i1].menutype;
         menu.children = [];
         for(let j=0;j<menus.length;j++){
           if(menus[j]==menuList[i1].menuid){
             menu.disabled=true;
             break;
           }
         }
         if(menuList[i1].children&&menuList[i1].children.length>0){
           var i1children=menuList[i1].children;
           for(var i2=0;i2<i1children.length;i2++) {
             var menu2 = {}
             menu2.menuid = i1children[i2].menuid;
             menu2.menuname = i1children[i2].menuname;
             menu2.menutype = i1children[i2].menutype;
             menu2.children = [];
             for (var j2 = 0; j2 < menus.length; j2++) {
               if (menus[j2] == i1children[i2].menuid) {
                 menu2.disabled = true;
                 break;
               }
             }
             if(i1children[i2].children&&i1children[i2].children.length>0){
               var i2children=i1children[i2].children;
               for(var i3=0;i3<i2children.length;i3++) {
                 var menu3 = {}
                 menu3.menuid = i2children[i3].menuid;
                 menu3.menuname = i2children[i3].menuname;
                 menu3.menutype = i2children[i3].menutype;
                 menu3.children = [];
                 for (var j3 = 0; j3 < menus.length; j3++) {
                   if (menus[j3] == i2children[i3].menuid) {
                     menu3.disabled = true;
                     break;
                   }
                 }
                 menu2.children.push(menu3);
               }
             }
             menu.children.push(menu2);
           }
         }
         routes.push(menu);
       }
      return routes;
     },
    // 角色菜单授权全选
    handleLicenesCheckAll(){
		  if(this.licenesCheckAll==true){
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
          let roleMenu = { roleid:roleId, menuid:checkedNodes[i].menuid,userid:sessionStorage.getItem("userid") }
          roleMenus.push(roleMenu)
      }
      let list = roleMenus.filter(items => {
        if (!this.licenesMenu.includes(items.menuid)) return items;
      })
      this.$api.role.saveRoleMenus(list).then((res) => {
        if(res.code === 200) {
          alert("操作成功");
          this.licenesMenu=[];
          this.licenesStatus=false;
          this.licenesEditLoading = false
        } else {
          alert('操作失败');
          this.licenesEditLoading = false
          return false;
        }
      })
    },
		// 递归全选
		checkAllMenu(menuData, allMenus) {
      menuData.forEach(menu => {
        allMenus.push(menu.menuid)
        if(menu.children) {
          this.checkAllMenu(menu.children, allMenus)
        }
      });
		},
    //授权加载
		renderContent(h, { node, data, store }) {
			return (
			  <div class="column-container">
				<span style="text-algin:center;margin-right:80px;font-size:12px;width:100px;float:left;line-height:35px;">{data.menuname}</span>
				<span style="text-algin:center;margin-right:80px;font-size:12px;line-height:30px;">
					<el-tag type={data.menutype === 0?'':data.menutype === 1?'success':'info'} size="small">
						{data.menutype === 0?'目录':data.menutype === 1?'菜单':'按钮'}
					</el-tag>
				</span>
				<span style="text-algin:center;margin-right:80px;"><i class={data.icon}></i></span>
				<span style="text-algin:center;margin-right:80px;">{data.url?data.url:'\t'}</span>
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
        let roleMenu = { roleid:roleId, menuid:checkedNodes[i].menuid,menutype:checkedNodes[i].menutype }
        roleMenus.push(roleMenu)
      }
      this.$api.role.delRoleMenus(roleMenus).then((res) => {
        if(res.code === 200) {
          alert("删除成功");
          roleMenus.forEach(e => {
            this.$refs.menuTree.remove(e.menuid);
          });
          this.authLoading = false
        } else {
          alert('删除失败');

          this.authLoading = false
          return false;
        }

      })
    },
    submitForm(){
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            //this.editLoading = true
            if(this.operation===true){
              this.dataForm.userid=Number(sessionStorage.getItem("userid"));
              this.dataForm.delFlag=1;
              let params = Object.assign({}, this.dataForm)
              this.$api.role.save(params).then((res) => {
                this.editLoading = false;
                if(res.code === 200) {
                  alert('保存成功');
                  this.dialogVisible = false;
                  this.$refs['dataForm'].resetFields()
                } else {
                  alert('保存失败');
                  return;
                }
                this.findPage(null)
              })
            }else if(this.operation===false){
              this.dataForm.userid=Number(sessionStorage.getItem("userid"));
              let params = Object.assign({}, this.dataForm)
              this.$api.role.update(params).then((res) => {
                this.editLoading = false;
                if(res.code === 200) {
                  alert('修改成功');
                  this.dialogVisible = false;
                  this.$refs['dataForm'].resetFields()
                } else {
                  alert('修改失败');
                  return;
                }
                this.findPage(null)
              })
            }
          })
        }
      })
    },
		// 时间格式化
  dateFormat(row, column, cellValue, index){
     return format(row[column.property])
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
</style>
