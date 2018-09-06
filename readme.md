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
| isShowIncomingDisplayName |显示对方的名字|  boolean | true |
| isShowOutgoingDisplayName |显示自己的名字|  boolean | false |
| messages |消息数据|    array   |   null |
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
                              












