import CdfkAdd from "@/views/Function/Ap/CdfkAdd";
export default {
  name: 'Cdfk',
  components:{CdfkAdd},
  data(){
    return {
      formList:[
        {type:'daterange',id1:'startdate',id2:'endofdate',label:'创建日期'},
        {type:'inputHov',id:'supplyid',label:'供应商ID'},
        {type:'inputHov',id:'inputmanid',label:'录入人ID'}
      ],
      formData:{
        startdate:null,
        endofdate:null,
        supplyid:null,
        inputmanid:null
      },
      btnOptions:[
        {id:'query',icon:"fa fa-search", label:"action.search",perms:"financial:cdfk:select"},
        {id:'add',icon:"fa fa-plus", label:"action.add",perms:"financial:cdfk:add"}
      ],
      docTableHeight:300,
      loading:false,
      docTableColumns:[
        {prop:'bindid',label:'打捆ID',type:0,tableStatus:0},
        {prop:'credate',label:'创建日期',type:2,tableStatus:0,width:150,widthStatus:0},
        {prop:'supplyid',label:'供应商ID',type:0,tableStatus:0},
        {prop:'supplyname',label:'供应商名称',type:0,tableStatus:0,width:300,widthStatus:0},
        {prop:'total',label:'金额',type:0,tableStatus:0},
        {prop:'voucherflagname',label:'凭证',type:0,tableStatus:0},
        {prop:'susetdocid',label:'结算单ID',type:0,tableStatus:0},
        {prop:'inputmanname',label:'录入人',type:0,tableStatus:0},
        {prop:'rppaydocid',label:'出纳付款单ID',type:0,tableStatus:0},
        {prop:'caozuo',label:'操作',type:1,tableStatus:0,options:[
            {id:'edit',icon:"fa fa-edit", label:"action.edit",perms:"financial:cdfk:select"}
          ]
        }
      ],
      docTableData:[],
      dtlVisible:false,
      dialogWidth:'800px',
      dtlTableHeight:300,
      dtlTableColumns:[
        {prop:'bindid',label:'打捆ID',type:0,tableStatus:0},
        {prop:'doctypename',label:'类型',type:0,tableStatus:0,width:70},
        {prop:'baid',label:'承兑ID',type:0,tableStatus:0},
        {prop:'sourcetypename',label:'票据来源',type:0,tableStatus:0},
        {prop:'total',label:'金额',type:0,tableStatus:0},
        {prop:'bankno',label:'银行账号',type:0,tableStatus:0,width:150}
      ],
      dtlTableData:[],
      bankOptions:[],
      addVisible:false,
      cvidVisible:false,
      cvidHov:{
        hovTitle:'供应商查询',
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'cvidVisible',
        hovColumns:
          [
            {id: "customid", name: "供应商ID",queryStatus:true,dataStatus:2,fillid:"supplyid"},
            {id: "customname", name: "供应商名称",queryStatus:true,dataStatus:1},
            {id: "customopcode", name: "供应商操作码",queryStatus:true,dataStatus:1}
          ]
      },
      inputmanVisible:false,
      inputmanHov:{
        hovTitle:'录入人查询',
        hovUrl: "employeeididhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'inputmanVisible',
        hovColumns:
          [
            {id: "employeeid", name: "录入人ID",queryStatus:true,dataStatus:2,fillid:"inputmanid"},
            {id: "employeename", name: "录入人名称",queryStatus:true,dataStatus:1},
            {id: "employeeopcode", name: "录入人操作码",queryStatus:true,dataStatus:1}
          ]
      }
    }
  },
  created(){
    this.docTableHeight=(window.innerHeight-260);
    this.formData.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.formData.endofdate = new Date(this.getNewDate() + ' 23:59:59');
    this.$api.ap.selectBank({pageNum:1,pageSize:999,params:null}).then(res => {
      if (res.code === 200) {
        let params=[];
        res.data.content.forEach(e => {
          if(e.bankid===72274||e.bankid===79635){
            let tel={};
            tel.value=e.bankno;
            tel.label=e.bankname;
            params.push(tel);
          }
        });
        this.bankOptions=params;
      }
    }).catch(error => {
      return false;
    })
  },
  methods:{
    dialogClose(){
      this.dtlVisible=false;
      this.dtlTableData=[];
    },
    queryFunction(data){
      if(data==='query'){
        let pageSize=this.$refs.doctable.pageSize;
        this.selectDoc(1,pageSize);
      }else if(data === 'add'){
        this.addVisible=true;
      }
    },
    handleChange(data){
      this.selectDoc(data.pageNum,data.pagesize);
    },
    selectDoc(pageNum,pagesize){
      let formData=this.formData;
      let params={};
      if(formData.startdate!==null&&formData.startdate!==""){
        params.startdate=formData.startdate;
      }
      if(formData.endofdate!==null&&formData.endofdate!==""){
        params.endofdate=formData.endofdate;
      }
      if(formData.supplyid!==null&&formData.supplyid!==""){
        params.supplyid=formData.supplyid;
      }
      if(formData.inputmanid!==null&&formData.inputmanid!==""){
        params.inputmanid=formData.inputmanid;
      }
      if(Object.keys(params).length===0){
        params=null;
      }
      this.docTableData=[];
      this.loading=true;
      this.$api.ap.selectCdfk({pageNum:pageNum,pageSize:pagesize,params:params}).then(res => {
        if(res.code === 200){
          this.docTableData=Object.freeze(res.data.content);
          this.$refs.doctable.pageSize=res.data.pageSize;
          this.$refs.doctable.currentPage=res.data.pageNum;
          this.$refs.doctable.total=res.data.totalSize;
          this.loading=false;
        }
      }).catch(error => {
        this.loading=false;
        return false;
      })
    },
    handleFunction(data){
      this.$api.ap.selectCdfkDtl({bindid:data.row.bindid}).then(res => {
        if(res.code === 200){
          this.dtlTableData=Object.freeze(res.data);
          this.dtlVisible=true;
        }
      }).catch(error => {
        return false;
      })
    },
    openHov(data){
      if(data==='supplyid'){
        this.cvidVisible=true;
      }else if(data === 'inputmanid'){
        this.inputmanVisible=true;
      }
    }
  }
}
