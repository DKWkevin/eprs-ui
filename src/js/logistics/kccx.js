import {dateFormat, selectDdl, selectOption} from "@/utils/functions";
import {selectbuyid, selectWldw} from "@/utils/drops";

export default {
  name: 'Kccx',
  data() {
    return {
      deptid: 6,
      labelWidth: 100,
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "logistics:kccx:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "logistics:kccx:select"}
      ],
      formList: [
        {type: 'inputHov', id: 'goodsid', label: '商品ID', formWidth: 160, labelWidth: 50},
        {
          type: 'select',
          id: 'goodsstatusid',
          label: '货品状态',
          clearable: true,
          options: [{value: 1, label: '可销'}, {value: 2, label: '不可销'}]
        },
        {type: 'inputHov', id: 'supplyid', label: '供应商', formWidth: 160, labelWidth: 50},
        {type: 'inputHov', id: 'partener', label: '合作伙伴', formWidth: 170, labelWidth: 65},
        {type: 'select', id: 'buyerid', label: '采购支持', options: [], clearable: true},
        {type: 'select', id: 'usestatus', label: '状态', options: [], clearable: true},
        {
          type: 'select',
          id: 'buydeptid',
          label: '进货部门',
          options: [{value: 6, label: '批发'}, {value: 83672, label: '连锁'}],
          clearable: true
        },
        {type: 'select', id: 'stcompanyid', label: '物流单位', options: [], clearable: true}
      ],
      formData: {
        supplyid: null,
        goodsstatusid: null,
        goodsid: null,
        partener: null,
        usestatus: null,
        buyerid: null,
        buydeptid: null,
        stcompanyid: null
      },
      tableIndex: null,
      tableAqkc: null,
      tableHeight: 0,
      loading: false,
      tableData: [],
      currentPage: 1,//分页当前页
      pageSize: 50,//分页每页条数
      layout: 'prev,pager,next,sizes,total',//分页初始化
      total: 0,//分页总条数
      goodsVisible: false,
      goodsHov: {
        hovTitle: '货品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'goodsVisible',
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
      supplyVisible: false,
      supplyHov: {
        hovTitle: '供应商查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'supplyVisible',
        hovColumns:
          [
            {id: "companyid", name: "供应商ID", queryStatus: true, dataStatus: 2, fillid: "supplyid"},
            {id: "companyname", name: "供应商名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "供应商操作码", queryStatus: true, dataStatus: 1}
          ]
      },
      partenerVisible: false,
      partenerHov: {
        hovTitle: '合作伙伴查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'partenerVisible',
        hovColumns:
          [
            {id: "companyid", name: "合作伙伴ID", queryStatus: true, dataStatus: 2, fillid: "partener"},
            {id: "companyname", name: "合作伙伴名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "合作伙伴操作码", queryStatus: true, dataStatus: 1}
          ]
      }
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240) + 'px';
    selectOption(this.formList, 'buyerid', selectbuyid());
    selectDdl(this.formList, 'id', 'usestatus', 'GOODS_USESTATUS');
    selectOption(this.formList, 'stcompanyid', selectWldw());
  },
  methods: {
    openHov(id) {
      if (id === "supplyid") {
        this.supplyVisible = true;
      } else if (id === "goodsid") {
        this.goodsVisible = true;
      } else if (id === "partener") {
        this.partenerVisible = true;
      }
    },
    queryFunction(data) {
      if (data === 'query') {
        let pageSize = this.pageSize;
        this.seletDoc(1, pageSize);
      } else {
        let tableColumns = [
          {prop: 'goodsid', label: '货品ID'},
          {prop: 'goodsname', label: '品名'},
          {prop: 'goodstype', label: '规格'},
          {prop: 'goodsunit', label: '单位'},
          {prop: 'prodarea', label: '产地'},
          {prop: 'lotno', label: '批号'},
          {prop: 'proddate', label: '生产日期'},
          {prop: 'invaliddate', label: '失效日期'},
          {prop: 'remqty', label: '库存'},
          {prop: 'unitprice', label: '进价'},
          {prop: 'aqkc', label: '安全库存'},
          {prop: 'buydeptid', label: '进货部门ID'},
          {prop: 'buydeptname', label: '进货部门名称'},
          {prop: 'goodsstatus', label: '货品状态'},
          {prop: 'inbatchid', label: '内部批次ID'},
          {prop: 'outbatchid', label: '外部批次ID'},
          {prop: 'supplyid', label: '供应商ID'},
          {prop: 'supplyname', label: '供应商名称'},
          {prop: 'buyer', label: '采购支持'},
          {prop: 'usestatusname', label: '状态'},
          {prop: 'stcompanyid', label: '保管单位ID'},
          {prop: 'stcompanyname', label: '保管单位名称'}
        ];
        this.exportExcelDOM(tableColumns, this.tableData, '库存查询' + this.getNewDate());
      }
    },
    handleCurrentChange(val) {
      this.seletDoc(val, this.pageSize);
    },
    handleSizeChange(val) {
      this.seletDoc(this.currentPage, val);
    },
    seletDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let formData = this.formData;
      let params = {};
      Object.keys(formData).forEach(e => {
        if (formData[e] !== null && formData[e] !== '') {
          params[e] = formData[e];
        }
      });
      params.companyid = Number(sessionStorage['companyid']);
      this.tableData = [];
      this.loading = true;
      this.$api.logistics.selectKccx({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        if (res.code === 200) {
          this.tableData = Object.freeze(res.data.content);
          this.pageNum = res.data.pageNum;
          this.pageSize = res.data.pageSize;
          this.total = res.data.totalSize;
          this.loading = false;
        }
      }).catch(error => {
        this.loading = false;
        return false;
      })
    },
    aqkc(row, column, cell, event) {
      this.tableIndex = row.index;
      this.tableAqkc = row.aqkc;
    },
    saveAqkc(row) {
      let aqkc = row.aqkc;
      let inbatchid = row.inbatchid;
      if (aqkc.length === 0) {
        alert('安全库存不能为空！');
        return false;
      }
      if (confirm('是否保存')) {
        this.$api.logistics.updateAqkc({aqkc: aqkc, inbatchid: inbatchid}).then(res => {
          if (res.code === 200) {
            if (res.data === 1) {
              alert("保存成功");
              this.tableIndex = null;
              this.tableAqkc = null;
            } else {
              return false;
            }
          }
        }).catch(error => {
          return false;
        })
      }
    },
    closeAqkc(row) {
      row.aqkc = this.tableAqkc;
      this.tableIndex = null;
      this.tableAqkc = null;
    },
    tableRowClassName({row, rowIndex}) {
      row.index = rowIndex
    },
    headerStyle({row, rowIndex}) {
      return "background:linear-gradient(#CDDEF9, #ECF3F9  60%)";
    },
    dateFormat(format, date) {
      return dateFormat(format, date);
    },
  }
}
