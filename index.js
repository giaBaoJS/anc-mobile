/**
 * @format
 */

import 'react-native-gesture-handler';
import './src/translations/i18n.js';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
