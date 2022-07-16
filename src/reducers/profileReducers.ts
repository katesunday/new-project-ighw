import {AxiosError} from 'axios';
import {setAppStatus, setIsLoggedIn} from './appReducer';
import {authAPI} from '../api/authAPI';
import {profileAPI} from '../api/profileAPI';
import ninja from './../assets/images/ninja.jpg'
import {ThunkType} from "../store/store";
import {handlerErrorUtils} from "../utils/errorUtils";
import {setTypeOfPacks} from './packListsReducer';

export type UserType = {
    _id: string;
    email: string;
    name: string;
    avatar: string;
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
    id: string
}

export type ChangeProfileType = {
    updatedUser: UserType
    error?: string
}

export type LogoutResponse = {
    info: string
    error: string
}

export type ProfileActionTypes = SetProfileDataAT | ChangeProfileDataAT | ResetProfileDataAT

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
            const {name, avatar, email, id} = action.payload
            return {
                ...state,
                name: name,
                avatar: avatar,
                email: email,
                _id: id
            }

        case 'PROFILE/CHANGE-PROFILE-DATA':
            return {...state, ...action.data}

        case 'PROFILE/RESET_PROFILE_DATA' :
            return {...initialState}

        default:
            return state
    }
}

// actions
export const setProfileData = (payload: ProfilePayloadType) => ({type: 'PROFILE/SET-PROFILE-DATA', payload} as const)
type SetProfileDataAT = ReturnType<typeof setProfileData>

export const changeProfileData = (data: UserType) => ({type: 'PROFILE/CHANGE-PROFILE-DATA', data} as const)
type ChangeProfileDataAT = ReturnType<typeof changeProfileData>

export const resetProfileData = () => ({type: 'PROFILE/RESET_PROFILE_DATA'} as const)
type ResetProfileDataAT = ReturnType<typeof resetProfileData>

// thunks
export const logout = (): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('inProgress'))
        const res = await authAPI.logout()
        if (res.data.info) {
            dispatch(resetProfileData())
            dispatch(setTypeOfPacks('my'))
            dispatch(setAppStatus('empty'))
            dispatch(setIsLoggedIn(false))
        }
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        handlerErrorUtils(err, dispatch)
    }
}

export const changeName = (newName: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('inProgress'))
        const res = await profileAPI.updateCurrentUser(newName)
        const updatedUser = res.data.updatedUser
        if (!updatedUser.avatar) updatedUser.avatar = `${ninja}`
        dispatch(setProfileData({
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            id: updatedUser._id
        }))
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        handlerErrorUtils(err, dispatch)
    }
}
export const uploadPhoto = (avatar:string):ThunkType=>async dispatch=>{
    try {
        dispatch(setAppStatus('inProgress'))
        const res = await profileAPI.updateUserPhoto(avatar)
        const updatedUser = res.data.updatedUser
        dispatch(setProfileData({
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            id: updatedUser._id
        }))
        dispatch(setAppStatus('succeeded'))

    }
    catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        handlerErrorUtils(err, dispatch)
    }
}






