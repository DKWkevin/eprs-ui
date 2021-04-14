import {
    paramsFormat,
    dateFormat,
} from "@/utils/functions";
export default {
    data() {
        return {
            spwh_btnOptions: [
                {
                    id: "query",
                    icon: "fa fa-search",
                    label: "action.search",
                    perms: "freegood:freegoods:select"
                },
                {
                    id: "add",
                    icon: "fa fa-edit",
                    label: "action.add",
                    perms: "freegood:freegoods:insert"
                }
            ],
            spwh_formList: [
                {
                    type: "input",
                    label: "品名",
                    id: "goodsname",
                },
                {
                    type: "input",
                    label: "供应商名称",
                    id: "supplyname",
                },
            ],
            spwh_formData: {
                goodsname: null,
                supplyname: null
            },
            spwh_pageNum: 1,
            spwh_pageSize: 50,
            spwh_pageTotal: 0,
            spwh_tableColumns: [
                { label: "货品ID", prop: "goodsid", type: 0, tableStatus: 0 },
                { label: "品名", prop: "goodsname", type: 0, tableStatus: 0 },
                { label: "规格", prop: "goodstype", type: 0, tableStatus: 0 },
                { label: "单位", prop: "goodsunit", type: 0, tableStatus: 0 },
                { label: "产地", prop: "prodarea", type: 0, tableStatus: 0 },
                { label: "价格", prop: "unitprice", type: 0, tableStatus: 0 },
                { label: "状态", prop: "usestatus", type: 0, tableStatus: 0 },
                { label: "渠道ID", prop: "channelid", type: 0, tableStatus: 0 },
                { label: "公司ID", prop: "companyid", type: 0, tableStatus: 0 },
                { label: "供应商ID", prop: "supplyid", type: 0, tableStatus: 0 },
                { label: "供应商名称", prop: "supplyname", type: 0, tableStatus: 0 },
            ],
            spwh_tableData: [],
            spwh_loading: false,

            //   el-dialog 数据
            spwh_dialogVisible: false,
            spwh_dialogTitle: "",
            spwh_dtlstatus: false, // false 新增  true 修改

            spwh_dialogWidth: "700px",
            spwh_inline: true,
            spwh_dialogLabelWidth: "120px",

            spwh_base: {
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
            spwh_supplyVisible: false,
            spwh_supplyHov: {
                hovTitle: "供应商查询",
                hovUrl: "companyidhov/selectcompanyid",
                afterStatus: false,
                fillDataName: "spwh_formData",
                parentVisible: "spwh_supplyVisible",
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
            spwh_goodsVisible: false,
            spwh_goodsHov: {
                hovTitle: "商品信息查询",
                hovUrl: "freegoodsSu/selectGoods",
                afterStatus: false,
                fillDataName: "spwh_formData",
                parentVisible: "spwh_goodsVisible",
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
        };
    },
    created() {

    },
    methods: {
        queryFunction(data) {
            if (data == "query") {
                this.selectDoc(1, this.spwh_pageSize);
            } else if (data === "add") {
                this.beforeInsert();
            }
        },

        selectDoc(pageNum, pageSize) {

            let params = paramsFormat(this.spwh_formData);
            if(params == null) params = {}
            params.companyid = sessionStorage.getItem("companyid");

            this.spwh_loading = true;
            this.spwh_tableData = [];
            this.$api.giftmanagement
                .selectSpwh({
                    pageNum: pageNum,
                    pageSize: pageSize,
                    params: params
                })
                .then(res => {
                    this.spwh_tableData = res.data.content;
                    this.spwh_pageNum = res.data.pageNum;
                    this.spwh_pageSize = res.data.pageSize;
                    this.spwh_pageTotal = res.data.totalSize;
                    this.spwh_loading = false;
                })
                .catch(() => {
                    this.spwh_pageNum = 1;
                    this.spwh_pageTotal = 0;
                    this.spwh_loading = false;
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
            this.spwh_goodsHov.fillDataName = "spwh_formData";
            this.spwh_supplyHov.fillDataName = "spwh_formData";
            if (data === "goodsid") {
                this.spwh_goodsVisible = true;
            } else if (data === "supplyid") {
                this.spwh_supplyVisible = true;
            }
        },

        openDailogHov(data) {
            this.spwh_goodsHov.fillDataName = "spwh_base";
            this.spwh_supplyHov.fillDataName = "spwh_base";
            if (data === "goodsid") {
                this.spwh_goodsVisible = true;
            } else if (data === "supplyid") {
                this.spwh_supplyVisible = true;
            }
        },

        // 分页 size 变化
        handleSizeChange(pageSize) {
            this.spwh_pageSize = pageSize;
            this.selectDoc(this.spwh_pageNum, pageSize);
        },
        // 分页 pageNum 变化
        handleCurrentChange(pageNum) {
            this.spwh_pageNum = pageNum;
            this.selectDoc(pageNum, this.spwh_pageSize);
        },

        // 表格 复选 变化
        tableSelectChange(rows) {
            console.log('表格复选框变化')
        },

        closeDialog() {
            this.spwh_dialogVisible = false;
        },
        openDialog() {
            this.spwh_dialogVisible = true;
        },
        beforeInsert() {
            this.spwh_dialogTitle = "新增";
            this.spwh_dtlstatus = false;
            Object.keys(this.spwh_base).forEach(e => {
                this.spwh_base[e] = null;
            });

            this.spwh_base.companyid = sessionStorage.getItem("companyid");
            this.spwh_base.inputmanid = sessionStorage.getItem("userid");
            this.spwh_base.inputman = sessionStorage.getItem("username");

            this.openDialog();
        },

        beforeUpdate(data) {
            this.spwh_dialogTitle = "修改";
            this.spwh_dtlstatus = true;
            Object.keys(this.spwh_base).forEach(e => {
                this.spwh_base[e] = data.row[e];
            });

            this.spwh_base.credate = dateFormat("YYYY-mm-dd", this.spwh_base.credate);

            this.openDialog();
        },

        save() {
            this.insert();
        },
        // 新增
        insert() {
            let params = this.spwh_base

            console.log("商品维护 insert p ", params);
            this.$api.giftmanagement
                .insertSpwh(params)
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
                .updateSpwh(params)
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
            if (key == "usestatus") {
                if (value == 0) {
                    return "停用"
                }
                return "正常"
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
            let pageSize = this.spwh_pageSize;
            this.selectDoc(1, pageSize);
        },


    }
};