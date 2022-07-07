import {authAPI} from "../api/authAPI";
import {AppActionsType} from "./appReducer";
import {ThunkType} from "../store/store";
import {AxiosError} from "axios";
import {handlerErrorUtils} from "../utils/errorUtils";

type RestorePWStatusType = 'not sent' | 'onprogress' | 'sent' | 'failed'

const initialStateRestorePW: RestoreStatePWType = {
    isPWSent: 'not sent'

}
export type RestoreStatePWType = {
    isPWSent: RestorePWStatusType
}

export const restorePWReducers = (state: RestoreStatePWType = initialStateRestorePW, action: RestorePWActionsType) => {
    switch (action.type) {
        case "RESTORE_PW/SET_PW_STATUS":
            return {...state, isPWSent: action.status}
        default:
            return state
    }
}
//action
export const setPWStatusAC = (status: RestorePWStatusType) => ({type: 'RESTORE_PW/SET_PW_STATUS', status} as const)
export type RestorePWActionsType = ReturnType<typeof setPWStatusAC> | AppActionsType

//thunk
export const restorePWTC = (email: string): ThunkType => async dispatch => {
    try {
        dispatch(setPWStatusAC('onprogress'))
        await authAPI.restorePW(email)
        dispatch(setPWStatusAC('sent'))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        handlerErrorUtils(err, dispatch)
    }
}

export const setNewPWTC = (password: string, resetPasswordToken: string): ThunkType => async dispatch => {
    try {
        dispatch(setPWStatusAC('onprogress'))
        await authAPI.setNewPW(password, resetPasswordToken)
        dispatch(setPWStatusAC('sent'))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        handlerErrorUtils(err, dispatch)
    }
}