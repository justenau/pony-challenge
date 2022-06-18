import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../config/hooks';
import { MAX_DIFFICULTY, MAX_WIDTH_HEIGHT, MIN_DIFFICULTY, MIN_WIDTH_HEIGHT, Ponies } from '../../consts';
import { SettingsSlider } from '../../components/SettingsSlider/SettingsSlider';
import { createMazeAsync, restart, setPony } from '../../state/maze/mazeSlice';
import { PonySelection } from '../../components/PonySelection/PonySelection';
import { Button } from '@material-ui/core';
import useStyles from './SettingsPanel.styles';
import { selectIsGamePending, selectMazeState, selectPony } from '../../state/maze/maze.selectors';
import { MazeState } from '../../state/maze/maze.types';

export const SettingsPanel: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const classes = useStyles();

    const pony = useAppSelector(selectPony);
    const mazeState = useAppSelector(selectMazeState);
    const isMazeInitializing = mazeState === MazeState.INITIALIZING;
    const isGamePending = useAppSelector(selectIsGamePending);

    const [width, setWidth] = useState(MIN_WIDTH_HEIGHT);
    const [height, setHeight] = useState(MIN_WIDTH_HEIGHT);
    const [difficulty, setDifficulty] = useState(MIN_DIFFICULTY);

    useEffect(() => {
        if (isMazeInitializing) {
            setWidth(MIN_WIDTH_HEIGHT);
            setHeight(MIN_WIDTH_HEIGHT);
            setDifficulty(MIN_DIFFICULTY);
        }
    }, [isMazeInitializing]);

    const handleHeightChange = (event: any, newValue: any) => {
        setHeight(newValue);
    };

    const handleWidthChange = (event: any, newValue: any) => {
        setWidth(newValue);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPony(Ponies[event.target.value.replace(' ', '') as keyof typeof Ponies]));
    };

    const handleDifficultyChange = (event: any, newValue: any) => {
        setDifficulty(newValue);
    };

    const handleButtonSlick = () =>
        dispatch(
            !isMazeInitializing
                ? restart()
                : createMazeAsync({
                      height,
                      width,
                      difficulty,
                      mazePlayerName: pony?.name || '',
                  }),
        );

    return (
        <div className={classes.container}>
            <div style={!isMazeInitializing ? { pointerEvents: 'none', opacity: '0.4' } : {}}>
                <div className={classes.settingsContainer}>
                    <SettingsSlider
                        setting='Width'
                        value={width}
                        handleChange={handleWidthChange}
                        max={MAX_WIDTH_HEIGHT}
                        min={MIN_WIDTH_HEIGHT}
                    />
                    <SettingsSlider
                        setting='Height'
                        value={height}
                        handleChange={handleHeightChange}
                        max={MAX_WIDTH_HEIGHT}
                        min={MIN_WIDTH_HEIGHT}
                    />
                    <SettingsSlider
                        setting='Difficulty'
                        value={difficulty}
                        handleChange={handleDifficultyChange}
                        max={MAX_DIFFICULTY}
                        min={MIN_DIFFICULTY}
                    />
                </div>
                <div className={classes.settingsContainer}>
                    <PonySelection handleChange={handleNameChange} selected={pony?.name} />
                </div>
            </div>
            <div className={classes.buttonContainer}>
                <Button
                    variant='outlined'
                    onClick={handleButtonSlick}
                    className={classes.button}
                    disabled={!pony || isGamePending}
                >
                    {!isMazeInitializing ? 'RE' : ''}START THE GAME
                </Button>
            </div>
        </div>
    );
};
