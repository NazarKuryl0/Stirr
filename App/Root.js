import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import AppNavigator from './AppNavigator';
import NavigationService from './Core/Services/NavigationService';
import { Loader } from './Phone/Items';

class Root extends Component {
  render() {
    const { appStyles, isLoading } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <AppNavigator
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
        {!!appStyles && isLoading && (
          <Loader
            backgroundImageURL={appStyles.backgroundURL}
            loaderColor={appStyles.buttonStyles.active.backgroundColor}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ config: { appStyles }, common: { isLoading } }) => ({
  appStyles,
  isLoading,
});

export default connect(mapStateToProps, null)(Root);
