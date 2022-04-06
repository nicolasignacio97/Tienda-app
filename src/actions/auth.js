import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (email, password) => {
    return async (dispath) => {
        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem('Token', body.token);
            localStorage.setItem('Token-init-date', new Date().getTime());
            dispath(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

export const login = (user) => ({
    type: types.authLogin,
    payload: user
})


export const starRegister = (email, password, name) => {
    console.log(email, password, name)
    return async (dispath) => {
        const resp = await fetchSinToken('auth/new', { email, name, password }, 'POST');
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem('Token', body.token);
            localStorage.setItem('Token-init-date', new Date().getTime());
            dispath(login({
                uid: body.uid,
                name: body.name,
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

export const startChecking = () => {
    return async (dispath) => {
        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem('Token', body.token);
            localStorage.setItem('Token-init-date', new Date().getTime());
            dispath(login({
                uid: body.uid,
                name: body.name,
            }))
        } else {
            dispath(ChekingFinish())
        }
    }
}
export const startLogout = () => {
    return (dispath) => {
        localStorage.clear();
        dispath(logout())
    }
}
export const logout = () => ({ type: types.authLogout })

export const ChekingFinish = () => ({ type: types.authCheckingFinish })