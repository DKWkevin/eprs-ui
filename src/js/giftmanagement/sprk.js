import {
    paramsFormat,
    dateFormat,
} from "@/utils/functions";
import { parseComponent } from "vue-template-compiler";
export default {
    data() {
        return {
            sprk_btnOptions: [
                {
                    id: "query",
                    icon: "fa fa-search",
                    label: "action.search",
                    perms: "freegood:freegoodsSu:select"
                },
                {
                    id: "add",
                    icon: "fa fa-edit",
                    label: "action.add",
                    perms: "freegood:freegoodsSu:insert"
                }
            ],
            sprk_formList: [
                {
                    type: "daterange",
                    id1: "begindate",
                    id2: "enddate",
                    label: "日期"
                  },
                {
                    type: "input",
                    label: "供应商名称",
                    id: "supplyname",
                },

                {
                    type: "inputHov",
                    label: "门店ID",
                    id: "counterid",
                    dataType: "number"
                },
            ],
            sprk_formData: {
                begindate:null,
                enddate:null,
                supplyname: null,
                counterid: null,
            },
            sprk_pageNum: 1,
            sprk_pageSize: 50,
            sprk_pageTotal: 0,
            sprk_tableColumns: [
                { label: "进货单ID", prop: "sudocid", type: 0, tableStatus: 0 },
                { label: "货品ID", prop: "goodsid", type: 0, tableStatus: 0 },
                { label: "品名", prop: "goodsname", type: 0, tableStatus: 0 },
                { label: "规格", prop: "goodstype", type: 0, tableStatus: 0 },
                { label: "单位", prop: "goodsunit", type: 0, tableStatus: 0 },
                { label: "产地", prop: "prodarea", type: 0, tableStatus: 0 },

                { label: "单价", prop: "unitprice", type: 0, tableStatus: 0 },
                { label: "数量", prop: "goodsqty", type: 0, tableStatus: 0 },
                { label: "金额", prop: "total", type: 0, tableStatus: 0 },
                { label: "批号", prop: "lotno", type: 0, tableStatus: 0 },
                { label: "发票号", prop: "invoiceno", type: 0, tableStatus: 0 },
                { label: "结算标识", prop: "settleflag", type: 0, tableStatus: 0 },
                { label: "结算人", prop: "settlemanname", type: 0, tableStatus: 0 },
                { label: "结算日期", prop: "settledate", width: 150, type: 0, tableStatus: 0 },


                { label: "创建日期", prop: "credate", width: 150, type: 0, tableStatus: 0 },
                { label: "门店ID", prop: "counterid", type: 0, tableStatus: 0 },
                { label: "供应商ID", prop: "supplyid", type: 0, tableStatus: 0 },
                { label: "录入人", prop: "inputmanname", type: 0, tableStatus: 0 },
                { label: "公司ID", prop: "companyid", type: 0, tableStatus: 0 },
                { label: "供应商ID", prop: "supplyid", type: 0, tableStatus: 0 },
                { label: "供应商名称", prop: "supplyname", type: 0, tableStatus: 0 },
            ],
            sprk_tableData: [
                // { settleflag: 0, settledate: new Date(), credate: new Date(), }
            ],
            sprk_loading: false,

            //   el-dialog 数据
            sprk_dialogVisible: false,
            sprk_dialogTitle: "",
            sprk_dtlstatus: false, // false 新增  true 修改

            sprk_dialogWidth: "700px",
            sprk_inline: true,
            sprk_dialogLabelWidth: "120px",

            sprk_base: {
                sudocid: null,// 进货单ID
                goodsid: null, // 货品ID
                goodsname: null, //品名
                goodstype: null, // 规格
                goodsunit: null, // 单位
                prodarea: null, // 产地

                unitprice: null, // 价格
                goodsqty: null, // 数量
                total: null, // 金额

                lotno: null, // 金额

                companyid: null,// 公司ID
                companyname: null, // 公司名称
                supplyid: null,// 供应商ID
                supplyname: null,// 供应商名称

                inputmanid: null, // 录入人ID
                inputmanname: null, // 录入人

                memo: null,// 备注
                invoiceno: null,// 发票号
            },

            // hov
            sprk_supplyVisible: false,
            sprk_supplyHov: {
                hovTitle: "供应商查询",
                hovUrl: "companyidhov/selectcompanyid",
                afterStatus: false,
                fillDataName: "sprk_formData",
                parentVisible: "sprk_supplyVisible",
                hovColumns: [
                    {
                        id: "companyid",
                        name: "供应商ID",
                        queryStatus: true,
                        dataStatus: 2,
                        fillid: "supplyid"
                    },
                    {
                        id: "companyname",
                        name: "供应商名称",
                        queryStatus: true,
                        dataStatus: 1,
                        fillid: "supplyname"
                    },
                    {
                        id: "companyopcode",
                        name: "供应商操作码",
                        queryStatus: true,
                        dataStatus: 1
                    }
                ]
            },
            sprk_goodsVisible: false,
            sprk_goodsHov: {
                hovTitle: "商品信息查询",
                hovUrl: "freegoodsSu/selectGoods",
                afterStatus: false,
                fillDataName: "sprk_formData",
                parentVisible: "sprk_goodsVisible",
                hovColumns: [
                    {
                        id: "supplyid",
                        name: "供应商ID",
                        queryStatus: false,
                        dataStatus: 2,
                        fillid: "supplyid"
                    },
                    {
                        id: "supplyname",
                        name: "供应商名称",
                        queryStatus: true,
                        dataStatus: 1,
                        fillid: "supplyname"
                    },
                    {
                        id: "goodsid",
                        name: "货品ID",
                        queryStatus: false,
                        dataStatus: 2,
                        fillid: "goodsid"
                    },
                    {
                        id: "goodsname",
                        name: "货品名称",
                        queryStatus: true,
                        dataStatus: 1,
                        fillid: "goodsname"
                    },
                    {
                        id: "goodstype",
                        name: "规格",
                        queryStatus: false,
                        dataStatus: 1,
                        fillid: "goodstype"
                    },
                    {
                        id: "goodsunit",
                        name: "单位",
                        queryStatus: false,
                        dataStatus: 1,
                        fillid: "goodsunit"
                    },
                    {
                        id: "prodarea",
                        name: "产地",
                        queryStatus: false,
                        dataStatus: 1,
                        fillid: "prodarea"
                    },

                    {
                        id: "unitprice",
                        name: "价格",
                        queryStatus: false,
                        dataStatus: 2,
                        fillid: "unitprice"
                    },


                    // { id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1 }
                ]
            },

            sprk_counterVisible: false,
            sprk_counterHov: {
                hovTitle: '门店查询',
                hovUrl: "counteridhov/select",
                afterStatus: false,
                fillDataName: "sprk_formData",
                parentVisible: 'sprk_counterVisible',
                hovColumns:
                    [
                        { id: "counterid", name: "门店ID", queryStatus: true, dataStatus: 2, fillid: "counterid" },
                        { id: "countername", name: "门店名称", queryStatus: true, dataStatus: 1, fillid: "countername" },
                        { id: "companyopcode", name: "操作码", queryStatus: true, dataStatus: 1 },
                        { id: "companyid", name: "公司ID", queryStatus: true, dataStatus: 2,display:1,value:sessionStorage.getItem("companyid") },
                    ]
            },
        };
    },
    created() {
        this.sprk_formData.begindate = new Date(this.getNewDate()+" 00:00:00");
        this.sprk_formData.enddate = new Date(this.getNewDate()+" 23:59:59");
    },
    methods: {
        queryFunction(data) {
            if (data == "query") {
                this.selectDoc(1, this.sprk_pageSize);
            } else if (data === "add") {
                this.beforeInsert();
            }
        },

        selectDoc(pageNum, pageSize) {

            let params = paramsFormat(this.sprk_formData);
            if(params == null) params = {}
            params.companyid = sessionStorage.getItem("companyid");
            params.begindate = dateFormat('YYYY/mm/dd HH:MM:SS',params.begindate)
            params.enddate = dateFormat('YYYY/mm/dd HH:MM:SS',params.enddate)

            this.sprk_loading = true;
            this.sprk_tableData = [];
            this.$api.giftmanagement
                .selectSprk({
                    pageNum: pageNum,
                    pageSize: pageSize,
                    params: params
                })
                .then(res => {
                    this.sprk_tableData = res.data.content;
                    this.sprk_pageNum = res.data.pageNum;
                    this.sprk_pageSize = res.data.pageSize;
                    this.sprk_pageTotal = res.data.totalSize;
                    this.sprk_loading = false;
                })
                .catch(() => {
                    this.sprk_pageNum = 1;
                    this.sprk_pageTotal = 0;
                    this.sprk_loading = false;
                    return false;
                });
        },

        openHov(data) {
            this.sprk_goodsHov.fillDataName = "sprk_formData";
            this.sprk_supplyHov.fillDataName = "sprk_formData";
            this.sprk_counterHov.fillDataName = "sprk_formData";
            if (data === "goodsid") {
                this.sprk_goodsVisible = true;
            } else if (data === "supplyid") {
                this.sprk_supplyVisible = true;
            } else if (data === "counterid") {
                this.sprk_counterVisible = true;
            }
        },

        openDailogHov(data) {
            this.sprk_goodsHov.fillDataName = "sprk_base";
            this.sprk_supplyHov.fillDataName = "sprk_base";
            this.sprk_counterHov.fillDataName = "sprk_base";
            if (data === "goodsid") {
                this.sprk_goodsVisible = true;
            } else if (data === "supplyid") {
                this.sprk_supplyVisible = true;
            } else if (data === "counterid") {
                this.sprk_counterVisible = true;
            }
        },

        // 分页 size 变化
        handleSizeChange(pageSize) {
            this.sprk_pageSize = pageSize;
            this.selectDoc(this.sprk_pageNum, pageSize);
        },
        // 分页 pageNum 变化
        handleCurrentChange(pageNum) {
            this.sprk_pageNum = pageNum;
            this.selectDoc(pageNum, this.sprk_pageSize);
        },

        // 表格 复选 变化
        tableSelectChange(rows) {
            console.log('表格复选框变化')
        },

        closeDialog() {
            this.sprk_dialogVisible = false;
        },
        openDialog() {
            this.sprk_dialogVisible = true;
        },
        beforeInsert() {
            this.sprk_dialogTitle = "新增";
            this.sprk_dtlstatus = false;
            Object.keys(this.sprk_base).forEach(e => {
                this.sprk_base[e] = null;
            });

            this.sprk_base.companyid = sessionStorage.getItem("companyid");
            this.sprk_base.companyname = sessionStorage.getItem("companyname");
            this.sprk_base.inputmanid = sessionStorage.getItem("userid");
            this.sprk_base.inputmanname = sessionStorage.getItem("username");

            //temp
            //this.sprk_base.unitprice = 5.25

            this.openDialog();
        },


        beforeUpdate(data) {
            this.sprk_dialogTitle = "结算";
            this.sprk_dtlstatus = true;
            Object.keys(this.sprk_base).forEach(e => {
                this.sprk_base[e] = data.row[e];
            });

            this.sprk_base.inputmanid = sessionStorage.getItem("userid");
            this.sprk_base.inputman = sessionStorage.getItem("username");

            this.openDialog();
        },
        save() {
            if (this.sprk_dtlstatus == false) {
                this.insert();
            } else {
                this.update();
            }
        },
        // 新增
        insert() {
            let params = this.sprk_base

            console.log("商品入库 insert p ", params);
            this.$api.giftmanagement
                .insertSprk(params)
                .then(res => {
                    if (res.code == 200) {
                        alert("保存成功");
                        this.afterSave();
                    }
                })
                .catch(e => {
                    return false;
                });
        },
        // 结算
        update() {
            let params = {
                invoiceno: this.sprk_base.invoiceno,
                sudocid: this.sprk_base.sudocid,
                settlemanid: sessionStorage.getItem("userid"),
                settlemanname: sessionStorage.getItem("username"),
            };
            console.log("商品入库 update p ", params);
            this.$api.giftmanagement
                .updateSprk(params)
                .then(res => {
                    if (res.code == 200) {
                        alert("修改成功");
                        this.afterSave();
                    }
                })
                .catch(e => {
                    return false;
                });
        },

        headerStyle({ row, rowIndex }) {
            return "background:linear-gradient(#CDDEF9, #ECF3F9  60%)";
        },
        toDate(dateStr) {
            if (dateStr != null) {
                return new Date(dateStr);
            }
            return null;
        },

        /**
         * 根据单价和数量计算金额
         */
        getTotal() {
            let qty = parseFloat(this.sprk_base.goodsqty);
            let price = parseFloat(this.sprk_base.unitprice);
            let total = (qty * 100) * (price * 100) / 10000;
            total = Math.round(total * 100) / 100
            this.sprk_base.total = total;
        },

        formatter(row, column) {
            let key = column.property
            let value = row[key]
            if (key == "settleflag") {
                if (value == 0) {
                    return "未结算"
                }
                return "已结算"
            }

            if (key.indexOf('date')>=0) {
                return dateFormat("YYYY-mm-dd HH:MM:SS",new Date(value));
            }

            return value;
        },

        setTableHeight() {
            // 设置表格高度
            let height = window.innerHeight - 240;
            //   console.log("table height ", height);
            return height;
        },

        afterSave() {
            // 新增 修改 成功  关闭弹窗 再查询
            this.closeDialog();
            let pageSize = this.sprk_pageSize;
            this.selectDoc(1, pageSize);
        },


    }
};
