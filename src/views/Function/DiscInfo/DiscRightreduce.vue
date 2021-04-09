<template>
<div>
  <el-form
    ref="rightreduce"
    :model="rightreduce"
    :rules="rules"
    label-width="0"
    style="width:100%;margin: 0 auto;" >
    <!--<el-form-item>
      <div class="dtlNameDiv">
        <span class="dtlNameTitle">方案名称</span>
        <el-input class="dtlName" v-model="rightreduce.dtlName"></el-input>
      </div>
    </el-form-item>-->
    <el-form-item>
      <div class="dtlNameDiv">
        <span class="dtlNameTitle">立减类型</span>
        <el-select class="dtlName" v-model="rightreduce.reducetype" :disabled="rightreduce.data.length>0" @change="changeReducetype">
          <el-option :value="0" label="减金额"></el-option>
          <el-option :value="1" label="减商品"></el-option>
        </el-select>
      </div>
    </el-form-item>
    <el-form-item>
      <template v-if="rightreduce.reducetype === 1" style="color:rgba(200,16,46,1)">减商品计算说明：费用承担商折扣  +  零售商折扣 =  折扣数量 * 总部标零价</template>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click="addClick">添加</el-button>
    </el-form-item>
    <el-table :data="rightreduce.data" height="300">
      <el-table-column label="方案名称" align="center">
        <template slot-scope="scope">
          <el-form-item :prop="'data.'+scope.$index+'.dtlName'" :rules="rules.dtlName">
            <el-input v-model="scope.row.dtlName" style="padding-top:15px;"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="货品ID" align="center" v-if="rightreduce.reducetype !== 0">
        <template slot-scope="scope">
          <el-form-item :prop="'data.'+scope.$index+'.goodsid'" :rules="rules.goodsid">
            <el-input v-model="scope.row.goodsid" style="padding-top:15px;width:70%;display: none" disabled="disabled"></el-input>
            <el-input v-model="scope.row.goodsname" style="padding-top:15px;width:70%" disabled="disabled"></el-input>
            <el-button
              type="" icon="el-icon-search"
              circle
              @click="openHovAfter(scope.$index)"
            ></el-button>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="货品数量" align="center" v-if="rightreduce.reducetype !== 0">
        <template slot-scope="scope">
          <el-form-item :prop="'data.'+scope.$index+'.buynum'" :rules="rules.buynum">
            <el-input v-model="scope.row.buynum" style="padding-top:15px;"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="折扣数量" align="center" v-if="rightreduce.reducetype !== 0">
        <template slot-scope="scope">
          <el-form-item :prop="'data.'+scope.$index+'.discnum'" :rules="rules.discnum">
            <el-input v-model="scope.row.discnum" style="padding-top:15px;" @change="changeNum(scope.$index)"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="折扣金额" align="center"  v-if="rightreduce.reducetype !== 1">
        <template slot-scope="scope">
          <el-form-item :prop="'data.'+scope.$index+'.disctotal'" :rules="rules.disctotal">
            <el-input v-model="scope.row.disctotal" style="padding-top:15px;"  ></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="费用承担商折扣" align="center">
        <template slot-scope="scope">
          <el-form-item :prop="'data.'+scope.$index+'.supplydisc'" :rules="rules.supplydisc">
            <el-input v-model="scope.row.supplydisc" style="padding-top:15px;" @change="changeNumdisc(scope.$index,0)" :placeholder="discPlaceholder"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="零售商折扣" align="center">
        <template slot-scope="scope">
          <el-form-item :prop="'data.'+scope.$index+'.saledisc'" :rules="rules.saledisc">
            <el-input v-model="scope.row.saledisc" style="padding-top:15px;" @change="changeNumdisc(scope.$index,1)" :placeholder="discPlaceholder"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="费用承担商ID" align="center">
        <template slot-scope="scope">
          <el-form-item :prop="'data.'+scope.$index+'.supplyid'" :rules="rules.supplyid">
            <el-input v-model="scope.row.supplyid" :disabled="true" style="padding-top:15px;width:70%;display: none;"></el-input>
            <el-input v-model="scope.row.supplyname" :disabled="true" style="padding-top:15px;width:70%"></el-input>
            <el-button
              type="" icon="el-icon-search"
              circle
              :disabled="scope.row.supplystatus"
              @click="openHov('supplyid',scope.$index)"
            ></el-button>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-link type="primary" size="mini" v-if="rightreduce.reducetype !== 1" @click="handAdd(scope.$index,scope.row.children)">参加货品限定</el-link>
          <el-link type="danger" size="mini" @click="handDelete(scope.$index)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-form-item>
      <el-button type="primary" @click="goodsBack">上一步</el-button>
      <el-button type="primary" @click="ruleForm">创建促销方案</el-button>
    </el-form-item>
  </el-form>
  <div ref="fixedDiv" v-if="rightreduceLimitStatus" class="rightreduceFixedDiv">
    <div class="rightreduceFixedBox">
      <div class="rightreduceFixedTitle">参加货品限定</div>
      <div class="rightreduceFixedForm">
      <el-form ref="rightreduceLimit" :model="rightreduceLimit" label-width="0" :rules="rules">
        <el-form-item>
          <el-button type="primary" @click="addDtlClick">添加一条数据</el-button>
        </el-form-item>
        <el-form-item>
          <el-table :data="rightreduceLimit.data" height="320px">
            <el-table-column label="货品ID" align="center">
              <template slot-scope="scope">
                <el-form-item :prop="'data.'+scope.$index+'.goodsid'" :rules="rules.goodsid">
                  <el-input v-model.number="scope.row.goodsid" :disabled="true"  style="padding-top:15px;width:70%;display: none"></el-input>
                  <el-input v-model.number="scope.row.goodsname" :disabled="true"  style="padding-top:15px;width:70%"></el-input>
                  <el-button
                    type="" icon="el-icon-search"
                    circle
                    @click="openHov('goodsid',scope.$index)"
                  ></el-button>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="购买数量" align="center">
              <template slot-scope="scope">
                <el-form-item :prop="'data.'+scope.$index+'.buynum'" :rules="rules.buynum">
                  <el-input v-model="scope.row.buynum" style="padding-top:15px;"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-link type="danger"  @click="handDtlDelete(scope.$index)">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      </div>
      <div>
        <el-button type="primary" @click="ruleDtlForm">确认</el-button>
        <el-button type="info" @click="handDtlClose">取消 </el-button>
      </div>
    </div>
  </div>
  <disc-hov-tools v-if="supplyVisible" :hov-data="supplyHov"></disc-hov-tools>
  <disc-hov-tools v-if="goodsVisible" :hov-data="goodsHov"></disc-hov-tools>
  <disc-hov-tools v-if="goodsQueryVisible" :hov-data="goodsQueryHov" @updatehov="goodsUpdate"></disc-hov-tools>
