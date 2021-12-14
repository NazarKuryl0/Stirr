import React, { Component } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import Navigator from '../../../Core/Services/NavigationService';

import { styles } from './styles';

const burger = require('../../../Assets/Burger.png');
const close = require('../../../Assets/Close.png');

export default class Header extends Component {
  state = {
    isOpenBurger: false,
  };
  handleBurgerPress = () => {
    const { isOpenBurger } = this.state;
    this.setState({ isOpenBurger: !isOpenBurger });
  };
  handleNavPress = (item) => {
    const { activePage, fetchCitySelectionData } = this.props;
    if (item.title === activePage) {
      this.setState({ isOpenBurger: false });
    } else if (item.tag === 'citySelection') {
      this.setState({ isOpenBurger: false });
      fetchCitySelectionData(item.path);
      Navigator.navigate('CitySelection');
    } else if (item.type === 'OTTSettings') {
      this.setState({ isOpenBurger: false });
      Navigator.navigate('OTTSettings', item);
    }
  };
  render() {
    const { isOpenBurger } = this.state;
    const { renderBurger, renderSearch, station, logo, navData, activePage } = this.props;
    if (!isOpenBurger) {
      return (
        <View style={styles.root}>
          {renderBurger ? (
            <TouchableOpacity style={styles.burger} onPress={this.handleBurgerPress}>
              <Image source={burger} />
            </TouchableOpacity>
          ) : (
            <View style={styles.defaultBlock} />
          )}
          <FastImage source={{ uri: logo }} resizeMode="contain" style={styles.logo} />
          {renderSearch ? (
            <View style={{ width: 20, height: 20, backgroundColor: 'green' }} />
          ) : station ? (
            <View style={styles.stationBlock}>
              <Text style={styles.station}>{station}</Text>
            </View>
          ) : (
            <View style={styles.defaultBlock} />
          )}
        </View>
      );
    } else {
      return (
        <Modal visible={isOpenBurger}>
          <View style={styles.modalBlock}>
            <TouchableOpacity style={styles.close} onPress={this.handleBurgerPress}>
              <Image source={close} />
            </TouchableOpacity>
            <View style={styles.modalMainBlock}>
              {!!navData &&
                navData.map((nav) => {
                  const { title } = nav;
                  return (
                    <TouchableOpacity
                      style={[styles.navBlock, activePage === title && styles.activeNavBlock]}
                      onPress={this.handleNavPress.bind(this, nav)}
                    >
                      <View style={styles.titleBlock}>
                        <Text style={styles.title}>{title}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
        </Modal>
      );
    }
  }
}
