export default {
  name: "Thgzwh",
  data() {
    return {
      thgzwhQueryForm: {
        companyid: 19940,
        supplyid: null,
        goodsid: null,
        ifsuback: null,
        ifpsback: null,
        ifmeback: null,
        hzhbid: null,
        channelid: null,
      },
      thgzwhTableData: [],
      thgzwhPageNum: 1,
      thgzwhPageSize: 50,
      thgzwhTotal: 0,
      thgzwhLoading: false,
      thgzwhTableHeight: 300,
      thgzwhDialog: '修改表单',
      thgzwhStatus: false,
      thgzwhIndex: 0,
      thgzwhDtlForm: {
        companyid: null,
        supplyid: null,
        companyname: null,
        goodsid: null,
        goodsname: null,
        ifsuback: null,
        ifpsback: null,
        ifmeback: null,
        mixinvalid: null,
        maxinvalid: null,
        memo: null
      },
      thgzwhIfSuback: [{value: 0, label: '否'}, {value: 1, label: '是'}],
      thgzwhIfpsback: [{value: 0, label: '否'}, {value: 1, label: '是'}],
      thgzwhIfmeback: [{value: 0, label: '否'}, {value: 1, label: '是'}],
      thgzwhDialogAll: '批量修改',
      thgzwhAllStatus: false,
      thgzwhAllForm: {},
      thgzwhHovVisible: false,
      thgzwhHov: {
        hovTitle: '',
        hovUrl: "",
        afterStatus: false,
        fillDataName: "thgzwhQueryForm",
        parentVisible: 'thgzwhHovVisible',
        hovColumns: []
      },
    }
  },
  created() {
    this.thgzwhTableHeight = (window.innerHeight - 240);
  },
  methods: {
    queryFunction() {
      this.selectDoc(1, this.thgzwhPageSize);
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.thgzwhQueryForm;
      console.log(formData)
      Object.keys(formData).forEach(item => {
        if (formData[item] !== null && formData[item] !== "") {
          params[item] = formData[item];
        }
      })
      if (Object.keys(formData).length === 0) {
        params = null;
      }
      this.thgzwhLoading = true;
      this.thgzwhTableData = [];
      this.$api.newproduct.selectThgzwh({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        this.thgzwhTableData = res.data.content;
        this.thgzwhPageNum = res.data.pageNum;
        this.thgzwhPageSize = res.data.pageSize;
        this.thgzwhTotal = res.data.totalSize;
        this.thgzwhLoading = false;
      }).catch(() => {
        this.thgzwhPageNum = 1;
        this.thgzwhTotal = 0;
        this.thgzwhLoading = false;
        return false;
      })
    },
    //修改加载表单
    updateOpen(row, index) {
      Object.keys(this.thgzwhDtlForm).forEach(item => {
        this.thgzwhDtlForm[item] = row[item];
      })
      this.thgzwhIndex = index;
      this.thgzwhStatus = true;
    },
    //修改提交表单
    updateForm() {
      if (confirm("是否确认修改") === true) {
        let params = {};
        Object.keys(this.thgzwhDtlForm).forEach(item => {
          params[item] = this.thgzwhDtlForm[item];
        })
        params.opmanid = Number(sessionStorage['userid']);
        this.$api.newproduct.updateThgzwh(params).then(res => {
          if (res.code === 200) {
            alert("修改成功");
            Object.keys(this.thgzwhDtlForm).forEach(item => {
              this.thgzwhTableData[index][item] = this.thgzwhDtlForm[item];
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
    //打开批量修改页面
    updateOpenAll() {
      if (this.thgzwhQueryForm.supplyid === null || this.thgzwhQueryForm.supplyid === "") {
        alert("供应商ID不能为空!");
        return false;
      }
      if (this.thgzwhQueryForm.hzhbid === null || this.thgzwhQueryForm.hzhbid === "") {
        alert("合作伙伴ID不能为空!");
        return false;
      }
      this.thgzwhAllForm.supplyid = this.thgzwhQueryForm.supplyid;
      this.thgzwhAllForm.hzhbid = this.thgzwhQueryForm.hzhbid;
      this.thgzwhAllForm.companyid = this.thgzwhQueryForm.companyid;
      this.thgzwhAllStatus = true;
    },
    //修改提交表单批量
    updateFormAll() {
      if (confirm("是否确认修改") === true) {
        this.$api.newproduct.updateThgzwhPl(this.thgzwhAllForm).then(res => {
          if (res.code === 200) {
            alert("修改成功");
            this.selectDoc(1, this.pageSize);
            this.dialogCloseAll();
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
        this.$api.newproduct.deleteThgzwh({counterid: row.counterid}).then(res => {
          if (res.code === 200) {
            alert("删除成功");
            this.thgzwhTableData.splice(index, 1);
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
    //打开hov
    openQueryHov(data) {
      let hovTitle = '';
      let hovUrl = '';
      let hovColumns = [];
      if (data === 'companyid') {
        hovTitle = '公司查询';
        hovUrl = 'companyidhov/selectcompanyid';
        hovColumns = [
          {id: "companyid", name: "公司ID", queryStatus: true, dataStatus: 2, fillid: "companyid"},
          {id: "companyname", name: "公司名称", queryStatus: true, dataStatus: 1},
          {id: "companyopcode", name: "公司操作码", queryStatus: true, dataStatus: 1}
        ];
      } else if (data === 'supplyid') {
        hovTitle = '供应商查询';
        hovUrl = 'supplyidhov/select';
        hovColumns = [
          {id: "supplyid", name: "供应商ID", queryStatus: true, dataStatus: 2, fillid: "supplyid"},
          {id: "supplyname", name: "供应商名称", queryStatus: true, dataStatus: 1},
        ];
      } else if (data === 'goodsid') {
        hovTitle = '货品查询';
        hovUrl = 'goodsidhov/select';
        hovColumns = [
          {id: "goodsid", name: "货品ID", queryStatus: true, dataStatus: 2, fillid: "goodsid"},
          {id: "goodsname", name: "货品名称", queryStatus: true, dataStatus: 1},
          {id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1},
          {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1},
          {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1},
          {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1}
        ];
      } else if (data === 'hzhbid') {
        hovTitle = '合作伙伴查询';
        hovUrl = 'hzhbidhov/select';
        hovColumns = [
          {id: "hzhbid", name: "合作伙伴ID", queryStatus: true, dataStatus: 2, fillid: "hzhbid"},
          {id: "hzhbname", name: "合作伙伴名称", queryStatus: true, dataStatus: 1},
        ];
      }
      this.thgzwhHov.hovTitle = hovTitle;
      this.thgzwhHov.hovUrl = hovUrl;
      this.thgzwhHov.hovColumns = hovColumns;
      this.thgzwhHovVisible = true;
    },
    //下载
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
      this.exportExcelDOM(tableColumns, this.thgzwhTableData, '门店维度范围');
    },
    //关闭修改页面
    dialogClose() {
      this.formIsNull(this.thgzwhDtlForm);
      this.thgzwhIndex = 0;
      this.thgzwhStatus = false;
    },
    //关闭批量提交页面
    dialogCloseAll() {
      this.formIsNull(this.thgzwhAllForm);
      this.thgzwhAllStatus = false;
    }
  }
}
