<template>
  <div class="dqfzdtl">
    <el-dialog :visible.sync="dialogVisible" :title="docTitle" :width="dialogWidth"
               :top="dialogTop" :destroy-on-close="true" :close-on-click-modal="false" @close="dialogColse">
      <el-form :model="formData" v-if="dtltype===1" label-width="80px" :label-position="labelPosition" style="width:350px;margin:0 auto;">
        <el-form-item label="地区">
          <el-select v-model="formData.cityid" style="width:240px;">
            <el-option v-for="op in cityOptions" :key="op.value" :value="op.value" :label="op.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分组名称">
          <el-input v-model="formData.groupname" style="width:240px;"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="formData" v-if="dtltype===2" label-width="80px" :label-position="labelPosition" style="width:350px;margin:0 auto;">
        <el-form-item label="分组名称">
          <el-select v-model.number="formData.groupid" style="width:240px;">
            <el-option v-for="op in groupOptions" :key="op.value" :value="op.value" :label="op.label"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align:center">
        <el-button type="info" @click="dialogColse">取消</el-button>
        <el-button type="primary" @click="addDoc">新建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DqfzDtl',
  props:{
    cityOptions:{type:Array},
    groupOptions:{type:Array},
    dtltype:{type:Number},
    dtlData:{type:Object}
  },
  data(){
    return{
      dialogVisible:false,
      docTitle:'',
      dialogWidth:'800px',
      dialogTop:'12vh',
      formData:{
        cityid:null,
        groupname:null,
        groupid:null
      },
      counterid:null,
      cityid:null,
      labelPosition:'right'
    }
  },
  mounted(){
    if(this.dtltype===2){
      this.counterid=this.dtlData.counterid;
      this.cityid=this.dtlData.cityid;
    }
    this.dialogVisible=true;
  },
  methods:{
    dialogColse(){
      this.dialogVisible=false;
      this.$parent.dqfzDtlVisible=false;
    },
    addDoc(){
      if(this.dtltype===1){
        let formData=this.formData;
        let params={};
        params.cityid=Number(formData.cityid);
        params.groupname=formData.groupname;
        params.inputmanid=Number(sessionStorage.getItem("userid"));
        params.companyid=Number(sessionStorage.getItem("companyid"));
        this.$api.area.insertDqfzDoc(params).then(res => {
          if(res.code===200){
            alert("保存成功");
            this.$parent.navList=[];
            this.$parent.cityOptions=[];
            this.$parent.groupOptions=[];
            this.$parent.queryNavList();
            this.$parent.tableData=[];
            this.dialogColse();
          }
        }).catch(error => {
          return false;
        })
      }else if(this.dtltype===2){
        let formData=this.formData;
        let params=[];
        this.counterid.forEach(e => {
          let tel={};
          tel.groupid=formData.groupid;
          tel.counterid=e;
          tel.cityid=Number(this.cityid);
          params.push(tel)
        });
        this.$api.area.insertDqfzDtl({data:params}).then(res => {
          if(res.code===200){
            alert("保存成功");
            let deleteId=this.$parent.deleteId;
            this.$parent.clickThis(deleteId,1,this.cityid);
            this.dialogColse();
          }
        }).catch(error => {
          return false;
        })
      }
    }
  }
}
</script>

<style scoped>
  .dqfzdtl .el-dialog__body{padding:0 2px 20px 2px;max-height:420px;overflow:auto}
</style>
