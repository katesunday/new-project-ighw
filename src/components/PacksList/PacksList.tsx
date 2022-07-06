import React, {useCallback, useEffect, useState} from 'react';
import {Grid} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {editPack, getPacks, learnPack, removePack, showPack} from '../../reducers/packListsReducer';
import Button from '@mui/material/Button';
import {SortType} from '../../api/packsAPI';
import TableFooter from '@mui/material/TableFooter';
import {Navigate, useNavigate} from 'react-router-dom';
import {AppPagination} from '../../common/Pagination/Pagination';

type PackListPropsType = {
    debouncedSearchTerm: string
    min: number
    max: number
}

export const PacksList: React.FC<PackListPropsType> = React.memo(({debouncedSearchTerm, min, max}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const packs = useAppSelector(state => state.packsList.packs)
    const userId = useAppSelector(state => state.profile._id)
    const totalAmountOfPacks = useAppSelector(state => state.packsList.totalAmountOfPacks)
    const amountOfPages = Math.ceil(totalAmountOfPacks / 8)
    const [page, setPage] = useState(1)

    useEffect(() => {
            dispatch(getPacks({
                packName: debouncedSearchTerm,
                page: page,
                pageCount: 8,
                min,
                max,
            }))
    }, [dispatch, page, debouncedSearchTerm, min, max])

    const deleteHandler = (id: string) => {
        dispatch(removePack(id))
    }

    const editHandler = (id: string) => {
        dispatch(editPack(id))
        return <Navigate to={'/cards'}/>
    }

    const learnHandler = (id: string) => {
        dispatch(learnPack(id))
        navigate(`/train`, {replace: true});
    }

    const showHandler = useCallback((id: string) => {
        navigate('/mainPage/cards')
        dispatch(showPack(id))
    }, [dispatch, navigate])

    const [sort, setSort] = useState<SortType>('0updated')

    const sortHandler = () => {
        if (sort === '0updated') {
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
                                    <TableCell onClick={() => {
                                        showHandler(pack._id)
                                    }} component="th" scope="row">
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
                            <AppPagination setPage={setPage} page={page} amountOfPages={amountOfPages}/>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>
        </Grid>
    );
})

