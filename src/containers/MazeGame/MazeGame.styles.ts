import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: '100vh',
        [theme.breakpoints.down(theme.breakpoints.values.md)]: {
            flexDirection: 'column',
            maxWidth: 'auto',
            height: 'auto',
            padding: '20px 0',
        },
    },

    section: {
        display: 'flex',
        flexDirection: 'column',
    },

    alert: {
        marginBottom: '3em',
    },
}));
