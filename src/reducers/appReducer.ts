export type AppStatusType = 'succeeded' | 'inProgress' | 'failed' | 'empty'
export type AppInitializeStatusType =  'success' | 'inProgress'

type AppStateType = {
    appStatus: AppStatusType,
    appInitializing: AppInitializeStatusType,
    error: string | null
}

const initialState: AppStateType = {
    appStatus: 'empty',
    appInitializing: 'inProgress',
    error: null
}

export type AppActionsType = SetRequestStatusAT | SetAppErrorStatusAT

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
    switch (action.type){
        case 'APP/SET_REQUEST_STATUS': {
            return {...state, appStatus: action.status}
        }
        case 'APP/SET_ERROR': {
            return {...state, error: action.error}
        }
        default: return state
    }
}

export const setAppStatus = (status: AppStatusType) => ({type: 'APP/SET_REQUEST_STATUS', status} as const)
type SetRequestStatusAT = ReturnType<typeof setAppStatus>

export const setAppError = (error: string | null) => ({type: 'APP/SET_ERROR', error} as const)
type SetAppErrorStatusAT = ReturnType<typeof setAppError>


