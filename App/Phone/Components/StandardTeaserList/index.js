import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

import { convertTime } from '../../../Core/Utils';
import Navigator from '../../../Core/Services/NavigationService';

import { styles } from './styles';

export default class StandardTeaserList extends Component {
  handleCardPress = (item) => {
    const {fetchShowPageData} = this.props;
    switch (item.linkType) {
      case 'episode': {
        Navigator.navigate('OTTEpisode')
      }
      case 'section': {
        Navigator.navigate('Section')
      }
      default: {
        fetchShowPageData(item.link)
        Navigator.navigate('ShowPage')
      }
    }
  };
  render() {
    const { itemComponentData, title } = this.props;
    return (
      <View style={styles.root}>
        <Text>{title}</Text>
        <ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollBlock}
        >
          {itemComponentData.map((component) => {
            const { item } = component;
            const imageURL = item['media:content']['media:thumbnail'][9].url;
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
                      uri: 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__480.jpg',
                    }}
                    style={styles.imageBlock}
                  />
                  {!!videoDuration && (
                    <View style={styles.durationBlock}>
                      <Text>{convertTime(videoDuration)}</Text>
                    </View>
                  )}
                </View>
                <Text>{title}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
