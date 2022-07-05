import React , {ChangeEvent , useEffect , useState} from 'react';
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField';
import {InputAdornment , Pagination} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SuperDoubleRange from '../../common/c8-SuperDoubleRange/SuperDoubleRange';
import s from './MainPage.module.css'
import {useAppDispatch , useAppSelector} from '../../utils/hooks';
import {createNewPack , getPacks} from '../../reducers/packListsReducer';
import {PostPackPayloadType} from '../../api/packsAPI';
import { PacksList } from '../PacksList/PacksList';


const MainPage = React.memo(() => {
    const dispatch = useAppDispatch()

    const userId = useAppSelector(state => state.profile._id)
    const minMax = useAppSelector(state => state.packsList.minMax)
    const packs = useAppSelector(state => state.packsList.packs)
    const useDebounce = (value: string , delay: number) => {
        // State and setters for debounced value
        const [debouncedValue , setDebouncedValue] = useState(value);

        useEffect(() => {
                // Update debounced value after delay
                const handler = setTimeout(() => {
                    setDebouncedValue(value);
                } , delay);
                // Cancel the timeout if value changes (also on delay change or unmount)
                // This is how we prevent debounced value from updating if value is changed ...
                // .. within the delay period. Timeout gets cleared and restarted.
                return () => {
                    clearTimeout(handler);
                };
            } ,
            [value, delay] // Only re-call effect if value or delay changes
        );
        return debouncedValue;
    }


    const [values , setValues] = useState<[number, number]>(minMax)

    const [searchTerm , setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm , 1000);

    useEffect(() => {
        if(debouncedSearchTerm !== '') dispatch(getPacks({packName: debouncedSearchTerm}))
    } , [debouncedSearchTerm])

    const onChangeBoth = (values: [number, number]) => {
        setValues(values)
    }

    const onMouseUp = (values: number[]) => {
        // dispatch(getPacksByParamsTC(values[0] , values[1]))
        dispatch(getPacks({min: values[0], max: values[1]}))
    }

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value)
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
                            variant={'contained'}>
                        AddNewPack
                    </Button>
                </div>
                <PacksList/>
                <Pagination count={1000} shape="rounded"/>
            </div>
        </div>
    );
});

export default MainPage;


