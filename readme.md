### react-native-chat-ui <span style="color:red">(持续开发中...)<span>

#### 简介
一款react native 的聊天UI框架，该框架只是UI层的封装,不做任何IM SDK 的集成，需要集成SDK 的可以自己集成。

#### 安装
`npm install react-native-chat-ui`

#### 使用方法
```
import { MessageList,MessageInput } from "./react-native-chatui" ;
```

#### MessageList

| 属性   | 含义   |      数据类型      |  默认值 |
|----------|:----------|:-------------:|------:|
| canLoadMore |是否先查看历史消息文字|  boolean | false |
| isShowIncomingDisplayName |显示对方的名字|  boolean | true |
| isShowOutgoingDisplayName |显示自己的名字|  boolean | false |
| messages |消息数据|    array   |   null |
| renderMessage|自定义消息渲染 |    function   |   ()=>{} |
| onLoadMore|下拉加载更多的回调函数 |    function   |   ()=>{} |

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


| 方法   | 含义   |      参数      |  默认参数 |
|----------|:----------|:-------------:|------:|
| scrollToBottom |滚动到底部|  无 | 无 |










