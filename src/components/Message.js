import React from 'react';
import {
    View,
    Image,
    StyleSheet,Text
} from 'react-native';
import Avatar from './Avatar';
import Bubble from './Bubble';
import Day from './Day';

import PropTypes from 'prop-types';
export default class Message extends React.Component {

    isSameDay(currentMessage = {}, diffMessage = {}) {
        let diff = 0;
        if (diffMessage.createdAt && currentMessage.createdAt) {
            diff = currentMessage.createdAt.getTime() - diffMessage.createdAt.getTime();
        } else {
            diff = 7000*6;
        }
        if (diff < 7000*6) {
            return true;
        }
        return false;
    }


    renderDay() {
        if (this.props.currentMessage.createdAt) {
            const {containerStyle, ...other} = this.props;
            const dayProps = {
                ...other,
                
                isSameDay: this.isSameDay,
            };
            if (this.props.renderDay) {
                return this.props.renderDay(dayProps);
            }
            return <Day {...dayProps}/>;
        }
        return null;
    }

    renderBubble() {
        const {containerStyle, ...other} = this.props;
        const bubbleProps = {
            ...other,
            isSameDay: this.isSameDay,
        };
        return <Bubble {...bubbleProps}/>;
    }

    renderAvatar() {
        const {containerStyle, ...other} = this.props;
        const avatarProps = {
            ...other,
            isSameDay: this.isSameDay,
        };
        return <Avatar {...avatarProps}/>;
    }
    renderName(){
        const { currentMessage,isShowIncomingDisplayName,isShowOutgoingDisplayName } = this.props;
        if(!currentMessage.isOutgoing){
            return (
                <View style={{flexDirection:'column'}}>
                    { isShowIncomingDisplayName?<Text style={{color:'#666666',fontSize:10,marginBottom:3}}>{currentMessage.fromUser.name}</Text>:null }
                    {this.renderBubble()}
                </View>
            )
        }else{
            return (
                <View style={{flexDirection:'column'}}>
                    { isShowOutgoingDisplayName? <Text style={{color:'#666666',fontSize:10,marginBottom:3,textAlign:"right"}}>{currentMessage.fromUser.name}</Text>:null}
                    {this.renderBubble()}
                </View>
            )            
        }
    }
    render() {
        return (
            <View>
                {this.renderDay()}
                <View style={[styles[this.props.position].container, {
                        marginBottom: 12,
                    }, this.props.containerStyle[this.props.position]]}>
                    {this.props.position === 'left' ? this.renderAvatar() : null}
                    {this.renderName()}
                    {this.props.position === 'right' ? this.renderAvatar() : null}
                </View>
            </View>
        );
    }
}

const styles = {
    left: StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginLeft: 8,
            marginRight: 0,
        },
    }),
    right: StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            marginLeft: 0,
            marginRight: 8,
        },
    }),
    center: StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }),
};

Message.defaultProps = {
    renderAvatar: null,
    renderBubble: null,
    renderDay: null,
    position: 'left',
    currentMessage: {},
    user: {},
    containerStyle: {},
};

Message.propTypes = {
    renderAvatar: PropTypes.func,
    renderBubble: PropTypes.func,
    renderDay: PropTypes.func,
    position: PropTypes.oneOf(['left', 'right', 'center']),
    currentMessage: PropTypes.object,
    nextMessage: PropTypes.object,
    previousMessage: PropTypes.object,
    user: PropTypes.object,
    containerStyle: PropTypes.shape({
        left: PropTypes.object,
        right: PropTypes.object,
    }),
};
