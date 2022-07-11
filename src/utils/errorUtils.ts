import {Dispatch} from "redux";
import {setAppError, SetAppErrorStatusAT, setAppStatus, SetRequestStatusAT} from "../reducers/appReducer";
import axios, {AxiosError} from "axios";

export const handlerErrorUtils = (e: Error | AxiosError<{ error: string }>, dispatch: Dispatch<SetAppErrorStatusAT | SetRequestStatusAT>) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(setAppError(error))
        dispatch(setAppStatus('failed'))
    } else {
        dispatch(setAppError(`Native error ${err.message}`))
        dispatch(setAppStatus('failed'))
    }
}