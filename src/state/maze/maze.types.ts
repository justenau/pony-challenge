import { Pony } from '../../consts';

export enum ActionType {
    createMaze = 'maze/createMaze',
    printMaze = 'maze/printMaze',
    getCurrentMazeState = 'maze/getCurrentMazeState',
    makeMoveInMaze = 'maze/makeMoveInMaze',
}

export enum MazeState {
    ACTIVE = 'active',
    WON = 'won',
    LOST = 'over',
    INITIALIZING = 'initializing',
}

export interface MazeGameState {
    ponyPosition: number | null;
    domokunPosition: number | null;
    endpoint: number | null;
    width: number | null;
    height: number | null;
    difficulty: number | null;
    data: any;
    mazeId: string;
    mazeState: MazeState | null;
    pony: Pony | null;
    print: string | null;
    gameStatus: GameStatus | null;
}

export interface CreateMazeInput {
    width: number;
    height: number;
    mazePlayerName: string;
    difficulty: number;
}

export enum GameStatus {
    MOVE_PENDING,
    MOVE_RESOLVED,
    ERROR,
    CREATE_PENDING,
    CREATE_RESOLVED,
}
