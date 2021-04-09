<template>
<div>
  <e-query
    ref="query"
    :form-list="formList"
    :form-data="formData"
    :btn-options="btnOptions"
    @query="queryFunction"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :table-width-status="false"
    :loading="loading"
    @sizeChange="handleChange"
    @currentChange="handleChange"
  ></e-table>
  <div v-if="dtlVisible">
    <el-dialog  :visible="dtlVisibles" :title="dtlTitle" :top="dialogTop" :width="dialogWidth"
               :destroy-on-close="true" :close-on-click-modal="false" @close="closeDialog">
      <el-form :inline="true">
        <el-form-item label="地区ID">
          <el-select v-model="dtlData.cityid">
            <el-option v-for="(item,index) in cityOptions" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店类型">
          <el-select v-model="dtlData.countertype">
            <el-option value="" label="全部"></el-option>
            <el-option value="A" label="A"></el-option>
            <el-option value="B" label="B"></el-option>
            <el-option value="C" label="C"></el-option>
            <el-option value="D" label="D"></el-option>
            <el-option value="E" label="E"></el-option>
            <el-option value="F" label="F"></el-option>
            <el-option value="G" label="G"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下限天数">
          <el-input v-model="dtlData.downdays"></el-input>
        </el-form-item>
        <el-form-item label="上限天数A">
          <el-input v-model="dtlData.updaysa"></el-input>
        </el-form-item>
        <el-form-item label="上限天数B">
          <el-input v-model="dtlData.updaysb"></el-input>
        </el-form-item>
        <el-form-item label="上限天数C">
          <el-input v-model="dtlData.updaysc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="updatedayssaveall">保存</el-button>
        <el-button type="info" @click="closeDialog">取消</el-button>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script>
//门店配送属性调整
import EQuery from "@/views/Core/EQuery";
import ETable from "@/views/Core/ETable";
import {selectCityid} from "@/utils/drops";
export default {
  name: 'Mdpssxtz',
  components:{ETable, EQuery},
  data(){
    return{
      formList:[
        {type:'select',id:'cityid',label:'地区ID',options:[]},
        {type:'select',id:'countertype',label:'门店类型',options:[
          {value:"A",label:'A'},{value:"B",label:'B'},{value:"C",label:'C'},{value:"D",label:'D'},
          {value:"E",label:'E'},{value:"F",label:'F'},{value:"G",label:'G'}]
        },
      ],
      formData:{
        cityid:null,countertype:null
      },
      btnOptions:[
        {id:'query',icon:"fa fa-search", label:"action.search",perms:"business:mdpssxtz:select"},
        {id:'update',icon:"fa fa-search", label:"action.xgts",perms:"business:mdpssxtz:update"}
      ],
      tableColumns:[
        {type:0,prop:'counterid',label:'门店ID',tableStatus:0},
        {type:0,prop:'companyname',label:'门店名称',tableStatus:0},
        {type:0,prop:'countertype',label:'门店类型',tableStatus:0},
        {type:0,prop:'ldlegears',label:'怠速档位',tableStatus:0},
        {type:0,prop:'downdays',label:'下限天数',tableStatus:0},
        {type:0,prop:'updaysa',label:'上限天数A',tableStatus:0},
        {type:0,prop:'updaysb',label:'上限天数B',tableStatus:0},
        {type:0,prop:'updaysc',label:'上限天数C',tableStatus:0},
      ],
      tableData:[],
      tableHeight:0,
      loading:false,
      dtlVisible:false,
      dtlVisibles:true,
      dtlTitle:'修改信息',
      dialogTop:'12vh',
      dialogWidth:'1000px',
      dtlData:{cityid:null,countertype:'',downdays:null,updaysa:null,updaysb:null,updaysc:null},
      dtlHeight:300,
      cityOptions:[]
    }
  },
  created(){
    this.tableHeight=(window.innerHeight-240);
    let params=[];
    this.$api.hov.cityid({pageNum:1,pageSize:999,params:null}).then(res => {
      if(res.code===200){
        res.data.content.forEach(e=>{
          let tel={};
          tel.value=e.cityid;
          tel.label = e.cityname;
          params.push(tel);
        });
      }
    }).catch(error => {
      return false;
    });
    this.formList[0].options=params;
    this.cityOptions=params;
  },
  methods:{
    queryFunction(data){
      if(data==="query"){
        let pageSize=this.$refs.doctable.pageSize;
        this.selectDoc(1,pageSize);
      }else{
        this.dtlVisible=true;
      }
    },
    handleChange(data){
      this.selectDoc(data.pageNum,data.pageSize);
    },
    selectDoc(pageNum,pageSize){
      let formData=this.formData;
      let params={};
      if(this.dateValue(formData.companyid)===true){
        params.companyid=formData.companyid;
      }
      if(this.dateValue(formData.customid)===true){
        params.customid=formData.customid;
      }
      if(Object.keys(params).length===0){
        params=null;
      }
      this.loading=true;
      this.$api.bussiness.selectMdpssxtzDoc({pageNum:pageNum,pageSize:pageSize,params:params}).then(res => {
        if(res.code===200){
          this.tableData=Object.freeze(res.data.content);
          this.$refs.doctable.pageNum=res.data .pageNum;
          this.$refs.doctable.pageSize=res.data.pageSize;
          this.$refs.doctable.total=res.data.totalSize;
          this.loading=false;
        }
      }).catch(error=>{
        this.loading=false;
        return false;
      })
    },
    updatedayssaveall(){
      let params={};
      if(this.dtlData.cityid!==null&&this.dtlData.cityid!==""){
        params.cityid=this.dtlData.cityid;
      }else{
        alert("请选择地区ID");
        return false;
      }
      if(this.dtlData.countertype!==""&&this.dtlData.countertype!==null){
        params.countertype=this.dtlData.countertype;
      }
      params.downdays=this.dtlData.downdays;
      params.updaysa=this.dtlData.updaysa;
      params.updaysb=this.dtlData.updaysb;
      params.updaysc=this.dtlData.updaysc;
      this.$api.bussiness.updateMdpssxtzDays(params).then(res=>{
        if(res.code===200){
          if(res.data>0){
            alert("修改成功,修改了"+res.data+"条数据");
            this.closeDialog();
          }else{
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
    },
    dateValue(data){
      return data !== null && data !== "";
    }
  }
}
</script>

<style scoped>

</style>
