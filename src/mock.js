var msg = {  // 文本
    msgId: "msgid",
    status: "send_failed",
    isOutgoing: true,
    fromUser: {
        _id: "",
        name: "sgellar",
        avatar: "http://app.yunsdt.com/app/images/wechat-friends.png"
    }
};

export const mockText = (isOutgoing=true,text)=>{
    return { ...msg,text,isOutgoing,msgType: "text",status: "send_going", } ;
};
export const mockImage = (isOutgoing=true,url)=>{
    return { ...msg,isOutgoing,msgType:"image",extend:{ imageHeight:80,imageWidth:50,thumbPath:"http://app.yunsdt.com/app/images/wechat-friends.png" } } ;
};
export const mockLocation = (isOutgoing=false)=>{
    return  { ...msg,isOutgoing,title:"四川省成都市锦江区牛王庙",msgType: "location",status: "send_going", } ;
};
export const mockVoice = (isOutgoing=false)=>{
    return  { ...msg,isOutgoing,playing:true,duration:1000,msgType: "voice",status: "send_going", } ;
};

export default mockText ;