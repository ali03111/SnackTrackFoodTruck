import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import * as thunk from 'redux-thunk';

import AuthReducer from './AuthReducer';
import loadingReducer from './loadingReducer';
import onboardingReducer from './onboardingReducer';
import AlertReucer from './AlertReucer';
import getTrainingCatReducer from './getTrainingCatReducer';
import videoReducer from './videoReducer';
import ContactsReducer from './ContactsReducer';
import IsContactAllow from './IsContactAllow';
import ImagePrevReducer from './ImagePrevReducer';
import NotificationReducer from './NotificationReducer';
import ChatNotifyReducer from './ChatNotifyReducer';

const onBoardPersistConfig = {
  key: 'onboarding',
  storage: AsyncStorage,
  whitelist: ['onboarding'],
};

const AuthPersistConfig = {
  key: 'Auth',
  storage: AsyncStorage,
  whitelist: ['userData', 'token', 'isLogin', 'deviceId'],
};

const VideoPersistConfig = {
  key: 'isVideo',
  storage: AsyncStorage,
  whitelist: ['isVideo'],
};

const ContactPerConfig = {
  key: 'isContact',
  storage: AsyncStorage,
  whitelist: ['isContact'],
};

const NotificationConfig = {
  key: 'isNotification',
  storage: AsyncStorage,
  whitelist: ['isNotification'],
};

const ChatNotifyConfig = {
  key: 'isChatNotify',
  storage: AsyncStorage,
  whitelist: ['isChatNotify'],
};

const rootReducer = combineReducers({
  onboarding: persistReducer(onBoardPersistConfig, onboardingReducer),
  Auth: persistReducer(AuthPersistConfig, AuthReducer),
  isVideo: persistReducer(VideoPersistConfig, videoReducer),
  isContact: persistReducer(ContactPerConfig, IsContactAllow),
  isNotification: persistReducer(NotificationConfig, NotificationReducer),
  isChatNotify: persistReducer(ChatNotifyConfig, ChatNotifyReducer),
  isloading: loadingReducer,
  isAlert: AlertReucer,
  getCategory: getTrainingCatReducer,
  contacts: ContactsReducer,
  modalState: ImagePrevReducer,
});

export const store = createStore(
  rootReducer,
  // combineReducers(thunk.thunk),
  applyMiddleware(thunk.thunk),
);

export const persistor = persistStore(store);
