import { Ponies } from '../../consts';
import { Maze } from './Maze';
import { MazeState } from '../../state/maze/maze.types';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import { render, screen } from '@testing-library/react';

describe('Test Maze component', () => {
    it.each([
        [21, 15, true],
        [15, 21, true],
        [22, 21, true],
        [20, 20, false],
    ])('should apply small maze class only when maze width or height is 21 or more', (width, height, expected) => {
        const mazePrint = '+--+-||';

        render(
            <ThemeProvider theme={createMuiTheme()}>
                <Maze
                    ponyImage={Ponies.PinkiePie.image}
                    width={width}
                    height={height}
                    print={mazePrint}
                    mazeState={MazeState.ACTIVE}
                />
            </ThemeProvider>,
        );

        expect(screen.getByText(mazePrint).className.includes('smallMaze')).toBe(expected);
    });
});
