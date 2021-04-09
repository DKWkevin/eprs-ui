<template>
<div class="whspbhsxlsdtl">
  <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" :width="dialogWidth"  :destroy-on-close="true" @close="colseDialog" :close-on-click-modal="false">
    <el-form :model="base" :inline="inline">
      <el-form-item label="公司ID">
        <el-input v-model.number="base.companyid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input v-model="base.companyname" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="货品ID">
        <el-input v-model.number="base.goodsid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="品名">
        <el-input v-model="base.goodsname" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="规格">
        <el-input v-model="base.goodstype" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="base.goodsunit" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="产地">
        <el-input v-model="base.prodarea" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="供应商ID">
        <el-input v-model.number="base.supplyid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="供应商名称">
        <el-input v-model="base.supplyname" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="采购渠道ID">
        <el-input v-model.number="base.channelid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="对方联系方式ID">
        <el-select v-model="base.contactInfoId" clearable>
          <el-option v-for="item in contactOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="经/代销">
        <el-select v-model="base.salesmode" :disabled="true">
          <el-option value="经销" label="经销"></el-option>
          <el-option value="代销" label="代销"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="付款方式">
        <el-select v-model="base.paymode" :disabled="true">
          <el-option v-for="item in paymodeOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账期">
        <el-input v-model="base.payterm" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="驱动方式">
        <el-select v-model="base.drivemode" clearable>
          <el-option :value="1" label="销量"></el-option>
          <el-option :value="2" label="供应商补货"></el-option>
          <el-option :value="3" label="订单"></el-option>
          <el-option :value="0" label="待定"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="定速日销量">
        <el-input v-model.number="base.daysales_d"></el-input>
      </el-form-item>
      <el-form-item label="日均销量">
        <el-input v-model.number="base.daysales" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="怠速下限">
        <el-input v-model.number="base.autoldledown" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="大库下限天数">
        <el-input v-model.number="base.daysdd"></el-input>
      </el-form-item>
      <el-form-item label="大库上限天数">
        <el-input v-model.number="base.daysud"></el-input>
      </el-form-item>
      <el-form-item label="设定下限">
        <el-input v-model.number="base.dedown"></el-input>
      </el-form-item>
      <el-form-item label="设定上限">
        <el-input v-model.number="base.deup"></el-input>
      </el-form-item>
      <el-form-item label="计算下限">
        <el-input v-model.number="base.caldown" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="计算上限">
        <el-input v-model.number="base.calup" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="使用下限">
        <el-input v-model.number="base.usedown" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="使用上限">
        <el-input v-model.number="base.useup" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="门店下限天数">
        <el-input v-model.number="base.daysds"></el-input>
      </el-form-item>
      <el-form-item label="门店上限天数">
        <el-input v-model.number="base.daysus"></el-input>
      </el-form-item>
      <el-form-item label="门店库存超限数量">
        <el-input v-model.number="base.mdcxsl" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="批零下限">
        <el-input v-model.number="base.plxx" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="批零上限">
        <el-input v-model.number="base.plsx" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="到货周期">
        <el-input v-model.number="base.dhzq"></el-input>
      </el-form-item>
      <el-form-item label="最小批量">
        <el-input v-model.number="base.minbach"></el-input>
      </el-form-item>
      <el-form-item label="仓储上限">
        <el-input v-model.number="base.houseup"></el-input>
      </el-form-item>
      <el-form-item label="最小包装">
        <el-select v-model="base.minpack" clearable>
          <el-option :value="1" label="大包"></el-option>
          <el-option :value="2" label="中包"></el-option>
          <el-option :value="3" label="小包"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="季节系数">
        <el-input v-model.number="base.jjxs"></el-input>
      </el-form-item>
      <el-form-item label="是否可拆分" clearable>
        <el-select v-model="base.ifsplit">
          <el-option :value="0" label="不可拆"></el-option>
          <el-option :value="1" label="可拆"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="base.usestatus" clearable>
          <el-option :value="1" label="正式"></el-option>
          <el-option :value="2" label="缺少采购渠道"></el-option>
          <el-option :value="3" label="缺少参数"></el-option>
          <el-option :value="0" label="作废"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="修改人ID">
        <el-input v-model.number="base.modimanid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="修改人">
        <el-input v-model="base.modiman" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="计算日期">
        <el-date-picker v-model="base.caldate" type="datetime" :disabled="true"></el-date-picker>
      </el-form-item>
      <el-form-item label="中包">
        <el-input v-model.number="base.zb" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="大包">
        <el-input v-model.number="base.db" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item style="width:600px;">
        <div></div>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="insertDtl">保存</el-button>
      <el-button type="info" @click="colseDialog">取消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'WhspbhsxlsDtl',
  props:{
    dtlData:{type:Object},
    paymodeOptions:{type:Array}
  },
  data(){
    return {
      dialogVisible:false,
      dialogTitle:'修改细单',
      dialogWidth:'1000px',
      inline:true,
      labelWidth:'124px',
      contactOptions:[],
      base:{
        companyid:null,
        companyname:null,
        goodsid:null,
        goodsname:null,
        goodstype:null,
        goodsunit:null,
        prodarea:null,
        supplyid:null,
        supplyname:null,
        channelid:null,
        contactInfoId:null,
        salesmode:null,
        paymode:null,
        payterm:null,
        drivemode:null,
        daysales_d:null,
        daysales:null,
        autoldledown:null,
        daysdd:null,
        daysud:null,
        dedown:null,
        deup:null,
        caldown:null,
        calup:null,
        usedown:null,
        useup:null,
        daysds:null,
        daysus:null,
        mdcxsl:null,
        plxx:null,
        plsx:null,
        dhzq:null,
        minbach:null,
        houseup:null,
        minpack:null,
        jjxs:null,
        ifsplit:null,
        usestatus:null,
        modimanid:null,
        modiman:null,
        caldate:null,
        zb:null,
        db:null
      }
    }
  },
  created(){
    this.contactOptions.push({value:0,label:0});
    this.contactOptions.push({value:this.dtlData.contactman,label:this.dtlData.contactman});
    Object.keys(this.dtlData).forEach(e => {
      this.base[e]=this.dtlData[e];
    });
  },
  mounted(){
    this.dialogVisible=true;
  },
  methods:{
    insertDtl(){
      let params={};
      Object.keys(this.base).forEach(e => {
        params[e]=this.base[e];
      });
      if(params.daysdd>(params.dhzq*2)){
        alert("大库下限天数不能大于2*到货周期");
        return false;
      }
      if(params.daysud>(params.dhzq*4)){
        alert("大库下限天数不能大于4*到货周期");
        return false;
      }
      let zqzxbz=0;
      if(params.minpack===1){
        zqzxbz=0;
      }else if(params.minpack===2){
        zqzxbz=2;
      }else if(params.minpack===3){
        zqzxbz=1;
      }
      let baseunitqty=0;
      this.$api.quality.selectHpjcsjwhBzxx({goodsid:this.goodsid,unittype:zqzxbz}).then(res => {
        if (res.code === 200) {
          baseunitqty=res.data;
        }
      }).catch(error => {
        return false;
      });
      let num=params.useup-params.usedown;
      if(params.minbach>num&&baseunitqty!==params.minbach&&params.minbach>baseunitqty){
        alert("最小批量不能大于使用上限-使用下限");
        return false;
      }
      this.$api.replenish.insertWhspbhsxls(params).then(res => {
        if(res.code===200){
          alert('修改成功');
          this.$parent.queryFunction('query');
          this.colseDialog();
        }
      }).catch(error => {
        return false;
      })
    },
    colseDialog(){
      this.dialogVisible=false;
      this.$refs.dtlVisible =false;
    }
  }
}
</script>

<style>
.whspbhsxlsdtl .el-dialog{max-height:580px;height:580px;}
.whspbhsxlsdtl .el-dialog__body{padding:0 2px 0 2px;overflow:auto;height:480px;}
.whspbhsxlsdtl .el-form-item{width:300px;}
.whspbhsxlsdtl .el-form-item__label{min-width:100px;max-width:130px;}
.whspbhsxlsdtl .el-input__inner{width:150px;}
.whspbhsxlsdtl .el-form-item__content{width:150px;}
</style>
