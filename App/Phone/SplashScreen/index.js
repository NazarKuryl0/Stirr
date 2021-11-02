import React, { Component } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'

import { fetchConfig } from '../../Core/Stores/Config/Actions'

class SplashScreen extends Component {
    componentDidMount() {
        this.props.fetchConfig()
    }
    render() {
        console.log(this.props.data)
        return (
            <SafeAreaView>
                    <Text>HELLO</Text>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({config}) => ({
    data: config.data
})

const mapDispatchToProps = (dispatch) => ({
    fetchConfig: () => dispatch(fetchConfig())
})

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)