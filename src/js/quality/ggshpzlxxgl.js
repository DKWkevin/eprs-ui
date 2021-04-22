import {selectDdlOption} from "@/utils/functions";
import {dateFormat} from "../../utils/functions";
export default {
  name: "Ggshpzlxxgl",
  data(){
    return {
      GgshpzlxxglQueryForm:{
        goodsid:null,
        supplyid:null,
        usestatus:null,
        informationclass:null,
        approveno:null,
        orderby:'a.goodsid'
      },
      GgshpzlxxglTableData:[],
      GgshpzlxxglPageNum:1,
      GgshpzlxxglPageSize:50,
      GgshpzlxxglTotal:0,
      GgshpzlxxglLoading:false,
      GgshpzlxxglTableHeight:300,
      GgshpzlxxglDialog:'',
      GgshpzlxxglDtlStatus:false,
      GgshpzlxxglStatus:false,
      GgshpzlxxglIndex:0,
      GgshpzlxxglDtlForm:{
        goodsid:null,
        goodsname:null,
        goodstype:null,
        goodsunit:null,
        goodsno:null,
        factid:null,
        factname:null,
        companyid:null,
        companyname:null,
        zxcolumn4:null,
        approvedocno:null,
        productapprovno:null,
        approveno:null,
        approveperiod:null,
        qualitystandardno:null,
        qualitystandardperiod:null,
        inspectionno:null,
        inspectionperiod:null,
        commissproduceno:null,
        commissproduceperiod:null,
        trademark:null,
        sampleflag:null,
        packstandard:null,
        patentno: null,
        patentperiod: null,
        patentpackno: null,
        patentpackperiod: null
      },
      GgshpzlxxglUsestatusOptions:[],
      GgshpzlxxglInformationclassOptions:[],
      GgshpzlxxglOrderbyOptions:[
        {value:'a.approvedocno',label:'档案定位'},{value:'b.factid',label:'生产企业ID'},{value:'a.goodsid',label:'货品ID'},{value:'a.trademarkno',label:'注册证效期'}
      ],
      GgshpzlxxglSampleflagOptions:[
        {value:1,label:'有'},{value:0,label:'无'}
      ],
      GgshpzlxxglPackstandardOptions:[
        {value:1,label:'合格'},{value:0,label:'不合格'}
      ],
      GgshpzlxxglHovVisible:false,
      GgshpzlxxglHov:{
        hovTitle:'',
        hovUrl: "",
        afterStatus: false,
        fillDataName: "",
        parentVisible:'GgshpzlxxglHovVisible',
        hovColumns: []
      },
    }
  },
  created() {
    this.GgshpzlxxglTableHeight = (window.innerHeight - 240);
    this.GgshpzlxxglUsestatusOptions = selectDdlOption('GOODS_USESTATUS');
    this.GgshpzlxxglInformationclassOptions = selectDdlOption('GOODS_INFORMATIONCLASS');
  },
  methods:{
    queryFunction(){
      this.selectDoc(1, this.GgshpzlxxglPageSize);
    },
    handleChange(data){
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum,pageSize){
      let params = {};
      let formData = this.GgshpzlxxglQueryForm;
      Object.keys(formData).forEach(item => {
        if (formData[item] !==null && formData[item] !== "") {
          params[item] = formData[item];
        }
      })
      params.companyid = Number(sessionStorage['companyid']);
      this.GgshpzlxxglLoading = true;
      this.GgshpzlxxglTableData = [];
      this.$api.quality.selectGgshpzlxxgl({pageNum:pageNum,pageSize:pageSize,params: params}).then(res => {
        this.GgshpzlxxglTableData = res.data.content;
        this.GgshpzlxxglPageNum = res.data.pageNum;
        this.GgshpzlxxglPageSize = res.data.pageSize;
        this.GgshpzlxxglTotal = res.data.totalSize;
        this.GgshpzlxxglLoading = false;
      }).catch(() => {
        this.GgshpzlxxglPageNum = 1;
        this.GgshpzlxxglTotal = 0;
        this.GgshpzlxxglLoading = false;
        return false;
      })
    },
    insertOrUpdate(){
      if(this.GgshpzlxxglDtlStatus === false) {
        this.addForm();
      } else {
        this.updateForm();
      }
    },
    //新增加载表单
    addOpen(){
      this.formIsNull(this.GgshpzlxxglDtlForm);
      this.GgshpzlxxglDtlForm.companyid = Number(sessionStorage['companyid']);
      this.GgshpzlxxglDtlForm.companyname = sessionStorage['companyname'];
      this.GgshpzlxxglDtlForm.packstandard = 1;
      this.GgshpzlxxglDialog = '新增表单';
      this.GgshpzlxxglDtlStatus = false;
      this.GgshpzlxxglStatus = true;
    },
    //新增提交表单
    addForm(){
      if(confirm("是否确认保存") === true) {
        let params = {};
        Object.keys(this.GgshpzlxxglDtlForm).forEach(item => {
          if(item === "approveperiod"||item === "qualitystandardperiod"||item === "inspectionperiod"||item === "commissproduceperiod"||item === "patentperiod"||item === "patentpackperiod"){
            params[item] = new Date(this.GgshpzlxxglDtlForm[item]);
          }else{
            params[item] = this.GgshpzlxxglDtlForm[item];
          }
        })
        this.$api.quality.insertGgshpzlxxgl(this.GgshpzlxxglDtlForm).then(res => {
          if (res.code === 200) {
            alert("保存成功");
            this.dialogClose();
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
    //修改加载表单
    updateOpen(row, index){
      Object.keys(this.GgshpzlxxglDtlForm).forEach(item => {
        if(item === "approveperiod"||item === "qualitystandardperiod"||item === "inspectionperiod"||item === "commissproduceperiod"||item === "patentperiod"||item === "patentpackperiod"){
          this.GgshpzlxxglDtlForm[item] = dateFormat("YYYY-mm-dd HH:MM:SS", row[item]);
        }else{
          this.GgshpzlxxglDtlForm[item] = row[item];
        }
      })
      this.GgshpzlxxglIndex = index;
      this.GgshpzlxxglDialog = '修改表单';
      this.GgshpzlxxglDtlStatus = true;
      this.GgshpzlxxglStatus = true;
    },
    //修改提交表单
    updateForm(){
      if(confirm("是否确认修改") === true) {
        let params = {};
        Object.keys(this.GgshpzlxxglDtlForm).forEach(item => {
          if(item === "approveperiod"||item === "qualitystandardperiod"||item === "inspectionperiod"||item === "commissproduceperiod"||item === "patentperiod"||item === "patentpackperiod"){
            params[item] = new Date(this.GgshpzlxxglDtlForm[item]);
          }else{
            params[item] = this.GgshpzlxxglDtlForm[item];
          }
        })
        this.$api.quality.updateGgshpzlxxgl(params).then(res => {
          if (res.code === 200) {
            alert("修改成功");
            this.dialogClose();
            Object.keys(this.GgshpzlxxglDtlForm).forEach(item => {
              this.GgshpzlxxglTableData[index][item] = this.GgshpzlxxglDtlForm[item];
            })
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
    //删除
    delForm(row,index){
      if(confirm("是否确认删除") === true) {
        this.$api.quality.deleteGgshpzlxxgl({goodsid:row.goodsid,companyid:row.companyid}).then(res => {
          if (res.code === 200) {
            alert("删除成功");
            this.GgshpzlxxglTableData.splice(index, 1);
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
    openQueryHov(data){
      let fillDataName = '';
      let hovTitle = '';
      let hovUrl = '';
      let hovColumns = [];
      if (data === 'goodsid') {
        hovTitle = "货品查询";
        hovUrl = "goodsidhov/select";
        fillDataName = 'GgshpzlxxglQueryForm';
        hovColumns =
          [
            {id: "goodsid", name: "货品ID",queryStatus:true,dataStatus:2,fillid:"goodsid"},
            {id: "goodsname", name: "货品名称",queryStatus:true,dataStatus:1},
            {id: "opcode", name: "货品操作码",queryStatus:true,dataStatus:1},
            {id: "goodstype", name: "规格",queryStatus:false,dataStatus:1},
            {id: "goodsunit", name: "单位",queryStatus:false,dataStatus:1},
            {id: "prodarea", name: "产地",queryStatus:false,dataStatus:1}
          ]
      }else if(data === 'supplyid'){
        hovTitle = "供应商查询";
        hovUrl = "supplyidhov/select";
        fillDataName = 'GgshpzlxxglQueryForm';
        hovColumns =
          [
            {id: "supplyid", name: "供应商ID",queryStatus:true,dataStatus:2,fillid:"supplyid"},
            {id: "supplyname", name: "供应商名称",queryStatus:true,dataStatus:1},
          ]
      }
      this.GgshpzlxxglHov.hovTitle = hovTitle;
      this.GgshpzlxxglHov.fillDataName = fillDataName;
      this.GgshpzlxxglHov.hovUrl = hovUrl;
      this.GgshpzlxxglHov.hovColumns = hovColumns;
      this.GgshpzlxxglHovVisible = true;
    },
    openHov(data){
      let fillDataName = '';
      let hovTitle = '';
      let hovUrl = '';
      let hovColumns = [];
      if (data === 'goodsid') {
        hovTitle = "货品查询";
        hovUrl = "ggshpzlxxgl/goodsselect";
        fillDataName = 'GgshpzlxxglDtlForm';
        hovColumns =
          [
            {id: "goodsid", name: "货品ID",queryStatus:true,dataStatus:2,fillid:"goodsid"},
            {id: "goodsname", name: "货品名称",queryStatus:true,dataStatus:1,fillid:"goodsname"},
            {id: "opcode", name: "货品操作码",queryStatus:true,dataStatus:1},
            {id: "goodstype", name: "规格",queryStatus:false,dataStatus:1,fillid:"goodstype"},
            {id: "goodsunit", name: "单位",queryStatus:false,dataStatus:1,fillid:"goodsunit"},
            {id: "standardCode", name: "质量标准编号",queryStatus:false,dataStatus:1,fillid:"qualitystandardno"},
            {id: "goodsno", name: "编码",queryStatus:false,dataStatus:1,fillid:"goodsno"},
            {id: "factid", name: "生产企业",queryStatus:false,dataStatus:1,fillid:"factid"},
            {id: "companyname", name: "生产企业名称",queryStatus:false,dataStatus:1,fillid:"factname"}
          ]
      }else if(data === 'companyid'){
        hovTitle = "公司查询";
        hovUrl = "companyidhov/selectcompanyid";
        fillDataName = 'GgshpzlxxglDtlForm';
        hovColumns =
          [
            {id: "companyid", name: "公司ID",queryStatus:true,dataStatus:2,fillid:"companyid"},
            {id: "companyname", name: "公司名称",queryStatus:true,dataStatus:1,fillid:'companyname'},
            {id: "companyopcode", name: "公司操作码",queryStatus:true,dataStatus:1}
          ]
      }
      this.GgshpzlxxglHov.hovTitle = hovTitle;
      this.GgshpzlxxglHov.fillDataName = fillDataName;
      this.GgshpzlxxglHov.hovUrl = hovUrl;
      this.GgshpzlxxglHov.hovColumns = hovColumns;
      this.GgshpzlxxglHovVisible = true;
    },
    download(){
      let tableColumns = [
        {prop:"counterid", label:"门店ID"},
        {prop:"companyname", label:"门店名称"},
        {prop:"area", label:"面积分类"},
        {prop:"fc", label:"功能"},
        {prop:"district", label:"商圈"},
        {prop:"yinpian", label:"饮片范围"},
        {prop:"apparatus", label:"器械范围"},
        {prop:"sale", label:"销售分类"}
      ];
      this.exportExcelDOM(tableColumns, this.GgshpzlxxglTableData, '门店维度范围');
    },
    dialogClose(){
      this.formIsNull(this.GgshpzlxxglDtlForm);
      this.GgshpzlxxglDialog = '';
      this.GgshpzlxxglDtlStatus = false;
      this.GgshpzlxxglIndex = 0;
      this.GgshpzlxxglStatus = false;
    }
  }
}
