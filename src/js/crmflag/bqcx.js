import {
    paramsFormat,
    dateFormat,
} from "@/utils/functions";
export default {
    data() {
        return {
            bqcx_btnOptions: [
                {
                    id: "query",
                    icon: "fa fa-search",
                    label: "action.search",
                    perms: ""
                },
            ],
            bqcx_formList: [
                {
                    type: "daterange",
                    id1: "begindate",
                    id2: "enddate",
                    label: "日期"
                },
                // {
                //     type: "inputHov",
                //     label: "标签类型",
                //     id: "classifyid",
                // },
                {
                    type: "inputHov",
                    label: "操作码",
                    id: "opcode",
                },
                // {
                //     type: "inputHov",
                //     label: "地区ID",
                //     id: "vipareaid",
                // },
                {
                    type: "select",
                    label: "地区ID",
                    id: "vipareaid",
                    options: [
                        { label: '', value: null },
                        { label: '沈阳', value: 1 },
                        { label: '大连', value: 2 },
                        { label: '鞍山', value: 3 },
                        { label: '抚顺', value: 4 },
                        { label: '本溪', value: 5 },
                        { label: '丹东', value: 6 },
                        { label: '铁岭', value: 7 },
                        { label: '锦州', value: 8 },
                        { label: '葫芦岛', value: 9 },
                        { label: '朝阳', value: 10 },
                        { label: '营口', value: 11 },
                        { label: '阜新', value: 12 },
                        { label: '辽阳', value: 13 },
                        { label: '盘锦', value: 14 },
                        { label: '长春', value: 15 },
                        { label: '赤峰', value: 16 },
                        { label: '吉林', value: 17 },
                        { label: '秦皇岛', value: 18 },
                        { label: '青岛', value: 19 },
                    ]
                },
            ],
            bqcx_formData: {
                begindate: null,
                enddate: null,

                //classifyid: null, // 标签类型
                opcode: null, // 操作码
                vipareaid: null, //区域ID
            },
            bqcx_pageNum: 1,
            bqcx_pageSize: 50,
            bqcx_pageTotal: 0,
            bqcx_tableColumns: [
                { label: "会员ID", prop: "vipid", type: 0, tableStatus: 0 },
                { label: "会员名称", prop: "vipname", type: 0, tableStatus: 0 },
                { label: "会员电话", prop: "phone", type: 0, tableStatus: 0 },
                { label: "地区ID", prop: "vipareaid", type: 0, tableStatus: 0 },
                { label: "地区名称", prop: "vipareaname", type: 0, tableStatus: 0 },
                { label: "焦点数据", prop: "focusdata", type: 0, tableStatus: 0 },
                { label: "消费日期", prop: "lastdate", type: 0, tableStatus: 0 },
                { label: "最近消费门店ID", prop: "lastcounterid", type: 0, tableStatus: 0 },
                { label: "开卡门店ID", prop: "activatecounterid", type: 0, tableStatus: 0 },
                { label: "开卡时间", prop: "activatedate", type: 0, tableStatus: 0 },
                { label: "核心会员", prop: "coremembers", type: 0, tableStatus: 0 },
                { label: "交易笔数", prop: "transactions", type: 0, tableStatus: 0 },

            ],
            bqcx_tableData: [],
            bqcx_loading: false,

            //   el-dialog 数据
            bqcx_dialogVisible: false,
            bqcx_dialogTitle: "",
            bqcx_dtlstatus: false, // false 新增  true 修改

            bqcx_dialogWidth: "300px",
            bqcx_inline: true,
            bqcx_dialogLabelWidth: "120px",

            bqcx_base: {
            },

            // hov
            bqcx_classifyVisible: false,
            bqcx_classifyHov: {
                hovTitle: "标签类型查询",
                hovUrl: "labelhov/class",
                afterStatus: false,
                fillDataName: "bqcx_formData",
                parentVisible: "bqcx_classifyVisible",
                hovColumns: [
                    {
                        id: "classifyid",
                        name: "类型ID",
                        queryStatus: true,
                        dataStatus: 2,
                        fillid: "classifyid"
                    },
                    {
                        id: "classifyname",
                        name: "类型名称",
                        queryStatus: true,
                        dataStatus: 1,
                    },
                ]
            },
            bqcx_opcodeVisible: false,
            bqcx_opcodeHov: {
                hovTitle: "标签操作码查询",
                hovUrl: "labelhov/labelDef",
                afterStatus: false,
                fillDataName: "bqcx_formData",
                parentVisible: "bqcx_opcodeVisible",
                hovColumns: [
                    {
                        id: "opcode",
                        name: "操作码",
                        queryStatus: true,
                        dataStatus: 1,
                        fillid: "opcode"
                    },
                    {
                        id: "flagname",
                        name: "标签名称",
                        queryStatus: false,
                        dataStatus: 1,
                    },
                ]
            },
            bqcx_vipareaVisible: false,
            bqcx_vipareaHov: {
                hovTitle: "区域查询",
                hovUrl: "",
                afterStatus: false,
                fillDataName: "bqcx_formData",
                parentVisible: "bqcx_vipareaVisible",
                hovColumns: [
                    {
                        id: "vipareaid",
                        name: "地区ID",
                        queryStatus: true,
                        dataStatus: 2,
                        fillid: "vipareaid"
                    },
                    {
                        id: "vipareaname",
                        name: "地区名称",
                        queryStatus: true,
                        dataStatus: 1,
                    },
                ]
            },
        };
    },
    created() {
        let dateTime = new Date();
        dateTime = dateTime.setDate(dateTime.getDate() - 1);
        dateTime = new Date(dateTime);
        this.bqcx_formData.begindate = new Date(dateFormat('YYYY-mm-dd 00:00:00', dateTime));
        this.bqcx_formData.enddate = new Date(dateFormat('YYYY-mm-dd 00:00:00', new Date()))

    },
    methods: {
        queryFunction(data) {
            if (data == "query") {
                //this.selectDoc(1, this.bqcx_pageSize);
                this.openDialog();
            }
        },

        selectDoc(pageNum, pageSize) {
            this.$refs.query.collapse = false;
            let params = paramsFormat(this.bqcx_formData);
            params.begindate = dateFormat('YYYY/mm/dd HH:MM:SS', params.begindate)
            params.enddate = dateFormat('YYYY/mm/dd HH:MM:SS', params.enddate)
            this.bqcx_loading = true;
            this.bqcx_tableData = [];
            this.$api.crmflag

                .selectBqcx({
                    pageNum: pageNum,
                    pageSize: pageSize,
                    params: params
                })
                .then(res => {
                    this.bqcx_tableData = res.data.content;
                    this.bqcx_pageNum = res.data.pageNum;
                    this.bqcx_pageSize = res.data.pageSize;
                    this.bqcx_pageTotal = res.data.totalSize;
                    this.bqcx_loading = false;
                })
                .catch(() => {
                    this.bqcx_pageNum = 1;
                    this.bqcx_pageTotal = 0;
                    this.bqcx_loading = false;
                    return false;
                });
        },

        // 导出所有分页数据
        downloadExcel() {
            this.$refs.query.collapse = false;
            let params = paramsFormat(this.bqcx_formData);
            params.begindate = dateFormat('YYYY/mm/dd HH:MM:SS', params.begindate)
            params.enddate = dateFormat('YYYY/mm/dd HH:MM:SS', params.enddate)

            console.log("Excel下载  p ", params);
            this.$api.crmflag
                .selectBqcxExcel(params)
                .then(res => {
                    let bqcx_tableData = res.data;
                    this.exportExcelDOM(this.bqcx_tableColumns, bqcx_tableData, '标签查询' + this.getNewDate())
                })
                .catch(e => {
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
            this.bqcx_classifyHov.fillDataName = "bqcx_formData";
            this.bqcx_opcodeHov.fillDataName = "bqcx_formData";
            this.bqcx_vipareaHov.fillDataName = "bqcx_formData";
            if (data === "classifyid") {
                this.bqcx_classifyVisible = true;
            } else if (data === "opcode") {
                this.bqcx_opcodeVisible = true;
            } else if (data === "vipareaid") {
                this.bqcx_vipareaVisible = true;
            }
        },

        // openDailogHov(data) {
        //     this.bqcx_goodsHov.fillDataName = "bqcx_base";
        //     this.bqcx_supplyHov.fillDataName = "bqcx_base";
        //     if (data === "goodsid") {
        //         this.bqcx_goodsVisible = true;
        //     } else if (data === "supplyid") {
        //         this.bqcx_supplyVisible = true;
        //     }
        // },

        // 分页 size 变化
        handleSizeChange(pageSize) {
            this.bqcx_pageSize = pageSize;
            this.selectDoc(this.bqcx_pageNum, pageSize);
        },
        // 分页 pageNum 变化
        handleCurrentChange(pageNum) {
            this.bqcx_pageNum = pageNum;
            this.selectDoc(pageNum, this.bqcx_pageSize);
        },

        // 表格 复选 变化
        tableSelectChange(rows) {
            console.log('表格复选框变化')
        },

        closeDialog() {
            this.bqcx_dialogVisible = false;
        },
        openDialog() {
            this.bqcx_dialogVisible = true;
        },
        beforeInsert() {
            this.bqcx_dialogTitle = "新增";
            this.bqcx_dtlstatus = false;
            Object.keys(this.bqcx_base).forEach(e => {
                this.bqcx_base[e] = null;
            });

            this.bqcx_base.companyid = sessionStorage.getItem("companyid");
            this.bqcx_base.inputmanid = sessionStorage.getItem("userid");
            this.bqcx_base.inputman = sessionStorage.getItem("username");

            this.openDialog();
        },

        beforeUpdate(data) {
            this.bqcx_dialogTitle = "修改";
            this.bqcx_dtlstatus = true;
            Object.keys(this.bqcx_base).forEach(e => {
                this.bqcx_base[e] = data.row[e];
            });

            this.bqcx_base.credate = dateFormat("YYYY-mm-dd", this.bqcx_base.credate);

            this.openDialog();
        },

        save() {
            this.insert();
        },
        // 新增
        insert() {
            let params = this.bqcx_base

            console.log("商品维护 insert p ", params);
            this.$api.crmflag
                .insertBqcx(params)
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
            this.$api.crmflag
                .updateBqcx(params)
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
            if (key == "coremembers") {
                if (value == 0) {
                    return "核心"
                }
                return "非核心"
            }
            if (key == 'activatedate' || key == 'lastdate') {
                return dateFormat('YYYY-mm-dd', value);
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
            let pageSize = this.bqcx_pageSize;
            this.selectDoc(1, pageSize);
        },


    }
};

