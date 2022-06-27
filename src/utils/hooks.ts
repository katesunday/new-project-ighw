import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {AppRootStateType} from '../store/store';

type DispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export const useAppDispatch = () => useDispatch<DispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector