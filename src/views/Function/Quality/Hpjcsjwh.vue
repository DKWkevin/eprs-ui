<template>
<div>
  <e-query-collapse ref="query">
    <template v-slot:query>
      <el-form :inline="true">
        <el-form-item-hov prop="goodsid" label="货品ID" v-model="hpjcsjwhFormData.goodsid" hovFormWidth="180px" hovWidth="90px" @openHov="queryHov('goodsid')"></el-form-item-hov>
        <el-form-item-input prop="goodsname" label="货品名称" v-model="hpjcsjwhFormData.goodsname" inputWidth="150px"></el-form-item-input>
        <el-form-item-hov prop="factid" label="生产企业" v-model="hpjcsjwhFormData.factid" hovFormWidth="180px" hovWidth="80px" @openHov="queryHov('factid')"></el-form-item-hov>
        <el-form-item-input prop="factname" label="生产企业名称" v-model="hpjcsjwhFormData.factname" :disabled="true" inputWidth="150px"></el-form-item-input>
        <el-form-item-select prop="usestatus" label="状态" v-model="hpjcsjwhFormData.usestatus" :options="hpjcsjwhUsestatus" hovWidth="100px"></el-form-item-select>
        <el-form-item-input prop="gbcode" label="批准文号" v-model="hpjcsjwhFormData.gbcode" inputWidth="150px"></el-form-item-input>
        <el-form-item-select prop="drugadminclass" label="药监分类" v-model="hpjcsjwhFormData.drugadminclass"  hovWidth="120px" :options="hpjcsjwhDrugadminclass"></el-form-item-select>
        <el-form-item-select prop="informationclass" label="资料类别" v-model="hpjcsjwhFormData.informationclass"  hovWidth="120px" :options="hpjcsjwhInformationclass"></el-form-item-select>
        <el-form-item-input prop="shflbm" label="税收分类编码" v-model="hpjcsjwhFormData.shflbm" inputWidth="120px"></el-form-item-input>
        <el-form-item-input prop="goodsno" label="编码" v-model="hpjcsjwhFormData.goodsno" inputWidth="120px"></el-form-item-input>
        <el-form-item-select prop="transcondition" label="运输条件" v-model="hpjcsjwhFormData.transcondition"   hovWidth="120px" :options="hpjcsjwhTranscondition"></el-form-item-select>
        <el-form-item prop="sfybml" style="float:left">
          <el-checkbox v-model="hpjcsjwhFormData.sfybml" label="是否医保目录"></el-checkbox>
        </el-form-item>
        <el-form-item style="float:left;">
          <el-checkbox v-model="hpjcsjwhFormData.sflcpz" label="是否冷藏品种"></el-checkbox>
        </el-form-item>
        <el-form-item label="排序方式" style="float:left;">
          <el-select v-model="hpjcsjwhFormData.orderby" clearable style="width:120px">
            <el-option value="a.goodsid" label="货品标识号"></el-option>
            <el-option value="a.usestatus" label="状态"></el-option>
            <el-option value="a.factid" label="生产企业标识号"></el-option>
            <el-option value="a.gbcode" label="批准文号"></el-option>
            <el-option value="a.goodsno" label="编码"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item-input prop="ingoodsids" label="货品ID(多个)" v-model="hpjcsjwhFormData.ingoodsids" inputWidth="150px"></el-form-item-input>
      </el-form>
    </template>
    <template v-slot:button>
      <kt-button type="primary" icon="fa fa-search" :label="$t('action.search')" perms="quality:hpjbxx:select" @click="queryFunction('query')"></kt-button>
      <kt-button type="primary" icon="fa fa-plus" :label="$t('action.add')" perms="quality:hpjbxx:add" @click="queryFunction('add')"></kt-button>
      <kt-button type="primary" icon="fa fa-cog" :label="$t('action.reset')" perms="quality:hpjbxx:select" @click="queryFunction('reset')"></kt-button>
      <kt-button type="primary" icon="fa fa-download" :label="$t('action.download')" perms="quality:hpjbxx:select" @click="queryFunction('download')"></kt-button>
    </template>
  </e-query-collapse>
  <e-tables
    ref="doctable"
    :loading="loading"
    :pageNum="hpjcsjwhPageNum"
    :pageSize="hpjcsjwhPageSize"
    :total="hpjcsjwhTotal"
    :table-data="tableData"
    :table-height="tableHeight"
    @currentChange="handleChange"
    @sizeChange="handleChange"
  >
    <e-tables-columns prop='goodsid' label='货品ID' width="90px" :sortable="true"></e-tables-columns>
    <e-tables-columns prop='opcode' label='操作码' width="100px"></e-tables-columns>
    <e-tables-columns prop='goodsname' label='名称' width="200px"></e-tables-columns>
    <e-tables-columns prop='goodstype' label='货品规格' width="100px"></e-tables-columns>
    <e-tables-columns prop='prodarea' label='产地'></e-tables-columns>
    <e-tables-columns prop='usestatusname' label='状态'></e-tables-columns>
    <e-tables-columns prop='gbcode' label='批准文号' width="100px"></e-tables-columns>
    <e-tables-columns prop='factid' label='生产企业ID' width="110px" :sortable="true"></e-tables-columns>
    <e-tables-columns prop='fact_companyname' label='生产企业名称' width="150px"></e-tables-columns>
    <e-tables-columns prop='goodsno' label='编码' width="70px"></e-tables-columns>
    <e-tables-columns prop='goodstag' label='货品标记' width="70px"></e-tables-columns>
    <e-tables-columns prop='goodsshortname' label='简称' width="70px"></e-tables-columns>
    <e-tables-columns prop='goodsformalname' label='商品名' width="90px"></e-tables-columns>
    <e-tables-columns prop='goodsformalpinyin' label='通用名拼音' width="90px"></e-tables-columns>
    <e-tables-columns prop='goodsunit' label='货品基本单位'></e-tables-columns>
    <e-tables-columns prop='defaultpack' label='缺省包装'></e-tables-columns>
    <e-tables-columns-date-time prop='credate' label='建立日期' width="150px"></e-tables-columns-date-time>
    <e-tables-columns prop='inputmanid' label='创建人'></e-tables-columns>
    <e-tables-columns prop='inputmanname' label='创建人名称'></e-tables-columns>
    <e-tables-columns prop='usestatus' label='状态ID' width="90px" :sortable="true"></e-tables-columns>
    <e-tables-columns prop='standardcode' label='质量标准码'></e-tables-columns>
    <e-tables-columns prop='ssxkcyr' label='上市许可持有人'></e-tables-columns>
    <e-tables-columns prop='commissionid' label='委托加工企业ID'></e-tables-columns>
    <e-tables-columns prop='com_companyname' label='委托加工企业名称'></e-tables-columns>
    <e-tables-columns prop='salestaxrate' label='销售税率'></e-tables-columns>
    <e-tables-columns prop='sutaxrate' label='进货税率'></e-tables-columns>
    <e-tables-columns prop='jybf' label='简易办法'></e-tables-columns>
    <e-tables-columns prop='drugtype' label='剂型'></e-tables-columns>
    <e-tables-columns prop='memo' label='备注'></e-tables-columns>
    <e-tables-columns prop='ifimport' label='库存保障品种'></e-tables-columns>
    <e-tables-columns prop='ifback' label='是否可退货'></e-tables-columns>
    <e-tables-columns prop='iforder' label='订单商品'></e-tables-columns>
    <e-tables-columns prop='ifctrlzb' label='是否控制中包'></e-tables-columns>
    <e-tables-columns prop='qua_goodsid' label='货品标识号'></e-tables-columns>
    <e-tables-columns prop='qualityscopeid' label='所属经营范围'></e-tables-columns>
    <e-tables-columns prop='scopename' label='所属经营范围名称'></e-tables-columns>
    <e-tables-columns prop='validperiod' label='效期'></e-tables-columns>
    <e-tables-columns prop='periodunit' label='期间单位'></e-tables-columns>
    <e-tables-columns prop='storagecondition' label='仓储条件ID'></e-tables-columns>
    <e-tables-columns prop='storageconditionname' label='仓储条件'></e-tables-columns>
    <e-tables-columns prop='transcondition' label='运输条件ID'></e-tables-columns>
    <e-tables-columns prop='transconditionname' label='运输条件'></e-tables-columns>
    <e-tables-columns prop='functionlist' label='功能主治'></e-tables-columns>
    <e-tables-columns prop='usage' label='用法用量'></e-tables-columns>
    <e-tables-columns prop='packstandard' label='包装是否合格'></e-tables-columns>
    <e-tables-columns prop='forcetypeno' label='国家强制产品认证'></e-tables-columns>
    <e-tables-columns prop='productapprovno' label='产品说明书批件'></e-tables-columns>
    <e-tables-columns prop='apparatusno' label='计量器具许可证号'></e-tables-columns>
    <e-tables-columns prop='apparatusperiod' label='计量器具许可证效期'></e-tables-columns>
    <e-tables-columns prop='otherperiod' label='其他关键质量信息中效期'></e-tables-columns>
    <e-tables-columns prop='drugadminclass' label='药监分类ID'></e-tables-columns>
    <e-tables-columns prop='drugadminclassname' label='药监分类'></e-tables-columns>
    <e-tables-columns prop='medicatype' label='中/西药'></e-tables-columns>
    <e-tables-columns prop='brand' label='品牌'></e-tables-columns>
    <e-tables-columns prop='brandgrade' label='品牌等级'></e-tables-columns>
    <e-tables-columns prop='brandgradename' label='品牌等级'></e-tables-columns>
    <e-tables-columns-date-time prop='markettime' label='上市时间' width="150"></e-tables-columns-date-time>
    <e-tables-columns prop='adflag' label='广告品种'></e-tables-columns>
    <e-tables-columns prop='clinicalflag' label='临床品种'></e-tables-columns>
    <e-tables-columns prop='drugsflag' label='药品非药品'></e-tables-columns>
    <e-tables-columns prop='approveno' label='生产批文号'></e-tables-columns>
    <e-tables-columns prop='approveperiod' label='生产批文效期'></e-tables-columns>
    <e-tables-columns prop='qualitystandardno' label='质量标准编号'></e-tables-columns>
    <e-tables-columns prop='qualitystandardperiod' label='质量标准效期'></e-tables-columns>
    <e-tables-columns prop='inspectionno' label='检验报告单编号'></e-tables-columns>
    <e-tables-columns prop='inspectionperiod' label='检验报告单效期'></e-tables-columns>
    <e-tables-columns prop='sampleflag' label='样品'></e-tables-columns>
    <e-tables-columns prop='trademark' label='注册商标'></e-tables-columns>
    <e-tables-columns prop='trademarkno' label='商标注册证号'></e-tables-columns>
    <e-tables-columns prop='trademarkperiod' label='商标注册证效期'></e-tables-columns>
    <e-tables-columns prop='barcodeno' label='商品条码证'></e-tables-columns>
    <e-tables-columns prop='barcodeperiod' label='商品条码效期'></e-tables-columns>
    <e-tables-columns prop='bailername' label='委托书姓名'></e-tables-columns>
    <e-tables-columns prop='baileridcard' label='委托书身份证'></e-tables-columns>
    <e-tables-columns prop='bailerperiod' label='委托书效期'></e-tables-columns>
    <e-tables-columns prop='commissproduceno' label='药品委托生产批件编号'></e-tables-columns>
    <e-tables-columns prop='commissproduceperiod' label='药品委托生产批件效期'></e-tables-columns>
    <e-tables-columns prop='specialgoodsno' label='特殊商品卫生许可证号'></e-tables-columns>
    <e-tables-columns prop='specialgoodsperiod' label='特殊商品卫生证效期'></e-tables-columns>
    <e-tables-columns prop='informationclass' label='资料类别'></e-tables-columns>
    <e-tables-columns prop='informationclassname' label='资料类别'></e-tables-columns>
    <e-tables-columns prop='compound' label='单方复方药'></e-tables-columns>
    <e-tables-columns prop='ccode' label='药品本位码'></e-tables-columns>
    <e-tables-columns prop='goodsid_cgjl' label='货品ID'></e-tables-columns>
    <e-tables-columns prop='managerid' label='采购经理ID'></e-tables-columns>
    <e-tables-columns prop='managername' label='采购经理'></e-tables-columns>
    <e-tables-columns prop='class1' label='采购分组分类1'></e-tables-columns>
    <e-tables-columns prop='class1name' label='采购分组分类1'></e-tables-columns>
    <e-tables-columns prop='class2' label='采购分组分类2'></e-tables-columns>
    <e-tables-columns prop='companyid' label='合作伙伴ID'></e-tables-columns>
    <e-tables-columns prop='companyname' label='合作伙伴'></e-tables-columns>
    <e-tables-columns prop='classa' label='A类分类'></e-tables-columns>
    <e-tables-columns prop='classaname' label='A类分类'></e-tables-columns>
    <e-tables-columns prop='property' label='品牌名称属性'></e-tables-columns>
    <e-tables-columns prop='companytype' label='合作伙伴类型'></e-tables-columns>
    <e-tables-columns prop='companytypename' label='合作伙伴类型'></e-tables-columns>
    <e-tables-columns prop='cwspflbm' label='财务商品分类编码'></e-tables-columns>
    <e-tables-columns prop='sflcpz' label='是否冷藏品种'></e-tables-columns>
    <e-tables-columns prop='sfybml' label='是否医保目录'></e-tables-columns>
    <el-table-column prop="caozuo" fixed="right" width="100" label="操作">
      <template slot-scope="scope">
        <kt-button type="primary" icon="fa fa-edit" :label="$t('action.edit')" perms="quality:hpjbxx:update" @click="handleQuery(scope.row)"></kt-button>
      </template>
    </el-table-column>
  </e-tables>
  <hpjcsjwh-dtl
    v-if="hpjcsjwhVisible"
    :dtlStatus="dtlStatus"
    :dtlData="dtlData"
    :drugtypeOptions="drugtypeOptions"
    :usestatusOptions="usestatusOptions"
    :storageConditionOptions="storageConditionOptions"
    :transConditionOptions="transConditionOptions"
    :drugadminClassOptions="drugadminClassOptions"
    :brandGradeOptions="brandGradeOptions"
    :informationClassOptions="informationClassOptions"
    :class1Options="class1Options"
    :classAOptions="classAOptions"
    :companyTypeOptions="companyTypeOptions"
    :unitTypeOptions="unitTypeOptions"
    :bzuseStatusOptions="bzuseStatusOptions"
    :cgzcOptions="cgzcOptions"
    :categoryid2Options="categoryid2Options"
    :docTitle="docTitle"
  ></hpjcsjwh-dtl>
  <hov-tools v-if="queryGoodsVisible" :hov-data="queryGoodsHov"></hov-tools>
  <hov-tools v-if="queryFactVisible" :hov-data="queryFactHov" :label-width="factLabelWidth"></hov-tools>
</div>
</template>
<!--货品基础数据维护-->
<script lang="js" src="../../../js/quality/hpjcsjwh.js"></script>
