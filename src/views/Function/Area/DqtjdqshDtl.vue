<template>
<div class="dqtjdqshdtl">
  <el-dialog :visible.sync="dialogVisible" :title="docTitle" :width="dtltype===1?dialogWidth:'500px'"
             :top="dtltype===1?dialogTop:'20vh'" :destroy-on-close="true" :close-on-click-modal="false" @close="dialogColse">
    <el-form ref="addDoc" :model="addData" label-width="100px" v-if="dtltype===1" label-position="right">
      <el-form-item label="门店ID" prop="counterid" style="float:left;width:340px;" :rules="{required:true,message:'门店不能为空'}">
        <el-input v-model="addData.counterid" :disabled="true"  style="width:200px;"></el-input>
        <el-button  icon="el-icon-search" circle @click="openHov('counterid')"></el-button>
      </el-form-item>
      <el-form-item label="城市ID" prop="cityid" style="float:left;width:340px;">
        <el-input v-model.number="addData.cityid" style="width:230px;" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="公司ID" style="float:left;width:340px;">
        <el-input v-model.number="addData.companyid" :disabled="true" style="width:230px;"></el-input>
      </el-form-item>
      <el-form-item label="公司名称" style="float:left;width:340px;">
        <el-input v-model="addData.companyname" :disabled="true" style="width:230px;"></el-input>
      </el-form-item>
      <el-form-item label="区域ID" prop="areaid" style="float:left;width:340px;">
        <el-input v-model="addData.areaid" style="width:230px;" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="货品ID" prop="goodsid" style="float:left;width:340px;" :rules="{required:true,message:'货品不能为空'}">
        <el-input v-model="addData.goodsid" :disabled="true" style="width:200px;"></el-input>
        <el-button  icon="el-icon-search" circle @click="openHov('goodsid')"></el-button>
      </el-form-item>
      <el-form-item label="批号ID" style="float:left;width:340px;">
        <el-input v-model="addData.lotid" :disabled="true" style="width:230px;"></el-input>
      </el-form-item>
      <el-form-item label="外部批次ID" style="float:left;width:340px;">
        <el-input v-model="addData.outbatchid" :disabled="true" style="width:230px;"></el-input>
      </el-form-item>
      <el-form-item label="内部批次ID" style="float:left;width:340px;">
        <el-input v-model.number="addData.inbatchid" :disabled="true" style="width:230px;"></el-input>
      </el-form-item>
      <el-form-item label="库存" style="float:left;width:340px;">
        <el-input v-model.number="addData.kc" :disabled="true" style="width:230px;"></el-input>
      </el-form-item>
      <el-form-item label="生成数量" style="float:left;width:340px;">
        <el-input v-model.number="addData.autoqty" :disabled="true" style="width:230px;"></el-input>
      </el-form-item>
      <el-form-item label="调剂数量" prop="kctjqty" style="float:left;width:340px;"  :rules="{required:true,message:'调剂数量不能为空'}">
        <el-input v-model.number="addData.kctjqty" style="width:230px;"></el-input>
      </el-form-item>
      <el-form-item label="未分配数量" style="float:left;width:340px;">
        <el-input v-model.number="addData.remqty" style="width:230px;" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="是否允许调剂" style="float:left;width:340px;">
        <el-select v-model="addData.ifmove" style="width:230px;">
          <el-option :value="0" label="不控制调剂"></el-option>
          <el-option :value="1" label="控制调剂"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form :model="updatePs" v-if="dtltype===2" label-position="top">
      <el-form-item label="配送状态">
        <el-select v-model="updatePs.mlstatus">
          <el-option :value="0" label="暂停配送"></el-option>
          <el-option :value="1" label="恢复配送"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form :model="updateMove" v-if="dtltype===3" label-position="top">
      <el-form-item label="是否允许调剂">
        <el-select v-model="updateMove.ifmove">
          <el-option :value="0" label="不控制调剂"></el-option>
          <el-option :value="1" label="控制调剂"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="info" size="small" round @click="dialogColse">取消</el-button>
      <el-button type="primary" size="small" round @click="dialogAdd">保存</el-button>
    </div>
  </el-dialog>
  <hov-tools v-if="counterVisible" :hov-data="counterHov"></hov-tools>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
</div>
</template>

