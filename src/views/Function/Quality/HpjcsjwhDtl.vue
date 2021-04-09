<template>
<div class="hpjcsjwhdtl">
  <el-dialog :visible.sync="dialogVisible" :title="docTitle" :width="dialogWidth" :top="dialogTop" :destroy-on-close="true" @close="docClose" :close-on-click-modal="false">
    <el-tabs type="border-card" @tab-click="handleClick" v-model="activeTabs">
      <el-tab-pane label="货品基本信息" name="first">
        <el-form :model="base" ref="baseForm" :label-width="baseLabelWidth" :label-position="labelOptions" :rules="baseRules">
          <el-form-item v-if="dtlStatus===true" label="货品ID" style="width:440px;float:left;">
            <el-input v-model="base.goodsid" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="通用名称" style="width:440px;float:left;" prop="goodsname">
            <el-input v-model="base.goodsname" style="width:340px;float:left;"></el-input>
          </el-form-item>
          <el-form-item label="操作码" style="width:260px;float:left;" prop="opcode">
            <el-input v-model="base.opcode" style="width:160px;float:left;"></el-input>
          </el-form-item>
          <el-form-item label="通用名拼音" style="width:190px;float:left">
            <el-input v-model="base.goodsformalpinyin" style="width:140px;float:left;"></el-input>
          </el-form-item>
          <el-form-item label="商品名" style="width:440px;float:left;">
            <el-input v-model="base.goodsformalname" style="width:340px;float:left;"></el-input>
          </el-form-item>
          <el-form-item label="规格" style="width:260px;float:left" prop="goodstype">
            <el-input v-model="base.goodstype" style="width:160px;float:left;"></el-input>
          </el-form-item>
          <el-form-item label="货品标记" style="width:220px;float:left">
            <el-input v-model="base.goodstag"  style="width:120px;float:left;"></el-input>
          </el-form-item>
          <el-form-item label="剂型" style="width:210px;float:left">
            <el-select v-model="base.drugtype" style="width:120px;" clearable @change="drugtypeChange">
              <el-option v-for="item in drugtypeOptions" :value="item.value" :key="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="基本单位" style="width:190px;float:left" prop="goodsunit">
            <el-input v-model="base.goodsunit" style="width:120px;float:left;"></el-input>
          </el-form-item>
          <el-form-item label="产地" style="width:280px;float:left" prop="prodarea">
            <el-input v-model="base.prodarea" style="width:180px;float:left;"></el-input>
          </el-form-item>
          <el-form-item label="缺省包装" style="width:220px;float:left">
            <el-input v-model="base.defaultpack" style="width:120px;float:left;"></el-input>
          </el-form-item>
          <el-form-item prop="gbcode" label="批准文号" style="clear:both;width:260px;float:left">
            <el-input v-model="base.gbcode" style="width:160px;float:left;"></el-input>
          </el-form-item>
          <el-form-item label="质量标准码" style="width:260px;float:left">
            <el-input v-model="base.standardcode" style="width:160px;float:left;"></el-input>
          </el-form-item>
          <el-form-item label="销售税率" style="width:160px;float:left" prop="salestaxrate">
            <el-select v-model="base.salestaxrate" style="width:80px;float:left;" clearable>
              <el-option :value="0.13" label="0.13"></el-option>
              <el-option :value="0.09" label="0.09"></el-option>
              <el-option :value="0" label="0"></el-option>
              <el-option :value="0.03" label="0.03"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="进货税率" style="width:160px;float:left">
            <el-select v-model="base.sutaxrate" style="width:80px;float:left;" clearable>
              <el-option :value="0.13" label="0.13"></el-option>
              <el-option :value="0.09" label="0.09"></el-option>
              <el-option :value="0" label="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上市许可持有人" style="width:320px;float:left">
            <el-input v-model="base.zxcolumn4" style="width:160px;float:left;"></el-input>
            <el-button icon="el-icon-search" circle @click="openHov('zxcolumn4')"></el-button>
          </el-form-item>
          <el-form-item label="生产企业ID" style="width:240px;float:left" prop="factid">
            <el-input v-model="base.factid" style="width:80px;float:left;margin-right:3px;" disabled="disabled"></el-input>
            <el-button icon="el-icon-search" circle @click="openHov('factid')" style="float:left"></el-button>
          </el-form-item>
          <el-form-item label="生产企业" style="width:360px;float:left">
            <el-input v-model="base.factname" disabled="disabled" style="width:280px;float:left;"></el-input>
          </el-form-item>
          <el-form-item label="委托加工企业ID" style="clear:both;width:280px;float:left">
            <el-input v-model="base.commissionid" style="width:120px;float:left;margin-right:5px;" disabled="disabled"></el-input>
            <el-button icon="el-icon-search" circle @click="openHov('commissionid')"></el-button>
          </el-form-item>
          <el-form-item label="委托加工企业" style="width:300px;float:left">
            <el-input v-model="base.commissionname" disabled="disabled" style="width:220px;float:left;"></el-input>
          </el-form-item>
          <el-form-item label="编码" style="width:150px;float:left">
          <el-input v-model="base.goodsno" style="width:100px;float:left;"></el-input>
          </el-form-item>
          <el-form-item label="简称" style="width:190px;float:left">
            <el-input v-model="base.goodsshortname" style="width:120px;float:left;"></el-input>
          </el-form-item>
          <el-form-item label="税收分类编码" style="width:280px;float:left">
            <el-input v-model="base.zxcolumn3" style="width:170px;float:left;" @keypress.native.enter="zx3blur" @blur="zx3blur"></el-input>
          </el-form-item>
          <el-form-item label="税收分类名称" style="width:360px;float:left">
            <el-input v-model="base.shflmc" style="width:260px;float:left;" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="状态" style="width:180px;float:left">
           <el-select v-model="base.usestatus" style="width:120px;float:left;" clearable>
             <el-option v-for="item in usestatusOptions" :value="item.value" :key="item.value" :label="item.label"></el-option>
           </el-select>
         </el-form-item>
          <el-form-item label="备注" style="width:280px;float:left">
            <el-input v-model="base.memo" style="width:170px;float:left;"></el-input>
          </el-form-item>
          <el-form-item label="创建人" style="width:160px;float:left">
            <el-input v-model="base.inputmanid" disabled="disabled" style="width:70px;float:left;"></el-input>
          </el-form-item>
          <el-form-item label="创建人名称" style="width:180px;float:left">
            <el-input v-model="base.inputmanname" disabled="disabled" style="width:90px;float:left;"></el-input>
          </el-form-item>
          <el-form-item label="建立日期" style="width:220px;float:left">
            <el-date-picker v-model="base.credate" disabled="disabled" type="datetime" style="width:140px;"></el-date-picker>
          </el-form-item>
          <el-form-item id="checkGroup" style="float:left;margin-left:0;width:850px;">
              <el-checkbox v-model="base.jybf" :true-label="1" :false-label="0">简易办法</el-checkbox>
              <el-checkbox v-model="base.ifimport" :true-label="1" :false-label="0">库存保障品种</el-checkbox>
              <el-checkbox v-model="base.ifback" :true-label="1" :false-label="0">是否可退货</el-checkbox>
              <el-checkbox v-model="base.iforder" :true-label="1" :false-label="0" disabled="disabled">订单商品</el-checkbox>
              <el-checkbox v-model="base.ifctrlzb" :true-label="1" :false-label="0">是否控制中包</el-checkbox>
              <el-checkbox v-model="base.sflcpz" :true-label="1" :false-label="0">是否冷藏品种</el-checkbox>
              <el-checkbox v-model="base.sfyypz" :true-label="1" :false-label="0">是否医院品种</el-checkbox>
              <el-checkbox v-model="base.sfybml" :true-label="1" :false-label="0">是否医保目录</el-checkbox>
          </el-form-item>
          <el-form-item style="width:100%;clear:both;float:left">
            <el-button type="info" size="small" round @click="docClose">取消</el-button>
            <el-button type="primary" size="small" round @click="addBase">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="货品包装信息"  name="second">
        <el-form :label-width="bzLabelWidth" :label-position="bzLabelOpsition">
          <el-form-item label="货品ID" style="width:160px;float:left;">
            <el-input v-model="bz.goodsid" disabled="disabled" style="width:100px;"></el-input>
          </el-form-item>
          <el-form-item label="品名" style="float:left;">
            <el-input v-model="bz.goodsname" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="规格" style="width:160px;float: left">
            <el-input v-model="bz.goodstype" disabled="disabled" style="width:100px;"></el-input>
          </el-form-item>
          <el-form-item label="单位" style="width:160px;float: left">
            <el-input v-model="bz.goodsunit" disabled="disabled" style="width:100px;"></el-input>
          </el-form-item>
          <el-form-item label="产地" style="float:left;">
            <el-input v-model="bz.prodarea" disabled="disabled"></el-input>
          </el-form-item>
        </el-form>
        <el-table
          :data="bzTableData"
          border
          stripe
          :height="tableHeight"
        >
          <el-table-column prop="goodsunit" label="包装名称"></el-table-column>
          <el-table-column prop="unittype" label="包装类型ID"></el-table-column>
          <el-table-column prop="bzlxname" label="包装类型"></el-table-column>
          <el-table-column prop="baseunitqty" label="包装大小"></el-table-column>
          <el-table-column prop="goodsunitlength" label="长"></el-table-column>
          <el-table-column prop="goodsunitwidth" label="宽"></el-table-column>
          <el-table-column prop="goodsunitheight" label="高" :width="120"></el-table-column>
          <el-table-column prop="goodsunitweight" label="重量"></el-table-column>
          <el-table-column prop="goodsunitvol" label="容积"></el-table-column>
          <el-table-column prop="barcode" label="条码" :width="120"></el-table-column>
          <el-table-column prop="usestatus" label="状态ID"></el-table-column>
          <el-table-column prop="bzztname" label="状态"></el-table-column>
          <el-table-column prop="goodsunitid" label="货品包装ID"></el-table-column>
          <el-table-column prop="goodsid" label="货品ID"></el-table-column>
          <el-table-column :width="160" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" @click="updateBzxxDtl(scope.row)">修改</el-button>
              <el-button type="primary" @click="deleteBzxxDtl(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-form>
          <el-form-item>
            <el-button type="primary" size="small" round @click="openBzxxDtl">新增</el-button>
            <el-button type="info" size="small" round @click="docClose">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="货品质量信息" name="third">
        <el-form style="margin:0 auto;" :label-width="zlxxLabelWidth">
          <el-form-item label="货品ID" class="fl wd300">
            <el-input v-model="zlxx.goodsid" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="品名" class="fl wd300">
            <el-input v-model="zlxx.goodsname"></el-input>
          </el-form-item>
          <el-form-item label="效期"  class="fl wd300">
            <el-input v-model="zlxx.validperiod"></el-input>
          </el-form-item>
          <el-form-item label="期间单位"  class="fl wd300">
            <el-input v-model="zlxx.periodunit"></el-input>
          </el-form-item>
          <el-form-item label="仓储条件" class="fl wd300">
            <el-select v-model="zlxx.storagecondition" clearable>
              <el-option v-for="item in storageConditionOptions" :value="item.value" :key="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运输条件" class="fl wd300">
            <el-select v-model="zlxx.transcondition" clearable>
              <el-option v-for="item in transConditionOptions" :value="item.value" :key="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="功能主治" style="clear:both;float:left;width:600px">
            <el-input v-model="zlxx.functionlist"></el-input>
          </el-form-item>
          <el-form-item label="用法用量" style="clear:both;float:left;width:600px;">
            <el-input v-model="zlxx.usage"></el-input>
          </el-form-item>
          <el-form-item label="包装是否合格" class="fl wd300">
            <el-select v-model="zlxx.packstandard" clearable>
              <el-option :value="0" label="不合格"></el-option>
              <el-option :value="1" label="合格"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="国家强制产品认证" class="fl wd300">
            <el-input v-model="zlxx.forcetypeno"></el-input>
          </el-form-item>
          <el-form-item label="产品说明书批件" class="fl wd300">
            <el-input v-model="zlxx.productapprovno"></el-input>
          </el-form-item>
          <el-form-item label="品牌" class="fl wd300">
            <el-input v-model="zlxx.brand"></el-input>
          </el-form-item>
          <el-form-item label="药监分类" class="fl wd300">
            <el-select v-model="zlxx.drugadminclass" clearable>
              <el-option v-for="item in drugadminClassOptions" :value="item.value" :key="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="中/西药" class="fl wd300">
            <el-select v-model="zlxx.medicatype" clearable>
              <el-option :value="1" label="西药"></el-option>
              <el-option :value="2" label="中药"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌等级" class="fl wd300">
            <el-select v-model="zlxx.brandgrade" clearable>
              <el-option v-for="item in brandGradeOptions" :value="item.value" :key="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上市时间" class="fl wd300">
            <el-date-picker type="datetime" v-model="zlxx.markettime" style="width:160px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="广告品种"  class="fl wd300">
            <el-select v-model="zlxx.adflag" clearable>
              <el-option :value="0" label="非广告"></el-option>
              <el-option :value="1" label="广告"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="临床品种"  class="fl wd300">
            <el-select v-model="zlxx.clinicalflag" clearable>
              <el-option :value="0" label="非临床"></el-option>
              <el-option :value="1" label="临床"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="药品非药品" class="fl wd300">
            <el-select v-model="zlxx.drugsflag" clearable>
              <el-option :value="0" label="非药品"></el-option>
              <el-option :value="1" label="药品"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资料类别" class="fl wd300">
            <el-select v-model="zlxx.informationclass" clearable>
              <el-option v-for="item in informationClassOptions" :value="item.value" :key="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="样品" class="fl wd300">
            <el-select v-model="zlxx.sampleflag" clearable>
              <el-option :value="1" label="有"></el-option>
              <el-option :value="2" label="无"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="注册商标" class="fl wd300">
            <el-input v-model="zlxx.trademark"></el-input>
          </el-form-item>
          <el-form-item label="单方复方药" class="fl wd300">
            <el-select v-model="zlxx.compound"  clearable>
              <el-option :value="0" label="复方"></el-option>
              <el-option :value="1" label="单方"></el-option>
            </el-select>
          </el-form-item>
        <!--  <el-form-item label="药品本位码" class="fl wd300">
            <el-input v-model="zlxx.ccode"></el-input>
          </el-form-item>-->
          <el-form-item label="所属经营范围ID" class="fl wd300">
            <el-input v-model="zlxx.qualityscopeid" disabled="disabled" style="width:80%"></el-input>
            <el-button icon="el-icon-search" circle @click="openHov('qualityscopeid')"></el-button>
          </el-form-item>
          <el-form-item label="所属经营范围"  class="fl wd300">
            <el-input v-model="zlxx.qualityscopename" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item style="float:left;">
            <el-checkbox v-model="zlxx.iflotno" label="不跟踪批号" :true-label="1" :false-label="0"></el-checkbox>
          </el-form-item>
          <el-form-item style="float:left;">
            <el-checkbox v-model="zlxx.ccode" label="是否扫码标记" :true-label="1" :false-label="0"></el-checkbox>
          </el-form-item>
          <el-form-item style="clear:both;float:left;width:100%;">
            <el-button type="primary" size="small" round @click="zlxxInsert">保存</el-button>
            <el-button type="info" size="small" round @click="docClose">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="采购经理" name="fourth">
        <el-form ref="cgjl" :model="cgjl" style="width:600px;margin:0 auto;" :label-width="cgjlLabelWidth">
          <el-form-item label="货品ID" class="fl wd300">
            <el-input v-model="cgjl.goodsid" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="货品ID" class="fl wd300">
            <el-input v-model="cgjl.goodsname" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="采购经理ID" style="clear:both" class="fl wd300" prop="managerid" :rules="[{required:true,message:'采购经理不能为空'}]">
            <el-input v-model="cgjl.managerid" style="width:80%;"></el-input>
            <el-button icon="el-icon-search" circle @click="openHov('managerid')"></el-button>
          </el-form-item>
          <el-form-item label="采购经理"  class="fl wd300">
            <el-input v-model="cgjl.managername"></el-input>
          </el-form-item>
          <el-form-item label="采购分组分类1" class="fl wd300">
            <el-select v-model="cgjl.class1" clearable>
              <el-option v-for="item in class1Options" :value="item.value" :key="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="采购分组分类2"  class="fl wd300">
            <el-select v-model="cgjl.class2" clearable>
              <el-option v-for="item in categoryid2Options" :value="item.value" :key="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合作伙伴ID" class="fl wd300">
            <el-input v-model="cgjl.companyid" style="width:80%;"></el-input>
            <el-button icon="el-icon-search" circle @click="openHov('companyid')"></el-button>
          </el-form-item>
          <el-form-item label="合作伙伴" class="fl wd300">
            <el-input v-model="cgjl.companyname"></el-input>
          </el-form-item>
          <el-form-item label="A类分类" class="fl wd300">
            <el-select v-model="cgjl.classa" clearable>
              <el-option v-for="item in classAOptions" :value="item.value" :key="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合作伙伴类型" class="fl wd300">
            <el-select v-model="cgjl.companytype" clearable>
              <el-option v-for="item in companyTypeOptions" :value="item.value" :key="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌名称属性" class="fl wd300">
            <el-input v-model="cgjl.property"></el-input>
          </el-form-item>
          <el-form-item label="采购支持" class="fl wd300">
            <el-select v-model="cgjl.buyerid" clearable>
              <el-option v-for="item in cgzcOptions" :value="item.value" :key="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="clear:both;float:left;">
            <el-button type="primary" size="small" round @click="cgjlInsert">保存</el-button>
            <el-button type="info" size="small" round @click="docClose">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="组合品"  name="fire">
        <div style="width:100%;height:20px;text-align:left;margin-left:20px;margin-top:5px;">
          <el-radio v-model="zhpRadio" label="1">是</el-radio>
          <el-radio v-model="zhpRadio" label="2">否</el-radio>
        </div>
        <div style="width:100%;height:40px;text-align:left;margin-left:20px;">
          <el-button type="primary" size="small" round @click="zhpAdd">新增</el-button>
        </div>
        <el-table
          :data="zhpTableData"
          border
          stripe
          :height="tableHeight"
        >
          <el-table-column prop="subgoodsid" label="子货品ID"></el-table-column>
          <el-table-column prop="subname" label="子货品名称"></el-table-column>
          <el-table-column prop="subtype" label="规格"></el-table-column>
          <el-table-column prop="subunit" label="单位"></el-table-column>
          <el-table-column prop="subqty" label="数量"></el-table-column>
          <el-table-column prop="approvedocno" label="批准文号"></el-table-column>
          <el-table-column prop="subfact" label="生产企业" :width="120"></el-table-column>
          <el-table-column :width="160">
            <template slot-scope="scope">
              <el-button type="primary" @click="updateZhp(scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="品类6新增"  name="six">
        <el-form :model="Pl6Form" label-width="100px" style="width:360px;margin:20px auto">
          <el-form-item label="货品ID">
            <el-input type="primary" v-model="Pl6Form.goodsid" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="货品品类ID">
            <el-input type="primary" v-model="Pl6Form.categoryid" disabled="disabled" style="width: 220px;float:left;"></el-input>
            <el-button icon="el-icon-search" circle @click="openHov('categoryid')"></el-button>
          </el-form-item>
          <el-form-item label="货品品类名称">
            <el-input type="primary" v-model="Pl6Form.categoryname" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="docClose">关闭</el-button>
            <el-button type="primary" @click="insertOrUpdatePL6">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
  <el-dialog v-if="bzxxDtlVisiable" :visible.sync="bzxxDtlVisiable" :title="bzxxdtlTitle" :width="dialogWidth"
             :top="dialogTop" :destroy-on-close="true" :close-on-click-modal="false" @close="zbxxClose">
    <el-form ref="bzxxdtl" :model="bzxxDtl" :label-width="bzxxdtlLabelWidth">
      <el-form-item label="包装名称" style="float:left;" prop="goodsunit" :rules="[{required:true,message:'包装名称不能为空'}]">
        <el-input v-model="bzxxDtl.goodsunit" :disabled="bzxxDtlStatus"></el-input>
      </el-form-item>
      <el-form-item label="包装类型" style="float:left;" prop="unittype" :rules="[{required:true,message:'包装类型不能为空'}]">
        <el-select v-model="bzxxDtl.unittype">
          <el-option v-for="item in unitTypeOptions" :value="item.value" :key="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="包装大小" style="clear:both;float:left;" prop="baseunitqty" :rules="[{required:true,message:'包装大小不能为空'}]">
        <el-input v-model="bzxxDtl.baseunitqty"></el-input>
      </el-form-item>
      <el-form-item label="长" style="float:left;">
        <el-input v-model="bzxxDtl.goodsunitlength"></el-input>
      </el-form-item>
      <el-form-item label="宽" style="float:left;">
        <el-input v-model="bzxxDtl.goodsunitwidth"></el-input>
      </el-form-item>
      <el-form-item label="高" style="clear:both;float:left;">
        <el-input v-model="bzxxDtl.goodsunitheight"></el-input>
      </el-form-item>
      <el-form-item label="重量" style="float:left;">
        <el-input v-model="bzxxDtl.goodsunitweight"></el-input>
      </el-form-item>
      <el-form-item label="容积" style="clear:both;float:left;">
        <el-input v-model="bzxxDtl.goodsunitvol"></el-input>
      </el-form-item>
      <el-form-item label="条码" style="float:left;">
        <el-input v-model="bzxxDtl.barcode"></el-input>
      </el-form-item>
      <el-form-item label="状态" style="clear:both;float:left;">
        <el-select v-model="bzxxDtl.usestatus">
          <el-option v-for="item in bzuseStatusOptions" :value="item.value" :key="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  style="clear:both;float:left;">
        <el-button type="info" size="small" round @click="zbxxClose">取消</el-button>
        <el-button type="primary" size="small" round @click="bzxxInsert">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog v-if="zhpDtlVisiable" :visible.sync="zhpDtlVisiable" :title="zhpdtlTitle" :width="dialogWidth"
             :top="dialogTop" :destroy-on-close="true" :close-on-click-modal="false" @close="zhpClose">
    <el-form :label-width="zhpDtlLabelWidth">
      <el-form-item label="子货品ID" style="float:left;">
        <el-input v-model.number="zhpDtl.subgoodsid" disabled="disabled" style="width:80%"></el-input>
        <el-button icon="el-icon-search" circle @click="openHov('goodsid')"></el-button>
      </el-form-item>
      <el-form-item label="子货品名称" style="float:left;">
        <el-input v-model="zhpDtl.subname"></el-input>
      </el-form-item>
      <el-form-item label="规格" style="clear:both;float:left;">
        <el-input v-model="zhpDtl.subtype"></el-input>
      </el-form-item>
      <el-form-item label="单位" style="float:left;">
        <el-input v-model="zhpDtl.subunit"></el-input>
      </el-form-item>
      <el-form-item label="数量" style="float:left;">
        <el-input v-model="zhpDtl.subqty"></el-input>
      </el-form-item>
      <el-form-item label="批准文号" style="clear:both;float:left;">
        <el-input v-model="zhpDtl.approvedocno"></el-input>
      </el-form-item>
      <el-form-item label="生产企业" style="float:left;">
        <el-input v-model="zhpDtl.subfact"></el-input>
      </el-form-item>
      <el-form-item  style="clear:both;float:left;">
        <el-button type="info" size="small" round @click="zhpClose">取消</el-button>
        <el-button type="primary" size="small" round @click="zhpInsert">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <hov-tools v-if="baseFactVisible" :hov-data="baseFactHov"></hov-tools>
  <hov-tools v-if="baseCommissionVisible" :hov-data="baseCommissionHov"></hov-tools>
  <hov-tools v-if="zlxxQualityscopeVisible" :hov-data="zlxxQualityscopeHov"></hov-tools>
  <hov-tools v-if="cgjlManagerVisible" :hov-data="cgjlManagerHov"></hov-tools>
  <hov-tools v-if="cgjlCompanyVisible" :hov-data="cgjlCompanyHov"></hov-tools>
  <hov-tools v-if="zhpGoodsVisible" :hov-data="zhpGoodsHov"></hov-tools>
  <hov-tools v-if="zxcolumn4Visible" :hov-data="zxcolumn4Hov"></hov-tools>
  <hov-tools v-if="categoryVisible" :hov-data="categoryHov"></hov-tools>
</div>
</template>
<!--货品基础数据维护-->
<script lang="js" src="../../../js/quality/hpjcxjwhdtl.js"></script>

<style>
  .hpjcsjwhdtl .el-dialog{max-height:624px;height:624px;}
  .hpjcsjwhdtl .el-dialog__body{padding:0 2px 20px 2px}
 .hpjcsjwhdtl .el-dialog__body .el-tabs__content{padding:5px;height:516px;overflow-y: auto;}
  .hpjcsjwhdtl #checkGroup .el-form-item__content .el-checkbox{margin-right: 2px}
  .hpjcsjwhdtl .wd300{width:300px;}
  .hpjcsjwhdtl .fl{float:left;}
  #bz .el-form-item__label-wrap{margin-left:0}
</style>
