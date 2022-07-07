import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button/Button';
import React, {useCallback, useEffect, useState} from 'react';
import s from './TrainCard.module.css'
import {useAppDispatch , useAppSelector} from '../../utils/hooks';
import {editPack, Pack, showPack} from '../../reducers/packListsReducer';
import {useNavigate} from 'react-router-dom';
import {getCards} from '../../reducers/cardsReducer';
import Preloader from '../../common/Preloader/Preloader';

export const TrainCard = React.memo( () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const cardsArray = useAppSelector(state => state.cards.cards)
    const userId = useAppSelector(state => state.profile._id)
    const currentPack = useAppSelector(state => {
        if (state.packsList.packs && state.packsList.learnPackId) {
            const pack = state.packsList.packs.find(item => item._id === state.packsList.learnPackId)
            if (pack) return pack
        }
         else return {} as Pack
    })

    const [questionNo , setQuestionNo] = useState(0)
    const [answer , showAnswer] = useState(false)

    useEffect(() => {
        currentPack && dispatch(getCards({cardsPack_id: currentPack._id}))

    } , [dispatch,currentPack])

    const nextQuestionHandler = useCallback(() => {
        setQuestionNo(questionNo + 1)
        showAnswer(false)
    }, [questionNo])

    const doneHandler = useCallback(() => {
        if(currentPack && userId === cardsArray[questionNo].user_id  ){
            dispatch(editPack(currentPack._id))
            navigate('/mainPage/cards')
        }
        else{
           if (currentPack) {
               dispatch(showPack(currentPack._id))
               navigate('/mainPage/cards')
           }
        }
    }, [dispatch, navigate, currentPack, cardsArray, questionNo, userId])

    const cancelHandler = useCallback( () => {
        navigate('/mainPage')
    }, [navigate])

     if(cardsArray.length ===0){
         return <Preloader/>
     }

    return (
        <Paper className={s.trainDiv}>
            <div>Learn {currentPack ? `'${currentPack.name}'` : ''}</div>

            <div>Question №{questionNo + 1}: {cardsArray[questionNo].question} </div>
            {answer && <div>Answer: {cardsArray[questionNo].answer} </div>}

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
            </div>}

            <div className={s.navBtns}>
                <Button onClick={cancelHandler}
                        variant="contained"
                        sx={{mt: 3 , mb: 2}}
                >
                    Cancel
                </Button>

                {answer && questionNo === cardsArray.length - 1 ? <Button onClick={doneHandler}
                                                                          variant="contained"
                                                                          sx={{mt: 3 , mb: 2}}
                >
                    Done
                </Button> : answer ? <Button
                        variant="contained"
                        sx={{mt: 3 , mb: 2}}
                        onClick={nextQuestionHandler}
                    >
                        Next
                    </Button> :
                    <Button
                        variant="contained"
                        sx={{mt: 3 , mb: 2}}
                        onClick={() => showAnswer(true)}
                    >
                        Show answer
                    </Button>}
            </div>
        </Paper>
    );
});