</div>
</template>

<script>
import DiscHovTools from "./DiscHovTools";
export default {
  name: 'DiscRightreduce',
  components: {DiscHovTools},
  data(){
    var isNumber = (rule,value,callback) =>
    {
      let reg = /^\d+(\.\d{1,2})?$/;
      if(value!==null && reg.test(value) === false)
      {
        callback(new Error('请填写整数或者两位小数'));
      }
      else
      {
        callback();
      }
    };
    var isNullNumber = (rule,value,callback) =>
    {
      let reg = /^\d+(\.\d{1,2})?$/;
      if (value === null||value ==='')
      {
        callback(new Error('数据不能为空'));
      }
      else if (value === 0)
      {
        callback(new Error('数据不能为0'));
      }
      else  if(value!==null && reg.test(value) === false)
      {
        callback(new Error('请填写整数或者两位小数'));
      }
      else
      {
        callback();
      }
    };
    return{
      rightreduce:{
        dtlName:'',
        reducetype:'',
        data:[]
      },
      rightreduceLimit:{index:0,data:[]},
      rightReduceIndex: null,
      rules:{
        discnum:{validator:isNumber, trigger:'blur'},
        disctotal:{validator:isNumber, trigger:'blur'},
        supplydisc:{validator:isNumber, trigger:'blur'},
        saledisc:{validator:isNumber, trigger:'blur'},
        //supplyid:{required:true, message:'请选择费用承担商ID', trigger:'blur'},
        goodsid:{required:true, message:'请填写货品ID', trigger:'blur'},
        buynum:{validator:isNullNumber, trigger:'blur'}
      },
      rightreduceLimitStatus:false,
      discPlaceholder:'',
      supplyVisible:false,
      supplyHov:{
        hovTitle:'费用承担商查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "",
        parentVisible:'supplyVisible',
        hovColumns:
          [
            {id: "companyid", name: "费用承担商ID",queryStatus:true,dataStatus:2,fillid:"supplyid"},
            {id: "companyname", name: "费用承担商名称",queryStatus:true,dataStatus:1,fillid:"supplyname"},
            {id: "companyopcode", name: "费用承担商操作码",queryStatus:true,dataStatus:1}
          ]
      },
      goodsVisible:false,
      goodsHov:{
        hovTitle:'货品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "",
        parentVisible:'goodsVisible',
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
      goodsQueryVisible: false,
      goodsQueryHov:{
        hovTitle:'货品查询',
        hovUrl: "goodsPrice/select",
        afterStatus: true,
        fillDataName: "",
        parentVisible:'goodsQueryVisible',
        hovColumns:
          [
            {id: "goodsid", name: "货品ID",queryStatus:true,dataStatus:2,fillid:"goodsid"},
            {id: "goodsname", name: "货品名称",queryStatus:true,dataStatus:1,fillid:"goodsname"},
            {id: "opcode", name: "货品操作码",queryStatus:true,dataStatus:1},
            {id: "goodstype", name: "规格",queryStatus:false,dataStatus:1},
            {id: "goodsunit", name: "单位",queryStatus:false,dataStatus:1},
            {id: "prodarea", name: "产地",queryStatus:false,dataStatus:1},
            {id: "goodsPrice", name: "折扣金额",queryStatus:false,dataStatus:1,fillid:"sale"}

          ]
      }
    }
  },
  methods:{
    goodsBack(){
      this.$parent.cardBack('rightreduce');
    },
    addClick(){
      if(this.rightreduce.reducetype !== null && this.rightreduce.reducetype !== ""){
        let params = {};
        if (this.rightreduce.reducetype === 1) {
          params = {goodsid:null,goodsname:null,buynum:null,dtlName:null,discnum:null,disctotal:null,supplydisc:null,saledisc:null,
            supplyid:null,supplyname:null,sale:null,saleAll:null,supplystatus:true,children:[]};
        }else if (this.rightreduce.reducetype === 0) {
          params = {dtlName:null,discnum:null,disctotal:null,supplydisc:null,saledisc:null,supplyid:null,supplyname:null,supplystatus:true,children:[]};
        }
        this.rightreduce.data.push(params);
      }else{
        alert("请先选择立减类型！！！");
        return false
      }
    },
    addDtlClick(){
      if (this.rightreduce.reducetype === 1 && this.rightreduceLimit.data.length >= 1) {
        alert("立减类型为减商品, 参加货品限定只能添加一条");
        return false;
      }else{
        let params = {goodsid:null,goodsname:null,buynum:null};
        this.rightreduceLimit.data.push(params);
      }
    },
    handAdd(index,children){
      this.rightreduceLimit.index = index;
      this.rightreduceLimit.data = children;
      this.rightreduceLimitStatus = true;
    },
    handDelete(index){
      this.rightreduce.data.splice(index, 1);
    },
    handDtlDelete(index){
      this.rightreduceLimit.data.splice(index, 1);
    },
    handDtlClose(){
      this.rightreduceLimit.index = 0;
      this.rightreduceLimit.data = [];
      this.rightreduceLimitStatus = false;
    },
    ruleDtlForm(){
      this.$refs.rightreduceLimit.validate((valid) => {
        if (valid) {
          this.rightreduce.data[this.rightreduceLimit.index].children = this.rightreduceLimit.data;
          this.rightreduceLimit.index = 0;
          this.rightreduceLimit.data = [];
          this.rightreduceLimitStatus = false;
        }
        else
        {
          return false;
        }
      })
    },
    ruleForm(){
      this.$refs.rightreduce.validate((valid) => {
        if(valid)
        {

          let params = this.getParams();
          if (params.hasOwnProperty('flag') === true) {
            if (params.flag === 0) {
              alert("请填写立减细单参加货品限制");
              return false;
            } else if(params.flag === 1){
              alert("请填写立减细单");
              return false;
            } else if(params.flag === 2){
              alert("费用承担商折扣加上零售商折扣必须等于折扣金额");
              return false;
            } else if(params.flag === 3){
              alert("费用承担商折扣不为空时,费用承担商ID不能为空");
              return false;
            }
          }
          this.$parent.loading = true;
           this.$api.discInfo.inserDiscInfo(params).then(res => {
             if(res.code === 200){
               if(res.data>0){
                 alert("生成促销方案成功");
                 this.$parent.$parent.tabsRefreshCurrentHandle();
               }else{
                 alert(res.msg);
                 this.$parent.loading = false;
                 return false;
               }
             }
           }).catch(error =>{
             this.$parent.loading = false;
             return false;
           })
        }
        else
        {
          return false;
        }
      })
    },
    getParams(){
      let paramsJson = {};
      let parent = this.$parent.docData;
      let cardtypeidLength = parent.discinfodeflst.cardtypeid.length;
      let rightreduce = [];
      let count=0;
      for(let i = 0, j = this.rightreduce.data.length; i < j; i++){
        let rightreduceTel = {};
        let supplydisc = Number(this.rightreduce.data[i].supplydisc);
        let saledisc = Number(this.rightreduce.data[i].saledisc);
        if(this.rightreduce.reducetype ===0){
          if((Number(supplydisc)+Number(saledisc)).toFixed(3) !== Number(this.rightreduce.data[i].disctotal).toFixed(3)){
            paramsJson = {};
            paramsJson.flag = 2;
            return paramsJson;
          }
        }
        /*else if(this.rightreduce.reducetype === 1){
          if((Number(supplydisc)+Number(saledisc)).toFixed(3) !== Number(this.rightreduce.data[i].saveAll).toFixed(3)){
            paramsJson = {};
            paramsJson.flag = 2;
            return paramsJson;
          }
        }*/
        if (this.rightreduce.data[i].supplydisc!==null&&this.rightreduce.data[i].supplydisc!==''){
          if(Number(this.rightreduce.data[i].supplydisc)!==0){
            if(this.rightreduce.data[i].supplyid===null||this.rightreduce.data[i].supplyid==='') {
              paramsJson = {};
              paramsJson.flag = 3;
              return paramsJson;
            }
          }
        }
        rightreduceTel.dtlName = this.rightreduce.data[i].dtlName;
        rightreduceTel.reducetype = this.rightreduce.reducetype;
        rightreduceTel.discnum = this.rightreduce.data[i].discnum;
        rightreduceTel.disctotal = this.rightreduce.data[i].disctotal;
        rightreduceTel.supplydisc = this.rightreduce.data[i].supplydisc;
        rightreduceTel.saledisc = this.rightreduce.data[i].saledisc;
        if(this.rightreduce.data[i].supplyid!==null){
          count = count + 1;
        }
        rightreduceTel.supplyid = this.rightreduce.data[i].supplyid;
        if(this.rightreduce.reducetype === 0){
          if(this.rightreduce.data[i].children.length === 0){
            paramsJson = {};
            paramsJson.flag = 0;
            return paramsJson;
          }
          let itemArray = [];
          this.rightreduce.data[i].children.forEach(childItem => {
            let childItemJson = {};
            childItemJson.goodsid = childItem.goodsid;
            childItemJson.buynum = childItem.buynum;
            itemArray.push(childItemJson);
          })
          rightreduceTel.discbindfullreducereghtreducelimitlst = itemArray;
        }else {
          rightreduceTel.discbindfullreducereghtreducelimitlst = [
            {goodsid: this.rightreduce.data[i].goodsid, buynum: this.rightreduce.data[i].buynum}
          ];
        }
        rightreduce.push(rightreduceTel);
      }
      if(rightreduce.length === 0){
        paramsJson = {};
        paramsJson.flag = 1;
        return paramsJson;
      }
      paramsJson.discbindfullreducereghtreducelst = rightreduce;

      paramsJson.discinfodeflst = {};
      paramsJson.discinfodeflst.discname= parent.discinfodeflst.discname;
      paramsJson.discinfodeflst.begindate = parent.discinfodeflst.begindate;
      paramsJson.discinfodeflst.enddate = parent.discinfodeflst.enddate;
      paramsJson.discinfodeflst.discclassid = parent.discinfodeflst.discclassid;
      paramsJson.discinfodeflst.cardtypeid = parent.discinfodeflst.cardtypeid.toString();
      paramsJson.discinfodeflst.inputmanid = parent.discinfodeflst.inputmanid;
      paramsJson.discinfodeflst.companyid = parent.discinfodeflst.companyid;
      paramsJson.discinfodeflst.usestatus = parent.discinfodeflst.usestatus;
      paramsJson.discinfodeflst.classOuterMutex = parent.discinfodeflst.classOuterMutex;
      paramsJson.discinfodeflst.cityFlag = parent.discinfodeflst.cityFlag;
      if(count>0){
        paramsJson.discinfodeflst.supplyFlag = 1;
      }else{
        paramsJson.discinfodeflst.supplyFlag = 0;
      }
      if(parent.discinfodeflst.counterflag === -1){
        paramsJson.savedisccounterlimitbeanlst = [];
        if(Number(sessionStorage['companyid'])===19940){
          this.$parent.areaOption.forEach(item =>{
            let companyParams={};
            companyParams.companyid = Number(sessionStorage['companyid']);
            companyParams.status = 0;
            companyParams.cityid = item.value;
            companyParams.cityidbeanlst=[];
            paramsJson.savedisccounterlimitbeanlst.push(companyParams)
          });
        }else if(Number(sessionStorage['companyid']) === 3||Number(sessionStorage['companyid']) === 93740){
          this.$parent.areaOption.forEach(item =>{
            let companyParams={};
            companyParams.companyid = Number(sessionStorage['companyid']);
            companyParams.status = 0;
            companyParams.cityid = item.value;
            companyParams.cityidbeanlst=[];
            paramsJson.savedisccounterlimitbeanlst.push(companyParams)
          });
          parent.discinfodeflst.counterflag = null;
        }else {
          let companyParams={};
          companyParams.companyid = Number(sessionStorage['companyid']);
          companyParams.status = 0;
          companyParams.cityid = this.$parent.areaOption[0].value;
          companyParams.cityidbeanlst=[];
          paramsJson.savedisccounterlimitbeanlst.push(companyParams)
        }
      }else{
        if(parent.counterStatus === 0) {
          paramsJson.savedisccounterlimitbeanlst = parent.savedisccounterlimitbeanlst;
        }else {
          paramsJson.counterLst = parent.counterLst;
        }
      }
      return paramsJson;
    },
    openHov(id,index){
      if (id === 'supplyid') {
        this.supplyHov.fillDataName = this.rightreduce.data[index];
        this.supplyVisible = true;
      } else if (id === 'goodsid') {
        this.goodsHov.fillDataName = this.rightreduceLimit.data[index];
        this.goodsVisible = true;
      }
    },
    changeReducetype(){
      this.rightreduce.data = [];
    },
    openHovAfter(index){
      this.rightReduceIndex = index;
      this.goodsQueryHov.fillDataName = this.rightreduce.data[index];
      this.goodsQueryVisible = true;
    },
    goodsUpdate(){
      let index = Number(this.rightReduceIndex);
      if(this.rightreduce.data[index].discnum !== null && this.rightreduce.data[index].discnum !== ''){
        let saleNum = Number(this.rightreduce.data[index].sale) * Number(this.rightreduce.data[index].discnum);
        /*this.rightreduce.data[index].supplydisc = saleNum.toFixed(2);
        this.rightreduce.data[index].saledisc = 0;*/
        this.rightreduce.data[index].saleAll = saleNum.toFixed(2);
        this.discPlaceholder = "折扣总额"+saleNum.toFixed(2);
        this.rightReduceIndex = null;
      }
    },
    changeNum(index){
      if(this.rightreduce.data[index].sale !== null && this.rightreduce.data[index].sale !== ''){
        let saleNum = Number(this.rightreduce.data[index].sale) * Number(this.rightreduce.data[index].discnum);
        /*this.rightreduce.data[index].supplydisc = saleNum.toFixed(2);
        this.rightreduce.data[index].saledisc = 0;*/
        this.rightreduce.data[index].saleAll = saleNum.toFixed(2);
        this.discPlaceholder = "折扣总额"+saleNum.toFixed(2);
      }
    },
    changeNumdisc(index, status){
      let supplydisc = this.rightreduce.data[index].supplydisc;
      let saledisc = this.rightreduce.data[index].saledisc;
      let saleAll = this.rightreduce.data[index].saleAll;
      if(saleAll !== null && this.rightreduce.reducetype !== 0) {
        if(status === 1) {
          if(saledisc*1000>=saleAll*1000){
            this.rightreduce.data[index].saledisc = saleAll;
            this.rightreduce.data[index].supplydisc = '0.00';
            this.rightreduce.data[index].supplystatus = true;
          }else{

            this.rightreduce.data[index].supplydisc = (saleAll - saledisc).toFixed(2);
            this.rightreduce.data[index].supplystatus = this.selectSupplystatus(this.rightreduce.data[index].supplydisc);
          }
        }else if(status === 0) {
          if(supplydisc*1000>=saleAll*1000){
            this.rightreduce.data[index].supplydisc = saleAll;
            this.rightreduce.data[index].saledisc = '0.00';
            this.rightreduce.data[index].supplystatus = false;
          }else{
            this.rightreduce.data[index].saledisc = (saleAll - supplydisc).toFixed(2);
            this.rightreduce.data[index].supplystatus = this.selectSupplystatus(supplydisc);
          }
        }
      }else{
        this.rightreduce.data[index].supplystatus = this.selectSupplystatus(supplydisc);
      }
    },
    selectSupplystatus(value){
      if(value!==null&&value!==""&&Number(value).toFixed(2)!=='0.00'){
            if(Number(value).toFixed(2)>0.00){
              return false;
            }
        }else{
          return true;
        }
    }
  }
}
</script>

<style>
  .dtlNameDiv{width:400px;margin: 0 auto}
  .dtlNameTitle{float:left;margin-right: 10px;}
  .dtlName{width:300px;float:left;}
  .rightreduceFixedDiv{
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.2);
    position: absolute;
    top:0;
    left:0;
    z-index: 10;
  }
  .rightreduceFixedBox{
    width:50%;
    height:500px;
    background:white;
    border:1px solid #ccc;
    border-radius: 5px;
    margin:5% auto 0 auto;
  }
  .rightreduceFixedTitle{
    width:100%;
    height:40px;
    font-size:18px;
    font-weight: bold;
    line-height:36px;
    border-bottom: 1px solid #ccc;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background:linear-gradient(rgba(238, 237, 246, 0.28),#f8f8f8);
  }
  .rightreduceFixedForm{
    width:100%;
    height:380px;
    margin-top:20px;
  }
</style>
