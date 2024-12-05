import { configureStore } from '@reduxjs/toolkit';
import counterReducer from 'redux/counter/counterSlice'
import accountReducer from 'redux/account/accountSlice'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    account: accountReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;