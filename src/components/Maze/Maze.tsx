import React from 'react';
import { getMazeUpdatedWithPictures } from '../../utils/maze.utils';
import useStyles from './Maze.styles';
import cn from 'clsx';
import { MazeProps } from './Maze.types';
import { MazeState } from '../../state/maze/maze.types';

export const Maze: React.FC<MazeProps> = ({ print, mazeState, ponyImage, width, height }) => {
    const classes = useStyles();
    const lines = print?.split('\n') || [];

    return (
        <div className={classes.root}>
            <div
                className={cn(
                    { [classes.mazeLost]: mazeState === MazeState.LOST },
                    { [classes.mazeWin]: mazeState === MazeState.WON },
                )}
            >
                {width &&
                    height &&
                    lines.map((line, index) => (
                        <pre
                            key={index}
                            className={cn(classes.pre, { [classes.smallMaze]: width >= 21 || height >= 21 })}
                        >
                            {getMazeUpdatedWithPictures(line, ponyImage)}
                        </pre>
                    ))}
            </div>
        </div>
    );
};
