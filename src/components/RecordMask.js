import React,{ Component } from "react" ;
import { Dimensions,View,Text,Image,Animated } from "react-native" ;

/**
 * 定义录音状态的时候的录音遮罩层
 */
export default class extends Component {
    constructor(props){
        super() ;
        this.state = {
            show:props.show,
            text:props.text,
            color:props.color || "transparent",
        };
    }
    componentWillReceiveProps(props){
        let state = { show:props.show,
            text:props.text ||this.state.text,
            color:props.color||this.state.color, };
        this.setState(state) ;
    }
    render(){
        const {width} = Dimensions.get('window');
        var left = this.state.show ? 0 : width;
        const {text, color} = this.state;
        return (
            <Animated.View style={{
                position: "absolute",
                top: 0,
                left: left,
                width: width,
                height: "100%",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <View style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    alignItems: "center",
                    borderRadius: 4
                }}>
                    <Image source={require('./Images/VoiceSearchFeedback020.png')}/>
                    <Text style={{padding: 4, backgroundColor: color, color: '#fff'}}>
                        {text}
                    </Text>
                </View>
            </Animated.View>);
    }
};