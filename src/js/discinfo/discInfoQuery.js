let _this = null;

const sendThis = (vm) => {
  _this = vm
}

function selectDiscClassOption(){
  _this.$api.discInfo.selectDiscClass({}).then(res => {
    if(res.code === 200){
      _this.discClassOption = res.data;
    }
  }).catch(() =>{
    return false;
  });
}
function cardTypeLoad()
{
  let params=[];
  _this.$api.discInfo.selectCardType({pageNum:1,pageSize:999,params:null}).then(res => {
    if(res.code === 200){
      params.push({value:0,label:"非会员"});
      res.data.content.forEach(item =>{
        if(item.cardtypeid!==4&&item.cardtypeid!==5&&item.cardtypeid!==99){
          params.push({value:item.cardtypeid,label:item.typename})
        }
      });
      _this.cardTypeOption=params;
    }
  }).catch(() =>{
    return false;
  });
}
function queryFunction(){
  selectDoc(1, _this.docPageSize);
}
function handleChange(data){
  selectDoc(data.pageNum,data.pageSize);
}

function selectDoc(pageNum,pageSize){
  let params = {};
  let formData = _this.formData;
  if(formData.discid!==null&&formData.discid!==""){
    params.discid = formData.discid;
  }
  if(formData.discname!==null&&formData.discname!==""){
    params.discname = formData.discname;
  }
  if(formData.begindate!==null&&formData.begindate!==""){
    params.begindate = new Date(formData.begindate);
  }
  if(formData.enddate!==null&&formData.enddate!==""){
    params.enddate = new Date(formData.enddate);
  }
  if(formData.discclassname!==null&&formData.discclassname!==""){
    params.discclassname = formData.discclassname[formData.discclassname.length - 1];
  }
  if(formData.cardtypeid.length > 0){
    params.cardtypeid = formData.cardtypeid.toString();
  }
  if(formData.usestatus!==null&&formData.usestatus!==""){
    params.usestatus = formData.usestatus;
  }
  if(formData.classoutermutex!==null&&formData.classoutermutex!==""){
    params.classoutermutex = formData.classoutermutex;
  }
  params.companyid = Number(sessionStorage['companyid']);
  _this.tableData = [];
  _this.loading = true;
  _this.$api.discInfo.selectDoc({pageNum:pageNum,pageSize:pageSize,params:params}).then(res => {
    if(res.code === 200){
      _this.tableData = res.data.content;
      _this.docPageSize = res.data.pageSize;
      _this.docPageNum = res.data.pageNum;
      _this.docTotal = res.data.totalSize;
      _this.loading=false;
    }
  }).catch(() => {
    _this.loading=false;
    return false;
  })
}
function handleComfirm(row){
  if (row.usestatus !== 1) {
    alert("该状态不可操作");
    return false;
  }
  if (confirm("是否确认") === true) {
    _this.discInfoLoading = true;
    let params = {discid:row.discid, checkmanid:Number(sessionStorage['userid']), usestatus:2};
    _this.$api.discInfo.discInfoComfirm(params).then(res => {
      if (res.code === 200) {
        alert("确认成功");
        _this.discInfoLoading = false;
        let pageSize = _this.docPageSize;
        let pageNum = _this.docPageNum;
        selectDoc(pageNum, pageSize);
      }else{
        alert(res.msg);
        _this.discInfoLoading = false;
        return false;
      }
    }).catch(() => {
      return false;
    });
  } else {
    return false;
  }
}
function handleDelete (row) {
  if (row.usestatus === 0) {
    alert("该状态不可操作");
    return false;
  }
  if (confirm("是否作废") === true) {
    _this.discInfoLoading = true;
    let params = {discid:row.discid, invalidmanid:Number(sessionStorage['userid']), usestatus:0};
    _this.$api.discInfo.discInfoDelete(params).then(res => {
      if (res.code === 200) {
        if (res.data === 1) {
          alert("作废成功");
          _this.discInfoLoading = false;
          let pageSize = _this.docPageSize;
          let pageNum = _this.docPageNum;
          selectDoc(pageNum, pageSize);
        }
      }
    }).catch(() => {
      _this.discInfoLoading = false;
      return false;
    });
  }else {
    return false;
  }
}
function handleDtl(row) {
  _this.discid = row.discid;
  if (row.discclassid === 9) {
    _this.dtlName = 'discount';
    _this.dtlIndex = 'discCount';
    selectDiscCount(_this.discid);
  } else if (row.discclassid === 13) {
    _this.dtlName = 'rightreduce';
    _this.dtlIndex = 'rightreduce';
    selectRightReduce(_this.discid);
  }
}
function selectCounter(value){
  _this.dtlStatus = true;
  _this.counterData = [];
  let params = {discid:value};
  _this.dtlLoading = true;
  _this.$api.discInfo.discInfoQueryCounter(params).then(res => {
    if (res.code === 200) {
      _this.counterData = res.data;
      _this.dtlLoading =false;
    }
  }).catch(() => {
    _this.dtlLoading =false;
    return false;
  });
}
function selectDiscCount(value){
  _this.dtlStatus = true;
  _this.disccountData = [];
  let params = {discid:value};
  _this.dtlLoading = true;
  _this.$api.discInfo.discInfoQueryDiscCount(params).then(res => {
    if (res.code === 200) {
      let discCount = [];
      res.data.forEach(item => {
        if(item.supplydisc!==0){
          item.supplydisc = item.supplydisc + '%';
        }
        if(item.saledisc!==0){
          item.saledisc = item.saledisc + '%';
        }
        discCount.push(item);
      });
      _this.disccountData = discCount;
      _this.dtlLoading =false;
    }
  }).catch(() => {
    _this.dtlLoading =false;
    return false;
  });
}
function handleInvalidLimitChange(data) {
  _this.invalidLimitPageNum = data.pageNum;
  _this.invalidLimitPageSize = data.pageSize;
  selectDiscCountLimit(_this.discid);
}
function selectDiscCountLimit(value){
  _this.dtlStatus = true;
  _this.invalidLimitData= [];
  let pageNum = _this.invalidLimitPageNum;
  let pageSize = _this.invalidLimitPageSize;
  let params = {discid:value};
  _this.dtlLoading = true;
 // _this.$api.discInfo.discInfoQueryDiscCountLimit({params:params}).then(res => {
  _this.$api.discInfo.discInfoQueryDiscCountLimit({pageNum:pageNum,pageSize:pageSize,params:params}).then(res => {
    if (res.code === 200) {
      let discCountLimit = [];
      res.data.content.forEach(item => {
        if(item.supplydisc!==0){
          item.supplydisc = item.supplydisc + '%';
        }
        if(item.saledisc!==0){
          item.saledisc = item.saledisc + '%';
        }
        discCountLimit.push(item);
      });
      _this.invalidLimitData = discCountLimit;
      _this.invalidLimitPageSize = res.data.pageSize;
      _this.invalidLimitPageNum = res.data.pageNum;
      _this.invalidLimitTotal = res.data.totalSize;
      _this.dtlLoading =false;
    }
  }).catch(() => {
    _this.invalidLimitTotal = 0;
    _this.dtlLoading =false;
    return false;
  });
}
function selectRightReduce(value){
  _this.dtlStatus = true;
  _this.rightreduceData= [];
  _this.rightreduceLimitData = [];
  let params = {discid:value};
  _this.dtlLoading = true;
  _this.$api.discInfo.discInfoQueryRightReduce(params).then(res => {
    if (res.code === 200) {
      if(res.data[0].reducetype === 0){
        _this.righteduceReducetype = 0;
      }else {
        _this.righteduceReducetype = 1;
      }
      _this.rightreduceData = res.data;
      selectRightReduceLimit(res.data[0])
      _this.dtlLoading =false;
    }
  }).catch(() => {
    _this.dtlLoading =false;
    return false;
  });
}
function selectRightReduceLimit(row){
  _this.dtlStatus = true;
  _this.rightreduceLimitData= [];
  let params = {discid:row.discid,dtlid:row.dtlid};
  _this.dtlLoading = true;
  _this.$api.discInfo.discInfoQueryRightReduceLimit(params).then(res => {
    if (res.code === 200) {
      _this.rightreduceLimitData = res.data;
      _this.dtlLoading =false;
    }
  }).catch(() => {
    _this.dtlLoading =false;
    return false;
  });
}
function handleClick(){
  if(_this.dtlIndex === 'counter'){
    selectCounter(_this.discid);
  } else if (_this.dtlIndex === 'discCount'){
    selectDiscCount(_this.discid);
  } else if (_this.dtlIndex === 'discCountLimit'){
    selectDiscCountLimit(_this.discid);
  } else if (_this.dtlIndex === 'rightreduce') {
    selectRightReduce(_this.discid)
  }
}
function dtlDialogClose(){
  _this.counterData = [];
  _this.disccountData = [];
  _this.invalidLimitData= [];
  _this.dtlLoading = false;
  _this.dtlIndex='counter';
  _this.discid=null;
  _this.dtlStatus = false;
}
export default {
  sendThis,
  selectDiscClassOption,
  cardTypeLoad,
  handleChange,
  queryFunction,
  selectDoc,
  handleComfirm,
  handleDelete,
  handleDtl,
  selectCounter,
  selectDiscCount,
  selectDiscCountLimit,
  handleInvalidLimitChange,
  selectRightReduce,
  selectRightReduceLimit,
  handleClick,
  dtlDialogClose
}
