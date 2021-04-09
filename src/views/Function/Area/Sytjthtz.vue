<template>
<div>
  <e-query-collapse>
    <template v-slot:query>
      <el-form :model="sytjthtzQueryForm" :inline="true">
        <el-form-item-input prop="subackdocid" label="通知单ID" v-model="sytjthtzQueryForm.subackdocid"></el-form-item-input>
        <el-form-item prop="bcaldate" label="开始日期">
          <el-date-picker type="datetime" v-model="sytjthtzQueryForm.bcaldate"></el-date-picker>
        </el-form-item>
        <el-form-item prop="ealdate" label="结束日期">
          <el-date-picker type="datetime" v-model="sytjthtzQueryForm.ealdate"></el-date-picker>
        </el-form-item>
        <el-form-item-hov prop="counterid" label="门店ID" v-model="sytjthtzQueryForm.counterid" @openHov="openQueryHov"></el-form-item-hov>
        <el-form-item-select prop="usestatus" label="状态" v-model="sytjthtzQueryForm.usestatus" :options="sytjthtzUsestatusOptions"></el-form-item-select>
      </el-form>
    </template>
    <template v-slot:button>
      <template>
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:sytjthtz:select" @click="queryFunction"></kt-button>
        <el-button type="primary" icon="fa fa-upload" :label="$t('action.upload')" perms="marketing:sytjthtz:select" @click="addOpen"></el-button>
        <!--<kt-button type="primary" icon="fa fa-upload" :label="$t('action.upload')" perms="marketing:sytjthtz:select" @click="addOpen"></kt-button>-->
        <kt-button type="primary" icon="fa fa-nullify" :label="$t('action.nullify')" perms="marketing:sytjthtz:select" @click="delForm"></kt-button>
      </template>
    </template>
  </e-query-collapse>
  <e-tables
    :table-data="sytjthtzTableData"
    :table-width-status="false"
    :table-height="sytjthtzTableHeight"
    :pageNum="sytjthtzPageNum"
    :pageSize="sytjthtzPageSize"
    :total="sytjthtzTotal"
    :loading="sytjthtzLoading"
    @currentChange="handleChange"
    @sizeChange="handleChange"
    @selectionChange="selectionChange"
  >
    <el-table-column type="selection"></el-table-column>
    <e-tables-columns prop="subackdocid" label="通知单ID"></e-tables-columns>
    <e-tables-columns prop="credate" label="日 期"></e-tables-columns>
    <e-tables-columns prop="deptid" label="门店ID"></e-tables-columns>
    <e-tables-columns prop="deptname" label="门店名称"></e-tables-columns>
    <e-tables-columns prop="total_line" label="金额"></e-tables-columns>
    <e-tables-columns prop="dtllines”>笔数"></e-tables-columns>
    <e-tables-columns prop="usestatusname" label="状态"></e-tables-columns>
    <e-tables-columns prop="salesbackid" label="退货单ID"></e-tables-columns>
    <e-tables-columns prop="usestatus" label="状态ID"></e-tables-columns>
    <e-tables-columns prop="backwhyname" label="退货原因"></e-tables-columns>
    <el-table-column prop="caozuo" width="100" label="操作">
      <template slot-scope="scope">
        <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="marketing:sytjthtz:select" @click="selectDtl(scope.row)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <e-dialogs-table dialogTitle="查询细单" :status="sytjthtztableStatus" @dialogClose="dialogTableClose">
    <e-tables :table-data="sytjthtzDtlTableData" :loading="sytjthtzDtlLoading">
      <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
      <e-tables-columns prop="goodsname" label="货品名称"></e-tables-columns>
      <e-tables-columns prop="goodstype" label="规格"></e-tables-columns>
      <e-tables-columns prop="goodsunit" label="单位"></e-tables-columns>
      <e-tables-columns prop="prodarea" label="产地"></e-tables-columns>
      <e-tables-columns prop="lotno" label="批号"></e-tables-columns>
      <e-tables-columns prop="goodsqty" label="通知退货数量"></e-tables-columns>
      <e-tables-columns prop="realgoodsqty" label="实际退货数量"></e-tables-columns>
      <e-tables-columns prop="unitprice" label="单价"></e-tables-columns>
      <e-tables-columns prop="total" label="金额"></e-tables-columns>
      <e-tables-columns prop="subackdtlid" label="细单ID"></e-tables-columns>
      <e-tables-columns prop="outbatchid" label="外部批次ID"></e-tables-columns>
      <e-tables-columns prop="inbatchid" label="内部批次ID"></e-tables-columns>
      <e-tables-columns prop="goodsstatusid" label="货品状态ID"></e-tables-columns>
    </e-tables>
  </e-dialogs-table>
  <e-dialogs dialogTitle="导入" :status="sytjthtzStatus" @dialogClose="dialogClose">
    <div>
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="action"
        :on-change="implUserExcel"
        :show-file-list="false"
        :auto-upload="false" style="float:left;">
        <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
      </el-upload>
      <el-button type="primary" style="float:left;margin-left:5px;" @click="updateload">保存</el-button>
    </div>
    <e-tables :table-data="sytjthtzDtlForm" :table-height="400" :page-status="false">
      <e-tables-columns prop="counterid" label="门店ID"></e-tables-columns>
      <e-tables-columns prop="goodsid" label="货品ID"></e-tables-columns>
      <e-tables-columns prop="lotno" label="批号"></e-tables-columns>
      <e-tables-columns prop="backwhyid" label="退货原因"></e-tables-columns>
      <e-tables-columns prop="batchid" label="退货批次"></e-tables-columns>
    </e-tables>
  </e-dialogs>
  <hov-tools v-if="sytjthtzHovVisible" :hov-data="sytjthtzHov"></hov-tools>
