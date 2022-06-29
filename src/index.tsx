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
        primary: {
            main: '#f50057',
            contrastText: '#090606',
        },
        secondary: {
            main: '#f50057',
            contrastText: '#000000',
        },
        mode: "dark",
    },
})

const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#249d39',
            contrastText: '#fff',
        },
        secondary: {
            main: '#00bcd4',
            contrastText: '#fff',
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
          <Provider store={store} ><App themes={themes}/></Provider>
    </HashRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

