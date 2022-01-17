import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, TextInput, View, TouchableOpacity, Image } from 'react-native';

import { getSuggestionsList } from '../../../Core/Stores/OTTSearch/Actions';
import { Background } from '../../Items';

import { styles } from './styles';

const search = require('../../../Assets/SearchIcon.png');

class OTTSearch extends Component {
  state = {
    inputValue: undefined,
  };
  handleInputChange = (e) => {
    this.setState({ inputValue: e });
  };
  handleSearchIconPress = () => {
    const { inputValue } = this.state;
    const { getSuggestionsList } = this.props;
    getSuggestionsList(inputValue);
  };
  render() {
    const {
      appStyles: { backgroundURL },
    } = this.props;
    return (
      <ScrollView style={styles.root} bounces={false}>
        <View style={styles.mainBlock}>
          <View style={styles.searchLine}>
            <TextInput
              onChangeText={this.handleInputChange}
              onSubmitEditing={this.handleSearchIconPress}
              style={styles.input}
              placeholder="Enter name"
              placeholderTextColor="#ffffff"
            />
            <TouchableOpacity onPress={this.handleSearchIconPress}>
              <Image source={search} />
            </TouchableOpacity>
          </View>
        </View>
        <Background url={backgroundURL} />
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ config: { appStyles } }) => ({
  appStyles,
});

const mapDispatchToProps = (dispatch) => ({
  getSuggestionsList: (value) => dispatch(getSuggestionsList(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OTTSearch);
