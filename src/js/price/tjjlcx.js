import {getNewDate} from "@/utils/functions";
export default {
  name: 'Tjjlcx',
  data(){
    return {
      formList:[
        {type:'daterange',id1:'startdate',id2:'endofdate',label:'调价日期'},
        {type:'inputHov',id:'goodsid',label:'货品ID'},
        {type:'select',id:'priceid',label:'价格类型',options:[]},
        {type:'inputHov',id:'inputmanid',label:'录入人ID'}
      ],
      formData:{
        startdate:null,
        endofdate:null,
        goodsid:null,
        priceid:null,
        inputmanid:null
      },
      btnOptions:[
        {id:'query', icon:"fa fa-search", label:"action.search", perms:"price:tjjlcx:select"},
        {id:'download', icon:"fa fa-download", label:"action.download", perms:"price:tjjlcx:select"}
      ],
      tableColumns:[
        {prop:'chid',label:'ID',type:0,tableStatus:0},
        {prop:'credate',label:'日期',type:2,tableStatus:0,width:150,widthStatus:true},
        {prop:'goodsid',label:'货品ID',type:0,tableStatus:0},
        {prop:'goodsname',label:'品名',type:0,tableStatus:0},
        {prop:'goodstype',label:'规格',type:0,tableStatus:0},
        {prop:'goodsunit',label:'单位',type:0,tableStatus:0},
        {prop:'prodarea',label:'产地',type:0,tableStatus:0},
        {prop:'chtypename',label:'修改类型',type:0,tableStatus:0},
        {prop:'priceid',label:'价格类型ID',type:0,tableStatus:0},
        {prop:'pricename',label:'价格类型',type:0,tableStatus:0},
        {prop:'areaid',label:'定价区域ID',type:0,tableStatus:0},
        {prop:'areaname',label:'定价区域',type:0,tableStatus:0},
        {prop:'oldprice',label:'老价格',type:0,tableStatus:0},
        {prop:'newprice',label:'新价格',type:0,tableStatus:0},
        {prop:'udflag',label:'上/下限',type:0,tableStatus:0},
        {prop:'inputmanid',label:'录入人ID',type:0,tableStatus:0},
        {prop:'inputmanname',label:'录入人',type:0,tableStatus:0},
        {prop:'memo',label:'备注',type:0,tableStatus:0},
        {prop:'channelid',label:'渠道ID',type:0,tableStatus:0}
      ],
      tableData:[],
      tableHeight:0,
      loading:false,
      goodsVisible:false,
      goodsHov:{
        hovTitle:'货品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'goodsVisible',
        hovColumns:
          [
            {id: "goodsid", name: "货品ID",queryStatus:true,dataStatus:2,fillid:"goodsid"},
            {id: "goodsname", name: "货品名称",queryStatus:true,dataStatus:1},
            {id: "opcode", name: "货品操作码",queryStatus:true,dataStatus:1},
            {id: "goodstype", name: "规格",queryStatus:false,dataStatus:1},
            {id: "goodsunit", name: "单位",queryStatus:false,dataStatus:1},
            {id: "prodarea", name: "产地",queryStatus:false,dataStatus:1}
          ]
      },
      employeeVisible:false,
      employeeHov:{
        hovTitle:'录入人查询',
        hovUrl: "employeeididhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'employeeVisible',
        hovColumns:
          [
            {id: "employeeid", name: "录入人ID",queryStatus:true,dataStatus:2,fillid:"inputmanid"},
            {id: "employeename", name: "录入人名称",queryStatus:true,dataStatus:1},
            {id: "employeeopcode", name: "录入人操作码",queryStatus:true,dataStatus:1}
          ]
      },
    }
  },
  created(){
    this.tableHeight=(window.innerHeight-240);
    this.formData.startdate = new Date(this.getNewDate()+' 00:00:00');
    this.formData.endofdate = new Date(this.getNewDate()+' 23:59:59');
    //selectOption(this.formList,'priceid',selectPrice());
  },
  methods:{
    queryFunction(data){
      if(data === "query"){
        let pageSize=this.$refs.doctable.pageSize;
        this.selectDoc(1,pageSize);
      }else if(data === "download"){
        this.exportExcelDOM(this.tableColumns,this.tableData,'调价记录查询'+ this.getNewDate());
      }
    },
    handlePageChange(data){
      this.selectDoc(data.pageNum,data.pageSize);
    },
    selectDoc(pageNum,pageSize){
      this.$refs.query.collapse=false;
      let formData=this.formData;
      let params={};
      if(this.returnValue(formData.startdate) === true){
        params.startdate=formData.startdate;
      }
      if(this.returnValue(formData.endofdate)===true){
        params.endofdate=formData.endofdate;
      }
      if(this.returnValue(formData.goodsid)===true){
        params.goodsid=formData.goodsid;
      }
      if(this.returnValue(formData.priceid)===true){
        params.priceid=formData.priceid;
      }
      if(this.returnValue(formData.inputmanid)===true){
        params.inputmanid=formData.inputmanid;
      }
      if(Object.keys(params).length===0){
        params=null;
      }
      this.tableData=[];
      this.loading=true;
      this.$api.price.selecttj({pageNum:pageNum,pageSize:pageSize,params:params}).then(res => {
        if(res.code === 200){
          this.tableData = res.data.content;
          this.$refs.doctable.pageNum=res.data.pageNum;
          this.$refs.doctable.pageSize=res.data.pageSize;
          this.$refs.doctable.total=res.data.totalSize;
          this.loading=false;
        }
      }).catch(() => {
        this.loading=false;
        return false;
      })
    },
    queryHov(id){
      if(id==="goodsid"){
        this.goodsVisible=true;
      }else if(id==="inputmanid"){
        this.employeeVisible=true;
      }
    },
    returnValue(data){
      return data !== null && data !== "";
    }
  }
}
