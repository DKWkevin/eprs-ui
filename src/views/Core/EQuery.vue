<template>
  <div class="toolbar">
    <div class="querybtndiv">
      <el-form>
        <el-form-item style="clear:both;width: 100%;text-align:left;">
          <div v-for="item in btnOptions" :key="item.id" style="float:left;margin-right:5px">
            <kt-button  v-if="item.id!=='upload'" :icon="item.icon" :label="$t(item.label)" :perms="item.perms" type="primary" :loading="item.loading" @click="handle(item.id)" />
            <!--<upload-button v-else-if="item.id==='upload'" @upload="implUserExcel($event)" :disabled="!hasPerms(item.perms)"></upload-button>-->
            <el-upload
              v-else-if="item.id.indexOf('upload')>=0"
              :disabled="!hasPerms(item.perms)"
              class="upload-demo"
              ref="upload"
              :action="action"
              :on-change="implUserExcel"
              :show-file-list="false"
              :auto-upload="false">
              <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div :class="[collapse===true?'collapseDiv':'discollapseDiv']">
      <el-form :model="formData" :inline="true" :label-position="labelPosition">
        <div v-for="list in formList" :key="list.id" style="float:left;">
          <el-form-item v-if="list.type === 'input'"  :style="{width:(list.formWidth?list.formWidth+'px':'300px;')}">
            <div :style="{width:(list.labelWidth?list.labelWidth+'px':'')}" style="float:left;margin-right:5px;">{{list.label+':'}}</div>
            <el-input
              :style="{width:(list.formWidth?(list.formWidth-list.labelWidth-10+'px'):(300 - labelWidths - 40)+'px')}"
              v-model.trim="formData[list.id]"
              :disabled="list.disabled"
              :clearable="list.clearable"
              @input="force"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="list.type === 'inputNumber'"  :style="{width:(list.formWidth?list.formWidth+'px':'300px;')}">
             <div :style="{width:(list.labelWidth?list.labelWidth+'px':'')}" style="float:left;margin-right:5px;">{{list.label+':'}}</div>
            <el-input
              :style="{width:(list.formWidth?(list.formWidth-list.labelWidth-10+'px'):(300 - labelWidths - 40)+'px')}"
              v-model.number="formData[list.id]"
              :disabled="list.disabled"
              :clearable="list.clearable"
              @input="force"
            ></el-input>
          </el-form-item>
          <el-form-item v-else-if="list.type === 'inputHov'" :style="{width:(list.formWidth?list.formWidth+'px':'300px;')}">
            <div :style="{width:(list.labelWidth?list.labelWidth+'px':'')}" style="float:left;margin-right:5px;">{{list.label+':'}}</div>
            <el-input
              v-if="list.dataType==='number'"
              v-model.number="formData[list.id]"
              :disabled="list.disabled"
              :clearable="list.clearable"
              :style="{width:(list.formWidth?(list.formWidth-list.labelWidth-35+'px'):(300 - labelWidths - 40)+'px')}"
              @input="force"
            ></el-input>
            <el-input
              v-else
              v-model.trim="formData[list.id]"
              :disabled="list.disabled"
              :clearable="list.clearable"
              :style="{width:(list.formWidth?(list.formWidth-list.labelWidth-35+'px'):(300 - labelWidths - 40)+'px')}"
              @input="force"
            ></el-input>
            <el-button
              icon="el-icon-search"
              circle
              @click="openHov(list.id)"
            ></el-button>
          </el-form-item>
          <el-form-item v-else-if="list.type === 'inputPrice'" class="formListMax">
             <div :style="{width:(list.labelWidth?list.labelWidth+'px':'')}" style="float:left;margin-right:5px;">{{list.label+':'}}</div>
            <el-input
              v-model.number="formData[list.minid]"
              :disabled="list.disabled"
              :clearable="list.clearable"
              :placeholder="list.minPlaceholder"
              style="width:40%;"
              @input="force"
            ></el-input>
            <span style="width:2%;display: inline-block">&#45;</span>
            <el-input
              v-model.number="formData[list.maxid]"
              :disabled="list.disabled"
              :clearable="list.clearable"
              :placeholder="list.maxPlaceholder"
              style="width:45%;"
              @input="force"
            ></el-input>
          </el-form-item>
          <el-form-item v-else-if="list.type === 'select'"  :style="{width:(list.formWidth?list.formWidth+'px':'300px;')}">
            <div :style="{width:(list.labelWidth?list.labelWidth+'px':'')}" style="float:left;margin-right:5px;">{{list.label+':'}}</div>
            <el-select v-model.trim="formData[list.id]"
                    :disabled="list.disabled"
                    :clearable="list.clearable"
            >
              <el-option v-for="item in list.options" :key="item.value" :value="item.value" :label="item.label">{{item.label}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-else-if="list.type === 'selectName'"  :style="{width:(list.formWidth?list.formWidth:'300px;')}">
             <div :style="{width:(list.labelWidth?list.labelWidth+'px':'')}" style="float:left;margin-right:5px;">{{list.label+':'}}</div>
            <el-select v-model.trim="formData[list.id]"
                    :disabled="list.disabled"
                    clearable
                    @change="selectChange($event)"
            >
              <el-option v-for="item in list.options" :key="item.value" :value="item.value" :label="item.label">{{item.label}}</el-option>
            </el-select>
            <input v-model.trim="formData[list.dataName]" disabled="disabled"></input>
          </el-form-item>
          <el-form-item v-else-if="list.type === 'datetime'" style="width:280px" class="formListMin">
             <div :style="{width:(list.labelWidth?list.labelWidth+'px':'')}" style="float:left;margin-right:5px;">{{list.label+':'}}</div>
            <el-date-picker
              v-model.trim="formData[list.id]"
              :disabled="list.disabled"
              :clearable="list.clearable"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              :style="{width:(list.labelWidth?(280 - list.labelWidth-10)+'px':'220px'),float:'left'}"
            ></el-date-picker>
          </el-form-item>
          <el-form-item v-else-if="list.type === 'datetimerange'"  :style="{width:(list.formWidth?list.formWidth+'px':'400px;')}">
             <div :style="{width:(list.labelWidth?list.labelWidth+'px':'')}" style="float:left;margin-right:5px;">{{list.label+':'}}</div>
            <el-date-picker
              v-model.trim="formData[list.id]"
              :disabled="list.disabled"
              :clearable="list.clearable"
              type="datetimerange"
              range-separator="至"
              :default-time="['00:00:00','23:59:59']"
              style="width:300px;float:left;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item v-else-if="list.type === 'daterange'"  :style="{width:(list.formWidth?list.formWidth+'px':'400px;')}">
            <div :style="{width:(list.labelWidth?list.labelWidth+'px':'')}" style="float:left;margin-right:5px;">{{list.label+':'}}</div>
            <el-date-picker
              class="daterange"
              type="datetime"
              v-model.trim="formData[list.id1]"
              :disabled="list.disabled"
              :clearable="list.clearable"
              :default-time="'00:00:00'"
              style="width:150px;float:left;"
            ></el-date-picker>
            <el-date-picker
              class="daterange"
              v-model.trim="formData[list.id2]"
              :disabled="list.disabled"
              :clearable="list.clearable"
              type="datetime"
              :default-time="'23:59:59'"
              style="width:150px;float:left;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item v-else-if="list.type === '3-4'" class="formListMin">
             <div :style="{width:(list.labelWidth?list.labelWidth+'px':'')}" style="float:left;margin-right:5px;">{{list.label+':'}}</div>
            <el-date-picker
              v-model.trim="formData[list.startId]"
              :disabled="list.disabled"
              :clearable="list.clearable"
              type="datetime"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <el-date-picker
              v-model.trim="formData[list.endId]"
              :disabled="list.disabled"
              :clearable="list.clearable"
              type="datetime"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item v-else-if="list.type === 'checkGroupBtn'" style="float:left;">
             <div :style="{width:(list.labelWidth?list.labelWidth+'px':'')}" style="float:left;margin-right:5px;">{{list.label+':'}}</div>
            <el-checkbox-group v-model.trim="formData[list.id]">
              <el-checkbox-button v-for="op in list.options" :key="op.value" :disabled="op.disabled" :label="op.value" @change="checkChange">{{op.label}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item v-else-if="list.type === 'checkGroup'" style="float:left;width:100%;">
             <div v-if="list.labelStatus" :style="{width:(list.labelWidth?list.labelWidth+'px':'')}" style="float:left;margin-right:5px;">{{list.label+':'}}</div>
            <el-checkbox-group v-model.trim="formData[list.id]">
              <el-checkbox v-for="op in list.options" :key="op.value" :disabled="op.disabled" :label="op.value"  @change="checkChange">{{op.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item v-else-if="list.type === 'check'" :style="{width:(list.formWidth?list.formWidth:'260px;')}">
             <div :style="{width:(list.labelWidth?list.labelWidth+'px':'')}" style="float:left;margin-right:5px;">{{list.label}}</div>
            <el-checkbox v-model.trim="formData[list.id]" :label="list.value" :disabled="list.disabled" :true-label="list.trueLabel" :false-label="list.falseLabel"  @change="checkChange">{{list.labelName}}</el-checkbox>
          </el-form-item>
        </div>
      </el-form>
      <div class="collapseBtn" v-if="collapseStatus===true">
        <a href="javascript:void(0)" :class="[collapse===true?'el-icon-arrow-up':'el-icon-arrow-down']" @click="collapseBtn"></a>
      </div>
    </div>
  </div>
</template>

<script>
  import UploadButton from "@/views/Core/uploadButton";
  import KtButton from "@/views/Core/KtButton"
  import { hasPermission } from '@/permission/index.js'
  export default {
    name: 'EQuery',
    components:{KtButton,UploadButton},
    props: {
      formList: {type:Array},
      formData: {type:Object,default:function(){}},
      btnOptions:{type:Array},
      collapseStatus:{type:Boolean,default:true},
      labelWidthStatus:{type:Boolean,default:true},
      labelWidthPx:{type:String,default:'80px'}
    },
    data () {
      return {
        dialogVisible: false,
        hovData:{},
        termWidth:'clac(100% - this.labelWidth)',
        collapse:false,
        labelPosition:'left',
        minLabelWidth:'60px',
        labelWidth:'0',
        labelWidths:0,
        action:''
      }
    },
    created(){
      if(this.labelWidthStatus===true){
        let len=0;
        this.formList.forEach(e => {
          if(e.label.indexOf('ID')!==-1){
            if((e.label.length-1)>len&&(e.label.length-1)<=6){
              len=(e.label.length-1);
            }
          }else{
            if(e.label.length>len&&e.label.length<=6){
              len=e.label.length;
            }
          }
        });
        if(len===2){
          this.labelWidth=(len*20)+'px';
          this.labelWidths=Number(len*20);
        }else if(len===3){
          this.labelWidth=(len*18)+'px';
          this.labelWidths=Number(len*18);
        }else if(len===6){
          this.labelWidth=(len*17)+'px';
          this.labelWidths=Number(len*17);
        }else{
          this.labelWidth=(len*17)+'px';
          this.labelWidths=Number(len*17);
        }
      }else{
        let labelWidthPx=this.labelWidthPx;
        this.labelWidth=labelWidthPx;
        this.labelWidths=Number(labelWidthPx.substring(0,labelWidthPx.length-2));
      }
    },
    methods:{
      force(){
        this.$forceUpdate()
      },
      handle(id){
        this.$emit('query',id)
      },
      openHov(id){
        this.$emit('openHov',id);
      },
      selectChange(e){
        console.log(e);
      },
      updateHov(data){
        for(var i=0;i<data.length;i++){
          this.formData[data[i].id]=data[i].value;
        }
      },
      collapseBtn(){
        this.collapse = this.collapse === false;
      },
      checkChange(value){
        this.$emit('checkChange', value);
      },
      implUserExcel(e, id){
        console.log(id)
        this.$emit('implUserExcel',e);
      },
      hasPerms: function (perms) {
        // 根据权限标识和外部指示状态进行权限判断
        return hasPermission(perms) & !this.disabled
      }
    }
  }
</script>

<style scoped>
  a{text-decoration: none;}
  .toolbar{float:left;position:relative;width:100%;height:75px;}
  .toolbar .discollapseDiv{width:100%;max-height:30px;position:absolute;top:32px;left:0;overflow: hidden;background:white;}
  .toolbar .collapseDiv{width:100%;height:auto;position:absolute;overflow:visible;top:32px;left:0;z-index: 10;background:white;}
  .toolbar .collapseBtn{width:40px;position:absolute;top:0;right:0;}
  .toolbar .querybtndiv{width:96%;position: absolute;top:0px;left:0;padding-left:15px;}
  .toolbar .el-form--inline,.distoolbar .el-form--inline {text-align:left;}
  .formListMax{width:440px;}
  .formListMin{width:260px;}
  .toolbar .el-form .el-form-item__label{padding:0;}
  .toolbar .el-form-item--mini.el-form-item,.toolbar .el-form-item--small.el-form-item {
    margin-bottom: 6px;
  }
  .toolbar >>> .el-input__inner{padding:0 5px;}
  .toolbar >>> .is-circle{padding:5px;}
  .toolbar >>> .el-range-separator{line-height: 28px;}
  .daterange >>> .el-input__inner{padding-left:25px !important;}
</style>
