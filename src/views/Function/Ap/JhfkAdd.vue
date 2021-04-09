<template>
<div class="dwjvxxgl">
  <el-dialog :visible.sync="dialogVisible" :title="docTitle" :width="dialogWidth" :top="dialogTop" :destroy-on-close="true" @close="docClose" :close-on-click-modal="false">
        <el-form :label-width="baseLabelWidth">
          <el-form-item label="公司ID" style="width:260px;float:left;">
            <el-input v-model="base.companyid" :disabled="true" style="width:160px"></el-input>
          </el-form-item>
          <el-form-item label="公司名称" style="width:440px;float:left;">
            <el-input v-model="base.companyname" style="width:340px"></el-input>
          </el-form-item>
          <el-form-item label="供应商ID" style="width:260px;float:left;">
            <el-input v-model="base.supplyid" style="width:160px"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" style="width:260px;float:left;">
            <el-input v-model="base.supplyname" style="width:160px" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="付款类型" style="width:260px;clear:both;float:left">
            <el-select v-model.number="base.paytypeid" style="width:160px">
              <el-option :value="1" label="预付"></el-option>
              <el-option :value="2" label="冲应付"></el-option>
              <el-option :value="3" label="分公司"></el-option>
              <el-option :value="4" label="部门"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="源单类型" style="width:220px;float:left">
            <el-input v-model="base.sourcetype" style="width:160px" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="源单ID" style="width:220px;float:left">
            <el-input v-model.number="base.sourceid"  style="width:120px"></el-input>
          </el-form-item>
          <el-form-item label="金额" style="width:260px;float:left">
            <el-select v-model.number="base.total" style="width:160px;"></el-select>
          </el-form-item>
          <el-form-item label="上级单位ID" style="width:260px;float:left">
            <el-input v-model="base.parentcompanyid" style="width:110px;" :disabled="true"></el-input>
            <el-button icon="el-icon-search" circle @click="openHov('parentcompanyid')"></el-button>
          </el-form-item>
          <el-form-item label="上级单位名称" style="width:440px;float:left">
            <el-input v-model="base.parentcompanyname" :disabled="true" style="width:340px"></el-input>
          </el-form-item>
          <el-form-item label="地区" style="width:260px;float:left">
            <el-input v-model="base.area" style="width:160px;"></el-input>
          </el-form-item>
          <el-form-item label="档案标识号" style="width:260px;float:left">
            <el-input v-model="base.archiveno"></el-input>
          </el-form-item>
          <el-form-item label="成立日期" style="width:260px;float:left">
            <el-date-picker v-model="base.estdate" type="datetime" style="width:200px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="编码" style="width:260px;float:left">
            <el-input v-model="base.companyno"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人" style="width:260px;float:left">
            <el-input v-model="base.legalman"></el-input>
          </el-form-item>
          <el-form-item label="企业负责人" style="width:220px;float:left">
            <el-input v-model="base.companyleader"></el-input>
          </el-form-item>
          <el-form-item label="质量负责人" style="width:220px;float:left">
            <el-input v-model="base.qcman"></el-input>
          </el-form-item>
          <el-form-item label="注册资本" style="width:260px;float:left">
            <el-input v-model="base.regcapital"></el-input>
          </el-form-item>
          <el-form-item label="企业预编码" style="width:260px;float:left">
            <el-input v-model="base.precode"></el-input>
          </el-form-item>
          <el-form-item label="供应商编码" style="width:440px;float:left">
            <el-input v-model="base.supplyno"></el-input>
          </el-form-item>
          <el-form-item label="法定单位标志" style="width:260px;float:left">
            <el-select v-model.number="base.legalflag">
              <el-option :value="1" label="是"></el-option>
              <el-option :value="0" label="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width:100%;clear:both;float:left">
            <el-checkbox-group v-model="base.flags">
              <el-checkbox label="0" :disabled="true">供应商标志</el-checkbox>
              <el-checkbox label="1" :disabled="true">生产企业标志</el-checkbox>
              <el-checkbox label="2" :disabled="true">客户标志</el-checkbox>
              <el-checkbox label="3" :disabled="true">委托加工企业</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item style="width:100%;clear:both;float:left">
            <el-button type="info" size="small" round @click="docClose">取消</el-button>
            <el-button type="primary" size="small" round @click="jbxxbSaveAll">保存</el-button>
          </el-form-item>
        </el-form>
  </el-dialog>
  <hov-tools v-if="baseCompanyVisible" :hov-data="baseCompanyHov"></hov-tools>
  <hov-tools v-if="gdywCompanyVisible" :hov-data="gdywCompanyHov"></hov-tools>
