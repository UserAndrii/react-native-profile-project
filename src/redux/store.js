import { configureStore } from '@reduxjs/toolkit';
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import { userReducer, postReducer } from './slice';

// const persistConfig = {
//   key: 'firebase',
//   storage: AsyncStorage,
// };

// const reducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },

  //   middleware: getDefaultMiddleware =>
  //     getDefaultMiddleware({
  //       serializableCheck: {
  //         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //       },
  //     }),
});

// const persistor = persistStore(store);
