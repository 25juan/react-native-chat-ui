import React,{ Fragment } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,Platform
} from 'react-native';
const rightPlayVoice = [require("./Images/playVoice1.png"),require("./Images/playVoice2.png"),require("./Images/playVoice3.png")];
const leftPlayVoice = [require("./Images/receiverVoice1.png"),require("./Images/receiverVoice2.png"),require("./Images/receiverVoice3.png")];

export default class MessageAudio extends React.Component {
    timer = null ;
    currIndex = 0 ;
    state = {
      rightImage:  rightPlayVoice[2],
        leftImage: leftPlayVoice[2],
    };
    componentDidMount(){
        this.getRightImage(this.props.currentMessage);
    }
    componentWillReceiveProps(props){
        this.getRightImage(props.currentMessage);
    }
    getRightImage = (msg)=>{
        if(this.timer){
            clearInterval(this.timer)
        }
        if ( msg.playing ) { // 声音消息正在播放
            if(msg.isOutgoing){ // 表示声音消息是我发出的
                this.timer = setInterval(()=>{
                    if(this.currIndex === rightPlayVoice.length){
                        this.currIndex = 0 ;
                    }
                    this.setState({
                        rightImage: rightPlayVoice[this.currIndex]
                    });
                    this.currIndex++
                },500) ;
            }else{
                this.timer = setInterval(()=>{
                    if(this.currIndex === leftPlayVoice.length){
                        this.currIndex = 0 ;
                    }
                    this.setState({
                        leftImage: leftPlayVoice[this.currIndex]
                });
                    this.currIndex++
                },500) ;
            }
        }else{
            this.currIndex = 0 ;
            if(msg.isOutgoing){
                this.setState({
                    rightImage: rightPlayVoice[2]
                });
            }else {
                this.setState({
                    leftImage: leftPlayVoice[2]
            });
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
                                   source={this.state.rightImage}>
                            </Image>
                        </Fragment>
                    ):(
                        <Fragment>
                            <Image style={[styles.image,msg.isOutgoing ? {marginLeft:margin} : { marginRight:margin}]}
                                   source={this.state.leftImage}>
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

