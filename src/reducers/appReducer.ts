import {authAPI} from "../api/authAPI";
import {LoginActionsType, setIsLoggedInAC} from "./loginReducers";
import {ProfileActionTypes, setProfileData} from "./profileReducers";
import {AxiosError} from "axios";
import {Dispatch} from "redux";

export type AppStatusType = 'succeeded' | 'inProgress' | 'failed' | 'empty'
export type AppInitializeStatusType = 'success' | 'inProgress'

type AppStateType = {
    appStatus: AppStatusType,
    appInitializing: AppInitializeStatusType,
    error: string | null
    isInitialized: boolean
}

const initialState: AppStateType = {
    appStatus: 'empty',
    appInitializing: 'inProgress',
    error: null,
    isInitialized: false
}

export type AppActionsType = SetRequestStatusAT | SetAppErrorStatusAT | initializeAppAc

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/SET_REQUEST_STATUS': {
            return {...state, appStatus: action.status}
        }
        case 'APP/SET_ERROR': {
            return {...state, error: action.error}
        }
        case "APP/INITIALIZE-APP":
            return {...state, isInitialized: true}
        default:
            return state
    }
}

//Thunk

export const initializeAppTC = () => (dispatch: Dispatch<ProfileActionTypes | AppActionsType | LoginActionsType>) => {
    authAPI.me()
        .then(res => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setProfileData(res.data))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppError(err.message))
        })
        .finally(() => {
            dispatch(initializeApp())
        })

}


export const setAppStatus = (status: AppStatusType) => ({type: 'APP/SET_REQUEST_STATUS', status} as const)
type SetRequestStatusAT = ReturnType<typeof setAppStatus>

export const setAppError = (error: string | null) => ({type: 'APP/SET_ERROR', error} as const)
type SetAppErrorStatusAT = ReturnType<typeof setAppError>

export const initializeApp = () => ({type: 'APP/INITIALIZE-APP'} as const)
type initializeAppAc = ReturnType<typeof initializeApp>


