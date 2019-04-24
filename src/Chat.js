import React,{ Component } from "react" ;
import { View,StyleSheet } from "react-native" ;
import MessageList from './components/MessageContainer';
import MessageInput from "./components/InputToolbar" ;
import RecordMask from "./components/RecordMask" ;
import PropTypes from "prop-types" ;
export default class Chat extends Component {
    state = {
        show:false,
        text:"",
        color:"",
    };
    startRecording = ()=>{
        this.setState({ show:true, text:"手指上滑, 取消发送", color:"transparent" });
        this.props.startRecording();
    };
    stopRecording = (canceled)=>{
        this.setState({
            show:false,
            text:"",
            color:""
        });
        this.props.stopRecording(canceled);
    };
    onEndReachedRecording = ()=>{
        this.setState({
            show:true,
            text:"松开手指, 取消发送",
            color:"#cf0e0e"
        });
        this.props.onEndReachedRecording();
    };
    onReachedRecording = ()=>{
        this.setState({
            show:true,
            text:"手指上滑, 取消发送",
            color:"transparent"
        });
        this.props.onReachedRecording();
    };

    componentDidMount(){
        this.props.onLoad(this.messageList,this.input);
    }
    onSend = (text)=>{
        if(text){
            this.props.onSend(text);
        }
    };
    onMessagePress = (message)=>{
        this.props.onMessagePress(message);
    };
    onMessageLongPress = (message)=>{
        this.props.onMessageLongPress(message);
    };
    onFailPress = (message)=>{
        this.props.onFailPress(message);
    };
    onCameraPicker =()=>{
        this.props.onImagePicker();
    };
    onImagePicker =()=>{
       this.props.onImagePicker();
    };
    onLocationClick = ()=>{
        this.props.onLocationClick();
    };
    onPhonePress = (phone)=>{
        this.props.onPhonePress(phone);
    };
    onUrlPress = (url)=>{
        this.props.onUrlPress(url);
    };
    onEmailPress = (email)=>{
        this.props.onEmailPress(email);
    };
    onMessageListTouch = ()=>{
        this.dismissTools();
        this.props.onMessageListTouch();
    };
    onScroll(){
        this.props.onScroll();
    }
    dismissTools(){
        if(this.input){// 当消息列表滚动的时候关闭表情和同居选择面板
            this.input.dismiss();
        }
    }
    onLoadMoreAsync = (callback)=>{
        this.props.onLoadMoreAsync(callback);
    };
    renderLoadEarlier = ()=>{  };
    onHeightChange = (height)=>{ this.props.onHeightChange(height); };
    render() {
        let { style={ } } = this.props ;
        return (
            <View style={[styles.container,style]}>
                <MessageList
                    containerStyle={ this.props.containerStyle }
                    wrapperStyle={this.props.wrapperStyle}
                    textStyle = {this.props.textStyle}
                    earlierTextStyle = {this.props.earlierTextStyle}
                    earlierContainerStyle = {this.props.earlierContainerStyle}
                    earlierWrapperStyle = {this.props.earlierWrapperStyle}
                    onLoadMoreAsync={this.onLoadMoreAsync}
                    isLoadingEarlier = { this.props.isLoadingEarlier }
                    onAvatarPress = { this.props.onAvatarPress }
                    ref={(messageList)=> this.messageList = messageList }
                    onMessagePress={this.onMessagePress}
                    onFailPress = { this.onFailPress }
                    onMessageLongPress={this.onMessageLongPress}
                    onScroll={()=>this.onScroll()}
                    onMessageListTouch={this.onMessageListTouch}
                    isShowOutgoingDisplayName={true}
                    canLoadMore={ this.props.canLoadMore }
                    onPhonePress={this.onPhonePress}
                    onUrlPress = { this.onUrlPress }
                    onEmailPress = { this.onEmailPress }/>


                <MessageInput onHeightChange={ this.onHeightChange }
                              startRecording={ this.startRecording }
                              stopRecording={ this.stopRecording }
                              renderEmoji={this.props.renderEmoji}
                              onEndReachedRecording = { this.onEndReachedRecording }
                              onReachedRecording={ this.onReachedRecording }
                              handleImagePicker = { this.onImagePicker }
                              handleCameraPicker = { this.onCameraPicker }
                              handleLocationClick={this.onLocationClick}
                              renderTools = { this.props.renderTools }
                              ref={(input)=>this.input = input}
                              onSend={ this.onSend }/>
                <RecordMask  show={ this.state.show }
                             text={ this.state.text }
                             textStyle={ { backgroundColor:this.state.color } }/>
            </View>
        );
    }
}
Chat.propTypes = {
    containerStyle:PropTypes.object,
    wrapperStyle:PropTypes.object,
    textStyle:PropTypes.object,
    earlierTextStyle:PropTypes.object,
    earlierContainerStyle:PropTypes.object,
    earlierWrapperStyle:PropTypes.object,
    isLoadingEarlier:PropTypes.bool,
    canLoadMore:PropTypes.bool,
    startRecording:PropTypes.func,
    stopRecording:PropTypes.func,
    onEndReachedRecording:PropTypes.func,
    onReachedRecording:PropTypes.func,
    onSend:PropTypes.func,
    onFailPress:PropTypes.func,
    onMessagePress:PropTypes.func,
    onMessageLongPress:PropTypes.func,
    onImagePicker:PropTypes.func,
    onCameraPicker:PropTypes.func,
    onLocationClick:PropTypes.func,
    onPhonePress:PropTypes.func,
    onUrlPress:PropTypes.func,
    onEmailPress:PropTypes.func,
    onMessageListTouch:PropTypes.func,
    onScroll:PropTypes.func,
    onLoadMoreAsync:PropTypes.func,
    renderLoadEarlier:PropTypes.func,
    onLoad :PropTypes.func,
    onHeightChange:PropTypes.func,
    onAvatarPress:PropTypes.func,
    renderEmoji:PropTypes.func,
};
Chat.defaultProps = {
    containerStyle:{left:{ },right:{  }},
    wrapperStyle:{left:{ },right:{  }},
    textStyle:{ left:{ },right:{  } },
    earlierTextStyle:{ },
    earlierContainerStyle:{ },
    earlierWrapperStyle:{ },
    isLoadingEarlier:false ,
    canLoadMore:true,
    startRecording:()=>{ },
    stopRecording:PropTypes.func,
    onEndReachedRecording:()=>{ },
    onReachedRecording:()=>{ },
    onSend:()=>{ },
    onMessagePress:()=>{ },
    onMessageLongPress:()=>{ },
    onImagePicker:()=>{ },
    onCameraPicker:()=>{ },
    onLocationClick:()=>{ },
    onPhonePress:()=>{ },
    onUrlPress:()=>{ },
    onEmailPress:()=>{ },
    onMessageListTouch:()=>{ },
    onScroll:()=>{ },
    onLoadMoreAsync:(callback)=>{ callback() },
    renderLoadEarlier:()=>{ },
    onFailPress:()=>{ },
    onLoad:()=>{ },
    onHeightChange:()=>{ },
    onAvatarPress:()=>{ },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    }
});
