import { makeStyles } from '@material-ui/styles';

export default makeStyles(() => ({
    container: {
        width: '70%',
    },

    setting: {
        display: 'flex',
        flexDirection: 'row',
        padding: '0 1em',
        alignItems: 'center',
    },

    label: {
        width: '30%',
        textAlign: 'left',
        paddingRight: '10px',
    },
}));
