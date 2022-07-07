import {cardsAPI, CardsParams, CardType} from "../api/cardsAPI";
import {ThunkType} from "../store/store";
import {setAppError, setAppStatus} from "./appReducer";
import axios, {AxiosError} from "axios";

type InitialStateType = CardsInfoType & {
    cards: CardType[]
    sortCards: string
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string
    min: number
    max: number
}

type CardsInfoType = {
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

const initialState: InitialStateType = {
    cards: [],
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 0,
    page: 1,
    pageCount: 8,
    packUserId: '',

    sortCards: '',
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    min: 0,
    max: 0
}

export type CardsReducerActionType = | SetCardsType | SetDeleteCardType | SetUpdateCardType

export const cardsReducer = (state: InitialStateType = initialState, action: CardsReducerActionType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return {...state, cards: [...action.cards], cardsTotalCount: action.cardsTotalCount}

        case "CARDS/DELETE-CARD":
            return {...state, cards: state.cards.filter(card => card._id !== action.id)}

        case "CARDS/UPDATE-CARD":
            return {
                ...state,
                cards: state.cards.map(card => card._id === action.id ? {...card, question: action.question} : card)
            }

        default:
            return state
    }
}

// actions
export const setCards = (cards: CardType[], cardsTotalCount: number) => ({
    type: 'CARDS/SET-CARDS',
    cards,
    cardsTotalCount
} as const)
export type SetCardsType = ReturnType<typeof setCards>

export const setDeleteCard = (id: string) => ({type: 'CARDS/DELETE-CARD', id} as const)
export type SetDeleteCardType = ReturnType<typeof setDeleteCard>

export const setUpdateCard = (id: string, question: string) => ({type: 'CARDS/UPDATE-CARD', id, question} as const)
export type SetUpdateCardType = ReturnType<typeof setUpdateCard>

// thunk
export const getCards = (payload: CardsParams): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('inProgress'))
        dispatch(setCards([], 0))
        const res = await cardsAPI.getCards(payload)
        dispatch(setCards(res.data.cards, res.data.cardsTotalCount))
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(setAppError(error))
        } else {
            dispatch(setAppError(`Native error ${err.message}`))
            dispatch(setAppStatus('failed'))
        }
    }
}

export const addNewCard = (cardsPack_id: string, question: string, answer: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('inProgress'))
        await cardsAPI.addNewCard(cardsPack_id, question, answer)
        dispatch(setAppStatus('succeeded'))
        dispatch(getCards({cardsPack_id}))
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(setAppError(error))
        } else {
            dispatch(setAppError(`Native error ${err.message}`))
            dispatch(setAppStatus('failed'))
        }
    }
}

export const removeCard = (id: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('inProgress'))
        await cardsAPI.deleteCard(id)
        dispatch(setDeleteCard(id))
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(setAppError(error))
        } else {
            dispatch(setAppError(`Native error ${err.message}`))
            dispatch(setAppStatus('failed'))
        }
    }
}

export const updateCard = (id: string, question: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('inProgress'))
        await cardsAPI.updateCard(id, question)
        dispatch(setUpdateCard(id, question))
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(setAppError(error))
        } else {
            dispatch(setAppError(`Native error ${err.message}`))
            dispatch(setAppStatus('failed'))
        }
    }
}

