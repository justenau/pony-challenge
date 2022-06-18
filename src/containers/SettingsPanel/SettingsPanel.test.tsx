import * as hooks from '../../config/hooks';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockStore } from '../../utils/maze.utils';
import { GameStatus, MazeState } from '../../state/maze/maze.types';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import * as mazeActions from '../../state/maze/mazeSlice';
import { initialState } from '../../state/maze/maze.consts';
import { SettingsPanel } from './SettingsPanel';
import { Ponies } from '../../consts';

describe('Test SettingsPanel container', () => {
    it('should dispatch on pony change', () => {
        const dispatchMock = jest.fn();
        const setPonySpy = jest.spyOn(mazeActions, 'setPony');
        jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(dispatchMock);

        render(
            <Provider store={mockStore()}>
                <ThemeProvider theme={createMuiTheme()}>
                    <SettingsPanel />
                </ThemeProvider>
            </Provider>,
        );
        fireEvent.click(
            screen
                .queryAllByRole('radio')
                .find(pony => (pony as HTMLInputElement).value === Ponies.Fluttershy.name) as HTMLElement,
        );

        expect(dispatchMock).toHaveBeenCalled();
        expect(setPonySpy).toHaveBeenCalled();
    });

    it.each([MazeState.ACTIVE, MazeState.LOST, MazeState.WON])(
        'should dispatch restart on button click when game is not initializing',
        mazeState => {
            const dispatchMock = jest.fn();
            const restartSpy = jest.spyOn(mazeActions, 'restart');
            jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(dispatchMock);

            render(
                <Provider
                    store={mockStore({
                        ...initialState,
                        pony: Ponies.Fluttershy,
                        mazeState: mazeState,
                        gameStatus: GameStatus.CREATE_RESOLVED,
                    })}
                >
                    <ThemeProvider theme={createMuiTheme()}>
                        <SettingsPanel />
                    </ThemeProvider>
                </Provider>,
            );
            fireEvent.click(screen.getByText('RESTART THE GAME'));

            expect(dispatchMock).toHaveBeenCalled();
            expect(restartSpy).toHaveBeenCalled();
        },
    );

    it('should dispatch maze creation on button click when game is initializing', () => {
        const dispatchMock = jest.fn();
        const createMazeSpy = jest.spyOn(mazeActions, 'createMazeAsync');
        jest.spyOn(hooks, 'useAppDispatch').mockReturnValue(dispatchMock);

        render(
            <Provider store={mockStore({ ...initialState, pony: Ponies.Applejack })}>
                <ThemeProvider theme={createMuiTheme()}>
                    <SettingsPanel />
                </ThemeProvider>
            </Provider>,
        );
        fireEvent.click(screen.getByText('START THE GAME'));

        expect(dispatchMock).toHaveBeenCalled();
        expect(createMazeSpy).toHaveBeenCalled();
    });
});
