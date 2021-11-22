import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';

import { WIDTH } from '../../../Core/Constants';
import Navigator from '../../../Core/Services/NavigationService';

import { styles } from './styles';

const colors = ['blue', 'red', 'green', 'yellow', 'pink'];
export default class CarouselTeaserList extends Component {
  handleItemPress = (link) => {
    Navigator.navigate(link);
  };
  renderItem = (i) => {
    const {
      item: { item },
      index,
    } = i;
    let ind = index > 5 ? index % 5 : index;
    const imageURL = item['media:content']['media:thumbnail'][2].url;
    return (
      <TouchableOpacity onPress={this.handleItemPress.bind(this, item.category)}>
        <FastImage
          source={{ uri: imageURL, priority: FastImage.priority.high }}
          style={{ width: '100%', height: '100%', backgroundColor: colors[ind] }}
        />
      </TouchableOpacity>
    );
  };
  render() {
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
        />
      </View>
    );
  }
}
