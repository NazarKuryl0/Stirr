import React, { Component } from 'react';
import { View, LogBox } from 'react-native';

import AppNavigator from './AppNavigator';
import NavigationService from './Core/Services/NavigationService'

export default class Root extends Component {
    render() {
        LogBox.ignoreAllLogs();
        return (
            <View style={{ flex: 1 }}>
                <AppNavigator ref={(navigatorRef) => {
                    NavigationService.setTopLevelNavigator(navigatorRef)
                }} />
            </View>
        )
    }
}