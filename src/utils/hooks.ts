import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {AppRootStateType} from '../store/store';
import {useEffect, useState} from 'react';

type DispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export const useAppDispatch = () => useDispatch<DispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export const useDebounce = (value: string , delay: number) => {
    const [debouncedValue , setDebouncedValue] = useState(value);
    useEffect(() => {

            const handler = setTimeout(() => {
                setDebouncedValue(value);
            } , delay);
            return () => {
                clearTimeout(handler);
            };
        } ,
        [value , delay]
    );
    return debouncedValue;
}