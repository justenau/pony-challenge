import mazeReducer, {
    createMazeAsync,
    getCurrentMazeAsync,
    makeMoveInMazeAsync,
    printMazeAsync,
    restart,
    setPony,
} from './mazeSlice';
import { initialState } from './maze.consts';
import { Ponies } from '../../consts';
import { ActionType, GameStatus } from './maze.types';
import { mockMapResponse } from '../../utils/maze.test.data';
import {
    selectData,
    selectGameStatus,
    selectHeight,
    selectMazeId,
    selectMazeState,
    selectPony,
    selectPonyPosition,
    selectPrint,
    selectWidth,
} from './maze.selectors';

describe('Maze reducer', () => {
    const fulfilledAction = (action: string, result: any) => {
        return {
            type: action + '/fulfilled',
            payload: result,
        };
    };

    it('should handle initial state', () => {
        expect(mazeReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should set to initial state on restart', () => {
        const state = { ...initialState, width: 10, height: 20, ponyPosition: 123 };
        const actual = mazeReducer(state, restart());
        expect(actual).toEqual(initialState);
    });

    it('should set pony', () => {
        const setPonyPayload = Ponies.Applejack;
        const actual = mazeReducer(initialState, setPony(setPonyPayload));
        expect(selectPony({ maze: actual })).toEqual(setPonyPayload);
    });

    it('should set status to pending when maze creation is pending', () => {
        const actual = mazeReducer(initialState, createMazeAsync.pending);
        expect(selectGameStatus({ maze: actual })).toEqual(GameStatus.CREATE_PENDING);
    });

    it('should set status to error when maze creation is rejected', () => {
        const actual = mazeReducer(initialState, createMazeAsync.rejected);
        expect(selectGameStatus({ maze: actual })).toEqual(GameStatus.ERROR);
    });

    it('should set state when maze creation fulfilled', () => {
        const actual = mazeReducer(initialState, fulfilledAction(ActionType.createMaze, mockMapResponse));
        const state = { maze: actual };
        expect(selectWidth(state)).toEqual(mockMapResponse.width);
        expect(selectHeight(state)).toEqual(mockMapResponse.height);
        expect(selectMazeState(state)).toEqual(mockMapResponse.mazeState);
        expect(selectData(state)).toEqual(mockMapResponse.data);
        expect(selectPonyPosition(state)).toEqual(mockMapResponse.ponyPosition);
        expect(selectMazeId(state)).toEqual(mockMapResponse.mazeId);
        expect(selectGameStatus(state)).toEqual(GameStatus.CREATE_RESOLVED);
    });

    it('should set status to error when fetching maze print rejected', () => {
        const actual = mazeReducer(initialState, printMazeAsync.rejected);
        expect(selectGameStatus({ maze: actual })).toEqual(GameStatus.ERROR);
    });

    it('should set state when fetching maze print fulfilled', () => {
        const response = '-+-+-||+-';
        const actual = mazeReducer(initialState, fulfilledAction(ActionType.printMaze, response));
        expect(selectPrint({ maze: actual })).toEqual(response);
    });

    it('should set status to error when getting current maze state rejected', () => {
        const actual = mazeReducer(initialState, getCurrentMazeAsync.rejected);
        expect(selectGameStatus({ maze: actual })).toEqual(GameStatus.ERROR);
    });

    it('should set state when getting current maze fulfilled', () => {
        const actual = mazeReducer(initialState, fulfilledAction(ActionType.getCurrentMazeState, mockMapResponse));
        expect(actual).toEqual({ ...initialState, ...mockMapResponse });
    });

    it('should set status to pending when make move in maze pending', () => {
        const actual = mazeReducer(initialState, makeMoveInMazeAsync.pending);
        expect(selectGameStatus({ maze: actual })).toEqual(GameStatus.MOVE_PENDING);
    });

    it('should set status to error when make move in maze rejected', () => {
        const actual = mazeReducer(initialState, makeMoveInMazeAsync.rejected);
        expect(selectGameStatus({ maze: actual })).toEqual(GameStatus.ERROR);
    });

    it('should set state when make move in maze fulfilled', () => {
        const response = GameStatus.MOVE_RESOLVED;
        const actual = mazeReducer(initialState, fulfilledAction(ActionType.makeMoveInMaze, response));
        expect(selectGameStatus({ maze: actual })).toEqual(response);
    });
});
