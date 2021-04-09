import Vue from 'vue'
import api from '../http/api'
var selfs;
function loads(value){
  selfs = value;
}
function selectCounterLoad(node){
  let counterArray=[];
  let key = node.valueName;
  let params={};
  params[key] = node.value;
  params.cityid = node.cityid;
  //api.discInfo.selectCounters({pageNum:1,pageSize:999,params:{companyid:3}}).then(res => {
  api.discInfo.selectCounter({pageNum:1,pageSize:999,params:params}).then(res => {
    if(res.code === 200){
      res.data.content.map((city,index) => {
        let childIndex=node.childIndex;
        if(node.check === true){
            counterArray.push({value:city.counterid,label:city.countername,display:false,check:true,children:[],valueName:'counterid',selectName:'',parentId:node.value,indeterminate:false,childName:'',childIndex:childIndex})
        }else{
            counterArray.push({value:city.counterid,label:city.countername,display:false,check:false,children:[],valueName:'counterid',selectName:'',parentId:node.value,indeterminate:false,childName:'',childIndex:childIndex});
        }
      });
      node.children = counterArray;
    }
  }).catch(error =>{
    return false;
  });
}
//片区
function selectSubcityLoad(node){
  let counterArray=[];
  let key = node.valueName;
  let params={};
  params[key] = node.value;
  //api.discInfo.selectCounters({pageNum:1,pageSize:999,params:{companyid:3}}).then(res => {
  api.discInfo.selectSubcity({pageNum:1,pageSize:999,params:params}).then(res => {
    if(res.code === 200){
      res.data.content.map((city,index) => {
        let childIndex=node.childIndex+','+index;
      if(node.check === true){
          counterArray.push({value:city.subcityid,label:city.subcityname,display:false,check:true,children:[],valueName:'subcityid',selectName:'selectCounterLoad',parentId:node.value,indeterminate:false,childName:'counterbeanlst',childIndex:childIndex,cityid:node.value})
      }else{
          counterArray.push({value:city.subcityid,label:city.subcityname,display:false,check:false,children:[],valueName:'subcityid',selectName:'selectCounterLoad',parentId:node.value,indeterminate:false,childName:'counterbeanlst',childIndex:childIndex,cityid:node.value});
      }
      });
      node.children = counterArray;
    }
  }).catch(error =>{
    return false;
  });
}
function checkChild(item,check){
  item.forEach(child => {
    if(check === true){
      child.check = true;
    }else {
      child.check = false;
    }
    this.checkChild(child.children,child.check);
  })
}
/*function checkParentAll(data,indexs,indexLength,count){
    if(data[indexs[count]].children.length>0){
      if(childFalse(data[indexs[count]].children) === 0){
        data[indexs[count]].check = true;
        data[indexs[count]].indeterminate = false;
      }else if(childFalse(data[indexs[count]].children) === 1){
        data[indexs[count]].check = false;
        data[indexs[count]].indeterminate = true;
      }else{
        data[indexs[count]].check = false;
        data[indexs[count]].indeterminate = false;
      }
      console.log(data[indexs[count]].value,childFalse(data[indexs[count]].children))
      if(count===indexLength){
        return;
      }else{
        console.log(data[indexs[count]].children)
        checkParentAll(data[indexs[count]].children, indexs, indexLength, count+1);
      }
    }
}*/
function checkParentAll(id,parent,treeItemData,children,level){
  let ref = "";
  if(level === 1){
    ref = selfs.$refs.checkAll;
  }else {
    let refs = (level-1)+'_'+ id;
    ref = parent.$refs[refs];
  }
  if(children.length!==''){
    let boob = childFalse(children);
    if(boob === 0){
      treeItemData.check = true;
      treeItemData.indeterminate = false;
      ref.indeterminate = false;
    }else if(boob === 2){
      treeItemData.check = false;
      treeItemData.indeterminate = true;
      ref.indeterminate = true;
    }else if(boob === 1){
      treeItemData.check = false;
      treeItemData.indeterminate = false;
      ref.indeterminate = false;
    }
    if(parent.$parent.treeItemData!==undefined&&parent.$parent.treeData===undefined){
      checkParentAll(parent.treeItemData.parentId,parent.$parent,parent.$parent.treeItemData,parent.$parent.treeItemData.children,level-1);
    }else if(parent.$parent.treeItemData===undefined&&parent.$parent.treeData !== undefined){
      checkParentAll(null,parent.$parent,parent.$parent.treeData,parent.$parent.treeData,level-1);
    }
  }
}
function childFalse(data){
  let param = 0;
  let imdeter = 0;
  data.forEach(item => {
    if(item.check === false){
      param = param + 1;
    }
    if(item.indeterminate === false){
      imdeter = imdeter + 1;
    }
  });
  let boob = 0;
  if(param === 0&&imdeter === data.length){
    boob = 0;
  }else if(param === data.length&&imdeter === data.length){
    boob = 1;
  }else{
    boob = 2;
  }
  return boob;
}

function checkParent(item){
  if(item.level > 1){
    checkParentAll(item.treeItemData.parentId,item.$parent,item.$parent.treeItemData,item.$parent.treeItemData.children,item.level);
  }
  let childs = childFalse(selfs.areaOption);
  if(childs === 0){
    selfs.checkAll = true;
    selfs.$refs.checkAll.indeterminate = false;
  }else if(childs === 2){
    selfs.checkAll = false;
    selfs.$refs.checkAll.indeterminate = true;
  }else  if(childs === 1){
    selfs.checkAll = false;
    selfs.$refs.checkAll.indeterminate = false;
  }
}
export default function (Vue) {
  Vue.prototype.$selectLoad = {
    selectCounterLoad,
    checkChild,
    checkParent,
    loads,
    selectSubcityLoad
  }
}
