<template>
<div class="dwjvxxgl">
  <el-dialog :visible.sync="dialogVisible" :title="docTitle" :width="dialogWidth" :top="dialogTop" :destroy-on-close="true" @close="docClose" :close-on-click-modal="false">
    <el-tabs type="border-card" @tab-click="handleClick" v-model="activeTabs">
      <el-tab-pane label="基本信息表" name="first">
        <el-form :label-width="baseLabelWidth">
          <el-form-item v-if="dltStatus===true" label="单位ID" style="width:260px;float:left;">
            <el-input v-model="companyid" :disabled="true" style="width:160px"></el-input>
          </el-form-item>
          <el-form-item label="单位名称" style="width:440px;float:left;">
            <el-input v-model="base.companyname" style="width:340px"></el-input>
          </el-form-item>
          <el-form-item label="操作码" style="width:260px;float:left;">
            <el-input v-model="base.companyopcode" style="width:160px"></el-input>
          </el-form-item>
          <el-form-item label="单位类型" style="width:260px;clear:both;float:left">
            <el-select v-model.number="base.companytype" style="width:160px">
              <el-option :value="1" label="公司"></el-option>
              <el-option :value="2" label="子公司"></el-option>
              <el-option :value="3" label="分公司"></el-option>
              <el-option :value="4" label="部门"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内外标识" style="width:220px;float:left">
            <el-select v-model.number="base.selfflag" style="width:120px">
              <el-option v-for="op in selfOptions" :key="op.value" :value="op.value" :label="op.label">{{op.label}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" style="width:220px;float:left">
            <el-select v-model.number="base.usestatus"  style="width:120px">
              <el-option v-for="op in usestatusOptions" :key="op.value" :value="op.value" :label="op.label">{{op.label}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业性质" style="width:260px;float:left">
            <el-select v-model.number="base.enterprisetype" style="width:160px;">
              <el-option v-for="op in enterprisetypeOptions" :key="op.value" :value="op.value" :label="op.label">{{op.label}}</el-option>
            </el-select>
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
      </el-tab-pane>
      <el-tab-pane label="单位联系方式表"  name="second">
        <el-table
          :data="lxTableData"
          :height="lxTableHeight"
          border
          stripe
          @selection-change="lxSelectionChange"
        >
          <el-table-column prop="contactman" label="联系人"></el-table-column>
          <el-table-column prop="phone" label="固定电话"></el-table-column>
          <el-table-column prop="department" label="部门"></el-table-column>
          <el-table-column prop="mobilephone" label="移动电话"></el-table-column>
          <el-table-column prop="companyid" label="单位ID"></el-table-column>
          <el-table-column prop="companyname" label="名称"></el-table-column>
          <el-table-column prop="idcard" label="身份证号"></el-table-column>
          <el-table-column prop="position" label="职务"></el-table-column>
          <el-table-column prop="email" label="E-mail"></el-table-column>
          <el-table-column prop="address" label="通讯地址"></el-table-column>
          <el-table-column prop="postcode" label="邮政"></el-table-column>
          <el-table-column prop="memo" label="备注"></el-table-column>
          <el-table-column :width="160" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" @click="updatejjxswh(scope.row,scope.$index)">修改</el-button>
              <el-button type="primary" @click="detjjxswh(scope.row,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-form style="margin-top:10px;">
          <el-button type="success" size="small" round @click="addLxfsb">新增</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="业务固定联系方式表"  name="third">
        <el-form :inline="true">
          <el-form-item label="业务类型">
            <el-select v-model="gdyw.operationType">
              <el-option v-for="op in operationTypeOptions" :key="op.value" :value="op.value" :label="op.label">{{op.label}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式ID">
            <el-input v-model="gdyw.contactInfoId" :disabled="true" style="width:120px;"></el-input>
            <el-button icon="el-icon-search" circle @click="openHov('contactInfoId')"></el-button>
          </el-form-item>
        </el-form>
        <el-table
          v-if="dltStatus"
          :data="gbywTableData"
          border
          stripe
          :height="gbywTableHeight"
          @selection-change="gbywSelectionChange"
        >
          <el-table-column prop="ddlname" label="业务类型"></el-table-column>
          <el-table-column prop="contactman" label="联系人"></el-table-column>
          <el-table-column prop="phone" label="固定电话"></el-table-column>
          <el-table-column prop="mobilephone" label="移动电话"></el-table-column>
          <el-table-column prop="position" label="职务"></el-table-column>
          <el-table-column prop="department" label="部门"></el-table-column>
          <el-table-column prop="fixcontactid" label="固定联系方式ID" :width="120"></el-table-column>
          <el-table-column prop="credate" label="日期"></el-table-column>
          <el-table-column prop="fax" label="E-传真"></el-table-column>
          <el-table-column prop="email" label="E-mail"></el-table-column>
          <el-table-column prop="address" label="通讯地址"></el-table-column>
          <el-table-column prop="postcode" label="邮政"></el-table-column>
          <el-table-column prop="memo" label="备注"></el-table-column>
          <el-table-column prop="operationtype" label="业务类型"></el-table-column>
          <el-table-column :width="160" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" @click="delgdyw(scope.row,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-form>
          <el-form-item>
            <el-button type="info" size="small" round @click="docClose">关闭</el-button>
            <el-button type="primary" size="small" round @click="ywgdlxfsSave">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="单位财务信息" name="fourth">
        <el-form style="width:800px;margin:0 auto;" :label-width="cwLableWidth">
          <el-form-item label="单位名称" style="float:left;width:280px;">
            <el-input v-model="cw.companyname" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="发票名称" style="clear:both;float:left;width:280px;">
            <el-input v-model="cw.invcompanyname"></el-input>
          </el-form-item>
          <el-form-item label="税号" style="float:left;">
            <el-input v-model="cw.taxno"></el-input>
          </el-form-item>
          <el-form-item label="开户行" style="clear:both;float:left;width:280px;">
            <el-input v-model="cw.bankname"></el-input>
          </el-form-item>
          <el-form-item label="帐号" style="float:left;">
            <el-input v-model="cw.accno"></el-input>
          </el-form-item>
          <el-form-item label="所在省" style="clear:both;float:left;width:280px;">
            <el-input v-model="cw.state"></el-input>
          </el-form-item>
          <el-form-item label="所在市" style="float:left;">
            <el-input v-model="cw.city"></el-input>
          </el-form-item>
          <el-form-item label="发票地址" style="clear:both;float:left;width:280px;">
            <el-input v-model="cw.invaddress"></el-input>
          </el-form-item>
          <el-form-item label="发票电话" style="float:left;">
            <el-input v-model="cw.invphone"></el-input>
          </el-form-item>
          <el-form-item label="公司类型" style="clear:both;float:left;width:280px;">
            <el-select v-model.number="cw.companytype">
              <el-option :value="1" label="供应商"></el-option>
              <el-option :value="2" label="客户"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="实际发票类型" style="float:left;">
            <el-select v-model.number="cw.realinvtype" style="width:90%">
              <el-option :value="0" label="普票"></el-option>
              <el-option :value="1" label="增值税"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="clear:both;float:left;">
            <el-button type="primary" size="small" round @click="dwcwxxbSaveAll">保存</el-button>
            <el-button type="info" size="small" round @click="docClose">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
  <el-dialog v-if="dtlVisiable" :visible.sync="dialogDtlVisible" :title="dtlTitle" :width="dialogWidth"
             :top="dialogTop" :destroy-on-close="true" :close-on-click-modal="false" @close="lyfsClose">
    <el-form :label-width="dtlLableWidth">
      <el-form-item label="单位ID" style="float:left;">
        <el-input v-model.number="lyfsDtlData.companyid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="联系人" style="float:left;">
        <el-input v-model="lyfsDtlData.contactman"></el-input>
      </el-form-item>
      <el-form-item label="部门" style="clear:both;float:left;">
        <el-input v-model="lyfsDtlData.department"></el-input>
      </el-form-item>
      <el-form-item label="职务" style="float:left;">
        <el-input v-model="lyfsDtlData.position"></el-input>
      </el-form-item>
      <el-form-item label="固定电话" style="float:left;">
        <el-input v-model="lyfsDtlData.phone"></el-input>
      </el-form-item>
      <el-form-item label="传真" style="clear:both;float:left;">
        <el-input v-model="lyfsDtlData.fax"></el-input>
      </el-form-item>
      <el-form-item label="移动电话" style="float:left;">
        <el-input v-model.number="lyfsDtlData.mobilephone"></el-input>
      </el-form-item>
      <el-form-item label="邮件" style="clear:both;float:left;">
        <el-input v-model="lyfsDtlData.email"></el-input>
      </el-form-item>
      <el-form-item label="通讯地址" style="float:left;">
        <el-input v-model="lyfsDtlData.address"></el-input>
      </el-form-item>
      <el-form-item label="邮编" style="clear:both;float:left;">
        <el-input v-model="lyfsDtlData.postcode"></el-input>
      </el-form-item>
      <el-form-item label="备注" style="float:left;">
        <el-input v-model="lyfsDtlData.memo"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" style="float:left;">
        <el-input v-model="lyfsDtlData.idcard"></el-input>
      </el-form-item>
      <el-form-item  style="clear:both;float:left;">
        <el-button type="info" size="small" round @click="lyfsClose">取消</el-button>
        <el-button type="primary" size="small" round @click="addLyfs">保存</el-button>
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
        if(e!=='flags'){
          this.base[e]=this.dtlData[e];
        }
      });
      if(this.dtlData.supplyflag===1){
        this.base.flags.push('0');
      }
      if(this.dtlData.factoryflag===1){
        this.base.flags.push('1');
      }
      if(this.dtlData.customflag===1){
        this.base.flags.push('2');
      }
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
        this.$api.quality.saveDwjbxxgllxr(params).then(res => {
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
        this.$api.quality.updateDwjbxxgllxr(params).then(res => {
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
      this.$api.quality.deleteDwjbxxgllxr(row.contactinfoid).then(res => {
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
      this.$api.quality.deleteDwjbxxglgdyw(row.fixcontactid).then(res => {
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
        this.$api.quality.saveDwjbxxglcw(params).then(res => {
          if(res.code===200){
            alert("保存成功");
            this.selectcw();
          }
        }).catch(error => {
          console.log(error);
          return false;
        })
      }else if(this.cwStatus===true){
        this.$api.quality.updateDwjbxxglcw(params).then(res => {
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
      this.$api.quality.selectDwjbxxgllxr(this.companyid).then(res => {
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
      this.$api.quality.selectDwjbxxglgdyw(this.companyid).then(res => {
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
      this.$api.quality.selectDwjbxxglcw({companytype:this.dtlData.companytypes,companyid:this.companyid}).then(res => {
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
        this.$api.quality.saveDwjbxxglBase(params).then(res => {
          if(res.code===200){
            alert("保存成功,公司ID:"+res.data);
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
        this.$api.quality.updateDwjbxxglBase(params).then(res => {
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
      this.$api.quality.saveDwjbxxglgdyw(params).then(res => {
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
