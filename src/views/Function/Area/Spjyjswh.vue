<template>
<div
  v-loading="execlLoading"
  element-loading-background="rgba(0,0,0,0.6)"
  :element-loading-text="execlText">
  <e-query
    ref="query"
    :form-list="formList"
    :form-data="formData"
    :btn-options="btnOptions"
    @openHov="openHov"
    @query="queryFunction"
    @implUserExcel="implUserExcel"
  ></e-query>
  <e-table
    ref="doctable"
    :table-columns="tableColumns"
    :table-data="tableData"
    :table-height="tableHeight"
    :loading="loading"
    @handle="handleFunction"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  ></e-table>
  <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" :title="title" :width="dialogWidth"
             :top="dialogTop" :destroy-on-close="true" :close-on-click-modal="false" @close="dialogColse">
    <el-form :model="basenm" v-if="compayid===67949" :label-position="labelPosition" label-width="100px" style="margin:0 auto" :inline="true">
      <el-form-item label="货品ID">
        <el-input v-model="basenm.goodsid" :disabled="true" style="width:80%;"></el-input>
        <el-button icon="el-icon-search" circle @click="openHov(compayid)"></el-button>
      </el-form-item>
      <el-form-item label="货品">
        <el-input v-model="basenm.goodsname" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="经营分类">
        <el-select v-model="basenm.goodsjyfl" :clearable="true">
          <el-option v-for="(item,index) in goodsjyflOptions" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品功能">
        <el-select v-model="basenm.goodsfunction" :clearable="true">
          <el-option v-for="(item,index) in goodsfunctionOptions" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推荐次序">
        <el-select v-model="basenm.tjorder" :clearable="true">
          <el-option v-for="(item,index) in tjorderOptionnm" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格带">
        <el-select v-model="basenm.priceband" :clearable="true">
          <el-option v-for="(item,index) in pricebandOption" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格敏感度">
        <el-select v-model="basenm.pricesen" :clearable="true">
          <el-option v-for="(item,index) in pricesenOptionnm" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维价标志">
        <el-input v-model="basenm.priceflag"></el-input>
      </el-form-item>
      <el-form-item label="预定货品">
        <el-input v-model="basenm.ordergoods"></el-input>
      </el-form-item>
      <el-form-item label="自定产地">
        <el-input v-model="basenm.proareaself"></el-input>
      </el-form-item>
      <el-form-item label="采购员">
        <el-select v-model="basenm.buyer" :clearable="true">
          <el-option v-for="(item,index) in buyerOption" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="饮片分类">
        <el-input v-model="basenm.ypfl"></el-input>
      </el-form-item>
      <el-form-item label="饮片名称">
        <el-input v-model="basenm.ypname"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="basenm.goodsstatusname" :clearable="true">
          <el-option v-for="(item,index) in goodsstatusOptionnm" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form :model="basesy" v-if="compayid===3" :label-position="labelPosition" label-width="110px" style="margin:0 auto" :inline="true">
      <el-form-item label="货品ID">
        <el-input v-model="basesy.goodsid" :disabled="true" style="width:80%;"></el-input>
        <el-button icon="el-icon-search" circle @click="openHov(compayid)"></el-button>
      </el-form-item>
      <el-form-item label="货品">
        <el-input v-model="basesy.goodsname" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="商品自定义角色">
        <el-select v-model="basesy.goodsjyfl" :clearable="true">
          <el-option v-for="(item,index) in goodsjyflOptions" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品功能">
        <el-select v-model="basesy.goodsfunction" :clearable="true">
          <el-option v-for="(item,index) in goodsfunctionOptions" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格敏感度">
        <el-select v-model="basesy.pricesen" :clearable="true">
          <el-option v-for="(item,index) in pricesenOptionsy" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格带">
        <el-select v-model="basesy.priceband" :clearable="true">
          <el-option v-for="(item,index) in pricebandOption" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="毛利率分类">
        <el-select v-model="basesy.zxcolumn1" :clearable="true">
          <el-option v-for="(item,index) in zxcolumn1Option" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="basesy.goodsstatusname" :clearable="true">
          <el-option v-for="(item,index) in goodsstatusOptionsy" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推荐次序">
        <el-select v-model="basesy.tjorder" :clearable="true">
          <el-option v-for="(item,index) in tjorderOptionsy" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="营销商品">
        <el-select v-model="basesy.zxcolumn2" :clearable="true">
          <el-option v-for="(item,index) in zxcolumn2Option" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="处方分类">
        <el-select v-model="basesy.zxcolumn3" :clearable="true">
          <el-option v-for="(item,index) in zxcolumn3Option" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="拟定必备">
        <el-select v-model="basesy.zxcolumn4" :clearable="true">
          <el-option v-for="(item,index) in zxcolumn4Option" :key="index" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align: center">
      <el-button type="primary" @click="insertForm" :loading="btnloading">保存</el-button>
      <el-button type="info" @click="dialogColse">取消</el-button>
    </div>
  </el-dialog>
  <hov-tools v-if="goodsVisible" :hov-data="goodsHov"></hov-tools>
  <hov-tools v-if="goodsDtlVisible" :hov-data="goodsDtlHov"></hov-tools>
