import React, {useCallback, useState} from 'react';
import Button from '@mui/material/Button/Button';
import Paper from '@mui/material/Paper';
import SuperDoubleRange from '../../common/c8-SuperDoubleRange/SuperDoubleRange';
import s from './MainPage.module.css'
import {useAppDispatch, useAppSelector, useDebounce} from '../../utils/hooks';
import {createNewPack, getPacks, searchMinMax} from '../../reducers/packListsReducer';
import {PostPackPayloadType} from '../../api/packsAPI';
import {PacksList} from '../PacksList/PacksList';
import {UniversalSearch} from '../../common/UniversalSearch/UniversalSearch';


export const MainPage = React.memo(() => {
    const dispatch = useAppDispatch()

    const appStatus = useAppSelector(state => state.app.appStatus)
    const userId = useAppSelector(state => state.profile._id)
    const min = useAppSelector(state => state.packsList.minMax[0])
    const max = useAppSelector(state => state.packsList.minMax[1])

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const onMouseUp = useCallback((values: [number, number]) => {
        dispatch(searchMinMax(values))
    }, [dispatch, searchMinMax])

    const getMyPacksHandler = useCallback(() => {
        dispatch(getPacks({
            user_id: userId,
            min,
            max,
            pageCount: 5,
            page: 1,
        }))
    }, [dispatch, userId, getPacks, min, max])

    const getAllPacksHandler = useCallback(() => {
        debugger
        dispatch(getPacks({
            min,
            max,
            pageCount: 5,
            page: 1,
        }))
    }, [dispatch, getPacks, min, max])

    const createNewPackHandler = useCallback((payload: PostPackPayloadType) => {
        dispatch(createNewPack(payload))
    }, [dispatch, createNewPack])

    return (
        <Paper className={s.MainPage}>
            <div className={s.sideBar}>
                <div>Show packs of cards</div>
                <div className={s.selectorBtns}>
                    <Button
                        style={{borderRadius:'30px'}}
                        color={'primary'}
                        sx={{mt: 3, mb: 2}}
                        onClick={getMyPacksHandler}
                        variant={'contained'}>
                        My Packs
                    </Button>
                    <Button
                        style={{borderRadius:'30px'}}
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
            </div>

            <div className={s.packList}>
                <div className={s.packListHeader}>Pack List</div>
                <div className={s.searchAndAdd}>
                    <UniversalSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                    <Button
                        style={{borderRadius:'30px'}}
                        color={'primary'}
                        sx={{mt: 3, mb: 2}}
                        onClick={() => createNewPackHandler({
                            name: 'Some name',
                            private: false,
                            deckCover: ''
                        })}
                        variant={'contained'}
                        disabled={appStatus === 'inProgress'}
                    >
                        Add New Pack
                    </Button>
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

