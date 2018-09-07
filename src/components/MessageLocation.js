import React from 'react';
import {
    Image,
    View,
    StyleSheet,
    Text
} from 'react-native';
export default class MessageLocation extends React.Component {
    render() {
        const { title } = this.props.currentMessage;
        let position = this.props.position ;
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text
                        style={{...fontColor[position],fontSize:12}}
                        numberOfLines={2}>
                        {title}
                    </Text>
                </View>

                <Image  style={styles.mapView}
                        resizeMode={"contain"}
                        source={require("./Images/location.png")}>

                </Image>
            </View>
        );
    }
}
let fontColor = {
    left:{
        color:"#666666"
    },
    right:{
        color:"#fff"
    },
};
const styles = StyleSheet.create({
    container: {
        width: 200,
    },
    title:{
        backgroundColor:'transparent',
        flex:1,
        padding:5,
        borderTopRightRadius:5,
        borderTopLeftRadius:5
    },
    mapView: {
        width: 200,
        height: 100,
        borderBottomRightRadius:5,
        borderBottomLeftRadius:5
    }
});


