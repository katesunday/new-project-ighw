import React, {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector, useDebounce} from '../../utils/hooks';
import {addNewCard, getCards} from '../../reducers/cardsReducer';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import {Navigate, useNavigate} from 'react-router-dom';
import s from './Cards.module.css'
import {AppPagination} from '../../common/Pagination/Pagination';
import {SortType} from '../../api/packsAPI';
import Preloader from '../../common/Preloader/Preloader';
import {UniversalSearch} from '../../common/UniversalSearch/UniversalSearch';
import TableSortLabel from '@mui/material/TableSortLabel';
import AppModal from '../AppModal/AppModal';
import TextField from '@mui/material/TextField';
import {CardItem} from '../CardItem/CardItem';


export const Cards = React.memo(() => {
    console.log('render')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
    const showPackId = useAppSelector(state => state.packsList.showPackId)
    const editPackId = useAppSelector(state => state.packsList.editPackId)
    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
    const appStatus = useAppSelector(state => state.app.appStatus)
    const cards = useAppSelector(state => state.cards.cards)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [sort, setSort] = useState<SortType>('0updated')
    const [searchTerm, setSearchTerm] = useState('');

    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const currentPackId = showPackId || editPackId

    useEffect(() => {
        if (searchTerm) {
            dispatch(getCards({
                cardsPack_id: currentPackId,
                page: page + 1,
                pageCount: rowsPerPage,
                cardQuestion: debouncedSearchTerm,
                sortCards: sort
            }))
        } else {
            dispatch(getCards({
                cardsPack_id: currentPackId,
                page: page + 1,
                pageCount: rowsPerPage,
                sortCards: sort
            }))
        }
    }, [dispatch, page, currentPackId, rowsPerPage, debouncedSearchTerm, sort])

    const createNewCardHandler = useCallback((cardsPack_id: string, question: string, answer: string) => {
        dispatch(addNewCard(cardsPack_id, question, answer))
    }, [dispatch])

    const backHandler = useCallback(() => {
        navigate('/mainPage')
    }, [navigate])

    const sortHandler = useCallback(() => {
        if (sort === '1updated') setSort('0updated')
        else setSort('1updated')
    }, [dispatch, sort])

    const sortAnswerHandler = useCallback(() => {
        if (sort === '1answer') setSort('0answer')
        else setSort('1answer')
    }, [dispatch, sort])

    const sortQuestionHandler = useCallback(() => {
        if (sort === '1question') setSort('0question')
        else setSort('1question')
    }, [dispatch, sort])

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return (
        <div className={s.mainContainer}>
            {appStatus === 'succeeded' ?
                <Paper className={s.container} style={{padding: '15px'}}>
                    <Button
                        className={s.btnsBack}
                        style={{borderRadius: '15px', marginLeft: '10px'}}
                        onClick={backHandler}
                        size={'small'}
                        variant={'contained'}
                        color={'primary'}
                        sx={{mt: 3, mb: 2}}>
                        Back
                    </Button>
                    <div className={s.search}>
                        <UniversalSearch setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
                    </div>
                    <div>
                        {editPackId &&
                            <div>
                                <AppModal title={'Add new card'} children={[
                                    <Button
                                        style={{borderRadius: '15px', marginLeft: '10px'}}
                                        className={s.btnsAdd}
                                        size={'small'}
                                        sx={{mt: 3, mb: 2}}
                                        onClick={() => createNewCardHandler(currentPackId, newQuestion, newAnswer)}
                                        variant={'contained'}>
                                        Add Cards
                                    </Button>,
                                    <TextField
                                        key={'2'}
                                        color={'secondary'}
                                        margin="normal"
                                        id="question"
                                        label="New question name"
                                        autoFocus
                                        helperText="Enter new question name"
                                        value={newQuestion}
                                        onChange={(e) => setNewQuestion(e.currentTarget.value)}
                                    />,
                                    <TextField
                                        key={'2'}
                                        color={'secondary'}
                                        margin="normal"
                                        id="answer"
                                        label="New answer value"
                                        autoFocus
                                        helperText="Enter new answer name"
                                        value={newAnswer}
                                        onChange={(e) => setNewAnswer(e.currentTarget.value)}
                                    />
                                ]}/>
                            </div>}
                    </div>
                    {cards.length === 0 ?
                        <div style={{textAlign: 'center', fontSize: '32px', fontWeight: 'bolder'}}>There are no
                            questions</div> : <TableContainer component={Paper} className={s.container}>
                            <Table aria-label="custom pagination table">
                                <TableBody>
                                    <TableRow style={{textAlign: 'left', backgroundColor: 'rgb(184 245 213 / 54%)'}}>
                                        <TableCell align="left">
                                            <TableSortLabel
                                                onClick={sortQuestionHandler}
                                                active={true}
                                                direction={sort === '1question' ? 'asc' : 'desc'}>
                                            </TableSortLabel>
                                            Question
                                        </TableCell>
                                        <TableCell align="center">
                                            <TableSortLabel
                                                onClick={sortAnswerHandler}
                                                active={true}
                                                direction={sort === '1answer' ? 'asc' : 'desc'}>
                                            </TableSortLabel>
                                            Answer
                                        </TableCell>
                                        <TableCell align="right">
                                            <TableSortLabel
                                                onClick={sortHandler}
                                                active={true}
                                                direction={sort === '1updated' ? 'desc' : 'asc'}>
                                            </TableSortLabel>
                                            Last Updated
                                        </TableCell>
                                        <TableCell align="right">Grade</TableCell>
                                        {editPackId ? <TableCell align="right">Action</TableCell> : null}
                                    </TableRow>
                                    {cards.map((card) => {
                                        return <CardItem card={card}/>
                                    })}
                                </TableBody>
                            </Table>
                            <AppPagination
                                setPage={setPage}
                                page={page}
                                totalAmountOfItems={cardsTotalCount}
                                setRowsPerPage={setRowsPerPage}
                                rowsPerPage={rowsPerPage}/>
                        </TableContainer>}
                </Paper>
                : <Preloader/>}
        </div>
    );
});
