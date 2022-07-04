import React, {useEffect, useState} from 'react';
import {Grid} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {createNewPack, editPack, getPacks, learnPack, removePack} from '../../reducers/packListsReducer';
import Button from '@mui/material/Button';
import {PostPackPayloadType, SortType} from '../../api/packsAPI';
import TableFooter from '@mui/material/TableFooter';
import {Navigate, useNavigate} from "react-router-dom";

export const PacksList = React.memo(() => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.packsList.packs)
    const userId= useAppSelector(state => state.profile._id)
    useEffect(() => {
        dispatch(getPacks({
            page: 1,
            pageCount: 8
        }))
    }, [dispatch])

    const deleteHandler = (id: string) => {
        dispatch(removePack(id))
    }

    const editHandler = (id: string) => {
        dispatch(editPack(id))
        return <Navigate to={'/cards'}/>
    }

    const learnHandler = (id: string) => {
        dispatch(learnPack(id))
        const path = `/train`;
        navigate(path, {replace: true});
        // <Navigate to={'/card'}/> // когда будет готова страница обучения, редиректим сюда
    }

    const createNewPackHandler = (payload: PostPackPayloadType) => {
        dispatch(createNewPack(payload))
    }


    const [sort, setSort] = useState<SortType>('0updated')

    const sortHandler = () => {
        if(sort === '0updated') {
            dispatch(getPacks({
                sortPacks: '0updated',
                pageCount: 8
            }))
            setSort('1updated')
        } else {
            dispatch(getPacks({
                sortPacks: '1updated',
                pageCount: 8
            }))
            setSort('0updated')
        }
    }

    return (
        <Grid container justifyContent={'center'}>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 500}} aria-label="custom pagination table">
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">Pack Name</TableCell>
                                <TableCell align="center">Number of cards</TableCell>
                                <TableCell align="right" onClick={sortHandler}>Last update</TableCell>
                                <TableCell align="right">User name</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                            {packs.map((pack) => {
                                return <TableRow key={pack._id}>
                                    <TableCell onClick={()=> {editHandler(pack._id)}} component="th" scope="row">
                                        {pack.name}
                                    </TableCell>
                                    <TableCell style={{width: 150}} align="right">
                                        {pack.cardsCount}
                                    </TableCell>
                                    <TableCell style={{width: 150}} align="right">
                                        {pack.updated.split('T')[0].replace(/-/gi, '.')}
                                    </TableCell>
                                    <TableCell style={{width: 150}} align="right">
                                        {pack.user_name}
                                    </TableCell>
                                    <TableCell style={{width: 150}} align="right">
                                        {userId === pack.user_id ?
                                            <Button sx={{mt: 3, mb: 2}}
                                                    onClick={() => deleteHandler(pack._id)}
                                                    variant={'contained'}>
                                                Delete
                                            </Button> : undefined}
                                        {userId === pack.user_id ?
                                            <Button sx={{mt: 3, mb: 2}}
                                                    onClick={() => {
                                                        editHandler(pack._id)
                                                    }}
                                                    variant={'contained'}>
                                                Edit
                                            </Button> : undefined}
                                        <Button sx={{mt: 3, mb: 2}}
                                                onClick={() => learnHandler(pack._id)}
                                                variant={'contained'}>
                                            Learn
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                {/*<TablePagination*/}
                                {/*    count={-1}*/}
                                {/*    rowsPerPage={8}*/}
                                {/*    // count={rows.length}*/}
                                {/*    // rowsPerPage={rowsPerPage}*/}
                                {/*    // page={page}*/}
                                {/*    // onPageChange={handleChangePage}*/}
                                {/*    // onRowsPerPageChange={handleChangeRowsPerPage}*/}
                                {/*    // ActionsComponent={TablePaginationActions}*/}
                                {/*/>*/}
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>
        </Grid>
    );
})

