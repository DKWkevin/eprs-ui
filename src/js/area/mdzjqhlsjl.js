import {paramsFormatDate} from "@/utils/functions";

export default {
  name: "Mdzjqhlsjl",
  data() {
    return {
      mdzjqhlsjlQueryForm: {
        startdate: null,
        endofdate: null,
        counterid: null,
        goodsid: null
      },
      mdzjqhlsjlTableData: [],
      mdzjqhlsjlPageNum: 1,
      mdzjqhlsjlPageSize: 50,
      mdzjqhlsjlTotal: 0,
      mdzjqhlsjlLoading: false,
      mdzjqhlsjlTableHeight: 300,
      mdzjqhlsjlHovVisible: false,
      mdzjqhlsjlHov: {
        hovTitle: '',
        hovUrl: "",
        afterStatus: false,
        fillDataName: "mdzjqhlsjlQueryForm",
        parentVisible: 'mdzjqhlsjlHovVisible',
        hovColumns: []
      },
    }
  },
  created() {
    this.mdzjqhlsjlTableHeight = (window.innerHeight - 240);
    this.mdzjqhlsjlQueryForm.startdate = new Date(this.getNewDate() + ' 00:00:00');
    this.mdzjqhlsjlQueryForm.endofdate = new Date(this.getNewDate() + ' 23:59:59');
    this.getCounter();
  },
  methods: {
    queryFunction() {
      this.selectDoc(1, this.mdzjqhlsjlPageSize);
    },
    handleChange(data) {
      this.selectDoc(data.pageNum, data.pageSize);
    },
    selectDoc(pageNum, pageSize) {
      let params = {};
      let formData = this.mdzjqhlsjlQueryForm;
      params = paramsFormatDate(formData, ['startdate', 'endofdate']);
      params.companyid = Number(sessionStorage['companyid']);
      if (params.hasOwnProperty('startdate') === true && params.hasOwnProperty('endofdate') === true) {
        let time1 = params.endofdate.getTime() - params.startdate.getTime();
        let time2 = 1000 * 3600 * 24 * 30;
        if (time1 > time2) {
          alert("查询时间段不能超过一个月");
          return false;
        }
      }
      this.mdzjqhlsjlLoading = true;
      this.mdzjqhlsjlTableData = [];
      this.$api.area.selectMdzjqhlsjl({pageNum: pageNum, pageSize: pageSize, params: params}).then(res => {
        this.mdzjqhlsjlTableData = res.data.content;
        this.mdzjqhlsjlPageNum = res.data.pageNum;
        this.mdzjqhlsjlPageSize = res.data.pageSize;
        this.mdzjqhlsjlTotal = res.data.totalSize;
        this.mdzjqhlsjlLoading = false;
      }).catch(() => {
        this.mdzjqhlsjlPageNum = 1;
        this.mdzjqhlsjlTotal = 0;
        this.mdzjqhlsjlLoading = false;
        return false;
      })
    },
    openQueryHov(data) {
      let hovTitle = '';
      let hovUrl = '';
      let hovColumns = [];
      if (data === 'counterid') {
        hovTitle = '门店查询';
        hovUrl = "counteridhov/select";
        hovColumns = [
          {id: "counterid", name: "门店ID", queryStatus: true, dataStatus: 2, fillid: "counterid"},
          {id: "countername", name: "门店名称", queryStatus: true, dataStatus: 1},
          {id: "companyopcode", name: "门店操作码", queryStatus: true, dataStatus: 1}
        ]
      } else if (data === 'goodsid') {
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
      }
      this.mdzjqhlsjlHov.hovTitle = hovTitle;
      this.mdzjqhlsjlHov.hovUrl = hovUrl;
      this.mdzjqhlsjlHov.hovColumns = hovColumns;
      this.mdzjqhlsjlHovVisible = true;
    },
    getCounter() {
      //this.$api.hov.selectCounter({pageNum:1,pageSize:999,params:{counterid:Number(sessionStorage['deptid'])}}).then(res => {
      this.$api.hov.selectCounter({pageNum: 1, pageSize: 999, params: {counterid: 210968}}).then(res => {
        console.log(res.data)
      }).catch(() => {
        return false;
      })
    }
  }
}
