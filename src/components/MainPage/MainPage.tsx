import React, {useCallback, useState} from 'react';
import Button from '@mui/material/Button/Button';
import Paper from '@mui/material/Paper';
import SuperDoubleRange from '../../common/c8-SuperDoubleRange/SuperDoubleRange';
import s from './MainPage.module.css'
import {useAppDispatch, useAppSelector, useDebounce} from '../../utils/hooks';
import {createNewPack, searchMinMax, setTypeOfPacks} from '../../reducers/packListsReducer';
import {PostPackPayloadType} from '../../api/packsAPI';
import {PacksList} from '../PacksList/PacksList';
import {UniversalSearch} from '../../common/UniversalSearch/UniversalSearch';
import { Navigate } from 'react-router-dom';
import AppModal from '../AppModal/AppModal';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';


export const MainPage = React.memo(() => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
    const min = useAppSelector(state => state.packsList.minMax[0])
    const max = useAppSelector(state => state.packsList.minMax[1])

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const [newPackName, setNewPackName] = useState('')
    const [privacyOfNewPack, setPrivacyOfNewPack] = useState(false)

    const onMouseUp = useCallback((values: [number, number]) => {
        dispatch(searchMinMax(values))
    }, [dispatch, searchMinMax])

    const getMyPacksHandler = useCallback(() => {
        dispatch(setTypeOfPacks('my'))
    }, [dispatch])

    const getAllPacksHandler = useCallback(() => {
        dispatch(setTypeOfPacks('all'))
    }, [dispatch])

    const createNewPackHandler = useCallback((payload: PostPackPayloadType) => {
        dispatch(createNewPack(payload))
    }, [dispatch, createNewPack])

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }
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
                    <AppModal title={'Add pack'} children={[
                        <Button
                            onClick={() => createNewPackHandler({
                                name: newPackName,
                                private: privacyOfNewPack,
                                deckCover: ''
                            })}
                            key={'1'}
                            style={{borderRadius:'30px'}}
                            color={'primary'}
                            sx={{mt: 3, mb: 2}}
                            variant={'contained'}>
                            Save
                        </Button>,
                        <TextField
                            key={'2'}
                            color={"secondary"}
                            margin="normal"
                            id="email"
                            label="New pack name"
                            autoFocus
                            helperText="Enter new pack name"
                            value={newPackName}
                            onChange={(e) => setNewPackName(e.currentTarget.value)}
                        />,
                        <div key={'3'}>
                            <Checkbox
                                checked={privacyOfNewPack}
                                onChange={(e) => setPrivacyOfNewPack(e.currentTarget.checked)}
                            />
                            <span>Privacy</span>
                        </div>
                    ]}/>
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

