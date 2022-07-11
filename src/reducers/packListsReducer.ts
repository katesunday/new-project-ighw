import {setAppStatus} from './appReducer';
import {packsAPI, Params, PostPackPayloadType} from '../api/packsAPI';
import {ThunkType} from '../store/store';
import {AxiosError} from 'axios';
import {handlerErrorUtils} from '../utils/errorUtils';

export type Pack = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
    deckCover?: string
    avatar?: string
}

export type TypeOfPacks = 'my' | 'all' | 'some'

type PackStateType = {
    packs: Pack[]
    editPackId: string
    learnPackId: string
    showPackId: string
    minMax: [number, number]
    totalAmountOfPacks: number
    typeOfPacks: TypeOfPacks
}

const initialState: PackStateType = {
    packs: [],
    editPackId: '',
    learnPackId: '',
    showPackId: '',
    minMax: [0, 100],
    totalAmountOfPacks: 0,
    typeOfPacks: 'my'
}
export type PacksActionType =
    SetPacksAT
    | DeletePackAT
    | EditPackAT
    | LearnPackAT
    | ShowPackAT
    | SearchMinMaxAT
    | SetNewPackAT
    | SetTypeOfPacksAT
    | SetNewNameAT

export const packsListReducer = (state: PackStateType = initialState, action: PacksActionType): PackStateType => {
    switch (action.type) {
        case 'PACKS/SET_PACKS':
            return {...state, packs: [...action.packs], totalAmountOfPacks: action.totalAmountOfPacks}

        case 'PACKS/DELETE_PACK':
            return {...state, packs: state.packs.filter(item => item._id !== action.id)}

        case 'PACKS/EDIT_PACK':
            return {...state, editPackId: action.id, learnPackId: '', showPackId: ''}

        case 'PACKS/LEARN_PACK' :
            return {...state, learnPackId: action.id, showPackId: '', editPackId: ''}

        case 'PACKS/SHOW_PACK':
            return {...state, showPackId: action.id, learnPackId: '', editPackId: ''}

        case 'PACKS/SEARCH_MIN_MAX':
            return {...state, minMax: action.values}

        case 'PACKS/SET_NEW_PACK':
            return {...state, packs: [action.newPack, ...state.packs]}

        case 'PACKS/SET_TYPE_OF_PACKS' :
            return {...state, typeOfPacks: action.value}

        case 'PACKS/SET_NEW_PACK_NAME' :
            return {...state, packs: state.packs.map(item => item._id === action.packId ? {...item, name: action.newName} : item)}

        default:
            return state
    }
}

//action
export const setPacks = (packs: Pack[], totalAmountOfPacks: number) => ({
    type: 'PACKS/SET_PACKS',
    packs,
    totalAmountOfPacks
} as const)
export type SetPacksAT = ReturnType<typeof setPacks>

export const deletePack = (id: string) => ({type: 'PACKS/DELETE_PACK', id} as const)
export type DeletePackAT = ReturnType<typeof deletePack>

export const editPack = (id: string) => ({type: 'PACKS/EDIT_PACK', id} as const)
export type EditPackAT = ReturnType<typeof editPack>

export const learnPack = (id: string) => ({type: 'PACKS/LEARN_PACK', id} as const)
export type LearnPackAT = ReturnType<typeof learnPack>

export const showPack = (id: string) => ({type: 'PACKS/SHOW_PACK', id} as const)
export type ShowPackAT = ReturnType<typeof showPack>

export const searchMinMax = (values: [number, number]) => ({type: 'PACKS/SEARCH_MIN_MAX', values} as const)
export type SearchMinMaxAT = ReturnType<typeof searchMinMax>

export const setNewPack = (newPack: Pack) => ({type: 'PACKS/SET_NEW_PACK', newPack} as const)
export type SetNewPackAT = ReturnType<typeof setNewPack>

export const setTypeOfPacks = (value: TypeOfPacks) => ({type: 'PACKS/SET_TYPE_OF_PACKS', value} as const)
export type SetTypeOfPacksAT = ReturnType<typeof setTypeOfPacks>

export const setNewName = (newName: string, packId: string) => ({type: 'PACKS/SET_NEW_PACK_NAME', newName, packId} as const)
export type SetNewNameAT = ReturnType<typeof setNewName>

//thunk
export const getPacks = (params: Params): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('inProgress'))
        dispatch(setPacks([], 0))
        const res = await packsAPI.getPacks(params)
        if (params.min && params.max) {
            dispatch(searchMinMax([params.min, params.max]))
        }
        dispatch(setPacks(res.data.cardPacks, res.data.cardPacksTotalCount))
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        handlerErrorUtils(err, dispatch)
    }
}

export const removePack = (id: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('inProgress'))
        await packsAPI.deletePack(id)
        dispatch(deletePack(id))
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        handlerErrorUtils(err, dispatch)
    }
}

export const createNewPack = (payload: PostPackPayloadType): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('inProgress'))
        const res = await packsAPI.createNewPack(payload)
        dispatch(setNewPack(res.data.newCardsPack))
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        handlerErrorUtils(err, dispatch)
    }
}

export const updatePack = (packId: string, newName: string): ThunkType => async dispatch => {
    try {
        dispatch(setAppStatus('inProgress'))
        await packsAPI.updatePack({packId, newName})
        dispatch(setNewName(newName, packId))
        dispatch(setAppStatus('succeeded'))
    } catch(e) {

        const err = e as Error | AxiosError<{ error: string }>
        handlerErrorUtils(err, dispatch)
    }
}