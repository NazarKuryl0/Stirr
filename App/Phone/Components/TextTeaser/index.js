import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

import { styles } from './styles';

export default class TextTeaser extends Component {
  render() {
    const { data } = this.props;
    return (
      <View style={styles.subtitleBlock}>
        <Image resizeMode="contain" source={{ uri: data.image }} style={styles.subtitleImage} />
        <Text style={styles.subtitle}>{data.subtitle}</Text>
      </View>
    );
  }
}
