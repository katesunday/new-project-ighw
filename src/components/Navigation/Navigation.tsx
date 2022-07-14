import React , {useCallback , useState} from 'react';
import s from './Navigation.module.css'
import {NavLink} from "react-router-dom";
import FaceIcon from '@mui/icons-material/Face';
import ListIcon from '@mui/icons-material/List';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import { logout } from '../../reducers/profileReducers';
import { useAppDispatch } from '../../utils/hooks';
import {setTypeOfPacks} from '../../reducers/packListsReducer';

export const Navigation = React.memo(() => {
    const dispatch = useAppDispatch()
    const [state , setState] = useState(false)

    const rerender = useCallback(() => {
        setState(!state)
    } , [state])

    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    const packListHandler = useCallback(() => {
        dispatch(setTypeOfPacks('all'))
    }, [dispatch])

    const profileHandler = useCallback(() => {
        dispatch(setTypeOfPacks('my'))
    }, [dispatch])

    return (
        <nav className={s.headerHolder}>
            <div className={s.navigation}>
                <ul className={s.nav}>

                    <li
                        className={s.list}
                        onClick={rerender}>
                        <NavLink to={'/profilePacks'} onClick={profileHandler}>
                            <span className={s.icon}>
                                <FaceIcon fontSize='large' color = {'action'}/>
                            </span>
                            <span className={s.tip}>Profile</span>
                        </NavLink>
                    </li>
                    <li
                        onClick={rerender}>
                        <NavLink to={'/mainPage'} onClick={packListHandler}>
                            <span className={s.icon}>
                                <ListIcon fontSize='large' color = {'action'}/>
                            </span>
                            <span className={s.tip}>Packs list</span>
                        </NavLink>
                    </li>
                    <li className={s.list}
                        onClick={rerender}>
                        <NavLink to={'/'}>
                            <span className={s.icon} onClick={logoutHandler}>
                                <LogoutSharpIcon fontSize='large' color = {'action'}/>
                            </span>
                            <span className={s.tip}>Log out</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
})