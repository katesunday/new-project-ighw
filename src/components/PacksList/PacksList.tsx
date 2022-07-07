import React, {useCallback, useEffect, useState} from 'react';
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
import {useNavigate} from 'react-router-dom';
import {AppPagination} from '../../common/Pagination/Pagination';
import Preloader from '../../common/Preloader/Preloader';
import s from './PacksList.module.css';

type PackListPropsType = {
    debouncedSearchTerm: string
    min: number
    max: number
    idForProfile?: string
}

export const PacksList: React.FC<PackListPropsType> = React.memo(({debouncedSearchTerm, min, max, idForProfile}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const appStatus = useAppSelector(state => state.app.appStatus)
    const packs = useAppSelector(state => state.packsList.packs)
    const userId = useAppSelector(state => state.profile._id)
    const totalAmountOfPacks = useAppSelector(state => state.packsList.totalAmountOfPacks)

    const amountOfPages = Math.ceil(totalAmountOfPacks / 8)
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (idForProfile) {
            dispatch(getPacks({
                packName: debouncedSearchTerm,
                page: page,
                pageCount: 8,
                min,
                max,
                user_id: idForProfile
            }))
        } else {
            dispatch(getPacks({
                packName: debouncedSearchTerm,
                page: page,
                pageCount: 8,
                min,
                max,
            }))
        }

    }, [dispatch, page, debouncedSearchTerm, min, max])

    const deleteHandler = (id: string) => {
        dispatch(removePack(id))
    }

    const editHandler = (id: string) => {
        navigate('/mainPage/cards')
        dispatch(editPack(id))
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

    const toProfilePacksHandler = (packUserId: string) => {
        if (userId === packUserId) {
            dispatch(editPack(packUserId))
            navigate('/profilePacks')
        } else {
            dispatch(showPack(packUserId))
            navigate('/profilePacks')

        }

    }

    return (
        <Paper>
            {appStatus === 'succeeded' ? <div>
                    <TableContainer component={Paper} style={{marginBottom: '30px'}}>
                        <Table sx={{minWidth: 300}} aria-label="custom pagination table" style={{tableLayout: 'fixed'}}>
                            <TableBody>
                                <TableRow style={{backgroundColor: 'rgb(184 245 213 / 54%)'}}>
                                    <TableCell align="left">Pack Name</TableCell>
                                    <TableCell align="center">Number of cards</TableCell>
                                    <TableCell align="right" onClick={sortHandler}>Last update</TableCell>
                                    <TableCell align="right">User name</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                                {packs.map((pack) => {
                                    return <TableRow key={pack._id}>
                                        <TableCell onClick={() => {
                                            userId === pack.user_id ? editHandler(pack._id) : showHandler(pack._id)
                                        }} component="th" scope="row">
                                            {pack.name}
                                        </TableCell>
                                        <TableCell style={{width: 100}} align="right">
                                            {pack.cardsCount}
                                        </TableCell>
                                        <TableCell style={{width: 100}} align="right">
                                            {pack.updated.split('T')[0].replace(/-/gi, '.')}
                                        </TableCell>
                                        <TableCell style={{width: 100}} align="right"
                                                   onClick={() => toProfilePacksHandler(pack.user_id)}>
                                            {pack.user_name}
                                        </TableCell>
                                        <TableCell style={{width: 100}} align="right">
                                            {userId === pack.user_id ?
                                                <Button
                                                    style={{margin: '5px'}}
                                                    sx={{mt: 3, mb: 2}}
                                                    className={s.btnsDelete}
                                                    onClick={() => deleteHandler(pack._id)}
                                                    variant={'contained'}
                                                    color={'error'}>
                                                    Delete
                                                </Button> : undefined}
                                            {userId === pack.user_id ?
                                                <Button
                                                    style={{margin: '5px'}}
                                                    color={'secondary'}
                                                    sx={{mt: 3, mb: 2}}
                                                    className={s.btnsEdit}
                                                    onClick={() => {
                                                        editHandler(pack._id)
                                                    }}
                                                    variant={'contained'}>
                                                    Edit
                                                </Button> : undefined}
                                            <Button
                                                style={{margin: '5px'}}
                                                color={'secondary'}
                                                sx={{mt: 3, mb: 2}}
                                                className={s.btnsLern}
                                                disabled={pack.cardsCount === 0}
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
                </div> :
                <Preloader/>}
        </Paper>
    );
})

