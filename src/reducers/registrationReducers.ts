import {setAppError, setAppStatus} from './appReducer';
import {profileAPI} from '../api/profileAPI';
import {ThunkType} from "../store/store";
import {AxiosError} from "axios";
import {handlerErrorUtils} from "../utils/errorUtils";

type InitialStateType = {
    error: string | null
}

const initialState = {
    error: null,
}

export type PayloadType = {
    email: string
    password: string
}

export type RegistrationActionsType = SetRegistrationErrorAT

export const registrationReducers = (state: InitialStateType = initialState, action: RegistrationActionsType): InitialStateType => {
    switch (action.type) {
        case 'REG/SET_REGISTRATION_ERROR': {
            return {error: action.error}
        }
        default:
            return state
    }
}
//action
export const setRegistrationError = (error: string | null) => ({type: 'REG/SET_REGISTRATION_ERROR', error})
type SetRegistrationErrorAT = ReturnType<typeof setRegistrationError>

//thunk
export const createNewUser = (payload: PayloadType): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('inProgress'))
        await profileAPI.createNewUser(payload)
        dispatch(setAppStatus('succeeded'))
    }catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        handlerErrorUtils(err, dispatch)
    }
}