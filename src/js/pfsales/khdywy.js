export default {
  name: "Khdyywy",
  data(){
    return {
      khdyywyQueryForm:{
        companyid:null,
        customid:null,
        salerid:null
      },
      khdyywyTableData:[],
      khdyywyPageNum:1,
      khdyywyPageSize:50,
      khdyywyTotal:0,
      khdyywyLoading:false,
      khdyywyTableHeight:300,
      khdyywyStatus:false,
      khdyywyDtlForm:{
        companyid:null,
        companyname:null,
        customid:null,
        customname:null,
        salerid:null,
        employeename:null
      },
      khdyywyHovVisible:false,
      khdyywyHov:{
        hovTitle:'门店查询',
        hovUrl: "counteridhov/select",
        afterStatus: false,
        fillDataName: "khdyywyDtlForm",
        parentVisible:'khdyywyHovVisible',
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
    this.khdyywyTableHeight = (window.innerHeight - 240);
    this.khdyywyQueryForm.companyid = Number(sessionStorage['companyid']);
  },
  methods:{
    queryFunction(){
      this.selectDoc(1, this.khdyywyPageSize);
    },
    handleChange(data){
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum,pageSize){
      let params = {};
      let formData = this.khdyywyQueryForm;
      Object.keys(formData).forEach(item => {
        if (formData[item] !==null && formData[item] !== "") {
          params[item] = formData[item];
        }
      })
      if (Object.keys(params).length === 0) {
        params = null;
      }
      this.khdyywyLoading = true;
      this.khdyywyTableData = [];
      this.$api.pfsales.selectkhdyywy({pageNum:pageNum,pageSize:pageSize,params: params}).then(res => {
        this.khdyywyTableData = res.data.content;
        this.khdyywyPageNum = res.data.pageNum;
        this.khdyywyPageSize = res.data.pageSize;
        this.khdyywyTotal = res.data.totalSize;
        this.khdyywyLoading = false;
      }).catch(() => {
        this.khdyywyPageNum = 1;
        this.khdyywyTotal = 0;
        this.khdyywyLoading = false;
        return false;
      })
    },
    //新增加载表单
    addOpen(){
      this.formIsNull(this.khdyywyDtlForm);
      this.khdyywyStatus = true;
    },
    //新增提交表单
    addForm(){
      if(confirm("是否确认保存") === true) {
        this.$api.pfsales.insertKhdyywy(this.khdyywyDtlForm).then(res => {
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
    //删除
    delForm(row,index){
      if(confirm("是否确认删除") === true) {
        this.$api.pfsales.deletekhdyywy({companyid:row.companyid,customid:row.customid,salerid:row.salesid}).then(res => {
          if (res.code === 200) {
            alert("删除成功");
            this.khdyywyTableData.splice(index, 1);
          }else {
            alert(res.msg);
            return false;
          }
        }).catch(() => {
          return false;
        })
      } else {
        return false;
      }
    },
    openQueryHov(data){
      let hovTitle ='';
      let hovUrl = "";
      let hovColumns = [];
      if(data ==='customid'){
        hovTitle ='客户查询';
        hovUrl = "customidhov/select";
        hovColumns =
          [
            {id: "customid", name: "客户ID",queryStatus:true,dataStatus:2,fillid:"customid"},
            {id: "customname", name: "客户名称",queryStatus:true,dataStatus:1},
            {id: "customopcode", name: "客户操作码",queryStatus:true,dataStatus:1}
          ]
      }else if(data === "companyid") {
        hovTitle ='公司查询';
        hovUrl = "companyidhov/selectcompanyid";
        hovColumns =
          [
            {id: "companyid", name: "公司ID",queryStatus:true,dataStatus:2,fillid:"companyid"},
            {id: "companyname", name: "公司名称",queryStatus:true,dataStatus:1},
            {id: "companyopcode", name: "公司操作码",queryStatus:true,dataStatus:1}
          ]
      }else if(data === "salerid") {
        hovTitle ='业务员查询';
        hovUrl = "contactinfoidhov/select";
        hovColumns =
          [
            {id: "contactinfoid", name: "业务员ID",queryStatus:true,dataStatus:2,fillid:"salerid"},
            {id: "contactman", name: "业务员名称",queryStatus:true,dataStatus:1},
          ]
      }
      this.khdyywyHov.hovTitle = hovTitle;
      this.khdyywyHov.hovUrl = hovUrl;
      this.khdyywyHov.hovColumns = hovColumns;
      this.khdyywyHov.fillDataName = "khdyywyQueryForm";
      this.khdyywyHovVisible = true;
    },
    openHov(data){
      let hovTitle ='';
      let hovUrl = "";
      let hovColumns = [];
      if(data ==='customid'){
        hovTitle ='客户查询';
        hovUrl = "customidhov/select";
        hovColumns =
          [
            {id: "customid", name: "客户ID",queryStatus:true,dataStatus:2,fillid:"customid"},
            {id: "customname", name: "客户名称",queryStatus:true,dataStatus:1,fillid:'customname'},
            {id: "customopcode", name: "客户操作码",queryStatus:true,dataStatus:1}
          ]
      }else if(data === "companyid") {
        hovTitle ='公司查询';
        hovUrl = "companyidhov/selectcompanyid";
        hovColumns =
          [
            {id: "companyid", name: "公司ID",queryStatus:true,dataStatus:2,fillid:"companyid"},
            {id: "companyname", name: "公司名称",queryStatus:true,dataStatus:1,fillid:"companyname"},
            {id: "companyopcode", name: "公司操作码",queryStatus:true,dataStatus:1}
          ]
      }else if(data === "salerid") {
        hovTitle ='业务员查询';
        hovUrl = "contactinfoidhov/select";
        hovColumns =
          [
            {id: "contactinfoid", name: "业务员ID",queryStatus:true,dataStatus:2,fillid:"salerid"},
            {id: "contactman", name: "业务员名称",queryStatus:true,dataStatus:1,fillid:'employeename'},
          ]
      }
      this.khdyywyHov.hovTitle = hovTitle;
      this.khdyywyHov.hovUrl = hovUrl;
      this.khdyywyHov.hovColumns = hovColumns;
      this.khdyywyHov.fillDataName = "khdyywyDtlForm";
      this.khdyywyHovVisible = true;
    },
    download(){
      let tableColumns = [
        {prop:"companyid",label:"公司ID"},
        {prop:"companyname", label:"公司名称"},
        {prop:"customid", label:"客户ID"},
        {prop:"customname", label:"客户名称"},
        {prop:"salerid", label:"业务员ID"},
        {prop:"employeename", label:"业务员名称"}
      ];
      this.exportExcelDOM(tableColumns, this.khdyywyTableData, '客户业务员');
    },
    dialogClose(){
      this.formIsNull(this.khdyywyDtlForm);
      this.khdyywyStatus = false;
    }
  }
}
