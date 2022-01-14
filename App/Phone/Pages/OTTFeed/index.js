import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchCitySelectionData } from '../../../Core/Stores/CitySelection/Actions';
import { fetchChannelsData, setSelectedProgram } from '../../../Core/Stores/Channels/Actions';
import { tripleTimeScheduleGradientColors, programsGradientColors } from '../../../Core/Constants';
import { Header, Gradient, VideoPlayer } from '../../Items';

import { styles } from './styles';

let timelineBlocks = [];
let startTimeConst;

class OTTFeed extends Component {
  state = {
    activeCategory: 'All',
  };
  componentDidMount() {
    const { fetchChannelsData } = this.props;
    fetchChannelsData();
  }
  handleCategoryPress = (name) => {
    this.setState({ activeCategory: name });
  };

  startTime = () => {
    if (!startTimeConst) {
      const time = moment().subtract('03:00:00');
      const remainder = 30 - (time.minute() % 30);

      startTimeConst = time.subtract(30 - remainder, 'minutes').seconds(0);
    }

    return startTimeConst;
  };

  handleProgramsScroll = (e) => {
    if (!this.timeBarScrolling) {
      this.ProgramsScrolling = true;
      let scrollX = e.nativeEvent.contentOffset.x;
      this.timeScrollRef.scrollTo({ x: scrollX, animated: false });
    }
    this.timeBarScrolling = false;
  };

  handleTimeBarScroll = (e) => {
    if (!this.ProgramsScrolling) {
      this.timeBarScrolling = true;
      let scrollX = e.nativeEvent.contentOffset.x;
      this.programsScrollRef.scrollTo({ x: scrollX, animated: false });
    }
    this.ProgramsScrolling = false;
  };

  handleProgramPress = (item) => {
    const { setSelectedProgram } = this.props;
    setSelectedProgram(item[0], item[1]);
  };

