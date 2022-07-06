import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import TextField from '@mui/material/TextField';
import React, {ChangeEvent, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '../../utils/hooks';
import { Params } from '../../api/packsAPI';
import { Dispatch } from 'redux';
import { PacksActionType } from '../../reducers/packListsReducer';
import { AppActionsType } from '../../reducers/appReducer';

type UniversalSearchPropsType = {
    dispatchCallBack:(params: Params) => (dispatch: Dispatch<PacksActionType | AppActionsType>) => void
    paramName:string
}

export const UniversalSearch = (props:UniversalSearchPropsType) => {
    const dispatch = useAppDispatch()
    const [searchTerm , setSearchTerm] = useState('');
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
    const debouncedSearchTerm = useDebounce(searchTerm , 1000);

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value)
    }
    const param = props.paramName

    useEffect(() => {
        //как сюда пропс пихнуть
        if(debouncedSearchTerm !== '') dispatch(props.dispatchCallBack({packName:debouncedSearchTerm}))
            //dispatch(getPacks({packName: debouncedSearchTerm}))
    } , [debouncedSearchTerm])
    return (
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
    );
};
