import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

import { styles } from './styles';

export default class FullScreenCard extends Component {
  state = {
    time: 2,
    disabledButton: true,
  };
  componentDidMount() {
    setInterval(() => {
      const { time } = this.state;
      time > 0 ? this.setState({ time: time - 1 }) : this.setState({ disabledButton: false });
    }, 1000);
  }
  handleButtonPress = () => {
    const { fetchOTTPageData, pageData } = this.props;
    fetchOTTPageData(
      pageData.link,
      pageData.button['media:content']['sinclair:action_config'].station[0]
    );
  };
  render() {
    const { disabledButton } = this.state;
    const { pageData, buttonStyles } = this.props;
    const { background, displayTitle, subTitle, logo, button, stationText, promoText } = pageData;
    const logoURL = logo[0];
    const buttonText = button['media:content']['media:title'].content;
    return (
      <View style={styles.root}>
        {background && (
          <FastImage
            source={{
              uri: background,
              priority: FastImage.priority.high,
            }}
            style={styles.backgroundImage}
          />
        )}
        <View style={styles.mainBlock}>
          <Text>{displayTitle}</Text>
          <Text>{subTitle}</Text>
          {logoURL && (
            <FastImage
              source={{
                uri: logoURL,
                priority: FastImage.priority.high,
              }}
              resizeMode="contain"
              style={styles.logo}
            />
          )}
          <TouchableOpacity
            disabled={disabledButton}
            style={[
              buttonStyles.default,
              styles.buttonBlock,
              disabledButton ? buttonStyles.inActive : buttonStyles.active,
            ]}
            onPress={this.handleButtonPress}
          >
            <Text>{buttonText}</Text>
          </TouchableOpacity>
          <Text>{stationText}</Text>
          <Text>{promoText}</Text>
        </View>
      </View>
    );
  }
}
