import { MazeState } from '../state/maze/maze.types';

export const mockMazeId = '1-2-3-abc';

export const mockAxiosGameStateResponse = {
    'game-state': {
        state: 'Active',
        'state-result': 'Successfully created',
    },
};
export const mockAxiosResponse = {
    pony: [65],
    domokun: [70],
    'end-point': [218],
    size: [15, 15],
    difficulty: 0,
    data: [['west', 'north'], ['north']],
    maze_id: mockMazeId,
    ...mockAxiosGameStateResponse,
};

export const mockMapResponse = {
    ponyPosition: 65,
    domokunPosition: 70,
    endpoint: 218,
    width: 15,
    height: 15,
    difficulty: 0,
    data: [['west', 'north'], ['north']],
    mazeId: mockMazeId,
    mazeState: MazeState.ACTIVE,
};
