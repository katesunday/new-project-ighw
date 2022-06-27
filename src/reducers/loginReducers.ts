import {Dispatch} from "redux";
import {AppActionsType , setAppError} from "./appReducer";
import {authAPI , LoginParamsType} from "../api/authAPI";


const initialState = {
    isLoggedIn: false
}
export type InitialStateType = typeof initialState

type LoginActionsType = ReturnType<typeof setIsLoggedInAC> | AppActionsType

export const loginReducers = (state: InitialStateType = initialState ,action:LoginActionsType)=>{
    switch (action.type){
        case "login/SET-IS-LOGGED-IN":
            return {...state,isLoggedIn: action.value}
        default: return state
    }
}

export const setIsLoggedInAC = (value: boolean) => (
    {type: 'login/SET-IS-LOGGED-IN' , value} as const
)

export const loginTC = (data:LoginParamsType)=>
    (dispatch:Dispatch<LoginActionsType>)=>{
        authAPI.login(data)
            .then((res)=>{
                console.log(res)
                dispatch(setIsLoggedInAC(true))
            })
            .catch((err)=>{
                dispatch(setAppError(err.response.data.error))
            })

}