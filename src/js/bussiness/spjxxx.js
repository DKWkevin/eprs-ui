import SpjxxxDialog from "@/views/Function/Business/SpjxxxDialog";
import SpjxxxQuery from "@/views/Function/Business/SpjxxxQuery";

export default {
  name: 'Spjxxx',
  components: {SpjxxxQuery, SpjxxxDialog},
  data() {
    return {
      formData: {
        goodsid: null, goodsname: null, goodstype: null, goodsunit: null, prodarea: null
      },
      list: [],
      formType: 0,
      formStatus: null,
      status: null,
      tableColumns: [
        {type: 0, tableStatus: 0, prop: 'companyid', label: '客户ID'},
        {type: 0, tableStatus: 0, prop: 'companytype', label: '客户ID'},
        {type: 0, tableStatus: 0, prop: 'jxorxx', label: '客户ID'},
        {type: 0, tableStatus: 0, prop: 'goodsqty', label: '客户ID'},
        {
          prop: 'caozuo', label: '操作', type: 1, tableStatus: 0, options: [
            {id: 'delete', icon: "fa fa-edit", label: "action.delete", perms: "business:spjxxx:delete"}
          ]
        }
      ],
      tableData: [],
      tableHeight: 500,
      dtlVisible: false,
      query: false,
      queryData: {},
      gotopage: true,
      addDoc: true,
      dervice: true,
      dtlGoods: 0,
      goodsqty: null,
      dtlFormData: {
        companyid: '',
        type: 0,
        jxorxx: ''
      },
      type: 0,
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
            {id: "goodsname", name: "货品名称", queryStatus: true, dataStatus: 1, fillid: "goodsname"},
            {id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1},
            {id: "goodstype", name: "规格", queryStatus: false, dataStatus: 1, fillid: 'goodstype'},
            {id: "goodsunit", name: "单位", queryStatus: false, dataStatus: 1, fillid: 'goodsunit'},
            {id: "prodarea", name: "产地", queryStatus: false, dataStatus: 1, fillid: 'prodarea'}
          ]
      },
    }
  },
  created() {
    this.navLoad();
    this.tableHeight = (window.innerHeight - 320);
  },
  methods: {
    addTo(id) {
      if (id === "gotpage") {
        if (this.formType === "1" || this.formType === "2") {
          this.query = true;
        }
      } else if (id === "addDoc") {
        this.dtlGoods = this.formData.goodsid;
        this.dtlVisible = true;
      } else if (id === "dervice") {
        this.$api.spjxxx.dervice().then(res => {
          if (res.code === 200) {
            this.exportExcelDOM(this.tableColumns, res.data, '商品禁销限销' + this.getNewDate())
          }
        }).catch(error => {
          return false;
        })
      }
    },
    handle() {
    },
    queryDoc(data) {
      this.queryData = data;
      this.queryData.goodsid = Number(this.formData.goodsid);
      let pageSize = this.$refs.doctable.pageSize;
      this.$api.bussiness.selectSpjxxxDoc({data: this.queryData, pageSize: pageSize, pageNum: 1}).then(function (res) {
        this.tableData = res.data.content;
        this.$refs.doctable.pageSize = res.data.pageSize;
        this.$refs.doctable.currentPage = res.data.pageNum;
        this.$refs.doctable.total = res.data.totalSize;
      });
    },
    navOpen(groupid) {
      let goodsid = this.formData.goodsid;
      if (goodsid === "" || goodsid === null) {
        alert("请先选择货品");
        return false;
      }
      this.formType = groupid;
      this.queryData = {};
      if (groupid === '1' || groupid === '2') {
        this.formStatus = true;
        this.gotopage = false;
        this.addDoc = false;
        this.dervice = false;
      } else {
        this.formStatus = false;
        this.gotopage = true;
        this.addDoc = true;
        this.dervice = false;
        let data = {};
        data.goodsid = goodsid;
        if (groupid === '3') {
          data.companyid = Number(sessionStorage['companyid']);
          data.companytypearr = '1';
          data.jxorxx = 1;
          data.typearr = '2';
        } else if (groupid === '4') {
          data.companyid = 0;
          data.companytypearr = '1';
          data.jxorxx = 2;
          data.typearr = '3';
        } else if (groupid === '5') {
          data.companyid = 0;
          data.companytypearr = '2';
          data.jxorxx = 2;
          data.typearr = '4';
        }
        this.$api.spjxxx.s(data).then(res => {
          if (res.code === 200) {
            if (res.data.length > 0) {
              this.goodsqty = res.data.goodsqty;
              if (groupid === 3) {
                this.status = 1;
              }
            } else {
              this.goodsqty = null;
              this.status = 0;
            }
            this.dtlFormData.companyid = res.data.companyid;
            this.dtlFormData.type = res.data.type;
            this.dtlFormData.jxorxx = res.data.jxorxx;
          }
        }).catch(error => {
          return false;
        })
      }
    },
    navLoad() {
      var companyid = Number(sessionStorage['companyid']);
      var deptid = Number(sessionStorage['deptid']);
      if (companyid === 19940) {
        if (deptid === 6 || deptid === 94965 || deptid === 117791 || deptid === 202435) {
          this.list.push({groupid: "1", groupname: "批发"});
        } else {
          this.list.push({groupid: "2", groupname: "连锁"});
          this.list.push({groupid: "4", groupname: "麻黄碱"});
          this.list.push({groupid: "5", groupname: "特许店"});
        }
      } else {
        this.list.push({groupid: "3", groupname: "外省"});
      }
    },
    addDoc() {
      let data = {};
      if (this.formType === '3') {
        data.companyid = Number(sessionStorage['companyid']);
        data.companytype = 1;
        data.jxorxx = 1;
        data.type = 2;
      } else if (this.formType === '4') {
        data.companyid = 0;
        data.companytype = 1;
        data.jxorxx = 2;
        data.type = 3;
      } else if (this.formType === '5') {
        data.companyid = 0;
        data.companytype = 2;
        data.jxorxx = 2;
        data.type = 4;
      }
      data.goodsid = this.formData.goodsid;
      this.$api.bussiness.insertSpjxxx(data).then(res => {
        if (res.code === 200) {
          if (res.data === 1) {
            alert("保存成功");
          } else {
            alert(res.data);
            return false;
          }
        }
      }).catch(error => {
        return false;
      })
    },
    deleteDoc() {
      let goodsid = this.formData.goodsid;
      let params = {};
      params.goodsid = this.goodsid;
      params.companyid = this.dtlFormData.companyid;
      params.type = this.dtlFormData.type;
      params.jxorxx = this.dtlFormData.jxorxx;
      this.$api.bussiness.derviceSpjxxx(params).then(res => {
        if (res.code === 200) {
          if (res.data === 1) {
            alert("删除成功");
          } else {
            alert(res.data);
            return false;
          }
        }
      }).catch(error => {
        return false;
      })
    },
    openHov() {
      this.goodsVisible = true;
    }
  }
}
