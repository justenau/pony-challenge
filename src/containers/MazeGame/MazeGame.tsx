import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../config/hooks';
import { getCurrentMazeAsync, makeMoveInMazeAsync, printMazeAsync } from '../../state/maze/mazeSlice';
import { SideData, Sides } from '../../consts';
import { Maze } from '../../components/Maze/Maze';
import { SettingsPanel } from '../SettingsPanel/SettingsPanel';
import { MoveControls } from '../../components/MoveControls/MoveControls';
import useStyles from './MazeGame.styles';
import {
    selectAllowedMoveDirections,
    selectGameStatus,
    selectMazeState,
    selectHeight,
    selectPonyImage,
    selectPrint,
    selectWidth,
} from '../../state/maze/maze.selectors';
import { GameStatus, MazeState } from '../../state/maze/maze.types';

export const MazeGame: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const print = useAppSelector(selectPrint);
    const mazeState = useAppSelector(selectMazeState);
    const allowedMoveDirections = useAppSelector(selectAllowedMoveDirections);
    const appStatus = useAppSelector(selectGameStatus);
    const ponyImage = useAppSelector(selectPonyImage);
    const width = useAppSelector(selectWidth);
    const height = useAppSelector(selectHeight);

    const isMazeActive = mazeState === MazeState.ACTIVE;

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    useEffect(() => {
        if ((!print && mazeState === MazeState.ACTIVE) || appStatus === GameStatus.MOVE_RESOLVED) {
            dispatch(printMazeAsync());
            if (appStatus === GameStatus.MOVE_RESOLVED) {
                dispatch(getCurrentMazeAsync());
            }
        }
    }, [mazeState, appStatus]);

    const handleKeyDown = (event: any) => {
        const keyCode = event.code.replace('Arrow', '');
        const side = Sides[keyCode];
        if (side && allowedMoveDirections.includes(side)) {
            dispatch(makeMoveInMazeAsync(side.direction));
        }
    };

    const handleOnMoveClick = (direction: SideData) => {
        if (allowedMoveDirections.includes(direction)) {
            dispatch(makeMoveInMazeAsync(direction.direction));
        }
    };

    return (
        <div>
            <div className={classes.container}>
                <div className={classes.section}>
                    <SettingsPanel />
                    {isMazeActive && print && (
                        <MoveControls allowedMoveDirections={allowedMoveDirections} handleClick={handleOnMoveClick} />
                    )}
                </div>
                <Maze height={height} mazeState={mazeState} ponyImage={ponyImage} print={print} width={width} />
            </div>
        </div>
    );
};
