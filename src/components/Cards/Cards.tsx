import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import {addNewCard, getCards, removeCard, updateCard} from "../../reducers/cardsReducer";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import TableFooter from "@mui/material/TableFooter";
import {Rating} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";


export const Cards = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    debugger
    const showPackId = useAppSelector(state => state.packsList.showPackId)
    const editPackId = useAppSelector(state => state.packsList.editPackId)

    const cards = useAppSelector(state => state.cards.cards)

    const currentPack = showPackId || editPackId

    useEffect(() => {
            dispatch(getCards({cardsPack_id: currentPack}))
    }, [dispatch])


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

    return (
        <div style={{margin: '30px auto'}}>
            <div>
                <Paper style={{padding: '20px'}}>
                    <Button onClick={backHandler}
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
                            size={'small'}
                            sx={{mt: 3, mb: 2}}
                            onClick={() => createNewCardHandler(currentPack, 'Some question', 'Some answer')}
                            variant={'contained'}>
                            Add Cards
                        </Button>}
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="custom pagination table">
                                <TableBody style={{background: '#87f3b9', fontWeight: 'bold', width: '160px', color: '#fff'}}>
                                    <TableRow style={{textAlign: 'left'}}>
                                        <TableCell align="left">Question</TableCell>
                                        <TableCell align="center">Answer</TableCell>
                                        <TableCell align="right" onClick={() => {
                                        }}>Last Updated</TableCell>
                                        <TableCell align="right">Grade</TableCell>
                                        { editPackId ? <TableCell align="right">Action</TableCell> : <TableCell align="right"></TableCell>}
                                    </TableRow>
                                    {cards.map((card) => {
                                        debugger
                                        return <TableRow key={card._id} style={{border: 5, background: '#F8F7FD'}}>
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
                                            <TableCell style={{width: 150}} align="right">
                                                {editPackId && <Button
                                                    size={'small'}
                                                    variant={'contained'}
                                                    color={'warning'}
                                                    sx={{mt: 3, mb: 2}}
                                                    onClick={() => deleteCardsHandler(card._id)}>
                                                    Delete
                                                </Button>}
                                                {editPackId && <Button
                                                    size={'small'}
                                                    sx={{mt: 3, mb: 2}}
                                                    onClick={() => updateCardsHandler(card._id, 'Update question')}
                                                    variant={'contained'}>
                                                    Edit
                                                </Button>}
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
                </Paper>
            </div>
        </div>
    );
};
