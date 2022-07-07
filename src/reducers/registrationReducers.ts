import {setAppError, setAppStatus} from './appReducer';
import {profileAPI} from '../api/profileAPI';
import {ThunkType} from "../store/store";

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
export const createNewUser = (payload: PayloadType): ThunkType => dispatch => {
    dispatch(setAppStatus('inProgress'))
    profileAPI.createNewUser(payload)
        .then((data) => {
            dispatch(setAppStatus('succeeded'))
        })
        .catch((err) => {
            dispatch(setAppError(err.response.data.error))
            dispatch(setAppStatus('failed'))
        })
}