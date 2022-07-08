import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { rootReducer, RootState } from './reducers/rootReducer';

const store = configureStore({ reducer: rootReducer });

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
