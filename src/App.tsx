import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from './components/Login/Login';
import {Registration} from './components/Registration/Registration';
import {RestorePassword} from './components/RestorePassword/RestorePassword';
import {SetNewPassword} from './components/SetNewPassword/SetNewPassword';
import {TestComponents} from './components/TestComponents/TestComponents';
import {Profile} from './components/Profile/Profile';
import {useAppDispatch, useAppSelector} from './utils/hooks';
import {meRequest} from './reducers/appReducer';
import {Error404} from './components/Error404/Error404';
import {Navigation} from './components/Navigation/Navigation';
import s from './styles/app.module.css'
import {Cards} from "./components/Cards/Cards";
import {MainPage} from './components/MainPage/MainPage';
import {ThemeProvider} from "@mui/material";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import Switch from "@mui/material/Switch";
import {ProfilePacks} from './components/ProfilePacks/ProfilePacks';
import {TrainCard} from "./components/TrainCard/TrainCard";

type AppPropsType = {
    themes: object[]
}

export const App = React.memo((props: AppPropsType) => {
    const [darkMode, setDarkMode] = useState(false)

    const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
    const appInitializing = useAppSelector(state => state.app.appInitializing)

    const dispatch = useAppDispatch()

    useEffect(() => {
            dispatch(meRequest());
    }, [dispatch, isLoggedIn])

    return (
        <ThemeProvider theme={darkMode ? props.themes[1] : props.themes[0]}>
            <Paper className = {s.BgcStyle}
                   style={{backgroundImage: darkMode ? 'linear-gradient(135deg, gray 20%, black )' : 'linear-gradient(135deg, antiquewhite 20%, aquamarine)'}}>
                    {appInitializing ?
                        <Routes>
                            <Route path='*' element={<Navigate to={'/error'}/>}/>
                            <Route path='/' element={<Navigate to={'/profile'}/>}/>
                            <Route path='/login' element={<Login/>}/>
                            <Route path='/registration' element={<Registration/>}/>
                            <Route path='/profile' element={<Profile/>}/>
                            <Route path='/mainPage'>
                                <Route index={true} element={<MainPage/>}/>
                                <Route index={false} path='cards' element={<Cards/>}/>
                                <Route index={false} path='train' element={<TrainCard/>}/>
                            </Route>
                            <Route path='/error' element={<Error404/>}/>
                            <Route path='/restorePassword' element={<RestorePassword/>}/>
                            <Route path='/set-new-password/:token' element={<SetNewPassword/>}/>
                            <Route path='/test' element={<TestComponents/>}/>
                            <Route path='/mainPage' element={<MainPage/>}/>
                            <Route path='/train' element={<TrainCard/>}/>
                            <Route path='/profilePacks' element={<ProfilePacks/>}/>
                        </Routes> :
                        <LinearProgress style={{position: 'absolute'}}/>}
                <Navigation/>
                <div className={s.changeTheme}><Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)}/>Go to the dark side!</div>
            </Paper>
        </ThemeProvider>
    )
})