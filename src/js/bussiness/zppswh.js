import KtButton from "../../views/Core/KtButton";

export default {
  name: "Zppswh",
  components: {KtButton},
  data() {
    return {
      zppswhQueryFrom: {
        oragoodsid: null,
        givegoodsid: null
      },
      zppswhTableData: [],
      zppswhTableHeight: 300,
      zppswhPageNum: 1,
      zppswhPageSize: 50,
      zppswhTotal: 0,
      zppswhLoading: false,
      zppswhDialogStatus: false,
      zppswhDtlForm: {
        oragoodsid: null,
        oragoodsname: null,
        oragoodstype: null,
        oragoodsunit: null,
        oraprodarea: null,
        oragoodsqty: null,
        givegoodsid: null,
        givegoodsname: null,
        givegoodstype: null,
        givegoodsunit: null,
        giveprodarea: null,
        givegoodsqty: null,
        inputmanid: null,
        inputmanname: null,
        memo: null,
      },
      zppswhTableStatus: false,
      zppswhQueryTableForm: {
        counterid: null,
        givegoodsid: null
      },
      zppswhDtlTableData: [],
      zppswhDtlLoading: false,
      zppswhVisible: false,
      zppswhHov: {
        hovTitle: '',
        hovUrl: "",
        afterStatus: false,
        fillDataName: "",
        parentVisible: 'zppswhVisible',
        hovColumns: []
      }
    }
  },
  created() {
    this.zppswhTableHeight = (window.innerHeight - 240);
  },
  methods: {
    /*总单查询*/
    queryFunction() {
      this.selectDoc(1, this.zppswhPageSize);
    },
    handlePageChange(data){
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      if (this.zppswhQueryFrom.oragoodsid !== null && this.zppswhQueryFrom.oragoodsid !== "") {
        params.oragoodsid = this.zppswhQueryFrom.oragoodsid;
      }
      if (this.zppswhQueryFrom.givegoodsid !== null && this.zppswhQueryFrom.givegoodsid !== "") {
        params.givegoodsid = this.zppswhQueryFrom.givegoodsid;
      }
      if (Object.keys(params).length === 0) {
        alert("请填写查询条件");
        return false;
      }
      this.zppswhTableData = [];
      this.zppswhLoading = true;
      this.$api.bussiness.selectZppswh({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        if (res.code === 200) {
          this.zppswhTableData = res.data.content;
          this.zppswhPageNum = res.data.pageNum;
          this.zppswhPageSize = res.data.pageSize;
          this.zppswhTotal = res.data.totalSize;
          this.zppswhLoading = false;
        }
      }).catch(() => {
        this.zppswhLoading = false;
        return false;
      })
    },
    /*修改状态（作废）*/
    changeStatus(row, index){
      if (confirm("是否作废") === true) {
        let json = {};
        json.giveid = row.giveid;
        json.inputmanid = Number(sessionStorage['userid']);
        this.$api.bussiness.updateZppswh({data:json}).then(res => {
          if (res.code === 200) {
            alert("作废成功");
            this.zppswhTableData[index].usestatus = 0;
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
    /*打开查询配送日志*/
    openDtlTable(){
      this.zppswhTableStatus = true;
    },
    selectDtl(){
      let params = {};
      if (this.zppswhQueryTableForm.counterid !== null && this.zppswhQueryTableForm.counterid !== "") {
        params.counterid = this.zppswhQueryTableForm.counterid;
      }
      if (this.zppswhQueryTableForm.givegoodsid !== null && this.zppswhQueryTableForm.givegoodsid !== "") {
        params.givegoodsid = this.zppswhQueryTableForm.givegoodsid;
      }
      if (Object.keys(params).length === 0) {
        alert("请填写查询条件");
        return false
      }
      this.zppswhDtlTableData = [];
      this.zppswhDtlLoading = true;
      this.$api.bussiness.selectZppswhDtl(params).then(res => {
        if (res.code === 200) {
          this.zppswhDtlTableData = res.data;
          this.zppswhDtlLoading = false;
        }
      }).catch(() => {
        this.zppswhDtlLoading = false;
        return false;
      })
    },
    /*新增赠品信息*/
    openinsert() {
      this.formIsNull(this.zppswhDtlForm);
      this.zppswhDtlForm.inputmanid = Number(sessionStorage['userid']);
      this.zppswhDtlForm.inputmanname = sessionStorage['username'];
      this.zppswhDialogStatus = true;
    },
    insertFrom(){
      this.$api.bussiness.insertZppswh(this.zppswhDtlForm).then(res => {
        if (res.code === 200) {
          alert("保存成功");
          this.dialogClose();
        }else {
          alert(res.msg);
          return false;
        }
      }).catch(() => {
        return false;
      })
    },
    /*hov查询*/
    openQuery(data) {
      let hovTitle = '';
      let hovUrl = "";
      let fillDataName = '';
      let hovColumns = [];
      let titlename = '';
      if (data === "oragoodsid" || data === "oragoodsidFrom") {
        titlename = "原品"
        hovTitle = '原品查询';
      } else if (data === "givegoodsid" || data === "givegoodsidFrom" || data === "tableGivegoodsid") {
        titlename = "赠品"
        hovTitle = '赠品查询';
      } else if (data === 'counterid') {
        hovTitle = '门店查询';
      }
      if (data === "oragoodsid" || data === "givegoodsid" ||data === "tableGivegoodsid") {
        hovUrl = "goodsidhov/select";

        if (data === "oragoodsid") {
          hovColumns.push({id: "goodsid", name: titlename+"ID", queryStatus: true, dataStatus: 2, fillid: "oragoodsid"})
          fillDataName = 'zppswhQueryFrom';
        } else if (data === "givegoodsid") {
          hovColumns.push({id: "goodsid", name: titlename+"ID", queryStatus: true, dataStatus: 2, fillid: "givegoodsid"})
          fillDataName = 'zppswhQueryFrom';
        } else if (data === "tableGivegoodsid") {
          hovColumns.push({id: "goodsid", name: titlename+"ID", queryStatus: true, dataStatus: 2, fillid: "givegoodsid"})
          fillDataName = 'zppswhQueryTableForm';
        }
        hovColumns.push({id: "goodsname", name: titlename+"名称", queryStatus: true, dataStatus: 1})
        hovColumns.push({id: "opcode", name: titlename+"操作码", queryStatus: true, dataStatus: 1})
        hovColumns.push({id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1})
        hovColumns.push({id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1})
        hovColumns.push({id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1})
      } else if (data === "oragoodsidFrom" || data === "givegoodsidFrom") {
        fillDataName = 'zppswhDtlForm';
        if (data === "oragoodsidFrom") {
          hovUrl = "goodsidhov/select";
          hovColumns = [
            {id: "goodsid", name: "原品ID", queryStatus: true, dataStatus: 2, fillid: "oragoodsid"},
            {id: "goodsname", name: "原品名称", queryStatus: true, dataStatus: 1, fillid: "oragoodsname"},
            {id: "opcode", name: "原品操作码", queryStatus: true, dataStatus: 1},
            {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1, fillid: "oragoodstype"},
            {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1, fillid: "oragoodsunit"},
            {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1, fillid: "oraprodarea"}
          ];
        } else if (data === "givegoodsidFrom") {
          hovUrl = "goodsidhov/select";
          hovColumns = [
            {id: "goodsid", name: "赠品ID", queryStatus: true, dataStatus: 2, fillid: "givegoodsid"},
            {id: "goodsname", name: "赠品名称", queryStatus: true, dataStatus: 1, fillid: "givegoodsname"},
            {id: "opcode", name: "赠品操作码", queryStatus: true, dataStatus: 1},
            {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1, fillid: "givegoodstype"},
            {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1, fillid: "givegoodsunit"},
            {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1, fillid: "giveprodarea"}
          ];
        }
      }else if(data === "counterid"){
        hovUrl = "counteridhov/selectcounteridformal";
        fillDataName = 'zppswhQueryTableForm';
        hovColumns = [
          {id: "counterid", name: "门店ID", queryStatus: true, dataStatus: 2, fillid: "counterid"},
          {id: "countername", name: "门店名称", queryStatus: true, dataStatus: 1},
        ];
      }
      this.zppswhHov.hovTitle = hovTitle;
      this.zppswhHov.hovUrl = hovUrl;
      this.zppswhHov.fillDataName = fillDataName;
      this.zppswhHov.hovColumns = hovColumns;
      this.zppswhVisible = true;
    },
    /*关闭新增页*/
    dialogClose() {
      this.zppswhDialogStatus = false;
    },
    /*关闭日志*/
    dialogTableClose() {
      this.zppswhDtlTableData = [];
      this.formIsNull(this.zppswhQueryTableForm);
      this.zppswhTableStatus = false;
    }
  }
}
