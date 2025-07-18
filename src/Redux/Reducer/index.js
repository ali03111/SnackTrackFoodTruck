import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import mySaga from '../Sagas/index';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import onboardingReducer from './onboardingReducer';

// import createSagaMiddleware from 'redux-saga'; // ✅ This is correct — only if you're using the default export

// const sagaMiddleware = createSagaMiddleware();

const onBoardPersistConfig = {
  key: 'onboarding',
  storage: AsyncStorage,
  whitelist: 'onboarding',
};

// const AuthPersistConfig = {
//   key: 'Auth',
//   storage: AsyncStorage,
//   whitelist: ['userData', 'token', 'isLogin'],
// };

const reducers = {
  onboarding: persistReducer(onBoardPersistConfig, onboardingReducer),
  //   Auth: persistReducer(AuthPersistConfig, AuthReducer),
  //   isVideo: persistReducer(VideoPersistConfig, videoReducer),
  //   isContact: persistReducer(ContactPerConfig, IsContactAllow),
  //   isNotification: persistReducer(NotificationConfig, NotificationReducer),
  //   isChatNotify: persistReducer(ChatNotifyConfig, ChatNotifyReducer),
  //   isloading: loadingReducer,
  //   isAlert: AlertReucer,
  //   getCategory: getTrainingCatReducer,
  //   contacts: ContactsReducer,
  //   modalState: ImagePrevReducer,
};

export const store = createStore(
  combineReducers(reducers),
  //   applyMiddleware(sagaMiddleware),
);

export const persistor = persistStore(store);
// then run the saga
// sagaMiddleware.run(mySaga);
