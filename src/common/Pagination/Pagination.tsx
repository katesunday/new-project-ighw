import React from 'react';
import {Pagination} from '@mui/material';

type PaginationType = {
    page: number
    setPage: (page: number) => void
    amountOfPages: number
}

export const AppPagination: React.FC<PaginationType> = React.memo(({page, setPage, amountOfPages}) => {
    return (
            <Pagination count={amountOfPages}
                        style={{width: '500px'}}
                        page={page}
                        onChange={(_, num) => setPage(num)}/>
    );
})