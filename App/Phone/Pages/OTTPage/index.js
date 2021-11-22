import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import {
  fetchStationAutoSelectionData,
  fetchOTTPageData,
} from '../../../Core/Stores/OTTPage/Actions';
import { setStation } from '../../../Core/Stores/Common/Actions';
import { FullScreenCard } from '../../Components';
import { styles } from './styles';

class OTTPage extends Component {
  componentDidMount() {
    const { station, navData, fetchStationAutoSelectionData } = this.props;
    if (!station) {
      fetchStationAutoSelectionData(navData[0].path);
    } else {
      fetchOTTPageData(navData[0].path, station);
    }
  }
  render() {
    const {
      appStyles: { buttonStyles },
    } = this.props;
    const { pageData, fetchOTTPageData } = this.props;
    return (
      <View style={styles.root}>
        {pageData &&
          pageData.map((page) => {
            switch (page.type) {
              case 'FULL_SCREEN_CARD': {
                return (
                  <FullScreenCard
                    pageData={page}
                    buttonStyles={buttonStyles}
                    fetchOTTPageData={fetchOTTPageData}
                  />
                );
              }
            }
          })}
      </View>
    );
  }
}

const mapStateToProps = ({
  config: { navData, appStyles },
  common: { station },
  OTTPage: { OTTPageData: pageData },
}) => ({
  navData,
  appStyles,
  station,
  pageData,
});

const mapDispatchToProps = (dispatch) => ({
  fetchStationAutoSelectionData: (url) => dispatch(fetchStationAutoSelectionData(url)),
  fetchOTTPageData: (url, station) => dispatch(fetchOTTPageData(url, station)),
  setStation: (station) => dispatch(setStation(station)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OTTPage);
