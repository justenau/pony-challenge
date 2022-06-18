import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import mazeReducer from '../state/maze/mazeSlice';

export const store = configureStore({
    reducer: {
        maze: mazeReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