<script>
  import HovTools from "@/views/Core/HovTools";
  export default {
    name:'DwjvxxglDtl',
    components:{HovTools},
    props:{
      dtltype:{type:Number},
      docTitle:{type:String},
      dialogWidth:{type:String,default:'800px'},
      dialogTop:{type:String,default:'12vh'},
      dtlData:{type:Object},
      index:{type:Number},
      page:{type:Object}
    },
    data() {
      return {
        dialogVisible:false,
        areaOptions:[],
        addData:{
          cityid:null,
          companyid:null,
          companyname:null,
          areaid:null,
          counterid:null,
          goodsid:null,
          lotid:null,
          outbatchid:null,
          inbatchid:null,
          kctjqty:null,
          kc:null,
          autoqty:null,
          remqty:null,
          ifmove:0,
          mlstatus:null
        },
        updatePs:{
          mlstatus:null,
          kctjdtlidarray:null,
          inputmanid:null
        },
        updateMove:{
          ifmove:null,
          kctjdtlid:null
        },
        counterVisible:false,
        counterHov:{
          hovTitle:'门店查询',
          hovUrl: "counteridhov/select",
          afterStatus: false,
          fillDataName: "addData",
          parentVisible:'counterVisible',
          hovColumns:
            [
              {id: "companyid", name: "门店ID",queryStatus:true,dataStatus:2,display:1,value:null},
              {id: "counterid", name: "门店ID",queryStatus:true,dataStatus:2,fillid:"counterid"},
              {id: "countername", name: "门店名称",queryStatus:true,dataStatus:1},
              {id: "counteropcode", name: "门店操作码",queryStatus:true,dataStatus:1},
              {id: "groupid", name: "区域ID",queryStatus:false,dataStatus:1,fillid:"areaid"},
              {id: "groupname", name: "区域名称",queryStatus:false,dataStatus:1},
              {id: "cityid", name: "城市ID",queryStatus:false,dataStatus:1,fillid:"cityid"},
            ]
        },
        goodsVisible:false,
        goodsHov:{
          hovTitle:'货品查询',
          hovUrl: "goodsidcontainsinbatchidhov/select",
          afterStatus: false,
          fillDataName: "addData",
          parentVisible:'goodsVisible',
          hovColumns:
            [
              {id: "goodsid", name: "货品ID",queryStatus:true,dataStatus:2,fillid:"goodsid"},
              {id: "goodsname", name: "货品名称",queryStatus:true,dataStatus:1},
              {id: "opcode", name: "货品操作码",queryStatus:false,dataStatus:1},
              {id: "stcompanyid", name: "stcompanyid",value:null,queryStatus:true,dataStatus:1,tableStatus:1,display:1},
              {id: "lotid", name: "批号ID",queryStatus:false,dataStatus:1,fillid:'lotid'},
              {id: "outbatchid", name: "外部批次ID",queryStatus:false,dataStatus:1,fillid:'outbatchid'},
              {id: "inbatchid", name: "内部批次ID",queryStatus:true,dataStatus:1,fillid:'inbatchid'},
              {id: "remqty", name: "库存",queryStatus:false,dataStatus:1,fillid:'kc'},
            ]
        },
      }
    },
    created(){
      if(this.dtltype===1){
        this.addData.companyid=Number(sessionStorage.getItem("companyid"));
        this.addData.companyname=sessionStorage.getItem("companyname");
        this.addData.autoqty=0;
        this.addData.mlstatus=1;
      }else if(this.dtltype===2){
        //this.updatePs.mlstatus=this.dtlData.mlstatus;
        //this.updatePs.kctjdtlid=this.dtlData.kctjdtlid;
        this.updatePs.kctjdtlidarray=this.dtlData.kctjdtlid.toString();
      }else if(this.dtltype===3){
        this.updateMove.ifmove=this.dtlData.ifmove;
        this.updateMove.kctjdtlid=this.dtlData.kctjdtlid;
      }
    },
    mounted(){
     this.dialogVisible=true;
    },
    methods:{
      dialogColse(){
        this.dialogVisible=false;
        this.$parent.dqtjdqshDtlVisible=false;
      },
      dialogAdd(){
        if(this.dtltype===1){
          if(this.addData.kctjqty>this.addData.kc){
            alert("调剂数量不能大于库存");
            return false;
          }
          let params={};
          Object.keys(this.addData).forEach(e => {
            params[e]=this.addData[e];
          });
          params.inputmanid=Number(sessionStorage.getItem("userid"));
          params.deptid=Number(sessionStorage.getItem("deptid"));
          this.$refs.addDoc.validate((vaild) => {
            if(vaild){
              this.$api.area.saveDqtjqshDoc(params).then(res => {
                if(res.code===200){
                  alert("保存成功");
                  this.$parent.handleFunction("query");
                  this.dialogColse();
                }
              }).catch(error => {
                return false;
              })
            }else {
              return false;
            }
          })
        }else if(this.dtltype===2){
          this.updatePs.inputmanid=Number(sessionStorage.getItem("userid"));
          this.$api.area.updatemultiple(this.updatePs).then(res => {
            if(res.code===200){
              alert("修改成功");
              this.$parent.handleFunction("query");
              this.dialogColse();
            }
          }).catch(error => {
            return false;
          })
        }else if(this.dtltype===3){
          this.$api.area.updateTjbzsl(this.updateMove).then(res => {
            if(res.code===200){
              alert("修改成功");
              this.$parent.docTableData[this.index].ifmove = this.updateMove.ifmove;
              if(this.updateMove.ifmove ===0)
              {
                this.$parent.docTableData[this.index].ifmovename = "不控制调剂"
              }
              else if(this.updateMove.ifmove ===1)
              {
                this.$parent.docTableData[this.index].ifmovename = "控制调剂"
              }
              this.dialogColse();
            }
          }).catch(error => {
            return false;
          })
        }
      },
      openHov(id){
        if(id==="cityid"){
          this.cityVisible=true;
        }else if(id==="companyid"){
          this.companyVisible=true;
        }else if(id==="areaid"){
          this.areaVisible=true;
        }else if(id==="counterid"){
          this.counterHov.hovColumns[0].value=Number(sessionStorage['companyid']);
          this.counterVisible=true;
        }else if(id==="goodsid"){
          if(this.addData.counterid===null||this.addData.counterid===""){
            alert("门店ID不能为空");
            return false;
          }else{
            this.goodsHov.hovColumns.forEach(e => {
              if(e.id==="stcompanyid"){
                e.value=this.addData.counterid;
              }
            })
          }
          this.goodsVisible=true;
        }
      }
    }
  }
</script>

<style>
  .dqtjdqshdtl .el-dialog__body{padding:0 2px 20px 2px;max-height:420px;overflow:auto}
</style>
