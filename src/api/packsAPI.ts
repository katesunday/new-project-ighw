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

export type SortType = '0updated' | '1updated'

export type Params = {
    packName?: 'english'
    min?: number
    max?: number
    sortPacks?: SortType
    page?: number
    pageCount?: number
    user_id?: string
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
        return instance.post('cards/pack', {cardsPack : {...payload}})
    }
}