import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';

import {
  fetchStationAutoSelectionData,
  fetchOTTPageData,
} from '../../../Core/Stores/OTTPage/Actions';
import { fetchShowPageData } from '../../../Core/Stores/ShowPage/Actions';
import { fetchCitySelectionData } from '../../../Core/Stores/CitySelection/Actions';
import { fetchSectionPageData } from '../../../Core/Stores/SectionPage/Actions';
import { FullScreenCard, CarouselTeaserList, StandardTeaserList } from '../../Components';
import { Background, Header } from '../../Items';

import { styles } from './styles';

class OTTPage extends Component {
  state = {
    needUpdate: this.props.navigation.state.params?.needUpdatePage,
  };
  componentDidMount() {
    const { station, navData, fetchStationAutoSelectionData } = this.props;
    if (!station) {
      fetchStationAutoSelectionData(navData[0].path);
    } else {
      fetchOTTPageData(navData[0].path, station);
    }
  }
  render() {
    const { needUpdate } = this.state;
    const {
      appStyles: { buttonStyles, backgroundURL, logo },
    } = this.props;
    const {
      pageData,
      fetchOTTPageData,
      componentsData,
      fetchShowPageData,
      navData,
      station,
      fetchCitySelectionData,
      fetchSectionPageData,
    } = this.props;
    if (needUpdate) {
      this.setState({ needUpdate: false });
      fetchOTTPageData(navData[0].path, station);
    }
    return (
      <ScrollView bounces={false} style={styles.root}>
        {pageData && pageData[0].type !== 'FULL_SCREEN_CARD' && (
          <Header
            renderBurger
            renderSearch
            logo={logo}
            navData={navData}
            activePage="HOME"
            fetchCitySelectionData={fetchCitySelectionData}
          />
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
                    fetchSectionPageData={fetchSectionPageData}
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
  fetchShowPageData: (url) => dispatch(fetchShowPageData(url)),
  fetchCitySelectionData: (url) => dispatch(fetchCitySelectionData(url)),
  fetchSectionPageData: (url) => dispatch(fetchSectionPageData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OTTPage);
