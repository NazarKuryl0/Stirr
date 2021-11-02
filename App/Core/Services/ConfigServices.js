import axios from 'axios';

export function getConfigData() {
 return axios.get('https://ott-config.sinclairstoryline.com/configapi/7ad01bd9f43d1f05f4a414c0bf424c81/1.0/Stirr/ios/iOS/1.0.18.0/Chrome88/')
}