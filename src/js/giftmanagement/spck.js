import {
    paramsFormat,
    dateFormat,
} from "@/utils/functions";
import { parseComponent } from "vue-template-compiler";
export default {
    data() {
        return {
            spck_btnOptions: [
                {
                    id: "query",
                    icon: "fa fa-search",
                    label: "action.search",
                    perms: "fgzpck:select"
                },
                {
                    id: "add",
                    icon: "fa fa-edit",
                    label: "action.add",
                    perms: "fgzpck:insert"
                }
            ],
            spck_formList: [
                {
                    type: "daterange",
                    id1: "begindate",
                    id2: "enddate",
                    label: "日期"
                },

                {
                    type: "inputHov",
                    label: "门店ID",
                    id: "counterid",
                    dataType: "number"
                },
            ],
            spck_formData: {
                begindate: null,
                enddate: null,
                counterid: null,
            },
            spck_pageNum: 1,
            spck_pageSize: 50,
            spck_pageTotal: 0,
            spck_tableColumns: [
                { label: "细单ID", prop: "dtlid", type: 0, tableStatus: 0 },
                { label: "货品ID", prop: "goodsid", type: 0, tableStatus: 0 },
                { label: "品名", prop: "goodsname", type: 0, tableStatus: 0 },
                { label: "规格", prop: "goodstype", type: 0, tableStatus: 0 },
                { label: "单位", prop: "goodsunit", type: 0, tableStatus: 0 },
                { label: "产地", prop: "prodarea", type: 0, tableStatus: 0 },

                { label: "单价", prop: "unitprice", type: 0, tableStatus: 0 },
                { label: "数量", prop: "goodsqty", type: 0, tableStatus: 0 },
                { label: "金额", prop: "total", type: 0, tableStatus: 0 },
                { label: "批号", prop: "lotno", type: 0, tableStatus: 0 },
            
                { label: "创建日期", prop: "credate", width: 150, type: 2, tableStatus: 0 },
                { label: "门店ID", prop: "counterid", type: 0, tableStatus: 0 },
                { label: "录入人", prop: "inputmanname", type: 0, tableStatus: 0 },
                { label: "公司ID", prop: "companyid", type: 0, tableStatus: 0 },
                { label: "公司名称", prop: "companyname", type: 0, tableStatus: 0 },
            ],
            spck_tableData: [
                // { settleflag: 0, settledate: new Date(), credate: new Date(), }
            ],
            spck_loading: false,

            //   el-dialog 数据
            spck_dialogVisible: false,
            spck_dialogTitle: "",
            spck_dtlstatus: false, // false 新增  true 修改

            spck_dialogWidth: "700px",
            spck_inline: true,
            spck_dialogLabelWidth: "120px",

            spck_base: {
                dtlid: null,// 细单ID
                goodsid: null, // 货品ID
                goodsname: null, //品名
                goodstype: null, // 规格
                goodsunit: null, // 单位
                prodarea: null, // 产地

                unitprice: null, // 价格
                goodsqty: null, // 数量
                total: null, // 金额

                lotno: null, // 批号

                companyid: null,// 公司ID
                companyname: null, // 公司名称
                supplyid: null,// 供应商ID
                supplyname: null,// 供应商名称

                inputmanid: null, // 录入人ID
                inputmanname: null, // 录入人

                memo: null,// 备注
                invoiceno: null,// 发票号


                rsdocid:null,
                rstotal:null,
                rscredate:null,

            },

            // hov
            spck_supplyVisible: false,
            spck_supplyHov: {
                hovTitle: "供应商查询",
                hovUrl: "companyidhov/selectcompanyid",
                afterStatus: false,
                fillDataName: "spck_formData",
                parentVisible: "spck_supplyVisible",
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

            spck_rsdocidVisible: false,
            spck_rsdocidHov: {
                hovTitle: "销售单查询",
                hovUrl: "fgzpckdochov/select",
                afterStatus: false,
                fillDataName: "spck_formData",
                parentVisible: "spck_rsdocidVisible",
                hovColumns: [
                    {
                        id: "rsdocid",
                        name: "销售单ID",
                        queryStatus: true,
                        dataStatus: 2,
                        fillid: "rsdocid"
                    },
                    {
                        id: "rscredate",
                        name: "销售日期",
                        queryStatus: false,
                        dataStatus: 1,
                        type: 'date',
                        fillid: "rscredate"
                    },
                    {
                        id: "rstotal",
                        name: "销售金额",
                        queryStatus: false,
                        dataStatus: 2,
                        fillid: "rstotal"
                    },
                    {
                        id: "counterid",
                        name: "门店ID",
                        queryStatus: true,
                        dataStatus: 2,
                        disabled: true,
                        value: null,
                    }
                ]
            },


            spck_goodsVisible: false,
            spck_goodsHov: {
                hovTitle: "商品信息查询",
                hovUrl: "fgzpckhov/select",
                afterStatus: true,
                fillDataName: "spck_formData",
                parentVisible: "spck_goodsVisible",
                hovColumns: [
                    {
                        id: "goodsid",
                        name: "货品ID",
                        queryStatus: true,
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
                    {
                        id: "remqty",
                        name: "数量",
                        queryStatus: false,
                        dataStatus: 2,
                        fillid: "goodsqty"
                    },
                    {
                        id: "lotno",
                        name: "批号",
                        queryStatus: false,
                        dataStatus: 1,
                        fillid: "lotno"
                    },
                    
                    // 必传项
                    { id: "companyid", name: "公司ID", queryStatus: true, dataStatus: 2,display:1,value:sessionStorage.getItem("companyid") },
                    { id: "counterid", name: "门店ID", queryStatus: true, dataStatus: 2,display:1,value:sessionStorage.getItem("deptid") },
                    // { id: "opcode", name: "货品操作码", queryStatus: true, dataStatus: 1 }
                ]
            },

            spck_counterVisible: false,
            spck_counterHov: {
                hovTitle: '门店查询',
                hovUrl: "counteridhov/select",
                afterStatus: false,
                fillDataName: "spck_formData",
                parentVisible: 'spck_counterVisible',
                hovColumns:
                    [
                        { id: "counterid", name: "门店ID", queryStatus: true, dataStatus: 2, fillid: "counterid" },
                        { id: "countername", name: "门店名称", queryStatus: true, dataStatus: 1, fillid: "countername" },
                        { id: "companyopcode", name: "公司操作码", queryStatus: true, dataStatus: 1 },
                        { id: "companyid", name: "公司ID", queryStatus: true, dataStatus: 2,display:1,value:sessionStorage.getItem("companyid") },
                    ]
            },
        };
    },
    created() {
        this.spck_formData.begindate = new Date(this.getNewDate() + " 00:00:00");
        this.spck_formData.enddate = new Date(this.getNewDate() + " 23:59:59");
    },
    methods: {
        queryFunction(data) {
            if (data == "query") {
                this.selectDoc(1, this.spck_pageSize);
            } else if (data === "add") {
                this.beforeInsert();
            }
        },

        selectDoc(pageNum, pageSize) {

            let params = paramsFormat(this.spck_formData);
            if(params == null)params = {};
            params.counterid = sessionStorage.getItem("deptid")
            this.spck_loading = true;
            this.spck_tableData = [];
            this.$api.giftmanagement
                .selectSpck({
                    pageNum: pageNum,
                    pageSize: pageSize,
                    params: params
                })
                .then(res => {
                    this.spck_tableData = res.data.content;
                    this.spck_pageNum = res.data.pageNum;
                    this.spck_pageSize = res.data.pageSize;
                    this.spck_pageTotal = res.data.totalSize;
                    this.spck_loading = false;
                })
                .catch(() => {
                    this.spck_pageNum = 1;
                    this.spck_pageTotal = 0;
                    this.spck_loading = false;
                    return false;
                });
        },
        getRsInfo(){
            let counterid = this.spck_base.counterid;
            let rsdocid = this.spck_base.rsdocid;
            if (counterid == null) {
                alert("请先选择门店")
                return;
            }
            this.$api.giftmanagement.selectSpckRsInfo({rsdocid,counterid})
            .then(res=>{
                if(JSON.stringify(res.data) == "{}"){
                    this.spck_base.rsdocid = null;
                    alert('没有查询到销售日期和销售金额')
                    return;
                }
                this.spck_base.rscredate = res.data.rscredate;
                this.spck_base.rstotal = res.data.rstotal;
            })
        },
        openHov(data) {
            this.spck_goodsHov.fillDataName = "spck_formData";
            this.spck_supplyHov.fillDataName = "spck_formData";
            this.spck_counterHov.fillDataName = "spck_formData";
            this.spck_rsdocidHov.fillDataName = "spck_formData";
            if (data === "goodsid") {
                this.spck_goodsVisible = true;
            } else if (data === "supplyid") {
                this.spck_supplyVisible = true;
            } else if (data === "counterid") {
                this.spck_counterVisible = true;
            } else if (data === "rsdocid") {
                this.spck_rsdocidVisible = true;
            }
        },

        openDailogHov(data) {
            this.spck_goodsHov.fillDataName = "spck_base";
            this.spck_supplyHov.fillDataName = "spck_base";
            this.spck_counterHov.fillDataName = "spck_base";
            this.spck_rsdocidHov.fillDataName = "spck_base";
            if (data === "goodsid") {
                this.spck_goodsVisible = true;
            } else if (data === "supplyid") {
                this.spck_supplyVisible = true;
            } else if (data === "counterid") {
                this.spck_counterVisible = true;
            } else if (data === "rsdocid") {
                this.spck_rsdocidVisible = true;
            }
        },

        // 分页 size 变化
        handleSizeChange(pageSize) {
            this.spck_pageSize = pageSize;
            this.selectDoc(this.spck_pageNum, pageSize);
        },
        // 分页 pageNum 变化
        handleCurrentChange(pageNum) {
            this.spck_pageNum = pageNum;
            this.selectDoc(pageNum, this.spck_pageSize);
        },

        // 表格 复选 变化
        tableSelectChange(rows) {
            console.log('表格复选框变化')
        },

        closeDialog() {
            this.spck_dialogVisible = false;
        },
        openDialog() {
            this.spck_dialogVisible = true;
        },
        beforeInsert() {
            this.spck_dialogTitle = "新增";
            this.spck_dtlstatus = false;
            Object.keys(this.spck_base).forEach(e => {
                this.spck_base[e] = null;
            });

            this.spck_base.companyid = sessionStorage.getItem("companyid");
            this.spck_base.companyname = sessionStorage.getItem("companyname");
            this.spck_base.inputmanid = sessionStorage.getItem("userid");
            this.spck_base.inputmanname = sessionStorage.getItem("username");

            this.spck_base.counterid = sessionStorage.getItem("deptid");
            this.spck_base.countername = sessionStorage.getItem("deptname");

            //temp
            //this.spck_base.unitprice = 5.25

            this.openDialog();
        },


        beforeUpdate(data) {
            this.spck_dialogTitle = "结算";
            this.spck_dtlstatus = true;
            Object.keys(this.spck_base).forEach(e => {
                this.spck_base[e] = data.row[e];
            });

            this.spck_base.inputmanid = sessionStorage.getItem("userid");
            this.spck_base.inputman = sessionStorage.getItem("username");

            this.openDialog();
        },
        save() {
            if (this.spck_dtlstatus == false) {
                this.insert();
            } else {
                this.update();
            }
        },
        // 新增
        insert() {
            let params = this.spck_base

            console.log("商品出库 insert p ", params);
            this.$api.giftmanagement
                .insertSpck(params)
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
                invoiceno: this.spck_base.invoiceno,
                sudocid: this.spck_base.sudocid,
                inputmanid: sessionStorage.getItem("userid"),
                inputman: sessionStorage.getItem("username"),
            };
            console.log("商品出库 update p ", params);
            this.$api.giftmanagement
                .updateSpck(params)
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
            let qty = parseFloat(this.spck_base.goodsqty);
            let price = parseFloat(this.spck_base.unitprice);
            let total = (qty * 100) * (price * 100) / 10000;
            total = Math.round(total * 100) / 100
            this.spck_base.total = total;
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

            if (value instanceof Date) {
                return dateFormat('YYYY-mm-dd HH:MM:SS', value);
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
            let pageSize = this.spck_pageSize;
            this.selectDoc(1, pageSize);
        },


    }
};