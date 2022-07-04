import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField';
import {Icon , IconButton , InputAdornment , Pagination} from '@mui/material';
import React , {ChangeEvent , useEffect , useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SuperDoubleRange from '../../common/c8-SuperDoubleRange/SuperDoubleRange';
import s from './MainPage.module.css'
import {useAppDispatch} from '../../utils/hooks';
import { getPacksByParamsTC, searchPacks} from '../../reducers/cardReducer';


const MainPage = React.memo(() => {

    const useDebounce = (value:string, delay:number)=> {
        // State and setters for debounced value
        const [debouncedValue, setDebouncedValue] = useState(value);
        useEffect(
            () => {
                // Update debounced value after delay
                const handler = setTimeout(() => {
                    setDebouncedValue(value);
                }, delay);
                // Cancel the timeout if value changes (also on delay change or unmount)
                // This is how we prevent debounced value from updating if value is changed ...
                // .. within the delay period. Timeout gets cleared and restarted.
                return () => {
                    clearTimeout(handler);
                };
            },
            [value, delay] // Only re-call effect if value or delay changes
        );
        return debouncedValue;
    }
    const dispatch = useAppDispatch()
    const [value1 , setValue1] = useState(0)
    const [value2 , setValue2] = useState(100)

    const [searchTerm , setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm , 1000);

    const onChangeBoth = (values: number[]) => {
        setValue1(values[0])
        setValue2(values[1])

    }
    const onMouseLeave = (values: number[]) => {
        dispatch(getPacksByParamsTC(values[0] , values[1]))
    }

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value)
    }

    useEffect(() => {
       dispatch(searchPacks(debouncedSearchTerm))
    } , [debouncedSearchTerm])

    return (
        <div className={s.MainPage}>
            <div className={s.sideBar}>
                <div>Show packs of cards</div>
                <div className={s.selectorBtns}>
                    <Button
                        variant="contained"
                        sx={{mt: 3 , mb: 2}}
                    >
                        My
                    </Button>
                    <Button
                        variant="contained"
                        sx={{mt: 2 , mb: 2}}
                    >
                        All
                    </Button>
                </div>
                <div>

                    <SuperDoubleRange value={[value1 , value2]}
                                      onChangeBoth={onChangeBoth} onMouseLeave={onMouseLeave}
                    />
                    <span>{value1} - </span> <span>{value2}</span>
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
                    <Button
                        variant="contained"
                        sx={{mt: 3 , mb: 2}}
                    >
                        Add new Pack
                    </Button>
                </div>

                <Pagination count={1000} shape="rounded"/>
            </div>
        </div>
    );
});

export default MainPage;

function useDebounce(searchTerm: string , arg1: number) {
    throw new Error('Function not implemented.');
}
