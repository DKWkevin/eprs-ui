var websocket = null
var host = document.location.host
var name = ''

if ('webSocket' in window) {
  //alert('浏览器支持Websocket')
  websocket = new WebSocket('ws://'+host+'/mm-dorado/websocket/'+ username)
} else {
  alert('浏览器不支持Websocket')
}
// 连接发生错误回调
websocket.onerror = function () {
  //alert('WebSocket连接发生错误')
  setMessageInnerHTML('WebSocket连接发生错误')
}
// 连接成功回调
websocket.onopen = function () {
  //alert('WebSocket连接成功')
  setMessageInnerHTML('WebSocket连接成功')
}
//收到消息回调
websocket.onmessage = function () {
  websocket.close()
}
//连接关闭
websocket.onclose = function () {

}
