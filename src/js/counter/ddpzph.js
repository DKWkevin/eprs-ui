export default {
  name: "Ddpzph",
  data () {
    return {
      ddpzphQueryFrom: {
        mdid:null,
        goodsid:null,
        fpzt:null
      },
      btnDisabled:false,
      mdidDisabled:false,
      ddpzphFpztOptions: [{value:0,label:'未分配'},{value:1,label:'已分配'}],
      emplevels:null,
      emplevelsStatus:false,
      deptid:null,
      mdid:null,
      ddpzphTableData:[],
      ddpzphLoading: false,
      ddpzphPageNum:1,
      ddpzphPageSize:50,
      ddpzphTotal:0,
      ddpzphTableHeight:300,
      ddpzphInsertVisible:false,
      ddpzphDialogWidth:0,
      ddpzphDialogHeight:0,
      ddpzphQueryDocFrom:{
        goodsid: null,
        goodsopcode: null,
        prodarea: null
      },
      ddpzphTableDocData:[],
      ddpzphTableDtlData:[],
      mdremqty:null,
      mdrealprice:null,
      wlkcqty:null,
      psfsStatus:false,
      psfs:null,
      address:null,
      phone:null,
      ddpzphPsdzVisible:false,
      ddpzphPsdzForm:{
        mdid:null,
        address:null,
        phone:null
      },
      insertDoc:{
        mdid: null,
        goodsid: null,
        unitprice: null,
        goodsqty:null,
        dismode:null,
      },
      addressStatus:false,
      reqdtlid:false,
      ddpzphHovVisible:false,
      ddpzphHovData:{
        hovTitle:'',
        hovUrl: "",
        afterStatus: false,
        fillDataName: "",
        parentVisible:'ddpzphHovVisible',
        hovColumns: []
      }
    }
  },
  created() {
    this.ddpzphTableHeight = (window.innerHeight - 240);
    this.ddpzphDialogHeight = (window.innerHeight - 120);
    this.ddpzphDialogWidth = (window.innerWidth - 240);
    this.selectDept();
  },
  methods:{
    selectDept () {
      this.$api.counter.selectDdpzphEmpDept({employeeid: Number(sessionStorage['userid'])}).then(res => {
        if (res.code === 200) {
          this.emplevels = res.data.levels;
          this.deptid = res.data.deptid;
          if(res.data.levels === 1){
            this.ddpzphQueryFrom.mdid = res.data.deptid;
            this.btnDisabled = true;
            this.mdidDisabled = true;
          }
        }
      }).catch(() => {
        return false;
      })
    },
    selectFunction(){
      this.selectDoc(1, this.ddpzphPageSize);
    },
    handleChange(data){
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize){
      let params = {};
      Object.keys(this.ddpzphQueryFrom).forEach(item => {
        if (this.ddpzphQueryFrom[item] !== null && this.ddpzphQueryFrom[item] !== "") {
          params[item] = this.ddpzphQueryFrom[item];
        }
      })
      this.ddpzphTableData = [];
      this.ddpzphLoading = true;
      this.$api.counter.selectDdpzph({pageNum:pageNum,pageSize:pageSize,params:params}).then(res => {
        if (res.code === 200) {
          this.ddpzphTableData = res.data.content;
          this.ddpzphPageNum = res.data.pageNum;
          this.ddpzphPageSize = res.data.pageSize;
          this.ddpzphTotal = res.data.totalSize;
          this.ddpzphLoading = false;
        }
      }).catch(() => {
        this.ddpzphLoading = false;
        return false;
      })
    },
    ddpzphInvoid(row) {
      if(this.emplevels===1||this.emplevels===2){
        if(row.usestatus===1||row.usestatus===2){
          if((row.orderdtlid===null||row.orderdtlid===""||row.orderdtlid===0)&&(row.salesid===null||row.salesid===""||row.salesid===0)){
          }else {
            alert("订单及销售单不为空或者0,不可作废");
            return false
          }
        }else {
          alert("单据状态不为临时或者已确认,不可作废");
          return false
        }
      }else {
        if(row.salesid!==null&&row.salesid!==""&&row.salesid!==0){
          alert("已生成销售单,不可作废");
          return false
        }
      }
      if(confirm("是否确认作废") === true){
        this.$api.counter.invoidDdpzph({reqdtlid:row.reqdtlid,usestatus:0,invalidmanid:Number(sessionStorage['userid']),invalidday:new Date()}).then(res => {
          if (res.code === 200) {
            alert("作废成功");
            this.selectDoc(this.ddpzphPageNum, this.ddpzphPageSize);
          }else {
            alert(res.msg);
            return false;
          }
        }).catch(() => {
          return false;
        })
      }else{
        return false;
      }
    },
    ddpzphConfirm(row) {
      if(this.emplevels === 1||this.emplevels === 2){
        if(row.usestatus !==1){
          alert("单据状态不是临时,不能确认");
          return false;
        }
      }else{
        alert("不是门店人员或者地区人员,不能确认");
        return false;
      }
      let str = "是否确认";
      if(row.dismode === 2) {
        str = "您当前选择的配送模式为快运，会立即生成物流配送单据，是否确认生成？";
      }
      if(confirm(str) === true){
        this.$api.counter.confirmDdpzph({reqdtlid:row.reqdtlid,usestatus:2,mdid:row.mdid,dismode:row.dismode,confirmid:Number(sessionStorage['userid'])}).then(res => {
          if (res.code === 200) {
            alert("确认成功");
            this.selectDoc(this.ddpzphPageNum, this.ddpzphPageSize);
          }else {
            alert(res.msg);
            return false;
          }
        }).catch(() => {
          return false;
        })
      }else{
        return false;
      }
    },
    ddpzphCreate(row) {
      this.reqdtlid=row.reqdtlid;
      if(this.emplevels === 1||this.emplevels === 2){
        if(row.usestatus === 2&&row.fpzt === 1&&(row.salesid === null||row.salesid === ""||row.salesid === 0)){}else{
          alert('不能提前生成销售')
          return false;
        }
      }else{
        alert('不能提前生成销售')
        return false;
      }
      this.mdid = row.mdid;
      this.$api.counter.selectDdpzphAddress({mdid: row.mdid}).then(res => {
          if(res.code === 200) {
            this.ddpzphPsdzForm.mdid = row.mdid;
            this.ddpzphPsdzForm.address = res.data.address;
            this.ddpzphPsdzForm.phone = res.data.phone;
            let str = "当前地址为："+res.data.address+",当前电话为："+res.data.phone+",是否修改地址";
            if (confirm(str) === true) {
              this.addressStatus = false;
              this.ddpzphPsdzVisible = true;
            } else {
              this.createDdpzphs();
            }
          }
      }).catch(() => {
        return false;
      })
    },
    createDdpzphs(){
      if(confirm("您当前选择的配送模式为快运，会立即生成物流配送单据，是否确认生成？") === true){
        this.$api.counter.createDdpzph({reqdtlid:this.reqdtlid,mdid:this.mdid,confirmid:Number(sessionStorage['userid'])}).then(res => {
          if (res.code === 200) {
            alert("确认成功");
            this.selectDoc(this.ddpzphPageNum, this.ddpzphPageSize);
          }else {
            alert(res.msg);
            return false;
          }
        }).catch(() => {
          return false;
        })
      }else{
        return false;
      }
    },
    insertOpen(){
      if (this.emplevels === 1) {
        this.ddpzphQueryDocFrom.mdid = this.deptid;
      }
      this.addressStatus = true;
      this.insertDoc.goodsqty = 0;
      this.ddpzphInsertVisible = true;
    },
    selectInsertDoc(){
      let params = {};
      if(this.ddpzphQueryDocFrom.mdid !== null && this.ddpzphQueryDocFrom.mdid !==""){
        params.mdid = this.ddpzphQueryDocFrom.mdid;
      }else {
        alert("门店不能为空");
        return false;
      }
      if((this.ddpzphQueryDocFrom.goodsid===""||this.ddpzphQueryDocFrom.goodsid===null)
        && (this.ddpzphQueryDocFrom.goodsopcode===""||this.ddpzphQueryDocFrom.goodsopcode===null)
        && (this.ddpzphQueryDocFrom.prodarea===""||this.ddpzphQueryDocFrom.prodarea===null)) {
        alert("货品名称,货品操作码,产地不能同时为空");
        return false;
      }
      if(this.ddpzphQueryDocFrom.goodsid !== null && this.ddpzphQueryDocFrom.goodsid !==""){
        params.goodsid = this.ddpzphQueryDocFrom.goodsid;
      }
      if(this.ddpzphQueryDocFrom.goodsopcode !== null && this.ddpzphQueryDocFrom.goodsopcode !==""){
        params.goodsopcode = this.ddpzphQueryDocFrom.goodsopcode;
      }
      if(this.ddpzphQueryDocFrom.prodarea !== null && this.ddpzphQueryDocFrom.prodarea !==""){
        params.prodarea = this.ddpzphQueryDocFrom.prodarea;
      }
      this.ddpzphTableDocData = [];
      this.$api.counter.selectDdpzphGoodsBase(params).then(res => {
        if (res.code === 200) {
          this.ddpzphTableDocData = res.data;
          this.psfsStatus = false;
          this.cellDocClick(res.data[0]);
        }
      }).catch(() => {
        return false;
      })
    },
    cellDocClick(row){
      this.formIsNull(this.insertDoc);
      if(this.emplevels === 1) {
        this.insertDoc.mdid = this.deptid;
      }else {
        this.insertDoc.mdid = this.ddpzphQueryDocFrom.mdid;
      }
      this.insertDoc.goodsid = row.goodsid;
      this.insertDoc.unitprice = row.price;
      this.insertDoc.goodsqty = null;
      this.wlkcqty = row.remqty;
      this.psfsStatus = false;
      if(this.emplevels === 1) {
        this.selectMdkc(this.deptid, row.goodsid);
      }else {
        this.selectMdkc(this.ddpzphQueryDocFrom.mdid, row.goodsid);
      }
      this.selectInsertDtl(row.goodsid);
    },
    selectMdkc(mdid,goodsid){
      this.$api.counter.selectDdpzphMdkc({goodsid:goodsid,mdid:mdid}).then(res => {
        if (res.code === 200) {
          this.mdremqty = res.data.mdremqty;
          this.mdrealprice = res.data.mdrealprice;
        }
      }).catch(() => {
        return false;
      })
    },
    selectInsertDtl(goodsid){
      this.ddpzphTableDtlData = [];
      this.$api.counter.selectDdpzphGoodsRemqty({goodsid:goodsid}).then(res => {
        if (res.code === 200) {
          this.ddpzphTableDtlData = res.data;
        }
      }).catch(() => {
        return false;
      })
    },
    selectAddress(){
      if(this.psfs === 2){
        this.$api.counter.selectDdpzphAddress({mdid: this.ddpzphQueryDocFrom.mdid}).then(res => {
          this.address = res.data.address;
          this.phone = res.data.phone;
        }).catch(() => {
          return false;
        })
      }
    },
    openPsdz(){
      this.ddpzphPsdzForm.mdid =  this.ddpzphQueryDocFrom.mdid;
      this.ddpzphPsdzForm.address =  this.address;
      this.ddpzphPsdzForm.phone = this.phone;
      this.ddpzphPsdzVisible = true;
    },
    insertPsdz(){
      if (confirm("是否确认保存") === true) {
        this.$api.counter.insertDdpzphAddress(this.ddpzphPsdzForm).then(res => {
          if (res.code === 200) {
            alert("保存成功");
            if(this.addressStatus === true){
              this.address = this.ddpzphPsdzForm.address;
              this.phone = this.ddpzphPsdzForm.phone;
              this.closePsdz();
            }else {
              this.closePsdz();
              this.createDdpzphs();
            }
          }else {
            alert(res.msg);
            return false;
          }
        }).catch(() => {
          return false;
        })
      }else {
        return false;
      }
    },
    ddpzphInsert(){
      if(this.insertDoc.mdid===null||this.insertDoc.mdid === "") {
        alert("门店不能为空");
        return false;
      }
      if(this.insertDoc.goodsid===null||this.insertDoc.goodsid === "") {
        alert("货品ID不能为空");
        return false;
      }
      if(this.insertDoc.goodsqty===null || this.insertDoc.goodsqty === "" || Number(this.insertDoc.goodsqty) === 0) {
        alert("数量不能为空或者0");
        return false;
      }
      if (confirm("是否确认保存") === true) {
        this.insertDoc.dismode = this.psfs;
        this.insertDoc.inputmanid = Number(sessionStorage['userid']);
        this.$api.counter.insertDdpzph(this.insertDoc).then(res => {
          if (res.code === 200) {
            alert("保存成功");
            this.closeInsert();
            this.ddpzphQueryFrom.mdid = this.insertDoc.mdid;
            this.ddpzphQueryFrom.goodsid = this.insertDoc.goodsid;
            this.selectDoc(1, this.ddpzphPageSize);
          }else {
            alert(res.msg);
            return false;
          }
        }).catch(() => {
          return false;
        })
      }else {
        return false;
      }
    },
    queryHov (data) {
      let hovTitle = null;
      let hovUrl = null;
      let hovColumns = [];
      if (data === "mdid") {
        hovTitle = "门店查询";
        hovUrl = "counteridhov/selectcounterid";
        hovColumns = [
          {id: "counterid", name: "门店ID",queryStatus:true,dataStatus:2,fillid:"mdid"},
          {id: "countername", name: "门店名称",queryStatus:true,dataStatus:1},
        ];
        if (this.emplevels === 2) {
          hovColumns.push({id: "companyid", name: "",queryStatus:true,dataStatus:1,display:1,value:this.deptid});
        }
      }else if(data === "goodsid"){
        hovTitle = "货品查询";
        hovUrl = "goodsidhov/select";
        hovColumns = [
          {id: "goodsid", name: "货品ID",queryStatus:true,dataStatus:2,fillid:"goodsid"},
          {id: "goodsname", name: "货品名称",queryStatus:true,dataStatus:1},
          {id: "opcode", name: "货品操作码",queryStatus:true,dataStatus:1},
          {id: "goodstype", name: "规格",queryStatus:false,dataStatus:1},
          {id: "goodsunit", name: "单位",queryStatus:false,dataStatus:1},
          {id: "prodarea", name: "产地",queryStatus:false,dataStatus:1}
        ];
      }
      this.ddpzphHovData.hovTitle = hovTitle;
      this.ddpzphHovData.hovUrl = hovUrl;
      this.ddpzphHovData.fillDataName = "ddpzphQueryFrom";
      this.ddpzphHovData.hovColumns = hovColumns;
      this.ddpzphHovVisible = true;
    },
    queryDocHov(data){
      let hovTitle = null;
      let hovUrl = null;
      let hovColumns = [];
      if (data === "mdid") {
        hovTitle = "门店查询";
        hovUrl = "counteridhov/selectcounterid";
        hovColumns = [
          {id: "counterid", name: "门店ID",queryStatus:true,dataStatus:2,fillid:"mdid"},
          {id: "countername", name: "门店名称",queryStatus:true,dataStatus:1},
          {id: "companyid", name: "",queryStatus:true,dataStatus:1,display:1,value:this.deptid}
        ];
      }else if(data === "goodsid"){
        hovTitle = "货品查询";
        hovUrl = "goodsidhov/select";
        hovColumns = [
          {id: "goodsid", name: "货品ID",queryStatus:true,dataStatus:2,fillid:"goodsid"},
          {id: "goodsname", name: "货品名称",queryStatus:true,dataStatus:1},
          {id: "opcode", name: "货品操作码",queryStatus:true,dataStatus:1},
          {id: "goodstype", name: "规格",queryStatus:false,dataStatus:1},
          {id: "goodsunit", name: "单位",queryStatus:false,dataStatus:1},
          {id: "prodarea", name: "产地",queryStatus:false,dataStatus:1}
        ];
      }
      this.ddpzphHovData.hovTitle = hovTitle;
      this.ddpzphHovData.hovUrl = hovUrl;
      this.ddpzphHovData.fillDataName = "ddpzphQueryDocFrom";
      this.ddpzphHovData.hovColumns = hovColumns;
      this.ddpzphHovVisible = true;
    },
    closeInsert(){
      this.formIsNull(this.ddpzphQueryDocFrom);
      this.ddpzphTableDocData = [];
      this.ddpzphTableDtlData = [];
      this.psfsStatus = false;
      this.ddpzphInsertVisible = false;
    },
    closePsdz(){
      this.formIsNull(this.ddpzphPsdzForm);
      this.ddpzphPsdzVisible = false;
    },
    headerStyle({row,rowIndex}){
      return "background:linear-gradient(#CDDEF9, #ECF3F9  60%)";
    },
    goodsqtyFormat(){
      if (this.wlkcqty!==null&&this.wlkcqty!=="") {
        if(this.insertDoc.goodsqty!==null&&this.insertDoc.goodsqty!=="") {
          if (Number(this.wlkcqty) > Number(this.insertDoc.goodsqty)) {
            this.psfsStatus = true;
            this.psfs = 1;
          } else {
            this.psfs = null;
            this.psfsStatus = false;
          }
        } else {
          this.psfs = null;
          this.psfsStatus = false;
        }
      } else {
        this.psfs = null;
        this.psfsStatus = false;
      }
    }
  }
}
