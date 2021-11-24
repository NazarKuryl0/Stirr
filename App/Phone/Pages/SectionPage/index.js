import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';

import { StandardTeaserList, FeedTeaserList } from '../../Components';
import { BackButton, Background } from '../../Items';
import { fetchShowPageData } from '../../../Core/Stores/ShowPage/Actions';
import { fetchSectionPageData } from '../../../Core/Stores/SectionPage/Actions';

import { styles } from './styles';

class SectionPage extends Component {
  render() {
    const { standartTeaserListData, feedTeaserListData, fetchShowPageData, fetchSectionPageData } =
      this.props;
    const {
      appStyles: { backgroundURL },
    } = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.headerBlock}>
          <BackButton />
        </View>
        {!!feedTeaserListData &&
          feedTeaserListData.map((item) => (
            <FeedTeaserList
              fetchShowPageData={fetchShowPageData}
              fetchSectionPageData={fetchSectionPageData}
              itemComponentData={item.data}
              title={item.title}
            />
          ))}
        {!!standartTeaserListData &&
          standartTeaserListData.map((item) => (
            <StandardTeaserList
              fetchSectionPageData={fetchSectionPageData}
              fetchShowPageData={fetchShowPageData}
              itemComponentData={item.data}
              title={item.title}
            />
          ))}
        <Background url={backgroundURL} />
      </ScrollView>
    );
  }
}

const mapStateToProps = ({
  config: { appStyles },
  SectionPage: { feedTeaserListData, standartTeaserListData },
}) => ({
  appStyles,
  feedTeaserListData,
  standartTeaserListData,
});

const mapDispatchToProps = (dispatch) => ({
  fetchShowPageData: (url) => dispatch(fetchShowPageData(url)),
  fetchSectionPageData: (url) => dispatch(fetchSectionPageData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionPage);
