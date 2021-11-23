import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';

import {
  fetchStationAutoSelectionData,
  fetchOTTPageData,
} from '../../../Core/Stores/OTTPage/Actions';
import { fetchShowPageData } from '../../../Core/Stores/ShowPage/Actions';
import { setStation } from '../../../Core/Stores/Common/Actions';
import { FullScreenCard, CarouselTeaserList, StandardTeaserList } from '../../Components';
import { Background, Header } from '../../Items';

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
      appStyles: { buttonStyles, backgroundURL, logo },
    } = this.props;
    const { pageData, fetchOTTPageData, componentsData, fetchShowPageData, navData } = this.props;
    return (
      <ScrollView bounces={false} style={styles.root}>
        {pageData && pageData[0].type !== 'FULL_SCREEN_CARD' && (
          <Header renderBurger renderSearch logo={logo} navData={navData} activePage='HOME'/>
        )}
        {pageData &&
          pageData.map((page, pageIndex) => {
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
              case 'CAROUSEL_TEASER_LIST': {
                return <CarouselTeaserList itemComponentData={componentsData[pageIndex]} />;
              }
              case 'STANDARD_TEASER_LIST': {
                return (
                  <StandardTeaserList
                    title={page.displayTitle}
                    fetchShowPageData={fetchShowPageData}
                    itemComponentData={componentsData[pageIndex]}
                  />
                );
              }
            }
          })}
        <Background url={backgroundURL} />
      </ScrollView>
    );
  }
}

const mapStateToProps = ({
  config: { navData, appStyles },
  common: { station },
  OTTPage: { OTTPageData: pageData, OTTPageComponentsData: componentsData },
}) => ({
  navData,
  appStyles,
  station,
  pageData,
  componentsData,
});

const mapDispatchToProps = (dispatch) => ({
  fetchStationAutoSelectionData: (url) => dispatch(fetchStationAutoSelectionData(url)),
  fetchOTTPageData: (url, station) => dispatch(fetchOTTPageData(url, station)),
  setStation: (station) => dispatch(setStation(station)),
  fetchShowPageData: (url) => dispatch(fetchShowPageData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OTTPage);
