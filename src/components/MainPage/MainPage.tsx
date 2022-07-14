import React, {useCallback, useState} from 'react';
import Button from '@mui/material/Button/Button';
import Paper from '@mui/material/Paper';
import SuperDoubleRange from '../../common/c8-SuperDoubleRange/SuperDoubleRange';
import s from './MainPage.module.css'
import {useAppDispatch, useAppSelector, useDebounce} from '../../utils/hooks';
import {searchMinMax, setTypeOfPacks} from '../../reducers/packListsReducer';
import {PacksList} from '../PacksList/PacksList';
import {UniversalSearch} from '../../common/UniversalSearch/UniversalSearch';
import {Navigate} from 'react-router-dom';
import rocketImg from './../../assets/images/rocket.png';


export const MainPage = React.memo(() => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
    const min = useAppSelector(state => state.packsList.minMax[0])
    const max = useAppSelector(state => state.packsList.minMax[1])

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const onMouseUp = useCallback((values: [number, number]) => {
        dispatch(searchMinMax(values))
    }, [dispatch, searchMinMax])

    const getMyPacksHandler = useCallback(() => {
        dispatch(setTypeOfPacks('my'))
    }, [dispatch])

    const getAllPacksHandler = useCallback(() => {
        dispatch(setTypeOfPacks('all'))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }
    return (
        <Paper className={s.MainPage}>
            <div className={s.sideBar}>
                <div>Show packs of cards</div>
                <div className={s.selectorBtns}>
                    <Button
                        style={{borderRadius: '30px'}}
                        color={'primary'}
                        sx={{mt: 3, mb: 2}}
                        onClick={getMyPacksHandler}
                        variant={'contained'}>
                        My Packs
                    </Button>
                    <Button
                        style={{borderRadius: '30px'}}
                        color={'primary'}
                        sx={{mt: 3, mb: 2}}
                        onClick={getAllPacksHandler}
                        variant={'contained'}>
                        All Packs
                    </Button>
                </div>
                <div>
                    <SuperDoubleRange
                        value={[min, max]}
                        onMouseUp={onMouseUp}
                    />
                    <span>{min} - </span> <span>{max}</span>
                </div>
                <img src={rocketImg} alt={'rocketImg'} className={s.image}/>
            </div>

            <div className={s.packList}>
                <div className={s.packListHeader}>Pack List</div>
                <div className={s.searchAndAdd}>
                    <UniversalSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </div>
                <div className={s.allPacks}>
                    <PacksList debouncedSearchTerm={debouncedSearchTerm}
                               min={min}
                               max={max}/>
                </div>
            </div>
        </Paper>
    );
});

