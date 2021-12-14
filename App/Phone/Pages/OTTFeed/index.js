import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { fetchCitySelectionData } from '../../../Core/Stores/CitySelection/Actions';
import { Header } from '../../Items';

class OTTFeed extends Component {
  render() {
    const {
      appStyles: { logo },
      navData,
      station,
      fetchCitySelectionData,
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

const mapStateToProps = ({ config: { navData, appStyles }, common: { station } }) => ({
  navData,
  appStyles,
  station,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCitySelectionData: (url) => dispatch(fetchCitySelectionData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OTTFeed);
