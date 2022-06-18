import applejack from './assets/img/applejack.webp';
import twilightSparkle from './assets/img/twilightSparkle.png';
import spike from './assets/img/spike.png';
import pinkiePie from './assets/img/pinkiePie.png';
import princessCelestia from './assets/img/princessCelestia.png';
import rainbowDash from './assets/img/rainbowDash.png';
import rarity from './assets/img/rarity.png';
import princessLuna from './assets/img/princessLuna.png';
import fluttershy from './assets/img/fluttershy.png';
import { KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp } from '@material-ui/icons';
import React, { ReactElement } from 'react';

export const MAZE_API_ROOT_URL = 'https://ponychallenge.trustpilot.com/pony-challenge/maze';

export const MIN_WIDTH_HEIGHT = 15;
export const MAX_WIDTH_HEIGHT = 25;
export const MIN_DIFFICULTY = 0;
export const MAX_DIFFICULTY = 10;

export interface Pony {
    name: string;
    image: string | null;
}

export interface SideType {
    [key: string]: SideData;
}

export interface SideData {
    key: string;
    direction: string;
    icon: ReactElement;
}

export const Sides: SideType = {
    Left: {
        key: 'left',
        direction: 'west',
        icon: <KeyboardArrowLeft />,
    },
    Up: {
        key: 'up',
        direction: 'north',
        icon: <KeyboardArrowUp />,
    },
    Down: {
        key: 'down',
        direction: 'south',
        icon: <KeyboardArrowDown />,
    },
    Right: {
        key: 'right',
        direction: 'east',
        icon: <KeyboardArrowRight />,
    },
};

export const Ponies = {
    Applejack: {
        name: 'Applejack',
        image: applejack,
    },
    TwilightSparkle: {
        name: 'Twilight Sparkle',
        image: twilightSparkle,
    },
    Spike: {
        name: 'Spike',
        image: spike,
    },
    RainbowDash: {
        name: 'Rainbow Dash',
        image: rainbowDash,
    },
    PinkiePie: {
        name: 'Pinkie Pie',
        image: pinkiePie,
    },
    Fluttershy: {
        name: 'Fluttershy',
        image: fluttershy,
    },
    PrincessCelestia: {
        name: 'Princess Celestia',
        image: princessCelestia,
    },
    PrincessLuna: {
        name: 'Princess Luna',
        image: princessLuna,
    },
    Rarity: {
        name: 'Rarity',
        image: rarity,
    },
};
