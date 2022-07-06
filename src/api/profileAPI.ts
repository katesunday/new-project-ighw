import {PayloadType} from '../reducers/registrationReducers';
import {AxiosResponse} from 'axios';
import {ChangeProfileType} from '../reducers/profileReducers';
import {RegistrationResponseType} from './authAPI';
import {instance} from './instance';

export const profileAPI = {
    createNewUser(payload: PayloadType) {
        return instance.post<AxiosResponse<RegistrationResponseType>>('auth/register', {...payload})
    },

    updateCurrentUser(name: string) {
        return instance.put<ChangeProfileType>('auth/me', {name, avatar: ''})
    }
}