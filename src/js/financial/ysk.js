import YskAdd from "../../views/Function/Financial/YskAdd"
import {selectDdlIn, formDataFormatIn, disForm} from "@/utils/functions"

export default {
  name: 'Ysk',
  components: {
    YskAdd,
  },
  data() {
    return {
      //查询条件加载
      formList: [
        {type: "daterange", id1: "startdate", id2: 'endofdate', label: "日期", width: 200},
        {
          type: "inputHov", id: "customid", label: "客户ID", disabled: true, width: 160
        },
        {type: "select", id: "rectypeid", label: "收款类型", options: [], "clearable": true, width: 100},
        {
          type: "select",
          id: "usestatus",
          label: "状态",
          options: [{value: 0, label: "临时"}, {value: 1, label: "确认"}, {value: 2, label: "作废"}],
          "clearable": true,
          width: 100
        },
        {
          type: "inputPrice",
          id: "total",
          minid: "Lesstotal",
          minPlaceholder: "金额下限",
          maxid: "greatertotal",
          maxPlaceholder: "金额上限",
          label: "金额",
          width: 200
        }
      ],
      btnOptions: [
        {id: "query", icon: "fa fa-search", label: "action.search", perms: "financial:ysk:select"},
        {id: "add", icon: "fa fa-plus", label: "action.add", perms: "financial:ysk:add"},
        {id: "reset", icon: "fa fa-cog", label: "action.reset", perms: "financial:ysk:select"}
      ],
      formData: {
        startdate: null,
        endofdate: null,
        customid: null,
        rectypeid: null,
        usestatus: null,
        greatertotal: null,
        Lesstotal: null
      },
      queryCustomVisible: false,
      customHov: {
        hovTitle: "客户查询",
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: "queryCustomVisible",
        hovColumns:
          [
            {
              id: "customid",
              name: "客户ID",
              value: null,
              queryStatus: true,
              dataStatus: 2,
              fillstatus: 1,
              fillid: "customid"
            },
            {id: "customname", name: "客户名称", value: null, queryStatus: true, dataStatus: 1, fillstatus: 2},
            {id: "customopcode", name: "客户操作码", value: null, queryStatus: true, dataStatus: 1, fillstatus: 2}
          ]
      },
      //表单
      tableColumns: [
        {
          prop: "sarecid",
          label: "收款单ID",
          type: 0,
          tableStatus: 0
        },
        {
          prop: "credate",
          label: "日期",
          type: 2,
          width: 150,
          widthStatus: true,
          tableStatus: 0
        },
        {
          prop: "customid",
          label: "客户ID",
          type: 0,
          tableStatus: 0,
          listStatus: 0,
          dataStatus: 0,
          listType: "inputHov",
          listDisabled: false,
          required: true
        },
        {
          prop: "customname",
          label: "客户名称",
          type: 0,
          tableStatus: 0,
          listStatus: 0,
          listType: "input",
          listDisabled: true
        },
        {
          prop: "total",
          label: "金额",
          type: 0,
          tableStatus: 0,
          listStatus: 0,
          listType: "input",
          listDisabled: false,
          required: true
        },
        {
          prop: "rectypeid",
          label: "收款类型",
          tableStatus: 1,
          listStatus: 0,
          listType: "select",
          listDisabled: false,
          options: [
            {
              value: 4,
              label: "预收"
            }
          ]
        },
        {
          prop: "rectypename",
          label: "收款类型",
          type: 0,
          tableStatus: 0,
          clientWidth: 80
        },
        {
          prop: "usestatusname",
          label: "状态",
          type: 0,
          tableStatus: 0,
          clientWidth: 60
        },
        {
          prop: "settlemode",
          label: "结算方式",
          type: 0,
          tableStatus: 1,
          listStatus: 0,
          listType: "selectHov",
          listDisabled: false,
          btnDisabled: false,
          btnstatus: false,
          options: []
        },
        {
          prop: "settlemodename",
          label: "结算方式",
          type: 0,
          tableStatus: 0
        },
        {
          prop: "sourcetypeid",
          label: "源单类型",
          type: 0,
          width: 100,
          tableStatus: 1,
          listStatus: 1,
          listType: "input",
          listDisabled: true
        },
        {
          prop: "sourcetypename",
          label: "源单类型",
          type: 0,
          width: 100,
          tableStatus: 1
        },
        {
          prop: "sourceid",
          label: "源单ID",
          type: 0,
          tableStatus: 1,
          listStatus: 1,
          listType: "input",
          listDisabled: true
        },
        {
          prop: "payername",
          label: "收款人",
          type: 0,
          tableStatus: 0
        },
        {
          prop: "confirmmanname",
          label: "确认人",
          type: 0,
          tableStatus: 0
        },
        {
          prop: "invalidmanname",
          label: "作废人",
          type: 0,
          tableStatus: 0
        },
        {
          prop: "receiveid",
          label: "出纳收款ID",
          type: 0,
          tableStatus: 0
        },
        {
          prop: "receivefalgname",
          label: "出纳收款标志",
          width: 100,
          type: 0,
          tableStatus: 0
        },
        {
          prop: "summary",
          label: "备注",
          type: 0,
          tableStatus: 0,
          listStatus: 0,
          listType: "input",
          listDisabled: false
        },
        {
          prop: "companyid",
          label: "公司ID",
          type: 0,
          tableStatus: 0
        },
        {
          prop: "companyname",
          label: "公司名称",
          type: 0,
          width: 180,
          tableStatus: 0
        },
        {
          prop: "bankid",
          label: "银行ID",
          type: 0,
          tableStatus: 0,
          listStatus: 0,
          listType: "inputHov",
          listDisabled: false
        },
        {
          prop: "bankname",
          label: "银行名称",
          tableStatus: 1,
          listStatus: 0,
          listType: "input",
          listDisabled: true
        },
        {
          prop: "bankno",
          label: "银行帐号",
          tableStatus: 1,
          listStatus: 0,
          listType: "input",
          listDisabled: true
        },
        {
          listType: "无",
          tableStatus: 1,
          listStatus: 0
        },
        {
          listType: "datetime",
          prop: "credate",
          label: "交票日",
          tableStatus: 1,
          listStatus: 0,
          listDisabled: true
        },
        {
          listType: "input",
          prop: "pjlx",
          label: "票据类型",
          tableStatus: 1,
          listStatus: 0,
          listDisabled: true
        },
        {
          listType: "datetime",
          prop: "outdate",
          label: "出票日",
          tableStatus: 1,
          listStatus: 0,
          listDisabled: true
        },
        {
          listType: "datetime",
          prop: "enddate",
          label: "到期日",
          tableStatus: 1,
          listStatus: 0,
          listDisabled: true
        },
        {
          listType: "input",
          prop: "recbankname",
          label: "回款银行",
          tableStatus: 1,
          listStatus: 0,
          listDisabled: true
        },
        {
          listType: "input",
          prop: "bano",
          label: "票号",
          tableStatus: 1,
          listStatus: 0,
          listDisabled: true
        },
        {
          listType: "input",
          prop: "outbankname",
          label: "出票行",
          tableStatus: 1,
          listStatus: 0,
          listDisabled: true
        },
        {
          listType: "inputNumber",
          prop: "totals",
          label: "票据金额",
          tableStatus: 1,
          listStatus: 0,
          listDisabled: true
        },
        {
          listType: "input",
          prop: "outcompany",
          label: "出票单位",
          tableStatus: 1,
          listStatus: 0,
          listDisabled: true
        },
        {
          listType: "input",
          prop: "rectotal",
          label: "已回款金额",
          tableStatus: 1,
          listStatus: 0,
          listDisabled: true
        },
        {
          listType: "input",
          prop: "baid",
          label: "已回款金额",
          tableStatus: 1,
          listStatus: 1,
          listDisabled: true
        }
      ],
      tableData: [],
      tableHeight: 0,
      tableBorder: true,
      //新增
      dialogData: {},
      dialogCustomVisible: false,
      dialogCustomHov: {
        hovTitle: "客户查询",
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "dialogData",
        parentVisible: "dialogCustomVisible",
        hovColumns: [
          {
            id: "customid",
            name: "客户ID",
            value: null,
            queryStatus: true,
            dataStatus: 2,
            fillstatus: 1,
            fillid: "customid"
          },
          {
            id: "customname",
            name: "客户名称",
            value: null,
            queryStatus: true,
            dataStatus: 1,
            fillstatus: 1,
            fillid: "customname"
          }
        ]
      },
      dialogSettlemodeVisible: false,
      dialogSettlemodeHov: {
        hovTitle: "承兑汇票查询",
        hovUrl: "ysk/selectarbainfo",
        afterStatus: false,
        fillDataName: "dialogData",
        parentVisible: "dialogSettlemodeVisible",
        hovColumns: [
          {
            id: "customid",
            name: "客户ID",
            value: null,
            queryStatus: true,
            dataStatus: 2,
            fillstatus: 2,
            tableStatus: true,
            disabled: true
          },
          {
            id: "credate",
            name: "交票日",
            value: null,
            queryStatus: false,
            dataStatus: 2,
            fillstatus: 1,
            type: 'date',
            fillid: "credate"
          },
          {
            id: "pjlx",
            name: "票据类型",
            value: null,
            queryStatus: false,
            dataStatus: 1,
            fillstatus: 1,
            fillid: "pjlx"
          },
          {
            id: "outdate",
            name: "出票日",
            value: null,
            queryStatus: false,
            dataStatus: 1,
            fillstatus: 1,
            type: 'date',
            fillid: "outdate"
          },
          {
            id: "enddate",
            name: "到期日",
            value: null,
            queryStatus: false,
            dataStatus: 2,
            fillstatus: 1,
            type: 'date',
            fillid: "enddate"
          },
          {
            id: "recbankname",
            name: "回款银行",
            value: null,
            queryStatus: false,
            dataStatus: 1,
            fillstatus: 1,
            fillid: "recbankname"
          },
          {
            id: "bano",
            name: "票号",
            value: null,
            queryStatus: false,
            dataStatus: 1,
            fillstatus: 1,
            fillid: "bano"
          },
          {
            id: "outbankname",
            name: "出票行",
            value: null,
            queryStatus: false,
            dataStatus: 2,
            fillstatus: 1,
            fillid: "outbankname"
          },
          {
            id: "total",
            name: "票据金额",
            value: null,
            queryStatus: false,
            dataStatus: 1,
            fillstatus: 1,
            fillid: "totals"
          },
          {
            id: "outcompany",
            name: "出票单位",
            value: null,
            queryStatus: false,
            dataStatus: 1,
            fillstatus: 1,
            fillid: "outcompany"
          },
          {
            id: "rectotal",
            name: "金额",
            value: null,
            queryStatus: false,
            dataStatus: 1,
            fillstatus: 1,
            fillid: "rectotal"
          },
          {
            id: "baid",
            name: "ID",
            value: null,
            queryStatus: false,
            dataStatus: 1,
            fillstatus: 1,
            tableStatus: true,
            fillid: "baid"
          },
          {
            id: "companyid",
            name: "ID",
            value: null,
            queryStatus: true,
            disabled: true,
            dataStatus: 1,
            fillstatus: 1,
            tableStatus: false
          }
        ]
      },
      dialogBankVisible: false,
      dialogBankHov: {
        hovTitle: "银行查询",
        hovUrl: "bankidhov/select",
        afterStatus: false,
        fillDataName: "dialogData",
        parentVisible: "dialogBankVisible",
        hovColumns: [
          {
            id: "bankid",
            name: "银行ID",
            value: null,
            queryStatus: true,
            dataStatus: 2,
            fillstatus: 1,
            fillid: "bankid"
          },
          {
            id: "bankname",
            name: "银行名称",
            value: null,
            queryStatus: true,
            dataStatus: 1,
            fillstatus: 1,
            fillid: "bankname"
          },
          {
            id: "bankno",
            name: "银行帐号",
            value: null,
            queryStatus: false,
            dataStatus: 1,
            fillstatus: 1,
            fillid: "bankno"
          }
        ]
      },
      addVisible: false,
    }
  },
  created() {
    selectDdlIn(this.formList, 'id', 'rectypeid', 'REC_TYPE', [1, 4]);//收款方式初始化
    this.tableHeight = (window.innerHeight - 240);
    this.formData.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.formData.endofdate = new Date(this.getNewDate() + ' 23:59:59');
  },
  methods: {
    dialogHov(data) {
      if (data === 'customid') {//条件客户hov
        this.dialogCustomVisible = true;
      } else if (data === 'settlemode') {
        if (this.dialogData.customid == null) {
          alert("请选择客户ID");
          return;
        }
        disForm(this.dialogSettlemodeHov.hovColumns, 'id', 'customid', 'value', this.dialogData.customid);
        disForm(this.dialogSettlemodeHov.hovColumns, 'id', 'companyid', 'value', Number(sessionStorage.getItem("companyid")));
        this.dialogSettlemodeVisible = true;
      } else if (data === 'bankid') {
        this.dialogBankVisible = true;
      }
    },
    handleQuery(data) {
      //查询表格
      if (data === "query") {
        let pagesize = this.$refs.doctable.pageSize;//分页条数
        this.selectDoc(1, pagesize);
      } else if (data === "add") {//新增表单
        let params = {
          companyid: sessionStorage.getItem('companyid'), companyname: sessionStorage.getItem('companyname'),
          sourceid: 0, sourcetypeid: '8-销售结算总单', rectypeid: 4, settlemode: 1
        };//创建数据默认值集合
        this.dialogData = formDataFormatIn(this.tableColumns, params);//创建新增表单数据单（有默认值）
        this.addVisible = true;
      } else if (data === "reset") {
        let formData = this.$refs.query.formData;//查询条件
        Object.keys(formData).forEach(e => {
          formData[e] = null;
        })
      }
    },
    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let formData = this.$refs.query.formData;//查询条件
      let params = {};
      let keys = Object.keys(formData);
      if (this.formData.startdate !== null && this.formData.startdate !== "") {//判断日期是否有数
        params.startdate = formData.startdate;
      }
      if (this.formData.endofdate !== null && this.formData.endofdate !== "") {//判断日期是否有数
        params.endofdate = formData.endofdate;
      }
      for (let i = 1; i < keys.length; i++) {
        if (formData[keys[i]] != null) {
          params[keys[i]] = formData[keys[i]];
        }
      }
      params.companyid = Number(sessionStorage['companyid']);
      this.tableData = [];
      //查询表格 ajax
      this.$api.financial.selectYsk({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        this.tableData = Object.freeze(res.data.content);
        this.$refs.doctable.currentPage = res.data.pageNum;
        this.$refs.doctable.pageSize = res.data.pageSize;
        this.$refs.doctable.total = res.data.totalSize
      }).catch(error => {
        return false;
      })
    },
    //表格分页查询（同上）
    handlePageChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    //新增表单提交
    submitForm(data) {
      let rectotal = data.data.rectotal;//已回款金额
      let totals = data.data.totals;//票据金额
      let total = data.data.total;//金额
      if (total === 0) {
        alert("金额不能填0");
        return false;
      }
      if (this.dialogData.settlemode === 3) {//结算方式为承兑汇票限制
        if (totals === null && rectotal === null) {
          alert("请选择承兑汇票");
          return false;
        }
        if (Number(total) <= (Number(totals) - Number(rectotal)).toFixed(2)) {

        } else {
          alert('金额必须小于等于承兑汇票可用金额');
          return;
        }
      }
      let params = {};//创建提交数据表单
      params.Ar_Sa_Receive = {};
      params.Ar_Sa_Receive.companyid = Number(data.data.companyid);//公司id
      params.Ar_Sa_Receive.customid = data.data.customid;//客户id
      params.Ar_Sa_Receive.summary = data.data.summary;//备注
      params.Ar_Sa_Receive.rectypeid = Number(data.data.rectypeid);//收款类型
      params.Ar_Sa_Receive.total = Number(data.data.total);//金额
      params.Ar_Sa_Receive.payerid = Number(sessionStorage.getItem('userid'));//收款人
      //params.Ar_Sa_Receive.sourcetypeid=data.data.sourcetypeid;
      //params.Ar_Sa_Receive.sourcetypeid=8;//源单类型
      //params.Ar_Sa_Receive.sourceid=data.data.sourceid;//源单id
      params.Ar_Sa_Receive.settlemode = data.data.settlemode;//结算方式
      params.Ar_Sa_Receive.bankid = data.data.bankid;//银行id
      params.Ar_Rprec_Doc = {};
      params.Ar_Rprec_Doc.companyid = Number(data.data.companyid);//公司id
      params.Ar_Rprec_Doc.customid = data.data.customid;//客户id
      params.Ar_Rprec_Doc.total = Number(data.data.total);//金额
      params.Ar_Rprec_Doc.recmanid = Number(sessionStorage.getItem('userid'));//收款人
      params.Ar_Rprec_Dtl = {};
      params.Ar_Rprec_Dtl.settlemode = data.data.settlemode;//结算方式
      params.Ar_Rprec_Dtl.customid = data.data.customid;//客户id
      params.Ar_Rprec_Dtl.total_line = Number(data.data.total);//金额
      params.Ar_Rprec_Dtl.recbankname = data.data.bankname;//银行id
      params.Ar_Rprec_Dtl.recaccno = data.data.bankno;//银行id
      params.Ar_Rec_Ba = {};
      if (this.dialogData.settlemode === 3) {
        params.Ar_Rec_Ba.baid = data.data.baid;
        params.Ar_Rec_Ba.total = Number(total);
        params.Ar_Rec_Ba.companyid = Number(sessionStorage.getItem("companyid"));
      }
      //新增提交ajax
      this.$api.financial.saveYsk(params).then(res => {
        if (res.code === 200) {
          if (res.msg === "1") {
            alert("保存成功");
            this.closeDialog();
            this.handleQuery('query');
          } else {
            alert(res.msg);
            return false;
          }
        }
      })
    },
    //关闭表单
    closeDialog() {
      this.dialogData = {};
      this.addVisible = false;
    },
    queryHov(data) {
      if (data === 'customid') {//条件客户hov
        this.queryCustomVisible = true;
      }
    }
  }
}
