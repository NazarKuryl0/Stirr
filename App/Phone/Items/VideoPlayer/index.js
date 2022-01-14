import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Video, { DRMType } from 'react-native-video';

import { WIDTH } from '../../../Core/Constants';
import {
  VideoPlay,
  EnterFullscreen,
  ExitFullscreen,
  VideoPause,
} from '../../../Assets/VideoPlayerIcons';
import Loader from '../Loader';

import { styles } from './styles';

export default class VideoPlayer extends Component {
  isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height > dim.width;
  };

  state = {
    currentTime: 0,
    isPaused: !this.props.isProgram,
    isInFullScreen: false,
    isPortraitOrientation: this.isPortrait(),
    controlsAreActive: false,
    isLoading: false,
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
    this.setState({ controlsAreActive: true, isPaused: !isPaused });
    clearTimeout(this.controlsTimerId);
    this.controlsTimerId = setTimeout(() => {
      this.setState({ controlsAreActive: false });
    }, 5000);
  };
  onLoadStart = () => {
    this.setState({ isLoading: true });
  };
  onReadyForDisplay = () => {
    this.setState({ isLoading: false });
  };

  render() {
    const {
      currentTime,
      isPaused,
      isInFullScreen,
      isPortraitOrientation,
      controlsAreActive,
      isLoading,
    } = this.state;
    const { videoURL, duration, appStyles, drm, isProgram } = this.props;
    let videoURLToDisplay = videoURL;
    let drmInfo = {};
    if (drm && Object.keys(drm).length) {
      if (Platform.OS === 'ios') {
        videoURLToDisplay = drm.url;
        drmInfo.type = DRMType.FAIRPLAY;
        drmInfo.certificateUrl = drm.FPcert;
        drmInfo.getLicense = (spcString, _contentId) => {
          return fetch(drm.FPserver, {
            method: 'POST',
            headers: {
              customdata: drm.AuthXML,
            },
            body: `spc=${spcString}&assetId=${_contentId}`,
          })
            .then((response) => response.text())
            .then((response) => response)
            .catch((error) => {
              videoURLToDisplay = drm.drmfail;
              console.error('Error ', error);
            });
        };
      } else {
        videoURLToDisplay = drm.dashUrl;
        drmInfo.type = DRMType.WIDEVINE;
        drmInfo.licenseServer = drm.WVserver;
        drmInfo.headers = {
          customdata: drm.AuthXML,
        };
      }
    }
    const ProgressBarContainer = isProgram ? View : TouchableOpacity;
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
            source={{ uri: videoURLToDisplay }}
            onProgress={this.handleVideoProgress}
            onLoadStart={this.onLoadStart}
            onReadyForDisplay={this.onReadyForDisplay}
            paused={isPaused}
            drm={drmInfo}
          />
          {isLoading && (
            <View style={styles.controlsBlock}>
              <Loader loaderColor={appStyles.buttonStyles.active.backgroundColor} />
            </View>
          )}
        </TouchableOpacity>
        {(controlsAreActive || isPaused) && !isLoading && (
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
            <ProgressBarContainer
              onPress={this.handleProgressbarPress}
              style={[
                styles.progressbarBlock,
                !isPortraitOrientation && styles.progressbarBlockInLandscape,
              ]}
            >
              <View
                style={[styles.passedTimeBlock, { width: `${(currentTime * 100) / duration}%` }]}
              />
            </ProgressBarContainer>
          </View>
        )}
      </View>
    );
  }
}
