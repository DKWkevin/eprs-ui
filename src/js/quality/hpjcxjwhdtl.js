export default {
  name: 'HpjcsjwhDtl',
  props: {
    dtlStatus: {type: Boolean},
    drugtypeOptions: {type: Array},
    usestatusOptions: {type: Array},
    storageConditionOptions: {type: Array},
    transConditionOptions: {type: Array},
    drugadminClassOptions: {type: Array},
    brandGradeOptions: {type: Array},
    informationClassOptions: {type: Array},
    class1Options: {type: Array},
    classAOptions: {type: Array},
    companyTypeOptions: {type: Array},
    unitTypeOptions: {type: Array},
    bzuseStatusOptions: {type: Array},
    dtlData: {type: Object},
    docTitle: {type: String},
    cgzcOptions: {type: Array},
    categoryid2Options: {type: Array},
    rolelayerOptions:{type: Array,default: () => {
      return [];
      }}
  },
  data() {
    return {
      dialogVisible: true,
      dialogWidth: '1000px',
      dialogTop: '8vh',
      activeTabs: 'first',
      companyid: null,
      tableHeight: 424,
      goodsid: null,
      /*基本信息*/
      baseLabelWidth: 'auto',
      labelOptions: 'right',
      base: {
        goodsid: null,
        goodsname: null,
        opcode: null,
        goodsformalname: null,
        goodstype: null,
        prodarea: null,
        goodstag: null,
        defaultpack: null,
        goodsunit: null,
        salestaxrate: null,
        sutaxrate: null,
        goodsformalpinyin: null,
        goodsno: null,
        goodsshortname: null,
        zxcolumn4: null,
        gbcode: null,
        standardcode: null,
        drugtype: null,
        usestatus: null,
        memo: null,
        zxcolumn3: null,
        shflmc: null,
        factid: null,
        factname: null,
        commissionid: null,
        commissionname: null,
        credate: null,
        inputmanid: Number(sessionStorage['userid']),
        inputmanname: sessionStorage['username'],
        companyid: null,
        jybf: false,
        ifimport: false,
        ifback: false,
        iforder: false,
        ifctrlzb: false,
        sflcpz: false,
        sfyypz: false,
        sfybml: false,
        layerid: null
      },
      drugtype: null,
      oldbase: {
        oldgbcode: null,
        oldprodarea: null,
        oldfactid: null
      },
      baseRules: {
        goodsname: {required: true, message: '通用名称不能为空', trigger: 'blur'},
        opcode: {required: true, message: '操作码不能为空', trigger: 'blur'},
        goodstype: {required: true, message: '规格不能为空', trigger: 'blur'},
        prodarea: {required: true, message: '产地不能为空', trigger: 'blur'},
        goodsunit: {required: true, message: '基本单位不能为空', trigger: 'blur'},
        salestaxrate: {required: true, message: '销售税率不能为空', trigger: 'change'},
        factid: {required: true, message: '生产企业不能为空', trigger: 'blur'},
        gbcode: {required: true, message: '批准文号不能为空', trigger: 'blur'},
      },
      /*包装信息*/
      bzLabelWidth: '60px',
      bz: {
        goodsid: null,
        goodsname: null,
        goodstype: null,
        goodsunit: null,
        prodarea: null
      },
      bzLabelOpsition: 'right',
      bzTableData: [],
      /*包装细单*/
      bzxxdtlLabelWidth: '100px',
      bzxxDtlVisiable: false,
      bzxxDtlStatus: false,
      bzxxdtlTitle: '',
      bzxxDtl: {
        goodsunit: null,
        unittype: null,
        baseunitqty: null,
        goodsunitlength: null,
        goodsunitwidth: null,
        goodsunitheight: null,
        goodsunitweight: null,
        goodsunitvol: null,
        barcode: null,
        usestatus: null,
        goodsid: null,
        goodsunitid: null
      },
      /*质量信息*/
      zlxxLabelWidth: '140px',
      zlxx: {
        goodsid: null,
        goodsname: null,
        validperiod: null,
        periodunit: null,
        storagecondition: null,
        transcondition: null,
        functionlist: null,
        usage: null,
        packstandard: null,
        forcetypeno: null,
        productapprovno: null,
        brand: null,
        drugadminclass: null,
        medicatype: null,
        brandgrade: null,
        markettime: null,
        adflag: null,
        clinicalflag: null,
        drugsflag: null,
        informationclass: null,
        sampleflag: null,
        trademark: null,
        compound: null,
        ccode: false,
        qualityscopeid: null,
        qualityscopename: null,
        iflotno: false
      },
      /*采购经理*/
      cgjlLabelWidth: '140px',
      cgjl: {
        goodsid: null,
        goodsname: null,
        managerid: null,
        managername: null,
        class1: null,
        class2: null,
        companyid: null,
        companyname: null,
        classa: null,
        companytype: null,
        property: null,
        buyerid: null
      },
      /*组合品*/
      zhpRadio: "1",
      zhpTableData: [],
      /*组合品细单*/
      zhpDtlLabelWidth: '100px',
      zhpDtlVisiable: false,
      zhpDtlStatus: false,
      zhpdtlTitle: '',
      zhpDtl: {
        goodsid: null,
        subgoodsid: null,
        subname: null,
        subtype: null,
        subunit: null,
        subqty: null,
        approvedocno: null,
        oldapprovedocno: null,
        subfact: null,
        no: null
      },
      /*品类6新增*/
      Pl6Form: {
        goodsid: null,
        categoryid: null,
        categoryname: null
      },
      /*hov加载*/
      baseFactVisible: false,
      baseFactHov: {
        hovTitle: '生产企业查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "base",
        parentVisible: 'baseFactVisible',
        hovColumns:
          [
            {id: "companyid", name: "生产企业ID", queryStatus: true, dataStatus: 2, fillid: 'factid'},
            {id: "companyname", name: "生产企业名称", queryStatus: true, dataStatus: 1, fillid: 'factname'},
            {id: "companyopcode", name: "生产企业操作码", queryStatus: true, dataStatus: 1},
          ]
      },
      baseCommissionVisible: false,
      baseCommissionHov: {
        hovTitle: '委托加工企业查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "base",
        parentVisible: 'baseCommissionVisible',
        hovColumns:
          [
            {id: "companyid", name: "企业ID", queryStatus: true, dataStatus: 2, fillid: 'commissionid'},
            {id: "companyname", name: "企业名称", queryStatus: true, dataStatus: 1, fillid: 'commissionname'},
            {id: "companyopcode", name: "企业操作码", queryStatus: true, dataStatus: 1},
          ]
      },
      zlxxQualityscopeVisible: false,
      zlxxQualityscopeHov: {
        hovTitle: '所属经营范围查询',
        hovUrl: "qualityscopeidhov/select",
        afterStatus: false,
        fillDataName: "zlxx",
        parentVisible: 'zlxxQualityscopeVisible',
        hovColumns:
          [
            {id: "qualityscopeid", name: "经营范围ID", queryStatus: true, dataStatus: 2, fillid: 'qualityscopeid'},
            {id: "scopename", name: "经营范围", queryStatus: true, dataStatus: 1, fillid: 'qualityscopename'},
            {id: "scopeno", name: "经营范围序号", queryStatus: true, dataStatus: 1},
            {id: "qualitytypeid", name: "分类ID",value:null, queryStatus: true,display:1, dataStatus: 1},
            {id: "qualitytypename", name: "分类名称", queryStatus: false, dataStatus: 1},
          ]
      },
      cgjlManagerVisible: false,
      cgjlManagerHov: {
        hovTitle: '采购经理查询',
        hovUrl: "buyeridhov/select",
        afterStatus: false,
        fillDataName: "cgjl",
        parentVisible: 'cgjlManagerVisible',
        hovColumns:
          [
            {id: "buyerid", name: "采购经理ID", queryStatus: true, dataStatus: 2, fillid: 'managerid'},
            {id: "buyername", name: "采购经理名称", queryStatus: false, dataStatus: 1, fillid: 'managername'}
          ]
      },
      cgjlCompanyVisible: false,
      cgjlCompanyHov: {
        hovTitle: '合作伙伴查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "cgjl",
        parentVisible: 'cgjlCompanyVisible',
        hovColumns:
          [
            {id: "companyid", name: "合作伙伴ID", queryStatus: true, dataStatus: 2, fillid: 'companyid'},
            {id: "companyname", name: "合作伙伴名称", queryStatus: false, dataStatus: 1, fillid: 'companyname'},
            {id: "companyopcode", name: "合作伙伴操作码", queryStatus: false, dataStatus: 1},
          ]
      },
      zhpGoodsVisible: false,
      zhpGoodsHov: {
        hovTitle: '组合品查询',
        hovUrl: "goodsidhov/select",
        afterStatus: false,
        fillDataName: "zhpDtl",
        parentVisible: 'zhpGoodsVisible',
        hovColumns:
          [
            {id: "goodsid", name: "子货品ID", queryStatus: true, dataStatus: 2, fillid: 'subgoodsid'},
            {id: "goodsname", name: "子货品名称", queryStatus: false, dataStatus: 1, fillid: 'subname'},
            {id: "goodsopcode", name: "子货品操作码", queryStatus: false, dataStatus: 1},
            {id: "goodstype", name: "子货品规格", queryStatus: false, dataStatus: 1, fillid: 'subtype'},
            {id: "goodsunit", name: "子货品单位", queryStatus: false, dataStatus: 1, fillid: 'subunit'},
            {id: "gbcode", name: "子货品批准文号", queryStatus: false, dataStatus: 1, fillid: 'approvedocno'},
            {id: "prodarea", name: "子货品产地", queryStatus: false, dataStatus: 1, fillid: 'subfact'},
          ]
      },
      zxcolumn4Visible: false,
      zxcolumn4Hov: {
        hovTitle: '上市许可持有人查询',
        hovUrl: "companyidhov/selectcompanyid",
        afterStatus: false,
        fillDataName: "base",
        parentVisible: 'zxcolumn4Visible',
        hovColumns:
          [
            {id: "companyid", name: "企业ID", queryStatus: true, dataStatus: 2},
            {id: "companyname", name: "企业名称", queryStatus: true, dataStatus: 1, fillid: 'zxcolumn4'},
            {id: "companyopcode", name: "企业操作码", queryStatus: true, dataStatus: 1}
          ]
      },
      categoryVisible: false,
      categoryHov: {
        hovTitle: '品类查询',
        hovUrl: "categoryidhov/select",
        afterStatus: false,
        fillDataName: "Pl6Form",
        parentVisible: 'categoryVisible',
        hovColumns:
          [
            {id: "categoryid", name: "品类ID", queryStatus: true, dataStatus: 2, fillid: 'categoryid'},
            {id: "categoryname", name: "品类名称", queryStatus: true, dataStatus: 1, fillid: 'categoryname'},
            {id: "memo", name: "备注", queryStatus: true, dataStatus: 0},
            {id: "categoryopcode", name: "品类操作码",value:'6', queryStatus: true,display:1, dataStatus: 0}
          ]
      }
    }
  },
  created() {
    this.base.usestatus = 4;
    if (this.dtlStatus === true) {
      this.goodsid = this.dtlData.goodsid;
      this.base.goodsid = this.dtlData.goodsid;
      this.bz.goodsid = this.dtlData.goodsid;
      this.zlxx.goodsid = this.dtlData.goodsid;
      this.cgjl.goodsid = this.dtlData.goodsid;
      this.Pl6Form.goodsid = this.dtlData.goodsid;
      this.cgjl.goodsname = this.dtlData.goodsname;
      this.bz.goodsname = this.dtlData.goodsname;
      this.bz.goodstype = this.dtlData.goodstype;
      this.bz.goodsunit = this.dtlData.goodsunit;
      this.bz.prodarea = this.dtlData.prodarea;
      this.zlxx.goodsname = this.dtlData.goodsname;
      Object.keys(this.base).forEach(e => {
        this.base[e] = this.dtlData[e];
      });
      this.drugtype = this.dtlData.drugtype;
      this.base.zxcolumn4 = this.dtlData.ssxkcyr;
      this.base.factname = this.dtlData.fact_companyname;
      this.base.commissionname = this.dtlData.com_companyname;
      this.base.zxcolumn3 = this.dtlData.cwspflbm;
      this.base.shflmc = this.dtlData.taxname;
      /*      this.base.jybf=this.getReturnValue(this.dtlData.jybf);
            this.base.ifimport=this.getReturnValue(this.dtlData.ifimport);
            this.base.ifback=this.getReturnValue(this.dtlData.ifback);
            this.base.iforder=this.getReturnValue(this.dtlData.iforder);
            this.base.ifctrlzb=this.getReturnValue(this.dtlData.ifctrlzb);
            this.base.sflcpz=this.getReturnValue(this.dtlData.sflcpz);
            this.base.sfyypz=this.getReturnValue(this.dtlData.sfyypz);
            this.base.sfybml=this.getReturnValue(this.dtlData.sfybml);*/
      this.oldbase.oldfactid = this.dtlData.factid;
      this.oldbase.oldgbcode = this.dtlData.gbcode;
      this.oldbase.oldprodarea = this.dtlData.prodarea;
      if (this.dtlData.medicatype === 0) {
        this.zlxx.medicatype = null;
      }
    }
  },
  methods: {
    docClose() {
      this.$parent.hpjcsjwhVisible = false;
    },
    handleClick(tab, event) {
      if (tab.name === 'second') {
        this.selectBzxx();
      } else if (tab.name === 'third') {
        this.selectZlxx();
      } else if (tab.name === 'fourth') {
        this.selectCgjl();
      } else if (tab.name === 'fire') {
        this.selectZhp();
      } else if (tab.name === 'six') {
        this.selectPL6();
      }
    },
    addBase() {
      let base = this.base;
      let params = {};
      Object.keys(base).forEach(e => {
        params[e] = this.returnValue(base[e]);
      });
      params.drugtype = this.drugtype;
      params.companyid = Number(sessionStorage['companyid']);
      this.$refs.baseForm.validate((vaild) => {
        if (vaild) {
          if (this.dtlStatus === false) {
            if (this.base.goodsid !== null && this.base.goodsid !== "") {
              params.oldfactid = this.oldbase.oldfactid;
              params.oldprodarea = this.oldbase.oldprodarea;
              params.oldgbcode = this.oldbase.oldgbcode;
              this.updateJbxx(params);
            } else {
              this.insertJbxx(params);
            }
          } else if (this.dtlStatus === true) {
            params.oldfactid = this.oldbase.oldfactid;
            params.oldprodarea = this.oldbase.oldprodarea;
            params.oldgbcode = this.oldbase.oldgbcode;
            this.updateJbxx(params);
          }
        } else {
          return false;
        }
      })
    },
    //新增基本信息
    insertJbxx(params) {
      this.$api.quality.insertHpjcsjwhBase(params).then(res => {
        if (res.code === 200) {
          alert('保存成功,货品ID:' + Number(res.data));
          this.goodsid = Number(res.data);
          this.base.goodsid = Number(res.data);
          this.oldbase.oldfactid = this.base.factid;
          this.oldbase.oldprodarea = this.base.prodarea;
          this.oldbase.oldgbcode = this.base.gbcode;
          this.bz.goodsid = Number(res.data);
          this.bz.goodsname = this.base.goodsname;
          this.bz.goodstype = this.base.goodstype;
          this.bz.goodsunit = this.base.goodsunit;
          this.bz.prodarea = this.base.prodarea;
          this.zlxx.goodsid = Number(res.data);
          this.cgjl.goodsid = Number(res.data);
          this.cgjl.goodsname = this.base.goodsname;
          this.Pl6Form.goodsid = Number(res.data);
        }
      }).catch(error => {
        return false;
      })
    },
    //修改基本信息
    updateJbxx(params) {
      this.$api.quality.updateHpjcsjwhBase(params).then(res => {
        if (res.code === 200) {
          alert('修改成功');
        }
      }).catch(error => {
        return false;
      })
    },
    /*包装信息*/
    openBzxxDtl() {
      this.bzxxdtlTitle = '新增包装信息';
      this.bzxxDtlStatus = false;
      Object.keys(this.bzxxDtl).forEach(e => {
        this.bzxxDtl[e] = null;
      });
      this.bzxxDtl.goodsid = this.goodsid;
      this.bzxxDtl.usestatus = 1;
      this.bzxxDtlVisiable = true;
    },
    updateBzxxDtl(row) {
      this.bzxxdtlTitle = '修改包装信息';
      this.bzxxDtlStatus = true;
      Object.keys(this.bzxxDtl).forEach(e => {
        this.bzxxDtl[e] = row[e];
      });
      this.bzxxDtl.goodsid = this.goodsid;
      this.bzxxDtlVisiable = true;
    },
    bzxxInsert() {
      let params = {};
      Object.keys(this.bzxxDtl).forEach(e => {
        params[e] = this.bzxxDtl[e];
      });
      params.inputmanid = Number(sessionStorage['userid']);
      params.companyid = Number(sessionStorage['companyid']);
      this.$refs.bzxxdtl.validate((vaild) => {
        if (vaild) {
          if (this.bzxxDtlStatus === false) {
            if (params.usestatus === 0) {
              alert("新增状态不能为作废");
              return false;
            }
            this.$api.quality.insertHpjcsjwhBzxx(params).then(res => {
              if (res.code === 200) {
                alert('保存成功');
                this.selectBzxx();
                this.zbxxClose();
              }
            }).catch(error => {
              return false;
            })
          } else if (this.bzxxDtlStatus === true) {
            this.$api.quality.updateHpjcsjwhBzxx(params).then(res => {
              if (res.code === 200) {
                alert('修改成功');
                this.selectBzxx();
                this.zbxxClose();
              }
            }).catch(error => {
              return false;
            })
          }
        } else {
          return false;
        }
      })
    },
    selectBzxx() {
      if (this.goodsid === null) {
        return false;
      }
      this.$api.quality.selectHpjcsjwhBzxx({goodsid: this.goodsid}).then(res => {
        if (res.code === 200) {
          this.bzTableData = res.data;
        }
      }).catch(error => {
        return false;
      })
    },
    deleteBzxxDtl(row) {
      this.$api.quality.delHpjcsjwhBzxx(row.goodsunitid).then(res => {
        if (res.code === 200) {
          alert('删除成功');
          this.selectBzxx();
        }
      }).catch(error => {
        return false;
      })
    },
    zbxxClose() {
      this.bzxxDtlVisiable = false;
      Object.keys(this.bzxxDtl).forEach(e => {
        this.bzxxDtl[e] = null;
      });
    },
    /*质量信息*/
    zlxxInsert() {
      let params = {};
      Object.keys(this.zlxx).forEach(e => {
        params[e] = this.returnValue(this.zlxx[e]);
      });
      this.$api.quality.insertHpjcsjwhZlxx(params).then(res => {
        if (res.code === 200) {
          alert('保存成功');
          this.zbxxClose();
        }
      }).catch(error => {
        return false;
      })
    },
    selectZlxx() {
      if (this.goodsid === null) {
        return false;
      }
      this.$api.quality.selectHpjcsjwhZlxx({goodsid: this.goodsid}).then(res => {
        if (res.code === 200) {
          Object.keys(this.zlxx).forEach(e => {
            this.zlxx[e] = res.data[e];
          });
          if (this.zlxx.medicatype === 0) {
            this.zlxx.medicatype = null;
          }
          this.zlxx.iflotno = res.data.iflotno === '1';
          this.zlxx.sjsmbj = res.data.sjsmbj === '1';
        }
      }).catch(error => {
        return false;
      })
    },
    /*采购经理*/
    cgjlInsert() {
      let params = {};
      Object.keys(this.cgjl).forEach(e => {
        if (this.cgjl[e] !== "" && this.cgjl[e] !== null) {
          params[e] = this.cgjl[e];
        } else {
          params[e] = null;
        }
      });
      this.$refs.cgjl.validate((vaild) => {
        if (vaild) {
          this.$api.quality.insertHpjcsjwhCgjl(params).then(res => {
            if (res.code === 200) {
              alert('保存成功');
              this.selectCgjl();
              this.zbxxClose();
            }
          }).catch(error => {
            return false;
          })
        } else {
          return false;
        }
      })
    },
    selectCgjl() {
      if (this.goodsid === null) {
        return false;
      }
      this.$api.quality.selectHpjcsjwhCgjl({goodsid: this.goodsid}).then(res => {
        if (res.code === 200) {
          Object.keys(this.cgjl).forEach(e => {
            this.cgjl[e] = res.data[e];
          });
        }
      }).catch(error => {
        return false;
      })
    },
    /*组合品*/
    zhpAdd() {
      this.zhpdtlTitle = '新增组合品信息';
      this.zhpDtlStatus = false;
      Object.keys(this.zhpDtl).forEach(e => {
        this.zhpDtl[e] = null;
      });
      this.zhpDtl.goodsid = this.goodsid;
      this.zhpDtl.oldapprovedocno = null;
      this.zhpDtlVisiable = true;
    },
    updateZhp(row) {
      this.zhpdtlTitle = '修改组合品信息';
      this.zhpDtlStatus = true;
      Object.keys(this.zhpDtl).forEach(e => {
        this.zhpDtl[e] = row[e];
      });
      this.zhpDtl.goodsid = this.goodsid;
      this.zhpDtl.oldapprovedocno = row.approvedocno;
      this.zhpDtlVisiable = true;
    },
    zhpInsert() {
      let params = {};
      Object.keys(this.zhpDtl).forEach(e => {
        params[e] = this.zhpDtl[e]
      });
      params.inputmanid = Number(sessionStorage['userid']);
      params.companyid = Number(sessionStorage['companyid']);
      params.flag = this.zhpRadio;
      if (this.zhpDtlStatus === false) {
        this.$api.quality.insertHpjcsjwhZhp(params).then(res => {
          if (res.code === 200) {
            alert('保存成功');
            this.selectZhp();
            this.zhpClose();
          }
        }).catch(error => {
          return false;
        })
      } else if (this.zhpDtlStatus === true) {
        this.$api.quality.updateHpjcsjwhZhp(params).then(res => {
          if (res.code === 200) {
            alert('修改成功');
            this.selectZhp();
            this.zhpClose();
          }
        }).catch(error => {
          return false;
        })
      }
    },
    selectZhp() {
      if (this.goodsid === null) {
        return false;
      }
      this.$api.quality.selectHpjcsjwhZhp({goodsid: this.goodsid}).then(res => {
        if (res.code === 200) {
          if (res.data.length === 0) {
            this.zhpRadio = "2";
          } else if (res.data[0].zhpflag === 1) {
            this.zhpRadio = "1";
          } else {
            this.zhpRadio = "2";
          }
          this.zhpTableData = res.data;
        }
      }).catch(error => {
        return false;
      })
    },
    zhpClose() {
      this.zhpDtlVisiable = false;
      Object.keys(this.zhpDtl).forEach(e => {
        this.zhpDtl[e] = null;
      });
    },
    /*品类6*/
    selectPL6(){
      if(this.Pl6Form.goodsid!==""&&this.Pl6Form.goodsid!==null){
        this.$api.quality.selectHpjcsjwhPL6({goodsid:this.Pl6Form.goodsid}).then(res => {
          if (res.code === 200) {
            this.Pl6Form.categoryid = res.data.categoryid;
            this.Pl6Form.categoryname = res.data.categoryname;
          }
        }).catch(() => {
          return false;
        })
      }else {
        return false;
      }
    },
    insertOrUpdatePL6(){
      let params = {};
      if(this.Pl6Form.goodsid!==""&&this.Pl6Form.goodsid!==null){
        params.goodsid = this.Pl6Form.goodsid;
      }else {
        alert("货品ID不能为空");
        return false;
      }
      if(this.Pl6Form.categoryid!==""&&this.Pl6Form.categoryid!==null){
        params.categoryid = Number(this.Pl6Form.categoryid);
      }else {
        alert("请选择货品品类");
        return false;
      }
      if (confirm('是否确认保存') === true) {
        this.$api.quality.insertHpjcsjwhPL6(params).then(res => {
          if(res.code === 200){
            alert("保存成功");
          }else {
            alert(res.msg);
            return false;
          }
        }).catch(() => {
          return false;
        })
      }
    },
    /*hov*/
    openHov(id) {
      if (id === 'factid') {
        this.baseFactVisible = true;
      } else if (id === 'commissionid') {
        this.baseCommissionVisible = true;
      } else if (id === 'qualityscopeid') {
        if(this.zlxx.informationclass !==null&&this.zlxx.informationclass!==""){
          this.zlxxQualityscopeHov.hovColumns[3].value = this.zlxx.informationclass;
        }else{
          alert("请选择资料类别");
          return false;
        }
        this.zlxxQualityscopeVisible = true;
      } else if (id === 'managerid') {
        this.cgjlManagerVisible = true;
      } else if (id === 'companyid') {
        this.cgjlCompanyVisible = true;
      } else if (id === 'goodsid') {
        this.zhpGoodsVisible = true;
      } else if (id === 'zxcolumn4') {
        this.zxcolumn4Visible = true;
      } else if (id === 'categoryid') {
        this.categoryVisible = true;
      }
    },
    returnValue(val) {
      if (typeof val === "boolean") {
        if (val === true) {
          return 1;
        } else {
          return 0
        }
      } else {
        return val;
      }
    },
    getReturnValue(val) {
      if (val === 0 || val === null) {
        return false;
      } else if (val === 1) {
        return true;
      }
    },
    zx3Keypress(e) {
      if (e.keyCode === 13) {
        this.zx3blur();
      }
    },
    zx3blur() {
      this.base.shflmc = null;
      let _this = this;
      let zxcolumn3 = this.base.zxcolumn3;
      if (this.base.zxcolumn3.length !== 19) {
        zxcolumn3 = zxcolumn3.padEnd(19, '0');
      }
      this.base.zxcolumn3 = zxcolumn3;
      this.$api.quality.selectHpjcsjwhssflbm({taxid: this.base.zxcolumn3.toString()}).then(res => {
        if (res.code === 200) {
          console.log(res.data.taxname)
          console.log(_this.base)
          _this.base.shflmc = res.data.taxname;
        }
      }).catch(error => {
        return false;
      })
    },
    drugtypeChange(value) {
      let name = '';
      this.drugtypeOptions.forEach(item => {
        if (value === item.value) {
          name = item.label;
        }
      })
      this.drugtype = name;
    }
  }
}
