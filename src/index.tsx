import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {createTheme} from '@mui/material';


const darkTheme = createTheme({
    palette: {
        text: {
            primary: '#fff',
            secondary: '#f50057',
        },
        primary: {
            main: '#f50057',
            contrastText: '#000',
            dark: 'white',
        },
        secondary: {
            main: '#54e183',
            contrastText: '#000',
            dark: 'white',
        },
        error: {
            main: '#f50057',
            contrastText: '#000',
            dark: 'white',
        },
        mode: "dark",
    },
})

const lightTheme = createTheme({
    palette: {
        text: {
            primary: '#000',
            secondary: '#54e183',
        },
        primary: {
            main: '#54e183',
            contrastText: '#fff',
            dark: 'black',
        },
        secondary: {
            main: '#54e183',
            contrastText: '#fff',
            dark: 'black',
        },
        error: {
            main: '#f60606',
            contrastText: '#fff',
            dark: 'black',
        },
        mode: "light"
    }
})

const themes = [lightTheme, darkTheme]

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <HashRouter>
        <Provider store={store}>
            <App themes={themes}/>
        </Provider>
    </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

