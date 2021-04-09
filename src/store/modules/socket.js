export default {
  state: {
    // 主入口标签页
    mList: [],
    // 当前标签页名
    messageList: [],
    unreadNum:null
  },
  mutations: {
    updateMList (state, tabs) {
      state.mList = tabs
    },
    updateMessageList (state, name) {
      state.messageList = name
    },
    updateUnreadNum (state, name) {
      state.unreadNum = name
    }
  }
}
