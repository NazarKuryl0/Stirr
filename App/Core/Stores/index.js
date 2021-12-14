import { combineReducers } from 'redux';
import config from './Config/Reducers';
import Channels from './Channels/Reducers';
import common from './Common/Reducers';
import OTTPage from './OTTPage/Reducers';
import ShowPage from './ShowPage/Reducers';
import CitySelection from './CitySelection/Reducers';
import OTTText from './OTTText/Reducers';
import OTTEpisode from './OTTEpisode/Reducers';
import SectionPage from './SectionPage/Reducers';
import rootSaga from '../Sagas';
import configureStore from './CreateStore';

export default () => {
  const rootReducer = combineReducers({
    config,
    Channels,
    common,
    OTTPage,
    ShowPage,
    CitySelection,
    OTTText,
    OTTEpisode,
    SectionPage,
  });

  return configureStore(rootReducer, rootSaga);
};
