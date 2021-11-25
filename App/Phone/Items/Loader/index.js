import React, { Component } from 'react';
import { Animated, Easing, View, Image, ImageBackground } from 'react-native';

import { styles } from './styles';

const loaderURL = require('../../../Assets/SpinnerIcon.png');

export default class Loader extends Component {
  state = {
    rotateAnim: new Animated.Value(0),
  };

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation() {
    this.state.rotateAnim.setValue(0);
    Animated.timing(this.state.rotateAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      this.startAnimation();
    });
  }

  render() {
    const { backgroundImageURL, loaderColor } = this.props;
    return (
      <View style={styles.root}>
        <ImageBackground source={{uri: backgroundImageURL}} style={styles.mainBlock}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: this.state.rotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            }}
          >
            <Image source={loaderURL} style={{ tintColor: loaderColor }} />
          </Animated.View>
        </ImageBackground>
      </View>
    );
  }
}
