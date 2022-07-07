import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import TextField from '@mui/material/TextField';
import React, {ChangeEvent} from 'react';
import SearchIcon from '@mui/icons-material/Search';

type UniversalSearchPropsType = {
    setSearchTerm: (searchTerm: string) => void
    searchTerm: string
}

export const UniversalSearch: React.FC<UniversalSearchPropsType> = ({setSearchTerm, searchTerm}) => {

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value)
    }

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
