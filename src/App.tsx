import React, {useCallback, useEffect} from 'react';
import {Navigate, NavLink} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import ErrorPage from './components/ErrorPage';
import RestorePassword from './components/RestorePassword';
import SetNewPassword from './components/SetNewPassword';
import TestComponents from './components/TestComponents';
import {Profile} from './components/Profile/Profile';
import {useAppDispatch, useAppSelector} from './utils/hooks';
import {meRequest} from './reducers/appReducer';
import {LinearProgress} from '@mui/material';

function App() {
    const dispatch = useAppDispatch()
    const {appInitializing, isLoggedIn} = useAppSelector(state => state.app)

    useEffect(() => {
        dispatch(meRequest())
    }, [dispatch])


    return (
        <div className="App">
            <div>
                <ol>
                    <li><NavLink to='/login'>Login</NavLink></li>
                    <li><NavLink to='/registration'>Registration</NavLink></li>
                    <li><NavLink to='/profile'>Profile</NavLink></li>
                    <li><NavLink to='/error'>ErrorPage</NavLink></li>
                    <li><NavLink to='/restorePassword'>Restore password</NavLink></li>
                    <li><NavLink to='/set-new-password'>Enter new password</NavLink></li>
                    <li><NavLink to='/test'>Testing</NavLink></li>
                </ol>

                <div>
                    {appInitializing ? <Routes>
                        <Route path='/' element={<Profile/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/registration' element={<Registration/>}/>
                        <Route path='/profile' element={<Profile/>}/>
                        <Route path='/error' element={<ErrorPage/>}/>
                        <Route path='/restorePassword' element={<RestorePassword/>}/>
                        <Route path='/set-new-password/:token' element={<SetNewPassword/>}/>
                        <Route path='/test' element={<TestComponents/>}/>
                    </Routes> : <LinearProgress/>}
                </div>
            </div>
        </div>
    );
}

export default App;
