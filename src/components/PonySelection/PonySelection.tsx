import React from 'react';
import { Radio } from '@material-ui/core';
import { Ponies } from '../../consts';
import useStyles from './PonySelection.styles';
import { PonySelectionProps } from './PonySelection.types';

export const PonySelection: React.FC<PonySelectionProps> = ({ handleChange, selected }) => {
    const classes = useStyles();

    return (
        <div className={classes.ponies}>
            {Object.keys(Ponies).map(pony => (
                <div key={Ponies[pony].name} className={classes.pony}>
                    <Radio
                        checked={selected === Ponies[pony].name}
                        onChange={handleChange}
                        icon={<img className={classes.image} src={Ponies[pony].image} alt='pony' />}
                        checkedIcon={<img className={classes.imageChecked} src={Ponies[pony].image} alt='pony' />}
                        value={Ponies[pony].name}
                    />
                </div>
            ))}
        </div>
    );
};