  render() {
    const { activeCategory } = this.state;
    const {
      appStyles,
      navData,
      station,
      fetchCitySelectionData,
      channelsData,
      categories,
      selectedProgram,
    } = this.props;
    const { logo } = appStyles;
    let channelsToDisplay;
    if (channelsData && selectedProgram) {
      channelsToDisplay =
        activeCategory === 'All'
          ? channelsData
          : channelsData.filter((item) => {
              const filteredChannels = item.channel[0].categories.filter(
                (channelCategory) => channelCategory.uuid === activeCategory
              );
              if (filteredChannels.length) {
                return item;
              }
            });
      channelsToDisplay = channelsToDisplay.filter((i, index) => index < 10);
      channelsToDisplay = channelsToDisplay.filter(
        (i, index) => i.channel[0]['display-name'] !== selectedProgram.channel['display-name']
      );
    }
    if (!timelineBlocks.length) {
      for (let i = 0; i < 49; ++i) {
        const blockTime = this.startTime()
          .clone()
          .add(30 * i, 'minutes');

        timelineBlocks = [
          ...timelineBlocks,
          {
            humanReadableTime: blockTime.format('h:mm A'),
          },
        ];
      }
    }
    return (
      <View style={styles.root}>
        <Header
          renderBurger
          station={station}
          logo={logo}
          navData={navData}
          activePage="CHANNELS"
          fetchCitySelectionData={fetchCitySelectionData}
        />
        {!!selectedProgram && (
          <View>
            <VideoPlayer
              appStyles={appStyles}
              videoURL={selectedProgram.program.item.link}
              drm={selectedProgram.drm}
              isProgram={true}
              duration={selectedProgram.programDuration}
            />
            <View style={styles.selectedProgramBlock}>
              <View style={styles.selectedProgramChannelBlock}>
                <Text style={styles.channel}>{selectedProgram.channel.num}</Text>
                <Image
                  resizeMethod="contain"
                  source={{ uri: selectedProgram.channel.icon.src }}
                  style={styles.channelIcon}
                />
              </View>
              <View style={styles.selectedProgramDescriptionBlock}>
                <View style={styles.selectedProgramDescriptionBlockFirstLine}>
                  {selectedProgram.program.item['media:content']['sinclair:isLive'] === 'true' && (
                    <View style={styles.liveBlock}>
                      <Text style={styles.live}>LIVE</Text>
                    </View>
                  )}
                  <Text style={styles.nowPlaying}>Now Playing</Text>
                </View>
                <Text style={styles.selectedProgramTitle}>
                  {selectedProgram.program.item['media:content']['media:title'].content}
                </Text>
              </View>
            </View>
          </View>
        )}
        {!!channelsToDisplay && !!categories && (
          <View>
            <ScrollView
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesBlock}
            >
              <TouchableOpacity
                style={[
                  styles.categoryBlock,
                  activeCategory === 'All' && styles.activeCategoryBlock,
                ]}
                onPress={this.handleCategoryPress.bind(this, 'All')}
              >
                <Text style={[styles.category, activeCategory === 'All' && styles.activeCategory]}>
                  All
                </Text>
              </TouchableOpacity>
              {categories.map((category) => {
                const name = category.name;
                return (
                  <TouchableOpacity
                    style={[
                      styles.categoryBlock,
                      activeCategory === category.uuid && styles.activeCategoryBlock,
                    ]}
                    onPress={this.handleCategoryPress.bind(this, category.uuid)}
                  >
                    <Text
                      style={[
                        styles.category,
                        activeCategory === category.uuid && styles.activeCategory,
                      ]}
                    >
                      {name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <View style={styles.timesBlock}>
              <View style={styles.timeBlock}>
                <Gradient
                  width={styles.timeBlock.width}
                  height={styles.timeBlock.height}
                  startColor={tripleTimeScheduleGradientColors.start}
                  endColor={tripleTimeScheduleGradientColors.midle}
                />
                <Text style={styles.time}>TODAY</Text>
              </View>
              <View>
                <Gradient
                  width="100%"
                  height={styles.timeBlock.height}
                  startColor={tripleTimeScheduleGradientColors.midle}
                  endColor={tripleTimeScheduleGradientColors.end}
                />
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  ref={(ref) => (this.timeScrollRef = ref)}
                  onScroll={this.handleTimeBarScroll}
                  scrollEventThrottle={16}
                >
                  {!!timelineBlocks.length &&
                    timelineBlocks.map((time, timeIndex) => (
                      <View style={styles.timelineBlock}>
                        <Text style={[styles.timelineText, timeIndex && { marginLeft: -65 }]}>
                          {!timeIndex
                            ? time.humanReadableTime
                            : `Up next ${time.humanReadableTime}`}
                        </Text>
                      </View>
                    ))}
                </ScrollView>
              </View>
            </View>
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.channelsWithProgramsBlock}
            >
              <View>
                {channelsToDisplay.map((item) => {
                  const {
                    num,
                    icon: { src },
                  } = item.channel[0];
                  return (
                    <View style={styles.channelBlock}>
                      <Text style={styles.channel}>{num}</Text>
                      <Image
                        resizeMethod="contain"
                        source={{ uri: src }}
                        style={styles.channelIcon}
                      />
                    </View>
                  );
                })}
              </View>
              <ScrollView
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                ref={(ref) => (this.programsScrollRef = ref)}
                scrollEventThrottle={16}
                onScroll={this.handleProgramsScroll}
                contentOffset={{ x: this.state.offset }}
              >
                <View style={styles.programsBlock}>
                  {channelsToDisplay.map((item) => {
                    return (
                      <View style={styles.programsRowBlock}>
                        {item.programme.map((program, programIndex) => {
                          const {
                            title: { value: name },
                            stop,
                            start,
                          } = program;
                          const pStart = moment(start, 'YYYYMMDDhhmmss');
                          const pStop = moment(stop, 'YYYYMMDDhhmmss');
                          const programDurationInMinutes = pStop.diff(pStart, 'minute');
                          const prgrmWidthBlock = (programDurationInMinutes * 275) / 30;
                          const Container = !programIndex ? TouchableOpacity : View;
                          return (
                            <Container
                              onPress={this.handleProgramPress.bind(this, [
                                item.channel[0],
                                (pStop - pStart) / 1000,
                              ])}
                              style={styles.programBlock(prgrmWidthBlock - 1)}
                            >
                              {!programIndex && (
                                <Gradient
                                  width={styles.programBlock(prgrmWidthBlock - 1).width}
                                  height={styles.programsRowBlock.height - 2}
                                  startColor={programsGradientColors.start}
                                  endColor={programsGradientColors.end}
                                />
                              )}
                              <Text numberOfLines={1} style={styles.program}>
                                {name}
                              </Text>
                            </Container>
                          );
                        })}
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({
  config: { navData, appStyles },
  common: { station },
  Channels: { channelsData, categories, selectedProgram },
}) => ({
  navData,
  appStyles,
  station,
  channelsData,
  categories,
  selectedProgram,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCitySelectionData: (url) => dispatch(fetchCitySelectionData(url)),
  fetchChannelsData: () => dispatch(fetchChannelsData()),
  setSelectedProgram: (data, duration) => dispatch(setSelectedProgram(data, duration)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OTTFeed);
