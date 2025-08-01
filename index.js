/**
 * @format
 */

import { AppRegistry, Text, TextInput, View } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { persistor, store } from './src/Redux/Reducer';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FlashMessage from 'react-native-flash-message';
import { MenuProvider } from 'react-native-popup-menu';

const queryClient = new QueryClient();

const SnackTrackTruck = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <MenuProvider>
            <App />
          </MenuProvider>
        </PersistGate>
        <FlashMessage position="top" />
      </Provider>
    </QueryClientProvider>
  );
};

//ADD this
if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

if (View.defaultProps == null) {
  View.defaultProps = {};
  View.defaultProps.allowFontScaling = false;
}

AppRegistry.registerComponent(appName, () => SnackTrackTruck);
