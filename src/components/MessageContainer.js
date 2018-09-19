import React from 'react';

import {
    FlatList,
    View
} from 'react-native';

import shallowequal from '../utils/showEqual';
import LoadEarlier from './LoadEarlier';
import PropTypes from 'prop-types';
import Message from './Message';
import _ from "lodash" ;

export default class MessageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.renderLoadEarlier = this.renderLoadEarlier.bind(this);

        this.state = {
            messagesData: props.messages || [],
            refreshing:false,
        };
    }
    componentWillMount(){
        let response = {
            onStartShouldSetResponder: (evt) => true,
            onMoveShouldSetResponder: (evt) => true,
            onResponderGrant: (evt) => { this.props.onMessageListTouch(); },
            onResponderReject: (evt) => {},
            onResponderMove: (evt) => {},
            onResponderRelease: (evt) => {},
            onResponderTerminationRequest: (evt) => true,
            onResponderTerminate: (evt) => {
            },
        };
        this.response = response ;
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (!shallowequal(this.props, nextProps)) {
            return true;
        }
        if (!shallowequal(this.state, nextState)) {
            return true;
        }
        return false;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.messages === nextProps.messages) {
            return;
        }

        this.setState({
            messagesData: this.prepareMessages(nextProps.messages)
        });
    }

    renderRow({item,index}) {
        if (!item.msgId && item.msgId !== 0) {
            console.warn('GiftedChat: `_id` is missing for message', JSON.stringify(item));
        }
        if (!item.fromUser) {
            console.warn('GiftedChat: `user` is missing for message', JSON.stringify(item));
            item.fromUser = {};
        }
        let position;
        if (item.msgType === 'notification') {
            position = "center";
        } else {
            position = item.isOutgoing ? 'right' : 'left';
        }
        const messageProps = {
            ...this.props,
            key: item.msgId,
            currentMessage: item,
            position: position,
            isShowIncomingDisplayName:this.props.isShowIncomingDisplayName,
            isShowOutgoingDisplayName:this.props.isShowOutgoingDisplayName,
            onMessagePress:this.props.onMessagePress,
            onMessageLongPress:this.props.onMessageLongPress,
            onFailPress:this.props.onFailPress,
        };

        if (this.props.renderMessage) {
            return this.props.renderMessage(messageProps);
        }
        return (
            <View style={{ flex: 1 }}>
                <Message {...messageProps }/></View>);
    }
    _keyExtractor = (item, index) => item._id+" "+index
    renderFooter() {
        if (this.props.renderFooter) {
            const footerProps = {
                ...this.props,
            };
            return this.props.renderFooter(footerProps);
        }
        return null;
    }
    renderLoadEarlier() {
        if (this.props.canLoadMore === true) {
            const loadEarlierProps = {
                ...this.props,
            };
            if (this.props.renderLoadEarlier) {
                return this.props.renderLoadEarlier(loadEarlierProps);
            }

            return (
                <LoadEarlier {...loadEarlierProps}/>
            );
        }
        return null;
    }
    refresh = ()=>{
        if(typeof this.props.onLoadMoreAsync === "function"){
            this.setState({ refreshing:true }) ;
            this.props.onLoadMoreAsync(()=>{
                this.setState({ refreshing:false }) ;
            });
        }
    };
    isScrollBottom = true ;
    componentDidUpdate(){
        if(this.isScrollBottom){
            this.scrollToBottom()
        }
    }
    /**
     * 列表滑动到底部
     */
    scrollToBottom(){
        if(this.flatList){
            this.flatList.scrollToEnd();
        }
    }
    /**
     * 滚动到顶部
     */
    scrollToTop(){
        if(this.flatList){
            this.flatList.scrollToIndex(0);
        }
    }
    /**
     * 拼接一条消息到顶部
     */
    appendToTop(messages){
        if(!messages){
            return ;
        }
        this.isScrollBottom = false ;
        this.messages = JSON.parse(JSON.stringify([ ...messages,...this.messages ]));
        this.setState({
            messagesData: JSON.parse(JSON.stringify(this.messages))
        });
    }
    messages = [] ;
    /**
     * 拼接一条消息到底部
     */
    appendToBottom(messages){
        if(!messages){
            return ;
        }
        this.isScrollBottom = true ;
        this.messages = JSON.parse(JSON.stringify([ ...this.messages,...messages ]));
        this.setState({
            messagesData: JSON.parse(JSON.stringify(this.messages))
        });
    }
    /**
     * 更新一条消息的状态
     */
    updateMsg(msg){
        if(!msg){
            return ;
        }
        let messagesData = JSON.parse(JSON.stringify(this.messages)) ;
        let _list = messagesData.map((message)=>{
            if(message.msgId === msg.msgId){
                return { ...message,...msg }
            }else {
                if (message.msgType === "voice"){
                    message.playing = false ;
                }
            }
            return message ;
        });
        this.messages = _list ;
        this.setState({ messagesData:_list });
    }
    /**
     * 删除一条消息
     * @param {*} msgId 
     */
    deleteMsg(msgId){
        if(!msgId){
            return ;
        }
        let messagesData = JSON.parse(JSON.stringify(this.messages))  ;
        let _list = messagesData.filter((message)=>{
            if(message.id !== msgId){
                return message ;
            }
        });
        this.messages = messagesData ;
        this.setState({ messagesData });
    }
    render() {

        return (
            <View style={{flex:1}} { ...this.response }>
                <FlatList
                    keyboardDismissMode={"none"}
                    keyboardShouldPersistTaps={"never"}
                    automaticallyAdjustContentInsets={false}
                    ref={ (flatList)=>this.flatList=  flatList  }
                    keyExtractor={this._keyExtractor}
                    data={this.state.messagesData}
                    renderItem={this.renderRow}
                    ListHeaderComponent={this.renderLoadEarlier}
                    onRefresh={this.refresh}
                    onScroll={this.props.onScroll()}
                    refreshing = { this.state.refreshing }
                />
            </View>
        );
    }
}

MessageContainer.defaultProps = {
    messages: [],
    renderMessage: null,
    isShowIncomingDisplayName:true,
    isShowOutgoingDisplayName:false,
    onFailPress:()=>{ },
    onMessagePress:()=>{ },
    onMessageLongPress:()=>{ },
    onScroll:()=>{},
    onMessageListTouch:()=>{}, // 当消息列表滑动的时候触发的事件
};

MessageContainer.propTypes = {
    messages: PropTypes.array,
    renderMessage: PropTypes.func,
    isShowIncomingDisplayName:PropTypes.bool,
    isShowOutgoingDisplayName:PropTypes.bool,
    onFailPress:PropTypes.func,
    onMessagePress:PropTypes.func,
    onMessageLongPress:PropTypes.func,
    onScroll:PropTypes.func,
    onMessageListTouch:PropTypes.func,
};
