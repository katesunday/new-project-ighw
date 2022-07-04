import {applyMiddleware , combineReducers  , legacy_createStore} from "redux";
import thunk from "redux-thunk";
import {registrationReducers} from "../reducers/registrationReducers";
import {profileReducers} from "../reducers/profileReducers";
import {restorePWReducers} from "../reducers/restorePWReducers";
import {testReducers} from "../reducers/testReducers";
import {appReducer} from '../reducers/appReducer';
import { cardReducer } from "../reducers/cardReducer";


const rootReducer = combineReducers({
    app: appReducer,
    registration: registrationReducers,
    profile: profileReducers,
    restorePassword: restorePWReducers,
    test: testReducers,
    card: cardReducer,
})
 export type AppRootStateType = ReturnType<typeof rootReducer>
 export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))

//@ts-ignore
window.store = store