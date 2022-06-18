import { CreateMazeInput, MazeState } from './maze.types';
import axios from 'axios';
import { MAZE_API_ROOT_URL } from '../../consts';
import { mapGetCurrentMazeToState } from '../../utils/maze.utils';

export const createMaze = (createMazeInput: CreateMazeInput) => {
    const { width, height, mazePlayerName, difficulty } = createMazeInput;
    return axios
        .post(MAZE_API_ROOT_URL, {
            'maze-width': width,
            'maze-height': height,
            'maze-player-name': mazePlayerName,
            difficulty,
        })
        .then(response => getCurrentMaze(response.data['maze_id']));
};

export const getCurrentMaze = (mazeId: string) =>
    axios.get(`${MAZE_API_ROOT_URL}/${mazeId}`).then(response => mapGetCurrentMazeToState(response.data));

export const printMaze = (mazeId: string) =>
    axios.get(`${MAZE_API_ROOT_URL}/${mazeId}/print`).then(response => response.data);

export const makeMoveInMaze = (mazeId: string, direction: string) => {
    return axios
        .post<MazeState>(`${MAZE_API_ROOT_URL}/${mazeId}`, { direction })
        .then(response => response.data['state'].toLowerCase());
};
