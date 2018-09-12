var msg = {  // 文本
    msgId: "msgid",
    status: "send_failed",
    isOutgoing: true,
};
var rightUser = {
    _id: "",
    name: "rightUser",
    avatar: "https://raw.githubusercontent.com/25juan/react-native-chat-ui/master/example/image/right.png"
};
var leftUser = {
    _id: "",
    name: "leftUser",
    avatar: "https://raw.githubusercontent.com/25juan/react-native-chat-ui/master/example/image/left.png"
}
let counter = 0 ;
export const mockText = (isOutgoing=true,text,status)=>{
    const msgId = `msgid_${counter++}` ;
    if(isOutgoing){
        return { ...msg,text,isOutgoing,msgType: "text",status,fromUser:rightUser,msgId } ;
    }
    return { ...msg,text,isOutgoing,msgType: "text",status, msgId,fromUser:leftUser} ;
};
export const mockImage = (isOutgoing=true,url)=>{
    const msgId = `msgid_${counter++}` ;
    if(isOutgoing){
        return { ...msg,msgId,fromUser:rightUser,isOutgoing,msgType:"image",status:"send_going",extend:{ imageHeight:80,imageWidth:50,thumbPath:url } } ;
    }
    return { ...msg,fromUser:leftUser,isOutgoing,msgId,msgType:"image",status:"send_success",extend:{ imageHeight:80,imageWidth:50,thumbPath:url } } ;
};
export const mockLocation = (isOutgoing=false)=>{
    const msgId = `msgid_${counter++}` ;
    if(isOutgoing){
        return { ...msg,msgId,isOutgoing,fromUser:rightUser,title:"四川省成都市锦江区牛王庙",msgType: "location",status: "send_going", } ;
    }
    return { ...msg,isOutgoing,msgId,fromUser:leftUser,title:"四川省成都市锦江区牛王庙",msgType: "location",status: "send_going", } ;

};
export const mockVoice = (isOutgoing=false,isRead=false,playing=false)=>{
    const msgId = `msgid_${counter++}` ;
    if(isOutgoing){
        return { ...msg,msgId,isOutgoing,fromUser:rightUser,playing,duration:1000,isRead,msgType: "voice",status: "send_going", } ;
    }
    return { ...msg,isOutgoing,msgId,fromUser:leftUser,playing,duration:1000,isRead,msgType: "voice",status: "send_going", } ;;

};

export default mockText ;