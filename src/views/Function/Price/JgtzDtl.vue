<template>
<div class="jgtzdtl">
  <el-dialog :visible="dtlVisible" :width="dialogWidth" @close="closeDialog">
    <el-form :model="base1" label-width="100px" label-position="right">
      <el-form-item prop="goodsid" label="货品ID" style="float:left;">
        <el-input v-model.number="base1.goodsid" disabled="true"></el-input>
      </el-form-item>
      <el-form-item prop="companyname" label="供应商" style="float:left;">
        <el-input v-model="base1.companyname" disabled="true"></el-input>
      </el-form-item>
      <el-form-item prop="bzsj" label="标准零售价" style="float:left;">
        <el-input v-model="base1.bzsj" :disabled='deptid===209435||deptid===83742'></el-input>
      </el-form-item>
      <el-form-item prop="qdjg" label="渠道价格" style="float:left;">
        <el-input v-model="base1.qdjg"></el-input>
      </el-form-item>
      <el-form-item  style="float:right;">
        <el-button type="primary" @click="saveAll1">保存</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="base2" label-width="100px">
      <el-form-item prop="yxj" label="渠道优先级" style="clear:both;float:left;">
        <el-input v-model.number="base2.yxj" disabled="true"></el-input>
      </el-form-item>
      <el-form-item prop="pftd124" label="批发透底" style="float:left;">
        <el-input v-model="base2.pftd124" disabled="true" :disabled='deptid===202372||deptid===200837'></el-input>
      </el-form-item>
      <el-form-item prop="lstd125" label="连锁透底" style="float:left;">
        <el-input v-model="base2.lstd125" :disabled='deptid===209435||deptid===83742'></el-input>
      </el-form-item>
      <el-form-item prop="zydbj" label="直营调拨价" style="float:left;">
        <el-input v-model="base2.zydbj" :disabled='deptid===209435||deptid===83742||inputmanid!==1811||inputmanid!==399||inputmanid!==0||inputmanid!==6681'></el-input>
      </el-form-item>
      <el-form-item prop="yytd" label="医院透底" style="float:left;">
        <el-input v-model="base2.yytd" :disabled='deptid===202372||deptid===200837'></el-input>
      </el-form-item>
      <el-form-item prop="xyj177" label="协议价" style="float:left;">
        <el-input v-model="base2.xyj177" :disabled='deptid===202372||deptid===200837'></el-input>
      </el-form-item>
      <el-form-item prop="zdj178" label="终端价" style="float:left;">
        <el-input v-model="base2.zdj178" :disabled='deptid===202372||deptid===200837'></el-input>
      </el-form-item>
      <el-form-item prop="yyzbj179" label="医院中标价" style="float:left;">
        <el-input v-model="base2.yyzbj179"></el-input>
      </el-form-item>
      <el-form-item prop="dbj3" label="调拨价" style="float:left;">
        <el-input v-model="base2.dbj3" :disabled='deptid===209435||deptid===83742'></el-input>
      </el-form-item>
      <el-form-item  style="float:right;">
        <el-button type="primary" @click="saveAll2">保存</el-button>
      </el-form-item>
    </el-form>
    <el-form :model="base3" label-width="100px">
      <el-form-item prop="lspj" label="零售牌价" style="float:left;">
        <el-input v-model.number="base3.lspj" disabled="true" :disabled='deptid===209435||deptid===83742'></el-input>
      </el-form-item>
      <el-form-item prop="lsdjxj" label="零售定价限价" style="float:left;">
        <el-input v-model="base3.lsdjxj" disabled="true" :disabled='deptid===209435||deptid===83742'></el-input>
      </el-form-item>
      <el-form-item prop="pfxj" label="最低批发限价" style="float:left;">
        <el-input v-model="base3.pfxj"></el-input>
      </el-form-item>
      <el-form-item prop="lscjxj" label="零售成交限价" style="float:left;">
        <el-input v-model="base3.lscjxj" :disabled='deptid===209435||deptid===83742'></el-input>
      </el-form-item>
      <el-form-item prop="wjpw" label="物价批文" style="float:left;">
        <el-input v-model="base3.wjpw" :disabled='deptid===209435||deptid===83742'></el-input>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button type="primary" @click="saveAll3">保存</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="info" @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'JgtzDtl',
  props:{dtlData:{type:Object}},
  data () {
    return {
      dtlVisible:false,
      dialogWidth:'1000px',
      deptid:Number(sessionStorage['deptid']),
      inputmanid:Number(sessionStorage['userid']),
      base1:{
        goodsid:null,
        companyname:null,
        bzsj:null,
        qdjg:null
      },
      base2:{
        yxj:null,
        pftd124:null,
        lstd125:null,
        zydbj:null,
        yytd:null,
        xyj177:null,
        zdj178:null,
        yyzbj179:null,
        dbj3:null
      },
      base3:{
        lspj:null,
        lsdjxj:null,
        pfxj:null,
        lscjxj:null,
        wjpw:null
      }
    }
  },
  methods:{
    saveAll1(){
      let params={};
      params.goodsid=this.base1.goodsid;
      params.bzsj=this.base1.bzsj;
      params.qdjg=this.base1.qdjg;
      params.inputmanid=Number(sessionStorage['userid']);
      params.inputman=sessionStorage['username'];
      params.channelid=this.dtlData.channelid;
      this.$api.price.updateAll1(params).then(res => {
        if(res.code===200){
          if(res.data===1){
            alert("保存成功");
          }else {
            alert(res.msg);
            return false;
          }
        }
      }).catch(error=>{
        return false;
      })
    },
    saveAll2(){
      let params={};
      params.goodsid=this.base1.goodsid;
      params.pftd124=this.base2.pftd124;
      params.lstd125=this.base2.lstd125;
      params.yytd=this.base2.yytd;
      params.xyj177=this.base2.xyj177;
      params.zdj178=this.base2.zdj178;
      params.yyzbj179=this.base2.yyzbj179;
      params.dbj3=this.base2.dbj3;
      params.zydbj=this.base2.zydbj;
      params.inputmanid=Number(sessionStorage['userid']);
      params.inputman=sessionStorage['username'];
      this.$api.price.updateAll2(params).then(res => {
        if(res.code===200){
          if(res.data===1){
            alert("保存成功");
          }else {
            alert(res.msg);
            return false;
          }
        }
      }).catch(error=>{
        return false;
      })
    },
    saveAll3(){
      let params={};
      params.goodsid=this.base1.goodsid;
      params.lspj=this.base3.lspj;
      params.lsdjxj=this.base3.lsdjxj;
      params.pfxj=this.base3.pfxj;
      params.lscjxj=this.base3.lscjxj;
      params.wjpw=this.base3.wjpw;
      params.inputmanid=Number(sessionStorage['userid']);
      params.inputman=sessionStorage['username'];
      this.$api.price.updateAll3(params).then(res => {
        if(res.code===200){
          if(res.data===1){
            alert("保存成功");
          }else {
            alert(res.msg);
            return false;
          }
        }
      }).catch(error=>{
        return false;
      })
    },
    closeDialog(){
      this.dtlVisible=false;
      this.$parent.dtlVisible=false;
    }
  }
}
</script>

<style scoped>
  .jgtzdtl >>> .el-dialog__body{padding:0 2px 0 2px;height:400px;width:97%;margin:0 auto;}
</style>
