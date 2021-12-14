import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { fetchCitySelectionData } from '../../../Core/Stores/CitySelection/Actions';
import { fetchChannelsData } from '../../../Core/Stores/Channels/Actions';
import { Header } from '../../Items';

class OTTFeed extends Component {
  componentDidMount() {
    const { fetchChannelsData } = this.props;
    fetchChannelsData();
  }
  render() {
    const {
      appStyles: { logo },
      navData,
      station,
      fetchCitySelectionData,
      channelsData,
      catogories,
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
      </ScrollView>
    );
  }
}

const mapStateToProps = ({
  config: { navData, appStyles },
  common: { station },
  Channels: { channelsData },
}) => ({
  navData,
  appStyles,
  station,
  channelsData,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCitySelectionData: (url) => dispatch(fetchCitySelectionData(url)),
  fetchChannelsData: () => dispatch(fetchChannelsData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OTTFeed);
