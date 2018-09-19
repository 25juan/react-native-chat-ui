import React,{ Fragment } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
    Image,
    View,
    Text,Platform
} from 'react-native';

import MessageText from './MessageText';
import MessageImage from './MessageImage';
import MessageAudio from './MessageAudio';
import MessageLocation from './MessageLocation';
import Time from './Time';


import PropTypes from 'prop-types';
export default class Bubble extends React.Component {
    constructor(props) {
        super(props);
        this.onLongPress = this.onLongPress.bind(this);
        this.onPress = this.onPress.bind(this);
    }

    renderMessageText() {
        if (this.props.currentMessage.msgType === 'text') {
            const {containerStyle, wrapperStyle, ...messageTextProps} = this.props;
            if (this.props.renderMessageText) {
                return this.props.renderMessageText(messageTextProps);
            }
            return <MessageText {...messageTextProps}/>;
        }
        return null;
    }

    renderMessageImage() {
        if (this.props.currentMessage.msgType === 'image' && this.props.currentMessage.extend) {
            const {containerStyle, wrapperStyle, ...messageImageProps} = this.props;
            if (this.props.renderMessageImage) {
                return this.props.renderMessageImage(messageImageProps);
            }
            return <MessageImage {...messageImageProps}/>;
        }
        return null;
    }

    renderMessageAudio() {
        if (this.props.currentMessage.msgType === 'voice') {
            return <MessageAudio {...this.props}/>;
        }
        return null ;
    }

    renderMessageLocation() {
        if (this.props.currentMessage.msgType === 'location') {
            return <MessageLocation {...this.props}/>;
        }
    }
    
    renderTime() {
        if (this.props.currentMessage.createdAt) {
            const {containerStyle, wrapperStyle, ...timeProps} = this.props;
            if (this.props.renderTime) {
                return this.props.renderTime(timeProps);
            }
            return <Time {...timeProps}/>;
        }
        return null;
    }

    onLongPress() {
        if (this.props.onMessageLongPress) {
            this.props.onMessageLongPress(this.props.currentMessage);
        }
    }

    onPress() {
        if (this.props.onMessagePress) {
            this.props.onMessagePress(this.props.currentMessage);
        }
    }

    //发送失败标志
    renderFlags() {
        let onFailPress = this.props.onFailPress  ;
        const msg = this.props.currentMessage;
        if ( this.props.currentMessage.isOutgoing ) { // 自己发送的消息
            if (msg.status === 'send_failed') { // 消息发送失败
                return Platform.OS === 'android'?(
                    <TouchableNativeFeedback onPress={()=>{ onFailPress(msg); }}>
                        <Image style={{alignSelf:"flex-end", width:20, height:20}}
                               source={require('./Images/MessageSendError.png')}>
                        </Image>
                    </TouchableNativeFeedback>
                ):(<TouchableWithoutFeedback onPress={()=>onFailPress(msg)}>
                    <Image style={{alignSelf:"flex-end", width:30, height:30}}
                           source={require('./Images/MessageSendError.png')}>
                    </Image>
                </TouchableWithoutFeedback>);
            }else if(msg.status === 'send_going'){
                return <ActivityIndicator color={"#47baa6"} size={"small"}/> ;
            }else {
                return null ;
            }
        }

        if (!msg.isOutgoing && msg.msgType === 'voice') { // 对方发送的消息
            if (!msg.isRead) { // 表示消息未读
                return (
                    <View style={{marginLeft:4, justifyContent:"center"}}>
                        <View style={{
                            backgroundColor:"red",
                            width:8,
                            height:8,
                            borderRadius:90}}/>
                    </View>

                );
            }
            return null ;
        }

        if (msg.isOutgoing && msg.msgType === "voice") {
            return (
                <View style={{marginRight:4, justifyContent:"flex-end"}}>
                    <Text style={{color:"lightgrey"}}>
                        {"" + msg.duration + "''"}
                    </Text>
                </View>
            );                
        }

    }
    _renderContent(){
        if(Platform.OS === 'android'){
            return (
                <TouchableNativeFeedback
                    delayLongPress={1000}
                    onLongPress={this.onLongPress}
                    onPress={this.onPress}
                    {...this.props.touchableProps}
                >
                    <View>
                        {this.renderMessageImage()}
                        {this.renderMessageText()}
                        {this.renderMessageAudio()}
                        {this.renderMessageLocation()}
                        {/*this.renderTime()*/}
                    </View>
                </TouchableNativeFeedback>
            )
        }
        return (
            <TouchableWithoutFeedback
                onLongPress={this.onLongPress}
                onPress={this.onPress}
                {...this.props.touchableProps}
            >
                <View>
                    {this.renderMessageImage()}
                    {this.renderMessageText()}
                    {this.renderMessageAudio()}
                    {this.renderMessageLocation()}
                    {/*this.renderTime()*/}
                </View>
            </TouchableWithoutFeedback>
        )
    }
    renderLeft() {
        return (
            <View style={[styles['left'].container, this.props.containerStyle['left']]}>
                <View style={[styles['left'].wrapper, this.props.wrapperStyle['left']]}>
                    {this._renderContent()}
                </View>
                {this.renderFlags()}
            </View>
        );        
    }
    renderRight() {
        return (
            <View style={[styles['right'].container, this.props.containerStyle['right']]}>
                {this.renderFlags()}

                <View style={[styles['right'].wrapper, this.props.wrapperStyle['right']]}>
                    {this._renderContent()}
                </View>
            </View>
        );        
    }

