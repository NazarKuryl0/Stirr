import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';

import { fetchConfig } from '../../Core/Stores/Config/Actions';
import Navigator from '../../Core/Services/NavigationService';
import { SPLASH_SCREEN_TIMEOUT } from '../../Core/Constants';
import { styles } from './styles';

const logo = require('../../Assets/Stirr/Images/Logo.jpg');
const banner = require('../../Assets/Stirr/Images/CitySelect.png');

class WelcomePage extends Component {
    state = {
        displayBanner: false,
        checkDisplayBanner: false,
    }
    componentDidMount() {
        const { navData, fetchConfig } = this.props;
        (!navData) && fetchConfig();
    }
    componentDidUpdate() {
        const { navData, station } = this.props;
        const { checkDisplayBanner } = this.state;
        if (navData) {
            let navTimer = station ? 0 : SPLASH_SCREEN_TIMEOUT;
            if (!station && !checkDisplayBanner) {
                this.setState({ displayBanner: true, checkDisplayBanner: true })
            }
            setTimeout(() => {
                Navigator.navigateAndReset(navData[0].type)
            }, navTimer)
        }
    }
    render() {
        const { displayBanner } = this.state;
        return (
            <View style={styles.root}>
                {displayBanner ? (
                    <Image source={banner} style={styles.banner} />
                ) : (
                    <Image source={logo} />
                )}
            </View>
        )
    }
}

const mapStateToProps = ({ config: { navData }, common: { station } }) => ({
    navData,
    station,
})

const mapDispatchToProps = (dispatch) => ({
    fetchConfig: () => dispatch(fetchConfig()),
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage)