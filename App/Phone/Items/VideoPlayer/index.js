import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';

import { WIDTH } from '../../../Core/Constants';
import Play from '../../../Assets/VideoPlayerIcons/Play.svg';

import { styles } from './styles';

export default class VideoPlayer extends Component {
  state = {
    currentTime: 0,
    isPaused: false,
  };

  handleVideoBlockPress = () => {
    const { isPaused } = this.state;
    this.setState({ isPaused: !isPaused });
  };
  handleProgressbarPress = (evt) => {
    this.videoPlayer.seek((evt.nativeEvent.locationX * this.props.duration) / WIDTH);
  };
  handleVideoProgress = (e) => {
    this.setState({ currentTime: e.currentTime });
  };

  render() {
    const { currentTime, isPaused } = this.state;
    const { videoURL, duration } = this.props;
    return (
      <View>
        <TouchableOpacity style={styles.videoPlayerBlock} onPress={this.handleVideoBlockPress}>
          <Video
            ref={(ref) => (this.videoPlayer = ref)}
            style={styles.videoBlock}
            source={{ uri: videoURL }}
            onProgress={this.handleVideoProgress}
            paused={isPaused}
            resizeMode="contain"
          />
          {isPaused && (
            <View style={{ position: 'absolute' }}>
              <Play />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleProgressbarPress} style={styles.progressbarBlock}>
          <View style={[styles.passedTimeBlock, { width: `${(currentTime * 100) / duration}%` }]} />
        </TouchableOpacity>
      </View>
    );
  }
}
