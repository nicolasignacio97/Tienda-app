import { fetchConToken } from "../helpers/fetch";
import { fileUpload } from "../helpers/fileUpload";
import { types } from "../types/types";

export const productStartLoading = (page) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`product/getProduct?page=${page}`);
            const body = await resp.json();
            const products = await body.productos;
            dispatch(productPagesTotal(body.paginasTotales));
            dispatch(productLoaded(products))
        } catch (error) {
            console.log(error)
        }
    }
}
export const productStartAddNew = (product) => {
    return async (dispatch) => {
        try {
            let fileURl = await fileUpload(product.image);
            const resp = await fetchConToken('product/add',
                {
                    name: product.name,
                    price: product.price,
                    image: fileURl,
                    category: product.category,
                    season: product.season,
                    material: product.material,
                    size: product.size,

                }, 'POST');
            const body = await resp.json();
            if (body.ok) {
                product.id = body.id;
                dispatch(productAdd({ ...product, _id: product.id, image: fileURl }));
                dispatch(productStartLoading(1))
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const productStartUpdate = (product) => {

    return async (dispatch) => {
        try {
            let fileURl = '';
            if (typeof (product.image) === 'object') {
                fileURl = await fileUpload(product.image);

            } else if (typeof (product.image) === 'string') {
                fileURl = product.image;
            }
            const resp = await fetchConToken(`product/update/${product.id}`, {
                name: product.name,
                price: product.price,
                image: fileURl,
                category: product.category,
                season: product.season,
                material: product.material,
                size: product.size,
            }, 'PUT');
            const body = await resp.json();
            if (body.ok) {
                dispatch(productUpdated({ ...product, _id: product.id, image: fileURl }));

            } else {
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error)
        }
    }
}
export const productStartDelete = (id) => {
    return async (dispatch) => {

        try {
            const resp = await fetchConToken(`product/delete/${id}`, {}, 'DELETE');
            const body = await resp.json();
            if (body.ok) {
                dispatch(productoDeleted(id));
            } else {
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const searchProduct = (text) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`product/search/?q=${text}&page=${1}`);
            const body = await resp.json();
            const products = await body.productos;
            dispatch(productLoaded(products))
        } catch (error) {
            console.log(error)
        }
    }
};

export const productSetActive = (product) => ({
    type: types.productSetActive,
    payload: product
})
const productLoaded = (products) => ({
    type: types.productLoaded,
    payload: products
})

const productAdd = (product) => ({
    type: types.productAddNew,
    payload: product
})
export const productClear = () => ({
    type: types.productClear,
})
const productUpdated = (product) => ({
    type: types.productUpdated,
    payload: product
})

const productoDeleted = (id) => ({
    type: types.productDeleted,
    payload: id
})

export const productSearch = (text) => ({
    type: types.productSearch,
    payload: text
})

const productPagesTotal = (pages) => ({
    type: types.productPagesTotal,
    payload: pages
})