import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { IAuthResponse } from './auth.interfaces';
import { API } from '../api/api';

const storage = createJSONStorage<AuthState>(() => AsyncStorage);

const INITIAL_STATE = {
    access_token: null,
    isLoading: false,
    error: null,
};

export const authAtom = atomWithStorage<AuthState>('auth', INITIAL_STATE, storage);

export const loginAtom = atom(
    (get) => get(authAtom),
    async (_get, set, { email, password }: LoginRequest) => {
        set(authAtom, {
            isLoading: true,
            access_token: null,
            error: null,
        });

        try {
            const { data } = await axios.post<IAuthResponse>(API.login, {
                email,
                password,
            });
            set(authAtom, {
                isLoading: false,
                access_token: data.access_token,
                error: null,
            });
        } catch (err) {
            if (err instanceof AxiosError) {
                set(authAtom, {
                    isLoading: false,
                    access_token: null,
                    error: err.response?.data.message,
                });
            }
        }
    },
);

export const logoutAtom = atom(null, (_get, set) => {
    set(authAtom, INITIAL_STATE);
});

export interface AuthState {
    access_token: string | null;
    isLoading: boolean;
    error: string | null;
}

export interface LoginRequest {
    email: string;
    password: string;
}
