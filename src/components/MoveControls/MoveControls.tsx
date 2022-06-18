import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Sides } from '../../consts';
import { MoveControlsProps } from './MoveControls.types';

export const MoveControls: React.FC<MoveControlsProps> = ({ allowedMoveDirections, handleClick }) => (
    <div>
        {Object.values(Sides).map(side => (
            <IconButton
                data-testid={side.direction}
                key={side.direction}
                disabled={!allowedMoveDirections.includes(side)}
                onClick={() => handleClick(side)}
            >
                {side.icon}
            </IconButton>
        ))}
    </div>
);
