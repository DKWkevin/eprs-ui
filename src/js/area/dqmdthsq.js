export default {
  name: "dqndthsq",
  data() {
    return {
      dqndthsqQueryForm: {
        goodsid: null,
        doflag: null,
        bcaldate: null,
        ealdate: null,
        id: null
      },
      dqndthsqTableData: [],
      dqndthsqPageNum: 1,
      dqndthsqPageSize: 50,
      dqndthsqTotal: 0,
      dqndthsqLoading: false,
      dqndthsqTableHeight: 300,
      dqndthsqSelectionArray: [],
      dqndthsqStatusOptions: [{value: 0, label: '待审核'}, {value: 1, label: '审核完毕'}, {
        value: 2,
        label: '生成通知'
      }, {value: -1, label: '审核异常'}],
      dqndthsqExeclColumns: [
        {prop: "id", label: "申请ID"},
        {prop: "credate", label: "申请日期"},
        {prop: "trcompanyid", label: "货品退入公司ID"},
        {prop: "stcompanyid", label: "门店ID"},
        {prop: "stcompanyname", label: "门店名称"},
        {prop: "goodsid", label: "货品ID"},
        {prop: "goodsname", label: "品名"},
        {prop: "goodstype", label: "规格"},
        {prop: "prodarea", label: "产地"},
        {prop: "goodsunit", label: "单位"},
        {prop: "lotno", label: "批号"},
        {prop: "invaliddate", label: "效期"},
        {prop: "remqty", label: "数量"},
        {prop: "doflag", label: "处理状态"},
        {prop: "stcompanyid", label: "退回公司ID"},
        {prop: "subackid", label: "退货通知ID"},
        {prop: "errmsg", label: "异常说明"},
        {prop: "proreason", label: "申请原因"},
        {prop: "appopinion", label: "审批意见"},
        {prop: "appopinions", label: "审批时间"},
        {prop: "auditlevel", label: "申请类型"}
      ],
      dqndthsqHovVisible: false,
      dqndthsqHov: {
        hovTitle: '货品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "dqndthsqQueryForm",
        parentVisible: 'dqndthsqHovVisible',
        hovColumns:
          [
            {id: "goodsid", name: "货品ID", queryStatus: true, dataStatus: 2, fillid: "goodsid"},
            {id: "goodsname", name: "货品名称", queryStatus: true, dataStatus: 1},
            {id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1},
            {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1},
            {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1},
            {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1}
          ]
      },
    }
  },
  created() {
    this.dqndthsqTableHeight = (window.innerHeight - 240);
  },
  methods: {
    queryFunction() {
      this.selectDoc(1, this.dqndthsqPageSize);
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.dqndthsqQueryForm;
      if (formData.counterid !== null && formData.counterid !== "") {
        params.counterid = formData.counterid;
      }
      if (Object.keys(params).length === 0) {
        params = null;
      }
      this.dqndthsqLoading = true;
      this.dqndthsqTableData = [];
      this.$api.area.selectDqndthsq({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        this.dqndthsqTableData = res.data.content;
        this.dqndthsqPageNum = res.data.pageNum;
        this.dqndthsqPageSize = res.data.pageSize;
        this.dqndthsqTotal = res.data.totalSize;
        this.dqndthsqLoading = false;
      }).catch(() => {
        this.dqndthsqPageNum = 1;
        this.dqndthsqTotal = 0;
        this.dqndthsqLoading = false;
        return false;
      })
    },
    selectChange(value) {
      this.dqndthsqSelectionArray = value;
    },
    //新增提交表单
    updateAll() {
      if (confirm("是否确认保存") === true) {
        this.$api.area.confirmDqndthsq(this.dqndthsqDtlForm).then(res => {
          if (res.code === 200) {
            alert("批量确认成功");
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
    openQueryHov() {
      this.dqndthsqHovVisible = true;
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
      this.exportExcelDOM(tableColumns, this.dqndthsqTableData, '地区门店退货申请');
    },
    execlSave(list) {
      this.$api.area.uploadDqndthsq(list).then(res => {
        if (res.code === 200) {
          alert("导入成功");
        } else {
          alert(res.msg);
        }
      }).catch(() => {
        return false;
      })
    }
  }
}
