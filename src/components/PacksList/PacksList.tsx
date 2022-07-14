import React, {useCallback, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {getPacks} from '../../reducers/packListsReducer';
import {SortType} from '../../api/packsAPI';
import {useNavigate} from 'react-router-dom';
import {AppPagination} from '../../common/Pagination/Pagination';
import Preloader from '../../common/Preloader/Preloader';
import s from './PacksList.module.css';
import AppModal from '../AppModal/AppModal';
import TableSortLabel from "@mui/material/TableSortLabel";
import {PackItem} from '../PackItem/PackItem';

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
    const [sort, setSort] = useState<SortType>('0updated')

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

    const sortHandler = useCallback(() => {
        if (sort === '1updated') setSort('0updated')
        else setSort('1updated')
    }, [dispatch, sort])

    const sortPackHandler = useCallback(() => {
        if (sort === '1name') setSort('0name')
        else setSort('1name')
    }, [dispatch, sort])

    const sortNumberOfCardsHandler = useCallback(() => {
        if (sort === '1cardsCount') setSort('0cardsCount')
        else setSort('1cardsCount')
    }, [dispatch, sort])

    const sortUserNameHandler = useCallback(() => {
        if (sort === '1user_name') setSort('0user_name')
        else setSort('1user_name')
    }, [dispatch, sort])

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
                                            direction={sort === '1name' ? 'desc' : 'asc'}>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="center">
                                        Number of cards
                                        <TableSortLabel
                                            onClick={sortNumberOfCardsHandler}
                                            active={true}
                                            direction={sort === '1cardsCount' ? 'desc' : 'asc'}>
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
                                            direction={sort === '1user_name' ? 'asc' : 'desc'}>
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                                {packs.map((pack) => {
                                    return <PackItem pack={pack}/>
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