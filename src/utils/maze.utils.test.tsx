import { Ponies } from '../consts';
import { mapGetCurrentMazeToState, getMazeUpdatedWithPictures } from './maze.utils';
import { mockAxiosResponse, mockMapResponse } from './maze.test.data';
import domokun from '../assets/img/domokun.png';
import exit from '../assets/img/exit.png';
import React from 'react';

describe('Maze utils', () => {
    it('should map maze state', () => {
        expect(mapGetCurrentMazeToState(mockAxiosResponse)).toEqual(mockMapResponse);
    });

    it('should update maze print with pictures', () => {
        const print = '+---|P+--D-+||+-E';
        const ponyImage = Ponies.Applejack.image;
        const actual = getMazeUpdatedWithPictures(print, ponyImage);
        expect(actual).toEqual([
            '+---|',
            <img src={ponyImage} alt='pony' />,
            '+--',
            <img src={domokun} alt='domokun' />,
            '-+||+-',
            <img src={exit} alt='exit' />,
            '',
        ]);
    });
});
