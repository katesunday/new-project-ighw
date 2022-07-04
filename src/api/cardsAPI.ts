import {instance} from "./instance";
import {SortType} from "./packsAPI";


export const cardsAPI = {
    getCards(params: CardsParams) {
        return instance.get<CardsResponseType>('/cards/card',
            {
                params: {
                    ...params
                }
            })
    },
    addNewCard(cardsPack_id: string, question: string, answer: string) {
        return instance.post('/cards/card', {card: {cardsPack_id, question, answer}})
    },
    deleteCard(id: string) {
        return instance.delete('/cards/card', {params: {id}})
    },
    updateCard(_id: string, question: string) {
        return instance.put('/cards/card', {card: {_id, question}})
    },
    
}

// type

export type CardsParams = {
    cardAnswer?:'english'
    cardQuestion?:'english'
    cardsPack_id: string
    max?: number
    sortCards?: SortType
    page?: number
    pageCount?: number

}

export type CardType = {
    question: string
    answer: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}
export type CardsResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}