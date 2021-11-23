import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

import Navigator from '../../../Core/Services/NavigationService';

import { styles } from './styles';

const backButton = require('../../../Assets/BackIcon.png');
export default class BackButton extends Component {
  handleButtonPress = () => {
    Navigator.goBack();
  };
  render() {
    return (
      <TouchableOpacity onPress={this.handleButtonPress} style={styles.backButtonBlock}>
        <FastImage source={backButton} style={styles.backButton} />
        <Text style={styles.back}>back</Text>
      </TouchableOpacity>
    );
  }
}
