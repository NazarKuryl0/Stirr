import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';

import { BackButton, Background } from '../../Items';

import { styles } from './styles';

class OTTText extends Component {
  render() {
    const {
      OTTTextPageData,
      appStyles: { backgroundURL },
    } = this.props;
    const { title } = this.props.navigation.state.params;
    return (
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.mainBlock}>
          {!!OTTTextPageData && <Text style={styles.text}>{OTTTextPageData}</Text>}
        </View>
        <BackButton />
        <Background url={backgroundURL} />
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ config: { appStyles }, OTTText: { OTTTextPageData } }) => ({
  appStyles,
  OTTTextPageData,
});

export default connect(mapStateToProps, null)(OTTText);
