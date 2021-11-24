import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import { TextTeaser, ThreeColumnTeaserList, FourColumnTeaserList } from '../../Components';
import { BackButton, Background } from '../../Items';
import { setStation } from '../../../Core/Stores/Common/Actions';
import { fetchCitySelectionData } from '../../../Core/Stores/CitySelection/Actions';

import { styles } from './styles';

class CitySelection extends Component {
  render() {
    const {
      teaserData,
      threeColumTeaserData,
      setStation,
      fourColumTeaserData,
      fetchCitySelectionData,
    } = this.props;
    const {
      appStyles: { backgroundURL },
    } = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={{ flex: 1 }}>
        <View style={styles.headerBlock}>
          <Text style={styles.title}>Change City</Text>
        </View>
        <View style={styles.mainBlock}>
          {!!teaserData && <TextTeaser data={teaserData} />}
          {!!threeColumTeaserData && (
            <ThreeColumnTeaserList
              title={threeColumTeaserData.title}
              data={threeColumTeaserData.data}
              setStation={setStation}
            />
          )}
          {!!fourColumTeaserData &&
            fourColumTeaserData.data.map((item, index) => (
              <FourColumnTeaserList
                data={item}
                title={fourColumTeaserData.title[index]}
                setStation={setStation}
                fetchCitySelectionData={fetchCitySelectionData}
              />
            ))}
        </View>
        <BackButton />
        <Background url={backgroundURL} />
      </ScrollView>
    );
  }
}
const mapStateToProps = ({
  config: { appStyles },
  CitySelection: { teaserData, threeColumTeaserData, fourColumTeaserData },
}) => ({
  appStyles,
  teaserData,
  threeColumTeaserData,
  fourColumTeaserData,
});
const mapDispatchToProps = (dispatch) => ({
  setStation: (station) => dispatch(setStation(station)),
  fetchCitySelectionData: (url) => dispatch(fetchCitySelectionData(url)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CitySelection);
