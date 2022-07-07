import {Dispatch} from "redux";
import {setAppError, SetAppErrorStatusAT, setAppStatus, SetRequestStatusAT} from "../reducers/appReducer";

export const handlerErrorUtils = (error: { message: string }, dispatch: Dispatch<SetAppErrorStatusAT | SetRequestStatusAT>) => {
    dispatch(setAppError(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatus('failed'))
}