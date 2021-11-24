import { combineReducers } from 'redux';
import config from './Config/Reducers';
import common from './Common/Reducers';
import OTTPage from './OTTPage/Reducers';
import ShowPage from './ShowPage/Reducers';
import CitySelection from './CitySelection/Reducers';
import rootSaga from '../Sagas';
import configureStore from './CreateStore';

export default () => {
  const rootReducer = combineReducers({
    config,
    common,
    OTTPage,
    ShowPage,
    CitySelection,
  });

  return configureStore(rootReducer, rootSaga);
};
