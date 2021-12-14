import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';

import { WIDTH } from '../../../Core/Constants';
import Navigator from '../../../Core/Services/NavigationService';

import { styles } from './styles';

const colors = ['blue', 'red', 'green', 'yellow', 'pink'];
export default class CarouselTeaserList extends Component {
  state = {
    activeSlide: 0,
  };
  handleItemPress = (item) => {
    const { fetchShowPageData, fetchOTTEpisodePageData, fetchSectionPageData } = this.props;
    if (item.linkType === 'show') {
      fetchShowPageData(item.link);
      Navigator.navigate('ShowPage');
    } else if (item.linkType === 'feed') {
      Navigator.navigate('OTTFeed');
    } else if (item.linkType === 'episode') {
      fetchOTTEpisodePageData(item.link);
      Navigator.navigate('OTTEpisode');
    } else if (item.linkType === 'section') {
      fetchSectionPageData(item.link);
      Navigator.navigate('Section');
    }
  };
  renderItem = (i) => {
    const {
      item: { item },
      index,
    } = i;
    let ind = index > 5 ? index % 5 : index;
    const imageURL = item['media:content']['media:thumbnail'][2].url;
    const title = item['media:content']['media:title'].content;
    const subtitle = item['media:content']['media:description'].content;
    return (
      <TouchableOpacity onPress={this.handleItemPress.bind(this, item)}>
        <FastImage
          source={{ uri: imageURL, priority: FastImage.priority.high }}
          style={{ width: '100%', height: '100%', backgroundColor: colors[ind] }}
        />
        <View style={styles.descriptionBlock}>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  onSnapToItem = (index) => {
    this.setState({ activeSlide: index });
  };
  render() {
    const { activeSlide } = this.state;
    const { itemComponentData } = this.props;
    return (
      <View style={styles.root}>
        <Carousel
          data={itemComponentData}
          renderItem={this.renderItem}
          sliderWidth={WIDTH}
          itemWidth={WIDTH}
          loop
          autoplay
          inactiveSlideScale={1}
          lockScrollWhileSnapping
          onSnapToItem={this.onSnapToItem}
        />
        <Pagination
          dotsLength={itemComponentData.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.dotsContainer}
          dotStyle={styles.dot}
          inactiveDotStyle={styles.inactiveDot}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
        />
      </View>
    );
  }
}
