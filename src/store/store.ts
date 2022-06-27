import {loginReducers} from "../reducers/loginReducers";
import {applyMiddleware , combineReducers  , legacy_createStore} from "redux";
import thunk from "redux-thunk";
import {registrationReducers} from "../reducers/registrationReducers";
import {profileReducers} from "../reducers/profileReducers";
import {restorePWReducers} from "../reducers/RestorePWReducers";
import {setNewPWReducers} from "../reducers/setNewPWReducers";
import {testReducers} from "../reducers/TestReducers";
import {errorReducers} from "../reducers/errorReducers";
import {appReducer} from '../reducers/appReducer';


const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducers,
    registration: registrationReducers,
    profile:profileReducers,
    restorePassword:restorePWReducers,
    setNewPassword:setNewPWReducers,
    test: testReducers,
    errorPage:errorReducers
})
 export type AppRootStateType = ReturnType<typeof rootReducer>
 export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))