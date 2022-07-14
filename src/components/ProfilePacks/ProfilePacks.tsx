import Button from '@mui/material/Button/Button';
import React, {useCallback, useState} from 'react';
import SuperDoubleRange from '../../common/c8-SuperDoubleRange/SuperDoubleRange';
import {Pack, searchMinMax} from '../../reducers/packListsReducer';
import {useAppDispatch, useAppSelector, useDebounce} from '../../utils/hooks';
import s from './ProfilePacks.module.css';
import {PacksList} from '../PacksList/PacksList';
import {Navigate, useNavigate} from 'react-router-dom';
import Paper from "@mui/material/Paper";
import {UniversalSearch} from '../../common/UniversalSearch/UniversalSearch';
import rocketImg from "../../assets/images/rocket.png";

export const ProfilePacks = React.memo(() => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
    const avatar = useAppSelector(state => state.profile.avatar)
    const userId = useAppSelector(state => state.profile._id)
    const name = useAppSelector(state => state.profile.name)
    const editPackId = useAppSelector(state => state.packsList.editPackId)
    const min = useAppSelector(state => state.packsList.minMax[0])
    const max = useAppSelector(state => state.packsList.minMax[1])
    const showPackId = useAppSelector(state => state.packsList.showPackId)
    const currentPack = useAppSelector(state => {
        if (state.packsList.packs && state.packsList.showPackId || state.packsList.editPackId) {
            const pack = state.packsList.packs.find(item => item.user_id === state.packsList.showPackId || state.packsList.editPackId)
            if (pack) return pack
        } else return {} as Pack
    })

    const onMouseUp = useCallback((values: [number, number]) => {
        dispatch(searchMinMax(values))
    }, [dispatch, searchMinMax])

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const toMainPage = useCallback(() => {
        let path = `/mainPage`;
        navigate(path, {replace: true});
    }, [navigate])

    const toEdit = useCallback(() => {
        let path = `/profile`;
        navigate(path, {replace: true});
    }, [navigate])

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }
    console.log(currentPack?.user_id, userId)

    return (
        <Paper className={s.MainPage}>
            <div className={s.sideBar}>
                <div className={s.avatar}>
                    {currentPack && currentPack.avatar ?
                        <img className={s.avatarImg} src={currentPack.avatar} alt={'avatar'}/> :
                        <img className={s.avatarImg} src={avatar} alt={'avatar'}/>}
                </div>
                <div className={s.profileDiv}>
                    <div className={s.nameContainer}>{(currentPack?.user_name) || name}</div>
                    {(currentPack?.user_id === editPackId) || userId ?
                        <Button
                            style={{borderRadius: '30px'}}
                            className={s.editBtn}
                            variant="contained"
                            onClick={toEdit}
                            color="primary"
                            disabled={!!showPackId}>
                            Edit profile
                        </Button> : undefined}
                    <Button
                        style={{borderRadius: '30px'}}
                        className={s.editBtn}
                        onClick={toMainPage}
                        type={'submit'}
                        variant="contained"
                        sx={{mt: 3, mb: 2}}>
                        Go back
                    </Button>
                </div>
                <hr/>
                <div className={s.doubleRange}>
                    <span>Sort by number of questions</span>
                    <SuperDoubleRange value={[min, max]}
                                      onMouseUp={onMouseUp}

                    />
                    <span>{min} - </span> <span>{max}</span>
                </div>
                <img src={rocketImg} alt={'rocketImg'} className={s.image}/>
            </div>

            <div className={s.packList}>
                <div className={s.packListHeader}>Pack List of {(currentPack && currentPack.user_name) || name}</div>
                <div className={s.searchAndAdd}>
                    <UniversalSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </div>
                <div className={s.allPacks}>
                    <PacksList debouncedSearchTerm={debouncedSearchTerm}
                               min={min}
                               max={max}
                               idForProfile={showPackId || editPackId || userId}/>
                </div>
            </div>
        </Paper>
    );
});