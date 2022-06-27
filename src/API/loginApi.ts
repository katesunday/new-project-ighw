import axios , {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    withCredentials: true ,
})

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean
}

export type ResponseType = ResponseSuccessType | ResponseErrorType
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


export const loginApi = {
    login(body: LoginParamsType) {
        return instance.post<AxiosResponse<ResponseType>>(`auth/login`, body)
    }
}