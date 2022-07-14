import React, {useCallback, useState} from 'react';
import TableCell from '@mui/material/TableCell';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import s from '../Cards/Cards.module.css';
import AppModal from '../AppModal/AppModal';
import TextField from '@mui/material/TextField';
import TableRow from '@mui/material/TableRow';
import {CardType} from '../../api/cardsAPI';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {removeCard, updateCard} from '../../reducers/cardsReducer';

type CardItemPropsType = {
    card: CardType
}

export const CardItem: React.FC<CardItemPropsType> = React.memo(({card}) => {
    const dispatch = useAppDispatch()

    const editPackId = useAppSelector(state => state.packsList.editPackId)

    const [question, setQuestion] = useState(card.question)
    const [answer, setAnswer] = useState(card.answer)

    const deleteCardsHandler = useCallback((id: string) => {
        dispatch(removeCard(id))
    }, [dispatch])

    const updateCardsHandler = useCallback((id: string, question: string, answer: string) => {
        dispatch(updateCard(id, question, answer))
    }, [dispatch])

    return (
        <TableRow key={card._id}>
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
                    value={card.grade}
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
                />
            </TableCell>
            {editPackId && <TableCell style={{width: 150}} align="right">
                <Button
                    key={'1'}
                    style={{margin: '5px'}}
                    className={s.btnsDelete}
                    size={'small'}
                    variant={'contained'}
                    color={'error'}
                    sx={{mt: 3, mb: 2}}
                    onClick={() => deleteCardsHandler(card._id)}>
                    Delete
                </Button>
                <AppModal title={'Edit'} key={'10'} children={[
                    <Button
                        key={'2'}
                        style={{borderRadius: '15px', marginLeft: '10px'}}
                        className={s.btnsAdd}
                        size={'small'}
                        sx={{mt: 3, mb: 2}}
                        onClick={() => updateCardsHandler(card._id, question, answer)}
                        variant={'contained'}>
                        Edit Card
                    </Button>,
                    <TextField
                        key={'3'}
                        color={'secondary'}
                        margin="normal"
                        id="question"
                        label="New question name"
                        autoFocus
                        helperText="Enter question name"
                        value={question}
                        onChange={(e) => setQuestion(e.currentTarget.value)}
                    />,
                    <TextField
                        key={'4'}
                        color={'secondary'}
                        margin="normal"
                        id="answer"
                        label="New answer value"
                        autoFocus
                        helperText="Enter answer name"
                        value={answer}
                        onChange={(e) => setAnswer(e.currentTarget.value)}/>
                ]}/>
            </TableCell>}
        </TableRow>
    );
})

