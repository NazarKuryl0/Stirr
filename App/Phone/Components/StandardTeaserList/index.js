import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

import { convertTime } from '../../../Core/Utils';
import Navigator from '../../../Core/Services/NavigationService';

import { styles } from './styles';

export default class StandardTeaserList extends Component {
  handleCardPress = (item) => {
    const { fetchShowPageData, fetchSectionPageData, fetchOTTEpisodePageData } = this.props;
    if (item.linkType === 'episode') {
      fetchOTTEpisodePageData(item.link);
      Navigator.navigate('OTTEpisode');
    } else if (item.linkType === 'section') {
      fetchSectionPageData(item.link);
      Navigator.navigate('Section');
    } else {
      fetchShowPageData(item.link);
      Navigator.navigate('ShowPage');
    }
  };
  render() {
    const { itemComponentData, title } = this.props;
    return (
      <View style={styles.root}>
        <Text style={styles.title}>{title}</Text>
        <ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollBlock}
        >
          {itemComponentData.map((component) => {
            const { item } = component;
            const imageURL = item['media:content']['media:thumbnail'][0].url;
            const title = item['media:content']['media:title'].content;
            const videoDuration = +item['media:content'].duration;
            return (
              <TouchableOpacity
                key={title}
                onPress={this.handleCardPress.bind(this, item)}
                style={styles.showBlock}
              >
                <View>
                  <FastImage
                    source={{
                      uri: imageURL,
                    }}
                    style={styles.imageBlock}
                  />
                  {!!videoDuration && (
                    <View style={styles.durationBlock}>
                      <Text style={styles.duration}>{convertTime(videoDuration)}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.showTitleBlock}>
                  <Text style={styles.showTitle}>{title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
