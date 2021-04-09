<template>
  <div class="khgldtl">
    <el-dialog :visible.sync="dialogVisible" :title="docTitle" :width="dialogWidth"
               :top="dialogTop" :destroy-on-close="true" :close-on-click-modal="false" @close="dialogColse">
      <el-form :model="formData" ref="ruleForm" label-width="130px">
        <el-divider>单位信息</el-divider>
        <el-form-item label="客户ID" prop="customid" style="float:left;width:300px;margin-bottom: 2px;">
          <el-input v-model.number="formData.customid" :disabled="true" style="width:80%;"></el-input>
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
          <el-input v-model="formData.customname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="单位类型" style="float:left;margin-bottom: 2px;">
          <el-input v-model="formData.companytypename" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="上级单位" style="clear:both;float:left;margin-bottom: 2px;">
          <el-input v-model.number="formData.parentcompanyid" style="width:45%;" :disabled="true"></el-input>
          <el-input v-model="formData.parentcompanyname" style="width:45%;" :disabled="true"></el-input>
        </el-form-item>
       <!-- <el-form-item label="地区" style="float:left;">
          <el-input v-model.number="formData.area" :disabled="true"></el-input>
        </el-form-item>-->
        <el-form-item label="法人单位标志" style="clear:both;float:left;margin-bottom: 2px;">
          <el-input v-model="formData.legalflag" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="企业性质" style="float:left;margin-bottom: 2px;">
          <el-input v-model="formData.enterprisetypename" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="内外标识" style="float:left;margin-bottom: 2px;">
          <el-input v-model="formData.selfflagname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="档案标识号" style="clear:both;float:left;margin-bottom: 2px;">
          <el-input v-model="formData.archiveno" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="状态" style="float:left;margin-bottom: 2px;">
          <el-input v-model="formData.usestatusname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="修改日期" style="float:left;margin-bottom: 2px;">
          <el-date-picker type="datetime" v-model="formData.modifydate" :disabled="true"></el-date-picker>
        </el-form-item>
        <el-form-item label="录入日期" style="float:left;margin-bottom: 18px;">
          <el-date-picker type="datetime" v-model="formData.companycredate" :disabled="true"></el-date-picker>
        </el-form-item>
        <el-form-item label="录入人员ID" style="float:left;margin-bottom: 18px;">
          <el-input v-model="formData.inputmanid" style="width:45%" :disabled="true"></el-input>
          <el-input v-model="formData.inputmanname" style="width:45%" :disabled="true"></el-input>
        </el-form-item>
        <el-divider>客户信息</el-divider>
        <el-form-item label="客户性质" style="float:left;width:300px;margin-bottom: 2px;">
          <el-select v-model="formData.customtypeid">
            <el-option v-for="op in customOptions" :key="op.value" :value="op.value" :label="op.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格类型" style="float:left;width:500px;margin-bottom: 2px;">
          <el-input v-model="formData.priceid" style="width:40%;float:left;" :disabled="true"></el-input>
          <el-input v-model="formData.pricename" style="width:40%;float:left;" :disabled="true"></el-input>
          <el-button  icon="el-icon-search" circle @click="openHov('priceid')"></el-button>
        </el-form-item>
        <el-form-item label="客户等级" style="clear:both;float:left;width:300px;margin-bottom: 2px;">
          <el-input v-model="formData.customgrade"></el-input>
        </el-form-item>
        <el-form-item label="业务员" style="float:left;width:500px;margin-bottom: 2px;">
          <el-input v-model="formData.salerid" :disabled="true" style="width:40%;float:left;"></el-input>
          <el-input v-model="formData.saler" :disabled="true" style="width:40%;float:left;"></el-input>
          <el-button  icon="el-icon-search" circle @click="openHov('salerid')"></el-button>
        </el-form-item>
        <el-form-item label="签收方式" style="clear:both;float:left;width:300px;margin-bottom: 2px;">
          <el-input v-model="formData.signtype"></el-input>
        </el-form-item>
        <el-form-item label="收货人" style="float:left;width:300px;margin-bottom: 2px;">
          <el-input v-model="formData.signman"></el-input>
        </el-form-item>
        <el-form-item style="clear:both;float:left;margin-bottom: 2px;">
          <el-checkbox v-model="formData.iftax">是否一般纳税人 	</el-checkbox>
        </el-form-item>
        <el-form-item style="float:left;margin-bottom: 2px;">
          <el-checkbox v-model="formData.ifcontrol">是否控制信用限额</el-checkbox>
        </el-form-item>
        <el-form-item style="float:left;margin-bottom: 2px;">
          <el-checkbox v-model="formData.iftoge">是否票货同行</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align:center">
        <el-button type="info" size="small" round @click="dialogColse">取消</el-button>
        <el-button type="primary" size="small" round @click="dialogAdd">保存</el-button>
      </div>
    </el-dialog>
    <hov-tools v-if="companyVisible" :hov-data="companyHov"></hov-tools>
    <hov-tools v-if="priceVisible" :hov-data="priceHov"></hov-tools>
    <hov-tools v-if="salerVisible" :hov-data="salerHov"></hov-tools>
  </div>
