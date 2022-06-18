import axios from 'axios';
import { createMaze, getCurrentMaze, makeMoveInMaze, printMaze } from './mazeAPI';
import { mockAxiosGameStateResponse, mockAxiosResponse, mockMapResponse, mockMazeId } from '../../utils/maze.test.data';
import { MazeState } from './maze.types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Maze API', () => {
    it('should create and fetch maze on createMaze call', async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: { 'maze-id': mockMazeId } });
        mockedAxios.get.mockResolvedValueOnce({ data: mockAxiosResponse });
        const result = await createMaze({ width: 10, height: 10, mazePlayerName: 'test', difficulty: 5 });
        expect(result).toEqual(mockMapResponse);
    });

    it('should return current maze on getCurrentMaze call', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockAxiosResponse });
        const result = await getCurrentMaze(mockMazeId);
        expect(result).toEqual(mockMapResponse);
    });

    it('should return print of maze on printMaze call', async () => {
        const response = '+--|';
        mockedAxios.get.mockResolvedValueOnce({ data: response });
        const result = await printMaze(mockMazeId);
        expect(result).toEqual(response);
    });

    it('should make a move on maze on makeMoveInMaze call', async () => {
        mockedAxios.post.mockResolvedValueOnce({ data: mockAxiosGameStateResponse['game-state'] });
        const result = await makeMoveInMaze(mockMazeId, 'north');
        expect(result).toEqual(MazeState.ACTIVE);
    });
});
