import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Pagination from '@mui/material/Pagination';
import Select, { SelectChangeEvent } from '@mui/material/Select/Select';
import MenuItem from 'material-ui/MenuItem';
import React, { useState } from 'react';
import s from '../Pagination/pagination.module.css'

type PaginationComponentPropsType = {
    value:number
}

const PaginationComponent = (props:PaginationComponentPropsType) => {
    const [num, setNum] = useState('8');

    const handleChange = (event: SelectChangeEvent) => {
        setNum(event.target.value);
    };
    return (
        <div className={s.paginationDiv}>
            <Pagination count={props.value} shape="rounded" />
            <div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 130 }}>
                    <InputLabel id="demo-simple-select-standard-label">Pack per page</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={num}
                        onChange={handleChange}
                        label="Pack per page"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'4'}>4</MenuItem>
                        <MenuItem value={'8'}>8</MenuItem>
                        <MenuItem value={'10'}>10</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default PaginationComponent;