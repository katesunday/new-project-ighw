import React, {useCallback, useState} from 'react';
import s from './Navigation.module.css'
import {NavLink} from "react-router-dom";

export const Navigation = React.memo(() => {
    const [state, setState] = useState(false)

    const rerender = useCallback(() => {
        setState(!state)
    }, [state])

    return (
        <nav className={s.headerHolder}>
            <div className={s.navigation}>
                <ul className={s.nav}>
                    <li
                        className={s.list}
                        onClick={rerender}>
                        <NavLink to={'/'}>
                            <span className={s.icon}>

                            </span>
                            <span className={s.tip}>1</span>
                        </NavLink>
                    </li>
                    <li
                        onClick={rerender}>
                        <NavLink to={'/'}>
                            <span className={s.icon}>

                            </span>
                            <span className={s.tip}>2</span>
                        </NavLink>
                    </li>
                    <li className={s.list}
                        onClick={rerender}>
                        <NavLink to={'/'}>
                            <span className={s.icon}>

                            </span>
                            <span className={s.tip}>3</span>
                        </NavLink>
                    </li>
                    <li className={s.list}
                        onClick={rerender}>
                        <NavLink to={'/'}>
                            <span className={s.icon}>

                            </span>
                            <span className={s.tip}>4</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
})