### react-native-chat-ui <span style="color:red">(持续开发中...)<span>

#### 简介
一款react native 的聊天UI框架，该框架只是UI层的封装,不做任何IM SDK 的集成，需要集成SDK 的可以自己集成。

#### 安装
`npm install git+https://github.com/25juan/react-native-chat-ui.git --save`

#### 使用方法
```
import { MessageList,MessageInput } from "./react-native-chatui" ;
```

#### MessageList

| 属性   | 含义   |      数据类型      |  默认值 |
|----------|:----------|:-------------:|------:|
| canLoadMore |是否显示查看历史消息文字|  boolean | false |
| isShowIncomingDisplayName |显示对方的用户名|  boolean | true |
| isShowOutgoingDisplayName |显示自己的用户名|  boolean | false |
| renderMessage|自定义消息渲染 |    function   |   ()=>{} |
| onLoadMore|下拉加载更多的回调函数 |    function   |   ()=>{} |
| onMessagePress|点击消息事件 |    function   |   ()=>{} |
| onFailPress|消息发送失败红色感叹号点击事件 |    function   |   ()=>{} |
| onMessageLongPress|消息长按事件 |    function   |   ()=>{} |
| onScroll|消息列表滚动事件 |    function   |   ()=>{} |



| 方法   | 含义   |      参数      |  默认参数 |
|----------|:----------|:-------------:|------:|
| scrollToBottom |滚动到底部|  无 | 无 |
| scrollToTop |滚动到顶部|  无 | 无 |
| appendToTop |追加一条消息到顶部|  message:array | array  |
| appendToBottom |追加一条消息到底部|    message:array   |   array |
| updateMsg |更新消息|    message   |   null |
| deleteMsg |删除消息|    msgid   |   null |


#### MessageInput

| 属性   | 含义   |      数据类型      |  默认值 |
|----------|:----------|:-------------:|------:|
| onHeightChange | 输入框高度变化的函数  |  function | ()=>{} |
| startRecording | 开始录制语音消息回调函数  |  function | ()=>{} |
| stopRecording | 停止录制语音消息回调函数  |  function | ()=>{} |
| onEndReachedRecording | 手指滑动到取消发送的距离的时候触发  |  function | ()=>{} |
| onReachedRecording | 手指滑动时触发的回调函数  |  function | ()=>{} |
| handleImagePicker | 输入框工具栏 图片 点击事件回调函数  |  function | ()=>{} |
| handleCameraPicker | 输入框工具栏 相机 点击事件回调函数   |  function | ()=>{} |
| handleLocationClick | 输入框工具栏 位置 点击事件回调函数   |  function | ()=>{} |

| 方法   | 含义   |      参数      |  默认参数 |
|----------|:----------|:-------------:|------:|
| dismiss |关闭表情选择和工具选择|  无 | 无 |


#### MessageList 数据格式

##### 文本消息数据格式
```javascript
let message = {
    msgId: "msgid", // 消息 id
    status: "send_failed", // 消息状态：send_failed(发送失败)、send_success(发送成功)、send_going(发送中)
    text:"hello world！",//消息文本
    msgType: "text", // 消息类型
    isOutgoing: true,//true 表示当前消息在右边渲染，false 表示当前消息渲染在左边
    fromUser: {
        _id: "", // 用户的id
        name: "sgellar", // 用户名
        avatar: "http://app.yunsdt.com/app/images/wechat-friends.png" // 用户头像
    }
}
```
##### 图片消息数据格式
```javascript
let message = {
    msgId: "msgid", // 消息 id
    status: "send_failed", // 消息状态：send_failed(发送失败)、send_success(发送成功)、send_going(发送中)
    msgType: "image",// 消息类型
    extend:{ 
        imageHeight:80, // 图片在消息列表展示高度
        imageWidth:50,// 图片在消息列表展示宽度
        thumbPath:"http://app.yunsdt.com/app/images/wechat-friends.png",//图片路径(android本地图片需要自带file:/// 前缀) 
   },
    isOutgoing: true,//true 表示当前消息在右边渲染，false 表示当前消息渲染在左边
    fromUser: {
        _id: "", // 用户的id
        name: "sgellar", // 用户名
        avatar: "http://app.yunsdt.com/app/images/wechat-friends.png" // 用户头像
    }
}
```
##### 地理位置消息数据格式
```javascript
let message = {
    msgId: "msgid", // 消息 id
    status: "send_failed", // 消息状态：send_failed(发送失败)、send_success(发送成功)、send_going(发送中)
    title:"四川省成都市", // 地理位置消息显示标题
    msgType: "location", // 消息类型
    isOutgoing: true,//true 表示当前消息在右边渲染，false 表示当前消息渲染在左边
    fromUser: {
        _id: "", // 用户的id
        name: "sgellar", // 用户名
        avatar: "http://app.yunsdt.com/app/images/wechat-friends.png" // 用户头像
    }
}
```      
##### 声音消息数据格式
```javascript
let message = {
    msgId: "msgid", // 消息 id
    status: "send_failed", // 消息状态：send_failed(发送失败)、send_success(发送成功)、send_going(发送中)
    playing:true, // 表示消息是不是在播放中
    duration:1000, // 声音时长(单位ms)
    msgType: "voice", // 消息类型
    isOutgoing: true,//true 表示当前消息在右边渲染，false 表示当前消息渲染在左边
    fromUser: {
        _id: "", // 用户的id
        name: "sgellar", // 用户名
        avatar: "http://app.yunsdt.com/app/images/wechat-friends.png" // 用户头像
    }
}
```      












