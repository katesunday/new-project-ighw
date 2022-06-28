import {AxiosError} from 'axios';
import {AppActionsType, setAppError, setAppStatus} from "./appReducer";
import {Dispatch} from "redux";
import {authAPI , ResponseSuccessType} from "../api/authAPI";
import ninja from "./../assets/images/ninja.png"
import {LoginActionsType, setIsLoggedInAC} from "./loginReducers";


let initialState: AuthDataType = {
    _id: '',
    email: '',
    name: '',
    avatar: `${ninja}`,
    publicCardPacksCount: 0,
    created: '',
    updated: '',
    isAdmin: false,
    verified: false,
    rememberMe: false,
    // error: '',
}

export const profileReducers = (state: AuthDataType = initialState, action: ProfileActionTypes): AuthDataType => {
    switch (action.type) {
        case 'PROFILE/SET-PROFILE-DATA':
            return {...state, email:action.data.email,name:action.data.name}
        case 'PROFILE/CHANGE-PROFILE-DATA':
            return {...state, ...action.data}
        default:
            return state
    }
}

// actions
export const setProfileData = (data: ResponseSuccessType) => {
    return {type: 'PROFILE/SET-PROFILE-DATA', data} as const
    }
export const changeProfileData = (data: AuthDataType) => ({type: 'PROFILE/CHANGE-PROFILE-DATA', data} as const)

// thunks

export const logoutTC = () => (dispatch: Dispatch<ProfileActionTypes | AppActionsType | LoginActionsType> ) => {
    dispatch(setAppStatus("inProgress"))
    authAPI.logout()
        .then(res => {
            if (res.data.data.info) {
                dispatch(setAppStatus("succeeded"))
                dispatch(setIsLoggedInAC(false))
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppStatus("failed"))
            dispatch(setAppError(err.message))
        })

}
export const changeProfileDataTC = (name: string) => (dispatch: Dispatch<ProfileActionTypes | AppActionsType>) => {
    dispatch(setAppStatus("inProgress"))
    authAPI.changeNameAvatar(name)
        .then(res => {
            dispatch(setAppStatus("succeeded"))
            dispatch(changeProfileData(res.data.data.updatedUser))
        })
        .catch((err: AxiosError) => {
            dispatch(setAppStatus("failed"))
            dispatch(setAppError(err.message))
        })

}

// types
export type ProfileActionTypes =
    | ReturnType<typeof setProfileData>
    | ReturnType<typeof changeProfileData>

export type AuthDataType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created?: string;
    updated?: string;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    //
    // error?: string;
}

export type MeResponseType = {
    updatedUser: AuthDataType
    error?: string
}
export type MeLogoutResponse = {
    info: string
    error: string
}