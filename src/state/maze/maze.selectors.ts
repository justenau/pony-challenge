import { RootState } from '../../config/store';
import { createSelector } from 'reselect';
import { SideData, Sides } from '../../consts';
import { GameStatus } from './maze.types';

export const selectMazeId = (state: RootState) => state.maze.mazeId;
export const selectPrint = (state: RootState) => state.maze.print;
export const selectWidth = (state: RootState) => state.maze.width;
export const selectHeight = (state: RootState) => state.maze.height;
export const selectData = (state: RootState) => state.maze.data;
export const selectGameStatus = (state: RootState) => state.maze.gameStatus;
export const selectMazeState = (state: RootState) => state.maze.mazeState || null;
export const selectPony = (state: RootState) => state.maze.pony;
export const selectPonyPosition = (state: RootState) => state.maze.ponyPosition;

export const selectPonyImage = createSelector(selectPony, pony => pony?.image || null);
export const selectIsGamePending = createSelector(
    selectGameStatus,
    appStatus => appStatus === GameStatus.CREATE_PENDING,
);
export const selectAllowedMoveDirections = createSelector(
    selectPonyPosition,
    selectWidth,
    selectData,
    (ponyPosition, width, data): SideData[] => {
        let directions = [];
        if (ponyPosition !== null && width && data) {
            if (data.length > ponyPosition + width && !data[ponyPosition + width].includes('north')) {
                directions.push(Sides.Down);
            }
            if (!data[ponyPosition]?.includes('north')) {
                directions.push(Sides.Up);
            }
            if (!data[ponyPosition]?.includes('west')) {
                directions.push(Sides.Left);
            }
            if (data.length > ponyPosition + 1 && !data[ponyPosition + 1]?.includes('west')) {
                directions.push(Sides.Right);
            }
        }
        return directions;
    },
);
