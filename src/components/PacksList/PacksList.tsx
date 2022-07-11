import React, {useCallback, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {editPack, getPacks, learnPack, removePack, setTypeOfPacks, showPack} from '../../reducers/packListsReducer';
import Button from '@mui/material/Button';
import {SortType} from '../../api/packsAPI';
import {useNavigate} from 'react-router-dom';
import {AppPagination} from '../../common/Pagination/Pagination';
import Preloader from '../../common/Preloader/Preloader';
import s from './PacksList.module.css';
import AppModal from '../AppModal/AppModal';
import TableSortLabel from "@mui/material/TableSortLabel";

type PackListPropsType = {
    debouncedSearchTerm: string
    min: number
    max: number
    idForProfile?: string
}

export const PacksList: React.FC<PackListPropsType> = ({debouncedSearchTerm, min, max, idForProfile}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const appStatus = useAppSelector(state => state.app.appStatus)
    const packs = useAppSelector(state => state.packsList.packs)
    const userId = useAppSelector(state => state.profile._id)
    const totalAmountOfPacks = useAppSelector(state => state.packsList.totalAmountOfPacks)
    const typeOfPacks = useAppSelector(state => state.packsList.typeOfPacks)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [sort, setSort] = useState<SortType>('0updated'||'0packName'||'0numberOfCards'||'0userName')

    useEffect(() => {
        if (userId === '') return
        if (typeOfPacks === 'my') {
            dispatch(getPacks({
                packName: debouncedSearchTerm,
                page: page + 1,
                pageCount: rowsPerPage,
                min,
                max,
                user_id: userId,
                sortPacks: sort as SortType,
            }))
        }

        if (typeOfPacks === 'all') {
            dispatch(getPacks({
                packName: debouncedSearchTerm,
                page: page + 1,
                pageCount: rowsPerPage,
                min,
                max,
                sortPacks: sort as SortType,
            }))
        }

        if (typeOfPacks === 'some') {
            dispatch(getPacks({
                packName: debouncedSearchTerm,
                page: page + 1,
                pageCount: rowsPerPage,
                min,
                max,
                user_id: idForProfile,
                sortPacks: sort as SortType,
            }))
        }
    }, [dispatch, page, debouncedSearchTerm, min, max, rowsPerPage, sort, typeOfPacks, idForProfile, userId])

    const deleteHandler = useCallback((id: string) => {
        dispatch(removePack(id))
    }, [dispatch])

    const editHandler = useCallback((id: string) => {
        navigate('/mainPage/cards')
        dispatch(editPack(id))
    }, [dispatch, navigate])

    const learnHandler = useCallback((id: string) => {
        dispatch(learnPack(id))
        navigate(`/train`, {replace: true});
    }, [dispatch, navigate])

    const showHandler = useCallback((id: string) => {
        navigate('/mainPage/cards')
        dispatch(showPack(id))
    }, [dispatch, navigate])

    const sortHandler = useCallback(() => {
        if (sort === '1updated') setSort('0updated')
        else setSort('1updated')
    }, [dispatch, sort])

    const sortPackHandler = useCallback(() => {
        if (sort === '1packName') setSort('0packName')
        else setSort('1packName')
    }, [dispatch, sort])

    const sortNumberOfCardsHandler = useCallback(() => {
        if (sort === '1numberOfCards') setSort('0numberOfCards')
        else setSort('1numberOfCards')
    }, [dispatch, sort])

    const sortUserNameHandler = useCallback(() => {
        if (sort === '1userName') setSort('0userName')
        else setSort('1userName')
    }, [dispatch, sort])

    const toProfilePacksHandler = useCallback((packUserId: string) => {
        if (userId === packUserId) {
            dispatch(editPack(packUserId))
            dispatch(setTypeOfPacks('my'))
            navigate('/profilePacks')
        } else {
            dispatch(showPack(packUserId))
            dispatch(setTypeOfPacks('some'))
            navigate('/profilePacks')
        }
    }, [dispatch, navigate, userId])

    return (
        <Paper>
            {appStatus === 'succeeded' ? <div>
                    <TableContainer component={Paper} style={{marginBottom: '30px'}}>
                        <Table sx={{minWidth: 300}} aria-label="custom pagination table" style={{tableLayout: 'fixed'}}>
                            <TableBody>
                                <TableRow style={{backgroundColor: 'rgb(184 245 213 / 54%)'}}>
                                    <TableCell align="left">
                                        Pack Name
                                        <TableSortLabel
                                            onClick={sortPackHandler}
                                            active={true}
                                            direction={sort === '1packName' ? 'desc' : 'asc'}>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="center">
                                        Number of cards
                                        <TableSortLabel
                                            onClick={sortNumberOfCardsHandler}
                                            active={true}
                                            direction={sort === '1numberOfCards' ? 'desc' : 'asc'}>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="right">
                                        Last update
                                        <TableSortLabel
                                            onClick={sortHandler}
                                            active={true}
                                            direction={sort === '1updated' ? 'desc' : 'asc'}>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="right">
                                        User name
                                        <TableSortLabel
                                            onClick={sortUserNameHandler}
                                            active={true}
                                            direction={sort === '1userName' ? 'desc' : 'asc'}>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                                {packs.map((pack) => {
                                    return <TableRow key={pack._id}>
                                        <TableCell className={s.cursor} onClick={() => {
                                            userId === pack.user_id ? editHandler(pack._id) : showHandler(pack._id)
                                        }} component="th" scope="row">
                                            {pack.name}
                                        </TableCell>
                                        <TableCell style={{width: 100}} align="right">
                                            {pack.cardsCount}
                                        </TableCell>
                                        <TableCell style={{width: 100}} align="right">
                                            {pack.updated.split('T')[0].replace(/-/gi, '.').split('.').reverse().join('.')}
                                        </TableCell>
                                        <TableCell className={s.cursor} style={{width: 100}} align="right"
                                                   onClick={() => toProfilePacksHandler(pack.user_id)}>
                                            {pack.user_name}
                                        </TableCell>
                                        <TableCell style={{width: 100}} align="right">
                                            {userId === pack.user_id ?
                                                <AppModal title={'delete'}
                                                          description={'Do yo really want to remove this pack?'}
                                                          children={
                                                              <Button
                                                                  key={'1'}
                                                                  onClick={() => deleteHandler(pack._id)}
                                                                  style={{margin: '5px'}}
                                                                  sx={{mt: 3, mb: 2}}
                                                                  className={s.btnsDelete}
                                                                  variant={'contained'}
                                                                  color={'error'}
                                                              >Delete</Button>
                                                          }/> : undefined}
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
                        </Table>
                        <AppPagination setPage={setPage}
                                       page={page}
                                       totalAmountOfItems={totalAmountOfPacks}
                                       rowsPerPage={rowsPerPage}
                                       setRowsPerPage={setRowsPerPage}/>
                    </TableContainer>
                </div> :
                <Preloader/>}
        </Paper>
    );
}