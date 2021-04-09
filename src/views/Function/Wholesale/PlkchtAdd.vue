<template>
<div class="plkchtAdd">
  <el-dialog :visible.sync="dialogVisible" :title="docTitle" :width="dialogWidth" :top="dialogTop" :destroy-on-close="true" @close="docClose" :close-on-click-modal="false">
    <div  class="topForm">
      <el-form :inline="true">
        <el-form-item label="转出部门">
          <el-select v-model="formData.indeptid">
            <el-option v-for="(item,index) in indeptOption" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转出保管单位">
          <el-select v-model="formData.stcompanyid">
            <el-option v-for="(item,index) in stcompanyOption" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转出部门业务员">
          <el-autocomplete v-model="formData.formsaler" :fetch-suggestions="querySuggest" :trigger-on-focus="false"></el-autocomplete>
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="formData.goodsid" placeholder="货品ID" style="width:120px;"></el-input>
          <el-input v-model="formData.opcode" placeholder="操作码" style="width:120px;"></el-input>
          <el-input v-model="formData.lotno" placeholder="批号" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryMain">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="fixbox">
      <div v-for="(item,index) in data" :key="index" class="docdiv">
        <el-form :model="item" :inline="true">
          <el-form-item label="货品ID">
            <el-input v-model.Number="item.goodsid" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="货品">
            <el-input v-model="item.goodsname" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="转出公司ID">
            <el-input v-model="item.companyid" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="转出部门">
            <el-input v-model="item.cgbmmc" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="税率">
            <el-input v-model="item.taxrate" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="转移成本单价">
            <el-input v-model="item.notaxprice" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="转移单价">
            <el-input v-model="item.unitprice"></el-input>
          </el-form-item>
          <el-form-item label="批号ID">
            <el-input v-model="item.lotid" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="批号">
            <el-input v-model="item.lotno" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="转出外部批次ID">
            <el-input v-model="item.outbatchid" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="转出内部批次ID">
            <el-input v-model="item.inbatchid" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="移出货品状态ID">
            <el-input v-model="item.goodsstatusid" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="生产日期">
            <el-input v-model="item.proddate" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="失效日期">
            <el-input v-model="item.invaliddate" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="库存数量">
            <el-input v-model="item.remqty" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="供应商">
            <el-input v-model="item.insupplyname" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="item.goodsqty"></el-input>
            <el-button type="primary" @click="addlst(item)"></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'PlkchtAdd',
  data () {
    return {
      dialogVisible:true,
      dialogWidth:'900px',
      dialogTop:'12vh',
      docTitle:'新增',
      deptid:Number(sessionStorage['deptid']),
      formData:{
        indeptid:null,
        stcompanyid:null,
        formsaler:null,
        goodsid:null,
        opcode:null,
        lotno:null
      },
      data:[],
      indeptOption:[],
      stcompanyOption:[
        {value:7,label:'7号库'},{value:13,label:'13号库'},{value:40,label:'40号库'}
      ]
    }
  },
  created(){
    this.init();
  },
  methods:{
    init(){
      if(this.deptid===94965){
        this.indeptOption.push({value:83670,label:'采购业务部'});
        this.indeptOption.push({value:83672,label:'零售采购'});
      }else if(this.deptid===83670||this.deptid===83672){
        this.indeptOption.push({value:94965,label:'批发采购'});
      }
    },
    queryMain(){
      let params={};
      Object.keys(this.formData).forEach(e=>{
        if(formData[e]!==null&&formData[e]!==""){
          params[e]=this.formData[e];
        }
      });
      if(Object.keys(params).length===0){
        params=null;
      }
      this.$api.wholesale.selectQuery({params:params}).then(res => {
        if(res.code===200){
          this.data=res.data;
        }
      }).catch(error => {
        return false;
      })
    },
    addlst(item){
      let params={};
      if(this.formData.formsaler!==null&&this.formData.formsaler!==''){
        params.formsaler=this.formData.formsaler;
      }else{
        alert("转入部门不能为空");
        return false;
      }
      if(this.formData.todeptid!==null&&this.formData.todeptid!==''){
        params.todeptid=this.formData.todeptid;
      }else{
        alert("业务员不能为空");
        return false;
      }
      if(this.formData.stcompanyid!==null&&this.formData.stcompanyid!==''){
        params.stcompanyid=this.formData.stcompanyid;
      }else {
        alert("转出保管单位不能为空");
        return false;
      }
      if(item.goodsqty===null||item.goodsqty===''){
        alert("数量不能为空");
        return false;
      }
      if(parseFloat(item.goodsqty)>parseFloat(item.remqty)){
        alert("转移数量不能大于库存数量:"+item.remqty);
        return false;
      }
      Object.keys(item).forEach(e=>{
        params[e]=item[e];
      });
      this.$api.wholesale.selectAddlst(params).then(res => {
        if(res.code===200){
          cb(res.data);
        }
      }).catch(error => {
        return false;
      })
    },
    querySuggest(queryString,cb){
      this.$api.wholesale.selectsaler(queryString).then(res => {
        if(res.code===200){
          cb(res.data);
        }
      }).catch(error => {
        return false;
      })
    },
    docClose(){
      this.$parent.plkchtAddVisible=false;
    }
  }
}
</script>

<style scoped>
  .plkchtAdd >>> .el-dialog{max-height:550px;height:550px;}
  .plkchtAdd >>> .el-dialog__body{padding:0;width:100%;height:480px;}
  .plkchtAdd >>> .topForm{width:100%;height:90px;}
  .plkchtAdd >>> .fixbox{width:100%;height:calc(100% - 90px);}
  .docdiv{width:96%;float:left;margin:20px 2% 0 2%;height:280px;background:white;border:1px solid #ccc;border-radius:8px;box-shadow: 0 0 3px #888;}
  .fixbox >>> .boldFont{float:left;font-size: 20px;width:200px;font-weight: bold;font-family: '宋体',serif;margin:5px 5px 5px 20px;text-align: left}
  .fixbox >>> .normalFont{float:left;margin:5px 5px 5px 20px;font-family: '宋体',serif;text-align: left;font-size:13px;color:#aaa;width:200px;}
  .fixbox >>>.buttonbox{float:right;clear: both;margin:5px 10px;}
</style>
