import {authAPI, LoginParamsType} from '../api/authAPI';
import {Dispatch} from 'redux';
import ninja from '../assets/images/ninja.jpg';
import {ProfileActionTypes, setProfileData} from './profileReducers';
import {AppRootStateType} from '../store/store';
import {debug} from 'util';

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

        default:return state
    }
}

export const setIsLoggedIn = (value: boolean) => ({type: 'APP/SET-IS-LOGGED-IN', value} as const)
export type LoginActionType = ReturnType<typeof setIsLoggedIn>

export const setAppStatus = (status: AppStatusType) => ({type: 'APP/SET_REQUEST_STATUS', status} as const)
type SetRequestStatusAT = ReturnType<typeof setAppStatus>

export const setAppError = (error: string | null) => ({type: 'APP/SET_ERROR', error} as const)
type SetAppErrorStatusAT = ReturnType<typeof setAppError>

export const setAppIsInitialize = (marker: boolean) => ({type: 'APP/SET_APP_INITIALIZING', marker} as const)
type setAppIsInitialize = ReturnType<typeof setAppIsInitialize>

export const login = (data: LoginParamsType) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatus('inProgress'))
    authAPI.login(data)
        .then((res) => {
            console.log(res)
            dispatch(setIsLoggedIn(true))
            dispatch(setAppStatus('succeeded'))
        })
        .catch((err) => {
            dispatch(setAppError(err.response.data.error))
            dispatch(setAppStatus('failed'))
        })
}

export const meRequest = () => (dispatch: Dispatch<AppActionsType | ProfileActionTypes>, getState: () => AppRootStateType) => {
    dispatch(setAppStatus('inProgress'))
    authAPI.me()
        .then(res => {
            dispatch(setIsLoggedIn(true))
            if(getState().app.isLoggedIn) {
                const currentUser = res.data
                console.log(currentUser)
                if (!currentUser.avatar) currentUser.avatar = `${ninja}`
                dispatch(setProfileData({
                    name: currentUser.name,
                    email: currentUser.email,
                    avatar: currentUser.avatar,
                    id: currentUser._id,
                }))
            }
            dispatch(setAppStatus('succeeded'))
        })
        .catch(err => {
            dispatch(setAppStatus('failed'))
            dispatch(setIsLoggedIn(false))
        })
        .finally(() => dispatch(setAppIsInitialize(true)))
}


