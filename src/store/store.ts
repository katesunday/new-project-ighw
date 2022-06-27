import {loginReducers} from "../reducers/loginReducers";
import {AnyAction , applyMiddleware , combineReducers , legacy_createStore} from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import {registrationReducers} from "../reducers/registrationReducers";
import {profileReducers} from "../reducers/profileReducers";
import {restorePWReducers} from "../reducers/RestorePWReducers";
import {setNewPWReducers} from "../reducers/setNewPWReducers";
import {testReducers} from "../reducers/TestReducers";
import {errorReducers} from "../reducers/errorReducers";
import {TypedUseSelectorHook , useDispatch , useSelector} from "react-redux";

const rootReducer = combineReducers({
    login: loginReducers ,
    registration: registrationReducers ,
    profile: profileReducers ,
    restorePassword: restorePWReducers ,
    setNewPassword: setNewPWReducers ,
    test: testReducers ,
    errorPage: errorReducers
})
export type AppRootStateType = ReturnType<typeof rootReducer>

type DispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<DispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const store = legacy_createStore(rootReducer , applyMiddleware(thunk))