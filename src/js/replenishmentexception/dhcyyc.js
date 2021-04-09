import {selectOption} from "@/utils/functions";
import {selectbuyid} from "@/utils/drops";
export default {
  name: 'Dhcyyyc',
  data(){
    return{
      btnOptions:[
        {id:'query', icon:"fa fa-search", label:"action.search", perms:"replenishmentexception:dhcyyc:select"},
        {id:'download', icon:"fa fa-download", label:"action.download", perms:"replenishmentexception:dhcyyc:select"}
      ],
      formList:[
        {type:'select',id:'buyerid',label:'采购支持',options:[]},
      ],
      formData:{buyerid:null},
      docTableHeight:0,
      loading:false,
      widthStatus:false,
      docTableColumns:[
        {prop:'supplyid',label:'客商ID',type:0,tableStatus:0},
        {prop:'supplyname',label:'客商名称',type:0,tableStatus:0},
        {prop:'goodsid',label:'货品ID',type:0,tableStatus:0},
        {prop:'goodsname',label:'品名/规格/单位/产地',type:0,tableStatus:0,minWidth:120},
        {prop:'factoryname',label:'生产企业',type:0,tableStatus:0},
        {prop:'bigqty',label:'大包数量',type:0,tableStatus:0},
        {prop:'zbqty',label:'中包数量',type:0,tableStatus:0},
        {prop:'lotid',label:'批号ID',type:0,tableStatus:0},
        {prop:'lotno',label:'批号',type:0,tableStatus:0},
        {prop:'proddate',label:'生产日期',type:2,tableStatus:0,width:150},
        {prop:'invalidate',label:'失效日期',type:2,tableStatus:0,width:150},
        {prop:'buyername',label:'采购支持',type:0,tableStatus:0}
      ],
      docTableData:[]
    }
  },
  created(){
    this.docTableHeight=(window.innerHeight-240);
    selectOption(this.formList,'buyerid',selectbuyid());
  },
  methods:{
    queryFunction(data){
      if(data === "query"){
        let pageSize=this.$refs.doctable.pageSize;
        this.selectDoc(1,pageSize);
      }else if(data === "download"){
        this.exportExcelDOM(this.docTableColumns,this.docTableData,'到货差异异常'+this.getNewDate())
      }
    },
    handleChange(data){
      this.selectDoc(data.pageNum,data.pageSize);
    },
    selectDoc(pageNum,pageSize){
      let params={};
      let formData=this.formData;
      if(this.returnValue(formData.buyerid)===true){
        params.buyerid=formData.buyerid;
      }
      if(Object.keys(params).length===0){
        params=null;
      }
      this.docTableData =[];
      this.loading=true;
      this.$api.replenishmentexception.selectDhcyycDoc({pageNum:pageNum,pageSize:pageSize,params:params}).then(res => {
        if(res.code === 200){
          this.docTableData = res.data.content;
          this.$refs.doctable.pageNum=res.data.pageNum;
          this.$refs.doctable.pageSize=res.data.pageSize;
          this.$refs.doctable.total=res.data.totalSize;
          this.loading=false;
        }
      }).catch(error => {
        this.loading=false;
        return false;
      })
    },
    returnValue(data){
      return data !== null && data !== "";
    }
  }
}
