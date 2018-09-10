import React,{ Component } from "react" ;
import { View,StyleSheet,CameraRoll,Keyboard } from "react-native" ;
import MessageList from './components/MessageContainer';
import MessageInput from "./components/InputToolbar" ;
import RecordMask from "./components/RecordMask" ;

import { mockText,mockImage,mockLocation,mockVoice } from "./mock";

export default class App extends Component {
    state = {
        show:false,
        text:"",
        color:"",
    };
    startRecording = ()=>{
        this.setState({
            show:true,
            text:"手指上滑, 取消发送",
            color:"transparent"
        });
        console.log("start recording...")

    };
    stopRecording = (caceled)=>{
        this.setState({
            show:false,
            text:"",
            color:""
        });
        if (caceled){
            return ;
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
    onEndReachedRecording = ()=>{
        this.setState({
            show:true,
            text:"松开手指, 取消发送",
            color:"#cf0e0e"
        });
    };
    onReachedRecording = ()=>{
        this.setState({
            show:true,
            text:"手指上滑, 取消发送",
            color:"transparent"
        });
    };

    componentDidMount(){
        this.onSend("第一条消息") ;
    }

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
    handleCameraPicker =()=>{
        this.handleImagePicker();
    };
    onFailPress = (message)=>{
        console.log("fail...")
        alert("fail messgae id"+message.msgType);
    };
    handleImagePicker =()=>{
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
    handleLocationClick = ()=>{
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
    onPhonePress = ()=>{

    };
    onUrlPress = ()=>{

    };
    onEmailPress = ()=>{

    };
    onMessageSwipe = ()=>{
        this.dismissTools();
    };
    onScroll(){

    }
    dismissTools(){
        if(this.input){// 当消息列表滚动的时候关闭表情和同居选择面板
            this.input.dismiss();
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <MessageList
                    ref={(messageList)=> this.messageList = messageList }
                    onMessagePress={this.onMessagePress}
                    onFailPress = { this.onFailPress }
                    onMessageLongPress={this.onMessageLongPress}
                    onScroll={()=>this.onScroll()}
                    onMessageSwipe={this.onMessageSwipe}
                    isShowOutgoingDisplayName={true}
                    canLoadMore={ true }
                    onPhonePress={this.onPhonePress}
                    onUrlPress = { this.onUrlPress }
                    onEmailPress = { this.onEmailPress }/>


                <MessageInput onHeightChange={ height=>{} }
                              startRecording={ this.startRecording }
                              stopRecording={ this.stopRecording }
                              onEndReachedRecording = { this.onEndReachedRecording }
                              onReachedRecording={ this.onReachedRecording }
                              handleImagePicker = { this.handleImagePicker }
                              handleCameraPicker = { this.handleCameraPicker }
                              handleLocationClick={this.handleLocationClick}
                              ref={(input)=>this.input = input}
                              onSend={ this.onSend }/>
                <RecordMask  show={ this.state.show }
                             text={ this.state.text }
                             color={ this.state.color }/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    }
});
