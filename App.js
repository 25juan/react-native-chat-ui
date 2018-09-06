/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { MessageList,MessageInput } from "./src" ;
import Chat from "./src/Chat" ;

const mock = ()=>{
  let  list = [] ;
  for(i = 0 ;i<5;i++){
    list.push({  // 文本
      msgId: "msgid",
      status: "send_failed",
      msgType: "text",
      isOutgoing: !(i%2), // true 代表发送者
      text: `第${i+1}条消息....`,
      fromUser: {
        _id: "",
        name: "sgellar",
        avatar: "http://app.yunsdt.com/app/images/wechat-friends.png" // 这里只能http 路径
      }
   });
  }
  return list ;
}


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/*<MessageList*/}
          {/*canLoadMore={ true }*/}
          {/*messages={[]}/>*/}

        {/*<MessageInput onHeightChange={ height=>{} }*/}
                      {/*onSend={ text=>{ console.log(text) } }*/}
        {/*/>*/}
        <Chat/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});
