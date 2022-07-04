import { instance } from "./instance"



export type GetCardsPayloadType = {
    cardAnswer?:string,
    cardQuestion?:string,
    cardsPack_id?:string,
    min?:number,
    max?:number,
    sortCards?:string,
    page?:number,
    pageCount?:number
}
export type SearchCardsPayloadType = {
    packName?:string,
    min?:number,
    max?:number,
    sortPacks?:string,
    page?:number,
    pageCount?:number,
    user_id?:string
}

export type CardsResponseType = {
    cards: CardType[],
    packUserId: string,
    page: number,
    pageCount: number,
    cardsTotalCount: number,
    minGrade: number,
    maxGrade: number,
    token: string,
    tokenDeathTime: number
}
export type CardType = {
    _id: string,
    cardsPack_id: string,
    user_id: string,
    answer: string,
    question: string,
    grade: number,
    shots: number,
    comments: string | null,
    type: string,
    rating: number,
    more_id: string,
    created: string,
    updated: string,
    __v: number
}


export const cardsAPI = {
    getCards(payload:GetCardsPayloadType){
        return instance.get<CardsResponseType>('cards/card',{params:{...payload}})
    },
    getPacksByParams(payload:SearchCardsPayloadType){
        return instance.get<CardsResponseType>('cards/pack',{params:{...payload,pageCount:8}})
    },
}