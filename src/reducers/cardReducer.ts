import axios from "axios"
import { Dispatch } from "redux"
import {cardsAPI, CardType } from "../api/cardsAPI"
import { packsAPI } from "../api/packsAPI"
import {AppActionsType, setAppError } from "./appReducer"

const initialState =[
    {
    _id: '' ,
    cardsPack_id: '' ,
    user_id: '' ,
    answer: '' ,
    question: '' ,
    grade: 0 ,
    shots: 0 ,
    comments: '' ,
    type: '' ,
    rating: 0 ,
    more_id: '' ,
    created: '' ,
    updated: '' ,
    __v: 0
},
]

export type cardsReducerActionType = AppActionsType | ReturnType<typeof setCardQuestionsAC>
export const cardReducer = (state: CardType[] = initialState , action: cardsReducerActionType) => {
    switch (action.type) {
        case "CARDS/SET_QUESTIONS":
            return [...action.payload]

        default:
            return state
    }
}

const setCardQuestionsAC = (payload: CardType[]) => (
    {type: 'CARDS/SET_QUESTIONS' , payload} as const
)

export const GetCardsTC =  (cardsPack_id: string) => {
   return async (dispatch: Dispatch<cardsReducerActionType>) => {
       const res = await cardsAPI.getCards({cardsPack_id})
       try {
            dispatch(setCardQuestionsAC(res.data.cards))
        } catch (err:unknown) {
           if (axios.isAxiosError(err)){
               if(err.response){
                   dispatch(setAppError(err.message))
               }
           }
            console.log(err)

        }
    }
}

export const getPacksByParamsTC = (min:number, max:number)=>{
    return async (dispatch: Dispatch<cardsReducerActionType>)=>{
      const res = await  packsAPI.getPacks({min,max,pageCount:8})
        try {
            console.log(res)
        }
        catch (err) {
            if (axios.isAxiosError(err)){
                if(err.response){
                    dispatch(setAppError(err.message))
                }
            }
            console.log(err)
        }
    }
}

export const searchPacks = (packName:string)=>{
    return async (dispatch: Dispatch<cardsReducerActionType>)=>{
        const res = await  packsAPI.getPacks({packName,pageCount:8})
        try {
            console.log(res)
        }
        catch (err) {
            if (axios.isAxiosError(err)){
                if(err.response){
                    dispatch(setAppError(err.message))
                }
            }
            console.log(err)
        }
    }
}

// export const GetCardsTC = (cardsPack_id: string) => {
//     return (dispatch: Dispatch<cardsReducerActionType>) => {
//         cardsAPI.getCards({cardsPack_id})
//             .then((res)=>{
//                 console.log(res)
//             })
//             .catch((e)=>{
//                 console.log(e)
//             })
//         dispatch(setCardQuestionsAC(initialState))
//
//     }
// }