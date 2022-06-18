import { Omit } from '@reduxjs/toolkit/dist/tsHelpers';
import { MazeGameState } from '../state/maze/maze.types';
import reactStringReplace from 'react-string-replace';
import domokun from '../assets/img/domokun.png';
import exit from '../assets/img/exit.png';
import thunk from 'redux-thunk';

import React from 'react';
import { initialState } from '../state/maze/maze.consts';
import configureMockStore from 'redux-mock-store';

export const mapGetCurrentMazeToState = (
    data: any,
): Omit<MazeGameState, 'value' | 'gameStatus' | 'print' | 'pony'> => ({
    ponyPosition: data['pony'][0],
    domokunPosition: data['domokun'][0],
    endpoint: data['end-point'][0],
    width: data['size'][0],
    height: data['size'][1],
    difficulty: data['difficulty'],
    data: data['data'],
    mazeId: data['maze_id'],
    mazeState: data['game-state']['state'].toLowerCase(),
});

export const getMazeUpdatedWithPictures = (line: string, ponyImage: any) => {
    const rez = reactStringReplace(line, 'P', () => <img src={ponyImage} alt='pony' />);
    const rez2 = reactStringReplace(rez, 'D', () => <img src={domokun} alt='domokun' />);
    return reactStringReplace(rez2, 'E', () => <img src={exit} alt='exit' />);
};

export const mockStore = (state = initialState) => configureMockStore([thunk])({ maze: state });
