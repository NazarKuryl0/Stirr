import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchCitySelectionData } from '../../../Core/Stores/CitySelection/Actions';
import { fetchChannelsData } from '../../../Core/Stores/Channels/Actions';
import { Header } from '../../Items';

import { styles } from './styles';
class OTTFeed extends Component {
  state = {
    activeCategory: 'All',
  };
  componentDidMount() {
    const { fetchChannelsData } = this.props;
    fetchChannelsData();
  }
  handleCategoryPress = (name) => {
    this.setState({ activeCategory: name });
  };
  render() {
    const { activeCategory } = this.state;
    const {
      appStyles: { logo },
      navData,
      station,
      fetchCitySelectionData,
      channelsData,
      categories,
    } = this.props;
    let channelsToDisplay;
    if (channelsData) {
      channelsToDisplay =
        activeCategory === 'All'
          ? channelsData
          : channelsData.filter((item) => {
              const filteredChannels = item.channel[0].categories.filter(
                (channelCategory) => channelCategory.uuid === activeCategory
              );
              if (filteredChannels.length) {
                return item;
              }
            });
    }
    return (
      <View style={styles.root}>
        <Header
          renderBurger
          station={station}
          logo={logo}
          navData={navData}
          activePage="CHANNELS"
          fetchCitySelectionData={fetchCitySelectionData}
        />
        {!!channelsToDisplay && !!categories && (
          <View>
            <ScrollView
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesBlock}
            >
              <TouchableOpacity
                style={[
                  styles.categoryBlock,
                  activeCategory === 'All' && styles.activeCategoryBlock,
                ]}
                onPress={this.handleCategoryPress.bind(this, 'All')}
              >
                <Text style={[styles.category, activeCategory === 'All' && styles.activeCategory]}>
                  All
                </Text>
              </TouchableOpacity>
              {categories.map((category) => {
                const name = category.name;
                return (
                  <TouchableOpacity
                    style={[
                      styles.categoryBlock,
                      activeCategory === category.uuid && styles.activeCategoryBlock,
                    ]}
                    onPress={this.handleCategoryPress.bind(this, category.uuid)}
                  >
                    <Text
                      style={[
                        styles.category,
                        activeCategory === category.uuid && styles.activeCategory,
                      ]}
                    >
                      {name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={styles.timeBlock}>
              <Text style={styles.time}>TODAY</Text>
            </View>
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.channelsWithProgramsBlock}
            >
              <View>
                {channelsToDisplay.map((item) => {
                  const {
                    num,
                    icon: { src },
                  } = item.channel[0];
                  return (
                    <View style={styles.channelBlock}>
                      <Text style={styles.channel}>{num}</Text>
                      <Image
                        resizeMethod="contain"
                        source={{ uri: src }}
                        style={styles.channelIcon}
                      />
                    </View>
                  );
                })}
              </View>
              <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.programsBlock}>
                  {channelsToDisplay.map((item) => {
                    return (
                      <View style={styles.programsRowBlock}>
                        {item.programme.map((programs) => {
                          const {
                            title: { value: name },
                            stop,
                            start,
                          } = programs;
                          const pStart = moment(start, 'YYYYMMDDhhmmss');
                          const pStop = moment(stop, 'YYYYMMDDhhmmss');
                          const programDurationInMinutes = pStop.diff(pStart, 'minute');
                          const prgrmWidthBlock = (programDurationInMinutes * 275) / 30;
                          return (
                            <TouchableOpacity style={styles.programBlock(prgrmWidthBlock - 1)}>
                              <Text numberOfLines={1} style={styles.program}>
                                {name}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({
  config: { navData, appStyles },
  common: { station },
  Channels: { channelsData, categories },
}) => ({
  navData,
  appStyles,
  station,
  channelsData,
  categories,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCitySelectionData: (url) => dispatch(fetchCitySelectionData(url)),
  fetchChannelsData: () => dispatch(fetchChannelsData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OTTFeed);
