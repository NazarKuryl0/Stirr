import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import Video from 'react-native-video';

import { WIDTH } from '../../../Core/Constants';
import {
  VideoPlay,
  EnterFullscreen,
  ExitFullscreen,
  VideoPause,
} from '../../../Assets/VideoPlayerIcons';

import { styles } from './styles';

export default class VideoPlayer extends Component {
  isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height > dim.width;
  };

  state = {
    currentTime: 0,
    isPaused: false,
    isInFullScreen: false,
    isPortraitOrientation: this.isPortrait(),
    controlsAreActive: false,
  };

  componentDidMount() {
    Dimensions.addEventListener('change', () => {
      this.setState({
        isPortraitOrientation: this.isPortrait(),
      });
    });
  }
  handleVideoBlockPress = () => {
    const { controlsAreActive } = this.state;
    if (controlsAreActive) {
      this.setState({ controlsAreActive: false });
    } else {
      this.setState({ controlsAreActive: true });
      clearTimeout(this.controlsTimerId);
      this.controlsTimerId = setTimeout(() => {
        this.setState({ controlsAreActive: false });
      }, 5000);
    }
  };

  handleProgressbarPress = (evt) => {
    this.videoPlayer.seek((evt.nativeEvent.locationX * this.props.duration) / WIDTH);
  };
  handleVideoProgress = (evt) => {
    this.setState({ currentTime: evt.currentTime });
  };
  toggleFullScreenVideoplayer = () => {
    const { isInFullScreen } = this.state;
    this.setState({ isInFullScreen: !isInFullScreen });
  };
  toggleVideoPlay = () => {
    const { isPaused } = this.state;
    this.setState({ isPaused: !isPaused });
  };

  render() {
    const { currentTime, isPaused, isInFullScreen, isPortraitOrientation, controlsAreActive } =
      this.state;
    const { videoURL, duration } = this.props;
    return (
      <View
        style={[
          isPortraitOrientation
            ? isInFullScreen
              ? styles.videoPlayerBlockInPortraitAndFullscreen
              : styles.videoPlayerBlockInPortrait
            : styles.videoPlayerBlock,
        ]}
      >
        <TouchableOpacity onPress={this.handleVideoBlockPress}>
          <Video
            controls={false}
            ref={(ref) => (this.videoPlayer = ref)}
            style={styles.videoBlock}
            source={{ uri: videoURL }}
            onProgress={this.handleVideoProgress}
            paused={isPaused}
          />
        </TouchableOpacity>
        {(controlsAreActive || isPaused) && (
          <View
            style={[styles.controlsBlock, isPortraitOrientation && styles.controlsBlockInPortrait]}
          >
            <TouchableOpacity onPress={this.toggleVideoPlay}>
              {isPaused ? <VideoPlay /> : <VideoPause />}
            </TouchableOpacity>
            <View style={styles.additionalControlsBlock}>
              {isPortraitOrientation && (
                <TouchableOpacity onPress={this.toggleFullScreenVideoplayer}>
                  {isInFullScreen ? <ExitFullscreen /> : <EnterFullscreen />}
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              onPress={this.handleProgressbarPress}
              style={[
                styles.progressbarBlock,
                !isPortraitOrientation && styles.progressbarBlockInLandscape,
              ]}
            >
              <View
                style={[styles.passedTimeBlock, { width: `${(currentTime * 100) / duration}%` }]}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
