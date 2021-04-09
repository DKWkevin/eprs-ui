import {paramsFormat, selectDdlOption, selectOption} from "@/utils/functions";
import {selectbuyid, selectCgfz, selectDept, selectManager} from "@/utils/drops";

export default {
  name: 'Ywzcx',
  data() {
    return {
      formList: [
        {type: 'inputHov', id: 'supplyid', label: '供应商ID'},
        {type: 'inputHov', id: 'goodsid', label: '货品ID'},
        {type: 'inputHov', id: 'companyid', label: '合作伙伴ID'},
        {type: 'select', id: 'pcdtpeid', label: '部门ID', options: [], clearable: true},
        {type: 'select', id: 'usestatus', label: '状态', options: [], clearable: true},
        {type: 'select', id: 'managerid', label: '采购经理', options: [], clearable: true},
        {type: 'select', id: 'buyerid', label: '采购支持', options: [], clearable: true},
        {type: 'select', id: 'class1', label: '采购分组', options: [], clearable: true},
        {type: 'input', id: 'opcode', label: '货品操作码'},
        {type: 'input', id: 'goodsname', label: '货品名称'},
        {type: 'inputHov', id: 'categoryid1', label: '品类1'},
        {type: 'inputHov', id: 'categoryid2', label: '品类2'},
        {type: 'inputHov', id: 'categoryid3', label: '品类3'},
        {type: 'inputHov', id: 'categoryid6', label: '品类6'},
        {type: 'inputHov', id: 'factid', label: '生产企业ID'},
      ],
      formData: {
        supplyid: null, goodsid: null, companyid: null, pcdtpeid: null,
        usestatus: null, buyerid: null, managerid: null, class1: null, opcode: null,
        goodsname: null, categoryid1: null, categoryid2: null, categoryid3: null,
        categoryid6: null, factid: null,
      },
      btnOptions: [
        {id: 'query', icon: "fa fa-search", label: "action.search", perms: "business:ywzcx:select"},
        {id: 'download', icon: "fa fa-download", label: "action.download", perms: "business:ywzcx:select"}
      ],
      tableColumns: [
        {type: 0, prop: 'managername', label: '合作伙伴采购经理', tableStatus: 0, width: 118, widthStatus: true},
        {type: 0, prop: 'buyer', label: '采购支持', tableStatus: 0, width: 70, widthStatus: true},
        {type: 0, prop: 'sm', label: '采购支持说明', tableStatus: 0, width: 94, widthStatus: true},
        {type: 0, prop: 'cgjl', label: '供应商采购经理', tableStatus: 0, width: 110, widthStatus: true},
        {type: 0, prop: 'goodsid', label: '货品ID', tableStatus: 0},
        {type: 0, prop: 'goodsname', label: '品名', tableStatus: 0},
        {type: 0, prop: 'goodstype', label: '规格', tableStatus: 0},
        {type: 0, prop: 'prodarea', label: '产地', tableStatus: 0},
        {type: 0, prop: 'goodsunit', label: '单位', tableStatus: 0},
        {type: 0, prop: 'suprice', label: '渠道进价', tableStatus: 0},
        {type: 5, prop: 'sydbl', label: '上月调拨', tableStatus: 0},
        {type: 0, prop: 'qqdbl', label: '前期调拨', tableStatus: 0},
        {type: 5, prop: 'sysx', label: '上月实销', tableStatus: 0},
        {type: 5, prop: 'qqsx', label: '前期实销', tableStatus: 0},
        {type: 0, prop: 'lskc', label: '连锁库存', tableStatus: 0},
        {type: 0, prop: 'pfkc', label: '批发库存', tableStatus: 0},
        {type: 0, prop: 'lsyxht', label: '连锁有效合同', tableStatus: 0},
        {type: 0, prop: 'pfyxht', label: '批发有效合同', tableStatus: 0},
        {type: 0, prop: 'dhzq', label: '到货周期', tableStatus: 0},
        {type: 0, prop: 'sylsxl', label: '上月连锁销量', tableStatus: 0},
        {type: 5, prop: 'dqkc', label: '地区库存', tableStatus: 0},
        {type: 5, prop: 'lxr', label: '联系人', tableStatus: 0},
        {type: 5, prop: 'jhmx', label: '进货明细', tableStatus: 0},
        {type: 0, prop: 'syjg', label: '上月实际销价', tableStatus: 0},
        {type: 0, prop: 'bzlsj', label: '标准零售价', tableStatus: 0},
        {type: 0, prop: 'mll', label: '毛利率', tableStatus: 0},
        {type: 0, prop: 'prioritiesno', label: '优先级', tableStatus: 0},
        {type: 0, prop: 'supplyid', label: '供应商ID', tableStatus: 0},
        {type: 0, prop: 'supplyname', label: '供应商名称', tableStatus: 0},
        {type: 0, prop: 'companyid', label: '合作伙伴ID', tableStatus: 0},
        {type: 0, prop: 'companyname', label: '合作伙伴名称', tableStatus: 0},
        {type: 0, prop: 'hzhbfl', label: '合作伙伴分类', tableStatus: 0},
        {type: 0, prop: 'hzhbzdxsefl', label: '合作伙伴最大销售额分类', tableStatus: 0},
        {type: 0, prop: 'db', label: '大包', tableStatus: 0},
        {type: 0, prop: 'zb', label: '中包', tableStatus: 0},
        {type: 0, prop: 'aqkc', label: '安全库存', tableStatus: 0},
        {type: 5, prop: 'bkxs', label: '不可销数', tableStatus: 0},
        {type: 5, prop: 'zmsl', label: '账面数量', tableStatus: 0},
        {type: 5, prop: 'ckwt', label: '出库未提', tableStatus: 0},
        {type: 0, prop: 'rolename', label: '角色', tableStatus: 0},
        {type: 0, prop: 'factid', label: '生产企业ID', tableStatus: 0},
        {type: 0, prop: 'factname', label: '生产企业名称', tableStatus: 0},
        {type: 0, prop: 'categoryname1', label: '品类1', tableStatus: 0},
        {type: 0, prop: 'categoryname2', label: '品类2', tableStatus: 0},
        {type: 0, prop: 'categoryname3', label: '品类3', tableStatus: 0},
        {type: 0, prop: 'categoryname4', label: '品类4', tableStatus: 0},
        {type: 0, prop: 'categoryname5', label: '品类5', tableStatus: 0},
        {type: 0, prop: 'categoryname6', label: '品类6', tableStatus: 0},
        {type: 0, prop: 'categoryid6', label: '品类6ID', tableStatus: 0},
        {type: 0, prop: 'classa', label: '药品A分类', tableStatus: 0},
        {type: 0, prop: 'pp', label: '品牌', tableStatus: 0},
        {type: 0, prop: 'pcdtpeid', label: '部门ID', tableStatus: 0},
        {type: 0, prop: 'deptname', label: '部门名称', tableStatus: 0},
        {type: 0, prop: 'groupname', label: '采购分组', tableStatus: 0},
        {type: 0, prop: 'sfjjx', label: '是否季节性', tableStatus: 0},
        {type: 0, prop: 'usestatusname', label: '状态', tableStatus: 0},
      ],
      tableData: [],
      tableHeight: 0,
      loading: false,
      dtlVisible: false,
      dtlvisible: false,
      dtlVisibles: true,
      dtlTitle: '',
      dialogTop: '12vh',
      dialogWidth: '1000px',
      dtlloading: false,
      dtlTableColumns: [],
      dtlData: [],
      dtlHeight: 400,
      wtrStatus: false,
      wtr: null,
      supplyVisible: false,
      supplyHovData: {
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
      },
      category1Visible: false,
      category1Hov: {
        hovTitle: '品类1查询',
        hovUrl: "categoryidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'category1Visible',
        hovColumns:
          [
            {id: "categoryid", name: "品类ID", queryStatus: true, dataStatus: 2, fillid: "categoryid1"},
            {id: "categoryname", name: "品类名称", queryStatus: true, dataStatus: 1},
            {id: "categoryopcode", name: "品类名称", queryStatus: true, dataStatus: 1, value: '1', display: 1},
          ]
      },
      category2Visible: false,
      category2Hov: {
        hovTitle: '品类2查询',
        hovUrl: "categoryidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'category2Visible',
        hovColumns:
          [
            {id: "categoryid", name: "品类D", queryStatus: true, dataStatus: 2, fillid: "categoryid2"},
            {id: "categoryname", name: "品类名称", queryStatus: true, dataStatus: 1},
            {id: "categoryopcode", name: "品类名称", queryStatus: true, dataStatus: 1, value: '2', display: 1},
          ]
      },
      category3Visible: false,
      category3Hov: {
        hovTitle: '品类3查询',
        hovUrl: "categoryidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'category3Visible',
        hovColumns:
          [
            {id: "categoryid", name: "品类ID", queryStatus: true, dataStatus: 2, fillid: "categoryid3"},
            {id: "categoryname", name: "品类名称", queryStatus: true, dataStatus: 1},
            {id: "categoryopcode", name: "品类名称", queryStatus: true, dataStatus: 1, value: '3', display: 1},
          ]
      },
      category6Visible: false,
      category6Hov: {
        hovTitle: '品类6查询',
        hovUrl: "categoryidhov/select",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'category6Visible',
        hovColumns:
          [
            {id: "categoryid", name: "品类ID", queryStatus: true, dataStatus: 2, fillid: "categoryid6"},
            {id: "categoryname", name: "品类名称", queryStatus: true, dataStatus: 1},
            {id: "categoryopcode", name: "品类名称", queryStatus: true, dataStatus: 1, value: '6', display: 1},
          ]
      },
      factidVisible: false,
      factidHov: {
        hovTitle: '生产企业查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "formData",
        parentVisible: 'factidVisible',
        hovColumns:
          [
            {id: "companyid", name: "生产企业ID", queryStatus: true, dataStatus: 2, fillid: "factid"},
            {id: "companyname", name: "生产企业名称", queryStatus: true, dataStatus: 1},
            {id: "companyopcode", name: "生产企业操作码", queryStatus: true, dataStatus: 1}
          ]
      }
    }
  },
  created() {
    this.tableHeight = (window.innerHeight - 240);
    selectOption(this.formList, 'pcdtpeid', selectDept('4,6,83670,83673,94304,94965,117791,202435'));
    selectOption(this.formList, 'usestatus', selectDdlOption('GOODS_USESTATUS'));
    selectOption(this.formList, 'managerid', selectManager());
    selectOption(this.formList, 'buyerid', selectbuyid());
    selectOption(this.formList, 'class1', selectCgfz());
  },
  methods: {
    queryFunction(data) {
      if (data === "query") {
        let pageSize = this.$refs.doctable.pageSize;
        this.selectDoc(1, pageSize);
      } else {
        this.exportExcelDOM(this.tableColumns, this.tableData, '业务帐查询');
      }
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      this.$refs.query.collapse = false;
      let formData = this.formData;
      let params = paramsFormat(formData);
      if (params === null) {
        alert("请填写查询条件");
        return false;
      }
      this.tableData = [];
      this.loading = true;
      this.$api.bussiness.selectYwzcxDoc({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        if (res.code === 200) {
          let content = [];
          res.data.content.forEach(e => {
            e.lxr = "联系人";
            e.jhmx = "进货明细";
            content.push(e);
          });
          this.tableData = Object.freeze(content);
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
    openA(data) {
      if (data.id === "sydbl") {
        this.dtlTitle = '查询上月调拨量';
        this.wtrStatus = false;
        this.dtlTableColumns = [
          {type: 0, tableStatus: 0, prop: 'zy', label: '直营'},
          {type: 0, tableStatus: 0, prop: 'jm', label: '加盟'},
          {type: 0, tableStatus: 0, prop: 'pfxs', label: '批发销售部'}
        ];
        this.dtlVisible = true;
        this.dtlloading = true;
        this.$api.bussiness.selectYwzcxSydbl({goodsid: data.row.goodsid}).then(res => {
          if (res.code === 200) {
            this.dtlData = Object.freeze(res.data);
            this.dtlloading = false;
          }
        }).catch(error => {
          this.dtlloading = false;
          this.dtlVisible = false;
          return false;
        })
      } else if (data.id === "sysx") {
        this.dtlTitle = '查询上月实销';
        this.wtrStatus = false;
        this.dtlTableColumns = [
          {type: 0, tableStatus: 0, prop: 'companyid', label: '公司ID'},
          {type: 0, tableStatus: 0, prop: 'companyname', label: '公司名称'},
          {type: 0, tableStatus: 0, prop: 'goodsqty', label: '销量'}
        ];
        this.dtlVisible = true;
        this.dtlloading = true;
        this.$api.bussiness.selectYwzcxSysx({goodsid: data.row.goodsid}).then(res => {
          if (res.code === 200) {
            this.dtlData = Object.freeze(res.data);
            this.dtlloading = false;
          }
        }).catch(error => {
          this.dtlloading = false;
          this.dtlVisible = false;
          return false;
        })
      } else if (data.id === "qqsx") {
        this.dtlTitle = '查询前期实销';
        this.wtrStatus = false;
        this.dtlTableColumns = [
          {type: 0, tableStatus: 0, prop: 'cityid', label: '公司ID'},
          {type: 0, tableStatus: 0, prop: 'cityname', label: '公司名称'},
          {type: 0, tableStatus: 0, prop: 'goodsqty', label: '销量'}
        ];
        this.dtlVisible = true;
        this.dtlloading = true;
        this.$api.bussiness.selectYwzcxQqsx({goodsid: data.row.goodsid}).then(res => {
          if (res.code === 200) {
            this.dtlData = Object.freeze(res.data);
            this.dtlloading = false;
          }
        }).catch(error => {
          this.dtlloading = false;
          this.dtlVisible = false;
          return false;
        })
      } else if (data.id === "dqkc") {
        this.dtlTitle = '查询地区库存';
        this.dtlTableColumns = [
          {type: 0, tableStatus: 0, prop: 'cityid', label: '城市ID'},
          {type: 0, tableStatus: 0, prop: 'cityname', label: '城市名称'},
          {type: 0, tableStatus: 0, prop: 'kcye', label: '库存'}
        ];
        this.dtlVisible = true;
        this.wtrStatus = false;
        this.dtlloading = true;
        this.$api.bussiness.selectYwzcxDqkc({goodsid: data.row.goodsid}).then(res => {
          if (res.code === 200) {
            this.dtlData = Object.freeze(res.data);
            this.dtlloading = false;
          }
        }).catch(error => {
          this.dtlloading = false;
          this.dtlVisible = false;
          return false;
        })
      } else if (data.id === "lxr") {
        this.dtlTitle = '查询联系人';
        this.wtrStatus = false;
        this.wtrStatus = true;
        this.dtlTableColumns = [
          {type: 0, tableStatus: 0, prop: 'contactman', label: '联系人'},
          {type: 0, tableStatus: 0, prop: 'mobilephone', label: '联系电话'}
        ];
        this.dtlVisible = true;
        this.dtlloading = true;
        this.$api.bussiness.selectYwzcxLxr({companyid: data.row.supplyid}).then(res => {
          if (res.code === 200) {
            this.dtlData = Object.freeze(res.data);
            // this.dtlloading=false;
            this.$api.bussiness.selectYwzcxSqwtr({businessid: data.row.supplyid}).then(res => {
              if (res.code === 200) {
                let str = [];
                res.data.forEach(e => {
                  str.push(e.cfno);
                });
                this.wtr = Object.freeze(str.toString());
                this.dtlloading = false;
              }
            }).catch(error => {
              this.dtlloading = false;
              this.dtlVisible = false;
              return false;
            })
          }
        }).catch(error => {
          this.dtlloading = false;
          return false;
        })
      } else if (data.id === "jhmx") {
        this.dtlTitle = '查询进货明细';
        this.wtrStatus = false;
        this.dtlTableColumns = [
          {type: 2, tableStatus: 0, prop: 'rq', label: '日期'},
          {type: 0, tableStatus: 0, prop: 'companyname', label: '供应商'},
          {type: 0, tableStatus: 0, prop: 'unitprice', label: '单价'},
          {type: 0, tableStatus: 0, prop: 'goodsqty', label: '数量'},
          {type: 0, tableStatus: 0, prop: 'lotno', label: '批号'}
        ];
        this.dtlVisible = true;
        this.dtlloading = true;
        this.$api.bussiness.selectYwzcxJhmx({goodsid: data.row.goodsid}).then(res => {
          if (res.code === 200) {
            this.dtlData = Object.freeze(res.data);
            this.dtlloading = false;
          }
        }).catch(error => {
          this.dtlloading = false;
          this.dtlVisible = false;
          return false;
        })
      } else if (data.id === "bkxs") {
        this.dtlTitle = '查询不可销数';
        this.wtrStatus = false;
        this.dtlTableColumns = [
          {type: 0, tableStatus: 0, prop: 'storename', label: '仓储区域'},
          {type: 0, tableStatus: 0, prop: 'remqty', label: '库存'}
        ];
        this.dtlVisible = true;
        this.dtlloading = true;
        this.$api.bussiness.selectYwzcxBkxs({goodsid: data.row.goodsid}).then(res => {
          if (res.code === 200) {
            this.dtlData = Object.freeze(res.data);
            this.dtlloading = false;
          }
        }).catch(error => {
          this.dtlloading = false;
          this.dtlVisible = false;
          return false;
        })
      } else if (data.id === "zmsl") {
        this.dtlTitle = '查询账面数量';
        this.wtrStatus = false;
        this.dtlTableColumns = [
          {type: 0, tableStatus: 0, prop: 'stcompanyid', label: '保管单位ID'},
          {type: 0, tableStatus: 0, prop: 'stcompanyname', label: '保管单位'},
          {type: 0, tableStatus: 0, prop: 'lotno', label: '批号'},
          {type: 0, tableStatus: 0, prop: 'remqty', label: '库存'}
        ];
        this.dtlVisible = true;
        this.dtlloading = true;
        this.$api.bussiness.selectYwzcxZmsl({goodsid: data.row.goodsid}).then(res => {
          if (res.code === 200) {
            this.dtlData = Object.freeze(res.data);
            this.dtlloading = false;
          }
        }).catch(error => {
          this.dtlloading = false;
          this.dtlVisible = false;
          return false;
        })
      } else if (data.id === "ckwt") {
        this.dtlTitle = '查询出库未提';
        this.wtrStatus = false;
        this.dtlTableColumns = [
          {type: 2, tableStatus: 0, prop: 'credate', label: '日期'},
          {type: 0, tableStatus: 0, prop: 'goodsid', label: '货品ID'},
          {type: 0, tableStatus: 0, prop: 'goodsqty', label: '数量'},
          {type: 0, tableStatus: 0, prop: 'companyname', label: '公司名称'},
          {type: 0, tableStatus: 0, prop: 'lotno', label: '批号'},
          {type: 0, tableStatus: 0, prop: 'sourceid', label: '源单ID'},
          {type: 0, tableStatus: 0, prop: 'ywlx', label: '业务类型'}
        ];
        this.dtlVisible = true;
        this.dtlloading = true;
        this.$api.bussiness.selectYwzcxCkwt({goodsid: data.row.goodsid}).then(res => {
          if (res.code === 200) {
            this.dtlData = Object.freeze(res.data);
            this.dtlloading = false;
          }
        }).catch(error => {
          this.dtlloading = false;
          this.dtlVisible = false;
          return false;
        })
      }
    },
    queryHov(id) {
      if (id === "supplyid") {
        this.supplyVisible = true;
      } else if (id === "goodsid") {
        this.goodsVisible = true;
      } else if (id === "companyid") {
        this.partenerVisible = true;
      } else if (id === "categoryid1") {
        this.category1Visible = true;
      } else if (id === "categoryid2") {
        this.category2Visible = true;
      } else if (id === "categoryid3") {
        this.category3Visible = true;
      } else if (id === "categoryid6") {
        this.category6Visible = true;
      } else if (id === "factid") {
        this.factidVisible = true;
      }
    },
    closeDialog() {
      this.dtlTableColumns = [];
      this.dtlData = [];
      this.dtlVisible = false;
    }
  }
}
