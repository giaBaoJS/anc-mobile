/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PortalProvider } from '@gorhom/portal';
import SplashScreen from 'react-native-splash-screen';
import { store } from './src/store/Store';
import Navigator from './src/navigators/Navigator';
import { MenuProvider } from 'react-native-popup-menu';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <MenuProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <Navigator />
        </Provider>
      </GestureHandlerRootView>
    </MenuProvider>
  );
};

export default App;
