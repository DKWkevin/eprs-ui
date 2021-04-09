<template>
<div id="card" v-loading="loading" element-loading-background="rgba(0,0,0,0.6)" :element-loading-text="loadingText">
    <div class="header">
      <el-steps :active="stepActive" align-center finish-status="success">
        <el-step v-for="(item,index) in stepOption" :key="index" :title="item.title" :description="item.description"></el-step>
      </el-steps>
    </div>
    <div class="mainDiv">
      <disc-info-doc
        ref="doc"
        v-show="nextCard === 'doc'"
        :discClassOption="discClassOption"
        :cardTypeOption="cardTypeOption"
      ></disc-info-doc>
      <disc-info-counter ref="counter" v-show="nextCard === 'counter'" :areaOption="areaOption" :cidtyid="cityid"></disc-info-counter>
      <disc-goods-discount v-show="nextCard === 'discount'"></disc-goods-discount>
      <disc-invalid-goods-give v-show="nextCard === 'invalidGoodsGive'"></disc-invalid-goods-give>
      <disc-invalid-give-pointmult v-show="nextCard === 'invalidGivePointmult'"></disc-invalid-give-pointmult>
      <disc-invalid-give-pointnum v-show="nextCard === 'invalidGivePointnum'"></disc-invalid-give-pointnum>
      <disc-rightreduce v-show="nextCard === 'rightreduce'"></disc-rightreduce>
    </div>
</div>
</template>

<script>
import discInfoDoc from './DiscInfoDoc'
import discInfoCounter from './DiscInfoCounter'
import discGoodsDiscount from './DiscGoodsDiscount'
import discInvalidGoodsGive from './DiscInvalidGoodsGive'
import discInvalidGivePointmult from './DiscInvalidGivePointmult'
import discInvalidGivePointnum from './DiscInvalidGivePointnum'
import DiscRightreduce from "./DiscRightreduce";
export default
{
  name: 'DiscInfoDoc',
  inject:['reload'],
  components:
  {
    DiscRightreduce,
    discInfoDoc,
    discInfoCounter,
    discGoodsDiscount,
    discInvalidGoodsGive,
    discInvalidGivePointmult,
    discInvalidGivePointnum
  },
  data ()
  {
    return{
      base:{},
      discClassOption:[],
      cardTypeOption:[],
      stepOption:[],
      nextCard:'doc',
      stepActive:0,
      transferData:[],
      counterflagTransfer:[],
      areaOption:[],
      areaOptionResize:[],
      docData:{},
      loading:false,
      loadingText:'正在生成促销方案',
      cityid:0
    }
  },
  created()
  {
    this.stepLoad();
    this.discClassLoad();
    this.cardTypeLoad();
  },
  methods:
  {
    stepLoad()
    {
      this.stepOption.push({card:'doc',title:'促销方案信息',description:'这是一张促销总单'});
      let params = null;
      if(Number(sessionStorage['companyid']) !== 19940){
        params = {companyid:Number(sessionStorage['companyid'])};
      }
      this.$api.discInfo.cityid({pageNum:1,pageSize:999,params:params}).then(res => {
        if(res.code === 200){
          let cityArray=[];
          res.data.content.map((city,index)=> {
            cityArray.push({value:city.cityid,label:city.cityname,display:false,check:false,children:[],valueName:'cityid',selectName:'selectSubcityLoad',parentId:'',indeterminate:false,childName:'subcityidbeanlst',childIndex:index})
          });
          this.areaOption = cityArray;
          this.areaOptionResize = cityArray;
        }
      }).catch(error =>{
        return false;
      });
    },
    discClassLoad(){
      this.$api.discInfo.selectDiscClass({}).then(res => {
        if(res.code === 200){
          this.discClassOption = res.data;
        }
      }).catch(error =>{
        return false;
      });
    },
    cardTypeLoad()
    {
      let params=[];
      this.$api.discInfo.selectCardType({pageNum:1,pageSize:999,params:null}).then(res => {
        if(res.code === 200){
          params.push({value:0,label:"非会员"});
          res.data.content.forEach(item =>{
            if(item.cardtypeid!==4&&item.cardtypeid!==5&&item.cardtypeid!==99){
              params.push({value:item.cardtypeid,label:item.typename})
            }
          });
          this.cardTypeOption=params;
        }
      }).catch(error =>{
        return false;
      });
    },
    hasCard(thisName){
      for (let i = 0; i < this.stepOption.length; i++)
      {
        if (this.stepOption[i].card === thisName)
        {
          return true;
        }
      }
      return  false;
    },
    selectCardName(id, thisName){
      for (let i = 0; i < this.stepOption.length; i++)
      {
        if (this.stepOption[i].card === thisName)
        {
          if(id === 'next')
          {
            return this.stepOption[i + 1].card;
          }
          else if (id === 'back')
          {
            return this.stepOption[i - 1].card;
          }
        }
      }
    },
    cardBack(name){
      let cardName = this.selectCardName('back', name);
      this.stepActive = this.stepActive - 1;
      this.nextCard = cardName;
    },
    reSizeDoc(){
      this.reload();
    }
  }
}
</script>

<style scoped>
  #card{
    width:100%;
    height:100%;
    border:1px solid #ebeef5;
    border-radius: 5px;
  }
  .header{
    width:100%;
    height:80px;
    padding:5px 0;
    border-bottom:1px solid #ebeef5;
  }
  .mainDiv{
    width:100%;
    height:calc(100% - 110px);
    padding:5px 0;
    overflow:auto;
  }
  #card >>> .el-transfer-panel__header{
    text-align:initial;
  }
  #card >>> .el-transfer-panel__body{
    text-align:initial;
  }
  #card >>> .el-form-item__error{
    width:100%;
  }
  #card >>> .el-card__body{padding: 5px 5px;}
</style>
