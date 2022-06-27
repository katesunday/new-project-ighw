import {Dispatch} from 'redux';
import {registrationAPI} from '../api/registrationAPI';
import {AppActionsType, setAppStatus} from './appReducer';

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

type RegistrationActionsType = SetRegistrationErrorAT

export const registrationReducers = (state: InitialStateType = initialState, action: RegistrationActionsType): InitialStateType => {
    switch (action.type) {
        case 'REG/SET_REGISTRATION_ERROR': {
            return {error: action.error}
        }
        default: return state
    }
}

export const setRegistrationError = (error: string | null) => ({type: 'REG/SET_REGISTRATION_ERROR', error})
type SetRegistrationErrorAT = ReturnType<typeof setRegistrationError>

export const createNewUser = (payload: PayloadType) => (dispatch: Dispatch<RegistrationActionsType | AppActionsType>) => {
    dispatch(setAppStatus('inProgress'))
        registrationAPI.createNewUser(payload)
            .then(data => {
                if(!data.error) {
                    dispatch(setAppStatus('succeeded'))
                } else {
                    dispatch(setRegistrationError(data.error))
                    dispatch(setAppStatus('failed'))
                }
            })
            .catch(err => {
                dispatch(setRegistrationError(err.response.data.error))
                dispatch(setAppStatus('failed'))
            })
            .finally(() => dispatch(setAppStatus('empty')))
}