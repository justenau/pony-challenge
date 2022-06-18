import * as hooks from '../../config/hooks';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockStore } from '../../utils/maze.utils';
import { GameStatus, MazeState } from '../../state/maze/maze.types';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import * as mazeActions from '../../state/maze/mazeSlice';
import { MazeGame } from './MazeGame';
import { initialState } from '../../state/maze/maze.consts';

describe('Test MazeGame container', () => {
    it.each([
        [null, MazeState.ACTIVE, null, 1, 1, 0],
        ['++-+-', MazeState.ACTIVE, GameStatus.MOVE_RESOLVED, 2, 1, 1],
        [null, MazeState.INITIALIZING, null, 0, 0, 0],
        ['++-+-', MazeState.ACTIVE, GameStatus.MOVE_PENDING, 0, 0, 0],
    ])(
        'should only dispatch when print is not ready or next move was made',
        (print, mazeState, gameStatus, dispatchCalls, printCalls,getCalls) => {
            const dispatchMock = jest.fn();
            const printSpy = jest.spyOn(mazeActions, 'printMazeAsync');
            const getSpy = jest.spyOn(mazeActions, 'getCurrentMazeAsync');
            jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(dispatchMock);

            render(
                <Provider
                    store={mockStore({ ...initialState, print: print, mazeState: mazeState, gameStatus: gameStatus })}
                >
                    <ThemeProvider theme={createMuiTheme()}>
                        <MazeGame />
                    </ThemeProvider>
                </Provider>,
            );

            expect(dispatchMock).toHaveBeenCalledTimes(dispatchCalls);
            expect(printSpy).toHaveBeenCalledTimes(printCalls);
            expect(getSpy).toHaveBeenCalledTimes(getCalls);
        },
    );
});
