import React from 'react';
import {
    View,
    Platform,
    Text,
    Dimensions,
    TextInput,
    Image,
    TouchableOpacity,
    Animated,
    Keyboard,
    FlatList,
} from 'react-native';
import Emoji from 'react-native-emoji'
import Styles from './Styles/MessageScreenStyle';
import PropTypes from "prop-types" ;
import spliddit from "../utils/spliddit" ;
import _ from "lodash" ;
var emojiUtils = require('node-emoji')
var emoji = require("./emoji");
const MODE_TEXT = "mode_text"; // 文本输入模式
const MODE_RECORD = "mode_record"; // 录音模式
const MODE_ACTION = "mode_action"; //显示相册，照相、位置的模式
const width = Dimensions.get('window').width;

//输入框初始高度
const MIN_COMPOSER_HEIGHT = Platform.select({
    ios: 34,
    android: 41,
});
const MAX_COMPOSER_HEIGHT = 100;

export const MIN_INPUT_TOOLBAR_HEIGHT = Platform.select({
    ios: 44,
    android: 54,
});

const ACTION_BUTTON_HEIGHT = 220;
const EMOJI_HEIGHT = 200;

export default class InputToolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: MODE_TEXT,
            opacity: "#fff",
            focused: false,
            isEmoji: false,
            value: '',
            actionVisible: false,
            shimVisible:false, // ios软键盘弹出的垫子,只有ios 需要特殊处理
            actionAnim: new Animated.Value(0)
        };

        this.composerHeight = MIN_COMPOSER_HEIGHT;
        this.actionBarHeight = 0;
    }

    componentWillMount(){
        Platform.OS === "ios" && this.removeKeyboardListener();
    }
    componentWillUnmount(){
        Platform.OS === "ios" && this.removeKeyboardListener();
    }
    componentDidMount(){
        Platform.OS === "ios" && this.addKeyboardListener();
    }
    removeKeyboardListener(){
        Keyboard.removeAllListeners("keyboardDidShow");
        Keyboard.removeAllListeners("keyboardDidHide");
    }
    addKeyboardListener(){
        Keyboard.addListener("keyboardDidShow",(e)=>{
            let keyboardHeight = e.startCoordinates.height ; // 获取键盘高度
            this.actionBarHeight = keyboardHeight ;
            this.setState({
                shimVisible:true
            });
        });
        Keyboard.addListener("keyboardDidHide",(e)=>{ // 关闭软件盘时重置参数
            this.actionBarHeight = 0 ;
            this.setState({
                shimVisible:false
            })
        });
    }

    /**
     * 重置关闭表情选择和工具选择
     */
    dismiss() {
        const {isEmoji, actionVisible} = this.state;
        this.setState({
            isEmoji: false,
            actionVisible: false,
        },()=>{

        });
        Animated.timing(
            this.state.actionAnim,
            {toValue: 0}
        ).start();

        if (isEmoji || actionVisible) {
            this.actionBarHeight = 0;
            this.onHeightChange();
        }

    }

    /**
     * 发送点击事件
     */
    handleSend() {
        if(this.state.value){ // 判断消息是否存在
            this.props.onSend(this.state.value);
            if (this.composerHeight != MIN_COMPOSER_HEIGHT) {
                this.composerHeight = MIN_COMPOSER_HEIGHT;
                this.onHeightChange();
            }
            this.setState({value: ''});
        }
    }

    /**
     * 输入框+ 点击事件
     */
    onActionsPress() {
        var actionVisible = this.state.actionVisible;
        if (actionVisible) {
            if (this.search) {
                this.search.focus();
            }
            Animated.timing(
                this.state.actionAnim,
                {toValue: 0}
            ).start();

            this.setState({ actionVisible: false, isEmoji: false });
            return;
        }
        if (this.search) {
            this.search.blur();
        }
        actionVisible = !actionVisible;
        this.setState({actionVisible: actionVisible, isEmoji: false});
        if (actionVisible) {
            this.onHeightChange();
        }
        Animated.timing(
            this.state.actionAnim,
            {toValue: 1}
        ).start();
    }

    /**
     * 表情按钮点击事件
     */
    handleEmojiOpen() {
        var isEmoji = this.state.isEmoji;
        isEmoji = !isEmoji;
        if (this.search) {
            this.search.blur();
        }
        if (isEmoji) {
            this.actionBarHeight = EMOJI_HEIGHT;
            this.onHeightChange();
        } else {
            this.actionBarHeight = 0;
            // 屏蔽关闭表情之后自动弹出键盘
            // if (this.search) {
            //     this.search.focus();
            // }
        }
        this.setState({
            isEmoji: isEmoji,
            actionVisible: false,
            mode: MODE_TEXT
        });
        Animated.timing(          // Uses easing functions
            this.state.actionAnim,    // The value to drive
            {toValue: 1}           // Configuration
        ).start();
    }

    /**
     * 表情点击事件
     * @param v
     */
    handleEmojiClick(v) {
        var newValue = (this.state.value || '') + v;
        this.setState({
            value: newValue
        });
    }

    /**
     * 表情选择面板删除按钮点击事件
     */
    handleEmojiCancel() {
        if (!this.state.value) return;
        const arr = spliddit(this.state.value);
        let newValue = '';
        arr.pop();
        newValue = arr.join('');
        this.setState({
            value: newValue
        });
        this.value = newValue;
    }

    /**
     * 输入框获取焦点事件
     */
    handleFocusSearch() {
        this.setState({
            isEmoji: false,
            actionVisible: false,
            focused: true,
        });
        Animated.timing(
            this.state.actionAnim,
            {toValue: 1}
        ).start();
    }

    /**
     * 输入框失去焦点事件
     */
    handleBlurSearch() {
        this.setState({focused: false});
    }

    /**
     * 输入框表单内容改变事件
     * @param v
     */
    handleChangeText(v) {
        if (v.length > 0 && v[v.length - 1] == '\n') {
            this.props.onSend(v.slice(0,v.length - 1)); // 去除\n
            if (this.composerHeight != MIN_COMPOSER_HEIGHT) {
                this.composerHeight = MIN_COMPOSER_HEIGHT;
                this.onHeightChange();
            }
            this.setState({value: ''});
        } else {
            this.setState({
                value: v,
            });
        }
    }

    /**
     * 图片选择点击事件
     */
    handleImagePicker() {
        this.setState({
            isEmoji: false,
            actionVisible: false
        });

        this.actionBarHeight = 0;
        this.onHeightChange();
        this.props.handleImagePicker();
    }

    /**
     * 照相机 按钮点击事件
     */
    handleCameraPicker() {
        this.setState({
            isEmoji: false,
            actionVisible: false
        });
        this.actionBarHeight = 0;
        this.onHeightChange();
        this.props.handleCameraPicker();
    }

    /**
     * 位置选择 点击事件
     */
    handleLocationClick() {
        this.setState({
            isEmoji: false,
            actionVisible: false
        });
        this.actionBarHeight = 0;
        this.onHeightChange();

        this.props.handleLocationClick();
    }

    /**
     * 录音按钮点击事件
     */
    handleRecordMode() {
        const {isEmoji, actionVisible} = this.state;
        if (this.state.mode == MODE_RECORD) {
            return;
        }
        this.setState({
            isEmoji: false,
            actionVisible: false,
            focused: false,
            mode: MODE_RECORD
        });
        if (isEmoji || actionVisible) {
            this.actionBarHeight = 0;
            this.onHeightChange();
        }
    }

    handleTextMode() {
        if (this.state.mode == MODE_TEXT) {
            return;
        }
        this.setState({mode: MODE_TEXT, focused: true,});
    }
    renderImoji = (item,index,rowIconNum)=>{
        let emojis = _.chunk(item,rowIconNum) ;
        let backspace = "{{backspace}}" ;
        emojis.map(row=>{
            if(row.length !== rowIconNum){
                row.push(backspace) ;
            }
            return row ;
        });

        return (
            <View key={index} style={[Styles.slide,{width:width,height:EMOJI_HEIGHT-35}]}>
                {
                    emojis.map((rows,index)=>(
                        <View key={`${index}`} style={Styles.slideRow}>
                            {
                                rows.map((item,id)=>{
                                    return (
                                        item === backspace?(
                                            <TouchableOpacity style={Styles.iconTouch} key={_.uniqueId("row")} onPress={this.handleEmojiCancel.bind(this)}>
                                                <Image style={{height:30,width:30}} source={require("./Images/backspace.png")}/>
                                            </TouchableOpacity>
                                        ):(
                                            item==="{{emtype_str}}"?(
                                                <View style={{ opacity:0 }} key={_.uniqueId("row")}>
                                                    <Text style={[Styles.emoji]}><Emoji name={ "cow2" }/></Text>
                                                </View>
                                            ):(
                                                <TouchableOpacity style={Styles.iconTouch}  key={_.uniqueId("row")} onPress={() => {
                                                    this.handleEmojiClick(emojiUtils.get(item))
                                                }}>
                                                    <Text style={[Styles.emoji]}><Emoji name={ item }/></Text>
                                                </TouchableOpacity>
                                            ))
                                    )
                                })
                            }
                        </View>
                    ))
                }
            </View>);
    };
    /**
     * 渲染emoji表情
     * @returns {XML}
     * @private
     */
    _renderEmoji() {
        let { renderEmoji } = this.props ;
        const {isEmoji, focused} = this.state;
        const emojiStyle = [];
        let emojis =  renderEmoji(emoji.emojis) ;
        const rowIconNum = 7;
        const pageNum = 20 ;
        let pages = Math.ceil(emojis.length/pageNum) ;
        for(let start =emojis.length ,end = pages*pageNum; start<end ;start++){
            emojis[start] = "{{emtype_str}}" ;
        }
        emojis = _.chunk(emoji.emojis,pageNum) ;
        return <Animated.View style={[Styles.emojiRow,{width:width,height:EMOJI_HEIGHT}]}>
            <FlatList
                pagingEnabled={ true }
                horizontal={true}
                alwaysBounceHorizontal={true}
                showsHorizontalScrollIndicator={false}
                data={emojis }
                initialNumToRender={2}
                keyExtractor = { (item,index)=>`${index}` }
                renderItem={({ item,index })=>this.renderImoji(item,index,rowIconNum)}
            />
            <View style={{height:35,flexDirection:'row'}}>
                <View style={{flex:1}}></View>
                <TouchableOpacity onPress={()=>this.handleSend()}
                                  style={{backgroundColor:'#d82614',justifyContent:'center',alignItems:'center',width:55}}>
                    <Text style={{color:'#fff'}}>发送</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    }
    _renderTools = ()=>{
        let style= {height:40,width:40};
        let itemStyle = {
            alignItems:"center",
            paddingLeft:10,
            paddingRight:10,
            paddingTop:5,
            paddingBottom:5,
            width:100,
        }
        return [
            (
                <View key={"camera"} style={itemStyle}>
                    <TouchableOpacity style={Styles.iconTouch} onPress={this.handleCameraPicker.bind(this)}>
                        <Image resizeMode={"contain"} style={style}  source={require("./Images/camera.png")}/>
                    </TouchableOpacity>
                    <Text style={{marginTop:6, fontSize:12}}>拍照</Text>
                </View>
            ),(
                <View key={"photo"} style={itemStyle}>
                    <TouchableOpacity style={Styles.iconTouch} onPress={this.handleImagePicker.bind(this)}>
                        <Image resizeMode={"contain"} style={style} source={require("./Images/image.png")}/>
                    </TouchableOpacity>
                    <Text style={{marginTop:6, fontSize:12}}>相册</Text>
                </View>
            ),(
                <View key={"location"} style={itemStyle}>
                    <TouchableOpacity style={Styles.iconTouch} onPress={this.handleLocationClick.bind(this)}>
                        <Image resizeMode={"contain"} style={style} source={require("./Images/pin.png")}/>
                    </TouchableOpacity>
                    <Text style={{marginTop:6, fontSize:12}}>位置</Text>
                </View>
            )
        ];
    }
    /**
     * 渲染工具栏
     * @returns {*}
     * @private
     */
    _renderActions() {
        let { renderTools } = this.props ;
        let { shimVisible, actionVisible } = this.state ; // 如果当前是软键盘弹出则添加一个垫子，防止输入框被键盘遮住
        let height = actionVisible?ACTION_BUTTON_HEIGHT:0;
        return shimVisible?(<View style={[Styles.iconRow,{ height:this.actionBarHeight }]}></View>):(
            actionVisible?(
                <Animated.View style={[Styles.iconRow,{ height:height-5 }]}>
                    {renderTools? renderTools(this._renderTools()):this._renderTools() }
                </Animated.View>
            ):null
        );
    }

    onHeightChange() {
        var h = this.composerHeight + (MIN_INPUT_TOOLBAR_HEIGHT - MIN_COMPOSER_HEIGHT) + this.actionBarHeight;
        if(typeof this.props.onHeightChange === "function"){
            this.props.onHeightChange(h);
        }
    }

    onChange(e) {
        let newComposerHeight = null;
        if (e.nativeEvent && e.nativeEvent.contentSize) {
            newComposerHeight = Math.max(MIN_COMPOSER_HEIGHT, Math.min(MAX_COMPOSER_HEIGHT, e.nativeEvent.contentSize.height));
        } else {
            newComposerHeight = MIN_COMPOSER_HEIGHT;
        }
        if (this.composerHeight != newComposerHeight) {
            this.composerHeight = newComposerHeight;
            this.onHeightChange();
        }
    }

    /**
     * 渲染输入框
     * @returns {XML}
     */
    renderTextInput() {
        const {value = '' } = this.state;
        var height = this.composerHeight + (MIN_INPUT_TOOLBAR_HEIGHT - MIN_COMPOSER_HEIGHT);
        return (
            <View style={[Styles.inputRow, {height:height}]}>
                <TouchableOpacity style={{alignSelf:"stretch",justifyContent:"center",paddingLeft:8}}
                                  onPress={this.handleRecordMode.bind(this)}>
                    <Image style={{height:30,width:30}} source={require('./Images/chatBar_record.png')}/>
                </TouchableOpacity>

                <View style={Styles.searchRow}>
                    <TextInput
                        ref={(search)=> {this.search = search} }
                        style={[Styles.searchInput, {height: this.composerHeight}]}
                        value={value}
                        autoFocus={this.state.focused}
                        editable={true}
                        keyboardType='default'
                        returnKeyType='send'
                        autoCapitalize='none'
                        autoCorrect={false}
                        multiline={true}
                        onChange={this.onChange.bind(this)}
                        onFocus={this.handleFocusSearch.bind(this)}
                        onBlur={this.handleBlurSearch.bind(this)}
                        onChangeText={this.handleChangeText.bind(this)}
                        underlineColorAndroid='transparent'
                    />
                </View>
                { this._renderEmojiButton() }
                { this._renderSendButton() }
            </View>
        );
    }

    handleLayout(e) {
        this.refs.record.measure((x, y, w, h, px, py) => {
            this.recordPageX = px;
            this.recordPageY = py;
        });
    }

    renderReocrdInput() {
        var height = this.composerHeight + (MIN_INPUT_TOOLBAR_HEIGHT - MIN_COMPOSER_HEIGHT);
        var responder = {
            onStartShouldSetResponder: (evt) => true,
            onMoveShouldSetResponder: (evt) => true,
            onResponderGrant: (evt) => {
                this.setState({opacity: "#c9c9c9"});
                this.props.startRecording();
            },
            onResponderReject: (evt) => {
            },
            onResponderMove: (evt) => {
                if (evt.nativeEvent.locationY < 0 ||
                    evt.nativeEvent.pageY < this.recordPageY) {
                    this.props.onEndReachedRecording();
                } else {
                    this.props.onReachedRecording();
                }
            },
            onResponderRelease: (evt) => {
                this.setState({opacity: "#fff"});
                var canceled;
                if (evt.nativeEvent.locationY < 0 ||
                    evt.nativeEvent.pageY < this.recordPageY) {
                    canceled = true;
                } else {
                    canceled = false;
                }
                this.props.stopRecording(canceled);
            },
            onResponderTerminationRequest: (evt) => true,
            onResponderTerminate: (evt) => {
                console.log("responder terminate")
            },

        };
        return (
            <View style={[Styles.inputRow, {height:height}]}>
                <TouchableOpacity style={{alignSelf:"stretch",justifyContent:"center", paddingLeft:8}}
                                  onPress={this.handleTextMode.bind(this)}>
                    <Image style={{height:30,width:30}} source={require('./Images/chatBar_keyboard.png')}/>
                </TouchableOpacity>

                <View style={[Styles.searchRow, {padding:4}]}>
                    <View
                        ref="record"
                        {...responder}
                        style={{flex:1,
                            justifyContent:'center',
                            alignItems:'center',
                            borderRadius:5,
                            backgroundColor:this.state.opacity,
                            borderWidth:1,borderColor:'#f2f2f2'
                        }}
                        onLayout={this.handleLayout.bind(this)}>
                        <Text>按住 说话</Text>
                    </View>
                </View>
                { this._renderEmojiButton() }
                { this._renderSendButton() }
            </View>
        );
    }

    /**
     * 渲染表情按钮
     * @returns {XML}
     * @private
     */
    _renderEmojiButton() {
        const {isEmoji} = this.state;
        return (
            <TouchableOpacity style={{paddingLeft:5,
                paddingRight:5,
                alignSelf:"stretch",
                justifyContent:"center"}}
                              onPress={this.handleEmojiOpen.bind(this)}>
                {
                    isEmoji ? <Image style={{height:30,width:30}} source={require('./Images/chatBar_keyboard.png')}/>
                        : <Image style={{height:30,width:30}}  source={require('./Images/iconEmoji.png')}/>
                }
            </TouchableOpacity>
        )
    }

    /**
     * 渲染发送按钮
     * @returns {XML}
     * @private
     */
    _renderSendButton() {
        const {focused, value} = this.state;
        return ((focused && value.length > 0) ) ? (
            <TouchableOpacity style={{alignSelf:"stretch",justifyContent:"center",paddingRight:8}}
                              onPress={this.handleSend.bind(this)}>
                <Text style={Styles.sendText}>{'发送'}</Text>
            </TouchableOpacity>

        ) : (
            <TouchableOpacity style={{alignSelf:"stretch",justifyContent:"center",paddingRight:8}}
                              onPress={this.onActionsPress.bind(this)}>
                <Image style={{height:30,width:30}}  source={require('./Images/add.png')}/>
            </TouchableOpacity>
        );
    }


    render() {
        const {　isEmoji, mode　} = this.state;
        return (
            <View style={Styles.search}>
                {mode == MODE_TEXT ? this.renderTextInput() : this.renderReocrdInput()}
                <View style={{flexGrow:1, height:1, backgroundColor:"lightgray"}}/>
                {isEmoji ? this._renderEmoji() : this._renderActions()}
            </View>
        )
    }
}
InputToolbar.propTypes = {
    startRecording:PropTypes.func.isRequired,
    handleImagePicker:PropTypes.func.isRequired,
    handleCameraPicker:PropTypes.func.isRequired,
    handleLocationClick:PropTypes.func.isRequired,
    stopRecording:PropTypes.func.isRequired,
    onEndReachedRecording:PropTypes.func.isRequired, // 手指滑动到取消发送的距离的时候
    onReachedRecording:PropTypes.func.isRequired, //手指为滑动到取消发送的距离的时候
    onSend:PropTypes.func.isRequired, // 发送按钮点击发送消息事件
    onHeightChange:PropTypes.func.isRequired, // 输入框的高度发生变化的时候所触发的事件
    renderEmoji:PropTypes.func,

};
InputToolbar.defaultProps = {
    handleImagePicker:()=>{},
    handleCameraPicker:()=>{},
    handleLocationClick:()=>{},
    startRecording:()=>{},
    stopRecording:()=>{},
    onEndReachedRecording:()=>{}, // 手指滑动到取消发送的距离的时候
    onReachedRecording:()=>{},//手指为滑动到取消发送的距离的时候
    onSend:()=>{},
    onHeightChange:()=>{},
    renderEmoji:(emojis)=>emojis
};