</div>
</template>

<script>
import HovTools from "@/views/Core/HovTools";
export default {
  name: 'DwjvxxglDtl',
  components:{HovTools},
  props:{
    dltStatus:{type:Boolean},
    selfOptions:{type:Array},
    usestatusOptions:{type:Array},
    enterprisetypeOptions:{type:Array},
    operationTypeOptions:{type:Array},
    dtlData:{type:Object}
  },
  data () {
    return {
      dialogVisible:true,
      docTitle:'单位信息',
      dialogWidth:'1000px',
      dialogTop:'12vh',
      activeTabs:'first',
      companyid:null,
      base:{
        //companyid:null,
        companyname:null,
        companyopcode:null,
        companytype:null,
        selfflag:null,
        usestatus:null,
        enterprisetype:null,
        parentcompanyid:null,
        parentcompanyname:null,
        area:null,
        archiveno:null,
        estdate:null,
        companyno:null,
        legalman:null,
        companyleader:null,
        qcman:null,
        regcapital:null,
        precode:null,
        supplyno:null,
        legalflag:null,
        flags:[]
      },
      baseCompanyVisible:false,
      baseCompanyHov:{
        hovTitle:'上级单位查询',
        hovUrl: "companyidhov/selectparentcompanyid",
        afterStatus: false,
        fillDataName: "base",
        parentVisible:'baseCompanyVisible',
        hovColumns:
          [
            {id: "companyid", name: "客户ID",queryStatus:true,dataStatus:2,fillid:"parentcompanyid"},
            {id: "companyname", name: "客户名称",queryStatus:true,dataStatus:1,fillid:'parentcompanyname'},
            {id: "companyopcode", name: "客户操作码",queryStatus:true,dataStatus:1}
          ]
      },
      lxTableData:[],
      lxTableHeight:380,
      lxSelectionData:null,
      dtlVisiable:false,
      dialogDtlVisible:false,
      gdyw:{
        operationType:null,
        contactInfoId:null
      },
      gbywTable:false,
      gbywTableHeight:350,
      gbywTableData:[],
      gbywSelectionData:null,
      gdywCompanyVisible:false,
      gdywCompanyHov:{
        hovTitle:'单位标识号查询',
        hovUrl: "contactinfoidhov/select",
        afterStatus: false,
        fillDataName: "gdyw",
        parentVisible:'gdywCompanyVisible',
        hovColumns:
          [
            {id: "contactinfoid", name: "联系方式ID",queryStatus:true,dataStatus:2,fillid:'contactInfoId'},
            {id: "companyid", name: "公司ID",queryStatus:true,dataStatus:2},
            {id: "contactman", name: "联系人",queryStatus:false,dataStatus:1},
            {id: "department", name: "部门",queryStatus:false,dataStatus:1},
            {id: "position", name: "职务",queryStatus:false,dataStatus:1},
            {id: "phone", name: "固定电话",queryStatus:false,dataStatus:1},
            {id: "fax", name: "传真",queryStatus:false,dataStatus:1},
            {id: "mobilephone", name: "移动电话",queryStatus:false,dataStatus:1},
            {id: "email", name: "邮件",queryStatus:false,dataStatus:1},
            {id: "address", name: "通讯地址",queryStatus:false,dataStatus:1},
            {id: "postcode", name: "邮编",queryStatus:false,dataStatus:1},
            {id: "memo", name: "备注",queryStatus:false,dataStatus:1},
            {id: "idcard", name: "身份证号",queryStatus:false,dataStatus:1}
          ]
      },
      cw:{
        companyname:null,
        invcompanyname:null,
        taxno:null,
        bankname:null,
        accno:null,
        state:null,
        city:null,
        invaddress:null,
        invphone:null,
        companytype:null,
        realinvtype:null
      },
      cwStatus:false,
      dtlTitle:'',
      lyfsStatus:true,
      lyfsDtlData:{
        companyid:null,
        contactman:null,
        department:null,
        position:null,
        phone:null,
        fax:null,
        mobilephone:null,
        email:null,
        address:null,
        postcode:null,
        memo:null,
        idcard:null
      },
      parentIndex:null,
      parentStatus:false,
      parentContactinfoid:null,
      baseLabelWidth:'110px',
      cwLableWidth:'110px',
      dtlLableWidth:'100px'
    }
  },
  created(){
    if(this.dltStatus===true){
      this.companyid=this.dtlData.companyid;
      Object.keys(this.base).forEach(e => {
        this.base[e]=this.dtlData[e];
      })
    }else if(this.dltStatus===false){
      this.base.companytype=1;
      this.base.selfflag=0;
      this.base.usestatus=1;
      this.base.enterprisetype=3;
      this.base.legalflag=1;
    }
  },
  methods:{
    //新增联系人页面打开
    addLxfsb(){
      this.dtlVisiable=true;
      Object.keys(this.lyfsDtlData).forEach(e => {
        this.lyfsDtlData[e]=null;
      });
      this.lyfsDtlData.companyid=this.companyid;
      this.parentStatus=false;
      this.dialogDtlVisible=true;
    },
    //新增联系人
    addLyfs(){
    let params={};
      Object.keys(this.lyfsDtlData).forEach(e => {
        params[e]=this.lyfsDtlData[e];
      });
      params.companytype=this.base.companytype;
      if(this.parentStatus===false){
        this.$api.dwjbxxgl.savelxr(params).then(res => {
          if(res.code===200){
            alert("保存成功");
            this.dialogDtlVisible=false;
            this.dtlVisiable=false;
            this.selectlxr();
          }
        }).catch(error => {
          console.log(error);
          return false;
        })
      }else if(this.parentStatus===true){
        params.contactinfoid=this.parentContactinfoid;
        this.$api.dwjbxxgl.updatelxr(params).then(res => {
          if(res.code===200){
            alert("修改成功");
            this.dialogDtlVisible=false;
            this.dtlVisiable=false;
            this.selectlxr();
          }
        }).catch(error => {
          console.log(error);
          return false;
        })
      }
    },
    //删除联系人
    detjjxswh(row,index){
      this.$api.dwjbxxgl.deletelxr(row.contactinfoid).then(res => {
        if(res.code===200){
          alert("删除成功");
          this.selectlxr();
        }
      }).catch(error => {
        console.log(error);
        return false;
      })
    },
    //删除固定业务
    delgdyw(row,index){
      this.$api.dwjbxxgl.deletegdyw(row.fixcontactid).then(res => {
        if(res.code===200){
          alert("删除成功");
          this.selectgbyw();
        }
      }).catch(error => {
        console.log(error);
        return false;
      })
    },
    docClose(){
      this.dialogVisible=false;
      this.$parent.dwjvxxgldtlVisible=false;
    },
    lyfsClose(){
      this.dialogDtlVisible=false;
      Object.keys(this.lyfsDtlData).forEach(e => {
        this.lyfsDtlData[e]=null;
      });
      this.dtlVisiable=false;
    },
    //新增/修改财务信息
    dwcwxxbSaveAll(){
      let params={};
      Object.keys(this.cw).forEach(e=>{
        params[e]=this.cw[e];
      });
      params.companyid=this.companyid;
      if(this.cwStatus===false){
        this.$api.dwjbxxgl.savecw(params).then(res => {
          if(res.code===200){
            alert("保存成功");
            this.selectcw();
          }
        }).catch(error => {
          console.log(error);
          return false;
        })
      }else if(this.cwStatus===true){
        this.$api.dwjbxxgl.updatecw(params).then(res => {
          if(res.code===200){
            alert("修改成功");
            this.selectcw();
          }
        }).catch(error => {
          console.log(error);
          return false;
        })
      }
    },
    gbywSelectionChange(val){
      this.gbywSelectionData=val;
    },
    handleClick(tab,event){
      if(this.dltStatus===true){
        if(tab.name==="second"){
          this.selectlxr();
        }else if(tab.name==="third"){
          this.selectgbyw();
        }else if(tab.name==="fourth"){
          if(this.dtlData.companytypes.length!==0){
            this.selectcw();
          }
        }
      }
    },
    //查询联系人
    selectlxr(){
      this.lxTableData=[];
      this.$api.dwjbxxgl.selectlxr(this.companyid).then(res => {
        if(res.code===200){
          this.lxTableData=res.data;
        }
      }).catch(error => {
        console.log(error);
        return false;
      })
    },
    //查询固定业务
    selectgbyw(){
      this.gbywTableData=[];
      this.$api.dwjbxxgl.selectgdyw(this.companyid).then(res => {
        if(res.code===200){
          this.gbywTableData=res.data;
        }
      }).catch(error => {
        console.log(error);
        return false;
      })
    },
    //查询财务信息
    selectcw(){
      this.$api.dwjbxxgl.selectcw({companytype:this.dtlData.companytypes,companyid:this.companyid}).then(res => {
        if(res.code===200){
          if(res.data.length===0){
            this.cw.companyname=this.base.companyname;
            this.cwStatus=false;
          }else{
            Object.keys(this.cw).forEach(e=>{
              this.cw[e]=res.data[0][e];
            });
            this.cw.companyname=this.base.companyname;
            this.cwStatus=true;
          }
        }
      }).catch(error => {
        console.log(error);
        return false;
      })
    },
    //基本信息保存/修改
    jbxxbSaveAll(){
      let base=this.base;
      let params={};
      Object.keys(base).forEach(e => {
        if(e!=="flags"){
          params[e]=base[e];
        }
      });
      if(this.dltStatus===false){
        params.inputmanid=Number(sessionStorage.getItem("userid"));
        this.$api.dwjbxxgl.saveBase(params).then(res => {
          if(res.code===200){
            alert("保存成功");
            this.companyid=res.data;
            this.cw.companyname=this.base.companyname;
          }
        }).catch(error => {
          console.log(error);
          return false;
        })
      }else{
        params.inputmanid=Number(sessionStorage.getItem("userid"));
        params.companyid=this.companyid;
        this.$api.dwjbxxgl.updateBase(params).then(res => {
          if(res.code===200){
            alert("修改成功");
          }
        }).catch(error => {
          console.log(error);
          return false;
        })
      }
    },
    lxSelectionChange(val){
      this.lxSelectionData=val;
    },
    openHov(id){
      if(id==="parentcompanyid"){
        this.baseCompanyVisible=true;
      }else if(id==="contactInfoId"){
        this.gdywCompanyVisible=true;
      }
    },
    updatejjxswh(row,index){
      this.dtlVisiable=true;
      Object.keys(this.lyfsDtlData).forEach(e=>{
        this.lyfsDtlData[e]=row[e];
      });
      this.parentContactinfoid=row.contactinfoid;
      this.dialogDtlVisible=true;
      this.parentStatus=true;
      this.parentIndex=index;
    },
    //保存固定业务
    ywgdlxfsSave(){
      let params={};
      if(this.gdyw.operationType===null){
        alert("请选择业务类型");
        return false;
      }else{
        params.operationtype=this.gdyw.operationType;
      }
      if(this.gdyw.contactInfoId===null){
        alert("请选择联系方式id");
        return false;
      }else {
        params.contactinfoid=this.gdyw.contactInfoId;
      }
      params.inputmanid=Number(sessionStorage.getItem("userid"));
      this.$api.dwjbxxgl.savegdyw(params).then(res => {
        if(res.code===200){
          alert("保存成功");
          this.selectgbyw();
        }
      }).catch(error => {
        console.log(error);
        return false;
      })
    }
  }
}
</script>

<style>
  .dwjvxxgl .el-dialog{max-height:550px;height:550px;}
  .dwjvxxgl .el-dialog__body{padding:0 2px 20px 2px}
 .dwjvxxgl .el-dialog__body .el-tabs__content{padding:5px;height:430px;}
</style>
