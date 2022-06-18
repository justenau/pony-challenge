import { MazeGameState, MazeState } from './maze.types';

export const initialState: MazeGameState = {
    ponyPosition: null,
    domokunPosition: null,
    endpoint: null,
    width: null,
    height: null,
    difficulty: null,
    data: null,
    mazeId: '',
    mazeState: MazeState.INITIALIZING,
    print: null,
    pony: null,
    gameStatus: null,
};