</div>
</template>

<script>
  import KtButton from "../../Core/KtButton";
  import {selectDdlOption} from "../../../utils/functions";
  import HovTools from "../../Core/HovTools";
  import EDialogs from "../../../components/public/EDialogs";
  import {uploadExecl} from "../../../utils/execl";
  export default {
    name: "Sytjthtz",
    components: {
      "HovTools" : HovTools,
      "KtButton" : KtButton,
      "EDialogsTable" :EDialogs
    },
    data(){
      return {
        sytjthtzQueryForm:{
          subackdocid:null,
          bcaldate:null,
          ealdate:null,
          counterid:null,
          usestatus:null
        },
        sytjthtzTableData:[],
        sytjthtzPageNum:1,
        sytjthtzPageSize:50,
        sytjthtzTotal:0,
        sytjthtzLoading:false,
        sytjthtzTableHeight:300,
        sytjthtztableStatus:false,
        sytjthtzDtlLoading:false,
        sytjthtzDtlTableData:[],

        sytjthtzStatus:false,
        action:'',
        sytjthtzDtlForm:[],
        sytjthtzUsestatusOptions: [],
        sytjthtzHovVisible:false,
        sytjthtzHov:{
          hovTitle:'门店查询',
          hovUrl: "counteridhov/select",
          afterStatus: false,
          fillDataName: "sytjthtzQueryForm",
          parentVisible:'sytjthtzHovVisible',
          hovColumns:
            [
              {id: "counterid", name: "门店ID",queryStatus:true,dataStatus:2,fillid:"counterid"},
              {id: "countername", name: "门店名称",queryStatus:true,dataStatus:1},
              {id: "companyopcode", name: "门店操作码",queryStatus:true,dataStatus:1}
            ]
        },
      }
    },
    created() {
      this.sytjthtzTableHeight = (window.innerHeight - 240);
      this.sytjthtzUsestatusOptions = selectDdlOption('LM_SUBACK_USESTATUS');
    },
    methods:{
      queryFunction(){
        this.selectDoc(1, this.sytjthtzPageSize);
      },
      handleChange(data){
        this.selectDoc(data.pageNum, data.pageSize);
      },
      selectDoc(pageNum,pageSize){
        let params = {};
        let formData = this.sytjthtzQueryForm;
        if (formData.counterid !==null && formData.counterid !== "") {
            params.counterid = formData.counterid;
        }
        if (Object.keys(params).length === 0) {
          params = null;
        }
        this.sytjthtzLoading = true;
        this.sytjthtzTableData = [];
        this.$api.area.selectSytjthtz({pageNum:pageNum,pageSize:pageSize,params: params}).then(res => {
          this.sytjthtzTableData = res.data.content;
          this.sytjthtzPageNum = res.data.pageNum;
          this.sytjthtzPageSize = res.data.pageSize;
          this.sytjthtzTotal = res.data.totalSize;
          this.sytjthtzLoading = false;
        }).catch(() => {
          this.sytjthtzPageNum = 1;
          this.sytjthtzTotal = 0;
          this.sytjthtzLoading = false;
          return false;
        })
      },
      selectDtl(row){
        this.sytjthtzDtlLoading = true;
        this.sytjthtzDtlTableData = [];
        this.$api.area.selectSytjthtzDtl({subackdocid:row.subackdocid,usestatus:row.usestatus}).then(res => {
          this.sytjthtzDtlTableData = res.data.content;
          this.sytjthtzDtlLoading = false;
          this.sytjthtztableStatus = true;
        }).catch(() => {
          this.sytjthtzDtlLoading = false;
          return false;
        })
      },
      addOpen(){
        this.sytjthtzStatus = true;
      },
      implUserExcel(e){
        let columns = [
          {prop:"counterid",label:"门店ID"},
          {prop:"goodsid",label:"货品ID"},
          {prop:"lotno",label:"批号"},
          {prop:"backwhyid",label:"退货原因"},
          {prop:"batchid",label:"退货批次"}
        ];
        this.sytjthtzDtlForm = uploadExecl(e,columns);
      },
      //修改提交表单
      updateload(){
        if(confirm("是否确认修改") === true) {
          this.$api.area.uploadSytjthtz({data:this.sytjthtzDtlForm}).then(res => {
            if (res.code === 200) {
              if (res.data > 0) {
                alert("导入成功");
                this.dialogClose();
              } else {
                alert(res.msg);
                return false;
              }
            }else {
              alert(res.msg);
            }
          }).catch(() => {
            return false;
          })
        } else {
          return false;
        }
      },
      selectionChange(value){

      },
      //删除
      delForm(){
        let params = [];
        if(confirm("是否确认作废") === true) {
          this.$api.area.deleteSytjthtz({subackdocid:params}).then(res => {
            if (res.code === 200) {
              alert("作废成功");
              this.queryFunction();
            }else {
              alert(res.msg);
            }
          }).catch(() => {
            return false;
          })
        } else {
          return false;
        }
      },
      openQueryHov(){
        this.sytjthtzHovVisible = true;
      },
      dialogClose(){
        this.sytjthtzDtlForm = [];
        this.sytjthtzStatus = false;
      },
      dialogTableClose(){
        this.sytjthtzDtlTableData = [];
        this.sytjthtztableStatus = false;
      }
    }
  }
</script>

<style scoped>

</style>
