import {authAPI} from "../api/authAPI";
import {AppActionsType, setAppError} from "./appReducer";
import {ThunkType} from "../store/store";

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
export const restorePWTC = (email: string): ThunkType => dispatch => {
    dispatch(setPWStatusAC('onprogress'))
    authAPI.restorePW(email)
        .then((res) => {
            console.log(res)
            dispatch(setPWStatusAC('sent'))
        })
        .catch((res) => {
            dispatch(setPWStatusAC('failed'))
            dispatch(setAppError(res.response.data.error))
            console.log(res)
        })
}
export const setNewPWTC = (password: string, resetPasswordToken: string): ThunkType => dispatch => {
    dispatch(setPWStatusAC('onprogress'))
    authAPI.setNewPW(password, resetPasswordToken)
        .then((res) => {
            console.log(res)
            dispatch(setPWStatusAC('sent'))
        })
        .catch((res) => {
            dispatch(setPWStatusAC('failed'))
            dispatch(setAppError(res.response.data.error))
            console.log(res)
        })
}