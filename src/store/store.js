import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../reducers/authReducer';
import { settingReducer } from '../reducers/settingReducer';
import { coinReducer } from '../reducers/coinReducer';
import { websocketReducer } from '../reducers/websocketReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    setting: settingReducer,
    coin: coinReducer,
    ws: websocketReducer
  },
});
