import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button/Button';
import React , {useCallback , useEffect , useState} from 'react';
import s from './TrainCard.module.css'
import {useAppDispatch , useAppSelector} from '../../utils/hooks';
import {editPack , Pack , showPack} from '../../reducers/packListsReducer';
import {Navigate , useNavigate} from 'react-router-dom';
import {getCards, gradeCard} from '../../reducers/cardsReducer';
import Preloader from '../../common/Preloader/Preloader';
import {CardType} from '../../api/cardsAPI';
import {getRandomCard} from '../../utils/mathRandom';
import { useFormik } from 'formik';

export const TrainCard = React.memo(() => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isLoggedIn = useAppSelector(state => state.app.isLoggedIn)
    const cardsArray = useAppSelector(state => state.cards.cards)
    const userId = useAppSelector(state => state.profile._id)
    const currentPack = useAppSelector(state => {
        const pack = state.packsList.packs.find(item => item._id === state.packsList.learnPackId)
        if (pack) return pack
    })

    const [questionNo , setQuestionNo] = useState(0)
    const [answer , showAnswer] = useState(false)
    const [currentArray , setCurrentArray] = useState<CardType[] | null>(null)
    const [randomCard , setRandomCard] = useState<CardType | null>(null)
    const [grade,setGrade] = useState(0)


    useEffect(() => {
        currentPack && dispatch(getCards({cardsPack_id: currentPack._id , pageCount: 100}))
    } , [dispatch])

    useEffect(() => {
        if (cardsArray.length > 0) {
            setCurrentArray(cardsArray)
            setRandomCard(getRandomCard(cardsArray))
        }
    } , [cardsArray])


    const nextQuestionHandler = useCallback(() => {
        randomCard && dispatch(gradeCard(grade,randomCard._id))
        setQuestionNo(questionNo + 1)
        currentArray && setRandomCard(getRandomCard(currentArray))
        showAnswer(false)

    } , [questionNo,grade])

    const doneHandler = useCallback(() => {
        if (currentPack && userId === cardsArray[questionNo].user_id) {
            dispatch(editPack(currentPack._id))
            navigate('/mainPage/cards')
        } else {
            if (currentPack) {
                dispatch(showPack(currentPack._id))
                navigate('/mainPage/cards')
            }
        }
    } , [dispatch , navigate , currentPack , cardsArray , questionNo , userId])

    const cancelHandler = useCallback(() => {
        navigate('/mainPage')
    } , [navigate])


    if (cardsArray.length === 0 || randomCard === null) {
        return <Preloader/>
    }
    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return (
        <Paper className={s.trainDiv}>
            <div>Learn {currentPack ? `'${currentPack.name}'` : ''}</div>

            <div>Question №{questionNo + 1}: {randomCard.question} </div>
            {answer && <div>Answer: {randomCard.answer} </div>}

            {answer &&
                <div>

                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Rate yourself</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="1"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="1" control={<Radio/>} label="Did not know"
                        onChange = {()=>setGrade(1)}/>
                        <FormControlLabel value="2" name="grade" control={<Radio/>} label="Forgot"
                                          onChange = {()=>setGrade(2)}/>
                        <FormControlLabel value="3" name="grade" control={<Radio/>} label="A lot of thought"
                                          onChange = {()=>setGrade(3)}/>
                        <FormControlLabel value="4" name="grade" control={<Radio/>} label="Partly answered"
                                          onChange = {()=>setGrade(4)}/>
                        <FormControlLabel value="5" control={<Radio/>} label="Knew the answer"
                                          onChange = {()=>setGrade(5)}/>
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

                {answer && questionNo === cardsArray.length - 1 ? 
                    <Button onClick={doneHandler} 
                            variant="contained"
                            sx={{mt: 3 , mb: 2}}>
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