export default {
  name: "Ggsdwzsgl",
  data(){
    return {
      ggsdwzsgQueryForm:{
        companyid:null,
        businessid:null,
        qualitytypeid:null,
        cfno:null,
        storeaddress:null,
        usestatus:null,
        selfflag:null,
        supplyflag:null,
        factoryflag:null,
        customflag:null
      },
      ggsdwzsgTableData:[],
      ggsdwzsgPageNum:1,
      ggsdwzsgPageSize:50,
      ggsdwzsgTotal:0,
      ggsdwzsgLoading:false,
      ggsdwzsgTableHeight:300,
      ggsdwzsgDialog:'',
      ggsdwzsgDtlStatus:false,
      ggsdwzsgStatus:false,
      ggsdwzsgIndex:0,
      ggsdwzsgDtlForm:{
        cfid:null,
        companyid:null,
        businessid:null,
        businessname:null,
        qualitytypeid:null,
        cfname:null,
        cfno:null,
        cfdate:null,
        cfcompany:null,
        invalidedate:null,
        inflag:null,
        supplierflag:null,
        companyflag:null,
        customerflag:null,
        regaddress:null,
        factaddress:null,
        storeaddress:null,
        memo:null
      },
      ggsdwzsgTableDataDtl:[],
      rules:{
        companyid: {required:true,message:'公司不能为空',trigger:'blur'},
        businessid: {required: true,message:'单位不能为空',trigger: 'blur'},
        qualitytypeid: {required: true,message:'证书类型不能为空',trigger: 'blur'}
      },
      ggsdwzsglUsestatusOptions: [{value:1,label:'正常'},{value:0,label:'停用'}],
      ggsdwzsglSelfflagOptions: [{value:1,label:'内部'},{value:0,label:'外部'}],
      ggsdwzsgTableDialogTitle:'查询细单',
      ggsdwzsgTableStatus:false,
      ggsdwzsgDtlLoading:false,
      ggsdwzsgDtlHeight:300,
      ggsdwzsgTableDialogData:[],
      ggsdwzsgHovVisible:false,
      ggsdwzsgHov:{
        hovTitle:'',
        hovUrl: "",
        afterStatus: false,
        fillDataName: "",
        parentVisible:'ggsdwzsgHovVisible',
        hovColumns: []
      },
    }
  },
  created() {
    this.ggsdwzsgTableHeight = (window.innerHeight - 240);
  },
  methods:{
    queryFunction(){
      this.selectDoc(1, this.ggsdwzsgPageSize);
    },
    handleChange(data){
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum,pageSize){
      let params = {};
      let formData = this.ggsdwzsgQueryForm;
      if (formData.supplyflag !== null && formData.supplyflag !== "") {
        if(formData.supplyflag === true) {
          formData.supplyflag = 1;
        }else {
          formData.supplyflag = null;
        }
      }
      if (formData.factoryflag !== null && formData.factoryflag !== "") {
        if(formData.factoryflag === true) {
          formData.factoryflag = 1;
        }else {
          formData.factoryflag = null;
        }
      }
      if (formData.customflag !== null && formData.customflag !== "") {
        if(formData.customflag === true) {
          formData.customflag = 1;
        }else {
          formData.customflag = null;
        }
      }
      Object.keys(formData).forEach(item => {
        if (formData[item] !==null && formData[item] !== "") {
          params[item] = formData[item];
        }
      })
      if (Object.keys(params).length === 0) {
        params = null;
      }
      this.ggsdwzsgLoading = true;
      this.ggsdwzsgTableData = [];
      this.$api.quality.selectGgsdwzsgl({pageNum:pageNum,pageSize:pageSize,params: params}).then(res => {
        this.ggsdwzsgTableData = res.data.content;
        this.ggsdwzsgPageNum = res.data.pageNum;
        this.ggsdwzsgPageSize = res.data.pageSize;
        this.ggsdwzsgTotal = res.data.totalSize;
        this.ggsdwzsgLoading = false;
      }).catch(() => {
        this.ggsdwzsgPageNum = 1;
        this.ggsdwzsgTotal = 0;
        this.ggsdwzsgLoading = false;
        return false;
      })
    },
    //查询细单
    selectDtl(row){
      this.ggsdwzsgDtlLoading = true;
      this.ggsdwzsgTableDialogData = true;
      this.$api.quality.selectGgsdwzsglDtl({cfid:row.cfid}).then(res => {
        this.ggsdwzsgTableDialogData = res.data;
        this.ggsdwzsgDtlLoading = false;
        this.ggsdwzsgTableStatus = true;
      }).catch(() => {
        this.ggsdwzsgDtlLoading = false;
        return false;
      })
    },
    //新增修改
    insertOrUpdate(){
      this.$refs.ggsdwzsgForm.validate((valid) => {
        if(valid){
          if(this.ggsdwzsgDtlStatus === false) {
            this.addForm();
          } else {
            this.updateForm();
          }
        }else {
          return false;
        }
      })

    },
    //新增加载表单
    addOpen(){
      this.formIsNull(this.ggsdwzsgDtlForm);
      this.ggsdwzsgDtlForm.companyid = Number(sessionStorage['companyid']);
      this.ggsdwzsgDialog = '新增表单';
      this.ggsdwzsgDtlStatus = false;
      this.ggsdwzsgStatus = true;
    },
    //新增提交表单
    addForm(){
      if(confirm("是否确认保存") === true) {
        let params = {};
        Object.keys(this.ggsdwzsgDtlForm).forEach(item => {
          if(item !== 'supplyflag' && item !== 'factoryflag' && item !== 'customflag' && item !== 'inflag'){
            params[item] = formData[item];
          }
        })
        params.data = this.ggsdwzsgTableDataDtl;
        this.$api.quality.insertGgsdwzsgl(params).then(res => {
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
      Object.keys(this.ggsdwzsgDtlForm).forEach(item => {
        if (item === 'supplyflag' || item === 'factoryflag' || item === 'customflag') {
          this.ggsdwzsgDtlForm[item] = row[item] === 1;
        } else {
          this.ggsdwzsgDtlForm[item] = row[item];
        }
      })
      this.ggsdwzsgIndex = index;
      this.ggsdwzsgDialog = '修改表单';
      this.ggsdwzsgDtlStatus = true;
      this.ggsdwzsgStatus = true;
    },
    //修改提交表单
    updateForm(){
      if(confirm("是否确认修改") === true) {
        let params = {};
        Object.keys(this.ggsdwzsgDtlForm).forEach(item => {
          if(item !== 'supplyflag' && item !== 'factoryflag' && item !== 'customflag' && item !== 'inflag'){
            params[item] = formData[item];
          }
        })
        params.data = this.ggsdwzsgTableDataDtl;
        this.$api.quality.updateGgsdwzsgl(params).then(res => {
          if (res.code === 200) {
            alert("修改成功");
            Object.keys(this.ggsdwzsgDtlForm).forEach(item => {
              this.ggsdwzsgTableData[index][item] = this.ggsdwzsgDtlForm[item];
            })
            this.dialogClose();
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
    //删除总单
    delForm(row,index){
      if(confirm("是否确认删除") === true) {
        this.$api.quality.deleteGgsdwzsgl({cfid:row.cfid}).then(res => {
          if (res.code === 200) {
            alert("删除成功");
            this.ggsdwzsgTableData.splice(index, 1);
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
    //删除细单
    deleteXd(){
      if(confirm("是否确认删除") === true) {
        this.$api.quality.deleteGgsdwzsglDtl({cfid:row.cfid,qualityscopeid:row.qualityscopeid}).then(res => {
          if (res.code === 200) {
            alert("删除成功");
            this.ggsdwzsgTableData.splice(index, 1);
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
      let hovTitle = '';
      let hovUrl = '';
      let hovColumns = [];
      if(data === 'companyid'){
        hovTitle = '公司查询';
        hovUrl = 'companyidhov/selectcompanyid';
        hovColumns =  [
          {id: "companyid", name: "公司ID",queryStatus:true,dataStatus:2,fillid:"companyid"},
          {id: "companyname", name: "公司名称",queryStatus:true,dataStatus:1},
          {id: "companyopcode", name: "公司操作码",queryStatus:true,dataStatus:1}
        ];
      } else if(data === 'businessid'){
        hovTitle = '单位查询';
        hovUrl = 'companyidhov/selectcompanyid';
        hovColumns =  [
          {id: "companyid", name: "单位ID",queryStatus:true,dataStatus:2,fillid:"businessid"},
          {id: "companyname", name: "单位名称",queryStatus:true,dataStatus:1},
          {id: "companyopcode", name: "单位操作码",queryStatus:true,dataStatus:1}
        ];
      } else if(data === 'qualitytypeid'){
        hovTitle = '公司查询';
        hovUrl = 'companyidhov/selectcompanyid';
        hovColumns =  [
          {id: "companyid", name: "证书类型ID",queryStatus:true,dataStatus:2,fillid:"qualitytypeid"},
          {id: "companyname", name: "证书类型名称",queryStatus:true,dataStatus:1}
        ];
      }
      this.ggsdwzsgHov.hovTitle = hovTitle;
      this.ggsdwzsgHov.hovUrl = hovUrl;
      this.ggsdwzsgHov.fillDataName = "ggsdwzsgQueryForm";
      this.ggsdwzsgHov.hovColumns = hovColumns;
      this.ggsdwzsgHovVisible = true;
    },
    openHov(){
      let hovTitle = '';
      let hovUrl = '';
      let hovColumns = [];
      if(data === 'companyid'){
        hovTitle = '公司查询';
        hovUrl = 'companyidhov/selectcompanyid';
        hovColumns =  [
          {id: "companyid", name: "公司ID",queryStatus:true,dataStatus:2,fillid:"companyid"},
          {id: "companyname", name: "公司名称",queryStatus:true,dataStatus:1},
          {id: "companyopcode", name: "公司操作码",queryStatus:true,dataStatus:1}
        ];
      } else if(data === 'businessid'){
        hovTitle = '单位查询';
        hovUrl = 'companyidhov/selectcompanyid';
        hovColumns =  [
          {id: "companyid", name: "单位ID",queryStatus:true,dataStatus:2,fillid:"businessid"},
          {id: "companyname", name: "单位名称",queryStatus:true,dataStatus:1},
          {id: "companyopcode", name: "单位操作码",queryStatus:true,dataStatus:1}
        ];
      } else if(data === 'qualitytypeid'){
        hovTitle = '公司查询';
        hovUrl = 'companyidhov/selectcompanyid';
        hovColumns =  [
          {id: "companyid", name: "证书类型ID",queryStatus:true,dataStatus:2,fillid:"qualitytypeid"},
          {id: "companyname", name: "证书类型名称",queryStatus:true,dataStatus:1}
        ];
      }
      this.ggsdwzsgHov.hovTitle = hovTitle;
      this.ggsdwzsgHov.hovUrl = hovUrl;
      this.ggsdwzsgHov.fillDataName = "ggsdwzsgDtlForm";
      this.ggsdwzsgHov.hovColumns = hovColumns;
      this.ggsdwzsgHovVisible = true;
    },
    download(){
      let tableColumns = [
        {prop:"businessid",label:"单位ID"},
        {prop:"businessname",label:"单位名称"},
        {prop:"qualitytypeid",label:"证书类型"},
        {prop:"qualitytypename",label:"证书类型名称"},
        {prop:"cfname",label:"名称"},
        {prop:"cfno",label:"编号"},
        {prop:"cfdate",label:"发证日期"},
        {prop:"invalidedate",label:"失效日期"},
        {prop:"cfcompany",label:"发证机关"},
        {prop:"regaddress",label:"注册地址"},
        {prop:"factaddress",label:"生产地址"},
        {prop:"storeaddress",label:"仓库地址"},
        {prop:"usestatusname",label:"状态"},
        {prop:"memo",label:"备注"},
        {prop:"cfid",label:"证书ID"},
        {prop:"companyid",label:"公司ID"},
        {prop:"companyname",label:"公司名称"}
      ];
      this.exportExcelDOM(tableColumns, this.ggsdwzsgTableData, '各公司单位证书管理');
    },
    downloadDtl(row){
      let tableColumns = [
        {prop:"qualityscopeid", label:"范围ID"},
        {prop:"scopeno", label:"范围序号"},
        {prop:"scopename", label:"范围名称"}
      ];
      this.$api.quality.selectGgsdwzsglDtl({cfid:row.cfid}).then(res => {
       this.exportExcelDOM(tableColumns, res.data, '各公司单位证书管理细单');
      }).catch(() => {
        return false;
      })

    },
    dialogClose(){
      this.formIsNull(this.ggsdwzsgDtlForm);
      this.ggsdwzsgDialog = '';
      this.ggsdwzsgDtlStatus = false;
      this.ggsdwzsgIndex = 0;
      this.ggsdwzsgStatus = false;
    },
    dialogDtlClose(){
      this.ggsdwzsgTableDialogData = [];
      this.ggsdwzsgTableStatus = false;
    }
  }
}
