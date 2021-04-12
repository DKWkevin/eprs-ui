import {
    paramsFormat,
    dateFormat,
} from "@/utils/functions";
import { DatePicker } from "element-ui";
export default {
    data() {
        return {
            jxccx_btnOptions: [
                {
                    id: "query",
                    icon: "fa fa-search",
                    label: "action.search",
                    perms: "fgzpjxc:select"
                },
                // {
                //     id: "add",
                //     icon: "fa fa-edit",
                //     label: "action.add",
                //     perms: "freegood:freegoods:insert"
                // }
            ],
            jxccx_formList: [
                {
                    type: "inputHov",
                    label: "门店ID",
                    id: "counterid",
                    dataType: "number"
                },
                {
                    type: "inputHov",
                    label: "公司ID",
                    id: "companyid",
                },
            ],
            jxccx_formData: {
                counterid: null,
                supplyid: null
            },
            jxccx_pageNum: 1,
            jxccx_pageSize: 50,
            jxccx_pageTotal: 0,
            jxccx_tableColumns: [
                { label: "公司ID", prop: "companyid", type: 0, tableStatus: 0 },
                { label: "公司名称", prop: "dq", type: 0, tableStatus: 0 },
                { label: "门店ID", prop: "counterid", type: 0, tableStatus: 0 },
                { label: "门店名称", prop: "md", type: 0, tableStatus: 0 },
                { label: "货品ID", prop: "goodsid", type: 0, tableStatus: 0 },
                { label: "货品名称", prop: "goodsname", type: 0, tableStatus: 0 },

                { label: "入库日期", prop: "rkrq", width: 150, type: 2, tableStatus: 0 },
                { label: "入库数量", prop: "rksl", type: 0, tableStatus: 0 },
                { label: "入库单号", prop: "rkdh", type: 0, tableStatus: 0 },
                { label: "入库金额", prop: "rkje", type: 0, tableStatus: 0 },

                { label: "出库日期", prop: "ckrq", width: 150, type: 2, tableStatus: 0 },
                { label: "出库数量", prop: "cksl", type: 0, tableStatus: 0 },
                { label: "出库单号", prop: "ckdh", type: 0, tableStatus: 0 },
                { label: "出库金额", prop: "ckje", type: 0, tableStatus: 0 },
            ],
            jxccx_tableData: [],
            jxccx_loading: false,

            //   el-dialog 数据
            jxccx_dialogVisible: false,
            jxccx_dialogTitle: "",
            jxccx_dtlstatus: false, // false 新增  true 修改

            jxccx_dialogWidth: "700px",
            jxccx_inline: true,
            jxccx_dialogLabelWidth: "120px",

            jxccx_base: {
                goodsid: null, // 货品ID
                goodsname: null, //品名
                goodstype: null, // 规格
                goodsunit: null, // 单位
                prodarea: null, // 产地
                unitprice: null, // 价格
                channelid: null,// 渠道ID    

                companyid: null,// 公司ID
                supplyid: null,// 供应商ID
                supplyname: null,// 供应商名称

                inputmanid: null, // 录入人ID
                inputman: null // 录入人
            },

            // hov
            jxccx_supplyVisible: false,
            jxccx_supplyHov: {
                hovTitle: '公司查询',
                hovUrl: "companyidhov/selectcompanyid",
                afterStatus: false,
                fillDataName: "jxccx_formData",
                parentVisible: 'jxccx_supplyVisible',
                hovColumns:
                    [
                        { id: "companyid", name: "公司ID", queryStatus: true, dataStatus: 2, fillid: "companyid" },
                        { id: "companyname", name: "公司名称", queryStatus: true, dataStatus: 1 },
                        { id: "companyopcode", name: "公司操作码", queryStatus: true, dataStatus: 1 }
                    ]
            },

            jxccx_goodsVisible: false,
            jxccx_goodsHov: {
                hovTitle: "商品信息查询",
                hovUrl: "freegoodsSu/selectGoods",
                afterStatus: false,
                fillDataName: "jxccx_formData",
                parentVisible: "jxccx_goodsVisible",
                hovColumns: [
                    {
                        id: "companyid",
                        name: "公司ID",
                        queryStatus: false,
                        dataStatus: 2,
                        fillid: "companyid"
                    },
                    {
                        id: "companyname",
                        name: "公司名称",
                        queryStatus: false,
                        dataStatus: 1,
                        fillid: "companyname"
                    },
                    {
                        id: "supplyid",
                        name: "供应商ID",
                        queryStatus: false,
                        dataStatus: 2,
                        fillid: "supplyid"
                    },
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
            jxccx_counterVisible: false,
            jxccx_counterHov: {
                hovTitle: '门店查询',
                hovUrl: "counteridhov/select",
                afterStatus: false,
                fillDataName: "jxccx_formData",
                parentVisible: 'jxccx_counterVisible',
                hovColumns:
                    [
                        { id: "counterid", name: "公司ID", queryStatus: true, dataStatus: 2, fillid: "counterid" },
                        { id: "countername", name: "公司名称", queryStatus: true, dataStatus: 1, fillid: "countername" },
                        { id: "companyopcode", name: "公司操作码", queryStatus: true, dataStatus: 1 },
                        { id: "companyid", name: "公司ID", queryStatus: true, dataStatus: 2,display:1,value:sessionStorage.getItem("companyid") },
                    ]
            },
        };
    },
    created() {

    },
    methods: {
        queryFunction(data) {
            if (data == "query") {
                this.selectDoc(1, this.jxccx_pageSize);
            } else if (data === "add") {
                this.beforeInsert();
            }
        },

        selectDoc(pageNum, pageSize) {

            let params = paramsFormat(this.jxccx_formData);

            this.jxccx_loading = true;
            this.jxccx_tableData = [];
            this.$api.giftmanagement
                .selectJxccx({
                    pageNum: pageNum,
                    pageSize: pageSize,
                    params: params
                })
                .then(res => {
                    this.jxccx_tableData = res.data.content;
                    this.jxccx_pageNum = res.data.pageNum;
                    this.jxccx_pageSize = res.data.pageSize;
                    this.jxccx_pageTotal = res.data.totalSize;
                    this.jxccx_loading = false;
                })
                .catch(() => {
                    this.jxccx_pageNum = 1;
                    this.jxccx_pageTotal = 0;
                    this.jxccx_loading = false;
                    return false;
                });
        },

        handleChange(data) {
            this.selectDoc(data.pageNum, data.pageSize);
        },
        handleFunction(data) {
            if (data.id == "edit") {
                this.update(data.row)
            }
        },
        openHov(data) {

            console.log('进来', data)

            this.jxccx_goodsHov.fillDataName = "jxccx_formData";
            this.jxccx_supplyHov.fillDataName = "jxccx_formData";
            this.jxccx_counterHov.fillDataName = "jxccx_formData";
            if (data === "goodsid") {
                this.jxccx_goodsVisible = true;
            } else if (data === "companyid") {
                this.jxccx_supplyVisible = true;
            } else if (data === "counterid") {
                this.jxccx_counterVisible = true;
            }
        },

        openDailogHov(data) {
            this.jxccx_goodsHov.fillDataName = "jxccx_base";
            this.jxccx_supplyHov.fillDataName = "jxccx_base";
            this.jxccx_counterHov.fillDataName = "jxccx_base";
            if (data === "goodsid") {
                this.jxccx_goodsVisible = true;
            } else if (data === "companyid") {
                this.jxccx_supplyVisible = true;
            } else if (data === "counterid") {
                this.jxccx_counterVisible = true;
            }
        },

        // 分页 size 变化
        handleSizeChange(pageSize) {
            this.jxccx_pageSize = pageSize;
            this.selectDoc(this.jxccx_pageNum, pageSize);
        },
        // 分页 pageNum 变化
        handleCurrentChange(pageNum) {
            this.jxccx_pageNum = pageNum;
            this.selectDoc(pageNum, this.jxccx_pageSize);
        },

        // 表格 复选 变化
        tableSelectChange(rows) {
            console.log('表格复选框变化')
        },

        closeDialog() {
            this.jxccx_dialogVisible = false;
        },
        openDialog() {
            this.jxccx_dialogVisible = true;
        },
        beforeInsert() {
            this.jxccx_dialogTitle = "新增";
            this.jxccx_dtlstatus = false;
            Object.keys(this.jxccx_base).forEach(e => {
                this.jxccx_base[e] = null;
            });

            this.jxccx_base.companyid = sessionStorage.getItem("companyid");
            this.jxccx_base.inputmanid = sessionStorage.getItem("userid");
            this.jxccx_base.inputman = sessionStorage.getItem("username");

            this.openDialog();
        },

        beforeUpdate(data) {
            this.jxccx_dialogTitle = "修改";
            this.jxccx_dtlstatus = true;
            Object.keys(this.jxccx_base).forEach(e => {
                this.jxccx_base[e] = data.row[e];
            });

            this.jxccx_base.credate = dateFormat("YYYY-mm-dd", this.jxccx_base.credate);

            this.openDialog();
        },

        save() {
            this.insert();
        },
        // 新增
        insert() {
            let params = this.jxccx_base

            console.log("商品维护 insert p ", params);
            this.$api.giftmanagement
                .insertJxccx(params)
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
        // 修改  启用 停用
        update(row) {
            let params = {
                usestatus: row.usestatus == 1 ? 0 : 1,
                channelid: row.channelid,
            };
            console.log("商品维护 update p ", params);
            this.$api.giftmanagement
                .updateJxccx(params)
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


        formatter(row, column) {
            let key = column.property
            let value = row[key]

            if (key=='ckrq' || key=='rkrq') {
                return dateFormat("YYYY-mm-dd HH:MM:SS",value);
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
            let pageSize = this.jxccx_pageSize;
            this.selectDoc(1, pageSize);
        },


    }
};