import {authAPI} from "../api/authAPI";
import {Dispatch} from "redux";
import {AppActionsType , setAppError} from "./appReducer";
type RestorePWStatusType = 'not sent' | 'onprogress' | 'sent' | 'failed'

const initialStateRestorePW:initialStateRestorePWType = {
    isPWSent: 'not sent'
}
export type initialStateRestorePWType = {
    isPWSent:RestorePWStatusType
}

export type restorePWActionsType = ReturnType<typeof setPWStatusAC> | AppActionsType
export const restorePWReducers = (state:initialStateRestorePWType = initialStateRestorePW,action:restorePWActionsType)=>{
    switch (action.type){
        case "RESTORE_PW/SET_PW_STATUS":
            return {...state,isPWSent:action.status}
        default: return state
    }
}

export const setPWStatusAC = (status:RestorePWStatusType)=>(
    { type:'RESTORE_PW/SET_PW_STATUS', status} as const
)

export const restorePWTC = (email:string)=>{
    return(dispatch:Dispatch<restorePWActionsType>)=>{
        dispatch(setPWStatusAC('onprogress'))
        authAPI.restorePW(email)
            .then((res)=>{
                console.log(res)
                dispatch(setPWStatusAC('sent'))
            })
            .catch((res)=>{
                dispatch(setPWStatusAC('failed'))
                dispatch(setAppError(res.response.data.error))
                console.log(res)
            })
    }
}
export const setNewPWTC = (password:string,resetPasswordToken:string)=>{
    return(dispatch:Dispatch<restorePWActionsType>)=>{
        dispatch(setPWStatusAC('onprogress'))
        authAPI.setNewPW(password,resetPasswordToken)
            .then((res)=>{
                console.log(res)
                dispatch(setPWStatusAC('sent'))
            })
            .catch((res)=>{
                dispatch(setPWStatusAC('failed'))
                dispatch(setAppError(res.response.data.error))
                console.log(res)
            })
    }
}