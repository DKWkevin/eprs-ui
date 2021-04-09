import DqtjdqshDtl from "@/views/Function/Area/DqtjdqshDtl"
import DqtjdqshExecl from "@/views/Function/Area/DqtjdqshExecl";
import {formDataReset} from "@/utils/functions"

export default {
  name: 'Dqtjdqsh',
  components: {DqtjdqshExecl, DqtjdqshDtl},
  data() {
    return {
      loading: false,
      loadingText: '正在处理,请稍后...',
      formList: [
        {type: 'inputHov', dataType: 'number', label: '货品ID', id: 'goodsid'},
        {type: 'inputHov', dataType: 'number', label: '门店ID', id: 'counterid'},
        {
          type: 'select',
          dataType: 'number',
          label: '确认状态',
          id: 'status',
          options: [{value: 0, label: '临时'}, {value: 1, label: '确认'}],
          clearable: true
        }
      ],
      formData: {goodsid: null, counterid: null, status: null},
      btnOptions: [
        {id: "query", icon: "fa fa-search", label: "action.search", perms: 'region:kctjdqsh:select'},
        {id: "add", icon: "fa fa-plus", label: "action.add", perms: 'region:kctjdqsh:add'},
        {id: "reset", icon: "fa fa-cog", label: "action.reset", perms: 'region:kctjdqsh:select'},
        {id: "btspml", icon: "fa fa-plus", label: "action.btspml", perms: 'region:kctjdqsh:select'},
        {id: "pszt", icon: "fa fa-edit", label: "action.editps", perms: 'region:kctjdqsh:select'},
        {id: "mdzxbtp", icon: "fa fa-edit", label: "action.mdzxbtp", perms: 'region:kctjdqsh:select'},
        {id: "btpzxyccx", icon: "fa fa-edit", label: "action.btpzxyccx", perms: 'region:kctjdqsh:select'}
      ],
      labelStatus: false,
      labelPx: '60px',
      queryGoodsVisible: false,
      queryGoodsHov: {
        hovTitle: '货品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'queryGoodsVisible',
        hovColumns:
          [
            {id: "goodsid", name: "货品ID", queryStatus: true, dataStatus: 2, fillid: "goodsid"},
            {id: "goodsname", name: "货品名称", queryStatus: true, dataStatus: 1},
            {id: "goodsopcode", name: "货品操作码", queryStatus: true, dataStatus: 1}
          ]
      },
      queryCounterVisible: false,
      queryCounterHov: {
        hovTitle: '门店查询',
        hovUrl: "counteridhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'queryCounterVisible',
        hovColumns:
          [
            {id: "companyid", name: "门店ID", queryStatus: true, display: 1, dataStatus: 2, value: null},
            {id: "counterid", name: "门店ID", queryStatus: true, dataStatus: 2, fillid: "counterid"},
            {id: "countername", name: "门店名称", queryStatus: true, dataStatus: 1},
            {id: "counteropcode", name: "门店操作码", queryStatus: true, dataStatus: 1}
          ]
      },
      docTableColumns: [
        {indexType: 'selection', width: 60},
        {prop: 'kctjdtlid', label: '调剂明细ID', type: 0, tableStatus: 0},
        {prop: 'countername', label: '门店', type: 0, tableStatus: 0, width: 120},
        {prop: 'goodsid', label: '货品ID', type: 0, tableStatus: 0, width: 90, widthStatus: true, sortable: 'sortable'},
        {prop: 'goodsname', label: '货品', type: 0, tableStatus: 0, width: 120, minWidth: '60px'},
        {prop: 'goodstype', label: '规格', type: 0, tableStatus: 0, width: 120},
        {prop: 'prodarea', label: '产地', type: 0, tableStatus: 0, width: 120},
        {prop: 'goodsunit', label: '单位', type: 0, tableStatus: 0, width: 120},
        {prop: 'lotno', label: '批号', type: 0, tableStatus: 0},
        {prop: 'invaliddate', label: '失效日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'sucredate', label: '进货日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'autoqty', label: '生成数量', type: 0, tableStatus: 0},
        {prop: 'kctjqty', label: '调剂数量', type: 0, tableStatus: 0, width: 100, widthStatus: true, sortable: 'sortable'},
        {prop: 'remqty', label: '已冻结数量', type: 0, tableStatus: 0, width: 120},
        {prop: 'ifpayname', label: '是否付款品', type: 0, tableStatus: 0, width: 120},
        {prop: 'saqty', label: '销量', type: 0, tableStatus: 0, width: 120},
        {prop: 'bs', label: '笔数', type: 0, tableStatus: 0, width: 120},
        {prop: 'sfbtp', label: '是否必调', type: 0, tableStatus: 0, width: 120},
        {
          prop: 'ifmovename',
          label: '是否控制',
          type: 0,
          tableStatus: 0,
          width: 120,
          widthStatus: true,
          sortable: 'sortable'
        },
        {prop: 'reason', label: '原因', type: 0, tableStatus: 0, width: 120},
        {prop: 'mlstatusname', label: '配送状态', type: 0, tableStatus: 0},
        {prop: 'outbatchid', label: '外部批次ID', type: 0, tableStatus: 0},
        {prop: 'inbatchid', label: '内部批次ID', type: 0, tableStatus: 0},
        {prop: 'areaname', label: '区域', type: 0, tableStatus: 0, width: 120},
        {prop: 'credate', label: '日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'cityname', label: '城市', type: 0, tableStatus: 0, width: 120},
        {prop: 'companyname', label: '公司', type: 0, tableStatus: 0, width: 120},
        {
          prop: 'statusname',
          label: '确认状态ID',
          type: 0,
          tableStatus: 0,
          width: 110,
          widthStatus: true,
          sortable: 'sortable'
        },
        {prop: 'confirmname', label: '确认人', type: 0, tableStatus: 0},
        {prop: 'confirmdate', label: '确认时间', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'inputmanname', label: '录入人', type: 0, tableStatus: 0},
        {prop: 'deptname', label: '所属部门', type: 0, tableStatus: 0, width: 120},
        {prop: 'pjxl', label: '门店平均销量', type: 0, tableStatus: 0},
        {prop: 'dqsaqty', label: '地区销售数量', type: 0, tableStatus: 0},
        {prop: 'samds', label: '销售门店数', type: 0, tableStatus: 0},
        {prop: 'kcmds', label: '库存门店数', type: 0, tableStatus: 0},
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          type: 1,
          width: 100,
          widthStatus: true,
          tableStatus: 0,
          options: [
            /*{id:"pszt",icon:"fa fa-edit",label:"action.editps",perms:'region:kctjdqsh:update'},*/
            {id: "tjbzsl", icon: "fa fa-edit", label: "action.edittjbz", perms: 'region:kctjdqsh:update'}
          ]
        }
      ],
      docTableData: [],
      docLoading: false,
      docTableHeight: 0,
      dqtjdqshDtlVisible: false,
      dtltype: 0,
      docTitle: '',
      dqtjdqshExeclVisible: false,
      dtlData: {},
      cityid: [],
      selections: [],
      dtlIndex: 0,
      dtlPage: {},
      dqtjdqshBtpzxyccxVisible: false,
      dqtjdqshBtpzxyccxData: [],
      dqtjdqshBtpzxyccxLoading: false,
      dqtjdqshBtpzxyccxPageNum: 1,
      dqtjdqshBtpzxyccxPageSize: 50,
      dqtjdqshBtpzxyccxTotal: 0
    }
  },
  created() {
    this.docTableHeight = (window.innerHeight - 240);
    this.$api.hov.cityid({
      pageNum: 1,
      pageSize: 10,
      params: {companyid: Number(sessionStorage.getItem("companyid"))}
    }).then(res => {
      if (res.code === 200) {
        res.data.content.forEach(e => {
          this.cityid.push(e.cityid);
        });
      }
    }).catch(error => {
      return false;
    })
  },
  methods: {
    handleFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "add") {
        this.dqtjdqshDtlVisible = true;
        this.docTitle = "新增";
        this.dtltype = 1;
      } else if (data === "reset") {
        let formData = this.formData;
        formDataReset(formData);
      } else if (data === "btspml") {
        /* this.loading = true;
         let params={companyid:Number(sessionStorage['companyid'])};
         this.$api.area.judgeremqty({params:params}).then(res=>
         {
           if(res.code === 200)
           {
             this.loading = false;
             this.dqtjdqshExeclVisible=true;
           }
         }).catch(error =>
         {
           this.loading = false;
           return false;
         });*/
        this.dqtjdqshExeclVisible = true;
      } else if (data === "pszt") {
        if (this.selections.length === 0) {
          alert("请先选择要修改的单子");
          return false;
        }
        this.dqtjdqshDtlVisible = true;
        this.docTitle = "修改配送状态";
        this.dtltype = 2;
        let params = [];
        this.selections.forEach(e => {
          params.push(e.kctjdtlid);
        });
        this.dtlData.kctjdtlid = params;
      } else if (data === "mdzxbtp") {
        this.loading = true;
        let params = {inputmanid: sessionStorage['userid'], companyid: Number(sessionStorage['companyid'])};
        this.$api.area.dqtjdqshMdzxbtp(params).then(res => {
          if (res.code === 200) {
            if (res.msg === '1') {
              alert("执行成功");
              this.loading = false;
            } else if (res.msg === '0') {
              alert("执行失败");
              this.loading = false;
              return false;
            } else {
              alert(res.msg);
              this.loading = false;
              return false;
            }
          }
        }).catch(error => {
          this.loading = false;
          return false;
        });
      } else if (data === "btpzxyccx") {
        this.selectBtpzxyccx(this.dqtjdqshBtpzxyccxPageNum, this.dqtjdqshBtpzxyccxPageSize);
      }
    },
    handleBtpzxyccx(data) {
      this.selectBtpzxyccx(data.pageNum, data.pageSize);
    },
    selectBtpzxyccx(pageNum, pageSize) {
      this.dqtjdqshBtpzxyccxVisible = true;
      this.dqtjdqshBtpzxyccxLoading = true;
      let params = {pageNum: pageNum, pageSize: pageSize, params: {companyid: Number(sessionStorage['companyid'])}}
      this.$api.area.selectDqtjqshBtpzxyccx(params).then(res => {
        this.dqtjdqshBtpzxyccxData = res.data.content;
        this.dqtjdqshBtpzxyccxPageNum = res.data.pageNum;
        this.dqtjdqshBtpzxyccxPageSize = res.data.pageSize;
        this.dqtjdqshBtpzxyccxTotal = res.data.totalSize;
        this.dqtjdqshBtpzxyccxLoading = false;
      }).catch(() => {
        this.dqtjdqshBtpzxyccxTotal = 0;
        this.dqtjdqshBtpzxyccxLoading = false;
        return false;
      })
    },
    handleQuery(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let formData = this.formData;
      let params = {};
      if (formData.goodsid !== null && formData.goodsid !== "") {
        params.goodsid = formData.goodsid;
      }
      if (formData.counterid !== null && formData.counterid !== "") {
        params.counterid = formData.counterid;
      }
      if (Object.keys(params).length === 0) {
        alert("货品或者门店必须填写一个");
        return false;
      }
      if (formData.status !== null && formData.status !== "") {
        params.status = formData.status;
      }
      params.companyid = Number(sessionStorage['companyid']);
      this.docTableData = [];
      this.docLoading = true;
      this.$api.area.selectDqtjqshDoc({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        if (res.code === 200) {
          this.docTableData = res.data.content;
          this.$refs.doctable.pageSize = res.data.pageSize;
          this.$refs.doctable.currentPage = res.data.pageNum;
          this.$refs.doctable.total = res.data.totalSize;
          this.docLoading = false;
        }
      }).catch(errpr => {
        this.docLoading = false;
        return false;
      })
    },
    selectionChange(val) {
      this.selections = val;
    },
    handle(data) {
      /* if(data.id==="pszt"){
         this.dqtjdqshDtlVisible=true;
         this.docTitle="修改配送状态";
         this.dtltype=2;
         this.dtlData=data.row
       }else */
      if (data.id === "tjbzsl") {
        this.dqtjdqshDtlVisible = true;
        this.docTitle = "修改调剂标志";
        this.dtltype = 3;
        this.dtlData = data.row;
        this.dtlIndex = data.index;
        this.dtlPage = {
          pageSize: this.$refs.doctable.pageSize,
          pageNum: this.$refs.doctable.currentPage,
          scrollTop: this.$refs.doctable.scrollTop
        }
      }
    },
    queryHov(data) {
      if (data === "goodsid") {
        this.queryGoodsVisible = true;
      } else if (data === "counterid") {
        this.queryCounterHov.hovColumns[0].value = Number(sessionStorage['companyid']);
        this.queryCounterVisible = true;
      }
    },
    dqtjdqshBtpzxyccxClose() {
      this.dqtjdqshBtpzxyccxVisible = false;
    },
    downloadBtpzxyccx() {
      let columns = [
        {prop: "credate", label: "导入必调日期"},
        {prop: "counterid", label: "门店ID"},
        {prop: "companyname", label: "门店名称"},
        {prop: "goodsid", label: "货品ID"},
        {prop: "goodsname", label: "名称"},
        {prop: "goodstype", label: "规格"},
        {prop: "goodsunit", label: "单位"},
        {prop: "prodarea", label: "产地"},
        {prop: "inbatchid", label: "内部批次"},
        {prop: "goodsqty", label: "货品数量"},
        {prop: "mdstatus", label: "门店执行状态"},
        {prop: "cstatus", label: "数据中心执行状态"}
      ];
      this.exportExcelDOM(columns, this.dqtjdqshBtpzxyccxData, '必调品执行异常');
    }
  }
}
