import {FormControl , FormControlLabel , FormLabel , Radio , RadioGroup} from '@mui/material';
import Button from '@mui/material/Button/Button';
import React, { useEffect, useState } from 'react';
import s from './TrainCard.module.css'
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import { GetCardsTC } from '../../reducers/cardReducer';
import { Navigate, NavLink } from 'react-router-dom';

type TrainCardPropsType = {
    packName:string
    cardID:string
}


const TrainCard = (props:TrainCardPropsType) => {
    const dispatch = useAppDispatch()

    const cardsArray = useAppSelector(state=>state.card)
    const [questionNo,setQuestionNo] = useState(0)

    useEffect(() => {
        dispatch(GetCardsTC(props.cardID))
    } , [])

    const [answer,showAnswer] = useState(false)

    const nextQuestionHandler = () => {
        setQuestionNo(questionNo+1)
        showAnswer(false)
    }

    return (
        <div className={s.trainDiv}>
            <div>Learn '{props.packName}'</div>

            <div>Question №{questionNo+1}: {cardsArray[questionNo].question} </div>
            {answer &&  <div>Answer: {cardsArray[questionNo].answer} </div> }

            {answer && <div>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Rate yourself</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="1"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="1" control={<Radio/>} label="Did not know"/>
                        <FormControlLabel value="2" control={<Radio/>} label="Forgot"/>
                        <FormControlLabel value="3" control={<Radio/>} label="A lot of thought"/>
                        <FormControlLabel value="4" control={<Radio/>} label="Partly answered"/>
                        <FormControlLabel value="5" control={<Radio/>} label="Knew the answer"/>
                    </RadioGroup>
                </FormControl>
            </div> }

            <div className={s.navBtns}>
                <Button
                    variant="contained"
                    sx={{mt: 3 , mb: 2}}
                >
                    Cancel
                </Button>

                { answer && questionNo===cardsArray.length-1  ? <Button
                    variant="contained"
                    sx={{mt: 3 , mb: 2}}
                >
                    <NavLink to='/mainPage'>Done</NavLink>

                </Button> :   answer?   <Button
                            variant="contained"
                            sx={{mt: 3 , mb: 2}}
                            onClick = {nextQuestionHandler}
                        >
                            Next
                        </Button> :
                        <Button
                            variant="contained"
                            sx={{mt: 3 , mb: 2}}
                            onClick = {()=>showAnswer(true)}
                        >
                            Show answer
                        </Button> }

            </div>


        </div>
    );
};

export default TrainCard;