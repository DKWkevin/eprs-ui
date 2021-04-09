<template>
<div>
  <e-query-collapse>
    <template v-slot:query>
      <el-form :model="gskhxycxQueryForm" :inline="true">
        <el-form-item-hov prop="customid" label="客户ID" v-model="gskhxycxQueryForm.customid" id="customid" @openHov="openQueryHov"></el-form-item-hov>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:gskhxycx:select" @click="queryFunction"></kt-button>
      </template>
    </template>
  </e-query-collapse>
  <e-tables
    :table-data="gskhxycxTableData"
    :table-width-status="false"
    :table-height="gskhxycxTableHeight"
    :pageNum="gskhxycxPageNum"
    :pageSize="gskhxycxPageSize"
    :total="gskhxycxTotal"
    :loading="gskhxycxLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop="customid" label="客户ID"></e-tables-columns>
    <e-tables-columns prop="customid2" label="客户名称"></e-tables-columns>
    <e-tables-columns prop="ifcontrol" label="信用控制标志"></e-tables-columns>
    <e-tables-columns prop="creditmoney" label="信用限额"></e-tables-columns>
    <e-tables-columns prop="inviddate" label="信用期限"></e-tables-columns>
    <e-tables-columns prop="prepaylimit" label="预付限额"></e-tables-columns>
    <e-tables-columns prop="creditgrade" label="信用等级"></e-tables-columns>
    <e-tables-columns prop="companyid" label="公司ID"></e-tables-columns>
    <e-tables-columns prop="companyname" label="公司名称"></e-tables-columns>
  </e-tables>
  <hov-tools v-if="gskhxycxHovVisible" :hov-data="gskhxycxHov"></hov-tools>
</div>
</template>

<script>
  import KtButton from "../../Core/KtButton";
  import HovTools from "../../Core/HovTools";
  export default {
    name: "gskhxycx",
    components: {HovTools, KtButton},
    data(){
      return {
        gskhxycxQueryForm:{
          customid:null
        },
        gskhxycxTableData:[],
        gskhxycxPageNum:1,
        gskhxycxPageSize:50,
        gskhxycxTotal:0,
        gskhxycxLoading:false,
        gskhxycxTableHeight:300,
        gskhxycxHovVisible:false,
        gskhxycxHov:{
          hovTitle:'客户查询',
          hovUrl: "customidhov/select",
          afterStatus: false,
          fillDataName: "gskhxycxQueryForm",
          parentVisible:'gskhxycxHovVisible',
          hovColumns: [
            {id: "customid", name: "客户ID",queryStatus:true,dataStatus:2,fillid:"customid"},
            {id: "customname", name: "客户名称",queryStatus:true,dataStatus:1},
            {id: "customopcode", name: "客户操作码",queryStatus:true,dataStatus:1}
          ]
        },
      }
    },
    created() {
      this.gskhxycxTableHeight = (window.innerHeight - 240);
    },
    methods:{
      queryFunction(){
        this.selectDoc(1, this.gskhxycxPageSize);
      },
      handleChange(data){
        this.selectDoc(data.pageNum, data.pageSize);
      },
      selectDoc(pageNum,pageSize){
        let params = {};
        let formData = this.gskhxycxQueryForm;
        Object.keys(formData).forEach(item => {
          if (formData[item] !== null && formData[item] !== "") {
            params[item] = formData[item];
          }
        })
        params.companyid = Number(sessionStorage['companyid']);
        this.gskhxycxLoading = true;
        this.gskhxycxTableData = [];
        this.$api.pfsales.selectGskhxycx({pageNum:pageNum,pageSize:pageSize,params: params}).then(res => {
          this.gskhxycxTableData = res.data.content;
          this.gskhxycxPageNum = res.data.pageNum;
          this.gskhxycxPageSize = res.data.pageSize;
          this.gskhxycxTotal = res.data.totalSize;
          this.gskhxycxLoading = false;
        }).catch(() => {
          this.gskhxycxPageNum = 1;
          this.gskhxycxTotal = 0;
          this.gskhxycxLoading = false;
          return false;
        })
      },
      openQueryHov(){
        this.gskhxycxHovVisible = true;
      }
    }
  }
</script>

<style scoped>

</style>
