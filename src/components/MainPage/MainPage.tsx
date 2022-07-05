import React , {ChangeEvent , useEffect , useState} from 'react';
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField';
import {InputAdornment , Pagination} from '@mui/material';
import SuperDoubleRange from '../../common/c8-SuperDoubleRange/SuperDoubleRange';
import s from './MainPage.module.css'
import {useAppDispatch , useAppSelector} from '../../utils/hooks';
import {createNewPack , getPacks} from '../../reducers/packListsReducer';
import {PostPackPayloadType} from '../../api/packsAPI';
import { PacksList } from '../PacksList/PacksList';
import { UniversalSearch } from '../../common/UniversalSearch/UniversalSearch';
import LinearProgress from 'material-ui/LinearProgress';
import Preloader from '../../common/Preloader/Preloader';
import PaginationComponent from '../../common/Pagination/PaginationComponent';



const MainPage = React.memo(() => {
    const dispatch = useAppDispatch()
    const appStatus = useAppSelector(state => state.app.appStatus)
    const userId = useAppSelector(state => state.profile._id)
    const minMax = useAppSelector(state => state.packsList.minMax)
    const packs = useAppSelector(state => state.packsList.packs)
    const [values , setValues] = useState<[number, number]>(minMax)


    const onChangeBoth = (values: [number, number]) => {
        setValues(values)
    }

    const onMouseUp = (values: number[]) => {
        dispatch(getPacks({min: values[0], max: values[1]}))
    }


    const getMyPacksHandler = () => {
        dispatch(getPacks({user_id: userId}))
    }

    const getAllPacksHandler = () => {
        dispatch(getPacks({
            page: 1 ,
            pageCount: 8
        }))
    }

    const createNewPackHandler = (payload: PostPackPayloadType) => {
        dispatch(createNewPack(payload))
    }

  

    return (

        <div className={s.MainPage}>
            <div className={s.sideBar}>
                <div>Show packs of cards</div>
                <div className={s.selectorBtns}>
                    <Button sx={{mt: 3 , mb: 2}}
                            onClick={getMyPacksHandler}
                            variant={'contained'}>
                        My Packs
                    </Button>
                    <Button sx={{mt: 3 , mb: 2}}
                            onClick={getAllPacksHandler}
                            variant={'contained'}>
                        All Packs
                    </Button>
                </div>
                <div>

                    <SuperDoubleRange value={values}
                                      onChangeBoth={onChangeBoth} onMouseUp={onMouseUp}
                    />
                    <span>{values[0]} - </span> <span>{values[1]}</span>
                </div>
            </div>

            <div className={s.packList}>
                <div className={s.packListHeader}>Pack List</div>
                <div className={s.searchAndAdd}>
                    <UniversalSearch dispatchCallBack = {getPacks} paramName = {'packName'}/>
                    <Button sx={{mt: 3 , mb: 2}}
                            onClick={() => createNewPackHandler({
                                name: 'Some name' ,
                                private: false ,
                                deckCover: ''
                            })}
                            variant={'contained'}
                            disabled = {appStatus ==='inProgress'}
                    >
                        Add New Pack
                    </Button>
                </div>
                <PacksList/>
                <PaginationComponent value = {100} />
            </div>
        </div>
    );
});

export default MainPage;


