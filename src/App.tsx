import React from 'react';
import {NavLink} from 'react-router-dom';
import {Routes , Route} from 'react-router-dom';
import './App.css';
import Login from "./components/Login";
import Registration from "./components/Registration/Registration";
import ErrorPage from "./components/ErrorPage";
import RestorePassword from "./components/RestorePassword";
import SetNewPassword from "./components/SetNewPassword";
import TestComponents from "./components/TestComponents";
import {Profile} from "./components/Profile/Profile";

function App() {
    return (
        <div className="App">
            <div>
                <ol>
                    <li><NavLink to='/login'>Login</NavLink></li>
                    <li><NavLink to='/registration'>Registration</NavLink></li>
                    <li><NavLink to='/profile'>Profile</NavLink></li>
                    <li><NavLink to='/error'>ErrorPage</NavLink></li>
                    <li><NavLink to='/restorePassword'>Restore password</NavLink></li>
                    <li><NavLink to='/enterNewPassword'>Enter new password</NavLink></li>
                    <li><NavLink to='/test'>Testing</NavLink></li>
                </ol>


            </div>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/registration' element={<Registration/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/error' element={<ErrorPage/>}/>
                <Route path='/restorePassword' element={<RestorePassword/>}/>
                <Route path='/enterNewPassword' element={<SetNewPassword/>}/>
                <Route path='/test' element={<TestComponents/>}/>
            </Routes>
        </div>
    );
}

export default App;
