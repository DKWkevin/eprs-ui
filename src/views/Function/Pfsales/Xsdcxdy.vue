<template>
<div id="prints">
  <div id="print">
    <div v-for="(item,index) in list" :key="index" class="wh790 middle">
        <div class="wh100"><span class="label">辽宁成大方圆医药有限公司随货同行单</span></div>
        <div class="wh100" style="height:20px;">
          <div class="ft14" style="width:120px;float:right;font-size:10px;">Page {{index+1}} of {{list.length}}</div>
        </div>
        <div class="wh100" style="height:20px;">
          <div class="fl ft14" style="width:120px;"><span>合同号:</span><span>{{item.orderid}}</span></div>
          <div class="fl ft14" style="width:180px;"><span>合同日期:</span><span>{{dateFormat('YYYY/mm/dd',item.credate)}}</span></div>
          <div class="fl ft14" style="width:120px;"><span>订货人:</span><span>{{item.inputmanname}}</span></div>
          <div class="fl ft14" style="width:180px;"><span>到货日期:</span><span>{{dateFormat('YYYY/mm/dd',item.afdate)}}</span></div>
          <div class="fl ft14" style="width:180px;"><span>打印日期:</span><span>{{dateFormat('YYYY/mm/dd',new Date())}}</span></div>
        </div>
        <div class="wh100 br" style="height:auto">
          <table class="toptable">
            <tbody>
            <tr>
              <td>供应商名称</td>
              <td>{{item.companyname}}</td>
              <td>供应商ID</td>
              <td>{{item.companyid}}</td>
              <td>付款方式</td>
              <td>电汇</td>
            </tr>
            <tr>
              <td>开户行</td>
              <td>{{item.bankname}}</td>
              <td>账号</td>
              <td colspan="3">{{item.accno}}</td>
            </tr>
            </tbody>
          </table>
          <table class="doctable">
            <colgroup>
              <col style="width:200px;"></col>
              <col style="width:70px;"></col>
              <col style="width:70px;"></col>
              <col style="width:100px;"></col>
              <col style="width:60px;"></col>
              <col style="width:60px;"></col>
              <col style="width:60px;"></col>
              <col style="width:60px;"></col>
              <col style="width:30px;"></col>
              <col style="width:30px;"></col>
              <col style="width:60px;"></col>
              <col style="width:60px;"></col>
            </colgroup>
            <thead>
              <tr>
                <td>货品ID</td>
                <td>品名(剂型)/规格/批准文号/税率/产地/生产企业/上市许可持有人/生产企业许可证号/储运条件</td>
                <td>数量</td>
                <td>单位</td>
                <td>单价</td>
                <td>金额</td>
                <td>包装</td>
                <td>批号</td>
                <td>有效期至</td>
                <td>质量状态</td>
                <td>出库</td>
                <td>验收</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{item.goodsid+'/'+item.goodsname+'/'+item.goodstype+'/'+item.prodarea+'/'+item.goodsunit}}</td>
                <td>{{item.realqty}}</td>
                <td>{{item.unitprice}}</td>
                <td>{{item.total_lines}}</td>
                <td>{{item.htsl}}</td>
                <td>{{item.pfkc}}</td>
                <td>{{item.lskc}}</td>
                <td>{{item.dqkc}}</td>
                <td>{{item.sydb}}</td>
                <td>{{item.syxl}}</td>
                <td>{{item.lyxts}}</td>
                <td>{{item.lsdbyxts}}</td>
                <td>{{item.plztyxts}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="wh100" style="height:20px;">
          <div class="fl ft14" style="width:200px;text-align:left;"><span>金额合计:</span><span>{{item.total_lines}}</span></div>
          <div class="fl ft14" style="width:400px;text-align:left;"><span>大写:</span><span>{{totaldx}}</span></div>
          <div class="fl ft14" style="width:180px;text-align:left;"><span>小写:</span><span>{{item.total_lines}}</span></div>
        </div>
        <div class="wh100" style="height:20px;clear:both;">
          <div class="fl ft14" style="width:200px;text-align:left;"><span>申请人:</span><span></span></div>
          <div class="fl ft14" style="width:400px;text-align:left;"><span>审核人:</span><span></span></div>
          <div class="fl ft14" style="width:180px;text-align:left;"><span>审批人:</span><span></span></div>
        </div>
      <div style="page-break-after: always;"></div>
    </div>
  </div>
  <div style="position: absolute;top:5px;left:10px;"><el-button v-print="'#print'" type="primary">打印</el-button><el-button @click="close" type="info">取消</el-button></div>
</div>
</template>

<script>
import '@/assets/css/print.css'
import {dateFormat} from "@/utils/functions"
export default {
  name: 'Xsdcxdy',
  props:{dtlData:{type:Object}},
  data(){
    return{
      list:[],
      totaldx:null

    }
  },
  created(){
    this.selectDoc();
  },
  methods:{
    selectDoc(){
      console.log(111)
      /*this.$api.pfsales.printXsdcx(this.dtlData).then(res => {
        if(res.code===200){
            this.list=res.data;
          this.$api.pfsales.printXsdcx(this.dtlData).then(res => {
            if(res.code===200){
              this.totaldx=res.data.total;
            }
          }).catch(error => {
            return false;
          })
        }
      }).catch(error => {
        return false;
      })*/
    },
    //日期初始化方法
    dateFormat(format,date){
      return dateFormat(format,date);
    },
    close(){
      this.$parent.xsdcxPrintStatus=false;
    }
  }
}
</script>

<style media="print">
#prints{width:100%;height:100%;position: fixed;top:0;left: 0;background: white;z-index: 99999}
@page {
  size: auto;
  /*margin: 3mm;*/
}

html {
  background-color: #ffffff;
  /*margin: 0;*/
}

body {
  border: solid 1px #ffffff;
  /*margin: 10mm 15mm 10mm 15mm;*/
}
</style>
