import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, View, Image, Text } from 'react-native';

import Navigator from '../../../Core/Services/NavigationService';

import { styles } from './styles';

export default class ThreeColumnTeaserList extends Component {
  handleItemPress = (el) => {
    const { fetchCitySelectionData, setStation } = this.props;
    if (!el.item['media:content']['sinclair:action_config'].city) {
      fetchCitySelectionData(el.item['media:content'].url);
    } else {
      setStation(el.item['media:content']['sinclair:action_value']);
      Navigator.navigateAndReset('OTTPage', { needUpdatePage: true });
    }
  };
  render() {
    const { data, title } = this.props;
    return (
      <View style={styles.root}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
          {data.map((el) => {
            const imageURL = el.item['media:content']['media:thumbnail'][0].url;
            const title = el.item['media:content']['media:description'].content;
            return (
              <TouchableOpacity
                onPress={this.handleItemPress.bind(this, el)}
                style={styles.elementBlock}
              >
                <Image source={{ uri: imageURL }} style={styles.image} />
                <Text style={styles.elementTitle}>{title}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
