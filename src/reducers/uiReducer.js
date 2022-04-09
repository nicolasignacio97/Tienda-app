import { types } from "../types/types"

const inicialState = {
    openModal: false,
    openAlert: false,
    openPaginacion: false,
}
export const uiReducer = (state = inicialState, action) => {
    switch (action.type) {
        case types.uiOpenModal:
            return {
                ...state,
                openModal: true,
            }
        case types.uiCloseModal:
            return {
                ...state,
                openModal: false,
            }
        case types.uiOpenAlert:
            return {
                ...state,
                openAlert: true,
                acction: action.payload.acction,
                msg: action.payload.msg,
            }
        case types.uiCloseAlert:
            return {
                ...state,
                openAlert: false,
            }
        case types.uiOpenPaginacion:
            return {
                ...state,
                openPaginacion: true,
            }
        case types.uiClosePaginacion:
            return {
                ...state,
                openPaginacion: false,
            }
        default:
            return state
    }

}
