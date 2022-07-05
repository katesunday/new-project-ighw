import {FormControl , FormControlLabel , FormLabel , Radio , RadioGroup} from '@mui/material';
import Button from '@mui/material/Button/Button';
import React, { useEffect, useState } from 'react';
import s from './TrainCard.module.css'
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {Pack} from '../../reducers/packListsReducer';
import { useNavigate } from 'react-router-dom';
import {getCards} from '../../reducers/cardsReducer';



const TrainCard = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const currentPack = useAppSelector(state => {
        if(state.packsList.packs && state.packsList.learnPackId) {
            const pack = state.packsList.packs.find(item => item._id === state.packsList.learnPackId)
            if (pack) return pack
        }
        else return {} as Pack
    })

    const cardsArray = useAppSelector(state => state.card)

    const [questionNo,setQuestionNo] = useState(0)

    useEffect(() => {
       if(currentPack) dispatch(getCards({cardsPack_id: currentPack._id}))
    } , [])

    const [answer,showAnswer] = useState(false)

    const nextQuestionHandler = () => {
        setQuestionNo(questionNo+1)
        showAnswer(false)
    }

    const doneHandler = () => {
        navigate('/mainPage/cards')
    }

    const cancelHandler = () => {
        navigate('/mainPage')
    }
    return (
        <div className={s.trainDiv}>
            <div>Learn {currentPack ? `'${currentPack.name}'` : ''}</div>

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
                <Button onClick={cancelHandler}
                    variant="contained"
                    sx={{mt: 3 , mb: 2}}
                >
                    Cancel
                </Button >

                { answer && questionNo === cardsArray.length-1  ? <Button onClick={doneHandler}
                    variant="contained"
                    sx={{mt: 3 , mb: 2}}
                >
                    Done
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