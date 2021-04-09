<template>
<div id="prints">
  <div id="print">
    <div v-for="(trim,index) in list" :key="index" class="wh790 middle">
        <div class="wh100"><span class="label">预付货款审批表</span></div>
        <div class="wh100" style="height:20px;">
          <div class="fl ft14" style="width:120px;"><span>合同号:</span><span>{{trim.orderid}}</span></div>
          <div class="fl ft14" style="width:180px;"><span>合同日期:</span><span>{{trim.credate}}</span></div>
          <div class="fl ft14" style="width:120px;"><span>订货人:</span><span>{{trim.inputmanname}}</span></div>
          <div class="fl ft14" style="width:180px;"><span>到货日期:</span><span>{{trim.date}}</span></div>
          <div class="fl ft14" style="width:180px;"><span>打印日期:</span><span>{{trim.date}}</span></div>
        </div>
        <div class="wh100 br" style="height:auto">
          <table class="toptable">
            <tbody>
            <tr>
              <td>供应商名称</td>
              <td>{{trim.companyname}}</td>
              <td>供应商ID</td>
              <td>{{trim.companyid}}</td>
              <td>付款方式</td>
              <td>{{trim.paymode}}</td>
            </tr>
            <tr>
              <td>开户行</td>
              <td>{{trim.bankname}}</td>
              <td>账号</td>
              <td colspan="3">{{trim.bankno}}</td>
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
              <col style="width:60px;"></col>
            </colgroup>
            <thead>
              <tr>
                <td>品 规</td>
                <td>数量</td>
                <td>单价</td>
                <td>付款金额</td>
                <td>有效合同</td>
                <td>辽批库存</td>
                <td>辽连库存</td>
                <td>门店库存</td>
                <td>上月调拨</td>
                <td>上月销量</td>
                <td>连锁库存预销天数</td>
                <td>连锁大库预销天数</td>
                <td>公司库存预销天数</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tr,index) in trim.list" :key="index">
                <td>{{tr.id}}</td>
                <td>{{tr.id2}}</td>
                <td>{{tr.id3}}</td>
                <td>{{tr.id4}}</td>
                <td>{{tr.id5}}</td>
                <td>{{tr.id6}}</td>
                <td>{{tr.id7}}</td>
                <td>{{tr.id8}}</td>
                <td>{{tr.id9}}</td>
                <td>{{tr.id10}}</td>
                <td>{{tr.id11}}</td>
                <td>{{tr.id12}}</td>
                <td>{{tr.id13}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="wh100" style="height:20px;">
          <div class="fl ft14" style="width:200px;text-align:left;"><span>金额合计:</span><span>{{trim.total}}</span></div>
          <div class="fl ft14" style="width:400px;text-align:left;"><span>大写:</span><span>{{trim.totaldx}}</span></div>
          <div class="fl ft14" style="width:180px;text-align:left;"><span>小写:</span><span>{{trim.totalxx}}</span></div>
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
export default {
  name: 'print',
  props:{dtlData:{type:Object}},
  data(){
    return{
      list:[
        {
          list:[
          {id:'32962/B瑞格列奈片(诺和龙)/1mg*30T/诺和丹麦/盒',id2:1000,id3:49.824,id4:'49,824.00',id5:3000,id6:0,id7:650,id8:1197,id9:1855,id10:145,id11:91,id12:5436,id13:null},
          {id:'100247/B瑞格列奈片(诺和龙)/2mg*30T/诺和丹麦/盒',id2:1800,id3:49.824,id4:'49,824.00',id5:3000,id6:0,id7:650,id8:1197,id9:1855,id10:145,id11:91,id12:5436,id13:null}
          ],
          hth:273275,
          date:'2020/06/29',
          name:'牟晓黎',
          companyname:'安徽华源医药集团股份有限公司',
          companyid:31761,
          paymode:'电汇',
          bankname:'中国工商银行太和县支行',
          bankno:'1311045029200002528',
          total:153756,
          totaldx:'壹拾伍万叁仟柒佰伍拾陆圆整',
          totalxx:153756,
        }
      ]

    }
  },
  created(){
    this.selectDoc();
  },
  methods:{
    selectDoc(){
      this.$api.yfdddy.selectPrint(this.dtlData).then(res => {
        if(res.code===200){
            this.list=res.data;
        }
      }).catch(error => {
        return false;
      })
    },
    close(){
      this.$parent.printVisible=false;
    }
  }
}
</script>

<style scoped>
#prints{width:100%;height:100%;position: fixed;top:0;left: 0;background: white;z-index: 99999}
</style>
