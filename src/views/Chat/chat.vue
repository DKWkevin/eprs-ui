<template>
  <el-dialog id="messageDialog" :visible.sync="diaglogStatus" :modal-append-to-body="false" :width="dialogWidth" :top="dialogTop">
    <div class="sidebar">
      <div class="my-card">
        <div class="header">
          <div class="imgbox"></div>
          <p class="name">{{username}}</p>
        </div>
        <div class="footer">
          <!--<el-autocomplete class="search" placeholder="搜索联系人"></el-autocomplete>-->
          <el-button type="info" @click="resetSocket" size="mini" style="padding:4px">重新连接</el-button>
          <el-button type="info" class="fa fa-refresh" circle @click="resetList" size="mini" style="padding:4px"></el-button>
        </div>
      </div>
      <div class="m-list">
        <ul>
          <li v-for="(item,index) in mList" :key="index" @click="listClick(index,item.name)" :class="[index===mListIndex?'active':'']">
            <p class="name">{{item.name}}</p>
            <div class="read" v-if="item.readnum&&item.readnum!==0">{{item.readnum}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="main">
      <div class="m-header"><span v-show="toUser!==null">正在与{{toUser}}交谈</span></div>
      <div class="m-message" id="m-message">
        <div>
        <ul>
          <li v-for="(item,index) in messageList" :key="index">
            <div class="chatLeft" v-if="item.status==1">
              <div class="chatTimeLeft">{{item.name}}</div>
              <div class="chatStripLeft left">
                <div class="chatText">{{item.message}}</div>
                <div class="chatTime">{{item.date}}</div>
              </div>
            </div>
            <div class="chatRight" v-if="item.status==2">
              <div class="chatTimeRight">{{item.name}}</div>
              <div class="chatStripRight right">
                <div class="chatText">{{item.message}}</div>
                <div class="chatTime">{{item.date}}</div>
              </div>
            </div>
          </li>
        </ul>
        </div>
      </div>
      <div class="m-text">
        <textarea class="" placeholder="按回车键发送消息..." @keypress="enterPress($event)" v-model="textareas"></textarea>
        <button @click="btnsend" class="pressfs">发送</button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import '@/assets/css/chat.css'
import store from '@/store'
import {socketOpen,sendMessage,getLocalList,setToUserId,setReaderNumber,resetStocket} from '@/utils/socket'
export default {
  name: 'chat',
  data(){
    return{
      diaglogStatus: false,
      dialogWidth: '840px',
      dialogTop: '10vh',
      username:sessionStorage.getItem('username'),
      //mList:[],
      mListIndex:null,
      toUser:null,
      //messageList:[],
      textareas:null,
      socket:null,
      count:0
    }
  },
  computed:{
    messageList:{
      get(){
        return store.state.socket.messageList;
      },
      set(val){
        store.commit('updateMessageList', val);
      }
    },
    mList:{
      get(){
        return store.state.socket.mList
      },
      set(val){
        store.commit('updateMList', val);
      }
    }
  },
  methods:{
    enterPress(e){
      e=window.event;
      if(e.keyCode===13){
        this.btnsend();
        event.preventDefault();
      }
    },
    btnsend(){
      if(this.toUser===null){
        alert('请选择要发送的人');
        event.preventDefault();
        return false;
      }
      if(this.textareas===""){
        event.preventDefault();
        return false;
      }
      let message={};
      message.type=2;
      message.toUserId=this.toUser;
      message.contentText=this.textareas;
      sendMessage(message);
      this.textareas=null;
    },
    listClick(index,name){
      this.mListIndex=index;
      this.toUser=name;
      setToUserId(name);
      getLocalList(name);
      setReaderNumber(name);
    },
    resetList(){
      socketOpen();
    },
    resetSocket(){
      resetStocket();
    }
  }
}
</script>
