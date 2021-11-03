import React, { Component } from 'react';
import { View } from 'react-native';

import AppNavigator from './AppNavigator';
import NavigationService from './Core/Services/NavigationService'

export default class Root extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <AppNavigator ref={(navigatorRef) => {
                    NavigationService.setTopLevelNavigator(navigatorRef)
                }} />
            </View>
        )
    }
}