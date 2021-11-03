import { combineReducers } from 'redux';
import config from './Config/Reducers';
import common from './Common/Reducers';
import rootSaga from '../Sagas';
import configureStore from './CreateStore';

export default () => {
    const rootReducer = combineReducers({
      config,
      common,
    });
  
    return configureStore(rootReducer, rootSaga);
  };