</div>
</template>

<script>
import EQuery from "@/views/Core/EQuery";
import HovTools from "@/views/Core/HovTools";
import {selectDdlOption, selectOption} from "@/utils/functions";
import ETable from "@/views/Core/ETable";
import XLSX from 'xlsx'
export default {
  name: 'Spjyjswh',
  components:{ ETable, HovTools, EQuery},
  data(){
    return {
      execlLoading:false,
      execlText:'正在导入,请稍后...',
      formList:[
        {type:'inputHov',id:'goodsid',label:'货品ID',labelWidth:65,formWidth:180},
        {type:'select',id:'goodsjyfl',label:'经营分类',options:[],clearable:true},
        {type:'select',id:'goodsfunction',label:'产品功能',options:[],clearable:true},
        {type:'input',id:'ingoodsid',label:'货品ID(多个用,间隔)'}
      ],
      formData:{goodsid:null,goodsjyfl:null,goodsfunction:null,ingoodsid:null},
      btnOptions:[
        {id:'query',icon:"fa fa-search", label:"action.search",perms:"region:spjyjswh:select"},
        {id:'add',icon:"fa fa-plus", label:"action.add",perms:"region:spjyjswh:add"},
        {id:'upload',icon:"fa fa-plus", label:"action.upload",perms:"region:spjyjswh:select"}
      ],
      tableColumns:[
        {type:0,prop:'goodsid',label:'货品ID',tableStatus:0},
        {type:0,prop:'goodsname',label:'货品',tableStatus:0},
        {type:0,prop:'goodsjyfl',label:'经营分类',tableStatus:0},
        {type:0,prop:'goodsfunction',label:'产品功能',tableStatus:0},
        {type:0,prop:'tjorder',label:'推荐次序',tableStatus:0},
        {type:0,prop:'priceband',label:'价格带',tableStatus:0},
        {type:0,prop:'pricesen',label:'价格敏感度',tableStatus:0},
        {type:0,prop:'priceflag',label:'维价标志',tableStatus:0},
        {type:0,prop:'ordergoods',label:'预定货品',tableStatus:0},
        {type:0,prop:'proareaself',label:'自定产地',tableStatus:0},
        {type:0,prop:'buyer',label:'采购员',tableStatus:0},
        {type:0,prop:'ypfl',label:'饮片分类',tableStatus:0},
        {type:0,prop:'ypname',label:'饮片名称',tableStatus:0},
        {type:0,prop:'goodsstatusname',label:'状态',tableStatus:0},
        {type:0,prop:'zxcolumn1',label:'毛利率分类',tableStatus:0},
        {type:0,prop:'zxcolumn2',label:'营销商品',tableStatus:0},
        {type:0,prop:'zxcolumn3',label:'处方分类',tableStatus:0},
        {type:0,prop:'zxcolumn4',label:'拟定必备',tableStatus:0},
        {type:1,prop:'caozuo',label:'操作',tableStatus:0,fixed:'right',width:180,widthStatus:true,options:[
            {id:'update',label:'action.edit',icon:'fa fa-edit',perms:'region:spjyjswh:update'},
            {id:'delete',label:'action.delete',icon:'fa fa-delete',perms:'region:spjyjswh:delete'}
          ]}
      ],
      tableData:[],
      tableHeight:0,
      loading:false,
      addVisible:false,
      doctype:0,
      title:'',
      dtlData:{},
      basenm:{
        goodsid:null,
        goodsname:null,
        goodsjyfl:null,
        goodsfunction:null,
        tjorder:null,
        priceband:null,
        pricesen:null,
        priceflag:null,
        ordergoods:null,
        proareaself:null,
        buyer:null,
        ypfl:null,
        ypname:null,
        goodsstatusname:null
      },
      basesy:{
        goodsid:null,
        goodsname:null,
        goodsjyfl:null,
        goodsfunction:null,
        pricesen:null,
        priceband:null,
        zxcolumn1:null,
        goodsstatusname:null,
        tjorder:null,
        zxcolumn2:null,
        zxcolumn3:null,
        zxcolumn4:null,
      },
      goodsjyflOptions:[],
      goodsfunctionOptions:[],
      dialogVisible:false,
      dialogWidth:'700px',
      dialogTop:'12vh',
      labelPosition:'right',
      btnloading:false,
      compayid:Number(sessionStorage['companyid']),
      tjorderOptionnm:[{value:'',label:''},{value:'一推',label:'一推'},{value:'二推',label:'二推'},{value:'三推',label:'三推'}],
      tjorderOptionsy:[{value:'',label:''},{value:'1推',label:'1推'},{value:'2推',label:'2推'},{value:'3推',label:'3推'}],
      pricesenOptionnm:[
        {value:'极敏感',label:'极敏感'},{value:'一般敏感',label:'一般敏感'},{value:'不敏感',label:'不敏感'}
      ],
      pricesenOptionsy:[
        {value:'极敏感',label:'极敏感'},{value:'极敏感-',label:'极敏感-'},{value:'一般敏感',label:'一般敏感'},
        {value:'一般敏感-',label:'一般敏感-'},{value:'不敏感',label:'不敏感'},
      ],
      pricebandOption:[
        {value:'高',label:'高'},{value:'中',label:'中'},{value:'低',label:'低'},
      ],
      buyerOption:[
        {value:'刘',label:'刘'},{value:'于',label:'于'},{value:'赵',label:'赵'}
      ],
      goodsstatusOptionnm:[{value:'新品',label:'新品'},{value:'正式',label:'正式'},{value:'临时',label:'临时'},{value:'淘汰',label:'淘汰'}],
      goodsstatusOptionsy:[{value:'新品',label:'新品'},{value:'正式',label:'正式'},{value:'暂停',label:'暂停'},{value:'淘汰',label:'淘汰'},{value:'待淘汰',label:'待淘汰'}],
      zxcolumn1Option:[
        {value:'70%以上',label:'70%以上'},{value:'50-70%',label:'50-70%'},{value:'35-50%',label:'35-50%'},
        {value:'0-35%',label:'0-35%'},{value:'0以下',label:'0以下'}
      ],
      zxcolumn2Option:[{value:'',label:''},{value:'YX',label:'YX'}],
      zxcolumn3Option:[{value:'处方',label:'处方'},{value:'非处方',label:'非处方'}],
      zxcolumn4Option:[
        {value:'带量采购品',label:'带量采购品'},{value:'带量采购同品',label:'带量采购同品'},
        {value:'医保付费品',label:'医保付费品'},{value:'其他',label:'其他'}
      ],
      goodsjyflOptionsss:[{value:'毛利额高',label:'毛利额高'},{value:'毛利率高',label:'毛利率高'},{value:'品牌商品',label:'品牌商品'},
        {value:'临床品',label:'临床品'}, {value:'低价商品',label:'低价商品'},{value:'辅助商品',label:'辅助商品'}],
      execlColumns:[
        {prop:'goodsid',label:'货品ID'},
        {prop:'goodsfunction',label:'产品功能'},
        {prop:'tjorder',label:'推荐次序（修改）'},
        {prop:'priceband',label:'价格带'},
        {prop:'pricesen',label:'价格敏感度'},
        {prop:'goodsstatusname',label:'状态'},
        {prop:'zxcolumn1',label:'毛利率分类'},
        {prop:'zxcolumn2',label:'营销商品'},
        {prop:'zxcolumn3',label:'处方分类'},
        /*{prop:'goodsids',label:'医保付费分类'},*/
        {prop:'zxcolumn4',label:'拟定必备'}
      ],
      goodsDtlVisible:false,
      goodsDtlHov:{
        hovTitle:'货品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "",
        parentVisible:'goodsDtlVisible',
        hovColumns:
          [
            {id: "goodsid", name: "货品ID",queryStatus:true,dataStatus:2,fillid:"goodsid"},
            {id: "goodsname", name: "货品名称",queryStatus:true,dataStatus:1,fillid:"goodsname"},
            {id: "opcode", name: "货品操作码",queryStatus:true,dataStatus:1},
            {id: "goodstype", name: "规格",queryStatus:false,dataStatus:1},
            {id: "goodsunit", name: "单位",queryStatus:false,dataStatus:1},
            {id: "prodarea", name: "产地",queryStatus:false,dataStatus:1}
          ]
      },
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
    }
  },
  created(){
    this.tableHeight=(window.innerHeight-240);
    if(Number(sessionStorage['companyid'])===67949){
      let nmjyfl=selectDdlOption('NMJYFL');
      this.goodsjyflOptions=nmjyfl;
      selectOption(this.formList,'goodsjyfl',nmjyfl);
      let nmcpgn=selectDdlOption('NMCPGN');
      let nmcpgnParams=[];
      nmcpgnParams.push({value:'',label:''});
      nmcpgn.forEach(e=>{
        nmcpgnParams.push(e);
      });
      this.goodsfunctionOptions=nmcpgnParams;
      selectOption(this.formList,'goodsfunction',nmcpgn);
    }else if(Number(sessionStorage['companyid'])===3){
      let nmjyfl=[{value:'穿透品',label:'穿透品'},{value:'高毛利1',label:'高毛利1'},{value:'高毛利2',label:'高毛利2'},
        {value:'竞争品',label:'竞争品'},{value:'品牌品',label:'品牌品'},{value:'一般商品',label:'一般商品'}];
      this.goodsjyflOptions=nmjyfl;
      selectOption(this.formList,'goodsjyfl',nmjyfl);
      let nmcpgn=[{value:'',label:''},{value:'毛利额高',label:'毛利额高'},{value:'毛利率高',label:'毛利率高'},{value:'品牌商品',label:'品牌商品'},
        {value:'临床品',label:'临床品'}, {value:'低价商品',label:'低价商品'},{value:'辅助商品',label:'辅助商品'}];
      this.goodsfunctionOptions=nmcpgn;
      selectOption(this.formList,'goodsfunction',nmcpgn);
    }
  },
  methods:{
    queryFunction(data){
      if(data==="query"){
        let pageSize=this.$refs.doctable.pageSize;
        this.selectDoc(1,pageSize);
      }else if(data==="add"){
        this.title='新增表单';
        this.doctype=0;
        this.dialogVisible=true;
      }
    },
    handleChange(data){
      this.selectDoc(data.pageNum,data.pageSize);
    },
    selectDoc(pageNum,pageSize){
      this.$refs.query.collapse=false;
      let formData=this.formData;
      let params={};
      Object.keys(formData).forEach(e=>{
        if(formData[e]!==null&&formData[e]!==""){
          params[e]=formData[e];
        }
      });
      params.companyid=Number(sessionStorage['companyid']);
      this.loading=true;
      this.tableData=[];
      this.$api.area.selectSpjyjswh({pageNum:pageNum,pageSize:pageSize,params:params}).then(res=>{
        if(res.code===200){
          this.tableData=Object.freeze(res.data.content);
          this.$refs.doctable.pageNum=res.data.pageNum;
          this.$refs.doctable.pageSize=res.data.pageSize;
          this.$refs.doctable.total=res.data.totalSize;
          this.loading=false;
        }
      }).catch(error=>{
        this.loading=false;
        return false;
      })
    },
    handleFunction(data){
      if(data.id==="update"){
        this.title='修改表单';
        this.doctype=1;
        let companyid=Number(sessionStorage['companyid']);
        if(companyid===67949){
          Object.keys(this.basenm).forEach(e=>{
            this.basenm[e]=data.row[e];
          })
        }else if(companyid===3){
          Object.keys(this.basesy).forEach(e=>{
            this.basesy[e]=data.row[e];
          })
        }
        this.dialogVisible=true;
      }else if(data.id==="delete"){
        this.$api.area.delSpjyjswh({goodsid:data.row.goodsid,companyid:Number(sessionStorage['companyid'])}).then(res=>{
          if(res.code===200){
            if(res.data===1){
              alert("删除成功");
              this.queryFunction('query');
            }else{
              alert(res.msg);
              return false;
            }
          }
        }).catch(error=>{
          return false;
        })
      }
    },
    openHov(data){
      if(data==="goodsid"){
        this.goodsVisible=true;
      }else if(data===67949){
        if(this.doctype===1){
          return false;
        }
        this.goodsDtlHov.fillDataName='basenm';
        this.goodsDtlVisible=true;
      }else if(data===3){
        if(this.doctype===1){
          return false;
        }
        this.goodsDtlHov.fillDataName='basesy';
        this.goodsDtlVisible=true;
      }
    },
    dialogColse(){
      Object.keys(this.basesy).forEach(e=>{
        this.basesy[e]=null;
      });
      Object.keys(this.basenm).forEach(e=>{
        this.basenm[e]=null;
      });
      this.dialogVisible=false;
    },
    insertForm(){
      let params={};
      if(this.compayid===67949){
        if(this.basenm.goodsid===''||this.basenm.goodsid===null){
          alert("货品不能为空!");
          return false;
        }
        Object.keys(this.basenm).forEach(e=>{
          params[e]=this.basenm[e];
        })
      }else if(this.compayid===3){
        if(this.basesy.goodsid===''||this.basesy.goodsid===null){
          alert("货品不能为空!");
          return false;
        }
        Object.keys(this.basesy).forEach(e=>{
          params[e]=this.basesy[e];
        })
      }
      params.companyid=this.compayid;
      if(this.doctype===0){
        this.btnloading=true;
        this.$api.area.insertSpjyjswh(params).then(res=>{
          if(res.code===200){
            if(res.data===1){
              alert("保存成功");
              this.btnloading=false;
              this.dialogColse();
              this.queryFunction('query');
            }else{
              alert(res.msg);
              this.btnloading=false;
              return false;
            }
          }
        }).catch(error=>{
          this.btnloading=false;
          return false;
        });
      }else if(this.doctype===1){
        this.btnloading=true;
        this.$api.area.updateSpjyjswh(params).then(res=>{
          if(res.code===200){
            if(res.data===1){
              alert("修改成功");
              this.btnloading=false;
              this.dialogColse();
              this.queryFunction('query');
            }else{
              alert(res.msg);
              this.btnloading=false;
              return false;
            }
          }
        }).catch(error=>{
          this.btnloading=false;
          return false;
        });
      }
    },
    implUserExcel(e){
      let _this=this;
      let reader=new FileReader();
      reader.readAsBinaryString(e.raw);
      let uploadData=[];
      reader.onload =function (e) {
        const workbook = XLSX.read(e.target.result, {type:"binary"});
        let sheetList = workbook.SheetNames;
        const ws=XLSX.utils.sheet_to_json(workbook.Sheets[sheetList]);
        ws.forEach(e=>{
          var sheetData={};
          _this.execlColumns.forEach(res => {
            Object.keys(e).forEach(es=>{
              if(es===res.label){
                sheetData[res.prop]=e[es];
              }
            })
          });
          sheetData.companyid=Number(sessionStorage['companyid']);
          uploadData.push(sheetData);
        });
        _this.saveExecl(uploadData);
      };
    },
    saveExecl(uploadData){
      if(uploadData.length===0)
      {
        alert("导入数据为空");
        return false;
      }
      this.execlLoading = true;
      this.$api.area.uploadSpjyjswh({data:uploadData}).then(res=>{
        if(res.code===200){
          if(res.data>0){
            alert("导入成功");
            this.execlLoading=false;
          }else{
            alert(res.msg);
            this.execlLoading=false;
            return false;
          }
        }
      }).catch(error=>{
        this.execlLoading=false;
        return false;
      });
    }
  }
}
</script>

<style scoped>

</style>
