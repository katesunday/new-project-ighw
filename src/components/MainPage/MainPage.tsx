import React , {ChangeEvent , useCallback , useEffect , useState} from 'react';
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField';
import {InputAdornment , Pagination} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SuperDoubleRange from '../../common/c8-SuperDoubleRange/SuperDoubleRange';
import s from './MainPage.module.css'
import {useAppDispatch , useAppSelector} from '../../utils/hooks';
import {createNewPack , getPacks , searchMinMax} from '../../reducers/packListsReducer';
import {PostPackPayloadType} from '../../api/packsAPI';
import {PacksList} from '../PacksList/PacksList';


const MainPage = React.memo(() => {
    const dispatch = useAppDispatch()
    const appStatus = useAppSelector(state => state.app.appStatus)
    const userId = useAppSelector(state => state.profile._id)
    const min = useAppSelector(state => state.packsList.minMax[0])
    const max = useAppSelector(state => state.packsList.minMax[1])

    const useDebounce = (value: string , delay: number) => {
        const [debouncedValue , setDebouncedValue] = useState(value);
        useEffect(() => {

                const handler = setTimeout(() => {
                    setDebouncedValue(value);
                } , delay);
                return () => {
                    clearTimeout(handler);
                };
            } ,
            [value , delay]
        );
        return debouncedValue;
    }

    const [searchTerm , setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm , 1000);

    const onMouseUp = useCallback((values: [number , number]) => {
        dispatch(searchMinMax(values))
    } , [dispatch , searchMinMax])

    const searchHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value)
    } , [setSearchTerm])

    const getMyPacksHandler = useCallback(() => {
        dispatch(getPacks({user_id: userId}))
    } , [dispatch , userId , getPacks])

    const getAllPacksHandler = useCallback(() => {
        dispatch(getPacks({
            page: 1 ,
            pageCount: 8
        }))
    } , [dispatch , getPacks])

    const createNewPackHandler = useCallback((payload: PostPackPayloadType) => {
        dispatch(createNewPack(payload))
    } , [dispatch , createNewPack])

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

                    <SuperDoubleRange value={[min , max]}
                                      onMouseUp={onMouseUp}

                    />
                    <span>{min} - </span> <span>{max}</span>
                </div>
            </div>

            <div className={s.packList}>
                <div className={s.packListHeader}>Pack List</div>
                <div className={s.searchAndAdd}>
                    <TextField style={{width: '70%'}}
                               fullWidth
                               label="Search..."
                               value={searchTerm}
                               onChange={searchHandler}
                               InputProps={{
                                   endAdornment: <InputAdornment position="start">
                                       <SearchIcon/>
                                   </InputAdornment>
                               }}
                    />
                    <Button sx={{mt: 3 , mb: 2}}
                            onClick={() => createNewPackHandler({
                                name: 'Some name' ,
                                private: false ,
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
        </div>
    );
});

export default MainPage;


