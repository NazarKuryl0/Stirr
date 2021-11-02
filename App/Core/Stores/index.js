import { combineReducers } from 'redux';
import config from './Config/Reducers';
import rootSaga from '../Sagas';
import configureStore from './CreateStore';

export default () => {
    const rootReducer = combineReducers({
      config,
    });
  
    return configureStore(rootReducer, rootSaga);
  };