import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, TextInput, View, TouchableOpacity, Image, Text } from 'react-native';

import { getSuggestionsList, clearSuggestionsList } from '../../../Core/Stores/OTTSearch/Actions';
import { fetchShowPageData } from '../../../Core/Stores/ShowPage/Actions';
import { fetchOTTEpisodePageData } from '../../../Core/Stores/OTTEpisode/Actions';
import { fetchSectionPageData } from '../../../Core/Stores/SectionPage/Actions';
import Navigator from '../../../Core/Services/NavigationService';
import { StandardTeaserList } from '../../Components';
import { Background } from '../../Items';

import { styles } from './styles';

const search = require('../../../Assets/SearchIcon.png');
const clear = require('../../../Assets/ClearInputIcon.png');

class OTTSearch extends Component {
  state = {
    inputValue: undefined,
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e });
  };

  handleSearch = () => {
    const { inputValue } = this.state;
    const { getSuggestionsList } = this.props;
    getSuggestionsList(inputValue);
  };

  handleEmptyInput = () => {
    this.setState({ inputValue: undefined });
  };

  handleCancelPress = () => {
    const { clearSuggestionsList } = this.props;
    clearSuggestionsList();
    Navigator.goBack();
  };

  render() {
    const { inputValue } = this.state;
    const {
      appStyles: { backgroundURL },
      suggestionsList,
    } = this.props;
    return (
      <ScrollView style={styles.root} bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.headerBlock}>
          <View style={styles.inputRow}>
            <Image source={search} />
            <TextInput
              onChangeText={this.handleInputChange}
              onSubmitEditing={this.handleSearch}
              value={inputValue}
              style={styles.input}
            />
            <TouchableOpacity onPress={this.handleEmptyInput} style={styles.clearIconBlock}>
              {inputValue && <Image source={clear} />}
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.handleCancelPress}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
        {!!suggestionsList &&
          !!Object.keys(suggestionsList).length &&
          Object.keys(suggestionsList).map((key) => (
            <StandardTeaserList
              title={key}
              fetchShowPageData={fetchShowPageData}
              fetchSectionPageData={fetchSectionPageData}
              fetchOTTEpisodePageData={fetchOTTEpisodePageData}
              itemComponentData={suggestionsList[key]}
            />
          ))}
        <Background url={backgroundURL} />
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ config: { appStyles }, OTTSearch: { suggestionsList } }) => ({
  appStyles,
  suggestionsList,
});

const mapDispatchToProps = (dispatch) => ({
  getSuggestionsList: (value) => dispatch(getSuggestionsList(value)),
  clearSuggestionsList: () => dispatch(clearSuggestionsList()),
  fetchShowPageData: (url) => dispatch(fetchShowPageData(url)),
  fetchSectionPageData: (url) => dispatch(fetchSectionPageData(url)),
  fetchOTTEpisodePageData: (url) => dispatch(fetchOTTEpisodePageData(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OTTSearch);
