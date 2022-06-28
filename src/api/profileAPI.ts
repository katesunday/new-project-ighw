import {PayloadType} from '../reducers/registrationReducers';
import {AxiosResponse} from 'axios';
import {ChangeProfileType, UserType} from '../reducers/profileReducers';
import {instance, RegistrationResponseType} from './authAPI';


export const profileAPI = {
    createNewUser(payload: PayloadType) {
        return instance.post<AxiosResponse<RegistrationResponseType>>('auth/register', {...payload})
    },

    getCurrentUserInfo() {
        return instance.post<UserType>('auth/me', {})
    },

    updateCurrentUser(name: string) {
        return instance.put<ChangeProfileType>('auth/me', {name, avatar: ''})
    }
}