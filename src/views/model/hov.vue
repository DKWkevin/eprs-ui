<template>
<div>
  <hov-tools v-if="batchVisible" :hov-data="batchHov"></hov-tools>
  <hov-tools v-if="companyVisible" :hov-data="companyHov"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
  <hov-tools v-if="supplyVisible" :hov-data="supplyHov"></hov-tools>
  <hov-tools v-if="contactinfoVisible" :hov-data="contactinfoHov"></hov-tools>
  <hov-tools v-if="employeeVisible" :hov-data="employeeHov"></hov-tools>
</div>
</template>

<script>
export default {
  name: 'hov',
  data(){
    return{
      batchVisible:false,
      batchHov:{
        hovTitle:'批次查询',
        hovUrl: "batchidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'batchVisible',
        hovColumns:
          [
            {id: "batchid", name: "批次ID",queryStatus:true,dataStatus:2,fillid:"batchid"},
            {id: "companyid", name: "",value:Number(sessionStorage['companyid']),queryStatus:false,dataStatus:2}
          ]
      },
      companyVisible:false,
      companyHov:{
        hovTitle:'公司查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'companyVisible',
        hovColumns:
          [
            {id: "companyid", name: "公司ID",queryStatus:true,dataStatus:2,fillid:"companyid"},
            {id: "companyname", name: "公司名称",queryStatus:true,dataStatus:1},
            {id: "companyopcode", name: "公司操作码",queryStatus:true,dataStatus:1}
          ]
      },
      goodsVisible:false,
      goodsHov:{
        hovTitle:'货品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'goodsVisible',
        hovColumns:
          [
            {id: "goodsid", name: "货品ID",queryStatus:true,dataStatus:2,fillid:"goodsid"},
            {id: "goodsname", name: "货品名称",queryStatus:true,dataStatus:1},
            {id: "opcode", name: "货品操作码",queryStatus:true,dataStatus:1},
            {id: "goodstype", name: "规格",queryStatus:false,dataStatus:1},
            {id: "goodsunit", name: "单位",queryStatus:false,dataStatus:1},
            {id: "prodarea", name: "产地",queryStatus:false,dataStatus:1}
          ]
      },
      supplyVisible:false,
      supplyHov:{
        hovTitle:'供应商查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'supplyVisible',
        hovColumns:
          [
            {id: "companyid", name: "供应商ID",queryStatus:true,dataStatus:2,fillid:"supplyid"},
            {id: "companyname", name: "供应商名称",queryStatus:true,dataStatus:1},
            {id: "companyopcode", name: "供应商操作码",queryStatus:true,dataStatus:1}
          ]
      },
      contactinfoVisible:false,
      contactinfoHov:{
        hovTitle:'对方联系方式查询',
        hovUrl: "contactinfoidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'contactinfoVisible',
        hovColumns:
          [
            {id: "contactinfoid", name: "对方联系方式ID",queryStatus:true,dataStatus:2,fillid:"contactinfoid"},
            {id: "contactman", name: "对方联系方式名称",queryStatus:true,dataStatus:1}
          ]
      },
      employeeVisible:false,
      employeeHov:{
        hovTitle:'录入人查询',
        hovUrl: "employeeididhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'employeeVisible',
        hovColumns:
          [
            {id: "employeeid", name: "录入人ID",queryStatus:true,dataStatus:2,fillid:"employeeid"},
            {id: "employeename", name: "录入人名称",queryStatus:true,dataStatus:1},
            {id: "employeeopcode", name: "录入人操作码",queryStatus:true,dataStatus:1}
          ]
      },
    }
  },
  methods:{
    openHov(id){
      selectDdl(this.formData,'id','paymode','AP_PAYMODE');
      if(id==="companyid"){
        this.companyVisible=true;
      }else if(id==="goodsid"){
        this.goodsVisible=true;
      }else if(id==="supplyid"){
        this.supplyVisible=true;
      }else if(id === "contactinfoid"){
        this.contactinfoVisible=true;
      }else if(id === "batchid"){
        this.batchVisible=true;
      }
    }
  }
}
</script>

<style scoped>

</style>
