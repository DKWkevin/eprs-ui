import {paramsFormatDate} from "@/utils/functions";
import Xsdcxdy from "../../views/Function/Pfsales/Xsdcxdy";

export default {
  name: "xsdcx",
  components: {Xsdcxdy},
  data() {
    return {
      xsdcxQueryForm: {
        startdate: null,
        endofdate: null,
        customid: null,
        employeeid: null,
        salesid: null,
        usestatus: null,
        usestatus1sel: null
      },
      xsdcxTableData: [],
      xsdcxSumTotal: 0,
      xsdcxPageNum: 1,
      xsdcxPageSize: 50,
      xsdcxTotal: 0,
      xsdcxLoading: false,
      xsdcxTableHeight: 300,
      xsdcxDialog: '',
      xsdcxStatus: false,
      xsdcxDtlColumns: [],
      xsdcxDtlForm: [],
      xsdcxDtlLoading: false,
      xsdcxUsestateOptions: [{value: 1, label: '临时'}, {value: 2, label: '正式'}, {value: 3, label: '已发送至物流'}],
      xsdcxUsestatus1selOptions: [{value: 0, label: '外销'}, {value: 1, label: '内销'}],
      xsdcxPrintStatus: false,
      xsdcxDtlData: {},
      xsdcxHovVisible: false,
      xsdcxHov: {
        hovTitle: '',
        hovUrl: "",
        afterStatus: false,
        fillDataName: "xsdcxQueryForm",
        parentVisible: 'xsdcxHovVisible',
        hovColumns: []
      },
    }
  },
  created() {
    this.xsdcxTableHeight = (window.innerHeight - 280);
  },
  methods: {
    queryFunction() {
      this.selectDoc(1, this.xsdcxPageSize);
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.xsdcxQueryForm;
      params = paramsFormatDate(formData, ['startdate', 'endofdate']);
      params.companyid = Number(sessionStorage['companyid']);
      this.xsdcxLoading = true;
      this.xsdcxTableData = [];
      this.$api.pfsales.selectXsdcxDoc({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        let tableData = res.data.content;
        let num = res.data.pageNum;
        let size = res.data.pageSize;
        let totalsize = res.data.totalSize;
        this.$api.pfsales.selectXsdcxSum({pageNum: pageNum, pageSize: pageSize, params: params}).then(sum => {
          this.xsdcxSumTotal = sum.data.content;
          this.xsdcxTableData = tableData;
          this.xsdcxPageNum = num;
          this.xsdcxPageSize = size;
          this.xsdcxTotal = totalsize;
          this.xsdcxLoading = false;
        }).catch(() => {
          this.xsdcxPageNum = 1;
          this.xsdcxTotal = 0;
          this.xsdcxSumTotal = 0;
          this.xsdcxLoading = false;
          return false;
        })
      }).catch(() => {
        this.xsdcxPageNum = 1;
        this.xsdcxTotal = 0;
        this.xsdcxSumTotal = 0;
        this.xsdcxLoading = false;
        return false;
      })
    },
    //查看细单
    selectDtl(row) {
      this.xsdcxDialog = '查看细单';
      this.xsdcxStatus = true;
      this.xsdcxDtlLoading = true;
      this.xsdcxDtlForm = [
        {prop: "goodsid", label: "货品ID"},
        {prop: "goodsname", label: "品名"},
        {prop: "goodstype", label: "规格"},
        {prop: "goodsunit", label: "单位"},
        {prop: "prodarea", label: "产地"},
        {prop: "lotno", label: "批号"},
        {prop: "goodsqty", label: "数量"},
        {prop: "unitprice", label: "单价"},
        {prop: "total_lines", label: "金额"},
        {prop: "notaxmoney", label: "无税金额"},
        {prop: "taxmoney", label: "税额"},
        {prop: "taxrate", label: "税率"},
        {prop: "refpriceid", label: "参考单价ID"},
        {prop: "refprince", label: "参考单价"},
        {prop: "backqty", label: "已退货数量"},
        {prop: "stcompanyid", label: "保管单位ID"},
        {prop: "stcompanyname", label: "保管单位"},
        {prop: "salesid", label: "销售单ID"},
        {prop: "sadtlid", label: "销售细单ID"},
        {prop: "outbatchid", label: "外部批次"},
        {prop: "inbatchid", label: "内部批次"}
      ];
      this.$api.pfsales.selectXsdcxDtl({salesid: row.salesid}).then(res => {
        this.xsdcxDtlForm = res.data;
        this.xsdcxDtlLoading = false;
      }).catch(() => {
        this.xsdcxDtlLoading = false;
        return false;
      })
    },
    //物流信息查询
    selectWl(row) {
      this.xsdcxDialog = '查看物流状态';
      this.xsdcxStatus = true;
      this.xsdcxDtlLoading = true;
      this.xsdcxDtlForm = [
        {prop: "status", label: "状态"},
        {prop: "transtypename", label: "发货方式"},
        {prop: "trackingno", label: "快递单号"}
      ];
      this.$api.pfsales.selectXsdcxWl({
        salesid: row.salesid,
        customid: row.customid,
        stcompanyid: row.stcompanyid
      }).then(res => {
        this.xsdcxDtlForm = res.data;
        this.xsdcxDtlLoading = false;
      }).catch(() => {
        this.xsdcxDtlLoading = false;
        return false;
      })
    },
    printDtl() {
      this.xsdcxDtlData.salesid = 1;
      this.xsdcxDtlData.inputmanname = Number(sessionStorage['username']);
      this.xsdcxDtlData.stcompanyid = 19940;
      this.xsdcxPrintStatus = true;
    },
    //确认
    confirmDtl(row, index) {
      if (row.usestatusname === '临时') {
        if (confirm("是否确认") === true) {
          this.$api.pfsales.confirmXsdcx({confirmXsdcx: row.confirmXsdcx}).then(res => {
            if (res.code === 200) {
              if (res.data > 0) {
                alert("确认成功");
              } else {
                alert(res.msg);
              }
            }
          }).catch(() => {
            return false;
          })
        } else {
          return false;
        }
      } else {
        alert("状态不为临时，不能确认！");
        return false;
      }
    },
    openQueryHov(data) {
      let hovTitle = '';
      let hovUrl = '';
      let hovColumns = [];
      if (data === 'customid') {
        hovTitle = '客户查询';
        hovUrl = "customidhov/select";
        hovColumns = [
          {id: "customid", name: "客户ID", queryStatus: true, dataStatus: 2, fillid: "customid"},
          {id: "customname", name: "客户名称", queryStatus: true, dataStatus: 1}
        ]
      } else if (data === 'employeeid') {
        hovTitle = '销售员查询';
        hovUrl = "employeeididhov/select";
        hovColumns = [
          {id: "employeeid", name: "销售员ID", queryStatus: true, dataStatus: 2, fillid: "employeeid"},
          {id: "employeename", name: "销售员名称", queryStatus: true, dataStatus: 1},
          {id: "employeeopcode", name: "销售员操作码", queryStatus: true, dataStatus: 1}
        ]
      }
      this.xsdcxHov.hovTitle = hovTitle;
      this.xsdcxHov.hovUrl = hovUrl;
      this.xsdcxHov.hovColumns = hovColumns;
      this.xsdcxHovVisible = true;
    },
    download() {
      let tableColumns = [
        {prop: "salesid", label: "销售单ID"},
        {prop: "customid", label: "客户ID"},
        {prop: "customname", label: "客户名称"},
        {prop: "credate", label: "日期"},
        {prop: "saler", label: "销售员"},
        {prop: "total", label: "金额"},
        {prop: "dtllines", label: "笔数"},
        {prop: "stioflag", label: "记账标志"},
        {prop: "stiodate", label: "记账日期"},
        {prop: "usestatusname", label: "状态"},
        {prop: "inputman", label: "录入人"},
        {prop: "salesdept", label: "销售部门"},
        {prop: "companyid", label: "公司ID"},
        {prop: "companyname", label: "公司名称"},
        {prop: "sudept", label: "进货部门"},
        {prop: "paymodename", label: "付款方式"},
        {prop: "payterm", label: "账期"},
        {prop: "salesmode", label: "经销方式"},
        {prop: "selfflagname", label: "内销/外销"},
        {prop: "memo", label: "备注"}
      ];
      this.exportExcelDOM(tableColumns, this.xsdcxTableData, '销售单查询');
    },
    dialogClose() {
      this.xsdcxDtlForm = [];
      this.xsdcxDialog = '';
      this.xsdcxStatus = false;
    }
  }
}
