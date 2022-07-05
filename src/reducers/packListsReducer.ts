import {Dispatch} from 'redux';
import {AppActionsType, setAppStatus, setIsLoggedIn} from './appReducer';
import {packsAPI, Params, PostPackPayloadType} from '../api/packsAPI';

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
}


type PackStateType = {
    packs: Pack[]
    editPackId : string
    learnPackId: string
    showPackId: string
    minMax: [number, number]
}

const initialState: PackStateType = {
    packs: [],
    editPackId: '',
    learnPackId: '',
    showPackId: '',
    minMax: [0, 100]
}
export type PacksActionType = SetPacksAT | DeletePackAT | EditPackAT | LearnPackAT | ShowPackAT | SearchMinMaxAT | SetNewPackAT

export const packsListReducer = (state: PackStateType = initialState, action: PacksActionType): PackStateType => {
    switch(action.type) {
        case 'PACKS/SET_PACKS':
            return {...state, packs: [...action.packs]}

        case 'PACKS/DELETE_PACK':
            return {...state, packs: state.packs.filter(item => item._id !== action.id)}

        case 'PACKS/EDIT_PACK':
            return {...state, editPackId: action.id, learnPackId: '', showPackId: ''}

        case 'PACKS/LEARN_PACK' :
            debugger
            return {...state, learnPackId: action.id, showPackId: '', editPackId: ''}

        case 'PACKS/SHOW_PACK':
            return {...state, showPackId: action.id, learnPackId: '', editPackId: ''}

        case 'PACKS/SEARCH_MIN_MAX':
            return {...state, minMax: action.values}

        case 'PACKS/SET_NEW_PACK':
            return {...state, packs: [action.newPack, ...state.packs]}

        default: return state
    }
}

export const setPacks = (packs: Pack[]) => ({type: 'PACKS/SET_PACKS', packs} as const)
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

export const getPacks = (params: Params) => (dispatch: Dispatch<PacksActionType | AppActionsType>) => {
    dispatch(setAppStatus('inProgress'))
    dispatch(setPacks([]))
    packsAPI.getPacks(params)
        .then(res => {
            if(params.min && params.max){
                dispatch(searchMinMax([params.min, params.max]))
            }
            dispatch(setPacks(res.data.cardPacks))
            dispatch(setAppStatus('succeeded'))
        })
        .catch(err => {
            dispatch(setAppStatus('failed'))
            dispatch(setIsLoggedIn(false))
        })
}

export const removePack = (id: string) => (dispatch: Dispatch<PacksActionType | AppActionsType>) => {
    dispatch(setAppStatus('inProgress'))
    packsAPI.deletePack(id)
        .then(res => {
            dispatch(deletePack(id))
            dispatch(setAppStatus('succeeded'))
        })
        .catch(err => {
            dispatch(setAppStatus('failed'))
            dispatch(setIsLoggedIn(false))
        })
}

export const createNewPack = (payload: PostPackPayloadType) => (dispatch: Dispatch<PacksActionType | AppActionsType>) => {
    dispatch(setAppStatus('inProgress'))
    packsAPI.createNewPack(payload)
        .then(res => {
            dispatch(setNewPack(res.data.newCardsPack))
            dispatch(setAppStatus('succeeded'))
        })
        .catch(err => {
            dispatch(setAppStatus('failed'))
            dispatch(setIsLoggedIn(false))
        })
}
