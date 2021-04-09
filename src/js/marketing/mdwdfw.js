export default {
  name: "Mdwdfw",
  data() {
    return {
      mdwdfwQueryForm: {
        counterid: null
      },
      mdwdfwTableData: [],
      mdwdfwPageNum: 1,
      mdwdfwPageSize: 50,
      mdwdfwTotal: 0,
      mdwdfwLoading: false,
      mdwdfwTableHeight: 300,
      mdwdfwDialog: '',
      mdwdfwDtlStatus: false,
      mdwdfwStatus: false,
      mdwdfwIndex: 0,
      mdwdfwDtlForm: {
        counterid: null,
        area: null,
        fc: null,
        district: null,
        yinpian: null,
        apparatus: null,
        sale: null
      },
      mdwdfwAreaOptions: [],
      mdwdfwFcOptions: [],
      mdwdfwDistrictOptions: [],
      mdwdfwYinpianOptions: [],
      mdwdfwApparatusOptions: [],
      mdwdfwSaleOptions: [],
      mdwdfwHovVisible: false,
      mdwdfwHov: {
        hovTitle: '门店查询',
        hovUrl: "counteridhov/select",
        afterStatus: false,
        fillDataName: "mdwdfwDtlForm",
        parentVisible: 'mdwdfwHovVisible',
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
    this.mdwdfwTableHeight = (window.innerHeight - 240);
    this.mdwdfwAreaOptions = this.getDef('area');
    this.mdwdfwFcOptions = this.getDef('function');
    this.mdwdfwDistrictOptions = this.getDef('district');
    this.mdwdfwYinpianOptions = this.getDef('yinpian');
    this.mdwdfwApparatusOptions = this.getDef('apparatus');
    this.mdwdfwSaleOptions = this.getDef('sale');
  },
  methods: {
    queryFunction() {
      this.selectDoc(1, this.mdwdfwPageSize);
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.mdwdfwQueryForm;
      if (formData.counterid !== null && formData.counterid !== "") {
        params.counterid = formData.counterid;
      }
      if (Object.keys(params).length === 0) {
        params = null;
      }
      this.mdwdfwLoading = true;
      this.mdwdfwTableData = [];
      this.$api.marketing.selectMdwdfw({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        this.mdwdfwTableData = res.data.content;
        this.mdwdfwPageNum = res.data.pageNum;
        this.mdwdfwPageSize = res.data.pageSize;
        this.mdwdfwTotal = res.data.totalSize;
        this.mdwdfwLoading = false;
      }).catch(() => {
        this.mdwdfwPageNum = 1;
        this.mdwdfwTotal = 0;
        this.mdwdfwLoading = false;
        return false;
      })
    },
    insertOrUpdate() {
      if (this.mdwdfwDtlStatus === false) {
        this.addForm();
      } else {
        this.updateForm();
      }
    },
    //新增加载表单
    addOpen() {
      this.formIsNull(this.mdwdfwDtlForm);
      this.mdwdfwDialog = '新增表单';
      this.mdwdfwDtlStatus = false;
      this.mdwdfwStatus = true;
    },
    //新增提交表单
    addForm() {
      if (confirm("是否确认保存") === true) {
        this.$api.marketing.insertMdwdfw(this.mdwdfwDtlForm).then(res => {
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
      Object.keys(this.mdwdfwDtlForm).forEach(item => {
        this.mdwdfwDtlForm[item] = row[item];
      })
      this.mdwdfwIndex = index;
      this.mdwdfwDialog = '修改表单';
      this.mdwdfwDtlStatus = true;
      this.mdwdfwStatus = true;
    },
    //修改提交表单
    updateForm() {
      if (confirm("是否确认修改") === true) {
        this.$api.marketing.updateMdwdfw(this.mdwdfwDtlForm).then(res => {
          if (res.code === 200) {
            alert("修改成功");
            Object.keys(this.mdwdfwDtlForm).forEach(item => {
              this.mdwdfwTableData[index][item] = this.mdwdfwDtlForm[item];
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
        this.$api.marketing.deleteMdwdfw({counterid: row.counterid}).then(res => {
          if (res.code === 200) {
            alert("删除成功");
            this.mdwdfwTableData.splice(index, 1);
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
      this.mdwdfwHov.fillDataName = "mdwdfwQueryForm";
      this.mdwdfwHovVisible = true;
    },
    openHov() {
      this.mdwdfwHov.fillDataName = "mdwdfwDtlForm";
      this.mdwdfwHovVisible = true;
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
      this.exportExcelDOM(tableColumns, this.mdwdfwTableData, '门店维度范围');
    },
    dialogClose() {
      this.formIsNull(this.mdwdfwDtlForm);
      this.mdwdfwDialog = '';
      this.mdwdfwDtlStatus = false;
      this.mdwdfwIndex = 0;
      this.mdwdfwStatus = false;
    },
    getDef(keyword) {
      let list = [];
      this.$api.marketing.selectMdwdfwDef({dimension: keyword}).then(res => {
        res.data.forEach(item => {
          let json = {
            value: item.classname,
            label: item.description
          }
          list.push(json);
        })
      }).catch(() => {
        return false;
      })
      return list;
    }
  }
}
