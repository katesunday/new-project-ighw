import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import {addNewCard, getCards, removeCard,updateCard} from "../../reducers/cardsReducer";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import TableFooter from "@mui/material/TableFooter";
import Rating from "@mui/material/Rating";
import StarIcon from '@mui/icons-material/Star';
import TextField from "@mui/material/TextField";
import {useNavigate} from "react-router-dom";
import s from './Cards.module.css'
import {AppPagination} from "../../common/Pagination/Pagination";
import {SortType} from "../../api/packsAPI";
import Preloader from "../../common/Preloader/Preloader";


export const Cards = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const showPackId = useAppSelector(state => state.packsList.showPackId)
    const editPackId = useAppSelector(state => state.packsList.editPackId)
    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
    const appStatus = useAppSelector(state => state.app.appStatus)
    const cards = useAppSelector(state => state.cards.cards)

    const [page, setPage] = useState(1)

    const amountOfCards = Math.ceil(cardsTotalCount / 8)

    const currentPack = showPackId || editPackId

    useEffect(() => {
        dispatch(getCards({cardsPack_id: currentPack, page, pageCount: 8}))
    }, [dispatch, page, currentPack])

    const createNewCardHandler = (cardsPack_id: string, question: string, answer: string) => {
        dispatch(addNewCard(cardsPack_id, question, answer))
    }

    const deleteCardsHandler = (id: string) => {
        dispatch(removeCard(id))
    }

    const updateCardsHandler = (id: string, question: string) => {
        dispatch(updateCard(id, question))
    }

    const backHandler = () => {
        navigate('/mainPage')
    }

    const [sort, setSort] = useState<SortType>('0updated')

    const sortHandler = () => {
        if (sort === '0updated') {
            dispatch(getCards({cardsPack_id: currentPack, page, pageCount: 8, sortCards: '0updated'}))
            setSort('1updated')
        } else {
            dispatch(getCards({cardsPack_id: currentPack, page, pageCount: 8, sortCards: '1updated'}))
            setSort('0updated')
        }
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
                    <div>
                        <TextField
                            style={{width: '48%', marginLeft: '10px'}}
                            margin={'normal'}
                            size={'small'}
                            placeholder={'Question'}
                        />
                        <TextField
                            style={{width: '48%', marginLeft: '10px'}}
                            margin={'normal'}
                            size={'small'}
                            placeholder={'Answer'}
                        />
                    </div>
                    <div>
                        {editPackId && <Button
                            style={{borderRadius: '15px', marginLeft: '10px'}}
                            className={s.btnsAdd}
                            size={'small'}
                            sx={{mt: 3, mb: 2}}
                            onClick={() => createNewCardHandler(currentPack, 'Xander Card', 'Xander answer')}
                            variant={'contained'}>
                            Add Cards
                        </Button>}
                    </div>
                    <TableContainer component={Paper} className={s.container}>
                        <Table aria-label="custom pagination table">
                            <TableBody>
                                <TableRow style={{textAlign: 'left', backgroundColor: 'rgb(184 245 213 / 54%)'}}>
                                    <TableCell align="left">Question</TableCell>
                                    <TableCell align="center">Answer</TableCell>
                                    <TableCell align="right" onClick={sortHandler}>Last Updated</TableCell>
                                    <TableCell align="right">Grade</TableCell>
                                    {editPackId ? <TableCell align="right">Action</TableCell> :
                                        <TableCell align="right"></TableCell>}
                                </TableRow>
                                {cards.map((card) => {
                                    return <TableRow key={card._id}>
                                        <TableCell component="th" scope="row">
                                            {card.question}
                                        </TableCell>
                                        <TableCell style={{width: 150}} align="right">
                                            {card.answer}
                                        </TableCell>
                                        <TableCell style={{width: 150}} align="right">
                                            {card.updated.split('T')[0].replace(/-/gi, '.')}
                                        </TableCell>
                                        <TableCell style={{width: 150}} align="right">
                                            <Rating
                                                name="simple-controlled"
                                                value={3}
                                                readOnly
                                                precision={0.5}
                                                emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
                                            />
                                        </TableCell>
                                        {editPackId && <TableCell style={{width: 150}} align="right">
                                            <Button
                                                style={{margin: '5px'}}
                                                className={s.btnsDelete}
                                                size={'small'}
                                                variant={'contained'}
                                                color={'error'}
                                                sx={{mt: 3, mb: 2}}
                                                onClick={() => deleteCardsHandler(card._id)}>
                                                Delete
                                            </Button>
                                            <Button
                                                style={{margin: '5px'}}
                                                className={s.btnsEdit}
                                                color={'secondary'}
                                                size={'small'}
                                                sx={{mt: 3, mb: 2}}
                                                onClick={() => updateCardsHandler(card._id, 'Update question')}
                                                variant={'contained'}>
                                                Edit
                                            </Button>
                                        </TableCell>}
                                    </TableRow>
                                })}
                            </TableBody>
                            <TableFooter style={{paddingBottom:'10px'}}>
                                <AppPagination setPage={setPage} page={page} amountOfPages={amountOfCards}/>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Paper>
                : <Preloader/>}
        </div>
    );
};
