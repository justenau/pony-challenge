import { makeStyles } from '@material-ui/styles';

export default makeStyles(() => ({
    image: {
        height: '3em',
        width: '3em',
        opacity: '40%',
    },

    imageChecked: {
        height: '3em',
        width: '3em',
        opacity: '100%',
    },

    ponies: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
    },

    pony: {
        flexBasis: '33.333333%',
    },
}));
