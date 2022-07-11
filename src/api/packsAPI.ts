import {instance} from './instance';
import {Pack} from '../reducers/packListsReducer';

type PacksList = {
    cardPacks: Pack[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}

export type PostPackPayloadType = {
    name: string
    private: boolean
    deckCover?: string
}

export type PutPackPayloadType = {
    packId: string
    newName: string
}

export type SortType = '0updated' | '1updated'

export type Params = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: SortType
    page?: number
    pageCount?: number
    user_id?: string
}

export type PostNewPackResponseType = {
    newCardsPack: Pack
    token: string
    tokenDeathTime: number
}

export const packsAPI = {
    getPacks(params: Params = {}) {
        return instance.get<PacksList>('cards/pack', {
            params: {
                ...params
            }
        })
    },

    deletePack(id: string) {
        return instance.delete('cards/pack', {
            params: {id}
        })
    },

    createNewPack(payload: PostPackPayloadType) {
        return instance.post<PostNewPackResponseType>('cards/pack', {cardsPack: {...payload}})
    },

    updatePack(payload: PutPackPayloadType) {
        return instance.put('cards/pack',  {cardsPack: {_id: payload.packId, name: payload.newName}})
    }
}