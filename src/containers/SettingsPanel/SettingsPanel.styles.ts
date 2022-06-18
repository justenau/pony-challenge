import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0 3em',
        maxWidth: '60vh',
        [theme.breakpoints.down(theme.breakpoints.values.md)]: {
            padding: '0 1em',
        },
    },
    settingsContainer: {
        display: 'flex',
        flexDirection: 'column',
    },

    button: {
        width: '100%',
    },
    buttonContainer: {
        margin: '2em 0 1em 0',
        width: '100%',
    },
}));