</template>

<script>
  import HovTools from "@/views/Core/HovTools";
  export default {
    name: 'KhglDtl',
    components:{HovTools},
    props:{
      dltStatus:{type:Boolean},
      customOptions:{type:Array},
      dtlData:{type:Object},
      docTitle:{type:String}
    },
    data () {
      return {
        dialogVisible:true,
        dialogWidth:'1000px',
        dialogTop:'12vh',
        formData:{
          customid:null,
          companyno:null,
          companyshortname:null,
          customname:null,
          companyopcode:null,
          companytypename:null,
          parentcompanyid:null,
          parentcompanyname:null,
          //area:null,
          selfflagname:null,
          usestatusname:null,
          enterprisetypename:null,
          archiveno:null,
          companycredate:null,
          selfflag:null,
          inputmanid:null,
          inputmanname:null,
          modifydate:null,
          priceid:null,
          pricename:null,
          customgrade:null,
          salerid:null,
          saler:null,
          signtype:null,
          signman:null,
          iftax:null,
          ifcontrol:null,
          iftoge:null,
          customtypeid:null,
          legalflag:null
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
              {id: "companyopcode", name: "单位操作码",queryStatus:true,dataStatus:2,fillid:"companyopcode"},
              {id: "companyid", name: "单位ID",queryStatus:true,dataStatus:1,fillid:'customid'},
              {id: "companyno", name: "编号",queryStatus:false,dataStatus:1,fillid:'companyno'},
              {id: "companyname", name: "单位名称",queryStatus:true,dataStatus:1,fillid:'customname'},
              {id: "companyshortname", name: "简称",queryStatus:false,dataStatus:1,fillid:'companyshortname'},
              {id: "companytypename", name: "单位类型",queryStatus:false,dataStatus:1,fillid:'companytypename'},
              {id: "parentcompanyid", name: "上级单位ID",queryStatus:false,dataStatus:1,fillid:'parentcompanyid'},
              {id: "parentcompanyname", name: "上级单位名称",queryStatus:false,dataStatus:1,fillid:'parentcompanyname'},
              {id: "area", name: "地区",queryStatus:false,dataStatus:1,fillid:'area'},
              {id: "selfflagname", name: "内外标识",queryStatus:false,dataStatus:1,fillid:'selfflagname'},
              {id: "companycredate", name: "录入日期",queryStatus:false,dataStatus:1,fillid:'companycredate'},
              {id: "modifydate", name: "修改日期",queryStatus:false,dataStatus:1,fillid:'modifydate'},
              {id: "inputmanid", name: "录入人员ID",queryStatus:false,dataStatus:1,fillid:'inputmanid'},
              {id: "inputmanname", name: "录入人员姓名",queryStatus:false,dataStatus:1,fillid:'inputmanname'},
              {id: "legalflag", name: "法人单位标志",queryStatus:false,dataStatus:1,fillid:'legalflag'},
              {id: "usestatusname", name: "状态",queryStatus:false,dataStatus:1,fillid:'usestatusname'},
              {id: "enterprisetype", name: "企业性质",queryStatus:false,dataStatus:1,fillid:'enterprisetype'},
              {id: "archiveno", name: "档案标识号",queryStatus:false,dataStatus:1,fillid:'archiveno'}
            ]
        },
        priceVisible:false,
        priceHov:{
          hovTitle:'价格类型查询',
          hovUrl:'priceidhov/select',
          afterStatus:false,
          fillDataName:'formData',
          parentVisible:'priceVisible',
          hovColumns:
            [
              {id:'priceid',name:"价格类型ID",queryStatus:true,dataStatus:2,fillid:"priceid"},
              {id:'pricename', name: "价格类型名称",queryStatus:true,dataStatus:1,fillid:"pricename"}
            ]
        },
        salerVisible:false,
        salerHov:{
          hovTitle:'人员查询',
          hovUrl: "employeeididhov/select",
          afterStatus: false,
          fillDataName: "formData",
          parentVisible:'salerVisible',
          hovColumns:
            [
              {id: "employeeopcode", name: "操作码",queryStatus:true,dataStatus:2},
              {id: "employeeid", name: "人员ID",queryStatus:true,dataStatus:1,fillid:'salerid'},
              {id: "employeename", name: "人员名称",queryStatus:true,dataStatus:1,fillid:'saler'}
            ]
        }
      }
    },
    created(){
      if(this.dltStatus===true){
        Object.keys(this.formData).forEach(e => {
          this.formData[e]=this.dtlData[e];
        });
        this.formData.iftax = this.dtlData.iftax === 1;
        this.formData.ifcontrol = this.dtlData.ifcontrol === 1;
        this.formData.iftoge = this.dtlData.iftoge === 1;
      }
    },
    mounted(){
      this.dialogVisible=true;
    },
    methods:{
      dialogColse(){
        this.dialogVisible=false;
        this.$parent.khglDtlVisible=false;
      },
      dialogAdd(){
            let formData=this.formData;
            let params={};
            if(formData.customid!==null&&formData.customid!==""){
            }else{
              alert("客户不能为空");
              return false;
            }
            Object.keys(formData).forEach(e=>{
              if(e!=="iftax"&&e!=="ifcontrol"&&e!=="iftoge"){
                params[e]=formData[e];
              }
            });
            if(formData.iftax===true){
              params.iftax=1;
            }else{
              params.iftax=0;
            }
            if(formData.ifcontrol===true){
              params.ifcontrol=1;
            }else{
              params.ifcontrol=0;
            }
            if(formData.iftoge===true){
              params.iftoge=1;
            }else{
              params.iftoge=0;
            }
            params.companyid=Number(sessionStorage['companyid']);
            if(this.dltStatus===false){
              this.$api.quality.saveKhgl(params).then(res => {
                if(res.code===200){
                  alert("保存成功");
                  this.$parent.queryFunction('query');
                  this.dialogColse();
                }
              }).catch(error => {
                return false;
              })
            }else if(this.dltStatus===true){
              this.$api.quality.updateKhgl(params).then(res => {
                if(res.code===200){
                  alert("修改成功");
                  this.$parent.queryFunction('query');
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
        }else if(data === "priceid"){
          this.priceVisible = true;
        }else if(data === "salerid"){
          this.salerVisible = true;
        }
      }
    }
  }
</script>

<style>
  .khgldtl .el-dialog{max-height:550px;height:550px;}
  .khgldtl .el-dialog__body{padding:0 2px 20px 2px;max-height:420px;overflow:auto}
  .khgldtl .el-divider{clear:both;}
  .khgldtl .el-dialog .el-input__inner{color:black;}
</style>
