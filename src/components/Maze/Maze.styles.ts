import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import gameOver from '../../assets/img/gameOver.jpeg';
import gameWin from '../../assets/img/gameWin.png';

export default makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        maxWidth: 'fit-content',
        flexDirection: 'column',
        padding: '0 3em 0 0',
        [theme.breakpoints.down(theme.breakpoints.values.md)]: {
            padding: 0,
        },
    },

    mazeLost: {
        pointerEvents: 'none',
        opacity: '0.4',
        backgroundImage: 'url(' + gameOver + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    mazeWin: {
        pointerEvents: 'none',
        opacity: '0.4',
        backgroundImage: 'url(' + gameWin + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    pre: {
        marginTop: 0,
        marginBottom: 0,
        fontSize: '13px',
        '& img': {
            width: '0.8em',
            height: '0.8em',
        },
        [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
            fontSize: '7px',
        },
    },

    smallMaze: {
        fontSize: '9px',
        [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
            fontSize: '6px',
        },
    },
}));
