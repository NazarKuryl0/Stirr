import React, { Component } from 'react';
import Video from 'react-native-video';

import { styles } from './styles';

export default class VideoPlayer extends Component {
  render() {
    const { videoURL } = this.props;
    return <Video style={styles.videoplayerBlock} controls source={{ uri: videoURL }} />;
  }
}
