import ExeclInsert from "@/views/Core/ExeclInsert";

export default {
  name: 'Fh',
  components: {ExeclInsert},
  data() {
    return {
      formData: {
        counterid: null,
        querydate: null,
        goodsid: null,
        inputmanid: null,
        cityid: null
      },
      loading: false,
      docTableHeight: 0,
      fhPageNum: 1,
      fhPageSize: 50,
      fhTotal: 0,
      delArray: null,
      docTableData: [],
      execlVisible: false,
      fhExeclColumns: [
        {prop: 'goodsid', label: '货品ID', type: 0, tableStatus: 0},
        {prop: 'mdid', label: '门店ID', type: 0, tableStatus: 0},
        {prop: 'goodsqty', label: '数量', type: 0, tableStatus: 0}
      ],
      action: '',
      hovVisible: false,
      hovData: {
        hovTitle: '',
        hovUrl: "",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'hovVisible',
        hovColumns: []
      },
    }
  },
  created() {
    this.docTableHeight = (window.innerHeight - 240);
    this.formData.querydate = [new Date(this.getNewDate() + ' 00:00:00'), new Date(this.getNewDate() + ' 23:59:59')]
  },
  methods: {
    checkbox(row, rowIndex) {
      if (row.fpzt === 2 || row.salesid !== 0) {
        return false;
      } else {
        return true;
      }
    },
    queryFunction(data) {
      if (data === "query") {
        this.selectDoc(1, this.fhPageSize);
      } else if (data === "download") {
        let columns = [
          {prop: 'credate', label: '发生日期'},
          {prop: 'mdid', label: '门店ID'},
          {prop: 'companyname', label: '门店名称'},
          {prop: 'goodsid', label: '货品ID'},
          {prop: 'goodsname', label: '产品名称'},
          {prop: 'goodstype', label: '规格'},
          {prop: 'goodsunit', label: '单位'},
          {prop: 'prodarea', label: '产地'},
          {prop: 'goodsqty', label: '数量'},
          {prop: 'unitprice', label: '单价'},
          {prop: 'fpzt', label: '分配状态'},
          {prop: 'fpsl', label: '分配数量'},
          {prop: 'fprq', label: '分配日期'},
          {prop: 'reqdocid', label: '销售单号'},
          {prop: 'ecredate', label: '销售日期'},
          {prop: 'employeename', label: '录入人'},
          {prop: 'sourcetablename', label: '订单类型'}
        ];
        this.exportExcelDOM(columns, this.docTableData, '分货' + this.getNewDate())
      } else if (data === "downloadMb") {
        let columns = [
          {prop: 'goodsid', label: '货品ID'},
          {prop: 'mdid', label: '门店ID'},
          {prop: 'goodsqty', label: '数量'}
        ]
        let data = [];
        this.exportExcelDOM(columns, data, '分货模板' + this.getNewDate())
      } else if (data === "delAll") {
        let delArray = this.delArray;
        let employeeid = Number(sessionStorage['userid']);
        let num = delArray.length;
        let params = [];
        delArray.forEach(e => {
          /*if(e.sourcetable===2){
            if(employeeid!==e.employeeid){
              alert("当前登陆人不是录入人");
              return false;
            }
          }

          if((e.sourcetable!==2||e.sourcetable!==1)&&e.fpzt===2){
            alert("分配状态不为0");
            return false;
          }*/
          if (e.salesid !== 0) {
            alert("不可作废");
            return false;
          }
          if ((employeeid === e.employeeid && e.sourcetable === 2 && e.fpzt !== 2) || (e.sourcetable === 1 && e.fpzt !== 2)) {
            params.push({dtlid: e.dtlid, invalidmanid: employeeid});
          } else {
            alert("不可作废");
            return false;
          }
        });
        if (num === 0) {
          alert("没有选中记录");
          return false;
        }
        if (confirm('是否作废选中的记录?')) {
          this.$api.ordermanagement.deleteFhAll({data: params}).then(res => {
            if (res.code === 200) {
              if (res.data === 1) {
                alert("作废成功");
                this.queryFunction('query');
              } else {
                alert(res.msg);
                return false;
              }
            }
          }).catch(error => {
            return false;
          })
        } else {
          return false;
        }
      } else if (data === 'ddkcfp') {
        this.$api.ordermanagement.selectFhDdkcfp().then(res => {
          if (res.code === 200) {
            alert("订单库存分配成功");
          } else {
            alert(res.msg);
            return false;
          }
        }).catch(error => {
          return false;
        })
      }
    },
    execlSave(list) {
      let params = [];
      list.forEach(item => {
        item.employeeid = Number(sessionStorage['userid']);
        params.push(item);
      })
      console.log(params)
      this.$api.ordermanagement.addfhExcelCashier({data: params}).then(res => {
        if (res.code === 200) {
          if (res.data === 1) {
            alert("导入成功");
          } else {
            alert(res.msg);
            return false;
          }
        }
      }).catch(error => {
        return false;
      })
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.formData;
      Object.keys(formData).forEach(e => {
        if (e !== "querydate") {
          if (this.returnValue(formData[e]) === true) {
            params[e] = formData[e];
          }
        }
      });
      if (this.returnValue(formData.querydate) === true) {
        params.startdate = formData.querydate[0];
        params.endofdate = formData.querydate[1];
      }
      if (Object.keys(params).length === 0) {
        params = null;
      }
      this.loading = true;
      this.$api.ordermanagement.selectFhDoc({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        if (res.code === 200) {
          this.docTableData = res.data.content;
          this.fhPageNum = res.data.pageNum;
          this.fhPageSize = res.data.pageSize;
          this.fhTotal = res.data.totalSize;
          this.loading = false;
        }
      }).catch(error => {
        this.loading = false;
        return false;
      })
    },
    handleFunction(row) {
      let employeeid = Number(sessionStorage['userid']);
      if ((employeeid === row.employeeid && row.sourcetable === 2 && row.fpzt !== 2) || (row.sourcetable === 1 && row.fpzt !== 2)) {
        if (confirm("是否确认作废")) {
          let list = [];
          let params = {};
          params.invalidmanid = Number(sessionStorage['userid']);
          params.dtlid = row.dtlid;
          list.push(params);
          this.$api.ordermanagement.deleteFhdoc({data: list}).then(res => {
            if (res.code === 200) {
              if (res.data === 1) {
                alert("作废成功");
                this.queryFunction('query');
              } else {
                alert(res.msg);
                return false;
              }
            }
          }).catch(error => {
            return false;
          })
        } else {
          return false;
        }
      } else {
        alert("不可作废");
        return false;
      }
    },
    execlInsert(data) {
      let params = {};
      params.data = [];
      data.forEach(e => {
        params.data.push(e);
      });
      this.$api.ordermanagement.addfhExcelCashier(params).then(res => {
        if (res.code === 200) {
          if (res.data === 1) {
            alert("导入成功");
            this.refs.execlInsert.closeExecl();
          } else {
            console.log(res.msg);
            alert(res.data);
            return false;
          }
        }
      }).catch(error => {
        return false;
      })
    },
    selectionChange(val) {
      this.delArray = val;
    },
    openHov(id) {
      let hovTitle = '';
      let hovUrl = '';
      let hovColumns = [];
      if (id === "mdid") {
        hovTitle = '门店查询';
        hovUrl = "counteridhov/select";
        hovColumns = [
          {id: "counterid", name: "门店ID", queryStatus: true, dataStatus: 2, fillid: "mdid"},
          {id: "countername", name: "门店名称", queryStatus: true, dataStatus: 1}
        ]
      } else if (id === "goodsid") {
        hovTitle = '货品查询';
        hovUrl = "goodsidhov/select";
        hovColumns = [
          {id: "goodsid", name: "货品ID", queryStatus: true, dataStatus: 2, fillid: "goodsid"},
          {id: "goodsname", name: "货品名称", queryStatus: true, dataStatus: 1},
          {id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1},
          {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1},
          {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1},
          {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1}
        ]
      } else if (id === "employeeid") {
        hovTitle = '录入人查询';
        hovUrl = "employeeididhov/select";
        hovColumns = [
          {id: "employeeid", name: "录入人ID", queryStatus: true, dataStatus: 2, fillid: "employeeid"},
          {id: "employeename", name: "录入人名称", queryStatus: true, dataStatus: 1}
        ]
      } else if (id === "cityid") {
        hovTitle = '城市查询';
        hovUrl = "cityididhov/select";
        hovColumns = [
          {id: "cityid", name: "城市ID", queryStatus: true, dataStatus: 2, fillid: "cityid"},
          {id: "cityname", name: "城市名称", queryStatus: true, dataStatus: 1}
        ]
      }
      this.hovData.hovTitle = hovTitle;
      this.hovData.hovUrl = hovUrl;
      this.hovData.hovColumns = hovColumns;
      this.hovVisible = true;

    },
    returnValue(data) {
      return data !== null && data !== "";
    },
  }
}
