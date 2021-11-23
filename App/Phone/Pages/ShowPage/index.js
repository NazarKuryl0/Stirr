import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

import Navigator from '../../../Core/Services/NavigationService';

import { styles } from './styles';

class ShowPage extends Component {
  state = {
    activeSeason: 0,
  };
  handleSeasonPress = (seasonIndex) => {
    this.setState({ activeSeason: seasonIndex });
  };
  handleEpisodePress = (episode) => {
    const { item } = episode;
    if (item.linkType === 'episode') {
      Navigator.navigate('OTTEpisode');
    }
  };
  render() {
    const { showData, seasonsData } = this.props;
    const { activeSeason } = this.state;
    const seasonToDisplay = seasonsData && seasonsData.seasonsData[activeSeason];
    return (
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {showData && (
          <View style={styles.showDataBlock}>
            <FastImage source={{ uri: showData.image }} style={styles.showDataImageBlock} />
            <View style={styles.showDataDescriptionBlock}>
              <Text>{showData.title}</Text>
              <Text>{showData.description}</Text>
            </View>
          </View>
        )}
        {seasonsData && (
          <View style={styles.mainBlock}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} bounces={false}>
              {seasonsData.titles.map((title, index) => (
                <TouchableOpacity
                  onPress={this.handleSeasonPress.bind(this, index)}
                  style={[
                    styles.seasonsTitlesBlock,
                    activeSeason === index && styles.activeSeasonTitleBlock,
                  ]}
                >
                  <Text>{title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.seasonContentBlock}>
              {seasonToDisplay &&
                seasonToDisplay.map((season) => {
                  const imageURL = season.item['media:content']['media:thumbnail'][0].url;
                  const title = season.item['media:content']['media:title'].content;
                  return (
                    <TouchableOpacity
                      onPress={this.handleEpisodePress.bind(this, season)}
                      style={styles.espideBlock}
                    >
                      <FastImage source={{ uri: imageURL }} style={styles.espideImageBlock} />
                      <Text>{title}</Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ ShowPage: { showData, seasonsData } }) => ({
  showData,
  seasonsData,
});

export default connect(mapStateToProps, null)(ShowPage);
