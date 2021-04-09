import HpjcsjwhDtl from "@/views/Function/Quality/HpjcsjwhDtl";
import {formDataReset, paramsFormat, selectDdlOption} from "@/utils/functions";
import axios from "axios";
export default {
  name: 'Hpjcsjwh',
  components:{HpjcsjwhDtl},
  data(){
    return {
      formList:[

      ],
      hpjcsjwhFormData:{
        goodsid:null,
        goodsname:null,
        factid:null,
        factname:null,
        usestatus:null,
        gbcode:null,
        drugadminclass:null,
        informationclass:null,
        shflbm:null,
        sflcpz:false,
        sfybml:false,
        goodsno:null,
        transcondition:null,
        orderby:null,
        ingoodsids:null
      },
      hpjcsjwhUsestatus:[],
      hpjcsjwhDrugadminclass:[],
      hpjcsjwhInformationclass:[],
      hpjcsjwhTranscondition:[],
      formLabelWidth:'100px',
      collapseStatus:true,
      queryGoodsVisible:false,
      queryGoodsHov:{
        hovTitle:'货品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "hpjcsjwhFormData",
        parentVisible:'queryGoodsVisible',
        hovColumns:
          [
            {id: "goodsid", name: "货品ID",queryStatus:true,dataStatus:2,fillid:"goodsid"},
            {id: "goodsname", name: "货品名称",queryStatus:true,dataStatus:1,fillid:"goodsname"},
            {id: "opcode", name: "货品操作码",queryStatus:true,dataStatus:1}
          ]
      },
      queryFactVisible:false,
      factLabelWidth:'110',
      queryFactHov:{
        hovTitle:'生产企业查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "hpjcsjwhFormData",
        parentVisible:'queryFactVisible',
        hovColumns:
          [
            {id: "companyid", name: "生产企业ID",queryStatus:true,dataStatus:2,fillid:"factid"},
            {id: "companyname", name: "生产企业名称",queryStatus:true,dataStatus:1,fillid:"factname"},
            {id: "companyopcode", name: "生产企业操作码",queryStatus:true,dataStatus:1}
          ]
      },
      tableHeight:300,
      hpjcsjwhPageNum:1,
      hpjcsjwhPageSize:50,
      hpjcsjwhTotal:0,
      tableData:[],
      loading:false,
      hpjcsjwhVisible:false,
      dtlStatus:false,
      dtlData:{},
      drugtypeOptions:[],
      usestatusOptions:[],
      storageConditionOptions:[],
      transConditionOptions:[],
      drugadminClassOptions:[],
      brandGradeOptions:[],
      informationClassOptions:[],
      class1Options:[],
      classAOptions:[],
      companyTypeOptions:[],
      unitTypeOptions:[],
      bzuseStatusOptions:[],
      cgzcOptions:[],
      categoryid2Options:[],
      docTitle:''
    }
  },
  created(){
    this.tableHeight=(window.innerHeight-240);
    this.hpjcsjwhUsestatus = selectDdlOption('GOODS_USESTATUS');
    this.hpjcsjwhDrugadminclass = selectDdlOption('GOODS_DRUGADMINCLASS');
    this.hpjcsjwhInformationclass = selectDdlOption('GOODS_INFORMATIONCLASS');
    this.hpjcsjwhTranscondition = selectDdlOption('PUB_GOODS_TRANSCONDITION');
    this.drugtypeOptions=selectDdlOption('YPJX');
    this.usestatusOptions=selectDdlOption('GOODS_USESTATUS');
    this.storageConditionOptions=selectDdlOption('PUB_GOODS_STORECONDITION');
    this.transConditionOptions=selectDdlOption('PUB_GOODS_TRANSCONDITION');
    this.drugadminClassOptions=selectDdlOption('GOODS_DRUGADMINCLASS');
    this.brandGradeOptions=selectDdlOption('GOODS_BRANDGRADE');
    this.informationClassOptions=selectDdlOption('GOODS_INFORMATIONCLASS');
    //采购分组
    this.$api.hov.selectCgfz({}).then(res => {
      if(res.code===200){
        res.data.forEach(e=>{
          let tel={};
          tel.value=e.groupid;
          tel.label = e.groupname;
          this.class1Options.push(tel);
        })
      }
    }).catch(error => {
      return false;
    });
    //采购支持
    this.$api.hov.selectCgzc({}).then(res => {
      if(res.code===200){
        res.data.forEach(e=>{
          let tel={};
          tel.value=e.buyerid;
          tel.label = e.buyername;
          this.cgzcOptions.push(tel);
        })
      }
    }).catch(error => {
      return false;
    });
    this.$api.quality.selectHpjcsjwhCgfzfl({pageNum:1,pageSize:9999,params:null}).then(res => {
      if(res.code===200){
        res.data.forEach(e=>{
          let tel={};
          tel.value=e.categoryid2;
          tel.label = e.categoryname2;
          this.categoryid2Options.push(tel);
        })
      }
    }).catch(error => {
      return false;
    });
    this.classAOptions=selectDdlOption('CG_CLASSA');
    this.companyTypeOptions=selectDdlOption('CG_COMPANYTYPE');
    this.unitTypeOptions=selectDdlOption('GOODS_UNITTYPE');
    this.bzuseStatusOptions=selectDdlOption('GOODS_UNIT_USESTATUS');
  },
  methods:{
    queryFunction(data){
      if(data==="query"){
        this.selectDoc(1,this.hpjcsjwhPageSize);
      }else if(data === "add"){
        this.hpjcsjwhVisible=true;
        this.docTitle='新增货品基础数据维护';
        this.dtlStatus=false;
      }else if(data==="reset"){
        formDataReset(this.hpjcsjwhFormData);
      }else if(data === "download"){
        let columns = [
          {prop:'goodsid',label:'货品ID'},
          {prop:'opcode',label:'操作码'},
          {prop:'goodsname',label:'名称'},
          {prop:'goodstype',label:'货品规格'},
          {prop:'prodarea',label:'产地'},
          {prop:'usestatusname',label:'状态'},
          {prop:'gbcode',label:'批准文号'},
          {prop:'factid',label:'生产企业ID'},
          {prop:'fact_companyname',label:'生产企业名称'},
          {prop:'goodsno',label:'编码'},
          {prop:'goodstag',label:'货品标记'},
          {prop:'goodsshortname',label:'简称'},
          {prop:'goodsformalname',label:'商品名'},
          {prop:'goodsformalpinyin',label:'通用名拼音'},
          {prop:'goodsunit',label:'货品基本单位'},
          {prop:'defaultpack',label:'缺省包装'},
          {prop:'credate',label:'建立日期'},
          {prop:'inputmanid',label:'创建人'},
          {prop:'inputmanname',label:'创建人名称'},
          {prop:'usestatus',label:'状态ID'},
          {prop:'standardcode',label:'质量标准码'},
          {prop:'ssxkcyr',label:'上市许可持有人'},
          {prop:'commissionid',label:'委托加工企业ID'},
          {prop:'com_companyname',label:'委托加工企业名称'},
          {prop:'salestaxrate',label:'销售税率'},
          {prop:'sutaxrate',label:'进货税率'},
          {prop:'jybf',label:'简易办法'},
          {prop:'drugtype',label:'剂型'},
          {prop:'memo',label:'备注'},
          {prop:'ifimport',label:'库存保障品种'},
          {prop:'ifback',label:'是否可退货'},
          {prop:'iforder',label:'订单商品'},
          {prop:'ifctrlzb',label:'是否控制中包'},
          {prop:'qua_goodsid',label:'货品标识号'},
          {prop:'qualityscopeid',label:'所属经营范围'},
          {prop:'scopename',label:'所属经营范围名称'},
          {prop:'validperiod',label:'效期'},
          {prop:'periodunit',label:'期间单位'},
          {prop:'storagecondition',label:'仓储条件ID'},
          {prop:'storageconditionname',label:'仓储条件'},
          {prop:'transcondition',label:'运输条件ID'},
          {prop:'transconditionname',label:'运输条件'},
          {prop:'functionlist',label:'功能主治'},
          {prop:'usage',label:'用法用量'},
          {prop:'packstandard',label:'包装是否合格'},
          {prop:'forcetypeno',label:'国家强制产品认证'},
          {prop:'productapprovno',label:'产品说明书批件'},
          {prop:'apparatusno',label:'计量器具许可证号'},
          {prop:'apparatusperiod',label:'计量器具许可证效期'},
          {prop:'otherperiod',label:'其他关键质量信息中效期'},
          {prop:'drugadminclass',label:'药监分类ID'},
          {prop:'drugadminclassname',label:'药监分类'},
          {prop:'medicatype',label:'中/西药'},
          {prop:'brand',label:'品牌'},
          {prop:'brandgrade',label:'品牌等级'},
          {prop:'brandgradename',label:'品牌等级'},
          {prop:'markettime',label:'上市时间'},
          {prop:'adflag',label:'广告品种'},
          {prop:'clinicalflag',label:'临床品种'},
          {prop:'drugsflag',label:'药品非药品'},
          {prop:'approveno',label:'生产批文号'},
          {prop:'approveperiod',label:'生产批文效期'},
          {prop:'qualitystandardno',label:'质量标准编号'},
          {prop:'qualitystandardperiod',label:'质量标准效期'},
          {prop:'inspectionno',label:'检验报告单编号'},
          {prop:'inspectionperiod',label:'检验报告单效期'},
          {prop:'sampleflag',label:'样品'},
          {prop:'trademark',label:'注册商标'},
          {prop:'trademarkno',label:'商标注册证号'},
          {prop:'trademarkperiod',label:'商标注册证效期'},
          {prop:'barcodeno',label:'商品条码证'},
          {prop:'barcodeperiod',label:'商品条码效期'},
          {prop:'bailername',label:'委托书姓名'},
          {prop:'baileridcard',label:'委托书身份证'},
          {prop:'bailerperiod',label:'委托书效期'},
          {prop:'commissproduceno',label:'药品委托生产批件编号'},
          {prop:'commissproduceperiod',label:'药品委托生产批件效期'},
          {prop:'specialgoodsno',label:'特殊商品卫生许可证号'},
          {prop:'specialgoodsperiod',label:'特殊商品卫生证效期'},
          {prop:'informationclass',label:'资料类别'},
          {prop:'informationclassname',label:'资料类别'},
          {prop:'compound',label:'单方复方药'},
          {prop:'ccode',label:'药品本位码'},
          {prop:'goodsid_cgjl',label:'货品ID'},
          {prop:'managerid',label:'采购经理ID'},
          {prop:'managername',label:'采购经理'},
          {prop:'class1',label:'采购分组分类1'},
          {prop:'class1name',label:'采购分组分类1'},
          {prop:'class2',label:'采购分组分类2'},
          {prop:'companyid',label:'合作伙伴ID'},
          {prop:'companyname',label:'合作伙伴'},
          {prop:'classa',label:'A类分类'},
          {prop:'classaname',label:'A类分类'},
          {prop:'property',label:'品牌名称属性'},
          {prop:'companytype',label:'合作伙伴类型'},
          {prop:'companytypename',label:'合作伙伴类型'},
          {prop:'cwspflbm',label:'财务商品分类编码'},
        ];
        this.exportExcelDOM(columns,this.tableData,'货品基础数据维护');
      }
    },
    handleChange(data){
      this.selectDoc(data.pageNum,data.pageSize);
    },
    selectDoc(pageNum,pageSize){
      this.$refs.query.collapse = false;
      let formData=this.hpjcsjwhFormData;
      let params={};
      if(formData.sflcpz === true){
        formData.sflcpz = 1;
      }else {
        formData.sflcpz = null;
      }
      if(formData.sfybml === true){
        formData.sfybml = 1;
      }else {
        formData.sfybml = null;
      }
      formData.companyid=Number(sessionStorage['companyid']);
      if (formData.ingoodsids!==null&&formData.ingoodsids!=="") {
        let array = [];
        formData.ingoodsids.split(',').forEach(item => {
          array.push(item);
        })
        params.ingoodsids = array;
      }
      if (formData.goodsno!==null&&formData.goodsno!=="") {
        let array = [];
        formData.goodsno.split(',').forEach(item => {
          array.push(item);
        })
        params.ingoodsno = array;
      }
      Object.keys(formData).forEach(e => {
        if(e!=="goodsno"&&e!=="ingoodsids"){
          if(formData[e]!==null&&formData[e]!==""){
            params[e]=formData[e];
          }
        }
      });
      if(Object.keys(params).length<=0){
        params=null;
      }
      this.tableData=[];
      this.loading=true;
      this.$api.quality.selectHpjcsjwhDoc({pageNum:pageNum,pageSize:pageSize,params:params}).then(res => {
        if (res.code === 200) {
          this.tableData = Object.freeze(res.data.content);
          this.hpjcsjwhPageSize = res.data.pageSize;
          this.hpjcsjwhPageNum = res.data.pageNum;
          this.hpjcsjwhTotal = res.data.totalSize;
          this.loading = false;
        }
      }).catch(error => {
        this.loading=false;
        return false;
      })
    },
    handleQuery(row){
      this.hpjcsjwhVisible=true;
      this.dtlStatus=true;
      this.docTitle='修改货品基础数据维护';
      this.dtlData=row;
    },
    queryHov(data){
      if(data === 'goodsid'){
        this.queryGoodsVisible = true;
      }else if(data === 'factid'){
        this.queryFactVisible = true;
      }
    }
  }
}
