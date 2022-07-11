import React, {MouseEvent, ChangeEvent} from 'react';
import TablePagination from '@mui/material/TablePagination';

type PaginationType = {
    page: number
    setPage: (page: number) => void
    totalAmountOfItems: number
    rowsPerPage: number
    setRowsPerPage: (rowsPerPage: number) => void
}

export const AppPagination: React.FC<PaginationType> = React.memo(({page, setPage, totalAmountOfItems, rowsPerPage, setRowsPerPage}) => {
    const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
        setPage(page)
    };

    const handlerChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return (
        <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 25]}
            count={totalAmountOfItems}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handlerChangeRowsPerPage}
            showFirstButton
            showLastButton
        />
    );
})