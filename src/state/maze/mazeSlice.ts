import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../config/store';
import { createMaze, getCurrentMaze, makeMoveInMaze, printMaze } from './mazeAPI';
import { GameStatus, CreateMazeInput, MazeState, ActionType } from './maze.types';
import { Pony } from '../../consts';
import { initialState } from './maze.consts';
import { selectMazeId } from './maze.selectors';

export const createMazeAsync = createAsyncThunk(ActionType.createMaze, async (createMazeInput: CreateMazeInput) => {
    return await createMaze(createMazeInput);
});

export const printMazeAsync = createAsyncThunk<string, void, { state: RootState }>(
    ActionType.printMaze,
    async (_, { getState }) => {
        const mazeId = selectMazeId(getState());
        return await printMaze(mazeId);
    },
);

export const getCurrentMazeAsync = createAsyncThunk<object, string | undefined, { state: RootState }>(
    ActionType.getCurrentMazeState,
    async (id, { getState }) => {
        const mazeId = id || selectMazeId(getState());
        return await getCurrentMaze(mazeId);
    },
);

export const makeMoveInMazeAsync = createAsyncThunk<MazeState, string, { state: RootState }>(
    ActionType.makeMoveInMaze,
    async (direction: string, { getState }) => {
        const mazeId = selectMazeId(getState());
        return await makeMoveInMaze(mazeId, direction);
    },
);

export const mazeSlice = createSlice({
    name: 'maze',
    initialState,
    reducers: {
        setPony: (state, action: PayloadAction<Pony>) => {
            state.pony = action.payload;
        },
        restart: state => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(createMazeAsync.pending, state => {
                state.gameStatus = GameStatus.CREATE_PENDING;
            })
            .addCase(createMazeAsync.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
                state.gameStatus = GameStatus.CREATE_RESOLVED;
            })
            .addCase(createMazeAsync.rejected, state => {
                state.gameStatus = GameStatus.ERROR;
            })
            .addCase(getCurrentMazeAsync.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
            })
            .addCase(getCurrentMazeAsync.rejected, state => {
                state.gameStatus = GameStatus.ERROR;
            })
            .addCase(printMazeAsync.fulfilled, (state, action) => {
                state.print = action.payload;
            })
            .addCase(printMazeAsync.rejected, state => {
                state.gameStatus = GameStatus.ERROR;
            })
            .addCase(makeMoveInMazeAsync.pending, state => {
                state.gameStatus = GameStatus.MOVE_PENDING;
            })
            .addCase(makeMoveInMazeAsync.fulfilled, (state, action) => {
                state.gameStatus = GameStatus.MOVE_RESOLVED;
                state.mazeState = action.payload;
            })
            .addCase(makeMoveInMazeAsync.rejected, state => {
                state.gameStatus = GameStatus.ERROR;
            });
    },
});

export const { setPony, restart } = mazeSlice.actions;

export default mazeSlice.reducer;
