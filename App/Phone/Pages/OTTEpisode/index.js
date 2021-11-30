import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { BackButton, Background, VideoPlayer } from '../../Items';

import { styles } from './styles';

class OTTEpisode extends Component {
  render() {
    const {
      appStyles: { backgroundURL },
      data,
    } = this.props;
    return (
      <View>
        <View style={styles.headerBlock}>
          <BackButton />
        </View>
        {data && (
          <View>
            <VideoPlayer videoURL={data.videoURL} />
            <View style={styles.mainBlock}>
              <Text style={styles.title}>{data.title}</Text>
              <View style={styles.subtitleBlock}>
                <Text style={styles.subtitle}>{data.subtitle}</Text>
              </View>
              <Text style={styles.subtitle}>{data.duration}</Text>
            </View>
          </View>
        )}
        <Background url={backgroundURL} />
      </View>
    );
  }
}

const mapStateToProps = ({ config: { appStyles }, OTTEpisode: { data } }) => ({
  appStyles,
  data,
});

export default connect(mapStateToProps, null)(OTTEpisode);
