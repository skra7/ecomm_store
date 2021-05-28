import * as actionTypes from './actionTypes';
export const AddtoCart = (cartData) => {
    return {
        type: actionTypes.ADD_TO_CART,
        cartData: cartData
    }
}
export const updateCart = (cartupdatedData) => {
    return {
        type: actionTypes.UPDATE_CART,
        cartupdatedData: cartupdatedData
    }
}
export const updateCartIndex = (cartIndex) => {
    return {
        type: actionTypes.UPDATE_CART_INDEX,
        cartIndex: cartIndex
    }
}