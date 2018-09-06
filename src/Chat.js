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
    stopRecording = ()=>{
        this.setState({
            show:false,
            text:"",
            color:""
        });
        console.log("stop recording...")
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
        this.messageList.appendToBottom([mockText(true,text)
            ,mockImage()
            ,mockLocation()
            ,mockVoice()
            ,mockVoice(false,true,true)
            ,mockVoice(false,true)]);
    };
    onMessagePress = (message)=>{
        alert(message.msgType+"")
        console.log("message press....",message)
    };
    onMessageLongPress = (message)=>{
        alert(message.msgType+"")
        console.log("message long press....",message)
    };
    handleCameraPicker =()=>{

    };
    onFailPress = (message)=>{
        console.log("fail...")
        alert("fail messgae id"+message.msgType);
    };
    handleImagePicker =()=>{

    };
    handleLocationClick = ()=>{

    };
    onPhonePress = ()=>{

    };
    onUrlPress = ()=>{

    };
    onEmailPress = ()=>{

    };
    onScroll(){
        if(this.input){// 当消息列表滚动的时候关闭表情和同居选择面板

            Keyboard.dismiss();
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
