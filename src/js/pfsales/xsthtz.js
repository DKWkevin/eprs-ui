import {selectDdlOption} from "@/utils/functions";
export default {
  name: "Xsthtz",
  data(){
    return {
      xsthtzQueryForm:{
        reccompanyid:null,
        reccompanyname:null,
        customid:null,
        customname:null,
        backwhyid:null,
        deptid:null,
        memo:null,
        recdeptid:null,
        recdeptname:null,
        salesmode:null,
        paymode:null,
        payterm:null,
        oldsalesid:null,
        total_line:null
      },
      xsthtzTableData:[],
      xsthtzLoading:false,
      xsthtzTableHeight:300,
      xsthtztableSumData:{
        total_line:0,
        buhanshuijine:0,
        shuie:0
      },
      selectionData:[],
      xsthtzStatus:false,
      xsthtzDtlForm:{
        goodsid:null,
        goodsname:null,
        goodstype:null,
        prodarea:null,
        goodsunit:null,
        goodsqty:null,
        realgoodsqty:null,
        maxgoodsqty:null,
        unitprice:null,
        taxrate:null,
        outbatchid:null,
        total:null,
        inbatchid:null,
        oldsadtlid:null,
        lotno:null,
        goodsstatusid:null,
        payment:null,
        stcompanyid:null
      },
      xsthtzBackwhyidOptions:[],
      xsthtzHovVisible:false,
      xsthtzHov:{
        hovTitle:'门店查询',
        hovUrl: "counteridhov/select",
        afterStatus: false,
        fillDataName: "xsthtzDtlForm",
        parentVisible:'xsthtzHovVisible',
        hovColumns:
          [
            {id: "counterid", name: "门店ID",queryStatus:true,dataStatus:2,fillid:"counterid"},
            {id: "countername", name: "门店名称",queryStatus:true,dataStatus:1},
            {id: "companyopcode", name: "门店操作码",queryStatus:true,dataStatus:1}
          ]
      },
      xsthtzHovGoodsVisible:false,
      xsthtzHovGoodsForm:{salesid:null,opcode:null,goodsid:null,goodsname:null,companyid:null,customid:null,oldsalesid:null,deptid:null},
      xsthtzHovGoodsData:[],
      currentPage:1,
      pageSize:50,
      total:0,
      xsthtzHovGoodsLoading:false
    }
  },
  created() {
    this.xsthtzTableHeight = (window.innerHeight - 240);
    this.xsthtzBackwhyidOptions = selectDdlOption('BACK_WHYID');
    this.getCompany();
  },
  methods:{
    //新增加载表单
    addOpen(){
      /*if(this.xsthtzQueryForm.customid === null||this.xsthtzQueryForm.customid === ''){
        alert("客户ID不能为空");
        return false;
      }*/
      this.xsthtzStatus = true;
    },
    //新增提交表单
    savetogridtable(){
      let xsthtzDtlForm = this.xsthtzDtlForm;
      let xsthtzQueryForm = this.xsthtzQueryForm;
      let xsthtztableSumData = this.xsthtztableSumData;
      let reg=/^[0-9]+(.[0-9]{1,3})?$/;
      if(reg.test(xsthtzDtlForm.goodsqty)){
      }else{
        alert("通知退货数量小数点后最多三位");
        return false;
      }
      if(parseFloat(xsthtzDtlForm.goodsqty)>parseFloat(xsthtzDtlForm.maxgoodsqty)){
        alert("通知退货数量不能大于最大退货数量");
        return false;
      }
      if(parseFloat(xsthtzDtlForm.goodsqty)<0){
        alert("通知退货数量不能小于0");
        return false;
      }

      if(xsthtzDtlForm.maxgoodsqty.length === 0){
        alert("最大退货数量不能为空");
        return false;
      }
      if(xsthtzDtlForm.goodsqty.length === 0){
        alert("通知退货数量不能为空");
        return false;
      }
      if(parseFloat(xsthtzDtlForm.goodsqty)<0){
        alert("通知退货数量不能为0");
        return false;
      }
      if (xsthtzQueryForm.paymode.length === 0) {
        xsthtzQueryForm.paymode = xsthtzDtlForm.payment;
      }else {
        if (xsthtzQueryForm.paymode !== xsthtzDtlForm.payment) {
          alert("收款方式不同");
          return false;
        }
      }
      let json = {};
      json.goodsid = xsthtzDtlForm.goodsid;
      json.goodsname = xsthtzDtlForm.goodsname;
      json.goodstype = xsthtzDtlForm.goodstype;
      json.goodsunit = xsthtzDtlForm.goodsunit;
      json.prodarea = xsthtzDtlForm.prodarea;
      json.goodsqty = xsthtzDtlForm.goodsqty;
      json.realgoodsqty = xsthtzDtlForm.realgoodsqty;
      json.maxgoodsqty = xsthtzDtlForm.maxgoodsqty;
      json.unitprice = xsthtzDtlForm.unitprice;
      json.taxrate = xsthtzDtlForm.taxrate;
      json.total = xsthtzDtlForm.total;
      json.outbatchid = xsthtzDtlForm.outbatchid;
      json.inbatchid = xsthtzDtlForm.inbatchid;
      json.oldsadtlid = xsthtzDtlForm.oldsadtlid;
      json.goodsstatusid = xsthtzDtlForm.goodsstatusid;
      json.stcompanyid = xsthtzDtlForm.stcompanyid;
      this.xsthtzTableData.push(json);
      let a = parseFloat(xsthtzQueryForm.total_line);
      let b = parseFloat(xsthtzDtlForm.total);
      let d = parseFloat(xsthtzDtlForm.taxrate);
      let e = b * d;
      let f = b - e;
      let c = a + b;
      let y = parseFloat(xsthtztableSumData.shuie);
      let z = parseFloat(xsthtztableSumData.buhanshuijine);
      let v = e + y;
      let w = f + z;
      xsthtzQueryForm.total_line = c.toFixed(2);
      xsthtztableSumData.total_line = c.toFixed(2);
      xsthtztableSumData.shuie = v.toFixed(2);
      xsthtztableSumData.buhanshuijine = w.toFixed(2);
      this.dialogClose();
    },
    saveAll(){
      if(this.xsthtzTableData.length === 0) {
        alert("查询页面没有需要保存的细单");
        return;
      }
      let xsthtzQueryForm = this.xsthtzQueryForm;
      let params = {};
      params.customid = xsthtzQueryForm.customid;
      params.reccompanyid = xsthtzQueryForm.reccompanyid;
      params.recdeptid = xsthtzQueryForm.recdeptid;
      params.salesmode = xsthtzQueryForm.salesmode;
      params.paymode = xsthtzQueryForm.paymode;
      params.payterm = xsthtzQueryForm.payterm;
      params.inputmanid = Number(sessionStorage['userid']);
      params.confirmmanid = Number(sessionStorage['userid']);
      params.approvemanid = Number(sessionStorage['userid']);
      params.total_line = xsthtzQueryForm.total_line;
      params.dtllines = this.xsthtzTableData.length;
      params.oldsalesid = xsthtzQueryForm.oldsalesid;
      params.backwhyid = xsthtzQueryForm.backwhyid;
      params.memo = xsthtzQueryForm.memo;
      params.stcompanyid = xsthtzQueryForm.stcompanyid;
      let array = [];
      this.xsthtzTableData.forEach(item => {
        let json = {};
        json.goodsid = item.goodsid;
        json.oldsadtlid = item.oldsadtlid;
        json.outbatchid = item.outbatchid;
        json.inbatchid = item.inbatchid;
        json.goodsstatusid = item.goodsstatusid;
        json.maxgoodsqty = item.maxgoodsqty;
        json.unitprice = item.unitprice;
        json.taxrate = item.taxrate;
        json.total = item.total;
        json.goodsqty = item.goodsqty;
        json.realgoodsqty = item.realgoodsqty;
        array.push(json);
      })
      params.children = array;
      if(confirm("是否确认保存") === true) {
        this.$api.pfsales.insertXsthtz(params).then(res => {
          if (res.code === 200) {
            alert("保存成功");
          }else {
            alert(res.msg);
            return false;
          }
        }).catch(() => {
          return false;
        })
      } else {
        return false;
      }
    },
    selectionChange(value){
      this.selectionData = value;
    },
    //删除
    delForm(index){
      this.selectionData.forEach(item => {
        this.xsthtzTableData.forEach((data, index) => {
          if (item.goodsid === data.goodsid) {
            let number = data.total;
            let shuilv = data.taxrate;
            let num3 = parseFloat(shuilv);//税率
            let num1 = parseFloat(number);//金额
            let shuie = num1 * num3;
            let buhanshuie = num1 - shuie;
            let shuie2 = this.xsthtztableSumData.shuie;
            let buhanshuie2 = this.xsthtztableSumData.buhanshuijine;
            let shuie3 = shuie2 - shuie;
            let buhanshuie3 = buhanshuie2 - buhanshuie;
            let number2 = this.xsthtzQueryForm.total_line;
            let num2 = parseFloat(number2);
            let Subtraction = num2 - num1;
            this.xsthtzQueryForm.total_line = Subtraction.toFixed(2);
            this.xsthtztableSumData.total_line = Subtraction.toFixed(2);
            this.xsthtztableSumData.card_shuie = shuie3.toFixed(2);
            this.xsthtztableSumData.card_buhanshuijine = buhanshuie3.toFixed(2);
            this.xsthtzTableData.splice(index, 1);
          }
        })
      })
      this.$refs.doctable.clearSelection();
      if (this.xsthtzTableData.length === 0) {
        this.xsthtzQueryForm.recdeptid = null;
        this.xsthtzQueryForm.recdeptname = null;
        this.xsthtzQueryForm.salesmode = null;
        this.xsthtzQueryForm.oldsalesid = null;
        this.xsthtzQueryForm.paymode = null;
        this.xsthtzQueryForm.payterm = null;
      }
      this.selectionData = [];
    },
    openQueryHov(data){
      let hovTitle = '';
      let hovUrl = '';
      let hovColumns = [];
      if(data === 'reccompanyid'){
        hovTitle = '公司查询';
        hovUrl = 'companyidhov/selectcompanyid';
        hovColumns = [
          {id: "companyid", name: "公司ID",queryStatus:true,dataStatus:2,fillid:"reccompanyid"},
          {id: "companyname", name: "公司名称",queryStatus:true,dataStatus:1,fillid:"reccompanyname"},
          {id: "companyopcode", name: "公司操作码",queryStatus:true,dataStatus:1}
        ];
      }else if(data === 'customid'){
        hovTitle = '客户查询';
        hovUrl = 'customidhov/select';
        hovColumns = [
          {id: "customid", name: "客户ID",queryStatus:true,dataStatus:2,fillid:"customid"},
          {id: "customname", name: "客户名称",queryStatus:true,dataStatus:1,fillid:"customname"},
          {id: "customopcode", name: "客户操作码",queryStatus:true,dataStatus:1}
        ];
      }
      this.xsthtzHov.hovTitle = hovTitle;
      this.xsthtzHov.hovUrl = hovUrl;
      this.xsthtzHov.fillDataName = "xsthtzQueryForm";
      this.xsthtzHov.hovColumns = hovColumns;
      this.xsthtzHovVisible = true;
    },
    openHov(){
      this.xsthtzHovGoodsVisible = true;
    },
    handleCurrentChange(value){
      this.selectGoodsFunction(value, this.pageSize);
    },
    handleSizeChange(value){
      this.selectGoodsFunction(this.currentPage, value);
    },
    handleFunction(){
      this.xsthtzHovGoodsForm.companyid = this.xsthtzQueryForm.reccompanyid;
      this.xsthtzHovGoodsForm.customid = this.xsthtzQueryForm.customid;
      this.xsthtzHovGoodsForm.oldsalesid = this.xsthtzQueryForm.oldsalesid;
      this.xsthtzHovGoodsForm.deptid = this.xsthtzQueryForm.deptid;
      this.selectGoodsFunction(1, this.pageSize);
    },
    selectGoodsFunction(pageNum,pageSize){
      let formData = {};
      Object.keys(this.xsthtzHovGoodsForm).forEach(item => {
        if(this.xsthtzHovGoodsForm[item]!==null&&this.xsthtzHovGoodsForm[item]!==""){
          formData[item] = this.xsthtzHovGoodsForm[item];
        }
      })
      this.xsthtzHovGoodsLoading = true;
      this.$api.hov.query('goodsidhov/select',{pageNum:pageNum,pageSize:pageSize,params:formData}).then(res => {
        if(res.code===200){
          this.xsthtzHovGoodsData=res.data.content;
          this.total = res.data.totalSize;
          this.currentPage=res.data.pageNum;
          this.pagesize=res.data.pageSize;
          this.xsthtzHovGoodsLoading = false;
        }else{
          console.log(res.msg);
          this.xsthtzHovGoodsLoading = false;
          return false;
        }
      });
    },
    cellDBLClickEvent(row){
      this.xsthtzDtlForm.goodsid = row.goodsid;
      this.xsthtzDtlForm.goodsname = row.goodsname;
      this.xsthtzDtlForm.goodsunit = row.goodsunit;
      this.xsthtzDtlForm.goodstype = row.goodstype;
      this.xsthtzDtlForm.prodarea = row.prodarea;
      this.xsthtzDtlForm.maxgoodsqty = row.maxgoodsqty;
      this.xsthtzDtlForm.unitprice = row.unitprice;
      this.xsthtzDtlForm.total = row.total;
      this.xsthtzDtlForm.taxrate = row.taxrate;
      this.xsthtzDtlForm.inbatchid = row.inbatchid;
      this.xsthtzDtlForm.outbatchid = row.outbatchid;
      this.xsthtzQueryForm.payterm = row.payterm;
      this.xsthtzQueryForm.salesmode = row.salesmode;
      this.xsthtzDtlForm.payment = row.paymode;
      this.xsthtzQueryForm.recdeptid = row.salesdeptid;
      this.xsthtzQueryForm.recdeptname = row.salesdept;
      this.xsthtzDtlForm.oldsadtlid = row.sadtlid;
      this.xsthtzDtlForm.goodsstatusid = row.goodsstatusid;
      this.xsthtzQueryForm.oldsalesid = row.salesid;
      this.xsthtzDtlForm.goodsqty = row.maxgoodsqty;
      this.xsthtzDtlForm.realgoodsqty = row.maxgoodsqty;
      this.xsthtzDtlForm.lotno = row.lotno;
      this.xsthtzDtlForm.stcompanyid = row.stcompanyid;
      this.xsthtzQueryForm.deptid = row.stcompanyid;
    },
    dialogClose(){
      this.formIsNull(this.xsthtzDtlForm);
      this.xsthtzStatus = false;
    },
    goodsDialogClose(){
      this.xsthtzHovGoodsVisible = false;
    },
    getCompany(){
      this.$api.hov.selectCompanyid({pageNum:1,pageSize:10,params:{companyid:Number(sessionStorage['companyid'])}}).then(res => {
        if(res.code === 200) {
          this.xsthtzQueryForm.reccompanyid = res.data.content[0].companyid.toString();
          this.xsthtzQueryForm.reccompanyname = res.data.content[0].companyname;
        }else {
          alert(res.msg);
          return false;
        }
      }).catch(() => {
        return false;
      })
    },
    selectQty(value){
      this.xsthtzDtlForm.goodsqty = value.replace(/[^\- \d.]/g,'');
      this.xsthtzDtlForm.realgoodsqty = value.replace(/[^\- \d.]/g,'');
      let qty = parseFloat(this.xsthtzDtlForm.goodsqty);
      let price = parseFloat(this.xsthtzDtlForm.realgoodsqty);
      if(this.xsthtzDtlForm.total !==null &&this.xsthtzDtlForm.total !== ""){
        this.xsthtzDtlForm.total = qty*price;
      }
    }
  }
}
