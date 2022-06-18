import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './config/store';
import './index.css';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import responsiveFontSizes from '@material-ui/core/styles/responsiveFontSizes';
import { ThemeProvider } from '@material-ui/styles';
import { MazeGame } from './containers/MazeGame/MazeGame';

const container = document.getElementById('root')!;
const root = createRoot(container);

export const theme = responsiveFontSizes(
    createMuiTheme({
        typography: {
            fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Helvetica Neue"', 'Arial'].join(','),
        },
    }),
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <header />
                <MazeGame />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
);
