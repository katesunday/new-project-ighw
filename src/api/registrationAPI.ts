import axios, {AxiosResponse} from 'axios';
import {PayloadType} from '../reducers/registrationReducers';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/'
})

export type ResponseType = {
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
    error?: string
}

export const registrationAPI = {
    createNewUser(payload: PayloadType) {
        return instance.post<AxiosResponse<ResponseType>>('auth/register', {...payload})
            .then(res => res.data.data)
    }
}