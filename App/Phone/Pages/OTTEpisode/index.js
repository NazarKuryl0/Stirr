import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { BackButton, Background } from '../../Items';

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
