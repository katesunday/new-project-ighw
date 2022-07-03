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



export const Cards = () => {

    const dispatch = useAppDispatch()

    const currentPack = useAppSelector(state => state.packsList.learnPackId)
    const cards = useAppSelector(state => state.cards.cards)

    useEffect(()=> {
        if (currentPack)
            dispatch(getCards({cardsPack_id:currentPack}))
    },[dispatch])


    const createNewCardHandler = (cardsPack_id: string, question: string, answer: string) => {
        dispatch(addNewCard(cardsPack_id, question, answer))
    }

    const deleteCardsHandler = (id: string) => {
        dispatch(removeCard(id))
    }

    const updateCardsHandler = (id: string, question: string) => {
        dispatch(updateCard(id, question))
    }

    return (
        <div style={{margin: '30px auto'}}>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 500}} aria-label="custom pagination table">
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">Question</TableCell>
                                <TableCell align="center">Answer</TableCell>
                                <TableCell align="right" onClick={()=> {}}>Last Updated</TableCell>
                                <TableCell align="right">Grade</TableCell>
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
                                        {card.grade}
                                    </TableCell>
                                    <TableCell style={{width: 150}} align="right">
                                        <Button sx={{mt: 3, mb: 2}}
                                                onClick={()=> createNewCardHandler(card.cardsPack_id, 'Some question', 'Some answer')}
                                                variant={'contained'}>
                                            Add Cards
                                        </Button>
                                        <Button sx={{mt: 3, mb: 2}}
                                                onClick={() => deleteCardsHandler(card._id)}
                                                variant={'contained'}>
                                            Delete
                                        </Button>
                                        <Button sx={{mt: 3, mb: 2}}
                                                onClick={() => updateCardsHandler(card._id, 'Update question')}
                                                variant={'contained'}>
                                            Edit
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
        </div>
    );
};
