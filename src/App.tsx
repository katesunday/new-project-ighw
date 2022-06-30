import React, {useEffect, useState} from 'react';
import {Navigate, NavLink, Route, Routes} from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import RestorePassword from './components/RestorePassword/RestorePassword';
import SetNewPassword from './components/SetNewPassword/SetNewPassword';
import TestComponents from './components/TestComponents/TestComponents';
import {Profile} from './components/Profile/Profile';
import {useAppDispatch, useAppSelector} from './utils/hooks';
import {meRequest} from './reducers/appReducer';
import {LinearProgress, Paper, Switch, ThemeProvider} from '@mui/material';
import {Error404} from './components/Error404/Error404';
import Container from '@mui/material/Container';
import Navigation from './components/Navigation/Navigation';
import s from './styles/app.module.css'

type AppPropsType = {
    themes: object[]
}

function App(props: AppPropsType) {

    const [darkMode, setDarkMode] = useState(false)
    const appStatus = useAppSelector(state => state.app.appStatus)
    const dispatch = useAppDispatch()
    const appInitializing = useAppSelector(state => state.app.appInitializing)

    useEffect(() => {
        dispatch(meRequest())
    }, [dispatch])

    // some error: Message failed: 554 5.2.0 STOREDRV.Submission.Exception:OutboundSpamException;
    // Failed to process message due to a permanent exception with message [BeginDiagnosticData]WASCL UserAction verdict is not None.
    // Actual verdict is Suspend, ShowTierUpgrade.
    // OutboundSpamException: WASCL UserAction verdict is not None.
    // Actual verdict is Suspend, ShowTierUpgrade.[EndDiagnosticData] [Hostname=PAXP193MB1774.EURP193.PROD.OUTLOOK.COM]

    return (
        <ThemeProvider theme={darkMode ? props.themes[1] : props.themes[0]}>
            {appStatus === 'inProgress' && <LinearProgress/>}
            <Paper className = {s.BgcStyle} style={{backgroundImage: darkMode ? 'linear-gradient(135deg, gray 20%, black )' : 'linear-gradient(135deg, antiquewhite 20%, aquamarine)'}}>
                    <ol className={s.olStyle}>
                        <li><NavLink to='/login'>Login</NavLink></li>
                        <li><NavLink to='/registration'>Registration</NavLink></li>
                        <li><NavLink to='/profile'>Profile</NavLink></li>
                        <li><NavLink to='/error'>ErrorPage</NavLink></li>
                        <li><NavLink to='/restorePassword'>Restore password</NavLink></li>
                        <li><NavLink to='/test'>Testing</NavLink></li>

                    </ol>
                    {appInitializing ?
                        <Routes>
                            <Route path='*' element={<Navigate to={'/error'}/>}/>
                            <Route path='/' element={<Profile/>}/>
                            <Route path='/login' element={<Login/>}/>
                            <Route path='/registration' element={<Registration/>}/>
                            <Route path='/profile' element={<Profile/>}/>
                            <Route path='/error' element={<Error404/>}/>
                            <Route path='/restorePassword' element={<RestorePassword/>}/>
                            <Route path='/set-new-password/:token' element={<SetNewPassword/>}/>
                            <Route path='/test' element={<TestComponents/>}/>
                        </Routes> :
                        <LinearProgress style={{position: 'absolute'}}/>}
                <Navigation/>
                <div className={s.changeTheme}><Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)}/>Go to the dark side!</div>
            </Paper>
        </ThemeProvider>
    )
}

export default App;
