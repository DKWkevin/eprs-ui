<template>
<div class="dqfzBox">
  <div class="leftNav">
    <el-menu>
      <el-submenu  v-for="term in navList" :index="term.groupid" :key="term.groupid" :id="term.groupid">
        <template slot="title">
          <span>{{term.groupname}}</span>
        </template>
        <el-menu-item v-for="childs in term.children" :key="childs.id" :index="childs.id" @click="clickThis(childs.id,childs.type,term.groupid)">
          {{childs.name}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
  <div class="content" ref="content">
    <div style="width:100%;height:30px;margin:5px;">
      <kt-button v-for="item in btnOptions" :key="item.id" :icon="item.icon" :label="$t(item.label)" :perms="item.perms" type="primary" :loading="item.loading" style="float:left;" @click="handle(item.id)" />
    </div>
    <e-table
      ref="doctable"
      :table-columns="tableColumns"
      :table-data="tableData"
      :table-height="height"
      :loading="loading"
      :page-status="false"
      :searchStatus="true"
      :table-width-status="tableWidthStatus"
      :placeHolder="placeHolder"
      @selectionChange="selectionChange"
    ></e-table>
  </div>
  <dqfz-dtl v-if="dqfzDtlVisible" :city-options="cityOptions" :group-options="groupOptions" :dtltype="dtltype" :dtlData="dtlData"></dqfz-dtl>
</div>
</template>

<script>
import EQuery from "@/views/Core/EQuery";
import ETable from "@/views/Core/ETable";
import DqfzDtl from "@/views/Function/Area/DqfzDtl";
import KtButton from "@/views/Core/KtButton"
export default {
  name: 'Dqfz',
  components:{DqfzDtl, ETable, EQuery,KtButton},
  data(){
    return {
      navList:[],
      btnOptions:[
        {id:"addFZ",icon:"fa fa-plus",label:"action.addFZ",perms:'region:dqtjfz:add'},
        {id:"addto",icon:"fa fa-plus",label:"action.addto",perms:'region:dqtjfz:add'},
        {id:"deleteTo",icon:"fa fa-trash",label:"action.deleteTo",perms:'region:dqtjfz:delete'},
        {id:"deleteToDtl",icon:"fa fa-trash",label:"action.deleteToDtl",perms:'region:dqtjfz:delete'}
      ],
      tableColumns:[
        {indexType:"selection", width:60},
        {prop: 'counterid', label: '门店ID',type:0,tableStatus:0,sortable:true,sortMethod:function(a,b){var N1=Number(a.counterid);var N2=Number(b.counterid);return N1<N2?-1:N1>N2?1:0;}},
        {prop: 'countername', label: '门店名称',type:0,tableStatus:0,sortable:true},
        {prop: 'counteropcode', label: '门店操作码',type:0,tableStatus:0,sortable:true},
        {prop: 'subcityname', label: '市区名称',type:0,tableStatus:0,sortable:true},
        {prop: 'storeaddress', label: '门店地址',type:0,tableStatus:0,sortable:true}
      ],
      tableData:[],
      height:0,
      dqfzDtlVisible:false,
      cityOptions:[],
      groupOptions:[],
      cityid:null,
      deleteId:null,
      loading:false,
      dtltype:0,
      dtlData:{},
      sessions:[],
      tableWidthStatus:false,
      placeHolder:'门店ID、名称、操作码'
    }
  },
  created() {
    this.height=(window.innerHeight-230);
    this.queryNavList();
  },
  methods:{
    clickThis(id,type,cityid){
      const companyid=Number(sessionStorage.getItem("companyid"));
      let selectcompanyid=0;
      if(companyid===67949||companyid===39725){
        selectcompanyid=companyid
      }else {
        selectcompanyid=19940;
      }
      this.tableData=[];
      if(id==="wfp"&&type===1){
        this.cityid=cityid;
        this.deleteId=null;
        this.loading=true;
        this.$api.hov.selectCounter({selectcompanyid:selectcompanyid,cityid:Number(cityid)}).then(res => {
          if(res.code===200){
            this.tableData=res.data;
            this.loading=false;
          }
        }).catch(error => {
          this.loading=false;
          return false;
        })
      }else{
        this.cityid=cityid;
        this.deleteId=id;
        this.loading=true;
        this.$api.area.selectDqfzDtl({selectcompanyid:selectcompanyid,groupid:Number(id)}).then(res => {
          if(res.code===200){
            this.tableData=res.data;
            this.loading=false;
          }
        }).catch(error => {
          this.loading=false;
          return false;
        })
      }
    },
    handle(data){
      if(data==="addFZ"){
        this.dqfzDtlVisible=true;
        this.dtltype=1;
      }else if(data==="addto"){
        let selections=this.sessions;
        let counterids=[];
        selections.forEach(e => {
          counterids.push(e.counterid);
        });
        if(counterids.length===0){
          alert("请选择门店");
          return false;
        }
        this.dtlData.counterid=counterids;
        this.dtlData.cityid=this.cityid;
        this.dqfzDtlVisible=true;
        this.dtltype=2;
      }else if(data==="deleteTo"){
        if(this.deleteId===null){
          alert("不可删除分组");
          return false;
        }
        let com=confirm("是否删除分组");
        if(com===true){
          this.$api.area.deleteDqfzDoc(this.deleteId).then(res => {
            if(res.code===200){
              alert("删除成功");
              this.navList=[];
              this.cityOptions=[];
              this.groupOptions=[];
              this.queryNavList();
              this.tableData=[];
            }
          }).catch(error => {
            return false;
          })
        }
      }else if(data==="deleteToDtl"){
        if(this.deleteId===null){
          alert("不可删除门店");
          return false;
        }
        let selections=this.sessions;
        if(selections.length===0) {
          alert("请选择门店");
          return false;
        }
        let counterids=[];
        selections.forEach(e => {
          let tel={};
          tel.groupid=this.deleteId;
          tel.counterid=e.counterid;
          counterids.push(tel)
        });
        let com=confirm("是否删除门店");
        if(com===true){
          this.$api.area.delDqfzDtl({data:counterids}).then(res => {
            if(res.code===200){
              alert("删除成功");
              this.clickThis(this.deleteId,1,this.cityid);
            }
          }).catch(error => {
            return false;
          })
        }
      }
    },
    queryNavList(){
      this.$api.area.selectDqfzCounter(Number(sessionStorage.getItem("companyid"))).then(res =>{
        if(res.code===200){
          res.data.forEach(e=>{
            let tel={};
            tel.groupid=e.cityid.toString();
            tel.groupname=e.cityname;
            tel.children=[];
            this.cityOptions.push({value:e.cityid,label:e.cityname});
            e.pskctjfzlst.forEach(es => {
              let tels={};
              tels.type=1;
              tels.id=es.groupid.toString();
              tels.name=es.groupid.toString()+"-"+es.groupname;
              tel.children.push(tels);
              this.groupOptions.push({value: es.groupid, label:es.groupname});
            });
            tel.children.push({type:1,id:'wfp',name:'未分配'});
            this.navList.push(tel);
          })
        }
      }).catch(error => {
        return false;
      })
    },
    selectionChange(val){
      this.sessions=val;
    }
  }
}
</script>

<style scoped>
.dqfzBox{width:96%;height:98%;border:2px solid #ccc;margin:0 2%;border-radius:3px;}
.leftNav{width:260px;height:100%;border-right:1px solid #ccc;float:left;position:relative;}
.content{width:calc(100% - 262px);height:100%;float:left;}
.content .distoolbar{margin-top:10px;padding: 0 10px}
</style>
