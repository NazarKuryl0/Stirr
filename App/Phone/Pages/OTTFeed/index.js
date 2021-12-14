import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { connect } from 'react-redux';

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
    return (
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Header
          renderBurger
          station={station}
          logo={logo}
          navData={navData}
          activePage="CHANNELS"
          fetchCitySelectionData={fetchCitySelectionData}
        />
        {!!channelsData && !!categories && (
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
                      activeCategory === name && styles.activeCategoryBlock,
                    ]}
                    onPress={this.handleCategoryPress.bind(this, name)}
                  >
                    <Text
                      style={[styles.category, activeCategory === name && styles.activeCategory]}
                    >
                      {name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
      </ScrollView>
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
