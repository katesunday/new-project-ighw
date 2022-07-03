import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {registrationReducers} from "../reducers/registrationReducers";
import {profileReducers} from "../reducers/profileReducers";
import {restorePWReducers} from "../reducers/restorePWReducers";
import {testReducers} from "../reducers/testReducers";
import {AppActionsType, appReducer} from '../reducers/appReducer';
import {packsListReducer} from '../reducers/packListsReducer';
import {cardsReducer, CardsReducerActionType} from "../reducers/cardsReducer";


const rootReducer = combineReducers({
    app: appReducer,
    registration: registrationReducers,
    profile: profileReducers,
    restorePassword: restorePWReducers,
    test: testReducers,
    packsList: packsListReducer,
    cards: cardsReducer
})
export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootActionsType =
    | CardsReducerActionType
    | AppActionsType


export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

//@ts-ignore
window.store = store