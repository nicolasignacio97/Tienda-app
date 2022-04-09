import { types } from "../types/types";

const inicialState = {
    products: [],
    activeProduct: null,
    paginasTotales: 0,
};
export const adminReducer = (state = inicialState, action) => {
    switch (action.type) {
        case types.productSetActive:
            return {
                ...state,
                activeProduct: action.payload
            }
        case types.productAddNew:
            return {
                ...state,
                products: [
                    ...state.products,
                    action.payload
                ]
            }
        case types.productClear:
            return {
                ...state,
                activeProduct: null
            }
        case types.productUpdated:
            return {
                ...state,
                products: state.products.map(
                    e => (e._id === action.payload._id) ? action.payload : e
                )
            }
        case types.productDeleted:
            return {
                ...state,
                products: state.products.filter(e => e._id !== action.payload)
            }
        case types.productLoaded:
            return {
                ...state,
                products: [...action.payload]
            }

        case types.productSearch:
            return {
                ...state,
                products: state.products.filter(product => product.name.includes(action.payload))
            }

        case types.productPagesTotal:
            return {
                ...state,
                paginasTotales: action.payload
            }

        case types.productLogout:
            return {
                ...inicialState
            }
        default:
            return state;

    }
}
