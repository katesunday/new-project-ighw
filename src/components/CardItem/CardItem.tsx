import React, {useCallback, useState} from 'react';
import TableCell from '@mui/material/TableCell';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import AppModal from '../AppModal/AppModal';
import TextField from '@mui/material/TextField';
import TableRow from '@mui/material/TableRow';
import {CardType} from '../../api/cardsAPI';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {removeCard, updateCard} from '../../reducers/cardsReducer';
import s from './CardItem.module.css'

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
                <AppModal title={'delete'} description={'Are you really want to delete this card?'} children={
                    <Button
                        key={'1'}
                        style={{borderRadius: '30px'}}
                        size={'small'}
                        variant={'contained'}
                        color={'error'}
                        sx={{mt: 3, mb: 2}}
                        onClick={() => deleteCardsHandler(card._id)}>
                        Delete
                    </Button>
                }/>
                <AppModal description={'Edit card menu'} title={'Edit'} key={'10'} children={[
                    <TextField
                        className={s.input}
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
                        className={s.input}
                        key={'4'}
                        color={'secondary'}
                        margin="normal"
                        id="answer"
                        label="New answer value"
                        autoFocus
                        helperText="Enter answer name"
                        value={answer}
                        onChange={(e) => setAnswer(e.currentTarget.value)}/>,
                    <Button
                        key={'2'}
                        style={{borderRadius: '30px'}}
                        size={'small'}
                        sx={{mt: 3, mb: 2}}
                        onClick={() => updateCardsHandler(card._id, question, answer)}
                        variant={'contained'}>
                        Edit Card
                    </Button>
                ]}/>
            </TableCell>}
        </TableRow>
    );
})

