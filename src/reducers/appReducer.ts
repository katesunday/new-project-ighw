import {authAPI, LoginParamsType} from '../api/authAPI';
import ninja from '../assets/images/ninja.jpg';
import {setProfileData} from './profileReducers';
import {ThunkType} from "../store/store";
import {AxiosError} from "axios";
import {handlerErrorUtils} from "../utils/errorUtils";
import {editPack} from "./packListsReducer";

export type AppStatusType = 'succeeded' | 'inProgress' | 'failed' | 'empty'

type AppStateType = {
    appStatus: AppStatusType
    appInitializing: boolean
    isLoggedIn: boolean
    error: string | null
}

const initialState: AppStateType = {
    appStatus: 'empty',
    appInitializing: false,
    isLoggedIn: false,
    error: null
}

export type AppActionsType = SetRequestStatusAT | SetAppErrorStatusAT | LoginActionType | setAppIsInitialize

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/SET_REQUEST_STATUS':
            return {...state, appStatus: action.status}

        case 'APP/SET_ERROR':
            return {...state, error: action.error}

        case 'APP/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}

        case 'APP/SET_APP_INITIALIZING':
            return {...state, appInitializing: action.marker}

        default:
            return state
    }
}

//action
export const setIsLoggedIn = (value: boolean) => ({type: 'APP/SET-IS-LOGGED-IN', value} as const)
export type LoginActionType = ReturnType<typeof setIsLoggedIn>

export const setAppStatus = (status: AppStatusType) => ({type: 'APP/SET_REQUEST_STATUS', status} as const)
export type SetRequestStatusAT = ReturnType<typeof setAppStatus>

export const setAppError = (error: string | null) => ({type: 'APP/SET_ERROR', error} as const)
export type SetAppErrorStatusAT = ReturnType<typeof setAppError>

export const setAppIsInitialize = (marker: boolean) => ({type: 'APP/SET_APP_INITIALIZING', marker} as const)
type setAppIsInitialize = ReturnType<typeof setAppIsInitialize>

//thunk
export const login = (data: LoginParamsType): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('inProgress'))
        await authAPI.login(data)
        dispatch(setIsLoggedIn(true))
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        handlerErrorUtils(err, dispatch)
    }
}

export const meRequest = (): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('inProgress'))
        const res = await authAPI.me()
        const currentUser = res.data
        if (!currentUser.avatar) currentUser.avatar = `${ninja}`
        dispatch(setProfileData({
            name: currentUser.name,
            email: currentUser.email,
            avatar: currentUser.avatar,
            id: currentUser._id,
        }))
        dispatch(setIsLoggedIn(true))
        dispatch(editPack(currentUser._id))
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        // handlerErrorUtils(err, dispatch)
    } finally {
        dispatch(setAppIsInitialize(true))
    }
}