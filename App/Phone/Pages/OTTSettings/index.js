import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text } from 'react-native';

import { BackButton, Background } from '../../Items';
import { fetchOTTTextPageData } from '../../../Core/Stores/OTTText/Actions';
import { fetchCitySelectionData } from '../../../Core/Stores/CitySelection/Actions';
import Navigator from '../../../Core/Services/NavigationService';

import { styles } from './styles';

class OTTSettings extends Component {
  handleItemPress = (el) => {
    const { fetchCitySelectionData, fetchOTTTextPageData } = this.props;
    if (el.tag === 'citySelection') {
      fetchCitySelectionData(el.path);
      Navigator.navigate('CitySelection');
    } else if (el.type === 'OTTText') {
      fetchOTTTextPageData(el.path);
      Navigator.navigate('OTTText', {
        title: el.title,
      });
    }
  };
  render() {
    const data = this.props.navigation.state.params;
    const { backgroundURL } = this.props.appStyles;
    return (
      <View>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>ABOUT</Text>
        </View>
        <BackButton />
        <View style={styles.mainBlock}>
          {!!data &&
            data.children.map((item, index) => (
              <TouchableOpacity
                onPress={this.handleItemPress.bind(this, item, index)}
                style={styles.itemBlock}
              >
                <Text style={styles.itemTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
        </View>
        <Background url={backgroundURL} />
      </View>
    );
  }
}

const mapStateToProps = ({ config: { appStyles } }) => ({
  appStyles,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCitySelectionData: (url) => dispatch(fetchCitySelectionData(url)),
  fetchOTTTextPageData: (url) => dispatch(fetchOTTTextPageData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OTTSettings);
