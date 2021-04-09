export default {
  name: 'Crkmxcx',
  data(){
    return {
      deptid:6,
      labelWidth:100,
      btnOptions:[
        {id:'query', icon:"fa fa-search", label:"action.search", perms:"logistics:crkmxcx:select"},
        {id:'download', icon:"fa fa-download", label:"action.download", perms:"logistics:crkmxcx:select"}
      ],
      formList:[
        {type:'daterange',id1:'startdate',id2:'endofdate',label:'日期',formWidth:340},
        {type:'inputHov',id:'goodsid',label:'商品ID',formWidth:160,labelWidth:50},
        {type:'select',id:'usestatus1sel',label:'出入标志',clearable:true,options:[{value:0,label:'出'}, {value:1,label:'入'}]},
        {type:'inputHov',id:'supplyid',label:'供应商ID',formWidth:170,labelWidth:60},
        {type:'inputHov',id:'lotid',label:'批号ID',formWidth:170,labelWidth:65},
        {type:'select',id:'stcompanyid',label:'保管单位',options:[
            {value:7,label:'7号库'},{value:13,label:'13号库'},{value:15,label:'15号库'},{value:40,label:'40号库'},{value:44,label:'备品库区'}
          ]},
      ],
      formData:{
        startdate:null,
        endofdate:null,
        supplyid:null,
        usestatus1sel:null,
        goodsid:null,
        lotid:null,
        stcompanyid:7
      },
      tableColumns:[
        {type:0,prop:'inoutid',label:'明细ID',tableStatus:0},
        {type:2,prop:'credate',label:'日期',tableStatus:0,width:150,widthStatus:true},
        {type:0,prop:'goodsid',label:'货品ID',tableStatus:0},
        {type:0,prop:'goodsname',label:'品名',tableStatus:0},
        {type:0,prop:'goodstype',label:'规格',tableStatus:0},
        {type:0,prop:'goodsunit',label:'单位',tableStatus:0},
        {type:0,prop:'prodarea',label:'产地',tableStatus:0},
        {type:0,prop:'lotno',label:'批号',tableStatus:0},
        {type:0,prop:'unitprice',label:'进价',tableStatus:0},
        {type:0,prop:'invaliddate',label:'效期',tableStatus:0},
        {type:0,prop:'inqty',label:'入库数量',tableStatus:0},
        {type:0,prop:'outqty',label:'出库数量',tableStatus:0},
        {type:0,prop:'remqty',label:'库存',tableStatus:0},
        {type:0,prop:'goodsstatus',label:'货品状态',tableStatus:0},
        {type:0,prop:'inbatchid',label:'内部批次ID',tableStatus:0},
        {type:0,prop:'outbatchid',label:'外部批次ID',tableStatus:0},
        {type:0,prop:'doctypename',label:'原单类型',tableStatus:0},
        {type:0,prop:'sourceid',label:'原单ID',tableStatus:0},
        {type:0,prop:'asupplyid',label:'对方单位ID',tableStatus:0},
        {type:0,prop:'gcompanyname',label:'对方单位名称',tableStatus:0},
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
      supplyVisible:false,
      supplyHov:{
        hovTitle:'供应商查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'supplyVisible',
        hovColumns:
          [
            {id: "companyid", name: "供应商ID",queryStatus:true,dataStatus:2,fillid:"supplyid"},
            {id: "companyname", name: "供应商名称",queryStatus:true,dataStatus:1},
            {id: "companyopcode", name: "供应商操作码",queryStatus:true,dataStatus:1}
          ]
      },
      partenerVisible:false,
      partenerHov:{
        hovTitle:'合作伙伴查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible:'partenerVisible',
        hovColumns:
          [
            {id: "companyid", name: "合作伙伴ID",queryStatus:true,dataStatus:2,fillid:"partener"},
            {id: "companyname", name: "合作伙伴名称",queryStatus:true,dataStatus:1},
            {id: "companyopcode", name: "合作伙伴操作码",queryStatus:true,dataStatus:1}
          ]
      }
    }
  },
  created(){
    this.tableHeight=(window.innerHeight-240);
    this.formData.startdate = new Date(this.getNewDate()+' 00:00:00');
    this.formData.endofdate = new Date(this.getNewDate()+' 23:59:59');
  },
  methods:{
    openHov(id){
      if(id==="supplyid"){
        this.supplyVisible=true;
      }else if(id==="goodsid"){
        this.goodsVisible=true;
      }else if(id === "partener"){
        this.partenerVisible=true;
      }
    },
    queryFunction(data){
      if(data==='query'){
        let pageSize=this.$refs.doctable.pageSize;
        this.seletDoc(1,pageSize);
      }else {
        this.exportExcelDOM(this.tableColumns,this.tableData,'出入库明细查询'+this.getNewDate());
      }
    },
    changeFunction(data){
      this.seletDoc(data.pageNum,data.pageSize);
    },
    seletDoc(pageNum,pageSize){
      let formData=this.formData;
      let params={};
      Object.keys(formData).forEach(e=>{
        if(e!=='startdate'&&e!=='endofdate'){
          if(formData[e]!==null&&formData[e]!==''){
            params[e]=formData[e];
          }
        }
      });
      if(formData.startdate!==null&&formData.startdate!==""){
        params.startdate=formData.startdate;
      }
      if(formData.endofdate!==null&&formData.endofdate!==""){
        params.endofdate=formData.endofdate;
      }
      if(params.stcompanyid===7){
        let cha=((new Date(params.startdate) - new Date(params.endofdate))/86400000);
        if(cha<-15){
          alert("查询时间段不能超过15天");
          return false;
        }
        if(params.hasOwnProperty('supplyid')===false&&params.hasOwnProperty('goodsid')===false){
          alert("供应商ID，货品ID不能同时为空");
          return false;
        }
      }
      console.log(params)
      this.tableData=[];
      this.loading=true;
      this.$api.logistics.selectCrkmxcx({pageNum:pageNum,pageSize:pageSize,params:params}).then(res => {
        if(res.code===200){
          this.tableData=Object.freeze(res.data.content);
          this.$refs.doctable.pageNum=res.data.pageNum;
          this.$refs.doctable.pageSize=res.data.pageSize;
          this.$refs.doctable.total=res.data.totalSize;
          this.loading=false;
        }
      }).catch(error => {
        this.loading=false;
        return false;
      })
    }
  }
}
