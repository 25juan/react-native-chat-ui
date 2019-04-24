import React,{ Component } from "react" ;
import { Dimensions,View,Text,Image,Animated,TextStyle } from "react-native" ;
import PropTypes from "prop-types" ;

/**
 * 定义录音状态的时候的录音遮罩层
 */
export default class extends Component {
    static propTypes = {
        textStyle : PropTypes.object,
        text:PropTypes.string,
        colors:PropTypes.array,
        show:PropTypes.bool
    } ;

    static defaultProps = {
        textStyle : {},
        text:"手指上滑, 取消发送",
        colors:['#12c2e9','#c471ed','#f64f59'],
        show:false
    };

    constructor(props){
        super() ;
        this.state = {
            ...this.getStateFromProps(props),
            recordingColor:new Animated.Value(0)
        };
    }

    getStateFromProps = (props)=>{
        let colors = Array.from(new Set([...props.colors,...props.colors.reverse()])) ;
        return {
            show:props.show,
            text:props.text,
            textStyle:props.textStyle,
        };
    };

    componentDidMount(){
    }

    componentWillReceiveProps(props){
        this.setState(this.getStateFromProps(props)) ;
    }
    render(){
        const { text,colors } = this.state;
        if(!this.state.show){
            return <View/>
        }
        return (
            <Animated.View style={Style.containerStyle}>
                <View style={Style.maskStyle}>
                    <Image  style={Style.recordingStyle} source={require('./Images/recording.gif')}/>
                    <Text style={{...Style.textStyle,...this.state.textStyle}}>
                        {text}
                    </Text>
                </View>
            </Animated.View>);
    }
};
const Style = {
    containerStyle:{
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    maskStyle:{
        backgroundColor: "rgba(0,0,0,0.4)",
        alignItems: "center",
        borderRadius: 4,
        paddingTop:30,
        paddingBottom:20,
        paddingHorizontal:10
    },
    recordingStyle:{
        height:40,
        width:40,
        resizeMode:"contain"
    },
    textStyle:{
        marginTop:10,
        color:"#fff",
        paddingHorizontal:6,
        paddingVertical:2, 
        backgroundColor: 'transparent'      
    }

};