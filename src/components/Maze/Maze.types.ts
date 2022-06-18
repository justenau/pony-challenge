import { MazeState } from '../../state/maze/maze.types';

export interface MazeProps {
    print: string | null;
    mazeState: MazeState | null;
    ponyImage: string | null;
    width: number | null;
    height: number | null;
}
