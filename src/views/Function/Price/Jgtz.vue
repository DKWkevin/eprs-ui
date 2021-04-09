<template>
<div>
  <e-query
    ref="query"
    :form-list="formList"
    :form-data="formData"
    :btn-options="btnOptions"
    @openHov="queryHov"
    @query="queryFunction"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    @handle="handle"
    @currentChange="handlePageChange"
    @sizeChange="handlePageChange"
  ></e-table>
  <jgtz-dtl v-if="dtlVisible" :dtlData="dtlData"></jgtz-dtl>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
</div>
</template>

<script>
import EQuery from "@/views/Core/EQuery";
import ETable from "@/views/Core/ETable";
import HovTools from "@/views/Core/HovTools";
import JgtzDtl from "@/views/Function/Price/JgtzDtl";
export default {
  name: 'Jgtz',
  components:{JgtzDtl, HovTools, ETable, EQuery},
  data(){
    return {
      formList:[
        {type:'inputHov',id:'goodsid',label:'货品ID'}
      ],
      formData:{goodsid:null},
      btnOptions:[
        {id:'query', icon:"fa fa-search", label:"action.search", perms:"price:jgtz:select"}
      ],
      tableColumns:[
        {type:0,prop:'pcdtpeid',label:'部门ID',tableStatus:0},
        {type:0,prop:'companyname',label:'供应商',tableStatus:0},
        {type:0,prop:'deptname',label:'部门名称',tableStatus:0},
        {type:0,prop:'goodsid',label:'货品ID',tableStatus:0},
        {type:0,prop:'goodsname',label:'品名',tableStatus:0},
        {type:0,prop:'goodstype',label:'规格',tableStatus:0},
        {type:0,prop:'goodsunit',label:'单位',tableStatus:0},
        {type:0,prop:'prodarea',label:'产地',tableStatus:0},
        {type:0,prop:'lspj',label:'零售牌价',tableStatus:0},
        {type:0,prop:'wjpw',label:'物价批文',tableStatus:0},
        {type:0,prop:'qdjg',label:'渠道价格',tableStatus:0},
        {type:0,prop:'bzsj',label:'标准零售价',tableStatus:0},
        {type:0,prop:'yxj',label:'渠道优先级',tableStatus:0},
        {type:0,prop:'pftd124',label:'批发透底124',tableStatus:0},
        {type:0,prop:'lstd125',label:'连锁透底125',tableStatus:0},
        {type:0,prop:'xyj177',label:'协议价177',tableStatus:0},
        {type:0,prop:'zdj178',label:'终端价178',tableStatus:0},
        {type:0,prop:'yyzbj179',label:'医院中标价179',tableStatus:0},
        {type:0,prop:'dbj3',label:'调拨价3',tableStatus:0},
        {type:0,prop:'lsdjxj',label:'零售定价限价',tableStatus:0},
        {type:0,prop:'pfxj',label:'最近批发限价',tableStatus:0},
        {type:0,prop:'lscjxj',label:'零售成交限价',tableStatus:0},
        {type:0,prop:'channelid',label:'渠道ID',tableStatus:0},
        {type:0,prop:'zydbj',label:'直营调拨价',tableStatus:0},
        {type:0,prop:'yytd',label:'医院透底',tableStatus:0},
        {type:1,prop:'caozuo',label:'操作',fixed:'right',width:80,widthStatus:true,tableStatus:0,options:[
            {id:'edit',icon:"fa fa-edit", label:"action.edit",perms:"price:jgtz:select"}
          ]
        }
      ],
      tableData:[],
      tableHeight:0,
      dtlVisible:false,
      dtlData:{},
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
      }
    }
  },
  created() {
    this.tableHeight=(window.innerHeight-240);
  },
  methods:{
    queryFunction(data){
      if(data === "query"){
        let pageSize=this.$refs.doctable.pageSize;
        this.selectDoc(1,pageSize);
      }
    },
    handlePageChange(data){
      this.selectDoc(data.pageNum,data.pageSize);
    },
    selectDoc(pageNum,pageSize){
      let formData=this.formData;
      let params={};
      if(this.returnValue(formData.goodsid)===true){
        params.goodsid=formData.goodsid;
      }
      if(Object.keys(params).length===0){
        params=null;
      }
      this.tableData=[];
      this.loading=true;
      this.$api.price.selectJgtz({pageNum:pageNum,pageSize:pageSize,params:params}).then(res => {
        if(res.code === 200){
          this.tableData = res.data.content;
          this.$refs.doctable.pageNum=res.data.pageNum;
          this.$refs.doctable.pageSize=res.data.pageSize;
          this.$refs.doctable.total=res.data.totalSize;
          this.loading=false;
        }
      }).catch(error => {
        this.loading=false;
        return false;
      })
    },
    handle(data){
      this.dtlData=data.row;
      this.dtlVisible=true;
    },
    queryHov(){
      this.goodsVisible=true;
    },
    returnValue(data){
      return data !== null && data !== "";
    }
  }
}
</script>

<style scoped>

</style>
