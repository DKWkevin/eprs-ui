
import {
    paramsFormat,
    dateFormat,
} from "@/utils/functions";
export default {
    data() {
        return {
            bqgl_btnOptions: [
                {
                    id: "query",
                    icon: "fa fa-search",
                    label: "action.search",
                    perms: "label:select"
                },
                {
                    id: "add",
                    icon: "fa fa-edit",
                    label: "action.add",
                    perms: "label:insertDef"
                }
            ],
            bqgl_formList: [
                // {
                //     type: "daterange",
                //     id1: "begindate",
                //     id2: "enddate",
                //     label: "日期"
                // },
                // {
                //     type: "inputHov",
                //     label: "标签类型",
                //     id: "classifyid",
                // },
                // {
                //     type: "inputHov",
                //     label: "操作码",
                //     id: "opcode",
                // },
                {
                    type: "input",
                    label: "操作码",
                    id: "opcode",
                },
            ],
            bqgl_formData: {
                begindate: null,
                enddate: null,

                classifyid: null, // 标签类型
                opcode: null, // 操作码
            },
            bqgl_pageNum: 1,
            bqgl_pageSize: 50,
            bqgl_pageTotal: 0,
            bqgl_tableColumns: [
                { label: "标签ID", prop: "defid", type: 0, tableStatus: 0 },
                { label: "标签名称", prop: "flagname", type: 0, tableStatus: 0 },
                { label: "操作码", prop: "opcode", type: 0, tableStatus: 0 },
                { label: "创建日期", prop: "credate", type: 0, tableStatus: 0 },
                { label: "标签类型ID", prop: "typeid", type: 0, tableStatus: 0 },
                { label: "类型名称", prop: "typename", type: 0, tableStatus: 0 },
                { label: "创建部门ID", prop: "deptid", type: 0, tableStatus: 0 },
                { label: "创建人ID", prop: "inputmanid", type: 0, tableStatus: 0 },
                { label: "状态", prop: "usestatus", type: 0, tableStatus: 0 },
            ],
            bqgl_tableData: [],
            bqgl_loading: false,

            //   el-dialog 数据
            bqgl_dialogVisible: false,
            bqgl_dialogTitle: "",
            bqgl_dtlstatus: false, // false 新增  true 修改

            bqgl_dialogWidth: "700px",
            bqgl_inline: true,
            bqgl_dialogLabelWidth: "120px",

            bqgl_base: {
                defid:null,// 标签ID
                flagname: null, // 标签名称
                opcode: null, // 标签操作码
                typeid: null, // 标签类型
                typename: null, // 标签类型名称
                inputmanid: null, // 录入人ID
                deptid: null, // 录入人部门ID

                data:null, // 内容数据
                dataname:null, // 内容数据 中文名称
            },

            // hov
            bqgl_paymodeVisible: false,
            bqgl_paymodeHov: {
                hovTitle: "付款方式查询",
                hovUrl: "labelhov/receivable",
                afterStatus: false,
                fillDataName: "bqgl_formData",
                parentVisible: "bqgl_paymodeVisible",
                hovColumns: [
                    {
                        id: "recmodeid",
                        name: "付款方式ID",
                        queryStatus: true,
                        dataStatus: 2,
                        fillid: "data"
                    },
                    {
                        id: "recmode",
                        name: "付款方式名称",
                        queryStatus: true,
                        dataStatus: 1,
                        fillid: "dataname"
                    },
                ]
            },
            bqgl_opcodeVisible: false,
            bqgl_opcodeHov: {
                hovTitle: "标签操作码查询",
                hovUrl: "labelhov/labelDef",
                afterStatus: false,
                fillDataName: "bqgl_formData",
                parentVisible: "bqgl_opcodeVisible",
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
                        queryStatus: true,
                        dataStatus: 1,
                    },
                ]
            },
            bqgl_classifyVisible: false,
            bqgl_classifyHov: {
                hovTitle: "标签类型查询",
                hovUrl: "labelhov/class",
                afterStatus: false,
                fillDataName: "bqgl_formData",
                parentVisible: "bqgl_classifyVisible",
                hovColumns: [
                    {
                        id: "classifyid",
                        name: "类型ID",
                        queryStatus: true,
                        dataStatus: 2,
                        fillid: "typeid"
                    },
                    {
                        id: "classifyname",
                        name: "类型名称",
                        queryStatus: true,
                        dataStatus: 1,
                        fillid: "typename"
                    },
                ]
            },
        };
    },
    created() {

    },
    methods: {
        queryFunction(data) {
            if (data == "query") {
                this.selectDoc(1, this.bqgl_pageSize);
            } else if (data === "add") {
                this.beforeInsert();
            }
        },

        selectDoc(pageNum, pageSize) {
            this.$refs.query.collapse = false;
            let params = paramsFormat(this.bqgl_formData);
            console.log('Bqgl select q ', params);

            this.bqgl_loading = true;
            this.bqgl_tableData = [];
            this.$api.crmflag
                .selectBqgl({
                    pageNum: pageNum,
                    pageSize: pageSize,
                    params: params
                })
                .then(res => {
                    this.bqgl_tableData = res.data.content;
                    this.bqgl_pageNum = res.data.pageNum;
                    this.bqgl_pageSize = res.data.pageSize;
                    this.bqgl_pageTotal = res.data.totalSize;
                    this.bqgl_loading = false;
                })
                .catch(() => {
                    this.bqgl_pageNum = 1;
                    this.bqgl_pageTotal = 0;
                    this.bqgl_loading = false;
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

            this.bqgl_classifyHov.fillDataName = "bqgl_formData";
            this.bqgl_opcodeHov.fillDataName = "bqgl_formData";

            if (data === "classifyid") {
                this.bqgl_classifyVisible = true;
            }else if(data === "opcode"){
                this.bqgl_opcodeVisible = true
            }
        },

        openDailogHov(data) {
            this.bqgl_classifyHov.fillDataName = "bqgl_base";
            this.bqgl_paymodeHov.fillDataName = "bqgl_base";  
            if (data === "classifyid") {
                this.bqgl_classifyVisible = true;
            }else if(data === "paymode"){
                this.bqgl_paymodeVisible = true;
            }
        },

        // 分页 size 变化
        handleSizeChange(pageSize) {
            this.bqgl_pageSize = pageSize;
            this.selectDoc(this.bqgl_pageNum, pageSize);
        },
        // 分页 pageNum 变化
        handleCurrentChange(pageNum) {
            this.bqgl_pageNum = pageNum;
            this.selectDoc(pageNum, this.bqgl_pageSize);
        },

        // 表格 复选 变化
        tableSelectChange(rows) {
            console.log('表格复选框变化')
        },

        closeDialog() {
            this.bqgl_dialogVisible = false;
        },
        openDialog() {
            this.bqgl_dialogVisible = true;
        },
        beforeInsert() {
            this.bqgl_dialogTitle = "新增";
            this.bqgl_dtlstatus = false;
            Object.keys(this.bqgl_base).forEach(e => {
                this.bqgl_base[e] = null;
            });


            this.bqgl_base.inputmanid = sessionStorage.getItem("userid");
            this.bqgl_base.deptid = sessionStorage.getItem("deptid");

            this.openDialog();
        },

        beforeUpdate(data) {
            this.bqgl_dialogTitle = "数据定义";
            this.bqgl_dtlstatus = true;
            Object.keys(this.bqgl_base).forEach(e => {
                this.bqgl_base[e] = data.row[e];
            });
            this.openDialog();
        },



        save() {
            if (this.bqgl_dtlstatus == false) {
                this.insert();
            } else {
                this.updateSjdy();
            }

        },
        /**
         *  标签管理 新增标签 
         * 
         */
        insert() {

            let params = this.bqgl_base

            console.log("标签管理 insert p ", params);
            this.$api.crmflag
                .insertBqgl(params)
                .then(res => {
                    if (res.code == 200) {
                        alert("保存成功");
                        this.afterSave();
                    }else{
                        alert(res.msg);
                    }
                })
                .catch(e => {
                    return false;
                });
        },


        /**
         * 标签管理--数据含义
         * 
         */
        updateSjdy() {
            let params = this.bqgl_base;

            console.log("标签管理 数据定义 p ", params);
            this.$api.crmflag
                .updateBqglSjdy(params)
                .then(res => {
                    if (res.code == 200) {
                        alert("成功");
                        this.afterSave();
                    }else{
                        alert(res.msg);
                    }
                })
                .catch(e => {
                    return false;
                });
        },


        /**
         * 修改状态
         * 
         */
        update(status, row) {            
            if (status == 1 && row.usestatus == 2 && row.defcount == '0') {
                // 临时 to 正式  如果没有进行数据定义 则 终止本次操作
                alert('请完成数据定义，然后转正。')
                return;
            }
            let params = {
                usestatus: status,
                defid: row.defid, //标签ID
                opcode:row.opcode, // 操作码
                oldstatus:row.usestatus, // 原始状态
            };
            console.log("标签管理 update p ", params);
            this.$api.crmflag
                .updateBqgl(params)
                .then(res => {
                    if (res.code == 200) {
                        alert("成功");
                        this.afterSave();
                    }else{
                        alert(res.msg);
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
                if (value == 2) {
                    return "临时"
                } else if (value == 1) {
                    return "正常"
                } else if (value == 3) {
                    return "停用"
                } else if (value == 4) {
                    return "作废"
                }
                return value;
            }
            if (key == 'credate') {
                return dateFormat('YYYY-mm-dd HH:MM:SS', value)
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
            let pageSize = this.bqgl_pageSize;
            this.selectDoc(1, pageSize);
        },


    }
};