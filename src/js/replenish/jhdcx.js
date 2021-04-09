export default {
  name: 'Jhdcx',
  data(){
    return {
      formList:[
        {type:'daterange', id1:'startdate',id2:'endofdate', label:'日期'},
        {type:'input', id:'sudocid', label:'进货单ID'},
        {type:'inputHov', id:'supplyid', label:'供应商ID'},
        {type:'select', id:'doctypeid', label:'单据类型',options:[{value:1,label:'进货'},{value:2,label:'退货'}]},
        {type:'select', id:'recst', label:'入库标志',options:[{value:0,label:'未入库'},{value:1,label:'已入库'},{value:2,label:'已发送至物流'},{value:3,label:'物流出库完毕'}]}
      ],
      formData:{
        startdate:null,
        endofdate:null,
        sudocid:null,
        supplyid:null,
        doctypeid:null,
        recst:null
      },
      btnOptions:[
        {id:'query', icon:"fa fa-search", label:"action.search", perms:"replenishment:jhdcx:select"},
        {id:'download', icon:"fa fa-download", label:"action.download", perms:"replenishment:jhdcx:select"}
      ],
      tableHeight:300,
      loading:false,
      tableColumns:[
        {prop:'sudocid',label:'进货单ID',type:0,tableStatus:0},
        {prop:'credate',label:'日期',type:2,tableStatus:0,width:150,widthStatus:true},
        {prop:'supplyid',label:'供应商ID',type:0,tableStatus:0},
        {prop:'supplyname',label:'供应商名称',type:0,tableStatus:0,width:300,widthStatus:true},
        {prop:'orderid',label:'订单ID',type:0,tableStatus:0},
        {prop:'total',label:'金额',type:0,tableStatus:0},
        {prop:'dtllines',label:'笔数',type:0,tableStatus:0},
        {prop:'doctypename',label:'单据类型',type:0,tableStatus:0},
        {prop:'paymodename',label:'付款方式',type:0,tableStatus:0},
        {prop:'payterm',label:'账期',type:0,tableStatus:0},
        {prop:'recstname',label:'入库标志',type:0,tableStatus:0},
        {prop:'recstdate',label:'入库时间',type:2,tableStatus:0,width:150,widthStatus:true},
        {prop:'caozuo',label:'操作',type:1,fixed:'right',width:90,widthStatus:true,tableStatus:0,options:[
            {id:'edit',icon:"fa fa-edit", label:"action.edit",perms:"replenishment:jhdcx:select"}
          ]
        }
      ],
      tableData:[],
      paymodeOptions:[],
      dtlVisible:false,
      dtlstatus:false,
      dialogVisible:false,
      dialogTitle:'',
      dialogWidth:'1000px',
      inline:true,
      dtlTableColumns:[
        {prop:'sudocdtlid',label:'进货细单ID',type:0,tableStatus:0},
        {prop:'goodsid',label:'货品ID',type:0,tableStatus:0},
        {prop:'goodsname',label:'品名',type:0,tableStatus:0},
        {prop:'goodstype',label:'规格',type:0,tableStatus:0},
        {prop:'goodsunit',label:'单位',type:0,tableStatus:0},
        {prop:'prodarea',label:'产地',type:0,tableStatus:0},
        {prop:'goodsqty',label:'数量',type:0,tableStatus:0},
        {prop:'unitprice',label:'单价',type:0,tableStatus:0},
        {prop:'total_lines',label:'金额',type:0,tableStatus:0},
        {prop:'lotno',label:'批号',type:0,tableStatus:0},
        {prop:'inbatchid',label:'内部批次',type:0,tableStatus:0},
        {prop:'outbatchid',label:'外部批次',type:0,tableStatus:0}
      ],
      dtlTableData:[],
      dtlTableHeight:300,
      pageStatus:false,
      widthStatus:false,
      supplyVisible:false,
      supplyHov:{
        hovTitle:'供应商查询',
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'supplyVisible',
        hovColumns:
          [
            {id: "customid", name: "供应商ID",queryStatus:true,dataStatus:2,fillid:"supplyid"},
            {id: "customname", name: "供应商名称",queryStatus:true,dataStatus:1},
            {id: "customopcode", name: "供应商操作码",queryStatus:true,dataStatus:1}
          ]
      }
    }
  },
  created(){
    this.tableHeight=(window.innerHeight-240);
    this.formData.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.formData.endofdate = new Date(this.getNewDate() + ' 23:59:59');
  },
  methods:{
    queryFunction(data){
      if(data==='query'){
        let pageSize=this.$refs.doctable.pageSize;
        this.selectDoc(1,pageSize);
      }else if(data==="download"){
        this.exportExcelDOM(this.tableColumns,this.tableData,'进货单查询'+ this.getNewDate());
      }
    },
    handleChange(data){
      this.selectDoc(data.pageNum,data.pageSize);
    },
    selectDoc(pageNum,pageSize){
      this.$refs.query.collapse=false;
      let formData=this.formData;
      let params={};
      Object.keys(formData).forEach(e => {
        if(e!=="startdate" || e!=="endofdate"){
          if(this.returnValue(formData[e])===true){
            params[e]=formData[e];
          }
        }
      });
      if(this.returnValue(formData.startdate)===true){
        params.startdate=formData.startdate;
      }
      if(this.returnValue(formData.endofdate)===true){
        params.endofdate=formData.endofdate;
      }
      params.companyid = Number(sessionStorage['companyid']);
      this.loading=true;
      this.tableData=[];
      this.$api.replenish.selectJhdcxDoc({pageNum:pageNum,pageSize:pageSize,params:params}).then(res => {
        if(res.code === 200){
          this.tableData=Object.freeze(res.data.content);
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
      this.$api.replenish.selectJhdcxDtl({sudocid:data.row.sudocid}).then(res => {
        if(res.code===200){
          this.dtlTableData=Object.freeze(res.data);
          this.dialogVisible=true;
        }
      }).catch(error => {
        return false;
      })
    },
    openHov(id){
      if(id==="supplyid"){
        this.supplyVisible=true;
      }
    },
    closeDialog(){
      this.dialogVisible=false;
    },
    returnValue(data){
      return data !== null && data !== "";
    }
  }
}
