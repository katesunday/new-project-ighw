import axios , {AxiosResponse} from "axios";
import {LogoutResponse, UserType} from '../reducers/profileReducers';
import {instance} from './instance';


const messageForRestorePW = `<div style="background-color: lime; padding: 15px">
Our team created for you password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean
}

export type LoginResponseType = ResponseSuccessType
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
    avatar?: string
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
        return instance.post<LoginResponseType>(`auth/login`, body)
    },

    logout() {
        return instance.delete <LogoutResponse>('auth/me')
    },

    me() {
        return instance.post<UserType>('auth/me')
    } ,
    restorePW(email: string , from = 'Cards project dev group' , message = messageForRestorePW) {
        return instance.post('auth/forgot',{email, from, message})
    },
    setNewPW(password:string,resetPasswordToken:string){
        return instance.post('auth/set-new-password',{password,resetPasswordToken})
    }
}