<template>
  <div class="gysgldtl">
    <el-dialog :visible.sync="dialogVisible" :title="docTitle" :width="dialogWidth"
               :top="dialogTop" :destroy-on-close="true" :close-on-click-modal="false" @close="dialogColse">
      <el-form :model="formData" ref="ruleForm" label-width="130px">
        <el-divider>单位信息</el-divider>
        <el-form-item label="单位标识号" prop="supplyid" style="float:left;width:300px;margin-bottom: 2px;">
          <el-input v-model.number="formData.supplyid" :disabled="true" style="width:80%;"></el-input>
          <el-button  icon="el-icon-search" circle @click="openHov('companyid')"></el-button>
        </el-form-item>
        <el-form-item label="编码" style="float:left;margin-bottom: 2px;">
          <el-input v-model="formData.companyno" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="简称" style="float:left;margin-bottom: 2px;">
          <el-input v-model="formData.companyshortname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="操作码" style="clear:both;float:left;margin-bottom: 2px;">
          <el-input v-model="formData.companyopcode" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="名称" style="float:left;margin-bottom: 2px;">
          <el-input v-model="formData.companyname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="单位类型" style="float:left;margin-bottom: 2px;">
          <el-input v-model="formData.companytype" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="上级单位" style="clear:both;float:left;margin-bottom: 2px;">
          <el-input v-model.number="formData.parentcompanyid" style="width:45%;" :disabled="true"></el-input>
          <el-input v-model="formData.parentname" style="width:45%;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="地区" style="float:left;margin-bottom: 2px;">
          <el-input v-model.number="formData.area" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="法人单位标志" style="clear:both;float:left;margin-bottom: 2px;">
          <el-input v-model="formData.legalflag" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="状态" style="float:left;margin-bottom: 2px;">
          <el-input v-model="formData.usestatus" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="企业性质" style="float:left;margin-bottom: 2px;">
          <el-input v-model="formData.enterprisetype" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="档案标识号" style="clear:both;float:left;margin-bottom: 2px;">
          <el-input v-model="formData.archiveno" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="录入日期" style="float:left;margin-bottom: 2px;">
          <el-date-picker v-model="formData.companycredate" type="datetime" :disabled="true"></el-date-picker>
        </el-form-item>
        <el-form-item label="内外标识" style="float:left;margin-bottom: 2px;">
          <el-input v-model="formData.selfflag" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="录入人员ID" style="clear:both;float:left;margin-bottom: 18px;">
          <el-input v-model="formData.inputmanid" style="width:45%" :disabled="true"></el-input>
          <el-input v-model="formData.inputmanname" style="width:45%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="修改日期" style="float:left;margin-bottom: 18px;">
          <el-date-picker v-model="formData.modifydate" type="datetime" :disabled="true"></el-date-picker>
        </el-form-item>
        <el-divider>供应商信息</el-divider>
        <el-form-item label="等级" style="float:left;width:330px;margin-bottom: 2px;">
          <el-input v-model="formData.supplygrade"></el-input>
        </el-form-item>
        <el-form-item label="工业/商业" style="float:left;margin-bottom: 2px;">
          <el-select v-model="formData.ifindustry">
            <el-option :value="2" label="商业"></el-option>
            <el-option :value="1" label="工业"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:left;margin-bottom: 2px;">
          <el-checkbox v-model="formData.ifformainvv">是否启用形式发票</el-checkbox>
        </el-form-item>
        <el-form-item label="工业用户ID" style="clear:both;float:left;margin-bottom: 2px;">
          <el-input v-model="formData.factoryid" :disabled="true" style="width:80%"></el-input>
          <el-button  icon="el-icon-search" circle @click="openHov('factoryid')"></el-button>
        </el-form-item>
        <el-form-item label="工业户" style="float:left;margin-bottom: 2px;">
          <el-input v-model="formData.factoryname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="人员ID" style="clear:both;float:left;margin-bottom: 2px;">
          <el-input v-model="formData.buyerid" :disabled="true" style="width:80%"></el-input>
          <el-button  icon="el-icon-search" circle  @click="openHov('buyerid')"></el-button>
        </el-form-item>
        <el-form-item label="人员名称" style="float:left;margin-bottom: 2px;">
          <el-input v-model="formData.buyername" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="财务人员" style="clear:both;float:left;margin-bottom: 2px;">
          <el-input v-model="formData.checker" :disabled="true" style="width:80%"></el-input>
          <el-button  icon="el-icon-search" circle @click="openHov('checker')"></el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align:center">
        <el-button type="info" size="small" round @click="dialogColse">取消</el-button>
        <el-button type="primary" size="small" round @click="dialogAdd">保存</el-button>
      </div>
    </el-dialog>
    <hov-tools v-if="companyVisible" :hov-data="companyHov"></hov-tools>
    <hov-tools v-if="factoryVisible" :hov-data="factoryHov"></hov-tools>
    <hov-tools v-if="buyerVisible" :hov-data="buyerHov"></hov-tools>
    <hov-tools v-if="checkerVisible" :hov-data="checkerHov"></hov-tools>
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
      dtlData:{type:Object},
      docTitle:{type:String}
    },
    data () {
      return {
        dialogVisible:true,
        dialogWidth:'1000px',
        dialogTop:'12vh',
        formData:{
          supplyid:null,
          companyno:null,
          companyshortname:null,
          companyname:null,
          companyopcode:null,
          companytype:null,
          parentcompanyid:null,
          parentname:null,
          area:null,
          legalflag:null,
          usestatus:null,
          enterprisetype:null,
          archiveno:null,
          companycredate:null,
          selfflag:null,
          inputmanid:null,
          inputmanname:null,
          modifydate:null,
          supplygrade:null,
          ifindustry:null,
          ifformainvv:null,
          factoryid:null,
          factoryname:null,
          buyerid:null,
          buyername:null,
          checker:null
        },
        companyVisible:false,
        companyHov:{
          hovTitle:'单位查询',
          hovUrl: "companyidhov/selectdwxx",
          afterStatus: false,
          fillDataName: "formData",
          parentVisible:'companyVisible',
          hovColumns:
            [
              {id: "companyopcode", name: "单位操作码",queryStatus:true,dataStatus:1,fillid:"companyopcode"},
              {id: "companyid", name: "单位标识号",queryStatus:true,dataStatus:2,fillid:'supplyid'},
              {id: "companyno", name: "编号",queryStatus:false,dataStatus:1,fillid:'companyno'},
              {id: "companyname", name: "单位名称",queryStatus:true,dataStatus:1,fillid:'companyname'},
              {id: "companyshortname", name: "简称",queryStatus:false,dataStatus:1,fillid:'companyshortname'},
              {id: "companytype", name: "单位类型",queryStatus:false,dataStatus:1,fillid:'companytype'},
              {id: "parentcompanyid", name: "上级单位ID",queryStatus:false,dataStatus:1,fillid:'parentcompanyid'},
              {id: "parentcompanyname", name: "上级单位名称",queryStatus:false,dataStatus:1,fillid:'parentname'},
              {id: "area", name: "地区",queryStatus:false,dataStatus:1,fillid:'area'},
              {id: "selfflagname", name: "内外标识",queryStatus:false,dataStatus:1,fillid:'selfflag'},
              {id: "companycredate", name: "录入日期",queryStatus:false,dataStatus:1,fillid:'companycredate',type:"date"},
              {id: "modifydate", name: "修改日期",queryStatus:false,dataStatus:1,fillid:'modifydate',type:"date"},
              {id: "inputmanid", name: "录入人员ID",queryStatus:false,dataStatus:1,fillid:'inputmanid'},
              {id: "inputmanname", name: "录入人员姓名",queryStatus:false,dataStatus:1,fillid:'inputmanname'},
              {id: "legalflag", name: "法人单位标志",queryStatus:false,dataStatus:1,fillid:'legalflag'},
              {id: "usestatusname", name: "状态",queryStatus:false,dataStatus:1,fillid:'usestatus'},
              {id: "enterprisetype", name: "企业性质",queryStatus:false,dataStatus:1,fillid:'enterprisetype'},
              {id: "archiveno", name: "档案标识号",queryStatus:false,dataStatus:1,fillid:'archiveno'}
            ]
        },
        factoryVisible:false,
        factoryHov:{
          hovTitle:'工业用户查询',
          hovUrl: "customidhov/select",
          afterStatus: false,
          fillDataName: "formData",
          parentVisible:'factoryVisible',
          hovColumns:
            [
              {id: "customopcode", name: "操作码",queryStatus:true,dataStatus:2},
              {id: "customid", name: "工业用户ID",queryStatus:true,dataStatus:1,fillid:'factoryid'},
              {id: "customname", name: "工业用户",queryStatus:true,dataStatus:1,fillid:'factoryname'}
            ]
        },
        buyerVisible:false,
        buyerHov:{
          hovTitle:'人员查询',
          hovUrl: "employeeididhov/select",
          afterStatus: false,
          fillDataName: "formData",
          parentVisible:'buyerVisible',
          hovColumns:
            [
              {id: "employeeopcode", name: "操作码",queryStatus:true,dataStatus:2},
              {id: "employeeid", name: "人员ID",queryStatus:true,dataStatus:1,fillid:'buyerid'},
              {id: "employeename", name: "人员名称",queryStatus:true,dataStatus:1,fillid:'buyername'}
            ]
        },
        checkerVisible:false,
        checkerHov:{
          hovTitle:'财务人员查询',
          hovUrl: "employeeididhov/select",
          afterStatus: false,
          fillDataName: "formData",
          parentVisible:'checkerVisible',
          hovColumns:
            [
              {id: "employeeopcode", name: "操作码",queryStatus:true,dataStatus:2},
              {id: "employeeid", name: "人员ID",queryStatus:true,dataStatus:1},
              {id: "employeename", name: "人员名称",queryStatus:true,dataStatus:1,fillid:'checker'}
            ]
        }
      }
    },
    created(){
      if(this.dltStatus===true){
        Object.keys(this.formData).forEach(e => {
          this.formData[e]=this.dtlData[e];
        });
        this.formData.companyid=this.dtlData.supplyid;
        if(this.dtlData.ifindustry===1){
          this.formData.ifindustry=1;
        }else{
          this.formData.ifindustry=2;
        }
        if(this.dtlData.ifformainv==="否"){
          this.formData.ifformainvv=false;
        }else if(this.dtlData.ifformainv==="是"){
          this.formData.ifformainvv=true;
        }
      }
    },
    mounted(){
      this.dialogVisible=true;
    },
    methods:{
      dialogColse(){
        this.dialogVisible=false;
        this.$parent.gysglDtlVisible=false;
      },
      dialogAdd(){
            let formData=this.formData;
            let params={};
            if(formData.supplyid!==null&&formData.supplyid!==""){
            }else{
              alert("单位标识号不能为空");
              return false;
            }
            Object.keys(formData).forEach(e=>{
              if(e!=="ifformainvv"){
                params[e]=formData[e];
              }
            });
            if(formData.ifformainvv===true){
              params.ifformainvm='是';
              params.ifformainv=1;
            }else{
              params.ifformainvm='否';
              params.ifformainv=0;
            }
            if(this.dltStatus===false){
              this.$api.quality.saveGysgl(params).then(res => {
                if(res.code===200){
                  alert("保存成功");
                  this.$parent.handleFunction('query');
                  this.dialogColse();
                }
              }).catch(error => {
                return false;
              })
            }else if(this.dltStatus===true){
              this.$api.quality.updateGysgl(params).then(res => {
                if(res.code===200){
                  alert("修改成功");
                  this.$parent.handleFunction('query');
                  this.dialogColse();
                }
              }).catch(error => {
                return false;
              })
            }
      },
      openHov(data){
        if(data === "companyid"){
          this.companyVisible=true;
        }else if(data === "factoryid"){
          this.factoryVisible = true;
        }else if(data === "buyerid"){
          this.buyerVisible = true;
        }else if(data === "checker"){
          this.checkerVisible = true;
        }
      }
    }
  }
</script>

<style>
  .gysgldtl .el-dialog{max-height:550px;height:550px;}
  .gysgldtl .el-dialog__body{padding:0 2px 20px 2px;max-height:420px;overflow:auto}
  .gysgldtl .el-divider{clear:both;}
  .gysgldtl .el-dialog .el-input__inner{color:black;}
</style>
