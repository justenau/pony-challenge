import React from 'react';
import { Slider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useStyles from './SettingsSlider.styles';
import { SettingsSliderProps } from './SettingSlider.types';

export const SettingsSlider: React.FC<SettingsSliderProps> = ({ setting, min, max, value, handleChange }) => {
    const classes = useStyles();

    return (
        <div className={classes.setting}>
            <Typography className={classes.label} variant={'body2'}>
                {setting}
            </Typography>
            <Slider
                value={value}
                onChange={handleChange}
                marks={[{ value: min }, { value: max }]}
                step={1}
                valueLabelDisplay='auto'
                min={min}
                max={max}
            />
        </div>
    );
};
