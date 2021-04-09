import store from '@/store'
import { baseUrl } from '@/utils/global'

var socket=null;
var count=0;
var toUserId=null;
export function openStocket(){
  if(typeof (WebSocket)==="undefined"){
    console.log("浏览器不支持websocket");
  }else{
    let socketUrl=baseUrl+"/ltt/imserver/"+sessionStorage.getItem('username');
    socketUrl=socketUrl.replace("https","ws").replace("http","ws");
    if(socket!==null){
      socket.close();
      socket=null;
    }
    socket = new WebSocket(socketUrl);
    socket.onopen=socketOpen;
    socket.onmessage=socketMessage;
    socket.onclose=socketClose;
    socket.onerror=socketError
  }
}
export function resetStocket(){
  socket.close();
  socket=null;
  openStocket();
}
export function socketOpen(){
  let params={};
  params.type=1;
  socket.send(JSON.stringify(params));
}
export function socketMessage(data){
  if(data.data==='连接成功'){
    console.log(data.data);
    newLocalList();
  }else{
    let res=JSON.parse(data.data);
    if(res.type==="1"){
      newLocalListArray(res.userlst);
      setList(res);
      if(toUserId!==null){
        getLocalList(toUserId);
        //setReaderNumber(toUserId);
      }
    }else if(res.type==="2"){
      if(testName(res.fromUserId)===true){
        setLocal(res.fromUserId,res.fromUserId,1,res.contentText,res.datetime,1);
      }else{
        setLocal(res.fromUserId,res.fromUserId,1,res.contentText,res.datetime,0);
      }
      socketOpen();
    }else if(res.type==="3"){
      alert("当前聊天人不存在");
      getLocalList(res.toUserId);
      return false;
    }
  }
}
export function setList(res){
  let params=[];
  let locals=localStorage[sessionStorage.getItem('username')];
  res.userlst.forEach(e=>{
    let paramsObject={};
    paramsObject.name=e;
    paramsObject.readnum=JSON.parse(locals)[e].unread;
    params.push(paramsObject);
  });
  store.commit('updateMList',params);
}
export function scrollBottom(){
  let ele = document.getElementById('m-message');
  ele.scrollTop = ele.scrollHeight;
}
export function socketClose(){
  socket.close();
}
export function socketError(){
  count=count+1;
  if(count>=3){
    socket.close();
    count=0;
  }else{
    openStocket();
  }
}
export function sendMessage(data){
  setLocal(data.toUserId,sessionStorage.getItem('username'),2,data.contentText,'',1);
  socket.send(JSON.stringify(data));
  getLocalList(data.toUserId);
}

export function setLocal(toName,userName,status,message,date,number){
  let locals=localStorage.getItem(sessionStorage.getItem('username'));
  let params=JSON.parse(locals);
  let messageList=params[toName].messageList;
  let unread=params[toName].unread;
  let tel={};
  tel.status=status;
  tel.name=userName;
  tel.message=message;
  tel.date=date;
  tel.number=number;
  messageList.push(tel);
  messageList.forEach(e =>{
    if(e.number===0){
      unread=unread+1;
    }
  });
  params[toName].unread=unread;
  localStorage.setItem(sessionStorage.getItem('username'),JSON.stringify(params));
}
//创建数组
export function newLocalList(){
  let localUsername=localStorage.getItem(sessionStorage.getItem('username'));
  if(localUsername===null||localUsername===undefined) {
    let params = {};
    localStorage[sessionStorage.getItem('username')]=JSON.stringify(params);
    store.commit('updateMessageList', []);
  }else {
    return false;
  }
}
export function newLocalListArray(res){
  let localUsername=localStorage[sessionStorage.getItem('username')];
  let localUser=JSON.parse(localUsername);
  res.forEach(e => {
    if(localUser[e]===undefined){
      let tel={};
      tel.unread=0;
      tel.messageList=[];
      localUser[e]=tel;
    }
  });
  localStorage[sessionStorage.getItem('username')]=JSON.stringify(localUser);
}
//获取历史记录
export function getLocalList(name) {
  let params=localStorage[sessionStorage.getItem('username')];
  let paramsList=JSON.parse(params)[name];
  let messageList=paramsList.messageList;
  if(messageList.length>10){
    messageList=messageList.slice(messageList.length-10,messageList.length);
  }
  store.commit('updateMessageList',messageList);
}

export function testName(name){
  if(toUserId===null){
    return false;
  }else return toUserId === name;
}
export function setReaderNumber(name) {
  let params=localStorage[sessionStorage.getItem('username')];
  let list=JSON.parse(params);
  list[name].unread=0;
  list[name].messageList.forEach(e=>{
    e.number=1;
  })
  localStorage.setItem(sessionStorage.getItem('username'),JSON.stringify(list));
  socketOpen();
}
export function setToUserId(val){
  toUserId=val;
}
export function setUnreadNum() {
  let params=localStorage[sessionStorage.getItem('username')];
  let list=JSON.parse(params);
  let num=0;
  Object.keys(list).forEach(e => {
      num=num+list[e].unread;
  })
  store.commit('updateUnreadNum',num);
}
