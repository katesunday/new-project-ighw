import {AxiosError} from 'axios';
import {AppActionsType, setAppError, setAppStatus, setIsLoggedIn} from './appReducer';
import {Dispatch} from 'redux';
import {authAPI} from '../api/authAPI';
import {profileAPI} from '../api/profileAPI';
import ninja from './../assets/images/ninja.jpg'


export type UserType = {
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
}

type ProfilePayloadType = {
    name: string
    avatar: string
    email: string
}

export type ChangeProfileType = {
    updatedUser: UserType
    error?: string
}

export type LogoutResponse = {
    info: string
    error: string
}

export type ProfileActionTypes = SetProfileDataAT | ChangeProfileDataAT

const initialState: UserType = {
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
}

export const profileReducers = (state: UserType = initialState, action: ProfileActionTypes): UserType => {
    switch (action.type) {
        case 'PROFILE/SET-PROFILE-DATA':
            const {name, avatar, email} = action.payload
            return {
                ...state,
                name: name,
                avatar: avatar,
                email: email
            }

        case 'PROFILE/CHANGE-PROFILE-DATA':
            return {...state, ...action.data}
        default:
            return state
    }
}

// actions
export const setProfileData = (payload: ProfilePayloadType) => ({type: 'PROFILE/SET-PROFILE-DATA', payload} as const)
type SetProfileDataAT = ReturnType<typeof setProfileData>

export const changeProfileData = (data: UserType) => ({type: 'PROFILE/CHANGE-PROFILE-DATA', data} as const)
type ChangeProfileDataAT = ReturnType<typeof changeProfileData>
// thunks

export const logout = () => (dispatch: Dispatch<ProfileActionTypes | AppActionsType>) => {
    dispatch(setAppStatus('inProgress'))
    authAPI.logout()
        .then(res => {
            if (res.data.info) {
                dispatch(setAppStatus('empty'))
                dispatch(setIsLoggedIn(false))
            }
        })
        .catch((err: AxiosError) => {
            dispatch(setAppStatus('failed'))
            dispatch(setAppError(err.message))
        })

}
export const getCurrentUser = () => (dispatch: Dispatch<ProfileActionTypes | AppActionsType>) => {
    dispatch(setAppStatus('inProgress'))
    profileAPI.getCurrentUserInfo()
        .then(res => {
            const currentUser = res.data
            console.log(currentUser)
            if (!currentUser.avatar) currentUser.avatar = `${ninja}`
            dispatch(setProfileData({
                name: currentUser.name,
                email: currentUser.email,
                avatar: currentUser.avatar
            }))
            dispatch(setAppStatus('succeeded'))
        })
        .catch(err => {
            dispatch(setAppStatus('failed'))
            dispatch(setAppError(err.error))
        })
}

export const changeName = (newName: string) => (dispatch: Dispatch<ProfileActionTypes | AppActionsType>) => {
    dispatch(setAppStatus('inProgress'))
    profileAPI.updateCurrentUser(newName)
        .then(res => {
            const updatedUser = res.data.updatedUser
            if (!updatedUser.avatar) updatedUser.avatar = `${ninja}`
            dispatch(setProfileData({
                name: updatedUser.name,
                email: updatedUser.email,
                avatar: updatedUser.avatar
            }))
            dispatch(setAppStatus('succeeded'))
        })
        .catch(err => {
            dispatch(setAppStatus('failed'))
            dispatch(setAppError(err.error))
        })
}






