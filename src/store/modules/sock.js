import Stomp from 'stompjs'
import SockJs from 'sockjs-client'
import {Notification} from 'element-ui'
import axios from '@/http/axios'


export default {
  state: {
    stomp: null,
    currentSession: null,
    currentHr: JSON.parse(window.sessionStorage.getItem('user')),
    isDot: '',
    sessions: {},
    hrs: []
  },
  mutations: {
    INIT_CURRENTHR(state, hr) {
      state.currentHr = hr;
    },
    changeCurrentSession(state, currentSession) {
      Vue.set(state.isDot, state.currentHr.username + '#' + currentSession.username, false);
      state.currentSession = currentSession;
    },
    addMessage (state, msg) {
      let mss = state.sessions[state.currentHr.username + '#' + msg.to]
      if (!mss) {
        Vue.set(state.sessions, state.currentHr.username + '#' + msg.to, true)
      }
      state.sessions[state.currentHr.username + '#' + msg.to].push({
        content: msg.content,
        date: new Date(),
        self: !msg.notself
      })
    },
    INIT_DATA(state) {
      //浏览器本地的历史聊天记录可以在这里完成
      let data = localStorage.getItem('vue-chat-session');
      if (data) {
        state.sessions = JSON.parse(data);
      }
    },
    INIT_HR(state, data) {
      state.hrs = data;
    }
  },
  actions: {
    connect (context) {
      context.state.stomp = Stomp.over(new SockJs('/ws/ep'))
      context.state.stomp.connect({}, success => {
        context.state.stomp.subscribe('', message => {
          let receiveMsg = JSON.parse(message.body)
          if (!context.state.currentSession) {
            Notification.info({
              title: "["+receiveMsg.fromName+"]发来一条消息",
              message: receiveMsg.context.length > 10 ? receiveMsg.context.substring(0, 10) : receiveMsg.context,
              position: "bottom-right"
            })
            Vue.set(context.state.isDot, context.state.currentHr.username + '#' + receiveMsg.from, true)
          }
          receiveMsg.notself = true
          receiveMsg.to = receiveMsg.from
          context.commit('addMessage', receiveMsg)
        })
      })
    },
    initData(context) {
      context.commit('INIT_DATA')
      axios({url:"/chat/hrs",method: 'post'}).then(resp => {
        if (resp) {
          context.commit('INIT_HR', resp);
        }
      })
    }
  }
}
/* sock.watch(function (state) {
  return state.sessions
}, function (val) {
  localStorage.setItem('vue-chat-session', JSON.stringify(val))
}, {
  deep: true
}) */
