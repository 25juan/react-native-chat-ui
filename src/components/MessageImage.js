import React from 'react';
import {
  Image,
  StyleSheet,
  View,Platform
} from 'react-native';
import PropTypes from 'prop-types';
export default class MessageImage extends React.Component {
  render() {
    const {extend} = this.props.currentMessage;
    const {imageHeight,imageWidth} = extend;
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <Image
            resizeMode={"cover"}
          style={[styles.image, this.props.imageStyle,{width:150,height:150*(imageHeight/imageWidth)}]}
          source={{uri: extend.thumbPath}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  image: {
    borderRadius:5
  },
});

MessageImage.defaultProps = {
  currentMessage: {
    image: null,
  },
  containerStyle: {},
  imageStyle: {},
};

MessageImage.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: PropTypes.object,
  imageStyle: PropTypes.object,
};
