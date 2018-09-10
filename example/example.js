import React,{ Component } from "react" ;
import { View,StyleSheet,CameraRoll,Keyboard,Text } from "react-native" ;
import Chat from "react-native-chat-ui" ;

import { mockText,mockImage,mockLocation,mockVoice } from "./mock";

export default class ChatDemo extends Component {
    state = {
        show:false,
        text:"",
        color:"",
    };
    startRecording = ()=>{
        console.log("开始录音...")
    };
    stopRecording = (canceled)=>{
        if(canceled){// 取消录音发送
            return  ;
        }
        let sendMsg = mockVoice(true) ;
        let receiveMsg = mockVoice(false) ;
        this.messageList.appendToBottom([sendMsg]);
        setTimeout(()=>{
            this.messageList.appendToBottom([receiveMsg]);
        },800);
        setTimeout(()=>{
            sendMsg.status = "send_success" ;
            this.messageList.updateMsg(sendMsg);
        },600);

    };


    onSend = (text)=>{
        let sendMsg = mockText(true,text,"send_going") ;
        let receiveMsg = mockText(false,text) ;
        this.messageList.appendToBottom([sendMsg]);
        setTimeout(()=>{
            this.messageList.appendToBottom([receiveMsg]);
        },800);
        setTimeout(()=>{
            sendMsg.status = "send_success" ;
            this.messageList.updateMsg(sendMsg);
        },600);
    };
    onMessagePress = (message)=>{
        if(message.msgType=== "voice"){
            message.playing = true ;
            message.isRead = true ;
            this.messageList.updateMsg(message);
            setTimeout(()=>{
                message.playing = false ;
                this.messageList.updateMsg(message);
            },1000);
            return ;
        }
        alert(message.msgType+"");
        console.log("message press....",message)
    };
    onMessageLongPress = (message)=>{
        alert(message.msgType+"")
        console.log("message long press....",message)
    };
    onCameraPicker =()=>{
        this.handleImagePicker();
    };
    onFailPress = (message)=>{
        console.log("fail...")
        alert("fail messgae id"+message.msgType);
    };
    onImagePicker =()=>{
        let sendMsg = mockImage(true,"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536298415755&di=3979575fd677e35442398fa90233c586&imgtype=0&src=http%3A%2F%2Fs4.sinaimg.cn%2Fmw690%2F001sB7zxzy74flKL4FJb3%26690") ;
        let receiveMsg = mockImage(false,"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536298415755&di=3979575fd677e35442398fa90233c586&imgtype=0&src=http%3A%2F%2Fs4.sinaimg.cn%2Fmw690%2F001sB7zxzy74flKL4FJb3%26690") ;
        this.messageList.appendToBottom([sendMsg]);
        setTimeout(()=>{
            this.messageList.appendToBottom([receiveMsg]);
        },800);
        setTimeout(()=>{
            sendMsg.status = "send_success" ;
            this.messageList.updateMsg(sendMsg);
        },600);
    };
    onLocationClick = ()=>{
        let sendMsg = mockLocation(true) ;
        let receiveMsg = mockLocation(false) ;
        this.messageList.appendToBottom([sendMsg]);
        setTimeout(()=>{
            this.messageList.appendToBottom([receiveMsg]);
        },800);
        setTimeout(()=>{
            sendMsg.status = "send_success" ;
            this.messageList.updateMsg(sendMsg);
        },600);
    };
    onPhonePress = (phone)=>{
        console.log("电话号码点击事件...",phone);
    };
    onUrlPress = (url)=>{
        console.log("url点击事件...",url);
    };
    onEmailPress = (email)=>{
        console.log("邮件点击事件...",email);
    };
    onMessageListTouch = ()=>{
        console.log("列表手指点下事件...");
    };
    onScroll(){
        console.log("滚动消息列表");
    }
    onLoadMoreAsync = ()=>{
        console.log("加载更多")
    };
    render() {
        return <Chat onLoad={(messageList,input)=>{
                        this.messageList = messageList ;
                        this.input = input ;}}
                     onSend = { this.onSend }
                     stopRecording={this.stopRecording}
                     onMessagePress={this.onMessagePress}
                     onMessageLongPress={this.onMessageLongPress}
                     onCameraPicker={this.onCameraPicker}
                     onFailPress={this.onFailPress}
                     onImagePicker={this.onImagePicker}
                     onLocationClick={this.onLocationClick}
                     onPhonePress={this.onPhonePress}
                     onUrlPress={this.onUrlPress}
                     onEmailPress={this.onEmailPress}
                     onMessageListTouch={this.onMessageListTouch}
                     onScroll={this.onScroll}
                     onLoadMoreAsync={this.onLoadMoreAsync}
        />;
    }
}