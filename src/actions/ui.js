import { types } from "../types/types"

export const openModal = () => ({ type: types.uiOpenModal })
export const closeModal = () => ({ type: types.uiCloseModal })
export const openAlert = (acction,msg) => ({
    type: types.uiOpenAlert,
    payload:{
        acction,
        msg
    }
})
export const closeAlert = () => ({ type: types.uiCloseAlert })
export const openPaginacion = () => ({ type: types.uiOpenPaginacion })
export const closePaginacion = () => ({ type: types.uiClosePaginacion })