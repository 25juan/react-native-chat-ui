import React,{ Fragment } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,Platform
} from 'react-native';
const rightPlayVoice = require('./Images/senderPlayVoice.gif');
const leftPlayVoice = require('./Images/receiverPlayVoice.gif');
const rightVoice = require('./Images/senderVoice.png');
const leftVoice = require('./Images/receiverVoice.png');

export default class MessageAudio extends React.Component {
    timer = null ;
    currIndex = 0 ;
    state = {
        rightImage:  rightPlayVoice[2],
        leftImage: leftPlayVoice[2],
    };
    
    get source(){
        let msg = this.props.currentMessage;
        if ( msg.playing ) { // 声音消息正在播放
            if(msg.isOutgoing){ // 表示声音消息是我发出的
                return rightPlayVoice ;
            }else{
                return leftPlayVoice ;
            }
        }else{
            if(msg.isOutgoing){ // 表示声音消息是我发出的
                return rightVoice ;
            }else{
                return leftVoice ;
            }
        }
    }

    render() {
        let msg = this.props.currentMessage;
        //max 180
        var margin = (parseFloat(msg.duration)/1000)*3;
        margin = Math.min(180, margin)+10;
        return (
            <View style={[styles.container]}>
                {
                    msg.isOutgoing?(
                        <Fragment>
                            <Text style={{color:'#fff',fontSize:12,lineHeight:25}}> {parseInt((msg.duration)/1000)}'' </Text>
                            <Image style={[styles.image,msg.isOutgoing ? {marginLeft:margin} : { marginRight:margin}]}
                                   source={this.source}>
                            </Image>
                        </Fragment>
                    ):(
                        <Fragment>
                            <Image style={[styles.image,msg.isOutgoing ? {marginLeft:margin} : { marginRight:margin}]}
                                   source={this.source}>
                            </Image>
                            <Text style={{color:'#666666',fontSize:12,lineHeight:25}}> {parseInt((msg.duration)/1000)}'' </Text>
                        </Fragment>
                    )
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        flex:1,
        alignItems:'center'
    },
    image: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        width:20,
        height:20        
    }
});

