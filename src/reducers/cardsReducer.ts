import {cardsAPI, CardsParams, CardType} from "../api/cardsAPI";
import {ThunkType} from "../store/store";
import {setAppError, setAppStatus} from "./appReducer";

export type OrderType = 'desc' | 'asc'
type InitialStateType = CardsInfoType & {
    cards: CardType[]
    sortCards: string
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string
    min: number
    max: number
    order: OrderType
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
    pageCount: 5,
    packUserId: '',

    sortCards: '',
    order: 'desc',
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    min: 0,
    max: 0
}

export const cardsReducer = (state: InitialStateType = initialState, action: CardsReducerActionType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return { ...state, cards: action.cards }
        default:
            return state
    }
}

export type CardsReducerActionType = ReturnType<typeof setCards>

// actions
export const setCards = (cards: CardType[]) => ({type: 'CARDS/SET-CARDS', cards} as const)

// thunk
export const getCards = (payload: CardsParams): ThunkType => dispatch => {
    dispatch(setAppStatus('inProgress'))
    cardsAPI.getCards(payload)
        .then(res => {
            dispatch(setCards(res.data.cards))
            dispatch(setAppStatus('succeeded'))
        })
        .catch(err => {
            dispatch(setAppError(err.response.data.error))
            dispatch(setAppStatus('failed'))
        })
}
export const addNewCard = (cardsPack_id: string, question: string, answer: string): ThunkType => dispatch => {
    dispatch(setAppStatus('inProgress'))
    cardsAPI.addNewCard(cardsPack_id, question, answer)
        .then(res => {
            dispatch(getCards({cardsPack_id}))
            dispatch(setAppStatus('succeeded'))
        })
        .catch(err => {
            dispatch(setAppError(err.response.data.error))
            dispatch(setAppStatus('failed'))
        })
}

export const removeCard = (id: string): ThunkType => dispatch => {
    dispatch(setAppStatus('inProgress'))
    cardsAPI.deleteCard(id)
        .then(res => {
            dispatch(setAppStatus('succeeded'))
        })
        .catch(err => {
            dispatch(setAppError(err.response.data.error))
            dispatch(setAppStatus('failed'))
        })
}

export const updateCard = (id: string, question: string): ThunkType => dispatch => {
    dispatch(setAppStatus('inProgress'))
    cardsAPI.updateCard(id, question)
        .then(res => {
            dispatch(setAppStatus('succeeded'))
        })
        .catch(err => {
            dispatch(setAppError(err.response.data.error))
            dispatch(setAppStatus('failed'))
        })
}

