export default {
  name: "O2okcsx",
  data() {
    return {
      o2okcsxQueryForm: {
        cityid: null
      },
      o2okcsxTableData: [],
      o2okcsxPageNum: 1,
      o2okcsxPageSize: 50,
      o2okcsxTotal: 0,
      o2okcsxLoading: false,
      o2okcsxTableHeight: 300,
      o2okcsxDialog: '',
      o2okcsxDtlStatus: false,
      o2okcsxStatus: false,
      o2okcsxIndex: 0,
      o2okcsxDtlForm: {
        counterid: null,
        fc: null,
        district: null,
        yinpian: null,
        apparatus: null,
        sale: null
      },
      o2okcsxAreaOptions: [],
      o2okcsxFcOptions: [],
      o2okcsxDistrictOptions: [],
      o2okcsxYinpianOptions: [],
      o2okcsxApparatusOptions: [],
      o2okcsxSaleOptions: [],
      o2okcsxHovVisible: false,
      o2okcsxHov: {
        hovTitle: '门店查询',
        hovUrl: "counteridhov/select",
        afterStatus: false,
        fillDataName: "o2okcsxDtlForm",
        parentVisible: 'o2okcsxHovVisible',
        hovColumns:
          [
            {id: "counterid", name: "门店ID", queryStatus: true, dataStatus: 2, fillid: "counterid"},
            {id: "countername", name: "门店名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "门店操作码", queryStatus: true, dataStatus: 1}
          ]
      },
    }
  },
  created() {
    this.o2okcsxTableHeight = (window.innerHeight - 240);
  },
  methods: {
    queryFunction() {
      this.selectDoc(1, this.o2okcsxPageSize);
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.o2okcsxQueryForm;
      if (formData.cityid !== null && formData.cityid !== "") {
        params.cityid = formData.cityid;
      }
      if (formData.goodsid !== null && formData.goodsid !== "") {
        params.goodsid = formData.goodsid;
      }
      if (Object.keys(params).length === 0) {
        params = null;
      }
      this.o2okcsxLoading = true;
      this.o2okcsxTableData = [];
      this.$api.area.selectO2okcsx({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        this.o2okcsxTableData = res.data.content;
        this.o2okcsxPageNum = res.data.pageNum;
        this.o2okcsxPageSize = res.data.pageSize;
        this.o2okcsxTotal = res.data.totalSize;
        this.o2okcsxLoading = false;
      }).catch(() => {
        this.o2okcsxPageNum = 1;
        this.o2okcsxTotal = 0;
        this.o2okcsxLoading = false;
        return false;
      })
    },
    insertOrUpdate() {
      if (this.o2okcsxDtlStatus === false) {
        this.addForm();
      } else {
        this.updateForm();
      }
    },
    //新增加载表单
    addOpen() {
      this.formIsNull(this.o2okcsxDtlForm);
      this.o2okcsxDialog = '新增表单';
      this.o2okcsxDtlStatus = false;
      this.o2okcsxStatus = true;
    },
    //新增提交表单
    addForm() {
      if (confirm("是否确认保存") === true) {
        this.$api.marketing.inserto2okcsx(this.o2okcsxDtlForm).then(res => {
          if (res.code === 200) {
            alert("保存成功");
            this.dialogClose();
            this.queryFunction();
          } else {
            alert(res.msg);
          }
        }).catch(() => {
          return false;
        })
      } else {
        return false;
      }
    },
    //修改加载表单
    updateOpen(row, index) {
      Object.keys(this.o2okcsxDtlForm).forEach(item => {
        this.o2okcsxDtlForm[item] = row[item];
      })
      this.o2okcsxIndex = index;
      this.o2okcsxDialog = '修改表单';
      this.o2okcsxDtlStatus = true;
      this.o2okcsxStatus = true;
    },
    //修改提交表单
    updateForm() {
      if (confirm("是否确认修改") === true) {
        this.$api.marketing.updateo2okcsx(this.o2okcsxDtlForm).then(res => {
          if (res.code === 200) {
            alert("修改成功");
            Object.keys(this.o2okcsxDtlForm).forEach(item => {
              this.o2okcsxTableData[index][item] = this.o2okcsxDtlForm[item];
            })
            this.dialogClose();
          } else {
            alert(res.msg);
          }
        }).catch(() => {
          return false;
        })
      } else {
        return false;
      }
    },
    //删除
    delForm(row, index) {
      if (confirm("是否确认删除") === true) {
        this.$api.marketing.deleteo2okcsx({counterid: row.counterid}).then(res => {
          if (res.code === 200) {
            alert("删除成功");
            this.o2okcsxTableData.splice(index, 1);
          } else {
            alert(res.msg);
          }
        }).catch(() => {
          return false;
        })
      } else {
        return false;
      }
    },
    openQueryHov() {
      let hovTitle = '';
      let hovUrl = "";
      let hovColumns = [];
      if (data === 'cityid') {
        hovTitle = '客户查询';
        hovUrl = "customidhov/select";
        hovColumns =
          [
            {id: "customid", name: "客户ID", queryStatus: true, dataStatus: 2, fillid: "customid"},
            {id: "customname", name: "客户名称", queryStatus: true, dataStatus: 1},
            {id: "customopcode", name: "客户操作码", queryStatus: true, dataStatus: 1}
          ]
      } else if (data === "goodsid") {
        hovTitle = '货品查询';
        hovUrl = "goodsidhov/select";
        hovColumns =
          [
            {id: "goodsid", name: "货品ID", queryStatus: true, dataStatus: 2, fillid: "goodsid"},
            {id: "goodsname", name: "货品名称", queryStatus: true, dataStatus: 1},
            {id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1},
            {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1},
            {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1},
            {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1}
          ]
      }
      this.xsbcmxcxHov.hovTitle = hovTitle;
      this.xsbcmxcxHov.hovUrl = hovUrl;
      this.xsbcmxcxHov.hovColumns = hovColumns;
      this.o2okcsxHov.fillDataName = "o2okcsxQueryForm";
      this.o2okcsxHovVisible = true;
    },
    openHov() {
      this.o2okcsxHov.fillDataName = "o2okcsxDtlForm";
      this.o2okcsxHovVisible = true;
    },
    download() {
      let tableColumns = [
        {prop: "counterid", label: "门店ID"},
        {prop: "companyname", label: "门店名称"},
        {prop: "area", label: "面积分类"},
        {prop: "fc", label: "功能"},
        {prop: "district", label: "商圈"},
        {prop: "yinpian", label: "饮片范围"},
        {prop: "apparatus", label: "器械范围"},
        {prop: "sale", label: "销售分类"}
      ];
      this.exportExcelDOM(tableColumns, this.o2okcsxTableData, '门店维度范围');
    },
    dialogClose() {
      this.formIsNull(this.o2okcsxDtlForm);
      this.o2okcsxDialog = '';
      this.o2okcsxDtlStatus = false;
      this.o2okcsxIndex = 0;
      this.o2okcsxStatus = false;
    }
  }
}
