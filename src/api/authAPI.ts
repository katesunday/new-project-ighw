import {PayloadType} from "../reducers/registrationReducers";
import axios , {AxiosResponse} from "axios";
import {MeLogoutResponse, MeResponseType} from "../reducers/profileReducers";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    withCredentials: true ,
})

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean
}

export type LoginResponseType = ResponseSuccessType | ResponseErrorType
export type RegistrationResponseType = RegistrationSuccessResponseType
export type ResponseSuccessType = {
    _id: string,
    email: string,
    rememberMe: boolean,
    isAdmin: boolean,
    name: string,
    verified: boolean,
    publicCardPacksCount: number,
    created: string,
    updated: string,
    __v: number,
    token: string,
    tokenDeathTime: number
}
export type ResponseErrorType = {
    error: string,
    password: string,
    in: string
}
export type RegistrationSuccessResponseType = {
    addedUser: {
        _id: string
        email: string
        rememberMe: boolean
        isAdmin: boolean
        name: string
        verified: boolean
        publicCardPacksCount: number
        created: string
        updated: string
        __v: number
    }
}

export const authAPI = {
    login(body: LoginParamsType) {
        return instance.post<AxiosResponse<LoginResponseType>>(`auth/login`, body)
    },
    createNewUser(payload: PayloadType) {
        return instance.post<AxiosResponse<RegistrationResponseType>>('auth/register', {...payload})
    },
    logout() {
        return instance.delete <AxiosResponse<MeLogoutResponse>>('auth/me')
    },
    changeNameAvatar(name: string) {
        return instance.put<AxiosResponse<MeResponseType>>('auth/me', {name})
    },
    me() {
        return instance.post<AxiosResponse>('auth/me')
    },
}