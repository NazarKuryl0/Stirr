import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

import { fetchStationAutoSelectionData } from '../../Core/Stores/OTTPage/Actions';
import { setStation } from '../../Core/Stores/Common/Actions';
import { styles } from './styles';

class OTTPage extends Component {
  state = {
    time: this.props.timer,
    disabledButton: true,
  };
  componentDidMount() {
    const { station, navData, fetchStationAutoSelectionData } = this.props;
    setInterval(() => {
      const { time } = this.state;
      time > 0 ? this.setState({ time: time - 1 }) : this.setState({ disabledButton: false });
    }, 1000);
    if (!station) {
      fetchStationAutoSelectionData(navData[0].path);
    }
  }
  handleButtonPress = () => {
    const { setStation, newStation } = this.props;
    setStation(newStation);
  };
  render() {
    const { disabledButton } = this.state;
    const {
      appStyles,
      background,
      displayTitle,
      subTitle,
      logoURL,
      stationText,
      promoText,
      buttonText,
    } = this.props;
    const { buttonStyles } = appStyles;
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
        <View style={styles.main}>
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

const mapStateToProps = ({
  config: { navData, appStyles, timer },
  common: { station },
  OTTPage: {
    background,
    displayTitle,
    subTitle,
    logoURL,
    stationText,
    promoText,
    buttonText,
    station: newStation,
  },
}) => ({
  navData,
  appStyles,
  timer,
  station,
  background,
  displayTitle,
  subTitle,
  logoURL,
  stationText,
  promoText,
  buttonText,
  newStation,
});

const mapDispatchToProps = (dispatch) => ({
  fetchStationAutoSelectionData: (url) => dispatch(fetchStationAutoSelectionData(url)),
  setStation: (station) => dispatch(setStation(station)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OTTPage);