    renderCenter() {
        let msg = this.props.currentMessage;
        if(msg.msgType === 'notification'){
            return (
                <View style={{alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 5,
                          marginBottom: 10}}>
                    <View style={{backgroundColor:'#cecece',borderRadius:5,paddingHorizontal:5,paddingVertical:3 }}>
                        <Text style={{
                                  color: '#fff',
                                  fontSize: 12,
                                  fontWeight: '400',}}>
                            {msg.extend.tipMsg}
                        </Text>
                    </View>
                </View>
            );
        }
        return null;

    }
    
    render() {
        if (this.props.position === 'left') {
            return this.renderLeft();
        } else if (this.props.position === 'right') {
            return this.renderRight();
        } else if (this.props.position === 'center') {
            return this.renderCenter();
        } else {
            return null;
        }
    }
}

const styles = {
    left: StyleSheet.create({
        container: {
            flex: 1,
            marginRight: 60,
            flexDirection:"row",
            justifyContent:"flex-start",
        },
        wrapper: {
            borderRadius: 5,
            minHeight: 20,
            justifyContent: 'flex-end',
            backgroundColor: '#e7e7e7',
        },
        containerToNext: {
            borderBottomLeftRadius: 3,
        },
        containerToPrevious: {
            borderTopLeftRadius: 3,
        },
    }),
    right: StyleSheet.create({
        container: {
            flex: 1,
            marginLeft: 60,
            flexDirection:"row",
            justifyContent:"flex-end",
        },
        wrapper: {
            borderRadius: 5,
            backgroundColor: '#238dfa',
            minHeight: 20,
            justifyContent: 'flex-end',
        },
        containerToNext: {
            borderBottomRightRadius: 3,
        },
        containerToPrevious: {
            borderTopRightRadius: 3,
        },
    }),
};

Bubble.contextTypes = {

};

Bubble.defaultProps = {
    touchableProps: {},
    renderMessageImage: null,
    renderMessageText: null,
    renderCustomView: null,
    renderTime: null,
    isSameDay: () => {},
    position: 'left',
    currentMessage: {
        text: null,
        createdAt: null,
        image: null,
    },
    nextMessage: {},
    previousMessage: {},
    containerStyle: {},
    wrapperStyle: {},
};

Bubble.propTypes = {
    touchableProps: PropTypes.object,
    renderMessageImage: PropTypes.func,
    renderMessageText: PropTypes.func,
    renderCustomView: PropTypes.func,
    renderTime: PropTypes.func,
    isSameUser: PropTypes.func,
    isSameDay: PropTypes.func,
    position: PropTypes.oneOf(['left', 'right', 'center']),
    currentMessage: PropTypes.object,
    nextMessage: PropTypes.object,
    previousMessage: PropTypes.object,
    containerStyle: PropTypes.shape({
        left: PropTypes.object,
        right: PropTypes.object,
    }),
    wrapperStyle: PropTypes.shape({
        left: PropTypes.object,
        right: PropTypes.object,
    }),
};
