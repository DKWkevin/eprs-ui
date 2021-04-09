import {selectbuyid} from "@/utils/drops";
import {selectOption} from "@/utils/functions";

export default {
  name: 'Yfdddy',
  data() {
    return {
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "ordermanagement:yfdddy:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "ordermanagement:yfdddy:select"}
      ],
      formList: [
        {type: 'daterange', id1: 'startdate', id2: 'endofdate', label: '日期'},
        {type: 'inputHov', id: 'supplyid', label: '供应商ID', formWidth: 220, labelWidth: 60},
        {type: 'inputNumber', id: 'orderid', label: '合同ID', formWidth: 220, labelWidth: 50},
        {type: 'select', id: 'buyerid', label: '采购支持', options: [], clearable: true},
      ],
      formData: {
        orderid: null,
        startdate: null,
        endofdate: null,
        supplyid: null,
        buyerid: null
      },
      loading: false,
      docTableHeight: 0,
      docTableColumns: [
        {prop: 'orderid', label: '合同ID', type: 0, tableStatus: 0},
        {prop: 'credate', label: '日  期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'supplyid', label: '供应商ID', type: 0, tableStatus: 0},
        {prop: 'companyname', label: '供应商名称', type: 0, tableStatus: 0},
        {prop: 'buyer', label: '订货人', type: 0, tableStatus: 0},
        {prop: 'usestatusname', label: '状态', type: 0, tableStatus: 0},
        {prop: 'total', label: '金额', type: 0, tableStatus: 0},
        {prop: 'prepayflag', label: '预付完成标志', type: 0, tableStatus: 0},
        {prop: 'sfdate', label: '应完成日期', type: 0, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'bankname', label: '开户行', type: 0, tableStatus: 0},
        {prop: 'accno', label: '帐号', type: 0, tableStatus: 0},
        {prop: 'cgzc', label: '采购支持', type: 0, tableStatus: 0},
        {
          prop: 'caozuo',
          label: '操作',
          fixed: 'right',
          type: 1,
          width: 200,
          widthStatus: true,
          tableStatus: 0,
          options: [
            {id: 'edit', icon: "fa fa-edit", label: "action.selectDtl", perms: "ordermanagement:yfdddy:select"},
            {id: 'print', icon: "fa fa-edit", label: "action.print", perms: "ordermanagement:yfdddy:select"}
          ]
        }
      ],
      docTableData: [],
      pageStatus: false,
      dtlVisible: false,
      dialogWidth: '1000px',
      dialogTop: '10vh',
      dialogTitle: '查询细单',
      dtlTableColumns: [
        {prop: 'orderdtlid', label: '合同细单ID', type: 0, tableStatus: 0},
        {prop: 'goodsid', label: '货品ID', type: 0, tableStatus: 0},
        {prop: 'goodsname', label: '品名', type: 0, tableStatus: 0},
        {prop: 'goodstype', label: '规格', type: 0, tableStatus: 0},
        {prop: 'prodarea', label: '产地', type: 0, tableStatus: 0},
        {prop: 'goodsunit', label: '单位', type: 0, tableStatus: 0},
        {prop: 'realqty', label: '数量', type: 0, tableStatus: 0},
        {prop: 'unitprice', label: '单价', type: 0, tableStatus: 0},
        {prop: 'total_lines', label: '金额', type: 0, tableStatus: 0},
        {prop: 'sumarriveqty', label: '累计到货数量', type: 0, tableStatus: 0},
        {prop: 'arrivaldate', label: '到货日期', type: 2, tableStatus: 0, width: 150, widthStatus: true},
        {prop: 'finishflagname', label: '完成标志', type: 0, tableStatus: 0},
        {prop: 'remqty', label: '合同余额', type: 0, tableStatus: 0},
        {prop: 'tmpgoodsqty', label: '合同占用余额', type: 0, tableStatus: 0},
        {prop: 'memo', label: '备注', type: 0, tableStatus: 0}
      ],
      dtlTableData: [],
      dtlTableHeight: 340,
      printVisible: 'none',
      dtlData: {},
      supplyVisible: false,
      supplyHov: {
        hovTitle: '供应商查询',
        hovUrl: "customidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'supplyVisible',
        hovColumns:
          [
            {id: "customid", name: "供应商ID", queryStatus: true, dataStatus: 2, fillid: "supplyid"},
            {id: "customname", name: "供应商名称", queryStatus: true, dataStatus: 1},
            {id: "customopcode", name: "供应商操作码", queryStatus: true, dataStatus: 1}
          ]
      }
    }
  },
  created() {
    this.docTableHeight = (window.innerHeight - 240);
    selectOption(this.formList, 'buyerid', selectbuyid());
    this.formData.startdate = new Date(this.getNewDate() + " 00:00:00");
    this.formData.endofdate = new Date(this.getNewDate() + " 23:59:59");
  },
  methods: {
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else if (data === "download") {
        exportExcelDOM(this.docTableColumns, this.docTableData, '预付订单打印' + this.getNewDate())
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.formData;
      Object.keys(formData).forEach(e => {
        if (e !== "startdate" && e !== "endofdate") {
          if (this.returnValue(formData[e]) === true) {
            params[e] = formData[e];
          }
        }
      });
      if (this.returnValue(formData.startdate) === true) {
        params.startdate = formData.startdate;
      }
      if (this.returnValue(formData.endofdate) === true) {
        params.endofdate = formData.endofdate;
      }
      if (Object.keys(params).length === 0) {
        alert("请输入查询条件");
        return false;
      }
      params.companyid = Number(sessionStorage['companyid']);
      this.loading = true;
      this.$api.ordermanagement.selectYfdddyDoc({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        if (res.code === 200) {
          this.docTableData = res.data.content;
          this.$refs.doctable.pageNum = res.data.pageNum;
          this.$refs.doctable.pageSize = res.data.pageSize;
          this.$refs.doctable.total = res.data.totalSize;
          this.loading = false;
        }
      }).catch(error => {
        this.loading = false;
        return false;
      })
    },
    handleFunction(data) {
      if (data.id === "edit") {
        this.$api.ordermanagement.selectYfdddyDtl({orderid: data.row.orderid}).then(res => {
          if (res.code === 200) {
            this.dtlTableData = res.data;
          }
        }).catch(error => {
          return false;
        });
        this.dtlVisible = true;
      } else if (data.id === "print") {
        this.dtlData.orderid = data.row.orderid;
        this.dtlData.pcdeptid = data.row.pcdeptid;
        this.$refs.print.status = true;
        //this.printVisible=true;
      }
    },
    openHov(id) {
      if (id === "supplyid") {
        this.supplyVisible = true;
      }
    },
    dialogClose() {
      this.dtlVisible = false;
    },
    returnValue(data) {
      return data !== null && data !== "";
    }
  }
}
